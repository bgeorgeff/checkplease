// Test page driver — fires the modal with various scenarios so Bob can verify
// audio + visual works on his machine before trying it on a real payment site.

import { showModal } from "../modal/modal.js";
import { dateToWords, dateToVisualString } from "../lib/dateToWords.js";

const SCENARIOS = {
  person: {
    amount: 1000,
    amountDisplay: "$1,000.00",
    recipient: "Jane Johnson",
    siteName: "Venmo",
    audioEnabled: true
  },
  business: {
    amount: 8743.00,
    amountDisplay: "$8,743.00",
    recipient: "ACME Accounting Inc.",
    siteName: "Chase Bill Pay",
    audioEnabled: true
  },
  government: {
    amount: 247.00,
    amountDisplay: "$247.00",
    recipient: "City of Columbus Water Department",
    siteName: "Wells Fargo Bill Pay",
    audioEnabled: true
  },
  decimal: {
    amount: 0.50,
    amountDisplay: "$0.50",
    recipient: "Office Supplies Co.",
    siteName: "PayPal",
    audioEnabled: true
  },
  flight: () => {
    const flightDate = new Date(2026, 4, 5, 8, 40);  // Tuesday May 5, 2026, 8:40am
    return {
      amount: 447.00,
      amountDisplay: "$447.00",
      recipient: "United Airlines",
      siteName: "United.com",
      dateDisplay: dateToVisualString(flightDate),
      dateSpoken: dateToWords(flightDate, { includeTime: true }),
      audioEnabled: true
    };
  },
  preview: {
    amount: 1000,
    amountDisplay: "$1,000.00",
    recipient: "Jane Johnson",
    siteName: "Preview mode demo",
    audioEnabled: false  // visual only
  }
};

const resultEl = document.getElementById("result");

document.querySelectorAll(".cp-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const scenarioKey = btn.dataset.scenario;
    const cfg = SCENARIOS[scenarioKey];
    if (!cfg) return;
    const props = typeof cfg === "function" ? cfg() : cfg;
    const choice = await showModal(props);
    resultEl.textContent = choice === "confirm"
      ? "✓ You clicked Confirm."
      : "✗ You clicked Cancel.";
    resultEl.className = "cp-result cp-result-" + choice;
  });
});
