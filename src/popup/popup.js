// Popup — show the user's license status and a button to open settings.

import { hasValidLicense } from "../lib/license.js";

const statusEl = document.getElementById("status");
const openOptionsBtn = document.getElementById("open-options");
const openTestBtn = document.getElementById("open-test");

(async () => {
  const valid = await hasValidLicense();
  if (valid) {
    statusEl.textContent = "✓ License active — audio enabled";
    statusEl.className = "cp-status cp-active";
  } else {
    statusEl.textContent = "Preview mode — visual only";
    statusEl.className = "cp-status cp-inactive";
  }
})();

openOptionsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
  window.close();
});

openTestBtn.addEventListener("click", () => {
  const url = chrome.runtime.getURL("src/test/test.html");
  chrome.tabs.create({ url });
  window.close();
});
