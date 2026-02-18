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

        this.handlePersistence(); // Load saved state FIRST
        this.initBootstrapComponents();
        this.initLibraries();
        this.handleSidebar();
        this.handleTreeview();
        this.handleTheme();
        this.handleFontScaling();
        this.handleFullScreen();
        this.handleMobileFooter(); // Register mobile footer logic
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
        // Only restore 'open' state on Desktop to prevent UX issues on mobile
        if (sidebarToggled && window.innerWidth >= 768) {
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
                const isMultiple = (el as HTMLSelectElement).multiple;
                const plugins = isMultiple ? ['remove_button'] : [];

                // @ts-ignore
                new TomSelect(el, {
                    plugins: plugins,
                    create: false,
                    // Allow search in the main control for multiple, or standard behavior for single
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

        // Sync initial state
        html.classList.remove('sidenav-toggled-init');
        const sidebarState = localStorage.getItem('neo-sidebar-toggled');
        if (sidebarState === 'true' && window.innerWidth >= 768) {
            body.classList.add('sidenav-toggled');
        }

        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                body.classList.toggle('sidenav-toggled');
                this.saveState('sidebar-toggled', body.classList.contains('sidenav-toggled'));
            });
        }

        // Mobile Overlay - Ensure it exists and works
        const overlay = document.querySelector('.app-sidebar__overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                e.preventDefault();
                body.classList.remove('sidenav-toggled');
                this.saveState('sidebar-toggled', false);
            });
        }

        // Auto-close on mobile when a navigation link is clicked
        const closeSidebarOnMobile = () => {
            if (window.innerWidth < 768) {
                body.classList.remove('sidenav-toggled');
                this.saveState('sidebar-toggled', false);
            }
        };

        // All menu items excluding treeview toggles
        const sidebarLinks = document.querySelectorAll('.app-menu__item:not([data-toggle="treeview"]), .treeview-item');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeSidebarOnMobile();
            });
        });

        // Handle window resize to prevent weird states
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && localStorage.getItem('neo-sidebar-toggled') === 'true') {
                body.classList.add('sidenav-toggled');
            } else if (window.innerWidth < 768) {
                // If we resized to mobile, force close it initially for better UX
                body.classList.remove('sidenav-toggled');
            }
        });
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

        // Nested Submenus (for Font Size in User Menu)
        const submenuToggles = document.querySelectorAll('.dropdown-submenu > a');
        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent closing parent menu
                const parent = (e.currentTarget as HTMLElement).parentElement;
                if (parent) {
                    parent.classList.toggle('show');
                    const menu = parent.querySelector('.dropdown-menu');
                    if (menu) menu.classList.toggle('show');
                }
            });
        });
    }

    private handleTheme(): void {
        const themeToggles = document.querySelectorAll('[data-toggle="theme"]');
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-bs-theme', newTheme);
                this.saveState('theme', newTheme);
            });
        });
    }

    private handleFontScaling(): void {
        const defaultSize = '16px';
        const sizes = ['14px', '16px', '18px'];

        const updateUI = (currentSize: string) => {
            document.querySelectorAll('.btn-font-size').forEach(btn => {
                const btnSize = (btn as HTMLElement).dataset.fontSize;
                if (btnSize === currentSize) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        };

        const setSize = (size: string) => {
            if (sizes.includes(size)) {
                document.documentElement.style.setProperty('--neo-base-size', size);
                this.saveState('font-size', size);
                updateUI(size);
            }
        };

        // Initialize UI with current state
        const savedSize = localStorage.getItem('neo-font-size') || defaultSize;
        // Validate saved size
        const initialSize = sizes.includes(savedSize) ? savedSize : defaultSize;

        setSize(initialSize); // Apply initially

        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            // Handle clicks on .btn-font-size or its children
            const sizeBtn = target.closest('.btn-font-size');

            if (sizeBtn) {
                e.preventDefault();
                e.stopPropagation(); // Stop from closing dropdown
                const size = (sizeBtn as HTMLElement).dataset.fontSize;
                if (size) setSize(size);
            }
        });
    }

    private handleFullScreen(): void {
        const toggles = document.querySelectorAll('[data-toggle="fullscreen"]');
        toggles.forEach(toggle => {
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
        });
    }

    private handleMobileFooter(): void {
        const setFooterState = (active: boolean) => {
            if (active) {
                document.body.classList.add('footer-visible');
            } else {
                document.body.classList.remove('footer-visible');
            }
            if (this.options.persistence) {
                localStorage.setItem('neo-footer-active', String(active));
            }

            // Update ALL switches
            document.querySelectorAll('.neo-footer-switch').forEach((el) => {
                (el as HTMLInputElement).checked = active;
            });
            // Legacy ID support
            const legacySwitch = document.getElementById('footerSwitch') as HTMLInputElement;
            if (legacySwitch) legacySwitch.checked = active;
        };

        // Initialize state
        const savedState = localStorage.getItem('neo-footer-active') === 'true';
        setFooterState(savedState);

        // Switch Listeners (Class based)
        document.querySelectorAll('.neo-footer-switch').forEach(el => {
            el.addEventListener('change', function (this: HTMLInputElement) {
                setFooterState(this.checked);
            });
            // Stop propagation on switch container click to prevent menu closing if inside dropdown
            el.addEventListener('click', (e) => e.stopPropagation());
        });

        // Legacy Selector Listener
        const footerSwitch = document.getElementById('footerSwitch');
        if (footerSwitch && !footerSwitch.classList.contains('neo-footer-switch')) {
            footerSwitch.addEventListener('change', function (this: HTMLInputElement) {
                setFooterState(this.checked);
            });
            footerSwitch.addEventListener('click', (e) => e.stopPropagation());
        }

        // Global Toggle for Menu Item Click
        (window as any).toggleFooterMode = (e: Event) => {
            if (e) e.stopPropagation();
            const newState = !document.body.classList.contains('footer-visible');
            setFooterState(newState);
        };

        // Search Toggle Delegation (Top & Bottom)
        const searchContainer = document.querySelector('.app-search');
        document.body.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            // Check for toggle button or specific ID
            if (target.closest('.toggle-search-btn') || target.closest('#mobile-search-toggle-bottom')) {
                e.preventDefault();
                if (searchContainer) {
                    searchContainer.classList.toggle('show');
                    if (searchContainer.classList.contains('show')) {
                        const input = searchContainer.querySelector('input') as HTMLInputElement;
                        if (input) input.focus();
                    }
                }
            }
        });

        // Close Search on Outside Click
        document.addEventListener('click', (e) => {
            if (searchContainer && searchContainer.classList.contains('show')) {
                const target = e.target as HTMLElement;
                const isClickInside = searchContainer.contains(target);
                const isClickOnToggle = target.closest('.toggle-search-btn') || target.closest('#mobile-search-toggle-bottom');

                if (!isClickInside && !isClickOnToggle) {
                    searchContainer.classList.remove('show');
                }
            }
        });
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
