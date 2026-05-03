// Per-site configuration: which buttons to intercept, where to find amount/recipient.
// MVP focuses on Venmo and Gmail; others are best-effort generic detection.
// As we get user feedback, site-specific entries will be tightened up.

/**
 * @typedef {Object} SiteConfig
 * @property {string} name - human-readable name shown in modal
 * @property {RegExp} hostMatch - regex matching window.location.hostname
 * @property {string[]} submitButtonSelectors - selectors for the "Pay/Send/Submit" button
 * @property {string[]} amountSelectors - selectors that contain the dollar amount
 * @property {string[]} recipientSelectors - selectors that contain the recipient name/handle
 * @property {string[]} dateSelectors - selectors that contain a date (optional)
 * @property {string} category - "p2p" | "bank" | "email" | "processor"
 */

/** @type {SiteConfig[]} */
export const SITE_CONFIGS = [
  {
    name: "Venmo",
    hostMatch: /(^|\.)venmo\.com$/,
    submitButtonSelectors: [
      'button[data-testid="pay-button"]',
      'button[type="submit"]',
      'button:has-text("Pay")',
      'button:has-text("Send")'
    ],
    amountSelectors: [
      '[data-testid="amount-display"]',
      'input[name="amount"]',
      'input[inputmode="decimal"]',
      'input[type="number"]'
    ],
    recipientSelectors: [
      // Venmo uses MUI Chip for the "To: [recipient]" field on the Pay & Request screen.
      // The .MuiChip-label class is the stable MUI class; the hashed css-* class is not.
      // Earlier versions used h1/h2/h3 as a fallback — that grabbed the user's OWN name
      // from the left sidebar profile, which is the dangerous wrong-recipient case
      // CheckPlease is supposed to prevent. Never fall back to generic headings.
      '[data-testid="recipient-name"]',
      '.MuiChip-root .MuiChip-label',
      '.MuiChip-label'
    ],
    category: "p2p"
  },
  {
    name: "PayPal",
    hostMatch: /(^|\.)paypal\.com$/,
    submitButtonSelectors: [
      'button[data-testid="payment-submit-btn"]',
      'button#confirmButtonTop',
      'button[type="submit"]'
    ],
    amountSelectors: [
      '[data-testid="amount"]',
      '.transaction-amount',
      'input[name="amount"]'
    ],
    recipientSelectors: [
      '[data-testid="recipient-name"]',
      '.merchant-name',
      'h1, h2'
    ],
    category: "p2p"
  },
  {
    name: "Cash App",
    hostMatch: /(^|\.)cash\.app$/,
    submitButtonSelectors: [
      'button[type="submit"]',
      'button[data-testid="pay-button"]'
    ],
    amountSelectors: [
      'input[inputmode="decimal"]',
      '[data-testid="amount"]'
    ],
    recipientSelectors: [
      '[data-testid="recipient"]',
      'h1, h2'
    ],
    category: "p2p"
  },
  {
    name: "Wise",
    hostMatch: /(^|\.)wise\.com$/,
    submitButtonSelectors: ['button[type="submit"]'],
    amountSelectors: ['input[name="sourceAmount"]', 'input[name="targetAmount"]'],
    recipientSelectors: ['[data-testid="recipient-name"]', 'h1, h2'],
    category: "p2p"
  },
  {
    name: "Gmail",
    hostMatch: /(^|\.)mail\.google\.com$/,
    // Gmail's send button — we'll only intercept emails that look money-related
    submitButtonSelectors: [
      'div[role="button"][data-tooltip*="Send"]',
      'div[role="button"][aria-label*="Send"]'
    ],
    amountSelectors: [],  // Will scan email body for currency-shaped patterns
    recipientSelectors: ['input[aria-label*="To"]', 'div[name="to"]'],
    category: "email"
  },
  {
    name: "Chase",
    hostMatch: /(^|\.)chase\.com$/,
    submitButtonSelectors: ['button[type="submit"]', 'button[data-testid*="submit"]'],
    amountSelectors: ['input[name*="mount"]', 'input[type="number"]'],
    recipientSelectors: ['[data-testid*="payee"]', '[data-testid*="recipient"]'],
    category: "bank"
  },
  {
    name: "Bank of America",
    hostMatch: /(^|\.)bankofamerica\.com$/,
    submitButtonSelectors: ['button[type="submit"]'],
    amountSelectors: ['input[name*="amount" i]', 'input[type="number"]'],
    recipientSelectors: ['[id*="payee" i]', '[name*="payee" i]'],
    category: "bank"
  },
  {
    name: "Wells Fargo",
    hostMatch: /(^|\.)wellsfargo\.com$/,
    submitButtonSelectors: ['button[type="submit"]'],
    amountSelectors: ['input[name*="amount" i]'],
    recipientSelectors: ['[name*="payee" i]', '[id*="recipient" i]'],
    category: "bank"
  },
  {
    name: "Credit Union of Ohio",
    hostMatch: /(^|\.)cuofohio\.org$/,
    // The actual bill-pay UI lives inside a CheckFree iframe, NOT on
    // cuofohio.org's top-level page (see the "Fiserv CheckFree Bill Pay"
    // entry below). This entry stays so our interceptor still installs on
    // the parent page in case CU exposes any payment buttons of its own,
    // but the real wins happen inside the iframe.
    submitButtonSelectors: [],
    amountSelectors: [
      'input[formcontrolname="amount"]',
      '#amount-value'
    ],
    recipientSelectors: [
      '#biller-header-payee-name',
      '.selected-card-payee-name'
    ],
    category: "bank"
  },
  {
    name: "Fiserv CheckFree Bill Pay",
    // CheckFree (cw411.checkfreeweb.com and friends) is the bill-pay backend
    // used by hundreds of US banks and credit unions, served as an embedded
    // iframe inside each bank's online-banking site. Adding it once here
    // covers a huge chunk of US banking bill-pay flows in one go — confirmed
    // working for Credit Union of Ohio (parent page is online.cuofohio.org,
    // the iframe is on cw411.checkfreeweb.com).
    //
    // For this to work, manifest.json must have "all_frames": true on the
    // content_scripts entry — otherwise the script never injects into the
    // iframe and this config is dead.
    hostMatch: /(^|\.)checkfreeweb\.com$/,
    submitButtonSelectors: [],
    amountSelectors: [
      'input[formcontrolname="amount"]',
      '#amount-value'
    ],
    recipientSelectors: [
      '#biller-header-payee-name',
      '.selected-card-payee-name'
    ],
    category: "bank"
  }
];

