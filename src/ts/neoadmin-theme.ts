(() => {
    const root = document.documentElement;
    let preference: 'system' | 'light' | 'dark' = 'system';

    try {
        const storedPreference = window.localStorage.getItem('neoadmin-theme');
        if (storedPreference === 'light' || storedPreference === 'dark') preference = storedPreference;
    } catch {
        preference = 'system';
    }

    const resolvedTheme = preference === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        : preference;

    root.dataset.neoadminThemePreference = preference;
    root.setAttribute('data-bs-theme', resolvedTheme);
})();
