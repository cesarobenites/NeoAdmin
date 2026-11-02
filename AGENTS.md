# NeoAdmin agent entry point

NeoAdmin is a reusable Bootstrap admin template with Pug examples, a modular Sass theme, and a framework-free TypeScript runtime. Keep its existing brand, design, routes, features, and static GitHub Pages build intact.

## Start here

1. Read `.agents/rules/project-standards.md` for repository-wide constraints.
2. Read `.agents/context/architecture.md` for product purpose, visual design contract, source ownership, runtime capabilities, and build output.
3. Load only the relevant skill from `.agents/skills/` before changing a related area:
   - `neo-admin-skill-bootstrap` for Bootstrap components, utilities, and responsive layouts.
   - `neo-admin-skill-pug` for page markup, shared layouts, partials, and mixins.
   - `neo-admin-skill-scss` for Sass tokens, components, themes, and visual consistency.
   - `neo-admin-skill-typescript` for DOM controllers, Bootstrap APIs, and native events.
   - `neo-admin-skill-tables` for DataTables, filters, persistence, and density controls.
   - `neo-admin-skill-dates` for date and time controls and their events.
   - `neo-admin-skill-build` for Vite, Pug rendering, asset output, and size validation.
4. Read `.agents/context/targets.md` before changing build profiles or describing React, Vue, or Angular support. Read `.agents/context/frontend-stack.md` for implementation conventions and `.agents/context/agent-skills.md` when documenting agent use or skill reuse.

## Change boundaries

- Treat `src/pug/`, `src/scss/`, `src/ts/`, and existing build configuration as the source of truth. Generated pages and assets belong in `docs/`; never create generated HTML or published Markdown in the repository root.
- Extend existing layouts, partials, mixins, Sass components, and TypeScript controllers before adding parallel files, dependencies, scripts, or architecture.
- Keep all custom hooks within the `neoadmin` namespace. Preserve the `NeoAdmin` brand and existing public routes and features.
- Preserve the established visual hierarchy: pastel theme colors from Sass tokens, white surfaces, dashboard legends, balanced spacing, right-aligned header actions, dark mode, and optional mobile bottom navigation.
- Keep semantic HTML, Bootstrap 5.3 conventions, accessible controls, responsive behavior, strict framework-free TypeScript, and no inline event handlers or styles.
- Add no comments to TypeScript, JavaScript, SCSS, Pug, or HTML.

## Build and validation

- Run `npm run build` after source changes that affect pages, styles, scripts, fonts, or assets. Review the generated result under `docs/` and verify the affected routes, theme states, responsive layouts, and console output.
- Keep dependencies and lockfiles synchronized when a dependency change is necessary. Prefer lazy loading for optional page integrations.
- Do not claim that React, Vue, or Angular components or adapters exist; read `.agents/context/targets.md` for current support boundaries.

## Git and publishing

- Never delete or move tags, rewrite history, delete branches, or force-push unless the user explicitly requests that exact operation.
- Before committing or pushing, inspect `git status`, the diff, current branch, configured remote, and tags. Stage only the intended project changes; do not push `--all`, `--mirror`, archive refs, or internal checkpoint refs.
- Push only when the user explicitly asks to publish. Use an explicit branch or tag ref, then verify the remote ref. Keep commit messages factual and limited to the changes made.
- When the user asks to remove a tag, remove the local ref as well as the requested remote ref, and verify both. Do not recreate it from reflogs or unreachable objects afterward.
