# CheckPlease

A Chrome extension that reads numbers, dates, and recipient names back to you — out loud and in writing — right before any payment, form submission, or money transfer leaves your hands.

Built by a dyslexic adult, for dyslexic adults. Like a handwritten check, but automatic.

## Why

Dyslexic adults make high-cost numerical errors at work and in personal life all the time — typing $5 as $0.50, sending Venmo to the wrong handle, booking a flight on the wrong date. The dyslexic brain re-reads a number on screen and still sees what it *thinks* it typed, not what's actually there. Spell-checkers don't help. Numbers aren't words.

CheckPlease is a quiet helper that reads what you've entered back to you in plain English right before you hit Submit/Send/Pay. Two channels (audio + visual), three formats per number (numeral, written-out words, and recipient name) — like a handwritten check, where the same amount appears as both `$5,743.00` and *"Five thousand seven hundred forty-three dollars."*

## Privacy

Nothing leaves your browser. Your numbers, dates, account names, and recipient handles never touch a server. The extension runs entirely on your device. The only network call is a one-time license validation when you activate the extension.

## Status

🟡 **In development** — PRD complete, build starting May 2026.

See [PRD.md](PRD.md) for the full product spec, including pricing model, technical architecture, marketing approach, and open decisions.

## Tech

- Vanilla JavaScript (no framework, no bundler, no build step)
- Chrome Extension Manifest V3
- Web Speech API for the audio readback
- Lemon Squeezy for licensing and affiliate program

## Author

Bob Georgeff — [dyslexia.help](https://dyslexia.help)

## License

Proprietary — all rights reserved (until a license decision is made closer to launch).
