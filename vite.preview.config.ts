import { defineConfig } from 'vite';

export default defineConfig({
    publicDir: false,
    build: {
        outDir: 'docs',
    },
    preview: {
        host: '127.0.0.1',
        port: 4173,
        open: false,
    }
});
