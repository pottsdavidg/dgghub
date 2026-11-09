# Handoff: "Politics" web app prototype (Digital Ground Game)

This file gives another Claude (or developer) the context needed to keep working on this project. It summarizes a long design-and-build session between David Potts (DGG Media & Research Team) and Claude. Read it alongside the source zip (`political-hub.zip`).

---

## 1. What this is and why

- **Organization:** Digital Ground Game (DGG), https://digitalgroundgame.org/. A volunteer-run political organizing group with regional "squads" and teams.
- **Goal:** a clickable proof of concept for a civic/political web app. David will present it to **Jennifer Pahlka at the "What's Next" conference in Denver** to seek funding.
- **Current name:** **"Politics"**. It was "Political Hub" until the latest round. The browser title and the big top-left brand both say "Politics", and the first top-nav link is "Home" (formerly "Hub").
- **What it does:** a free, nonpartisan-in-function civic hub for anyone, plus deeper organizing tools for people who join a DGG team.

## 2. Tech stack and how the prototype is built

The team's real stack is **FastAPI + HTMX + SQLite + Jinja2**. The prototype was written so it ports to that stack almost 1:1. It runs entirely in the browser with a **mock server** that intercepts HTMX requests.

| Prototype file | Becomes in production |
|---|---|
| `index.html` | `templates/base.html` (root div, pop-up slot, toast, scripts) |
| `pages/<page>/` | One folder per page, named after the page's full name (e.g. `pages/civics101/`). `<page>.view.js` = Jinja2 template(s) (each `V.page` / `T_partial` function becomes a template), `<page>.routes.js` = FastAPI router (each `route('GET','/path/{id}', handler)` becomes `@app.get("/path/{id}", response_class=HTMLResponse)`), `<page>.data.js` = SQLite seed data, `<page>.css` = `static/css/`. Page groups: `pages/democracylab/` (Democracy Lab), `pages/dggteam/` (DGG Team), `pages/publicpages/` (public About us / Regions / Mailing list); a group-level file (e.g. `pages/democracylab/democracylab.css`, `pages/dggteam/dggteam.data.js`) holds what that group's pages share. |
| `js/mock-server.js` | **Deleted.** It stands in for FastAPI. |
| `js/data/core.js`, `js/data/db.js` | Shared seed data (user, elections, states, links) and the `DB` object (`db.js` loads last). |
| `js/views/core.js`, `js/views/shell.js` | Shared templates: icons + helpers; header, sidebar, pop-ups. |
| `js/routes/core.js`, `auth.js`, `ui.js` | Shared routes: session, access levels, `renderPage`; sign-in/sign-up; pop-ups and pins. `css/base.css`, `css/shell.css`, `css/legacy.css` are the shared stylesheets. |
| inline `<script>` in index.html | `static/js/ui.js` (small client glue that stays) |

**Mock server conventions (`js/mock-server.js`):**
- Defines `route(method, pattern, handler)`. A handler receives `{params, query, form, res}` and returns an HTML string.
- `res.toast(msg)`, `res.trigger(name, value)` and `res.retarget(selector, swap)` set the same `HX-Trigger`, `HX-Retarget` and `HX-Reswap` headers FastAPI will set.
- A fake `XMLHttpRequest` intercepts only paths that start with `/`.
- `window.__mockHandle(method, url, body)` is exposed for tests.

**HTMX:** htmx 1.9.12 from unpkg (`https://unpkg.com/htmx.org@1.9.12/dist/htmx.min.js`). The app uses:
- `hx-get` / `hx-post` / `hx-target` / `hx-swap` (innerHTML, outerHTML, none) / `hx-vals` (via a `vals()` escape helper) / `hx-include`;
- `hx-trigger` (load, change, `keyup changed delay:250ms`);
- `hx-swap-oob` (`true` and `innerHTML`);
- `htmx:configRequest`;
- `HX-Trigger` events named `toast` and `set-theme`.

**Size:** about 3,300 lines total in ~105 small files (the largest is ~250 lines), grouped by page so two people can work in parallel without merge conflicts. Script and stylesheet order in `index.html` matters: see the comments there.

**Working in parallel:** work on a page inside its folder under `pages/`: markup in `<page>.view.js`, endpoints in `<page>.routes.js`, sample data in `<page>.data.js`, styles in `<page>.css`. A new file must also be added to `index.html`. Shared code lives in `js/` and `css/`; change it with care, since every page uses it. `css/legacy.css` holds rules no current markup uses (left from earlier builds); check and delete them in a cleanup pass.

**Hosting constraints:**
- The prototype is published as a claude.ai Artifact, where the CSP blocks outside fetches and inline `onclick`. All UI clicks use delegated listeners on `data-ui` / `data-copy` attributes instead.
- The layout must work at 400px phone width with no horizontal scroll.

## 3. Brand

