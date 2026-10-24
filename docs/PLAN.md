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
4. **Content gaps** (needs club input): first-session info (cost, what to bring, book or drop in),
   coaches and affiliation, age policy, a French version.

## Status

Milestone 1 done on branch `polish/readme-and-ui`, waiting for PR review. Open questions for the owner:
the unused images in `images/`, the founding year (2001 or 2002), the code licence, and the content gaps in milestone 4.

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
