// Content script — runs on every payment-flavored page in the manifest's
// content_scripts matches list. Listens for clicks on payment-submit buttons,
// gathers amount/recipient/date, and shows the CheckPlease modal before
// allowing the original click to proceed.
//
// Architecture note: we use a capture-phase click listener at the document level.
// When a candidate button is clicked, we stopImmediatePropagation, show the modal,
// then re-dispatch a synthetic click on the same button if the user confirms.
// This is the only reliable way to intercept arbitrary site buttons.

import { showModal } from "./modal/modal.js";
import { getCurrentSiteConfig, findAmount, findRecipient } from "./lib/sites.js";
import { hasValidLicense } from "./lib/license.js";

const SETTINGS_KEY = "checkplease_settings";

async function getSettings() {
  if (!chrome?.storage?.sync) return {};
  const result = await chrome.storage.sync.get(SETTINGS_KEY);
  return result[SETTINGS_KEY] || {};
}

const SITE_CONFIG = getCurrentSiteConfig();
if (SITE_CONFIG) {
  console.log(`[CheckPlease] Active on ${SITE_CONFIG.name}`);
  installInterceptor(SITE_CONFIG);
}

// Track buttons we've already "approved" so the re-dispatched click passes through.
const approvedClicks = new WeakSet();

function installInterceptor(config) {
  document.addEventListener("click", async (event) => {
    if (!event.isTrusted) return;  // ignore programmatic clicks

    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = findMatchingButton(target, config);
    if (!button) return;

    if (approvedClicks.has(button)) {
      // This is the re-dispatched click after the user confirmed — let it through.
      return;
    }

    // Intercept.
    event.preventDefault();
    event.stopImmediatePropagation();

    const amountInfo = findAmount(config);
    if (!amountInfo) {
      console.log("[CheckPlease] No amount found near clicked button — letting click proceed.");
      reapproveAndClick(button);
      return;
    }

    const recipient = findRecipient(config);

    let audioEnabled = true;
    try {
      const [licensed, settings] = await Promise.all([
        hasValidLicense(),
        getSettings()
      ]);
      audioEnabled = licensed && !settings.muteAudio;
    } catch (e) {
      audioEnabled = false;  // default to preview mode if license check fails
    }

    const choice = await showModal({
      amount: amountInfo.amount,
      amountDisplay: formatCurrencyDisplay(amountInfo.amount, amountInfo.rawString),
      recipient: recipient || undefined,
      siteName: config.name,
      audioEnabled
    });

    if (choice === "confirm") {
      reapproveAndClick(button);
    }
    // On cancel, do nothing — the user stays on the page with the form intact.
  }, true);  // capture phase — runs before site's own handlers
}

function findMatchingButton(target, config) {
  for (const sel of (config.submitButtonSelectors || [])) {
    // :has-text() is non-standard; we filter manually.
    if (sel.includes(":has-text(")) continue;
    const matched = target.closest(sel);
    if (matched) return matched;
  }
  // Fallback: text-based detection for buttons named Pay/Send/Confirm/Submit.
  const btn = target.closest("button, [role='button']");
  if (btn) {
    const text = (btn.textContent || "").trim().toLowerCase();
    if (/^(pay|send|confirm|submit|continue|review and pay|review & pay)/.test(text)) {
      return btn;
    }
  }
  return null;
}

function reapproveAndClick(button) {
  approvedClicks.add(button);
  // Re-dispatch a real, trusted-looking click. We can't make event.isTrusted true
  // from a content script, but most click handlers on sites listen to addEventListener
  // and don't filter by isTrusted, so this works.
  button.click();
}

function formatCurrencyDisplay(amount, rawString) {
  // If the raw string already looked like a formatted currency, keep it. Otherwise format.
  if (rawString && /[\$€£]/.test(rawString)) return rawString.trim();
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}
