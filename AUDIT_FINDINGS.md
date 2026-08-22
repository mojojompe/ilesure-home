# ilesure-home (Marketing / Landing Site) — Detailed Audit Findings

**Date:** 2026-08-12 · Vite/React + framer-motion + gsap (public marketing site) · Read-only, no code modified.
See the root [PROJECT_AUDIT.md](../PROJECT_AUDIT.md) for the cross-layer summary.

> This is an unauthenticated public site, so its risk surface is small. No committed `.env` and no hardcoded secrets were found (`.env` is gitignored, no `dangerouslySetInnerHTML`). The findings are a third-party script, an open form intake, and committed dev artifacts.

**Totals (HOME): Medium 1 · Low 3.**

---

## MEDIUM

### H-M1. Third-party Google Translate script executes on every page load
- **Category:** Supply-chain / Privacy · **Location:** `index.html:80-89`
- **Defect:** A Google Translate `<script>` is injected and runs on every page load, **regardless of the consent modal** (i.e. before/without user consent).
- **Impact:** Supply-chain exposure (remote script has full-page DOM/JS access) and a privacy/consent concern (data sent to a third party before consent). If the marketing site and app ever share an origin/session surface, a compromised third-party script is a larger problem.
- **Fix:** Load translation only after explicit consent; prefer a self-hosted / consent-gated integration; add SRI/CSP for any remaining third-party scripts.

---

## LOW
- **H-L1** Committed dev artifacts / source-mutating scripts — `extract-and-translate.cjs`, `refactor_i18n.cjs`, `refactor_i18n.js`, `remove-bg.cjs/py`, `remove_animations.cjs`, `update-locales.cjs`, `extracted.json`, `temp.json`, `temp_all.json`. No secrets/PII leaked, but they clutter the tree and encode stale one-off patterns; `ts-morph`/`jimp` are heavy deps pulled in for these. Fix: move to a non-shipped `scripts/` folder or delete.
- **H-L2** Literal PowerShell escape baked into markup — a stray `` `n `` (PowerShell newline escape) appears in `index.html:80`, indicating the script block was generated/pasted from a shell command. Cosmetic but confirms hand-edited generated HTML. Fix: clean the injected markup.
- **H-L3** Waitlist/contact form: client-only validation + open unauthenticated POST with PII, no rate-limit/CAPTCHA visible client-side. The submission target must be validated and rate-limited **server-side** (backend also flags unauthenticated, unsanitized intake — support tickets D-M4 and no waitlist rate-limit). Fix: server-side validation + rate-limit/CAPTCHA on the intake endpoint.

---

## Verified OK (home)
- No committed `.env`, no hardcoded API keys/secrets/tokens in source; `.env` gitignored.
- No `dangerouslySetInnerHTML`; no auth/token handling on this site (public, read-only marketing content).

**Backend dependency:** the waitlist/landing intake writes to the `Landing` model, but admin email broadcasts read `LandingEntry` (a different collection) — so landing-page signups collected here are **silently missed** by "waitlist"/"all" broadcasts (backend D-M5).
