---
trigger: always_on
description: NeoAdmin repository constraints, change boundaries, Bootstrap layout standards, and build requirements.
---

# NeoAdmin project standards

## Preserve existing project structure

- Preserve the `NeoAdmin` brand, `neoadmin` namespace, existing public pages, theme options, and working interactions.
- Before creating a file, directory, script, configuration, component, skill, or dependency, inspect the existing implementation and reuse its current extension points.
- Make the smallest change that satisfies the request. Do not add parallel architecture, duplicate documentation, alternate asset pipelines, new package targets, or framework dependencies when the current structure can handle the work.
- Add a new source page only when the requested example needs its own route. Add shared markup to existing Pug layouts, partials, and mixins; shared styles to existing SCSS components; and interactions to the existing TypeScript modules.
- Keep source files in `src/`, agent instructions in `.agents/`, and generated GitHub Pages HTML and assets in `docs/`. Never add generated HTML to the repository root or source Markdown to `docs/`.
- Do not edit generated HTML as the source of truth. Run `npm run build` after changes that affect generated pages or assets.

## Preserve visual and responsive behavior

- Keep the interface in English and preserve established content, spacing, surface hierarchy, dashboard legends, header alignment, dark mode, and the optional bottom navigation.
- Use the existing Sass tokens in `src/scss/neoadmin/_vars.scss` and Bootstrap theme variables before adding new values.
- Use Bootstrap 5.3 utilities and component APIs. Use its standard breakpoint values: 576px, 768px, 992px, 1200px, and 1400px. For max-width rules, align the boundary immediately below the next breakpoint, such as 767.98px before 768px.
- Validate relevant layouts at the exact Bootstrap breakpoint and immediately below and above it. Keep the desktop header independent from bottom-navigation visibility.
- Preserve semantic HTML, accessible names, native form behavior, `data-bs-*` Bootstrap hooks, and `data-neoadmin-*` NeoAdmin hooks.
- Keep date, calendar, card, widget, search, and notification examples under their matching UI or Pages menu groups, with an active state for each route.
- On mobile, keep repeated card and widget spacing close to one Bootstrap spacing step, use responsive grids for date controls and calendars, and avoid rounded active navigation pills where the design uses a selected row.
- Present public documentation with readable line lengths, distinct section rhythm, and clearly separated command blocks; keep its established content unless the requested change is editorial.
- Use Bootstrap Alert styling for NeoAdmin status notifications and position live messages at the top edge of the viewport.
- Check every icon against the installed Bootstrap Icons catalog and keep profile contact links populated with their public URLs.
- Keep the existing `neo20_logo.png` in the shared topbar brand and ensure Settings theme controls use the same `data-neoadmin-theme` contract as the TypeScript runtime.

## Keep the runtime and dependencies lean

- Use browser APIs, existing Bootstrap features, and existing project utilities before adding a library.
- Keep page-specific libraries behind existing lazy imports and do not load optional integrations on unrelated pages.
- Do not add or update dependencies, package scripts, lockfiles, framework adapters, or deployment configuration unless required by the explicit task.
- Keep TypeScript strict, framework-free, and free of inline event handlers and inline styles.
- Add no comments to TypeScript, JavaScript, SCSS, Pug, or HTML.

## Validate and publish carefully

- Run `npm run build` after source changes that affect the website and review the generated HTML and assets under `docs/`.
- Check local links, responsive layout, theme behavior, and browser console errors for the affected pages.
- Keep `package.json` and `package-lock.json` synchronized when a dependency change is explicitly required.
- Do not commit, publish, push, delete branches, change tags, or rewrite Git history unless the user explicitly requests that operation.
- Do not describe Vue or Angular component support. `npm run build:vue` only creates an ES module profile; Angular output is not implemented.
