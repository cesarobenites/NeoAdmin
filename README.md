# NeoAdmin

NeoAdmin is a reusable administration dashboard built with Bootstrap 5.3, TypeScript, SCSS, Pug, and Vite. Its source avoids jQuery and loads optional libraries only on pages that use them.

## Source layout

```text
src/pug/       Page views, layouts, mixins, and partials
src/scss/      Bootstrap theme, NeoAdmin components, and vendor styles
src/ts/        TypeScript runtime and optional integrations
docs/          Generated multi-page distribution
AGENTS.md      Agent entry point and repository guidance
.agents/rules/ Project-wide requirements for agents
.agents/context/ Architecture, frontend, target, and agent usage guides
.agents/skills/ Reusable Bootstrap, Pug, SCSS, TypeScript, table, date, and build workflows
```

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run build:vue
```

Vite bundles the reusable NeoAdmin TypeScript library and main theme stylesheet into `docs/assets/`. A small TypeScript prepaint entry applies the saved or system theme before the stylesheet loads. Sass builds the full local icon catalog as `docs/assets/css/neoadmin-icons.css`, and the Pug 3 API renders top-level view examples into `docs/*.html` for GitHub Pages, including `docs.html`, `architecture.html`, and `agent-guide.html`. Pages use the ES module entry so optional libraries stay in deferred chunks; `neoadmin.umd.js` remains available to universal consumers. The Vue build profile emits an ES module and disables automatic runtime initialization without adding Vue components or a Vue dependency.

The generated [Documentation page](https://cesarobenites.github.io/NeoAdmin/docs.html) explains installation, customization, deployment, and framework reuse. It links to the [technical overview](https://cesarobenites.github.io/NeoAdmin/architecture.html) and the [AI agent guide](https://cesarobenites.github.io/NeoAdmin/agent-guide.html). These user guides are generated from Pug; agent rules, context, and skills remain under `.agents/`.

## Theme configuration

Edit `src/scss/neoadmin/_vars.scss` for colors, typography, spacing, and surfaces. Component styles live in `src/scss/neoadmin/component/`; dark mode uses Bootstrap theme variables and `src/scss/neoadmin/_dark-theme.scss`. The browser toolbar color is derived from the Sass theme tokens and follows NeoAdmin's Light/Dark selector automatically. Use the Outfit font stack and Bootstrap 5 utilities in templates.

The Light browser toolbar color follows `$primary`; the Dark color follows the dark header surface. TypeScript reads the compiled `--neoadmin-browser-theme-color` CSS custom property and updates the shared `theme-color` meta tag during startup and whenever the theme changes. Change the Sass tokens, then run `npm run build`; do not duplicate browser colors in Pug or TypeScript. Secondary buttons use Bootstrap's standard gray token with a contrasting foreground.

The Theme Mode controls on `src/pug/page-settings.pug` save `light` or `dark` to `localStorage` using the exact key `neoadmin-theme`. System removes that key; TypeScript then follows `prefers-color-scheme` and responds to operating system changes. To inspect or change the saved value in browser DevTools, run:

```js
localStorage.getItem('neoadmin-theme')
```

In DevTools, run `localStorage.setItem('neoadmin-theme', 'dark'); location.reload()` to force Dark mode. Run `localStorage.removeItem('neoadmin-theme'); location.reload()` to return to System mode.

The TypeScript integration is in `src/ts/neoadmin.ts`: `getStoredTheme()` reads the key, `setTheme()` stores Light or Dark and clears the override for System, and `applyTheme()` updates the document theme and browser toolbar color. Change those storage methods to use a cookie, server, or account preference when integrating with another application, then run `npm run build`.

The UI Cards page demonstrates Bootstrap's CSS-only skeleton placeholders. The asynchronous modal in `src/pug/layouts/_admin.pug` uses the TypeScript runtime to show skeleton content while `fetch()` loads a fragment. Trigger it with `data-neoadmin-modal="load"`, `data-neoadmin-url`, and an optional `data-neoadmin-title`. Skeletons use Bootstrap `.placeholder-glow` or `.placeholder-wave` classes and need no React, Vue, or Angular runtime.

The landing page's full-screen startup loader is defined in `src/pug/index.pug` and removed after TypeScript initializes. Use that for initial page startup and skeleton placeholders for individual sections waiting on data.

## Optional libraries

The initial entry imports Bootstrap and NeoAdmin theme styles. DataTables 3 with Bootstrap 5 responsive support, Chart.js, TomSelect, and IMask load through dynamic imports only when matching page attributes are present. Flatpickr loads only on the Date & Time page and provides date, date-time, range, and month/year calendars without Moment.js. Bootstrap forms use the system font stack. Bootstrap Icons remain fully available from a separate local stylesheet and WOFF2 asset. Add `.neoadmin-table`, `[data-date-picker]`, `.neoadmin-select`, `[data-mask]`, or `canvas[data-chart]` to opt into an integration.

Tables accept `data-page-length` and `data-state-key`. A toolbar uses `data-table-toolbar="table-id"`, `data-table-clear`, `data-table-export="csv"`, and `data-table-column="column-index"` to expose persistent state, column visibility, filter reset, and CSV export. Listen for `neoadmin:table-ready` to connect page-specific filters without coupling them to the core runtime.

The **Date & Time** page demonstrates Flatpickr date, date-time, range, and month/year controls, quick range presets, and live DataTables filtering. Date controls emit `neoadmin:date-ready` and `neoadmin:date-change` events so a host application can connect its own TypeScript, React, Vue, or Angular lifecycle. The command palette opens with Ctrl+K or Cmd+K, or from Quick Search in the mobile footer, and supports navigation and theme actions through semantic `data-neoadmin-*` attributes.

## Keeping deployments light

Use native Bootstrap utilities before adding component CSS. Import optional libraries from page-specific dynamic modules, set table and date formats through data attributes, and avoid adding global scripts for single-view features. Prefer appropriately sized images and local font assets for deployments that need predictable network use. The DOM events and data attributes provide framework-neutral integration points for host React, Vue, or Angular applications; framework components and adapters are not currently implemented.

## Use NeoAdmin as a template in another project

Use NeoAdmin as a complete static application by cloning this repository, customizing `src/`, running `npm run build`, and deploying `docs/`. To reuse its design in an existing React, Vue, or Angular application, build NeoAdmin first, then copy the generated assets and adapt the example markup into the host framework. NeoAdmin is a starter template and theme, not a package of framework components.

1. Run `npm install` and `npm run build` in the NeoAdmin repository.
2. Copy `docs/assets/css/neoadmin.css` into the host application's public assets. Copy `neoadmin-icons.css` and its WOFF2 font only if the application uses Bootstrap Icons. Copy only the needed images and optional integration chunks.
3. Use the generated `docs/*.html` as a reference for the final markup, or `src/pug/` as the editable examples. Convert the needed page structure to JSX/TSX for React, Vue templates, or Angular templates; adapt asset paths to the host project.
4. Include the theme stylesheet once in the host application and include Bootstrap JavaScript only for Bootstrap components that need it. Keep routing, rendering, and component lifecycle in the host framework.
5. Add only the interactions the host needs. The `data-neoadmin-*` hooks and `neoadmin:*` DOM events are integration points; connect them from the host application and avoid starting the whole page runtime separately in every routed component.

React, Vue, and Angular components, adapters, and project generators are not included. `npm run build:vue` is a framework-free ES module output with automatic initialization disabled; it does not generate Vue components or provide framework integration.

## Agent skills

Open the repository root as the agent workspace and use `AGENTS.md` as the canonical entry point. Claude Code, Codex, Antigravity, Gemini CLI, GitHub Copilot, and other coding agents can follow the same rules and skills in `.agents/`. When a tool does not discover `AGENTS.md` automatically, configure its native project-instruction file as a short pointer to `AGENTS.md` and the relevant skill; avoid keeping duplicate rule sets that can drift.

In another repository, copy only the needed `neo-admin-skill-*` folders into that repository's `.agents/skills/` directory. Keep the host project's own rules and architecture in its native instructions. The [AI Agent Guide](https://cesarobenites.github.io/NeoAdmin/agent-guide.html) gives the steps for each tool and explains the difference between using NeoAdmin as the deployed application and reusing it inside another app.

## NeoAdmin API

Import `NeoAdmin` from `src/ts/neoadmin.ts` and initialize it with `NeoAdmin.getInstance({ autoInit: true, persistence: true })`. Set `autoInit: false` when a host framework controls lifecycle initialization.

NeoAdmin is maintained by César R. and contributors. See the [GitHub repository](https://github.com/cesarobenites/neoadmin) for issues and contribution details.
