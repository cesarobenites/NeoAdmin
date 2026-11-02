---
name: neo-admin-skill-bootstrap
description: Build NeoAdmin views with Bootstrap 5 components, utilities, and responsive patterns.
---

# NeoAdmin Bootstrap

Use this skill for Bootstrap markup, responsive layout, forms, navigation, modals, offcanvas panels, tooltips, and toasts.

## Standards

- Follow the Bootstrap version recorded in `package.json` and use Bootstrap 5.3 utilities and native JavaScript APIs.
- Use logical spacing and alignment utilities such as `ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, and `text-end`.
- Use `.row.g-*` for grid spacing and `.mb-*` for field spacing.
- Keep interactive behavior in TypeScript with `data-neo-*` or `data-bs-*` attributes.
- Preserve NeoAdmin surface styles, spacing tokens, dashboard metric legends, icon accents, and right-aligned header actions.
- Keep tables inside `.table-responsive` and review layouts at 767.98px, 768px, and the next relevant Bootstrap breakpoint.
- Keep labels associated with fields and provide accessible names for icon-only buttons.
- Use Bootstrap `.placeholder-glow` or `.placeholder-wave` for lightweight loading skeletons, mark loading regions with `aria-busy`, and remove or replace placeholders when content is ready.
- Group date and time controls in responsive grid columns, keep calendar grids usable below 576px, and preserve visible keyboard focus.
- Use square or minimally rounded active rows in mailbox navigation and verify the active contrast in light and dark themes.
- Match transient NeoAdmin notifications to Bootstrap Alert variants and keep the live region at the top of the viewport.
- Keep source code free of comments and preserve the English interface, `NeoAdmin` brand, and `neoadmin` namespace.

## Resources

- [Theme tokens](../../../src/scss/neoadmin/_vars.scss)
- [Shared layout](../../../src/pug/layouts/_admin.pug)
- [Bootstrap components](https://getbootstrap.com/docs/5.3/components/)
- [Bootstrap utilities](https://getbootstrap.com/docs/5.3/utilities/)
