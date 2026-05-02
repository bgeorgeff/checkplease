// License management. Determines whether the user has paid (audio enabled)
// or is in free preview mode (visual-only).
//
// MVP behavior:
//   - License key is stored in chrome.storage.sync
//   - On first run with no key, user is in preview mode (visual modal works, audio is muted)
//   - User can enter their key on the options page
//   - Validation against Lemon Squeezy API runs on activation and every 30 days
//
// The actual Lemon Squeezy store ID and product ID will be filled in once Bob
// sets up his Lemon Squeezy account. Until then, validation runs in "dev mode"
// where any non-empty key activates audio (so testers and Bob can use the
// extension while the LS account is being created).

const STORAGE_KEY = "checkplease_license";
const REVALIDATION_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000;  // 30 days

// Set these once Bob's Lemon Squeezy store is live:
const LEMON_SQUEEZY_STORE_ID = null;       // e.g. "12345"
const LEMON_SQUEEZY_PRODUCT_ID = null;     // e.g. "67890"
const LEMON_SQUEEZY_API_BASE = "https://api.lemonsqueezy.com/v1";

/**
 * Get the saved license state from storage.
 * @returns {Promise<{key: string, valid: boolean, lastValidated: number}|null>}
 */
export async function getLicense() {
  if (!chrome?.storage?.sync) return null;
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  return result[STORAGE_KEY] || null;
}

/**
 * Save license state to storage.
 */
export async function saveLicense(state) {
  if (!chrome?.storage?.sync) return;
  await chrome.storage.sync.set({ [STORAGE_KEY]: state });
}

/**
 * Clear license — user wants to deactivate.
 */
export async function clearLicense() {
  if (!chrome?.storage?.sync) return;
  await chrome.storage.sync.remove(STORAGE_KEY);
}

/**
 * Whether the user has a valid (paid) license. Determines audio playback.
 * @returns {Promise<boolean>}
 */
export async function hasValidLicense() {
  const state = await getLicense();
  if (!state || !state.key) return false;
  if (!state.valid) return false;

  const stale = Date.now() - (state.lastValidated || 0) > REVALIDATION_INTERVAL_MS;
  if (stale) {
    // Try to revalidate quietly; don't block UI on network failure.
    revalidateInBackground(state.key);
  }
  return true;
}

async function revalidateInBackground(key) {
  try {
    const result = await validateWithLemonSqueezy(key);
    const existing = await getLicense();
    await saveLicense({
      ...existing,
      valid: result.valid,
      lastValidated: Date.now()
    });
  } catch (e) {
    // Network failure during revalidation should NOT lock out a paid user.
    // Keep their existing license valid — they'll get checked again next time.
  }
}

/**
 * Activate a license key. Returns { valid, message }.
 * @param {string} key
 */
export async function activateLicense(key) {
  if (!key || typeof key !== "string" || key.trim().length === 0) {
    return { valid: false, message: "Please enter a license key." };
  }
  const trimmed = key.trim();

  const result = await validateWithLemonSqueezy(trimmed);
  if (result.valid) {
    await saveLicense({
      key: trimmed,
      valid: true,
      lastValidated: Date.now(),
      activatedAt: Date.now()
    });
  }
  return result;
}

/**
 * Call Lemon Squeezy's license activation/validation endpoint.
 * Falls back to dev-mode (any non-empty key activates) until LS is configured.
 */
async function validateWithLemonSqueezy(key) {
  // Dev mode: no LS configured yet → any non-empty key works.
  if (!LEMON_SQUEEZY_STORE_ID || !LEMON_SQUEEZY_PRODUCT_ID) {
    return { valid: true, message: "License activated (dev mode)." };
  }

  try {
    const response = await fetch(`${LEMON_SQUEEZY_API_BASE}/licenses/validate`, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new URLSearchParams({ license_key: key })
    });
    const data = await response.json();
    if (data.valid) {
      return { valid: true, message: "License activated." };
    }
    return { valid: false, message: data.error || "License key is not valid." };
  } catch (err) {
    return {
      valid: false,
      message: "Could not reach the license server. Check your internet connection and try again."
    };
  }
}
