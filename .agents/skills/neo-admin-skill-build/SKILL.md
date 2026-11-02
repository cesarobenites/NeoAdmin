---
name: neo-admin-skill-build
description: Build, size, and validate the NeoAdmin Vite, Sass, Pug, and GitHub Pages output.
---

# NeoAdmin Build

Use this skill for Vite, package scripts, dependency boundaries, static output, and bundle size.

## Standards

- Use `npm run build` to type-check and generate the distribution under `docs/`.
- Keep Pug page sources in `src/pug/` and generated pages in `docs/`.
- Keep optional JavaScript and CSS behind page-level dynamic imports where supported.
- Keep Bootstrap Icons as a separate complete CSS asset and copy only the WOFF2 font.
- Keep package manifests and lockfiles synchronized.
- Inspect chunk output when adding dependencies and avoid adding libraries to the global entry unnecessarily.
- Preserve Sass-driven `--neoadmin-browser-theme-color` output and verify that the shared TypeScript runtime updates the Pug theme-color meta value for both themes.
- Keep the small classic theme prepaint entry synchronous and before theme stylesheets so saved and system theme preferences apply before first paint.
- Keep generated files out of the repository root and source code free of comments.
- Do not publish unless the user explicitly asks.

## Resources

- [Vite configuration](../../../vite.config.ts)
- [Build scripts](../../../package.json)
- [Architecture](../../context/architecture.md)
