# NeoAdmin frontend stack

## Bootstrap and forms

NeoAdmin uses Bootstrap 5.3 utilities and native Bootstrap JavaScript components. Forms use Bootstrap's system font stack; they do not need a separately installed web font. NeoAdmin's typography tokens use Outfit where the theme calls for it.

## Icons and assets

The complete Bootstrap Icons catalog is compiled locally into `docs/assets/css/neoadmin-icons.css`; its WOFF2 font is copied into `docs/assets/fonts/`. This stylesheet is separate from `neoadmin.css`, and no icon CDN or full SVG sprite is used.

## Source and output

Pug views in `src/pug/` demonstrate HTML composition. Shared markup belongs in layouts, partials, and mixins. Vite builds TypeScript and the main SCSS theme into `docs/assets/`; Pug renders only top-level pages into `docs/*.html`. Agent context and guides stay in `.agents/context/`, outside the published site.

## Visual compatibility

Preserve component hierarchy, spacing rhythm, labels, legends, and navigation alignment when modernizing markup. Dashboard metrics remain white Bootstrap surface cards with small trend legends and icon accents from the configured Sass palette. Header actions remain right-aligned. Keep the dark theme and optional mobile bottom navigation.

Shared surfaces use the spacing tokens in `src/scss/neoadmin/_vars.scss`. Keep app title padding aligned with app content, card padding aligned with Bootstrap card bodies, and tile padding aligned with the shared tile token.

## TypeScript and optional integrations

The active runtime uses strict TypeScript, native DOM events, Bootstrap component APIs, and `data-neoadmin-*` attributes. DataTables 3, Charts, TomSelect, and IMask load only when matching page markers exist. Flatpickr and its month picker styles load only on the Date & Time page. Date events are framework-neutral; the Vue-compatible output remains an ES module profile and Angular output is not implemented.

The theme controller checks the `neoadmin-theme` Light or Dark override in standalone `localStorage` before consulting `prefers-color-scheme`. With no override, it applies and tracks the system preference; Settings provides a System choice to clear a manual override. Host applications can adapt preference storage to their account architecture.
