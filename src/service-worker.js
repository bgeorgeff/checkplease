// Service worker — runs in the background. Handles license state, settings sync,
// and any future cross-tab orchestration. Manifest V3 declares this as
// "type": "module", so we can use ES module imports here.

import { hasValidLicense } from "./lib/license.js";

// Set first-run state on install.
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    console.log("[CheckPlease] Installed. Welcome to CheckPlease.");
    // Open the options page so the user can enter their license key.
    try {
      chrome.runtime.openOptionsPage();
    } catch (e) { /* non-fatal */ }
  }
});

// Expose a way for content scripts (or the popup) to ask "am I licensed?"
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "checkplease/has-license") {
    hasValidLicense().then(valid => sendResponse({ valid }));
    return true;  // tells Chrome we'll respond asynchronously
  }
  return false;
});
