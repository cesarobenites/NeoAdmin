---
name: neo-admin-skill-tables
description: Configure responsive NeoAdmin DataTables with persistent state, filters, density, and export controls.
---

# NeoAdmin Tables

Use this skill for DataTables, responsive table examples, toolbars, column visibility, date filters, and CSV export.

## Standards

- Keep `datatables.net`, `datatables.net-bs5`, and `datatables.net-responsive-bs5` on compatible major versions.
- Load DataTables and Responsive through dynamic imports only on pages containing `.neo-table`.
- Use Bootstrap 5 styling and responsive behavior.
- Configure one table toolbar for search, density, state reset, column visibility, and CSV export; disable duplicate built-in toolbar controls.
- Persist table state with stable `data-state-key` values.
- Use `data-*` attributes and native events for host integration.
- Keep source code free of comments and preserve the English interface, `NeoAdmin` brand, and `neoadmin` namespace.

## Resources

- [DataTables page](../../../src/pug/table-data-table.pug)
- [TypeScript table controller](../../../src/ts/neoadmin.ts)
- [DataTables Bootstrap 5](https://datatables.net/manual/styling/bootstrap5)
