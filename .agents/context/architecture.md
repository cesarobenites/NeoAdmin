# NeoAdmin architecture

NeoAdmin is a reusable Bootstrap dashboard template. `AGENTS.md` routes coding agents to focused skills under `.agents/skills/`. This context directory contains durable project architecture and workflow guidance, without task notes or agent history.

## Product purpose and design direction

NeoAdmin provides reusable administrative page patterns that developers can clone, brand through Sass tokens, extend with Pug and TypeScript, and publish as a static site. Its value is the ready-made shell and consistent set of examples: developers can start from working navigation, forms, tables, notifications, date controls, and dashboard views instead of rebuilding those foundations for each project.

The visual direction is light, calm, and professional. Use the existing pastel palette from Sass variables, white card and tile surfaces, restrained shadows, clear labels, and consistent spacing. Keep dashboard metric cards with their small legends and icon accents; do not turn them into solid blocks of color. Keep the header search, notification, and profile actions aligned to the right. Use the existing sidebar and page title hierarchy. Preserve the dark theme and optional bottom navigation as existing user-facing features.

When adjusting a page, follow the existing component shape and spacing rhythm across desktop and mobile. Use Bootstrap's responsive grid and breakpoints; keep cards readable, controls aligned, and page sections visually grouped. Prefer existing Bootstrap utilities and NeoAdmin Sass tokens over new one-off styles. Check both theme modes and the optional mobile navigation when a shared component changes.

## Shared capabilities and developer tools

- Bootstrap 5.3 supplies the layout grid, utility classes, form patterns, and native Modal, Offcanvas, Toast, Tooltip, and other component APIs.
- Pug supplies the semantic page examples and reusable layouts, partials, and mixins under `src/pug/`.
- Sass supplies the theme variables, Bootstrap customization, dark theme, and reusable component styles under `src/scss/`.
- TypeScript provides framework-free DOM controllers using native events and `data-neoadmin-*` hooks.
- Theme selection uses a saved `neoadmin-theme` Light or Dark override in the standalone `localStorage` implementation; otherwise TypeScript follows `prefers-color-scheme`, with a System control to clear the override. Host applications may adapt persistence to their own account storage.
- Browser toolbar tint is exposed as `--neoadmin-browser-theme-color` by the Sass theme, then synchronized to the shared `theme-color` metadata on startup and theme changes.
- Vite, TypeScript, Sass, and Pug create the static GitHub Pages output in `docs/`.
- Bootstrap Icons are compiled as a separate local stylesheet and font asset. Optional page integrations, including DataTables, Chart.js, TomSelect, IMask, and Flatpickr, are loaded only on pages that use them.
- Reusable examples include the dashboard, responsive sidebar and header, cards and widgets, forms, DataTables, date and time controls, notifications, search, settings, and account pages.

Keep these capabilities usable as a template: show clear example markup, keep integrations optional where possible, and do not make an example depend on an unrelated page's script or stylesheet.

## Source ownership

- `src/pug/` contains static HTML examples, shared layouts, partials, and mixins.
- `src/scss/neoadmin.scss` contains the theme, Bootstrap integration, and shared components.
- `src/scss/neoadmin-icons.scss` contains the complete Bootstrap Icons Sass catalog as a separate stylesheet entry.
- `src/ts/neoadmin.ts` owns framework-free DOM behavior and lazy page integrations.
- `src/images/` contains local image assets copied into the published asset tree.
- `.agents/context/` and `.agents/skills/` contain agent-facing project architecture and reusable instructions.
- `docs/` contains only the generated GitHub Pages site: HTML pages and `assets/`.

## Build output

`npm run build` type-checks TypeScript, builds the ES module and UMD library with Vite, compiles a small classic theme prepaint script, compiles the icon Sass entry to `docs/assets/css/neoadmin-icons.css`, and renders top-level Pug pages to `docs/*.html`. The prepaint script runs synchronously before theme CSS, applying the saved Light or Dark preference or the system color scheme to prevent a flash of the wrong theme. This includes the user-facing `docs.html`, `architecture.html`, and `agent-guide.html` pages. Vite copies images and the Bootstrap Icons WOFF2 font to `docs/assets/`. Generated HTML never belongs in the repository root. Markdown, installed dependencies, agent skills, and source documentation do not belong in `docs/`.

The base theme stylesheet is `docs/assets/css/neoadmin.css`. Optional integration styles are split from the main stylesheet where supported. The full icon catalog is kept in the separate `neoadmin-icons.css` asset and uses a same-origin WOFF2 file. Bootstrap forms use the system font stack and do not require a Bootstrap font asset. DataTables 3, Responsive, Chart.js, TomSelect, IMask, and Flatpickr remain dynamically imported; Flatpickr is loaded only by the Date & Time page.

## Framework targets

The current runtime is strict TypeScript and native DOM behavior. `npm run build:vue` remains an ES module output profile with automatic initialization disabled; it does not contain Vue components or a Vue dependency. Angular output is not implemented. See [targets.md](targets.md), [frontend-stack.md](frontend-stack.md), and [agent-skills.md](agent-skills.md) for target boundaries, frontend conventions, and skill usage.

## Visual baseline and Bootstrap migration

| Area | Initial design | Current implementation |
| --- | --- | --- |
| Dashboard metrics | White cards with a label, value, trend percentage, period legend, and colored icon | Same card hierarchy and legend, using Bootstrap 5 utilities and the configured Sass palette |
| Header | Right-aligned search, notifications, and profile actions | Same alignment with Bootstrap Icons, `data-bs-*` attributes, one sidebar control, and the command palette |
| Spacing | Card and tile spacing set in page markup and component rules | Shared values from `$app-content-padding`, `$app-content-padding-mobile`, `$card-padding-x`, `$card-padding-y`, `$tile-padding`, and `$card-margin-bottom` |
| Theme and mobile navigation | Initial layout predates the current dark theme and optional bottom navigation | Dark theme and optional mobile bottom navigation remain available |

Modernization replaces obsolete Bootstrap 4 classes and Font Awesome markup with Bootstrap 5 utilities and the local Bootstrap Icons catalog. Keep deliberate grid gutters for page composition and use shared spacing tokens for repeated surfaces.
