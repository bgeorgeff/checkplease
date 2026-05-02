# CheckPlease — Product Requirements Document

**Working title:** CheckPlease (a play on "check, please" said to a waiter — a quick, friendly second look before the bill goes out).
**Status:** Concept. Not yet built.
**Owner:** Bob Georgeff
**Strategic role:** Bob's first paid product. Sold as a lifetime deal (LTD) on a tiered pricing ladder. dyslexia.help and the (free) Multi-Clipboard extension feed the top of the funnel; CheckPlease is where revenue starts. Validates willingness-to-pay from day one (Marc Lou principle).
**Created:** 2026-05-01

> **Note on the name:** "CheckPlease" was chosen for brand voice, not yet validated against SEO keyword volume or trademark conflicts. Final naming pass is a separate task — see "Open Questions" below.

---

## 1. One-line pitch

A quiet helper that reads numbers and dates back to you — out loud, in plain English — right before any payment or money transfer leaves your hands, so you catch the $5-typed-as-$0.50 mistake before it costs you thousands. Also works on forms, emails, and bookings.

---

## 2. The problem

Dyslexic adults make high-cost numerical errors at work all the time. The dyslexic brain re-reads a number on screen and still sees what it *thinks* it typed, not what's actually there. Spell-checkers don't help — numbers aren't words.

**The reference story** (from the Natalie Brooks / *Dyslexia Unlocked* interview, May 2026):
Natalie (who is British — original story used pounds, told here in dollars for the US audience) typed $5 into a pricing form as $0.50. The marketing team pushed the offer all weekend at the wrong price. Cost the company $5,000. She got fired Monday morning. Her annual reviews had said *"please double-check your work"* for years. She had been double-checking — her eyes just couldn't catch it.

**Categories of error CheckPlease targets:**
- Decimal-place mistakes ($50 vs $5,000)
- Transposed digits (invoice for 8,734 when meant 7,834)
- Wrong dates on flights, trains, calendar invites (May 5 vs June 5; 05/06 vs 06/05)
- Wrong account / reference numbers on payments
- "Reply all" when "reply" was meant
- Wrong recipient on email when typing fast

**Why audio matters:** Dyslexic eyes miss what dyslexic ears catch. Reading a number back as *"five-zero dollars"* instead of *"$50"* engages a different processing channel. This is the core insight — and the differentiator from every existing checker.

---

## 3. Who it's for

**Primary user:** Dyslexic adults who are self-employed, freelance, or entrepreneurial — people who often went self-employed *because* traditional employment kept punishing them for exactly these mistakes. For this group, a numerical error doesn't cost them a job; it comes directly out of their own pocket. They have full autonomy over what tools they install (no IT department approval needed), they feel the financial pain immediately, and they're already actively seeking dyslexia-specific resources. This is a loyal, motivated, and underserved buyer.

**Secondary user:** Dyslexic adults still in employment — particularly those who have already been warned about errors and are quietly terrified of repeating them. The "please double-check your work" annual review is the emotional hook. They are motivated by fear of losing the job, not just the cost of the mistake.

**Tertiary — personal use:** The same errors happen when booking a concert ticket for the wrong date, paying a bill to the wrong account, selling on eBay at the wrong price, or Venmoing money to the wrong person. This audience does not need to be actively marketed to at launch — users who install CheckPlease for work will naturally use it at home on the same browser. Reviews and user emails will surface this usage organically. Expand the message to personal use in v2 once the data confirms it.

**Bonus audience — non-dyslexic:** Anyone tired, distracted, or rushed — parents, late-night workers, anyone who has ever hit Send too fast. The pitch is dyslexia-first; the utility is universal. Same playbook OXO used with kitchen tools designed for arthritis — designed for one group, adopted by everyone.

**NOT for:** Children, students, people who need spelling/reading help (saturated by Speechify, Read&Write, NaturalReader, Grammarly).

---

## 4. Why now

- **No direct competitor.** Grammarly checks words. Banks confirm transactions but only inside their own apps. Browser autofill confirms nothing. Nothing exists at the OS/browser level for *"any number, anywhere, before you send."*
- **Audio-first is underweight in this market.** 85% of *Dyslexia Unlocked* book buyers chose the audio edition. Strong demand signal that this audience prefers ear over eye.
- **Bob's first revenue product.** No current app income — the goal is to validate willingness-to-pay immediately, not "monetize later." A Buy button on day one tells you in 30 days whether this product has legs. dyslexia.help and the free Multi-Clipboard extension keep their loss-leader role at the top of the funnel; CheckPlease is the first paid step.

