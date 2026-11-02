import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import { fileURLToPath } from 'node:url';
import autoprefixer from 'autoprefixer';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    const isVueBuild = mode === 'vue';

    return {
        publicDir: false,
        build: {
            outDir: 'docs/assets',
            cssCodeSplit: true,
            lib: {
                entry: path.resolve(projectRoot, 'src/ts/neoadmin.ts'),
                name: 'NeoAdmin',
                formats: isVueBuild ? ['es'] : ['es', 'umd'],
                fileName: format => format === 'es' ? 'js/neoadmin.js' : 'js/neoadmin.umd.js',
            },
            rollupOptions: {
                external: isVueBuild ? ['vue'] : [],
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    globals: { vue: 'Vue' },
                    assetFileNames: assetInfo => {
                        if (!assetInfo.name) return 'unknown/[name][extname]';
                        const extension = assetInfo.name.split('.').pop();
                        if (assetInfo.name === 'style.css') return 'css/neoadmin.css';
                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extension || '')) return 'images/[name][extname]';
                        if (/woff|woff2|eot|ttf|otf/i.test(extension || '')) return 'fonts/[name][extname]';
                        return 'css/[name][extname]';
                    },
                },
            },
            emptyOutDir: true,
        },
        plugins: [
            viteStaticCopy({
                targets: [
                    { src: 'src/images/*', dest: 'images', rename: { stripBase: true } },
                    { src: 'node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2', dest: 'fonts', rename: { stripBase: true } },
                ],
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(projectRoot, 'src'),
                '~': path.resolve(projectRoot, 'node_modules'),
                '~bootstrap': path.resolve(projectRoot, 'node_modules/bootstrap'),
            },
        },
        css: {
            postcss: { plugins: [autoprefixer()] },
            preprocessorOptions: { scss: { silenceDeprecations: ['legacy-js-api', 'import'], quietDeps: true } },
        },
        define: { __AUTO_INIT__: !isVueBuild },
        preview: { port: 4173, open: true },
        server: { port: 3000, open: true },
    };
});
