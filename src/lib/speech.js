// Web Speech API wrapper. Filters out child/young voices.
// Reuses the iPhone-style child-voice filter pattern from Learn Anything.

const CHILD_VOICE_HINTS = [
  "child", "kid", "junior", "young", "boy", "girl", "baby"
];

const PREFERRED_VOICE_HINTS = [
  "samantha", "alex", "daniel", "fred", "victoria",  // macOS
  "google us english", "microsoft david", "microsoft zira", "microsoft mark"  // Win/Chrome
];

function isChildVoice(voice) {
  const name = (voice.name || "").toLowerCase();
  return CHILD_VOICE_HINTS.some(hint => name.includes(hint));
}

function pickAdultVoice(voices, preferredVoiceURI = null) {
  if (preferredVoiceURI) {
    const match = voices.find(v => v.voiceURI === preferredVoiceURI && !isChildVoice(v));
    if (match) return match;
  }

  const adult = voices.filter(v => !isChildVoice(v));
  const enUS = adult.filter(v => v.lang && v.lang.toLowerCase().startsWith("en-us"));
  const candidates = enUS.length > 0 ? enUS : adult;

  for (const hint of PREFERRED_VOICE_HINTS) {
    const match = candidates.find(v => v.name.toLowerCase().includes(hint));
    if (match) return match;
  }

  return candidates[0] || voices[0] || null;
}

let cachedVoices = null;
let voicesPromise = null;

function loadVoices() {
  if (cachedVoices && cachedVoices.length > 0) {
    return Promise.resolve(cachedVoices);
  }

  if (voicesPromise) return voicesPromise;

  voicesPromise = new Promise((resolve) => {
    const initial = window.speechSynthesis.getVoices();
    if (initial && initial.length > 0) {
      cachedVoices = initial;
      resolve(initial);
      return;
    }

    // Voices load asynchronously on some platforms (especially Chrome).
    const handler = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        cachedVoices = v;
        window.speechSynthesis.removeEventListener("voiceschanged", handler);
        resolve(v);
      }
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler);

    // Failsafe — resolve with whatever we have after 2s.
    setTimeout(() => {
      const v = window.speechSynthesis.getVoices() || [];
      cachedVoices = v;
      resolve(v);
    }, 2000);
  });

  return voicesPromise;
}

/**
 * Speak text aloud using a non-child voice.
 * @param {string} text
 * @param {object} options
 * @param {number} options.rate - speaking rate (default 0.95 — slightly slower than default for clarity)
 * @param {number} options.pitch - pitch (default 1.0)
 * @param {number} options.volume - 0.0–1.0 (default 1.0)
 * @param {string} options.preferredVoiceURI - user's saved preferred voice
 * @returns {Promise<void>} resolves when speech ends or is interrupted
 */
export async function speak(text, options = {}) {
  if (!window.speechSynthesis) return;
  if (!text) return;

  const { rate = 0.95, pitch = 1.0, volume = 1.0, preferredVoiceURI = null } = options;

  // Cancel any in-flight speech so we never overlap.
  window.speechSynthesis.cancel();

  const voices = await loadVoices();
  const voice = pickAdultVoice(voices, preferredVoiceURI);

  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.lang = (voice && voice.lang) || "en-US";

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

export async function listAdultVoices() {
  const voices = await loadVoices();
  return voices.filter(v => !isChildVoice(v));
}
