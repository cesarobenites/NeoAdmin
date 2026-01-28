# NeoAdmin - Modern Bootstrap 5 Admin Dashboard

NeoAdmin is a premium, modern, and responsive admin dashboard template built with **Bootstrap 5.3**, **TypeScript**, and **SASS (SCSS)**. It has been completely rebuilt to eliminate jQuery and Pug, focusing on a clean, modular vanilla JavaScript/TypeScript approach powered by **Vite** for blazing fast performance.

---

## 🚀 Introduction
NeoAdmin provides a robust foundation for building high-performance administrative interfaces. By abandoning legacy dependencies like jQuery in favor of modern standards, it ensures better maintainability, smaller bundles, and superior performance.

---

## 📂 Directory Structure
```text
│
├── docs             <- Production ready files (HTML/CSS/JS)
│   ├── assets
│   │   ├── css       <- Compiled SCSS
│   │   ├── js        <- Compiled Bundle (neoadmin.js)
│   │   └── images
│   └── *.html       <- Page templates
└── src              <- Source Code
    ├── scss         <- SASS source files
    │   ├── neoadmin  <- Core framework styles
    │   └── component <- UI Components
    └── ts           <- TypeScript source files (Logic)
        └── neoadmin.ts <- Main entry point
```

---

## 🛠 Build System (Vite)
This project uses [Vite](https://vitejs.dev/) for development and bundling. Node.js is required.

### 1. Installation
Install dependencies via npm:
```bash
npm install
```

### 2. Development Server
Start a local dev server with hot module replacement (HMR):
```bash
npm run dev
```

### 3. Production Build
Compile TypeScript and SCSS into the `docs/assets` directory:
```bash
# General build
npm run build:universal

# Vue.js compatible build
npm run build:vue
```

---

## 🎨 Customization

### Styles (SCSS)
All styles are located in `src/scss`. The main entry point is `src/scss/neoadmin.scss`.

*   **Variables:** Edit `src/scss/neoadmin/_vars.scss` to change colors, fonts, and sizes.
*   **Dark Mode:** Tweak `src/scss/neoadmin/_dark-theme.scss` to customize the premium GitHub-style dark theme.
*   **Bootstrap:** We modify Bootstrap via `src/scss/neoadmin/_customize-bootstrap.scss` before importing the core.

### Logic (TypeScript)
The interactive features are handled in `src/ts/neoadmin.ts`. This includes:
*   Sidebar toggling and state persistence.
*   Theme switching (Dark/Light).
*   Font size scaling.
*   Library initializations (DataTables, TomSelect, etc.).

---

## 🌐 Localization (i18n)
NeoAdmin supports automatic localization. Simply change the `lang` attribute in your HTML tag:
```html
<html lang="es">   <!-- Spanish -->
<html lang="en">   <!-- English -->
```
Supported libraries like DataTables will seamlessly adapt to the defined language.

---

## ✨ Features & Persistence
NeoAdmin includes built-in functionality for user preferences which are automatically **persisted** using `localStorage`:
*   **Dark/Light Mode:** Premium dark theme support.
*   **Full Screen Toggle:** Integrated browser full-screen API.
*   **Font Size Scaling:** Adjust global UI scale (Small, Normal, Large).
*   **Sidebar State:** Remembers if the sidebar was collapsed or expanded.

---

## 🛠 NeoAdmin API
You can trigger UI components programmatically via the global `NeoAdmin` object:

### Notifications (Toasts)
```javascript
// Types: 'success', 'danger', 'info', 'warning'
NeoAdmin.notify('Operation successful!', 'success');
```

### Alerts (Modals)
```javascript
NeoAdmin.alert('Success', 'Profile updated correctly.', 'success');
```

---

## 🤝 Contribution & Issues
If you like NeoAdmin, please star and fork it on [GitHub](https://github.com/cesarobenites/NeoAdmin).

For bugs or feature requests, please report them [here](https://github.com/cesarobenites/NeoAdmin/issues).

---
Created by **César R.** & contributors.
