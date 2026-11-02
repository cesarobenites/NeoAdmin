import * as bootstrap from 'bootstrap';
import '../scss/neoadmin.scss';
import type { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import type { Options as FlatpickrOptions, Plugin as FlatpickrPlugin } from 'flatpickr/dist/types/options';

declare const __AUTO_INIT__: boolean;

type NeoTable = HTMLTableElement & { neoadminTable?: any };

export interface NeoAdminOptions {
    autoInit?: boolean;
    persistence?: boolean;
}

export class NeoAdmin {
    private static instance: NeoAdmin;
    private options: NeoAdminOptions;

    private constructor(options: NeoAdminOptions = { autoInit: true, persistence: true }) {
        this.options = options;
        if (!options.autoInit) return;
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => this.init(), { once: true });
        else this.init();
    }

    public static getInstance(options?: NeoAdminOptions): NeoAdmin {
        if (!NeoAdmin.instance) NeoAdmin.instance = new NeoAdmin(options);
        return NeoAdmin.instance;
    }

    public static applyEarlyState(): void {
        const preference = NeoAdmin.getStoredTheme() || 'system';
        document.documentElement.dataset.neoadminThemePreference = preference;
        document.documentElement.setAttribute('data-bs-theme', NeoAdmin.getPreferredTheme());
        NeoAdmin.syncBrowserThemeColor();
        if (localStorage.getItem('neoadmin-sidebar-toggled') === 'true' && window.innerWidth >= 768) {
            const apply = () => document.body.classList.add('sidenav-toggled');
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
            else apply();
        }
    }

    private static syncBrowserThemeColor(): void {
        const meta = document.querySelector<HTMLMetaElement>('meta[data-neoadmin-theme-color]');
        if (!meta) return;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--neoadmin-browser-theme-color').trim();
        if (color) meta.content = color;
    }

    private static getStoredTheme(): 'light' | 'dark' | null {
        const theme = localStorage.getItem('neoadmin-theme');
        return theme === 'light' || theme === 'dark' ? theme : null;
    }

    private static getPreferredTheme(): 'light' | 'dark' {
        return NeoAdmin.getStoredTheme() || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    public init(): void {
        this.handlePersistence();
        this.initBootstrapComponents();
        this.handleSidebar();
        this.handleTreeview();
        this.markActiveMenu();
        this.handleTheme();
        this.handleFontScaling();
        this.handleFullScreen();
        this.handleMobileFooter();
        this.handleCommandPalette();
        this.handleModalTriggers();
        this.handleActions();
        this.initOptionalLibraries();
        this.hidePreloader();
    }

    public confirm(options: { title: string; message: string; confirmLabel?: string; tone?: 'danger' | 'primary'; onConfirm: () => void | Promise<void> }): void {
        const modalElement = document.querySelector<HTMLElement>('[data-neoadmin-confirm-modal]');
        if (!modalElement) return;
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        const title = modalElement.querySelector<HTMLElement>('[data-neoadmin-confirm-title]');
        const message = modalElement.querySelector<HTMLElement>('[data-neoadmin-confirm-message]');
        const accept = modalElement.querySelector<HTMLButtonElement>('[data-neoadmin-confirm-accept]');
        if (!title || !message || !accept) return;
        title.textContent = options.title;
        message.textContent = options.message;
        const actionableButton = accept.cloneNode(true) as HTMLButtonElement;
        actionableButton.textContent = options.confirmLabel || 'Confirm';
        actionableButton.classList.toggle('btn-danger', options.tone !== 'primary');
        actionableButton.classList.toggle('btn-primary', options.tone === 'primary');
        actionableButton.addEventListener('click', async () => { await options.onConfirm(); modal.hide(); }, { once: true });
        accept.replaceWith(actionableButton);
        modal.show();
    }

    public async loadModal(url: string, titleText: string): Promise<void> {
        const modalElement = document.querySelector<HTMLElement>('[data-neoadmin-async-modal]');
        if (!modalElement) return;
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        const title = modalElement.querySelector<HTMLElement>('[data-neoadmin-async-title]');
        const content = modalElement.querySelector<HTMLElement>('[data-neoadmin-async-content]');
        if (!title || !content) return;
        title.textContent = titleText;
        content.setAttribute('aria-busy', 'true');
        const loader = document.createElement('div');
        loader.className = 'placeholder-glow';
        loader.setAttribute('aria-label', 'Loading content');
        loader.setAttribute('role', 'status');
        ['col-12 mb-3', 'col-8 mb-3', 'col-10'].forEach(classes => {
            const placeholder = document.createElement('span');
            placeholder.className = `placeholder ${classes}`;
            loader.append(placeholder);
        });
        content.replaceChildren(loader);
        modal.show();
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(String(response.status));
            content.replaceChildren(document.createRange().createContextualFragment(await response.text()));
            modalElement.dispatchEvent(new CustomEvent('neoadmin:modal-loaded', { bubbles: true }));
        } catch {
            content.textContent = 'Unable to load the requested content.';
            modalElement.dispatchEvent(new CustomEvent('neoadmin:modal-error', { bubbles: true }));
        } finally {
            content.removeAttribute('aria-busy');
        }
    }

    private handleModalTriggers(): void {
        document.addEventListener('click', event => {
            const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-neoadmin-modal="confirm"], [data-neoadmin-modal="load"], [data-neoadmin-offcanvas]');
            if (!trigger) return;
            if (trigger.dataset.neoadminModal === 'confirm') {
                event.preventDefault();
                this.confirm({ title: trigger.dataset.neoadminTitle || 'Confirm action', message: trigger.dataset.neoadminMessage || 'Do you want to continue?', confirmLabel: trigger.dataset.neoadminConfirmLabel, onConfirm: () => { trigger.dispatchEvent(new CustomEvent('neoadmin:confirmed', { bubbles: true })); } });
            }
            if (trigger.dataset.neoadminModal === 'load' && trigger.dataset.neoadminUrl) {
                event.preventDefault();
                void this.loadModal(trigger.dataset.neoadminUrl, trigger.dataset.neoadminTitle || 'Detalles');
            }
            if (trigger.dataset.neoadminOffcanvas) {
                const element = document.querySelector<HTMLElement>(trigger.dataset.neoadminOffcanvas);
                if (element) bootstrap.Offcanvas.getOrCreateInstance(element).show();
            }
        });
    }

    private handleActions(): void {
        document.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            const toastTrigger = target.closest<HTMLElement>('[data-neoadmin-toast]');
            if (toastTrigger) this.toast(toastTrigger.dataset.neoadminMessage || '', (toastTrigger.dataset.neoadminToast as 'success' | 'danger' | 'warning' | 'info') || 'info');
            if (target.closest('[data-neoadmin-history-back]')) history.back();
            if (target.closest('[data-neoadmin-print]')) window.print();
        });
    }

    public toast(message: string, tone: 'success' | 'danger' | 'warning' | 'info' = 'info'): void {
        const container = document.querySelector<HTMLElement>('[data-neoadmin-toast-container]');
        if (!container) return;
        const alert = document.createElement('div');
        alert.className = `alert alert-${tone} alert-dismissible fade show shadow mb-0`;
        alert.setAttribute('role', tone === 'danger' ? 'alert' : 'status');
        alert.setAttribute('aria-live', tone === 'danger' ? 'assertive' : 'polite');
        alert.setAttribute('aria-atomic', 'true');
        alert.textContent = message;
        const close = document.createElement('button');
        close.type = 'button';
        close.className = 'btn-close';
        close.setAttribute('data-bs-dismiss', 'alert');
        close.setAttribute('aria-label', 'Close');
        alert.append(close);
        container.append(alert);
        window.setTimeout(() => bootstrap.Alert.getOrCreateInstance(alert).close(), 5000);
        alert.addEventListener('closed.bs.alert', () => alert.remove(), { once: true });
        alert.dispatchEvent(new CustomEvent('neoadmin:toast-shown', { bubbles: true, detail: { tone, message } }));
    }

    private initBootstrapComponents(): void {
        document.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]').forEach(element => new bootstrap.Tooltip(element));
        document.querySelectorAll<HTMLElement>('[data-bs-toggle="popover"]').forEach(element => new bootstrap.Popover(element));
        document.querySelectorAll<HTMLElement>('.toast').forEach(element => bootstrap.Toast.getOrCreateInstance(element));
    }

    private async initOptionalLibraries(): Promise<void> {
        const tasks: Promise<unknown>[] = [];
        if (document.querySelector('.neoadmin-table')) tasks.push(this.initTables());
        if (document.querySelector('[data-date-picker]')) tasks.push(this.initDatePickers());
        if (document.querySelector('.neoadmin-select')) tasks.push(this.initSelects());
        if (document.querySelector('[data-mask]')) tasks.push(this.initMasks());
        if (document.querySelector('canvas[data-chart]')) tasks.push(this.initCharts());
        await Promise.all(tasks);
    }

    private async initTables(): Promise<void> {
        await this.loadOptionalStylesheets(['dataTables.bootstrap5.css', 'responsive.bootstrap5.css']);
        const [{ default: DataTable }] = await Promise.all([
            import('datatables.net-bs5'),
            import('datatables.net-bs5/css/dataTables.bootstrap5.min.css'),
            import('datatables.net-responsive-bs5'),
            import('datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css')
        ]);
        const language = document.documentElement.lang.split('-')[0];
        const translations: Record<string, any> = {
            es: { search: 'Buscar:', lengthMenu: 'Mostrar _MENU_ registros', info: 'Mostrando _START_ a _END_ de _TOTAL_ registros', infoEmpty: 'Sin registros', zeroRecords: 'No se encontraron resultados', paginate: { previous: 'Anterior', next: 'Siguiente' } },
            fr: { search: 'Rechercher :', lengthMenu: 'Afficher _MENU_ entrées', info: 'Affichage de _START_ à _END_ sur _TOTAL_ entrées', infoEmpty: 'Aucune entrée', zeroRecords: 'Aucun résultat', paginate: { previous: 'Précédent', next: 'Suivant' } },
            de: { search: 'Suchen:', lengthMenu: '_MENU_ Einträge anzeigen', info: '_START_ bis _END_ von _TOTAL_ Einträgen', infoEmpty: 'Keine Einträge', zeroRecords: 'Keine Ergebnisse', paginate: { previous: 'Zurück', next: 'Weiter' } },
            it: { search: 'Cerca:', lengthMenu: 'Mostra _MENU_ elementi', info: 'Da _START_ a _END_ di _TOTAL_ elementi', infoEmpty: 'Nessun elemento', zeroRecords: 'Nessun risultato', paginate: { previous: 'Precedente', next: 'Successivo' } },
            pt: { search: 'Pesquisar:', lengthMenu: 'Mostrar _MENU_ registos', info: 'A mostrar _START_ a _END_ de _TOTAL_ registos', infoEmpty: 'Sem registos', zeroRecords: 'Sem resultados', paginate: { previous: 'Anterior', next: 'Seguinte' } }
        };
        document.querySelectorAll<NeoTable>('.neoadmin-table').forEach(table => {
            if (table.neoadminTable) return;
            const toolbar = table.id ? document.querySelector<HTMLElement>(`[data-table-toolbar="${table.id}"]`) : null;
            const stateKey = table.dataset.stateKey || `neoadmin-table-${table.id || location.pathname}`;
            const saved = this.readTableState(stateKey);
            const instance = new DataTable(table, {
                responsive: true,
                stateSave: true,
                stateDuration: 0,
                pageLength: Number(table.dataset.pageLength || 10),
                layout: { topStart: null, topEnd: null, bottomStart: 'info', bottomEnd: 'paging' },
                language: translations[language] || {},
                stateLoadCallback: () => saved,
                stateSaveCallback: (_settings: unknown, state: unknown) => localStorage.setItem(stateKey, JSON.stringify(state))
            } as any);
            if (table.dataset.dateFilter) {
                const range = document.querySelector<HTMLElement>(table.dataset.dateFilter);
                const columnIndex = Number(table.dataset.dateColumn || 0);
                instance.search.fixed('neoadmin-date-range', (_searchRow: string | null, rowData: unknown[]) => {
                    if (!range || (!range.dataset.isoStart && !range.dataset.isoEnd)) return true;
                    const rawDate = String(rowData[columnIndex] || '');
                    const date = new Date(`${rawDate}T12:00:00`);
                    const start = range.dataset.isoStart ? new Date(`${range.dataset.isoStart}T00:00:00`) : null;
                    const end = range.dataset.isoEnd ? new Date(`${range.dataset.isoEnd}T23:59:59`) : null;
                    return (!start || date >= start) && (!end || date <= end);
                });
                range?.addEventListener('change', () => instance.draw());
                table.addEventListener('neoadmin:table-filter-request', () => instance.draw());
                table.addEventListener('neoadmin:table-filter-clear', () => {
                    range?.dispatchEvent(new CustomEvent('neoadmin:date-clear'));
                    instance.draw();
                });
            }
            table.neoadminTable = instance;
            this.bindTableToolbar(table, instance, stateKey);
            table.dispatchEvent(new CustomEvent('neoadmin:table-ready', { detail: { table: instance } }));
        });
    }

    private readTableState(key: string): any {
        try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
    }

    private bindTableToolbar(table: NeoTable, instance: any, stateKey: string): void {
        const toolbar = document.querySelector<HTMLElement>(`[data-table-toolbar="${table.id}"]`);
        if (!toolbar) return;
        toolbar.querySelector('[data-table-clear]')?.addEventListener('click', () => {
            instance.search('').columns().search('').draw();
            table.dispatchEvent(new CustomEvent('neoadmin:table-filter-clear'));
            instance.columns().visible(true);
            toolbar.querySelectorAll<HTMLInputElement>('[data-table-column]').forEach(control => { control.checked = true; });
            instance.state.clear();
            localStorage.removeItem(stateKey);
        });
        toolbar.querySelector('[data-table-export="csv"]')?.addEventListener('click', () => this.exportTable(table, instance));
        toolbar.querySelector<HTMLInputElement>('[data-table-search]')?.addEventListener('input', event => instance.search((event.currentTarget as HTMLInputElement).value).draw());
        toolbar.querySelectorAll<HTMLInputElement>('[data-table-column]').forEach(control => {
            const column = instance.column(Number(control.dataset.tableColumn));
            control.checked = column.visible();
            control.addEventListener('change', () => column.visible(control.checked));
        });
        const density = toolbar.querySelector<HTMLSelectElement>('[data-table-density]');
        const densityKey = `neoadmin-table-density-${table.id}`;
        const savedDensity = localStorage.getItem(densityKey) || 'normal';
        table.classList.toggle('table-sm', savedDensity === 'compact');
        if (density) {
            density.value = savedDensity;
            density.addEventListener('change', () => {
                table.classList.toggle('table-sm', density.value === 'compact');
                localStorage.setItem(densityKey, density.value);
                table.dispatchEvent(new CustomEvent('neoadmin:table-density-change', { bubbles: true, detail: { density: density.value } }));
            });
        }
    }

    private exportTable(table: NeoTable, instance: any): void {
        const rows = instance.rows({ search: 'applied' }).data().toArray() as unknown[][];
        const headers = Array.from(table.tHead?.rows[0]?.cells || []).map((cell: HTMLTableCellElement) => cell.textContent?.trim() || '');
        const quote = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
        const csv = [headers, ...rows.map(row => row.map(cell => typeof cell === 'string' ? cell.replace(/<[^>]*>/g, '').trim() : cell))]
            .map(row => row.map(quote).join(',')).join('\r\n');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
        link.download = `${table.id || 'neoadmin-table'}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    private async initDatePickers(): Promise<void> {
        const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('[data-date-picker]'));
        const calendarInputs = inputs.filter(input => input.hasAttribute('data-neoadmin-calendar'));
        const range = document.querySelector<HTMLElement>('[data-date-range]');
        let rangePicker: FlatpickrInstance | undefined;
        if (calendarInputs.length) {
            await this.loadOptionalStylesheets(['flatpickr.css', 'neoadmin2.css']);
            const [{ default: flatpickr }, { default: monthSelectPlugin }, { default: weekSelectPlugin }] = await Promise.all([
                import('flatpickr'),
                import('flatpickr/dist/plugins/monthSelect/index.js'),
                import('flatpickr/dist/plugins/weekSelect/weekSelect.js'),
                import('flatpickr/dist/flatpickr.min.css'),
                import('flatpickr/dist/plugins/monthSelect/style.css')
            ]);
            calendarInputs.forEach(input => {
                const mode = input.dataset.dateMode || 'date';
                const options: FlatpickrOptions = {
                    allowInput: true,
                    altInput: true,
                    altFormat: 'F j, Y',
                    dateFormat: 'Y-m-d',
                    disableMobile: true,
                    onChange: (dates, value, instance) => {
                        if (mode === 'range' && range) {
                            range.dataset.isoStart = dates[0] ? instance.formatDate(dates[0], 'Y-m-d') : '';
                            range.dataset.isoEnd = dates[1] ? instance.formatDate(dates[1], 'Y-m-d') : '';
                        }
                        input.dispatchEvent(new CustomEvent('neoadmin:date-change', { bubbles: true, detail: { value, mode, dates } }));
                    }
                };
                if (mode === 'datetime') {
                    options.enableTime = true;
                    options.dateFormat = 'Y-m-d H:i';
                    options.altFormat = 'F j, Y h:i K';
                }
                if (mode === 'time') {
                    options.enableTime = true;
                    options.noCalendar = true;
                    options.dateFormat = 'H:i';
                    options.altFormat = 'h:i K';
                }
                const plugins: FlatpickrPlugin[] = [];
                if (mode === 'month') plugins.push(monthSelectPlugin({ dateFormat: 'Y-m', altFormat: 'F Y' }) as FlatpickrPlugin);
                if (mode === 'week') {
                    plugins.push(weekSelectPlugin() as FlatpickrPlugin);
                    options.dateFormat = 'Y-m-d';
                    options.altFormat = 'F j, Y';
                }
                if (plugins.length) options.plugins = plugins;
                if (mode === 'range') {
                    options.mode = 'range';
                    options.altFormat = 'F j, Y';
                }
                const picker = flatpickr(input, options);
                if (mode === 'range') rangePicker = picker;
            });
        }
        inputs.forEach(input => {
            const mode = input.dataset.dateMode || input.type;
            if (!input.hasAttribute('data-neoadmin-calendar')) {
                input.addEventListener('change', () => input.dispatchEvent(new CustomEvent('neoadmin:date-change', { bubbles: true, detail: { value: input.value, mode } })));
            }
            input.dispatchEvent(new CustomEvent('neoadmin:date-ready', { bubbles: true, detail: { input, mode } }));
        });
        if (!range) return;
        const table = document.querySelector<NeoTable>(`.neoadmin-table[data-date-filter="#${range.id}"]`);
        document.querySelectorAll<HTMLButtonElement>('[data-date-preset]').forEach(button => button.addEventListener('click', () => {
            const today = new Date();
            const start = new Date(today);
            const preset = button.dataset.datePreset;
            if (preset === 'last7') start.setDate(today.getDate() - 6);
            if (preset === 'month') start.setDate(1);
            if (preset === 'year') { start.setMonth(0); start.setDate(1); }
            rangePicker?.setDate([start, today], true);
        }));
        range.addEventListener('neoadmin:date-change', () => table?.dispatchEvent(new CustomEvent('neoadmin:table-filter-request', { bubbles: true })));
        range.addEventListener('neoadmin:date-clear', () => {
            rangePicker?.clear();
            delete range.dataset.isoStart;
            delete range.dataset.isoEnd;
        });
    }

    private async loadOptionalStylesheets(stylesheets: string[]): Promise<void> {
        const entryScript = Array.from(document.querySelectorAll<HTMLScriptElement>('script[src]')).find(script => /neoadmin(?:\.umd)?\.js(?:\?|$)/.test(script.src));
        const stylesheetDirectory = entryScript ? new URL('../css/', entryScript.src) : new URL('assets/css/', document.baseURI);
        await Promise.all(stylesheets.map(stylesheet => {
            const href = new URL(stylesheet, stylesheetDirectory).href;
            if (Array.from(document.styleSheets).some(existing => existing.href === href)) return Promise.resolve();
            return new Promise<void>(resolve => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.addEventListener('load', () => resolve(), { once: true });
                link.addEventListener('error', () => resolve(), { once: true });
                document.head.append(link);
            });
        }));
    }

    private async initSelects(): Promise<void> {
        await this.loadOptionalStylesheets(['tom-select.bootstrap5.css']);
        const [{ default: TomSelect }] = await Promise.all([import('tom-select'), import('tom-select/dist/css/tom-select.bootstrap5.min.css')]);
        document.querySelectorAll<HTMLSelectElement>('.neoadmin-select').forEach(element => new TomSelect(element, { plugins: element.multiple ? ['remove_button'] : [], create: false }));
    }

    private async initMasks(): Promise<void> {
        const { default: IMask } = await import('imask');
        document.querySelectorAll<HTMLInputElement>('[data-mask]').forEach(element => { if (element.dataset.mask) IMask(element, { mask: element.dataset.mask }); });
    }

    private async initCharts(): Promise<void> {
        const { default: Chart } = await import('chart.js/auto');
        (window as any).Chart = Chart;
        const themeStyles = getComputedStyle(document.documentElement);
        const palette = ['primary', 'info', 'success', 'warning', 'danger'].map(color => themeStyles.getPropertyValue(`--bs-${color}-bg-subtle`).trim());
        const primary = themeStyles.getPropertyValue('--bs-primary').trim();
        const surface = themeStyles.getPropertyValue('--bs-body-bg').trim();
        document.querySelectorAll<HTMLCanvasElement>('canvas[data-chart]').forEach(canvas => {
            const type = canvas.dataset.chart || 'bar';
            new Chart(canvas, {
                type: type as any,
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{ label: 'NeoAdmin', data: [13, 16, 20, 27, 36], borderColor: primary, backgroundColor: type === 'line' ? palette[0] : palette, borderWidth: 2, hoverBorderColor: surface, fill: type === 'line', tension: .35 }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        });
        document.dispatchEvent(new CustomEvent('neoadmin:charts-ready', { detail: { Chart } }));
    }

    private markActiveMenu(): void {
        const current = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll<HTMLAnchorElement>('.app-menu__item, .treeview-item').forEach(link => {
            if (link.getAttribute('href')?.split('/').pop() !== current) return;
            link.classList.add('active');
            const parent = link.closest('.treeview');
            parent?.classList.add('is-expanded');
            parent?.querySelector('.app-menu__item')?.classList.add('active');
        });
    }

    private handleSidebar(): void {
        const body = document.body;
        const sync = () => {
            const mobile = window.innerWidth < 768;
            body.classList.toggle('sidenav-toggled', !mobile && localStorage.getItem('neoadmin-sidebar-toggled') === 'true');
        };
        document.querySelector('[data-neoadmin-sidebar]')?.addEventListener('click', event => {
            event.preventDefault();
            body.classList.toggle('sidenav-toggled');
            this.saveState('sidebar-toggled', body.classList.contains('sidenav-toggled'));
        });
        document.querySelector('.app-sidebar__overlay')?.addEventListener('click', () => { body.classList.remove('sidenav-toggled'); this.saveState('sidebar-toggled', false); });
        document.querySelectorAll('.app-menu__item:not([data-neoadmin-treeview]), .treeview-item').forEach(link => link.addEventListener('click', () => {
            if (window.innerWidth < 768) { body.classList.remove('sidenav-toggled'); this.saveState('sidebar-toggled', false); }
        }));
        window.addEventListener('resize', sync);
        sync();
        document.documentElement.classList.remove('sidenav-toggled-init');
    }

    private handleTreeview(): void {
        document.querySelectorAll('[data-neoadmin-treeview]').forEach(toggle => toggle.addEventListener('click', event => {
            event.preventDefault();
            toggle.closest('.treeview')?.classList.toggle('is-expanded');
        }));
        document.querySelectorAll<HTMLElement>('[data-neoadmin-theme]').forEach(toggle => toggle.addEventListener('click', event => {
            event.preventDefault();
            this.setTheme(toggle.dataset.neoadminTheme || (document.documentElement.dataset.bsTheme === 'dark' ? 'light' : 'dark'));
        }));
        document.querySelectorAll<HTMLElement>('[data-neoadmin-login-flip]').forEach(toggle => toggle.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector('.login-box')?.classList.toggle('flipped');
        }));
    }

    private applyTheme(theme: 'light' | 'dark', preference: 'system' | 'light' | 'dark'): void {
        const selectedTheme = theme;
        document.documentElement.dataset.neoadminThemePreference = preference;
        document.documentElement.setAttribute('data-bs-theme', selectedTheme);
        NeoAdmin.syncBrowserThemeColor();
        document.querySelectorAll<HTMLElement>('[data-neoadmin-theme]').forEach(toggle => {
            const active = toggle.dataset.neoadminTheme === preference;
            toggle.classList.toggle('active', active);
            toggle.setAttribute('aria-pressed', String(active));
        });
    }

    private setTheme(theme: string): void {
        if (theme === 'system') {
            localStorage.removeItem('neoadmin-theme');
            this.applyTheme(NeoAdmin.getPreferredTheme(), 'system');
            return;
        }
        const selectedTheme = theme === 'dark' ? 'dark' : 'light';
        this.saveState('theme', selectedTheme);
        this.applyTheme(selectedTheme, selectedTheme);
    }

    private handleTheme(): void {
        this.applyTheme(NeoAdmin.getPreferredTheme(), NeoAdmin.getStoredTheme() || 'system');
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (NeoAdmin.getStoredTheme()) return;
            this.applyTheme(event.matches ? 'dark' : 'light', 'system');
        });
        document.querySelectorAll('[data-neoadmin-theme-toggle]').forEach(toggle => toggle.addEventListener('click', event => {
            event.preventDefault();
            this.setTheme(document.documentElement.dataset.bsTheme === 'dark' ? 'light' : 'dark');
        }));
    }

    private handleFontScaling(): void {
        const sizes = { '14px': 'small', '16px': 'normal', '18px': 'large' };
        const setSize = (size: string) => {
            const scale = sizes[size as keyof typeof sizes];
            if (!scale) return;
            document.documentElement.dataset.neoadminFontScale = scale;
            this.saveState('font-size', size);
            document.querySelectorAll('.btn-font-size').forEach(button => button.classList.toggle('active', (button as HTMLElement).dataset.fontSize === size));
        };
        setSize(localStorage.getItem('neoadmin-font-size') || '16px');
        document.addEventListener('click', event => {
            const button = (event.target as HTMLElement).closest<HTMLElement>('.btn-font-size');
            if (!button?.dataset.fontSize) return;
            event.preventDefault();
            event.stopPropagation();
            setSize(button.dataset.fontSize);
        });
    }

    private handleFullScreen(): void {
        document.querySelectorAll('[data-neoadmin-fullscreen]').forEach(toggle => toggle.addEventListener('click', event => {
            event.preventDefault();
            if (document.fullscreenElement) void document.exitFullscreen();
            else void document.documentElement.requestFullscreen();
        }));
    }

    private handleMobileFooter(): void {
        const top = document.querySelector<HTMLElement>('.app-search');
        const bottom = document.getElementById('footer-search-container');
        const bottomSearchToggle = document.getElementById('mobile-search-toggle-bottom');
        const apply = (active: boolean) => {
            document.body.classList.toggle('footer-visible', active);
            localStorage.setItem('neoadmin-footer-active', String(active));
            document.querySelectorAll<HTMLInputElement>('.neoadmin-footer-switch, #footerSwitch, [data-neoadmin-footer-toggle]').forEach(input => { input.checked = active; });
            top?.classList.remove('show');
            bottom?.classList.remove('show');
            document.querySelector('.toggle-search-btn')?.setAttribute('aria-expanded', 'false');
            bottomSearchToggle?.setAttribute('aria-expanded', 'false');
        };
        apply(localStorage.getItem('neoadmin-footer-active') === 'true');
        document.querySelectorAll<HTMLInputElement>('.neoadmin-footer-switch, #footerSwitch, [data-neoadmin-footer-toggle]').forEach(input => input.addEventListener('change', () => apply(input.checked)));
        (window as any).toggleFooterMode = (event?: Event) => { event?.stopPropagation(); apply(!document.body.classList.contains('footer-visible')); };
        const setBottomSearch = (active: boolean) => {
            bottom?.classList.toggle('show', active);
            bottomSearchToggle?.setAttribute('aria-expanded', String(active));
            if (active) bottom?.querySelector('input')?.focus();
        };
        document.body.addEventListener('click', event => {
            const target = event.target as HTMLElement;
            if (target.closest('.toggle-search-btn')) {
                const active = !top?.classList.contains('show');
                top?.classList.toggle('show', active);
                target.closest('.toggle-search-btn')?.setAttribute('aria-expanded', String(active));
                if (active) top?.querySelector('input')?.focus();
            }
            if (target.closest('#mobile-search-toggle-bottom')) {
                const container = document.body.classList.contains('footer-visible') ? bottom : top;
                if (container === bottom) setBottomSearch(true);
                else {
                    top?.classList.add('show');
                    bottomSearchToggle?.setAttribute('aria-expanded', 'true');
                    top?.querySelector('input')?.focus();
                }
            }
            if (target.closest('#close-footer-search, .app-bottom-search__close')) {
                setBottomSearch(false);
                document.querySelector('.toggle-search-btn')?.setAttribute('aria-expanded', 'false');
            }
        });
    }

    private handleCommandPalette(): void {
        const modalElement = document.getElementById('neoadmin-command-palette');
        if (!modalElement) return;
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        const input = modalElement.querySelector<HTMLInputElement>('[data-neoadmin-command-search]');
        const filter = () => {
            const query = input?.value.toLocaleLowerCase() || '';
            modalElement.querySelectorAll<HTMLElement>('[data-neoadmin-command]').forEach(item => { item.hidden = !item.textContent?.toLocaleLowerCase().includes(query); });
        };
        input?.addEventListener('input', filter);
        document.addEventListener('keydown', event => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); modal.show(); input?.focus(); }
            if (event.key === 'Escape') modal.hide();
        });
        modalElement.addEventListener('click', event => {
            const action = (event.target as HTMLElement).closest<HTMLElement>('[data-neoadmin-command]');
            if (!action) return;
            if (action.dataset.neoadminAction === 'theme') this.setTheme(document.documentElement.dataset.bsTheme === 'dark' ? 'light' : 'dark');
            if (action.dataset.neoadminAction === 'search') { location.href = 'page-search.html'; return; }
            if (action.dataset.href) { location.href = action.dataset.href; return; }
            modal.hide();
        });
        document.querySelectorAll('[data-neoadmin-command-open]').forEach(button => button.addEventListener('click', () => { modal.show(); input?.focus(); }));
    }

    private handlePersistence(): void {
        document.documentElement.setAttribute('data-bs-theme', NeoAdmin.getPreferredTheme());
        const fontSize = localStorage.getItem('neoadmin-font-size');
        if (fontSize) document.documentElement.dataset.neoadminFontScale = ({ '14px': 'small', '16px': 'normal', '18px': 'large' } as Record<string, string>)[fontSize] || 'normal';
    }

    private hidePreloader(): void {
        const preloader = document.getElementById('neoadmin-page-loader');
        if (!preloader) return;
        setTimeout(() => { preloader.classList.add('is-hidden'); setTimeout(() => preloader.remove(), 500); }, 400);
    }

    private saveState(key: string, value: unknown): void {
        if (this.options.persistence) localStorage.setItem(`neoadmin-${key}`, String(value));
    }
}

NeoAdmin.applyEarlyState();

if (typeof __AUTO_INIT__ !== 'undefined' && __AUTO_INIT__ && typeof window !== 'undefined') {
    (window as any).NeoAdmin = NeoAdmin.getInstance();
}
