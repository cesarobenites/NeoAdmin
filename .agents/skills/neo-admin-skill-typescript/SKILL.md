---
name: neo-admin-skill-typescript
description: Extend the strict NeoAdmin TypeScript runtime with native DOM and Bootstrap controllers.
---

# NeoAdmin TypeScript

Use this skill for shared DOM behavior, Bootstrap APIs, persistence, events, and optional integrations.

## Standards

- Put shared interaction logic in `src/ts/neoadmin.ts` or a focused module imported by it.
- Keep strict types, semantic DOM queries, native events, and `data-neo-*` integration points.
- Use Bootstrap 5 JavaScript APIs without jQuery.
- Dynamically import optional dependencies only on pages that contain their integration markers.
- Bind Settings theme choices through `data-neoadmin-theme`, persist the selected `light` or `dark` value, and synchronize active state and `aria-pressed` on initialization and change.
- Honor saved Light or Dark theme preferences before consulting `prefers-color-scheme`; follow system changes only when no manual preference is stored, and keep a System action that clears the override.
- Use `localStorage` for the standalone template preference and keep host account or server persistence adaptable.
- Store theme values under `neoadmin-theme` as `light` or `dark`; System removes the key and returns to `prefers-color-scheme`.
- Keep the compiled `neoadmin-theme.js` prepaint entry and the runtime preference contract synchronized; update `data-neoadmin-theme-preference` whenever the selected mode changes.
- Keep storage reads in `getStoredTheme()`, preference changes in `setTheme()`, and DOM synchronization in `applyTheme()`.
- Use native `fetch()` and Bootstrap placeholders for asynchronous content; use `aria-busy` and replace skeleton markup when the request settles.
- Synchronize the `theme-color` meta element from the compiled `--neoadmin-browser-theme-color` custom property after restoring or changing the theme.
- Dispatch stable `CustomEvent` names for host page and framework adapters.
- Avoid inline handlers, direct inline style mutation, framework runtime dependencies, and comments in source.
- Preserve `NeoAdmin` branding and the `neoadmin` namespace.

## Resources

- [TypeScript entry](../../../src/ts/neoadmin.ts)
- [TypeScript configuration](../../../tsconfig.json)
- [Bootstrap JavaScript](https://getbootstrap.com/docs/5.3/getting-started/javascript/)
