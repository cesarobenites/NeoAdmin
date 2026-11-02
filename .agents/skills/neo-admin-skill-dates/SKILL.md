---
name: neo-admin-skill-dates
description: Build NeoAdmin date and time examples with optional Flatpickr and portable DOM events.
---

# NeoAdmin Date and Time

Use this skill for the Date & Time page, date picker integration, range presets, and date-filtered reports.

## Standards

- Keep the current interface in English and use the shared Date & Time page as the integration example.
- Use Flatpickr as an optional page-level dependency. Load its runtime and styles only when `data-neo-calendar` controls exist.
- Do not add Moment.js for date picking or formatting. Prefer browser `Date` APIs for range calculations and Flatpickr formatting for picker values.
- Keep semantic inputs and `data-date-*` attributes independent from framework lifecycle code.
- Emit `neo:date-ready` and `neo:date-change` DOM events with useful control details.
- Keep date range presets and DataTables filtering connected through emitted events and ISO date values.
- Keep the markup and event contract reusable by a host TypeScript application or future Vue/Angular adapter.
- Keep source code free of comments and preserve `NeoAdmin` branding and the `neoadmin` namespace.

## Resources

- [Date and Time Pug view](../../../src/pug/ui-dates.pug)
- [Date controller](../../../src/ts/neoadmin.ts)
- [Flatpickr installation](https://flatpickr.js.org/getting-started/)
- [Flatpickr events](https://flatpickr.js.org/events/)
