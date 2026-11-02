# NeoAdmin framework targets

## TypeScript target

The active target is the framework-free TypeScript library in `src/ts/neoadmin.ts`; it requires no Angular, React, or Vue runtime. It uses Bootstrap's JavaScript APIs, semantic HTML, `data-neoadmin-*` attributes, native DOM events, and `fetch()`. `npm run build` creates ES module and UMD library outputs under `docs/assets/js/`. The Date & Time page loads Flatpickr only when its calendar markers exist and emits `neoadmin:date-ready` and `neoadmin:date-change` events. Bootstrap skeleton placeholders are CSS-only; the asynchronous modal uses the TypeScript runtime to show a skeleton while content loads.

Theme preference is stored in `localStorage` with key `neoadmin-theme` and values `light` or `dark`. System mode removes the key and follows `prefers-color-scheme`. The storage integration lives in `getStoredTheme()` and `setTheme()` in `src/ts/neoadmin.ts`; `applyTheme()` updates the document theme and browser toolbar color. A consuming app may replace those methods with its own account preference storage.

## Reusing the template in React, Vue, or Angular

NeoAdmin is a reusable starter template and theme, not a framework component package. A host React, Vue, or Angular application uses the compiled theme by copying the required assets from `docs/assets/` and adapting the semantic HTML examples from `docs/*.html` or `src/pug/` into JSX/TSX or framework templates. The host application owns routing, rendering, and component lifecycle. Framework components, adapters, and project generators are not implemented.

## Vue-compatible output

`npm run build:vue` creates an ES module and disables NeoAdmin automatic initialization so a host application can control when shared DOM behavior starts. This is a library output profile only. It does not add Vue, generate `.vue` components, or take over the host router or component lifecycle. A future adapter can bind the date events and own picker creation and disposal.

## Angular target

An Angular adapter, package profile, or project generator is not implemented. Do not add Angular dependencies or claim Angular integration until that target is explicitly designed and validated. A future Angular adapter can bind the same date events without changing the example HTML or Sass classes. React component wrappers or a project generator are likewise not implemented.

## Reusing skills in a host project

Copy only the relevant `neo-admin-skill-*` directories from `.agents/skills/` into the host project's `.agents/skills/`. Add their paths to the host `AGENTS.md` so its coding agents can load them. The source repository architecture in this directory describes NeoAdmin itself and should not be copied as the host application's architecture.