- **Colors:**
  - Digital Blue `#1144FF`
  - Action Red `#FF0F43`
  - Star Yellow `#FFC800`
  - Ground White `#FBFCFF`
  - Impact Black `#242424`
- **Fonts:** Staatliches (display), Roboto Condensed (headings/labels), Alexandria 900, Google Sans / system for body, Roboto Mono for small data labels.
- **Assets in `img/`:**
  - `logo-white.png` (DGG logo)
  - `massive-tile.webp` (big repeating "DIGITAL GROUND GAME" background)
  - `pattern-tile.png` (faint text pattern used on blue banners)
- **Look:** flat, bold, square corners, hard offset drop-shadows, uppercase condensed labels, and a yellow underline marking the selected nav item.
- **Theming:**
  - CSS tokens live on `:root`. Dark overrides sit under both `@media (prefers-color-scheme:dark){:root:not([data-theme="light"])}` and `:root[data-theme="dark"]`.
  - "Chrome" tokens (`--chrome`, `--chrome-fg`, etc.) drive the header and sidebar: white with dark text in light mode, black in dark mode.

## 4. Access levels (the core product model)

There are three levels. The page allow-lists are in `routes.js`: `VISITOR_PAGES`, `ACCOUNT_PAGES`, `MEMBER_PAGES`.

1. **Visitor (no account):**
   - Dashboard with a location form, plus a countdown banner when an election is within 100 days. It also shows recent bills, Explore tools, Upcoming dates and the DGG call to action.
   - Pages: Registration lookup, Sample Ballot, Representation, Bills & Laws (federal only), Voting History, Civics 101, Resources, Help.
   - A light/dark mode button at the bottom of the sidebar.
2. **Account (free):**
   - Government pages are grouped under a "Your Government" dropdown.
   - "Digital Tools" group: Resources (incl. Help), **Political Media**, Local Chapter, Election Data ("soon"), and a **Democracy Lab** dropdown shown locked.
   - A yellow **Join Team** button.
   - Saved location, saved lookups, pins, and a state picker in Bills & Laws.
3. **Team Member:**
   - Adds a "DGG Team" sidebar section: Contact, Inbox, Tasks, Local Chapter, Operations.
   - Democracy Lab unlocks: **The Blue Book** (wiki), **Election Models**, **Tracker Suite** (LegisTracker / Court Tracker / Agenda Tracker [Project 2025] / ExecuTracker), **Rolodex**.
   - Teams: Dev, Research, Media, Events, Welcome. A short team-matching quiz runs at join.

**Settings** (account users) has:
- account status;
- a presentation-mode **"View as"** switch (Visitor / Account / Member), handy for demos;
- profile, location, appearance (theme) and pop-up preferences.

## 5. Cross-cutting features

- **Collapsible sidebar:**
  - Client-side; the state is stored in localStorage `dgg-side` and applied before first paint.
  - Collapsed width is 68px, open width 272px.
  - At 900px and below it becomes a slide-in menu with a scrim behind it.
- **Sign-up pop-ups:**
  - Contextual nudges (`PROMPTS` in routes.js), e.g. "Save your location" or "Keep your ballot handy". Each one shows once per session per reason.
  - Each has a "Don't show me these pop-ups again" checkbox. When pop-ups are turned off, a quiet toast shows instead.
  - Team nudges (`TEAM_PROMPTS`) work the same way for account users.
  - Pop-ups render into `#modal` via `hx-swap-oob="innerHTML"`. A MutationObserver focuses the first field, and Escape closes the pop-up.
- **Create account pop-up:** asks for name, email, password, and **address, city, state, ZIP**, so the dashboard is personalized immediately.
- **Pins:** pin/flag buttons on reps, bills, registration and so on build a customizable dashboard (`/pins/toggle`).
- **Not included on purpose:** no sign-in landing page and no site-wide search bar.
- **Header:** brand "Politics", then links Home - About us - Discord, plus mail, Donate and Sign in / user menu.
- **Public pages:** About us, Regions (5 regional squads, each with a detail page), Mailing list.

## 6. Section notes

- **Bills & Laws:**
  - Federal/State toggle plus a state dropdown covering all 50 states and DC. It defaults to the user's state.
  - Ohio has a hand-written sample list. Other states are generated placeholders (`billsForState()` in data.js, cached).
  - Flags pin bills; the H.R. 2817 detail page shows a text diff demo.
- **Political Media:** three large centered tabs.
  1. **DGG Media** (default): Pragmatic Papers banner, Videos & photos, Workshops.
  2. **Your Politics:** political media near the user: videos from politicians, social media posts, and local news organizations.
  3. **Approved Creators:** approval criteria plus creator cards.
- **Civics 101:** branches, Constitution articles, Bill of Rights, key amendments, Congress history, lectures, and quiz games.
- **Representation:** federal / state / local columns, rep detail pages, and a search box.
- **Sample Ballot:** expandable candidates with an info button, plus community "breakdowns" that team members write.
- **Election Data:** 2024 electoral vote tile map (sample data).

