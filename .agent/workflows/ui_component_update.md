---
description: Update UI components and styles consistently across the project
---
# UI Component Update Workflow

This workflow guides you through updating UI components, ensuring style consistency (Bootstrap 5 + Custom SCSS) and propagation of changes across HTML files.

## 1. Style Definitions
- **Locate SCSS**: Identify the correct SCSS partial in `src/scss/neoadmin/component/`.
  - Header/Navbar -> `_header.scss`
  - Sidebar -> `_sidebar.scss`
  - Cards/Tiles -> `_tile.scss` or `_ui-cards.scss`
  - Dropdowns -> `_dropdown.scss`
- **Use Variables**: Always use CSS variables (`var(--bs-primary)`) or SCSS variables (`$primary-color`) from `_vars.scss`.
- **Avoid Inline Styles**: Move inline styles from HTML to SCSS classes.

## 2. Component Structure
- **Bootstrap 5 Syntax**: Ensure all HTML uses Bootstrap 5 classes (e.g., `ms-2` instead of `ml-2`, `data-bs-toggle` instead of `data-toggle`).
- **Icons**: Use `bi-*` classes for Bootstrap Icons. For stacked icons, use the custom `.bi-stack` helper in `_bootstrap-icons.scss`.

## 3. Propagation
- Since this is a static template, changes to shared components (Header, Sidebar) must be replicated across **all** HTML files in `docs/`.
- **Use `sed` or Scripts**: For bulk updates, use a script to replace the specific block of HTML across all files.

## 4. Specific Issues & Fixes
- **Dropdown Gap**: Ensure `.dropdown-menu` has `margin-top: 0` and proper positioning. Check `_dropdown.scss`.
- **Icon Centering**: Use `display: flex; align-items: center; justify-content: center;` for icon containers.
- **Zoom Buttons**: Use `.btn-font-size` class defined in `_header.scss` (or `_dropdown.scss`).

## 5. Verification
- Run `npm run build:universal` to check for SCSS errors.
- Preview `docs/index.html` (or the relevant page) to verify the fix.
