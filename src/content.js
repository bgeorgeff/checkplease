// Content-script bootstrap.
// Manifest V3 content scripts can't natively use ES module imports, so this
// tiny bootstrap dynamically imports the real module-based main.js. That keeps
// the rest of the codebase as clean ES modules with no build step required.

(async () => {
  try {
    const moduleURL = chrome.runtime.getURL("src/main.js");
    await import(moduleURL);
  } catch (err) {
    console.error("[CheckPlease] Failed to load main module:", err);
  }
})();
