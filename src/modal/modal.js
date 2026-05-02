// The CheckPlease modal — the magic moment.
// Builds a full-screen overlay with the three formats:
//   - Numeral (large, bold)
//   - Written-out words (italic, like a check)
//   - Recipient name (large, prominent)
// Plays speech in parallel. Returns a Promise that resolves with the user's choice.

import { amountToWords } from "../lib/numberToWords.js";
import { speak, stopSpeaking } from "../lib/speech.js";

/**
 * @typedef {Object} ModalProps
 * @property {number} amount - dollar amount (e.g. 5743.00)
 * @property {string} amountDisplay - formatted numeral (e.g. "$5,743.00")
 * @property {string} [recipient] - recipient name (e.g. "Jane Johnson", "ACME Corp")
 * @property {string} [dateDisplay] - long-form date string for visual (e.g. "Tuesday, May 5, 2026")
 * @property {string} [dateSpoken] - spoken-form date for audio (e.g. "Tuesday, May fifth, twenty twenty-six")
 * @property {string} [siteName] - source site (e.g. "Venmo", "Chase")
 * @property {boolean} [audioEnabled] - whether to play audio (false = preview mode)
 * @property {string} [confirmLabel] - text on the confirm button (default "Yes, send it")
 * @property {string} [cancelLabel] - text on the cancel button (default "Wait, fix it")
 */

/**
 * Show the CheckPlease modal and return the user's choice.
 * @param {ModalProps} props
 * @returns {Promise<"confirm"|"cancel">}
 */
export function showModal(props) {
  return new Promise((resolve) => {
    removeModal();  // ensure no leftover from a prior call

    const wordsForAudio = amountToWords(props.amount, { capitalize: false });
    const wordsForVisual = amountToWords(props.amount, { capitalize: true });

    const overlay = document.createElement("div");
    overlay.id = "checkplease-overlay";

    const modal = document.createElement("div");
    modal.id = "checkplease-modal";
    modal.setAttribute("role", "alertdialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "checkplease-amount");

    let html = "";

    if (props.siteName) {
      html += `<div class="cp-header">Quick check from CheckPlease — ${escapeHtml(props.siteName)}</div>`;
    } else {
      html += `<div class="cp-header">Quick check from CheckPlease</div>`;
    }

    html += `<div id="checkplease-amount" class="cp-amount-numeral">${escapeHtml(props.amountDisplay)}</div>`;
    html += `<div class="cp-amount-words">${escapeHtml(wordsForVisual)}</div>`;

    if (props.recipient) {
      html += `<div class="cp-recipient-label">To</div>`;
      html += `<div class="cp-recipient">${escapeHtml(props.recipient)}</div>`;
    }

    if (props.dateDisplay) {
      html += `<div class="cp-date">${escapeHtml(props.dateDisplay)}</div>`;
    }

    html += `<div class="cp-buttons">`;
    html += `<button class="cp-btn-cancel" type="button">${escapeHtml(props.cancelLabel || "Wait, fix it")}</button>`;
    html += `<button class="cp-btn-confirm" type="button">${escapeHtml(props.confirmLabel || "Yes, send it")}</button>`;
    html += `</div>`;

    if (props.audioEnabled === false) {
      html += `<div class="cp-footer">Audio is muted — enter your license key in <span class="cp-brand">CheckPlease</span> settings to enable audio readback.</div>`;
    } else {
      html += `<div class="cp-footer"><span class="cp-brand">CHECKPLEASE</span></div>`;
    }

    modal.innerHTML = html;
    overlay.appendChild(modal);
    document.documentElement.appendChild(overlay);

    const confirmBtn = modal.querySelector(".cp-btn-confirm");
    const cancelBtn = modal.querySelector(".cp-btn-cancel");

    const cleanup = (choice) => {
      stopSpeaking();
      removeModal();
      document.removeEventListener("keydown", keyHandler, true);
      resolve(choice);
    };

    const keyHandler = (e) => {
      if (e.key === "Escape") { e.preventDefault(); cleanup("cancel"); }
      else if (e.key === "Enter") { e.preventDefault(); cleanup("confirm"); }
    };
    document.addEventListener("keydown", keyHandler, true);

    confirmBtn.addEventListener("click", () => cleanup("confirm"));
    cancelBtn.addEventListener("click", () => cleanup("cancel"));

    // Focus the cancel button by default — safer choice if user smashes Enter
    setTimeout(() => cancelBtn.focus(), 60);

    if (props.audioEnabled !== false) {
      const sentence = buildSpokenSentence({
        amountWords: wordsForAudio,
        recipient: props.recipient,
        dateSpoken: props.dateSpoken
      });
      speak(sentence);
    }
  });
}

function buildSpokenSentence({ amountWords, recipient, dateSpoken }) {
  // The waiter-tone sentence. Examples:
  // "Excuse me — quick check. You are about to pay one thousand dollars to Jane Johnson. Confirm?"
  // "Excuse me — quick check. You are about to send eight hundred dollars on Tuesday, May fifth. Confirm?"
  let sentence = "Excuse me — quick check. You are about to pay " + amountWords;
  if (recipient) {
    sentence += " to " + recipient;
  }
  if (dateSpoken) {
    sentence += " on " + dateSpoken;
  }
  sentence += ". Confirm?";
  return sentence;
}

export function removeModal() {
  const existing = document.getElementById("checkplease-overlay");
  if (existing) existing.remove();
}

function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