## 7. Real vs. sample data

**Real:**
- the 2025 federal cabinet and Supreme Court justices;
- state names, House seat counts, capitals and largest cities;
- DGG's real CTA, regions, about text, socials and calendar (pulled from digitalgroundgame.org);
- the links listed below.

**Sample or fictional:**
- representatives below federal level;
- most bills, ballots and voter-record lookups;
- local news outlets and meeting agendas;
- creators;
- team tasks, inbox and operations.

**Labeling:** pages that use made-up data carry a "SAMPLE DATA" / "SAMPLE CONTENT" tag.

**Links:**
- Donate: https://secure.actblue.com/donate/dggsubscriber
- Discord: https://discord.gg/digitalgroundgame
- Website: https://digitalgroundgame.org/
- Pragmatic Papers: https://pragmaticpapers.com/ (submit at https://pragmaticpapers.com/writing-for-us)

## 8. Live government data (api.data.gov)

- David has an api.data.gov key for the Congress.gov API.
- **Rule agreed on:** the key must **never** be put in browser-side JavaScript. It lives in a gitignored `.env` (`DATA_GOV_API_KEY=...`) read only by a local script or the FastAPI server.
- `scripts/pull-gov-data.mjs` (Node 18+, no packages) and `scripts/congress_client.py` (a Python client that drops into FastAPI) were written in an earlier build. The .mjs writes a `js/live-data.js` snapshot.
- **The current "Politics" build does not load `live-data.js` yet.** Wiring real data into Representation and Bills is a natural next step, done server-side in FastAPI.

## 9. How it was tested

- Playwright + Chromium against a local `http.server`, at 1600px desktop plus several narrower widths down to 400px.
- The sandbox couldn't download real htmx, so tests used a small custom **htmx test shim**. It supports hx-get/post, OOB swaps, swap none, HX-Retarget/Reswap, HX-Trigger and configRequest.
- **Re-test with the real htmx before the demo.**
- The suite covers:
  - all three access levels, navigation and pop-ups ("don't show again");
  - pins, address at sign-up, and the bills state picker;
  - Political Media tabs, the light/dark switch and its persistence;
  - presentation-mode "View as";
  - that tags stay inside their cards at seven window widths.
- The last run had 0 failures.

## 10. Build history (condensed)

1. **First mockup:** a static, single-file hub. Built the brand look, the landing banner with the tile background and a fogged-glass tagline bubble, and swapped in the real logo and pattern tile.
2. **Alternate "App Suite" version:** no login. App buttons for THE BLUE BOOK, EXECUTRACKER, LEGISTRACKER, COURT TRACKER, AGENDA TRACKER.
3. **Feature growth in the static version:**
   - Democracy Lab naming;
   - Media, Local Chapter, Know Your Stuff civics games;
   - a Trackers dropdown, Election Model, Workshops and Rolodex;
   - the team-matching quiz, a Citizen vs. Team Member model, a donation banner, and a light/dark toggle.
4. **Rewrite in HTMX with the mock server** (ready to port to FastAPI):
   - account options and settings;
   - real DGG content and the Discord link;
   - top nav, Inbox, and the Pragmatic Papers banner;
   - api.data.gov scripts.
5. **"Political Hub" overhaul** from David's `Webapp_Prompt.md` spec, with mockups:
   - the three-level model (Visitor / Account / Team Member);
   - the collapsible sidebar;
   - pins;
   - sign-up pop-ups.
6. **Fix round 1:**
   - smaller lock icon and larger privacy note on Registration;
   - address fields at sign-up;
   - state dropdown in Bills & Laws;
   - "DGG Media" renamed to Political Media with 3 tabs;
   - visitor sidebar theme switch;
   - white header and sidebar in light mode.
7. **Fix round 2:** renamed to "Politics", and "Hub" became "Home".
8. **Fix round 3:** creator and region tags no longer spill out of their cards. "Approved" moved into the creator tag row, and region cities became separate wrapping tags.

## 11. Known gaps and good next steps

- Port to FastAPI + Jinja2 + SQLite using the file mapping above. Real auth and sessions replace `SESSION` in routes.js.
- Wire Congress.gov data server-side (bills, members), keeping the key in `.env`.
- Find real sources for state bills, local news, local reps, ballots and voter-record lookups (state SOS sites or vendors).
- Replace fictional creators and news outlets with real, vetted ones (the DGG Media Team's call).
- Election Data is marked "soon".
- Test with the real htmx build and on real phones before the demo.

## 12. Working preferences from this session

- David gives numbered lists of small fixes. Do each fix, test it, then republish and resend the zip.
- Keep the brand colors and fonts exact. Keep the layout working at phone width.
- Keep the file mapping intact (routes / views / data / mock-server) so the FastAPI port stays easy.
- Never put API keys in front-end code.
