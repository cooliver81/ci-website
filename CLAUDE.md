# ci-website: session rules

Static site for the Concordia International Weightlifting Club, live at https://ciweightlifting.ca
(GitHub Pages, deploys from `main`).

## Rules

1. **`main` is production. Never commit or push to it directly.** Work on a branch, open a PR, and let
   Oliver merge it.
2. **No build step, no framework, no dependencies.** Plain HTML/CSS/JS that a volunteer can edit on GitHub.
   Tooling used only to check the site (screenshots, tests) stays out of the shipped files.
3. **Content changes go in `CONFIG` at the top of `main.js`**, not in the HTML. Exception: the email,
   Instagram and address also appear as static fallbacks in `index.html` so they work without JS;
   keep both in sync.
4. **Don't invent club facts** (prices, coaches, age policy, affiliations). Ask Oliver.
   The club does **not** offer trial sessions: calls to action say "Get in Touch" / "Contact Us"
   and link to the inquiry page.
5. **Images:** lowercase-kebab-case file names, sized for their display size (roughly 2× for retina),
   and with `width`/`height` attributes on `<img>`. Nothing over ~200 KB without a reason.
6. Header and footer markup is duplicated across `index.html`, `inquiry/index.html` and `404.html`.
   Change all three together.
7. `404.html` uses root-absolute paths (`/style.css`) because Pages serves it at any missing URL.
   The other pages use relative paths.

## Checking a change

- Serve locally (`python -m http.server 8000`). Don't open the files via `file://`.
- Check phone (390px) and desktop (1280px+): no horizontal scroll, the menu opens and closes, the inquiry
  form blocks empty or invalid submits.
- Check the browser console for errors.

At the end of a session, update **Status** and **Session log** in `docs/PLAN.md`.
