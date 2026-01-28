/**
 * NeoAdmin
 * Author: César R.
 */

import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
import TomSelect from 'tom-select';
import IMask from 'imask';
import DataTable from 'datatables.net-bs5';
import Chart from 'chart.js/auto';

// Expose internal libraries globally for inline scripts
(window as any).bootstrap = bootstrap;
(window as any).Chart = Chart;
(window as any).Swal = Swal;


// Library Styles
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'tom-select/dist/css/tom-select.bootstrap5.min.css';

import '../scss/neoadmin.scss';

declare const __AUTO_INIT__: boolean;

export interface NeoAdminOptions {
    autoInit?: boolean;
    persistence?: boolean;
}

export class NeoAdmin {
    private static instance: NeoAdmin;
    private options: NeoAdminOptions;

    private constructor(options: NeoAdminOptions = { autoInit: true, persistence: true }) {
        this.options = options;
        if (this.options.autoInit) {
            this.init();
        }
    }

    public static getInstance(options?: NeoAdminOptions): NeoAdmin {
        if (!NeoAdmin.instance) {
            NeoAdmin.instance = new NeoAdmin(options);
        }
        return NeoAdmin.instance;
    }

    public init(): void {
        console.log('NeoAdmin Initializing...');
        this.handlePersistence(); // Load saved state FIRST
        this.initBootstrapComponents();
        this.initLibraries();
        this.handleSidebar();
        this.handleTreeview();
        this.handleTheme();
        this.handleFontScaling();
        this.handleFullScreen();
        this.hidePreloader(); // Remove loading screen when ready
    }


