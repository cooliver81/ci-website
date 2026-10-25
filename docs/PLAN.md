# Plan

## Scope

Keep the club's site accurate, fast and easy for volunteers to update. Improve quality in small, verified
steps without changing the stack (static HTML/CSS/JS on GitHub Pages).

## Milestones

1. **Presentable repo and polish pass.** README, session rules, image cleanup, phone layout, form
   validation, link previews, 404 page. *Done (session 1).*
2. **Automated checks.** Playwright smoke tests (pages load, form validates, phone viewport has no
   horizontal scroll, menu works), then a GitHub Actions workflow that runs them on each PR.
3. **Measured performance.** Lighthouse in CI on each PR, with before/after numbers recorded here.
4. **Content gaps** (needs club input): joining info (cost, what to bring, how to start),
   coaches and affiliation, age policy, a French version.

## Status

Milestone 1 merged and live (PR #1). Session 2's first two commits (trial wording, README) are already on `main`
(they reached it without a PR). The rest of session 2 is on branch `fix/no-trial-sessions`, waiting for a PR.

Decisions:
- Founding year is 2002. The `ciwc2001@` address is just the mailbox name and stays.
- The unused images in `images/` stay for now.
- The club does not offer trial sessions. The single call to action is "Get in Touch".
- No code licence. Default copyright (all rights reserved) applies, and the README notes that photos and logos
  aren't for reuse. Revisit only if someone asks to reuse the code.
- `CLAUDE.md` stays committed. It holds the rules for this repo (`main` is production, no invented club facts),
  so it belongs with the code.

Still open: the content gaps in milestone 4.

## Session log

### Session 1: polish pass
- Three review passes ran in parallel: visitor UX (beginner, parent, sponsor), front-end code review,
  and repo presentation. Each finding was checked against the code before acting on it. One was rejected:
  the reported button contrast failure is ≈5.0:1 when computed, which passes AA.
- Images: renamed to kebab-case. The About photo went from 1.0 MB to 66 KB. The header logo went from a 325 KB
  PNG to 9 KB/192px, with proper favicon and touch icons. Added a 1200×630 link-preview image. The shared MNA logo
  file was renamed to what it shows (Assemblée nationale).
- Home page: the primary call to action is now the trial session. The schedule comes before the videos, with the
  location stated once and linked to Maps. Phone layout fixes: compact schedule rows, the video player capped at
  one screen, two-column sponsors, no truncated header text. Added a "Become a Sponsor" link and footer links.
  The quote controls only show with 2+ quotes, and the quote panel pauses on hover/focus and respects
  reduced motion.
- Inquiry page: the nav was hidden on phones (no menu button), now fixed. The form card touched the screen
  edges on phones, now fixed. Fields are validated before sending, double submits are blocked, Formspree's
  error message is shown, and the ARIA roles on the alerts are corrected.
- Meta: descriptive titles, absolute `og:image`, canonical URLs, and `SportsClub` JSON-LD built from `CONFIG`.
  The YouTube embed now uses `youtube-nocookie.com` and the current `videoseries` URL.
- Added `404.html`, `README.md` rewrite, `CLAUDE.md`, this plan, `.gitignore`, `.gitattributes`.
- Verified in headless Edge at 390px and 1366px: no console errors, no horizontal overflow, empty and invalid
  submits blocked, valid submit and error paths tested against a mocked Formspree, and the 404 page styles
  load from a nested path.

### Session 2: copy fix
- Removed every mention of trial sessions (the club doesn't offer them). The hero button is now "Get in Touch",
  the About button "Contact Us", and the meta descriptions, inquiry intro and README were updated to match.
  Session 1's "trial session" call to action was wrong.
- Cut the README down to what the site is (no screenshots, setup or deployment notes) and removed `docs/screenshots/`.
- Simplified the home page. Removed the Contact section, which repeated the address, Instagram, YouTube and the
  inquiry link. The page order is now About → Videos → Schedule → Sponsors. The inquiry link appeared 4 times
  with 4 different labels; it's now "Get in Touch" in the nav and hero, plus an inline link in About.
  The footer shows the email address itself, since it's the only place left to find it.
- Cleanup check: no trial wording or links to the removed Contact section remain, and main.js and style.css have no
  dead code. The nav link on the inquiry and 404 pages said "Inquiry"; it now says "Get in Touch" like the home page.
  Checked at 390px: no horizontal overflow, and the nav fits.