---

## 5. Core scenarios (MVP)

### Scenario A — The price field
> Bob is filling out a pricing spreadsheet for a client. Other rows are around $500. He types $50 in the next row and hits Tab.
> **CheckPlease pops a small toast at the corner of the screen and says aloud:** *"You typed five-zero dollars. The other items in this column are around five hundred dollars. Did you mean that?"*
> Buttons: ✓ Yes, that's right · ✗ Fix it · 🔇 Skip this column

### Scenario B — The flight booking
> Bob is on an airline site. He's booking a flight. He hits "Confirm."
> **CheckPlease intercepts and says aloud:** *"You're booking a flight from Columbus to Denver, departing **Tuesday, May fifth, twenty twenty-six** at 8:40 in the morning, returning **Friday, May eighth**. Total: four hundred and forty-seven dollars. Does that sound right?"*
> Buttons: ✓ Looks good · ✗ Wait, fix it

### Scenario C — The invoice email
> Bob types an email to a client with an invoice line: *"Total due: $8,743.00"*. He hits Send.
> **CheckPlease intercepts and reads the email's numbers aloud in plain English:** *"Total due: eight thousand, seven hundred forty-three dollars."* Plus: highlights the recipient address read out loud (*"sending to client at acmecorp dot com"*).
> Buttons: ✓ Send · ✗ Hold on

### Scenario D — The payment reference
> Bob is paying a vendor on a bill-pay form. He types a 16-digit account number.
> **CheckPlease checks against history:** *"You entered an account ending in seven-seven-three-one. The last time you paid this vendor, the account ended in one-three-seven-seven. Double-check?"*

### Scenario E — The peer-to-peer payment (the wrong-person catch)
> Applies equally to **Venmo, Zelle, PayPal, Cash App, Apple Pay, Google Pay, Wise, Revolut**, and any other peer-to-peer payment app. These are the highest-stakes payment surfaces because money sent to the wrong handle on these platforms is often **unrecoverable** — there's no chargeback equivalent.
>
> Recipient detection works for **people, businesses, and organizations** equally — whatever the payment site shows in the recipient field gets read aloud and shown in the modal:
>
> **Variant 1 — paying a person:**
> Bob is on Venmo. He's paying his roommate Jane Johnson back for groceries. He types $1,000 (meant $100), and the recipient autocomplete also surfaced *Jen Johnson* (a near-identical name from his contacts). He hits "Pay."
> **CheckPlease intercepts. The modal shows:**
> - **$1,000.00** *(numeral, large)*
> - **One thousand dollars** *(written out, like a check)*
> - **To: Jane Johnson** *(recipient, prominent)*
>
> **Spoken aloud:** *"You are about to pay one thousand dollars to Jane Johnson. Confirm?"*
>
> **Variant 2 — paying a business:**
> Bob is on his bank's bill-pay screen, paying his accounting firm. He types $8,743.00 (correct) but the autofill surfaced *ACME Accounting Inc.* when he meant his actual firm, *Atlas Accounting LLC* (similar names, both in his payee list). He hits "Pay."
> **CheckPlease intercepts. The modal shows:**
> - **$8,743.00**
> - **Eight thousand seven hundred forty-three dollars**
> - **To: ACME Accounting Inc.** *(business name, prominent)*
>
> **Spoken aloud:** *"You are about to pay eight thousand seven hundred forty-three dollars to ACME Accounting Inc. Confirm?"*
>
> **Variant 3 — paying a government entity:**
> Bob is paying his quarterly water bill. The recipient field shows *City of Columbus Water Department*.
> **Spoken aloud:** *"You are about to pay two hundred forty-seven dollars to City of Columbus Water Department. Confirm?"*
>
> Buttons: ✓ Pay · ✗ Wait, fix it
>
> In Variant 1, Bob hears "one thousand" and realises he meant one hundred. In Variant 2, he hears "ACME" and realises he picked the wrong firm — would have paid a stranger $8,743 with no recourse. **This scenario alone justifies the product for many buyers.** Anyone who has ever sent money to the wrong Venmo handle, the wrong bill-pay payee, or the wrong account knows the sinking-stomach feeling that CheckPlease prevents.

---

## 6. MVP scope — what ships first