    // Apply critical state IMMEDIATELY (before DOM ready) to prevent flash
    public static applyEarlyState(): void {
        // Theme - apply to document immediately
        const theme = localStorage.getItem('neo-theme');
        if (theme) {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }

        // Apply theme to preloader when DOM is ready
        const applyPreloaderTheme = () => {
            const preloader = document.getElementById('neo-page-loader');
            if (preloader && theme === 'dark') {
                preloader.style.backgroundColor = '#0d1117';
            }
        };

        // If DOM is already loaded, apply immediately
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyPreloaderTheme);
        } else {
            applyPreloaderTheme();
        }

        // Sidebar - apply when DOM is ready
        const sidebarToggled = localStorage.getItem('neo-sidebar-toggled') === 'true';
        if (sidebarToggled) {
            const applySidebar = () => {
                if (document.body) {
                    document.body.classList.add('sidenav-toggled');
                }
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', applySidebar);
            } else {
                applySidebar();
            }
        }
    }

    private initBootstrapComponents(): void {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });

        const toastElList = [].slice.call(document.querySelectorAll('.toast'));
        toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl);
        });
    }

    private initLibraries(): void {
        // DataTables
        const tables = document.querySelectorAll('.neo-table');
        const lang = document.documentElement.lang || 'en';

        // DataTables Language Mapping
        const dtLanguages: { [key: string]: string } = {
            'es': '//cdn.datatables.net/plug-ins/2.0.0/i18n/es-ES.json',
            'fr': '//cdn.datatables.net/plug-ins/2.0.0/i18n/fr-FR.json',
            'de': '//cdn.datatables.net/plug-ins/2.0.0/i18n/de-DE.json',
            'it': '//cdn.datatables.net/plug-ins/2.0.0/i18n/it-IT.json',
            'pt': '//cdn.datatables.net/plug-ins/2.0.0/i18n/pt-PT.json',
            'zh': '//cdn.datatables.net/plug-ins/2.0.0/i18n/zh.json',
            // Add more as needed. default is English (internal)
        };

        const dtLangUrl = dtLanguages[lang] || undefined; // undefined triggers default English

        tables.forEach((table) => {
            new DataTable(table as HTMLElement, {
                language: dtLangUrl ? { url: dtLangUrl } : {}
            });
        });

        // TomSelect
        // @ts-ignore
        if (typeof TomSelect !== 'undefined') {
            document.querySelectorAll('.neo-select').forEach((el) => {
                // @ts-ignore
                new TomSelect(el, {
                    plugins: ['dropdown_input'],
                });
            });
        }

        // IMask
        // @ts-ignore
        if (typeof IMask !== 'undefined') {
            document.querySelectorAll('[data-mask]').forEach((el) => {
                // @ts-ignore
                const maskPattern = (el as HTMLElement).dataset.mask;
                if (maskPattern) {
                    // @ts-ignore
                    IMask(el, { mask: maskPattern });
                }
            });
        }
    }

    private handleSidebar(): void {
        const toggle = document.querySelector('[data-toggle="sidebar"]');
        const body = document.body;
        const html = document.documentElement;

        // Remove early state class and transfer to body
        html.classList.remove('sidenav-toggled-init');
        const sidebarState = localStorage.getItem('neo-sidebar-toggled');
        if (sidebarState === 'true') {
            body.classList.add('sidenav-toggled');
        }

        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                body.classList.toggle('sidenav-toggled');
                this.saveState('sidebar-toggled', body.classList.contains('sidenav-toggled'));
            });
        }

        // Mobile Overlay
        const overlay = document.querySelector('.app-sidebar__overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                body.classList.toggle('sidenav-toggled');
                this.saveState('sidebar-toggled', body.classList.contains('sidenav-toggled'));
            });
        }
    }

    private handleTreeview(): void {
        const treeviewToggles = document.querySelectorAll('[data-toggle="treeview"]');
        treeviewToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = (e.currentTarget as HTMLElement).closest('.treeview');
                if (parent) {
                    parent.classList.toggle('is-expanded');
                }
            });
        });
    }

    private handleTheme(): void {
        const themeToggle = document.querySelector('[data-toggle="theme"]');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-bs-theme', newTheme);
                this.saveState('theme', newTheme);
            });
        }
    }

    private handleFontScaling(): void {
        const fontToggles = document.querySelectorAll('[data-font-size]');
        fontToggles.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const size = (e.currentTarget as HTMLElement).dataset.fontSize;
                if (size) {
                    document.documentElement.style.setProperty('--neo-base-size', size);
                    this.saveState('font-size', size);
                }
            });
        });
    }

    private handleFullScreen(): void {
        const toggle = document.querySelector('[data-toggle="fullscreen"]');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            });
        }
    }

    private handlePersistence(): void {
        if (!this.options.persistence) return;

        // Theme - already applied by inline script
        const themeState = localStorage.getItem('neo-theme');
        if (themeState) {
            document.documentElement.setAttribute('data-bs-theme', themeState);
        }

        // Font Size
        const fontSizeState = localStorage.getItem('neo-font-size');
        if (fontSizeState) {
            document.documentElement.style.setProperty('--neo-base-size', fontSizeState);
        }

        // Note: Sidebar state is applied by inline script in HTML to prevent flash
    }

    private hidePreloader(): void {
        const preloader = document.getElementById('neo-page-loader');
        if (preloader) {
            // Wait 400ms buffer for UI animations to complete behind the preloader
            setTimeout(() => {
                // Add hidden class to trigger fade-out transition
                preloader.classList.add('is-hidden');
                // Remove from DOM after transition completes (500ms)
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 400);
        }
    }

    private saveState(key: string, value: any): void {
        if (this.options.persistence) {
            localStorage.setItem(`neo-${key}`, String(value));
        }
    }

    // Public Utilities
    public swal(options: any) {
        // Default to Bootstrap styling
        const defaults = {
            customClass: {
                confirmButton: 'btn btn-primary mx-1',
                cancelButton: 'btn btn-secondary mx-1',
                denyButton: 'btn btn-danger mx-1'
            },
            buttonsStyling: false
        };
        // Merge defaults with user options (user options take precedence if conflicting, but deep merge for customClass might be needed if user adds classes. For now shallow merge is okay for simple usage).
        return Swal.fire({ ...defaults, ...options });
    }

    public notify(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info') {
        // Simple Bootstrap Toast wrapper or SweetAlert toast
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: type as any,
            title: message
        });
    }

    public alert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' = 'info') {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon
        });
    }

    public showToast(elementId: string) {
        const toastEl = document.getElementById(elementId);
        if (toastEl) {
            const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
            toast.show();
        } else {
            console.warn(`Toast element with id '${elementId}' not found.`);
        }
    }

    // Auto-init for UMD build (Universal)
}

// Apply early state IMMEDIATELY (runs as soon as script loads)
NeoAdmin.applyEarlyState();

// Auto-init for UMD build (Universal)
if (typeof __AUTO_INIT__ !== 'undefined' && __AUTO_INIT__) {
    if (typeof window !== 'undefined') {
        (window as any).NeoAdmin = NeoAdmin.getInstance();
        // Expose early state application for inline scripts
        (window as any).NeoAdminEarlyInit = NeoAdmin.applyEarlyState;
    }
}
