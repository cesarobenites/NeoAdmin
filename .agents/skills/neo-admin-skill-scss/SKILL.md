---
name: neo-admin-skill-scss
description: Maintain NeoAdmin Sass tokens, reusable components, Bootstrap integration, and themes.
---

# NeoAdmin SCSS

Use this skill for colors, spacing, typography, cards, tiles, layout, dark mode, component styles, and vendor styles.

## Standards

- Start from `src/scss/neoadmin.scss` and read tokens from `src/scss/neoadmin/_vars.scss`.
- Put shared rules in `src/scss/neoadmin/component/` and page-specific rules in `src/scss/neoadmin/pages/`.
- Use tokens and Bootstrap CSS variables instead of repeated hardcoded values.
- Keep cards and tiles padded, rounded, shadowed, and compatible with light and dark themes.
- Keep dashboard metrics as surface cards with small trend legends and palette-colored icon accents.
- Preserve component hierarchy and spacing; use `@use` and scoped selectors.
- Keep mobile card and widget gaps compact using shared spacing tokens, and maintain comfortable documentation code blocks and section rhythm.
- Avoid adding card margins on top of Bootstrap row gutters; tune mobile surface spacing in Sass so grids do not double their vertical gaps.
- Keep the mobile bottom navigation flush with the viewport bottom with square corners; round only the upper corners of its dropdown surfaces.
- Expand mobile footer search as a full-width row directly above the bottom navigation, and expose the quick search command palette from the footer navigation.
- Ensure calendar grids, profile headers, and top-positioned alert notifications adapt to Bootstrap breakpoints and both themes.
- Keep the complete Bootstrap Icons catalog separate from the main theme stylesheet.
- Keep browser toolbar theme colors derived from Sass tokens through `--neoadmin-browser-theme-color`; provide the dark value from the dark header surface instead of duplicating color literals in Pug.
- Keep source code free of comments and avoid duplicate vendor imports.

## Resources

- [Theme entry](../../../src/scss/neoadmin.scss)
- [Tokens](../../../src/scss/neoadmin/_vars.scss)
- [Dark theme](../../../src/scss/neoadmin/_dark-theme.scss)