**Form factor:** Chrome extension. Reasons: lowest install friction, matches Multi-Clipboard playbook, covers ~70% of where the pain happens (web forms, Gmail, web-based booking).

**MVP feature list:**

1. **Dual-channel prompt — audio AND visual fire together, every time.** Audio is one channel; the visual prompt is co-equal, not a fallback. The visual is a large modal overlay (high contrast, **Verdana** — BDA-recommended for dyslexia and a system font on every device, so no font-loading delay or fallback risk — generous line spacing and letter spacing) that displays the number in **both formats simultaneously — exactly like a handwritten check**:
   - The numeral: **$5,743.00** (large, so the user can compare directly to what they typed)
   - The written-out words below it: *"Five thousand seven hundred forty-three dollars"* (engages a different processing channel — the same reason checks have always done both)
   - Audio reads the words aloud at the same moment
   
   Two formats, two channels, two chances to catch the error. This solves: muted volume, unplugged speakers, shared offices, hearing-impaired users, browser audio permissions blocked, and Bluetooth disconnect. The user always gets the message regardless of audio state.
2. Read numbers back as plain English on form-submit / button-click intercept (audio + visual together).
3. Read dates back in long form (*"Tuesday, May fifth"* not *"05/05"*) — audio + visual together.
4. **Payment-detection intercept**: When on banking sites, payment processors (PayPal, Venmo, Zelle, Stripe, Square), or bill-pay forms, prompt extra-loud and extra-large with **three pieces of information surfaced together**:
   - **Amount** in both formats: numeral *and* written-out (e.g. **$1,000.00** + *"one thousand dollars"*)
   - **Recipient name** (large, prominent — *"Jane Johnson"*)
   - **Account/handle ending in** the last 4 characters (when available, for bank/Venmo accounts where a name isn't shown)
   
   Spoken aloud: *"You are about to pay one thousand dollars to Jane Johnson. Confirm?"*
   
   Catches three classes of mistake at once: wrong amount, wrong person, wrong account. The wrong-person mistake on Venmo/Zelle is often unrecoverable — money sent to the wrong handle usually can't be clawed back — which makes recipient name the most important field on payment screens.
   
   *Stretch (v1.1):* For frequent recipients, store last-paid-amount and warn on outliers (*"You normally pay Jane Johnson around $50. Today's amount is $1,000. Confirm?"*). Also: optional letter-by-letter spelling of the recipient name (*"J-A-N-E J-O-H-N-S-O-N"*) for users who often confuse similar names like Johnson/Jonson, Stephens/Stevens.
5. Highlight the email recipient on Gmail send-intercept.
6. Outlier detection: flag a number that's >5× or <0.2× the median of other numbers in the same form/spreadsheet column.
7. Per-site "always skip" toggle (so it doesn't badger you on sites where you don't care).
8. Settings: audio voice (use existing Web Speech API voices, with the iPhone-style child-voice filter you already wrote for Learn Anything), speed, **mute audio entirely** (visual-only mode), intercept-by-default vs ask-once-per-site.

**Stretch (v1.1, not MVP):**
- Account/reference number history matching (Scenario D)
- Excel/Google Sheets specific integration
- QuickBooks / Xero integration
- Desktop app (covers Outlook, native banking apps, accounting software)

**Explicitly out of scope (v1):**
- Spelling / grammar checking (Grammarly does this)
- Reading entire emails aloud (Speechify does this)
- Mobile app (web Chrome extension first; mobile is a different product)
- AI-powered "is this number reasonable" semantic checks (do this in v2 once we have real usage data)
- Catching errors *after* they're sent (this is a pre-send tool by design)

---

## 7. Technical sketch

(High-level — for non-developer reference. Implementation details deferred until build-time.)

| Layer | Approach |
|---|---|
| Distribution | Chrome Web Store (one-time $5 dev account — already needed for Multi-Clipboard). **Note: Chrome Web Store dropped paid extension support in 2020**, so the extension itself is listed for free; the license is sold separately on a checkout page. |
| Payment processor | **Lemon Squeezy** (recommended — handles VAT/sales tax automatically, simpler than Stripe for a solo founder selling globally) or Gumroad as a fallback. Generates a unique license key per purchase. |
| License check | On first run after install, the extension prompts the user to enter a license key. Key is validated via a single API call to Lemon Squeezy's license-validation endpoint, then cached locally. Offline-friendly: re-validate every 30 days max. Without a valid key, the extension runs in "preview mode" — fires the visual modal but skips audio readback (lets them feel the product before paying). |
| Frontend | Vanilla JS or lightweight framework, manifest v3 |
| Speech | Browser-native Web Speech API (no API costs, works offline). Same voice-filtering logic from Learn Anything's `Index.tsx` — filter out child/young voices, prefer adult en-US. |
| Number parsing | Regex + Intl.NumberFormat for "read this number aloud as English" |
| Date parsing | `date-fns` or native `Intl.DateTimeFormat` with `dateStyle: 'full'` |
| Outlier detection | Local — compute median/IQR over numbers in same form, no server needed |
| Settings storage | `chrome.storage.sync` (free, syncs across devices) |
| Backend | Minimal — only the license-validation call to Lemon Squeezy. *No user numbers/dates/emails ever leave the machine.* This is still the privacy headline. |
| Analytics | Privacy-friendly only (Plausible-style) — install count, license-activation rate, % who keep it after 30 days |
| Email capture | Built into the Lemon Squeezy checkout (every buyer's email is captured automatically, opt-in to dyslexia.help newsletter on the thank-you page) |

**Key non-negotiable:** No data leaves the user's browser. Major trust win and removes any privacy-policy / GDPR complications. This is the marketing message: *"It works on your machine. Your numbers never go to a server."*

---

## 8. Success metrics

**Closed beta (tester cohort, weeks 1–4):**
- All 50 comp codes distributed
- 40+ of 50 testers (80%) submit at least one piece of feedback
- At least 5 testers report "this caught a real mistake" within their first 14 days
- Zero unfixed critical bugs in license activation flow before public launch

**Leading (first 90 days post-public-launch):**
- Chrome Web Store installs: target 1,000 in 90 days (Multi-Clipboard's curve as benchmark)
- **Paid license activations: target 50 in first 30 days, 200 by day 90** (5% install→paid conversion is realistic for a $19–29 LTD with a strong story)
- Day-30 retention (paid users): target 70%
- Reviews: target 30+ at ≥4.5 stars (tester cohort posts these on day 1 of public launch)
- Refund rate: under 5% (key signal that the product delivers; over 10% means rethink)

**Lagging:**
- $$$ — target $5K revenue by day 90, $15K by day 180
- Traffic delta to dyslexia.help from CheckPlease activations
- Email list growth from checkout opt-ins

**Validation that the *idea* is right (qualitative):**
- At least 5 unsolicited "this saved me from a $X mistake" reviews in the first 90 days
- At least one tweet/post from a dyslexic founder telling their friends to buy it

---

## 9. Pricing & licensing

**Model:** Paywall ON from day one (Marc Lou principle — Buy button validates willingness to pay immediately). Tiered lifetime deal (LTD), one-time payment, with a comp-code tester tier as the very first cohort. Manufactures urgency through public price increases.

**Six-tier ladder:**

| Tier | Audience | Price | Volume |
|---|---|---|---|
| **Tester (comp)** | First 50 — friends, dyslexia community contacts (Natalie Brooks, Stephen, etc. if interested), early dyslexia.help loyalists | **$0 (100%-off LS code)** | Cap at 50 — closed-beta cohort |
| **Founders' newsletter** | dyslexia.help newsletter subscribers, day 0 public launch | **$14 lifetime** | Cap at next 50 (buyers 51–100) |
| **Standard founders'** | Public launch | **$19 lifetime** | Buyers 101–200 |
| **Standard LTD** | Continuing public sale | **$29 lifetime** | Buyers 201–500 |
| **Final LTD** | Continuing public sale | **$49 lifetime** | Buyers 501–1000 |
| **Subscription (later)** | Buyer 1001+ | **$4.99/mo or $39/yr** | Switch when LTD cap hit; existing LTD users keep their license forever |

**Why the tester tier is critical** (and why it's not just "free for friends"):
- Real Lemon Squeezy 100%-off discount codes — **testers go through the full checkout flow** (enter email, "pay $0", receive a real license key, activate the extension). Tests every part of the production purchase path with friends, not refund-demanding strangers.
- Comped users perceive the product's listed price ($19) as its real value — they tell friends *"I'm using this $19 tool"*, not *"I got this free thing."* Anchoring effect.
- Surfaces real bugs in checkout copy, license activation, email delivery, edge cases — before public launch.
- Builds a pre-launch army of advocates ready to leave Chrome Web Store reviews on day 1.

**What testers agree to in exchange for their comp code:**
- Use CheckPlease for at least **14 days**
- Submit at least **one piece of feedback** (short survey or email — "what worked, what didn't, did it catch a real mistake")
- **Optional but encouraged:** post a Chrome Web Store review at public launch
- **Optional:** be willing to be quoted (with permission) in launch blog post and screenshots

**Why this works for CheckPlease specifically:**
- Zero backend = zero ongoing cost per LTD user (the usual LTD downside doesn't apply)
- Dyslexic adults often have anxiety around recurring charges — one-time payments feel safer
- Public price increases (*"price goes up to $29 tomorrow"*) drive launch-week urgency
- The comp-tester tier converts otherwise-passive supporters into active launch advocates

**No free trial. 30-day money-back guarantee instead.** Reasons:
- Trials require users to manage cards, remember to cancel, check calendars — friction this audience doesn't need
- A money-back guarantee is bolder marketing: *"If CheckPlease doesn't catch a single mistake in 30 days, full refund, no questions"*
- Most refund-eligible users don't ask. Industry average refund rate on guarantee-only models is 3–8%.

**Free preview mode (post-launch):**
- Without a license key, the extension still installs and runs in "preview mode" — visual modal fires but audio is muted
- Lets users feel the product before paying
- The audio readback is the magic. People will pay $19 to unlock it once they see what visual-only is missing.

**Launch sequence (six phases):**
1. **Pre-launch** — collect emails on a CheckPlease landing page on dyslexia.help (*"Get $5 off when we launch"*)
2. **Closed beta (testers)** — distribute 50 comp codes to friends and dyslexia community contacts. Run for 2–4 weeks. Collect feedback. Fix critical bugs.
3. **Day 0 — newsletter cohort** — first 50 dyslexia.help newsletter subscribers receive a $14 founders' coupon (24-hour window, urgency)
4. **Day 1–30 — public launch at $19** (standard founders')
5. **Day 31+ — price increases to $29**, announced publicly to the email list (news peg #1)
6. **Repeat tier transitions** until LTD cap reached, then switch to subscription

---

## 10. Affiliate program

**Tool:** Lemon Squeezy's built-in affiliate program. Zero extra cost (included in the standard payment processing fee), zero extra code to write, scales from 1 affiliate to 10,000+ without any migration. **No graduation/migration path is planned** — LS's affiliate features are not gated by tier or volume. Stay on LS unless a specific feature need (e.g. complex recurring-commission rules on a future subscription product) makes it incompatible. If that happens, Rewardful integrates with LS via webhooks — but assume that's not happening.

**Commission rate:** **30% of sale price** (recommended). At $19–29 LTD pricing, that's $5.70–$8.70 per referred sale. High enough to motivate creator-tier partners (podcasts, dyslexia-focused influencers) to actually push, low enough to leave healthy margin. Industry standard for digital products is 20–50%; 30% is the sweet spot for this audience.

**Cookie attribution window:** **30 days** (industry standard). Buyer clicks affiliate link → cookie set → if they buy any time in next 30 days, affiliate gets credit.

**Launch model: invite-only first, then open later.**

**Phase 1 — Invite-only (months 1–6):** Reach out personally to a small group of trusted voices in the dyslexia/neurodiversity space:
- Natalie Brooks (dyslexiainadults — author of *Dyslexia Unlocked*)
- Stephen — host of *The Truth About Dyslexia* podcast
- Made By Dyslexia
- BDA UK (British Dyslexia Association) — long shot but worth asking
- ADDitude Magazine (ADHD-overlap audience)
- Speechify-adjacent creators
- Dyslexic founders on LinkedIn / X with engaged followings

A handful of trusted partners who actually know the audience converts 10× better than 200 random "affiliate marketers" with low-quality traffic. Personal outreach + custom coupon codes (e.g. `NATALIE` = 20% off for buyer + 30% commission to Natalie) signals partnership, not transaction.

**Phase 2 — Open (month 6+):** Once product-market fit is proven and the launch playbook has been refined with invited partners, flip the affiliate program to public sign-up. Add a "Become an Affiliate" link on the CheckPlease landing page. Require manual approval to keep quality high.

**Optional booster: tiered commission.** Standard partners get 30%. Top-performing partners (defined as: 25+ sales/quarter, or pre-vetted high-trust voices like Natalie) get **40% on first 5 referrals each month** as a "kickstart bonus" to reward early effort. Easy to configure inside LS. Only do this if you find partners are starting strong but losing momentum.

**Payouts:** LS handles automatically — monthly payouts via PayPal. LS also handles US 1099-NEC tax forms for affiliates earning >$600/year, removing a real legal/admin headache.

**Anti-fraud baseline:**
- Self-purchase prevention (LS detects if an affiliate clicks their own link and buys — auto-rejected)
- Coupon-code abuse: each affiliate's code applies a max 20% buyer discount; can't be combined with the founders' $14 launch price
- Manual review of any affiliate referring more than 10 sales in 24 hours (rare, but worth a glance)

---

## 11. Legal & compliance

CheckPlease is **financial-adjacent, not a financial service**. It doesn't move money, doesn't store account numbers, doesn't give financial advice — it intercepts a button click and shows a confirmation. That sharply limits legal exposure, but a basic compliance baseline is still required.

### YMYL (Your Money or Your Life) — Google's SEO classification

CheckPlease is **YMYL-adjacent but not deeply YMYL**. Google holds content that touches user finances to higher E-E-A-T standards (Experience, Expertise, Authoritativeness, Trustworthiness). For dyslexia.help blog content about CheckPlease, this means:

- Lead with **personal experience** (Bob's own dyslexia journey, Natalie Brooks' story used with permission)
- Include **trust signals**: real reviews, money-back guarantee, named author, real contact info, a proper About page
- Never claim CheckPlease *guarantees* anything — only that it *helps*
- Cite credible sources when discussing dyslexia statistics or research

This isn't a legal requirement; it's a Google ranking concern. But the same hygiene helps both.

### Required documents before Chrome Web Store launch

| Document | Purpose | How to create |
|---|---|---|
| **Privacy Policy** | Required by Chrome Web Store. Must accurately describe what data the extension collects (essentially nothing — the privacy story is a marketing strength). | Termly.io or iubenda.com, free tier, ~15 minutes |
| **Terms of Service** | Establishes liability disclaimer ("CheckPlease helps you check, but does not guarantee catching every error. We are not liable for errors that occur despite using the extension."). Also defines refund policy and acceptable use. | Termly.io / iubenda free tier, ~15 minutes |
| **Refund Policy** | The 30-day money-back guarantee, written clearly. Visible on the Lemon Squeezy checkout page and the CheckPlease landing page. | Lemon Squeezy has a built-in field — write 2 sentences |
| **Cookie / Tracking Notice** | If the dyslexia.help landing page uses any analytics (Plausible, GA), must disclose. | Termly cookie banner generator, or none needed if you use cookieless analytics like Plausible |

### Critical language rules — what NOT to say

These three words/phrases create real legal exposure if used in marketing copy:

- ❌ **"Guaranteed to catch every error"** — implies a warranty you can't honor. Use *"helps you catch errors"* instead.
- ❌ **"Never lose money to a typo again"** — same problem. Use *"reduce the chance of costly typos"* instead.
- ❌ **"Bank-grade security"** — bank-grade is a regulated standard you don't meet. Use *"works entirely on your device — your numbers never leave your browser"* (which is both true and stronger as a marketing claim).

### What you DO NOT need to worry about

| Concern | Why it doesn't apply |
|---|---|
| **PCI DSS compliance** | Applies to entities that store, process, or transmit credit card data. CheckPlease never touches the actual payment — only the confirmation step before. Out of scope. |
| **GDPR controller obligations** | Lemon Squeezy is the data controller for payment data. Your extension stores nothing. Privacy policy still required, but you're a minor data processor at most. |
| **HIPAA** | Not a health product. Even though dyslexia is a learning difference, you're not collecting health data. |
| **A lawyer at launch** | Overkill for a $19 Chrome extension pre-revenue. Revisit when you hit ~$50K cumulative revenue, or if a customer ever threatens legal action (unlikely with a money-back guarantee). |
| **EIN / LLC / corporate structure** | Recommended once you cross ~$10K revenue for liability protection, but not blocking for launch. Lemon Squeezy can pay a sole proprietor (you, personally) under your SSN initially. |

### Chrome Web Store extension review checklist

The Chrome Web Store rejects extensions for these specific reasons — verify before submission:
- [ ] Manifest declares ONLY the permissions actually used (don't request permissions "just in case" — auto-rejected)
- [ ] Description matches the actual functionality (no misleading marketing in the listing)
- [ ] Privacy policy URL is live and accurate
- [ ] Screenshots are real screenshots of the extension working, not mockups
- [ ] No copyrighted content (logos, fonts, images) without permission
- [ ] Single, narrow purpose stated clearly (CheckPlease passes this — one job, one description)

### When to revisit legal posture

Bring in actual legal counsel when ANY of these happen:

1. Revenue crosses $50K cumulative — worth $500–1500 to have a lawyer review your ToS and privacy policy
2. You get a customer complaint that mentions a dollar amount of harm allegedly caused by CheckPlease missing an error
3. You receive any letter from a regulator (FTC, state AG, EU data protection authority)
4. You decide to expand into actual financial services (e.g. directly integrating with bank APIs in v3+)

Until then: Termly templates + this PRD section + the "helps, not guarantees" language rule covers you.

---

## 12. Open questions / decisions still needed

1. **Final name & SEO research.** "CheckPlease" is the working title. Need a separate ~30-min pass: keyword volume on candidate names, taken-domain check, Chrome Web Store name conflicts, trademark search. Don't lock the name until this is done.
2. **Voice personality — warm "waiter" tone** (resolved). Matches the brand name. Examples: *"Excuse me — quick check?"* and *"You are about to pay one thousand dollars to Jane Johnson. Confirm?"* Settings page lets users override to neutral if preferred.
3. **Default site allow-list** (resolved for MVP). Intercept happens only on payment-flavored sites:
   - **Peer-to-peer:** paypal.com, venmo.com, cash.app, wise.com, zellepay.com, revolut.com
   - **Major US banks:** chase.com, bankofamerica.com, wellsfargo.com, capitalone.com, citi.com, usbank.com, pnc.com
   - **Email send-intercept:** mail.google.com (Gmail invoice emails)
   - **Payment processors embedded on other sites:** stripe.com, squareup.com, *.stripe.com checkout pages
   - User can add custom domains via the settings page; v1.1 may auto-detect "money-flavored" forms via field-name heuristics.
4. **Audio + visual are both always-on by default** (resolved). Audio CAN fail in many ways — muted volume, unplugged speakers, Bluetooth disconnect, shared office, hearing impairment, blocked browser audio permissions. The visual modal carries the full message on its own and fires every time alongside audio. A "mute audio" toggle is in settings for users who never want sound; visual-only mode is fully supported.
5. **Pricing model — six-tier LTD ladder + tester cohort, paywall ON from day one** (resolved — see section 9).
6. **Lemon Squeezy** (resolved). Used both for payment processing and the affiliate program. Real LS license validation built into the extension from day one — not stubbed. Comp codes for the 50-tester cohort are real Lemon Squeezy 100%-off discount codes (testing the full production purchase flow).
7. **Font — Verdana** (resolved). BDA-recommended for dyslexia, and a system font on every device — no font-loading delay or CDN dependency.
8. **Preview mode — permanent (not time-boxed)** (resolved). The audio readback is the paywall wedge. Visual modal works forever for free users; only paid (licensed) users hear the spoken plain-English version. Lower-friction discovery, higher-conversion ceiling.
9. **Logo / icon placeholder — "CP"** (resolved for MVP). Simple text-based icons (16/48/128 px) with the letters "CP" in the brand color. Final icon design commissioned via Fiverr ($20–50) before Chrome Web Store submission.

**Still open:**
- Final name & SEO research (Q1) — separate task before public launch.

---

## 13. Risks

| Risk | Mitigation |
|---|---|
| Nobody buys at $19. Validation fail. | That's the *point* of the LTD launch — find this out in 30 days, not a year. If under 20 sales by day 30, kill or pivot. |
| Refund rate spikes above 10% | Means the product isn't catching enough errors to feel valuable. Sharpen outlier thresholds, expand payment-detection to more sites, add a personal guarantee email per refund request to learn why. |
| Users find it annoying after a week and uninstall | Per-site skip, smart defaults, easy "only on Gmail" mode. Track retention obsessively. |
| Chrome breaks the extension with a manifest change | Standard manifest v3 risk. Keep the extension small and dependency-light. |
| A bigger player (Grammarly, Microsoft) bolts this onto their tool | The brand is the moat. "Built by a dyslexic adult, for dyslexic adults" — Grammarly can't claim that. dyslexia.help becomes the trust anchor. |
| False positives train users to ignore the prompt | Outlier threshold must be tuned conservatively. Better to miss some than to cry wolf. |
| Pirated license keys | Realistic for a $19 product — don't over-engineer DRM. A 30-day re-validation check is enough. Anyone determined to pirate a $19 dyslexia tool is not your customer anyway. |

---

## 14. Distribution & marketing

### Core marketing pillars — every piece of copy reinforces these four

1. **🔒 Privacy: nothing leaves your browser.** This is the loudest message. Other check-style tools live in the cloud and see every number you type. CheckPlease runs entirely on your device — your salary, your invoices, your account numbers, your medical co-pays — none of it ever touches a server. Headline phrasing options:
   - *"Your numbers never leave your browser."*
   - *"Works entirely on your device. Your bank, your business — none of our business."*
   - *"No cloud. No accounts. No tracking. Just your own personal proofreader."*
   - This belongs **above the fold** on the landing page, in the Chrome Web Store description, in every blog post, and in launch screenshots.

2. **Built by a dyslexic adult, for dyslexic adults.** The brand moat. Grammarly can't claim this. Speechify can't claim this. Your authenticity is the most defensible thing about CheckPlease.

3. **Like a handwritten check — but automatic.** The visual+audio dual-channel design pulled directly from the universal check-writing format (numerals + words). Single-sentence explainer that any adult immediately understands.

4. **One-time payment. No subscription anxiety.** The LTD model itself is a marketing message — especially for an audience prone to "did I forget to cancel?" stress.

### Privacy angle — why it sells harder than you'd expect

This isn't just compliance theater. For dyslexic adults specifically, the privacy story is **emotional, not technical**:

- Many have grown up being told they need help, that they can't be trusted to handle things alone, that their work needs supervision. *"This tool helps you, but never sees what you're doing"* directly inverts that lifelong shame dynamic.
- Financial info is the most sensitive category. *"It works on your device, doesn't even know what site you're on"* removes the *"can I trust this with my Venmo password?"* hesitation that kills installs.
- It's a sharp differentiator from Grammarly, which famously sends every keystroke to its servers. *"Like Grammarly, but it never sees your keystrokes"* is one of the cleanest competitive positions you can claim in this market.

Use the privacy headline in:
- The Chrome Web Store listing (first paragraph)
- The dyslexia.help landing page (above the fold)
- Every screenshot caption (*"This entire check happens on your computer"*)
- The launch blog post (a section called *"Why this tool can't see your numbers"*)
- The Hacker News title (*"Show HN: A privacy-first typo-catcher for payments — runs entirely in your browser"*)
- The Reddit posts (lead with privacy on r/privacy and r/degoogle subs as a distribution bonus)

### Launch tactics

- **Pre-launch landing page** on dyslexia.help — email collection with *"Get $5 off when we launch"* (kindling list).
- **Day-zero email blast** to that list with the founder's $14 coupon code (24-hour window).
- **Public launch at $19** — Chrome Web Store listing live, dyslexia.help blog post going up.
- **Launch blog post**: *"I lost $5,000 because I read $5 as $0.50. Here's the tool I built so it never happens again."* (Use your own version of the story, or get Natalie Brooks' permission to feature hers — note: Natalie's actual story is in pounds, but the US-converted version reads naturally for an American audience.)
- **Submit to Chrome Web Store** with screenshots showing the $5-to-$0.50 mistake being caught and the visual check-style modal.
- **Reach out to**: Natalie Brooks (dyslexiainadults), Stephen from the *Truth About Dyslexia* podcast, Made By Dyslexia, BDA UK. Affiliate program (30% recurring) for any of them who promote.
- **Reddit**: r/Dyslexia, r/ADHD (overlap), r/Entrepreneur (the self-employed angle), r/productivity.
- **Twitter/X**: thread version of the launch story. Marc Lou-style transparent build-in-public posts (*"Day 1: $0. Day 30: ?"*).
- **Hacker News "Show HN"** once polished — angle: *"Show HN: A Chrome extension that reads numbers aloud before you hit submit, built by a dyslexic founder for dyslexic founders."*
- **Price-increase emails** at every tier transition (built-in news pegs to drive a second and third sales surge).

---

## 15. Out-of-scope for this document

- Detailed UX wireframes (do these once the form factor is locked)
- Exact copy for the audio prompts and visual modal (write these alongside the build)
- Affiliate program mechanics (use Lemon Squeezy's built-in affiliate feature)
- Internationalization (English-only for MVP; revisit if there's UK/Australian demand pull)
- Mobile app (different product, different distribution, revisit after CheckPlease web hits 500 LTDs)
