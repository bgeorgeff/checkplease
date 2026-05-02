# CheckPlease

A Chrome extension that reads numbers, dates, and recipient names back to you — out loud and in writing — right before any payment, form submission, or money transfer leaves your hands.

Built by a dyslexic adult, for dyslexic adults. Like a handwritten check, but automatic.

## Why

Dyslexic adults make high-cost numerical errors at work and in personal life all the time — typing $5 as $0.50, sending Venmo to the wrong handle, booking a flight on the wrong date. The dyslexic brain re-reads a number on screen and still sees what it *thinks* it typed, not what's actually there. Spell-checkers don't help. Numbers aren't words.

CheckPlease is a quiet helper that reads what you've entered back to you in plain English right before you hit Submit/Send/Pay. Two channels (audio + visual), three formats per number (numeral, written-out words, and recipient name) — like a handwritten check, where the same amount appears as both `$5,743.00` and *"Five thousand seven hundred forty-three dollars."*

## Privacy

Nothing leaves your browser. Your numbers, dates, account names, and recipient handles never touch a server. The extension runs entirely on your device. The only network call is a one-time license validation when you activate the extension.

## Status

🟢 **MVP scaffolding shipped (v0.1.0)** — installable in Chrome dev mode. Modal, audio readback, payment-detection on Venmo/PayPal/Cash App/Wise/Chase/BofA/Wells Fargo/Gmail.

See [PRD.md](PRD.md) for the full product spec, including pricing model, technical architecture, marketing approach, and open decisions.

## Install in Chrome (developer mode)

1. Open Chrome and go to `chrome://extensions`
2. Toggle **Developer mode** ON (top-right corner)
3. Click **Load unpacked**
4. Select the `checkplease` folder (the one containing `manifest.json`)
5. The CheckPlease icon (CP on a navy square) appears in your Chrome toolbar

## Test it works (recommended first step)

1. Click the CP icon in your toolbar — popup appears
2. Click **Test the modal**
3. A test page opens with six demo scenarios — click any "Show modal" button
4. The modal should appear with the amount displayed in two formats (numeral + words) plus the recipient name. If your speakers are on, you'll hear it read aloud.

If the modal works on the test page but not on a real payment site, the site's DOM has likely changed and the selectors in `src/lib/sites.js` need updating.

## Project structure

```
checkplease/
├── manifest.json          # Manifest V3, minimal permissions
├── icons/                 # Placeholder CP icons (16/48/128 px)
├── scripts/
│   └── make_icons.py      # Regenerates the placeholder icons
├── src/
│   ├── content.js         # Tiny bootstrap that dynamically imports main.js
│   ├── main.js            # Click interceptor logic
│   ├── service-worker.js  # Background script (license, settings)
│   ├── modal/             # The CheckPlease modal (HTML/CSS/JS)
│   ├── lib/               # numberToWords, dateToWords, sites, speech, license
│   ├── options/           # Settings page
│   ├── popup/             # Toolbar popup
│   └── test/              # Test scenarios page
└── PRD.md                 # Full product requirements
```

## Tech

- Vanilla JavaScript (no framework, no bundler, no build step)
- Chrome Extension Manifest V3
- Web Speech API for the audio readback
- Lemon Squeezy for licensing and affiliate program

## Author

Bob Georgeff — [dyslexia.help](https://dyslexia.help)

## License

Proprietary — all rights reserved (until a license decision is made closer to launch).
