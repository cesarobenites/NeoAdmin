---
name: neo-admin-skill-pug
description: Maintain NeoAdmin Pug examples and generated GitHub Pages HTML.
---

# NeoAdmin Pug

Use this skill for page examples, shared layouts, mixins, partials, navigation, and generated HTML.

## Standards

- Treat `src/pug/` as the source for static HTML examples; `npm run build` writes pages to `docs/*.html`.
- Put shared admin structure in `src/pug/layouts/`, navigation in `src/pug/partials/`, and reusable components in `src/pug/mixins/`.
- Keep semantic HTML, accessible labels, and Bootstrap 5 classes.
- Use `data-neo-*` for NeoAdmin behavior and `data-bs-*` for Bootstrap behavior.
- Preserve established page hierarchy, legends, spacing, header alignment, and the English interface.
- Keep Date & Time under UI Elements and route Search Results under Pages; set the correct active treeview state on each page.
- Use only icon names present in the installed Bootstrap Icons package and render pagination icons as child elements.
- Build icon examples from the local Bootstrap Icons catalog and link to the official icon reference when listing available names.
- Keep date examples labeled and varied, with responsive columns for date, time, month, week, and range controls.
- Keep generated pages in `docs/`, never in the repository root.
- Include the shared theme-color meta hook in the admin layout without hardcoding the light or dark color in Pug.
- Keep footer search and quick search command palette actions available from the mobile footer navigation.
- Keep source code free of comments and preserve the `NeoAdmin` brand and `neoadmin` namespace.

## Resources

- [Admin layout](../../../src/pug/layouts/_admin.pug)
- [Sidebar](../../../src/pug/partials/_sidebar.pug)
- [Pug documentation](https://pugjs.org/api/getting-started.html)
