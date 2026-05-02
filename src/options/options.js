// Options page logic — license activation, voice picking, settings sync.

import {
  getLicense,
  activateLicense,
  clearLicense,
  hasValidLicense
} from "../lib/license.js";
import { listAdultVoices } from "../lib/speech.js";
import { SITE_CONFIGS } from "../lib/sites.js";

const SETTINGS_KEY = "checkplease_settings";

// ---- elements ----
const licenseStatusEl = document.getElementById("license-status");
const licenseInputEl = document.getElementById("license-input");
const activateBtn = document.getElementById("activate-btn");
const deactivateBtn = document.getElementById("deactivate-btn");
const licenseMessageEl = document.getElementById("license-message");
const muteAudioEl = document.getElementById("mute-audio");
const voiceSelectEl = document.getElementById("voice-select");
const activeSitesEl = document.getElementById("active-sites");
const versionEl = document.getElementById("version");

// ---- helpers ----
function setMessage(text, kind) {
  licenseMessageEl.textContent = text;
  licenseMessageEl.className = "cp-message" + (kind ? ` cp-message-${kind}` : "");
}

async function getSettings() {
  if (!chrome?.storage?.sync) return {};
  const result = await chrome.storage.sync.get(SETTINGS_KEY);
  return result[SETTINGS_KEY] || {};
}

async function saveSettings(patch) {
  if (!chrome?.storage?.sync) return;
  const current = await getSettings();
  await chrome.storage.sync.set({ [SETTINGS_KEY]: { ...current, ...patch } });
}

// ---- initial render ----

async function renderLicenseStatus() {
  const valid = await hasValidLicense();
  const license = await getLicense();
  if (valid) {
    licenseStatusEl.textContent = "✓ License active — audio readback is enabled.";
    licenseStatusEl.className = "cp-status cp-status-active";
    licenseInputEl.value = license?.key || "";
    licenseInputEl.disabled = true;
    activateBtn.style.display = "none";
    deactivateBtn.style.display = "inline-flex";
  } else {
    licenseStatusEl.textContent = "Preview mode — visual modal only. Enter a license key to enable audio.";
    licenseStatusEl.className = "cp-status cp-status-inactive";
    licenseInputEl.disabled = false;
    activateBtn.style.display = "inline-flex";
    deactivateBtn.style.display = "none";
  }
}

async function renderVoices() {
  try {
    const voices = await listAdultVoices();
    const settings = await getSettings();
    const preferred = settings.preferredVoiceURI || "";

    for (const v of voices) {
      const opt = document.createElement("option");
      opt.value = v.voiceURI;
      opt.textContent = `${v.name} (${v.lang})`;
      if (v.voiceURI === preferred) opt.selected = true;
      voiceSelectEl.appendChild(opt);
    }
  } catch (e) {
    console.warn("Could not load voices:", e);
  }
}

async function renderSettings() {
  const settings = await getSettings();
  muteAudioEl.checked = !!settings.muteAudio;
}

function renderSites() {
  for (const cfg of SITE_CONFIGS) {
    const li = document.createElement("li");
    li.textContent = cfg.name;
    activeSitesEl.appendChild(li);
  }
}

function renderVersion() {
  try {
    const m = chrome.runtime.getManifest();
    versionEl.textContent = m.version || "0.0.0";
  } catch (e) {
    versionEl.textContent = "0.0.0";
  }
}

// ---- event handlers ----

activateBtn.addEventListener("click", async () => {
  const key = licenseInputEl.value;
  setMessage("Activating…");
  const result = await activateLicense(key);
  setMessage(result.message, result.valid ? "success" : "error");
  if (result.valid) await renderLicenseStatus();
});

deactivateBtn.addEventListener("click", async () => {
  await clearLicense();
  licenseInputEl.value = "";
  setMessage("License removed. Back in preview mode.", "success");
  await renderLicenseStatus();
});

muteAudioEl.addEventListener("change", () => {
  saveSettings({ muteAudio: muteAudioEl.checked });
});

voiceSelectEl.addEventListener("change", () => {
  saveSettings({ preferredVoiceURI: voiceSelectEl.value });
});

// ---- boot ----

(async () => {
  renderVersion();
  renderSites();
  await Promise.all([
    renderLicenseStatus(),
    renderVoices(),
    renderSettings()
  ]);
})();