/**
 * Find the SiteConfig matching the current page, or null.
 * @returns {SiteConfig|null}
 */
export function getCurrentSiteConfig() {
  const host = window.location.hostname;
  return SITE_CONFIGS.find(cfg => cfg.hostMatch.test(host)) || null;
}

/**
 * Generic fallback: find a currency-shaped value in the page text near the clicked button.
 * @param {Element} root
 * @returns {string|null}
 */
export function findCurrencyNearby(root) {
  if (!root) return null;
  const text = root.textContent || "";
  const match = text.match(/\$\s?[\d,]+(?:\.\d{1,2})?/);
  return match ? match[0] : null;
}

/**
 * Normalize a string like "$1,234.56" or "1234.56" or "  $5 " to a Number.
 * Returns null if not parseable.
 */
export function parseCurrencyString(s) {
  if (typeof s !== "string") return null;
  const cleaned = s.replace(/[^0-9.\-]/g, "");
  if (!cleaned) return null;
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

/**
 * Find an amount on the page using the site's configured selectors.
 *
 * Important — this function deliberately FAILS CLOSED: if none of the
 * site-specific selectors match, it returns null. Earlier versions fell back
 * to scanning document.body for the first currency-shaped string, which on
 * bank pages picked up account balances ("Available balance: $13,245.93")
 * and triggered the modal with a wildly wrong amount (e.g. user clicks
 * "Pay 1 Biller" before entering an amount → modal claims they're about to
 * pay their entire balance). The body-text fallback is the same class of
 * over-eager bug as the Venmo wrong-recipient h1/h2/h3 fallback. Do not
 * reintroduce it. If a site's selectors miss, the right answer is no modal —
 * main.js logs and lets the click proceed silently.
 *
 * @param {SiteConfig} config
 * @returns {{rawString: string, amount: number}|null}
 */
export function findAmount(config) {
  if (!config) return null;
  for (const sel of (config.amountSelectors || [])) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const raw = (el.value !== undefined && el.value !== "") ? el.value : el.textContent;
    const amount = parseCurrencyString(raw);
    if (amount !== null) return { rawString: raw.trim(), amount };
  }
  return null;
}

/**
 * Find recipient text using the site's selectors.
 * @param {SiteConfig} config
 * @returns {string|null}
 */
export function findRecipient(config) {
  if (!config) return null;
  for (const sel of (config.recipientSelectors || [])) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const text = (el.value || el.textContent || "").trim();
    if (text && text.length < 100) return text;
  }
  return null;
}
