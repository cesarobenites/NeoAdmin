import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ mode }) => {
    const isVueBuild = mode === 'vue';

    return {
        publicDir: false, // Disable public dir to avoid conflicts
        build: {
            outDir: 'docs/assets',
            lib: {
                entry: path.resolve(__dirname, 'src/ts/neoadmin.ts'),
                name: 'NeoAdmin',
                fileName: () => 'js/neoadmin.js',
                formats: isVueBuild ? ['es'] : ['umd'],
            },
            rollupOptions: {
                external: isVueBuild ? ['vue'] : [],
                output: {
                    globals: {
                        vue: 'Vue',
                    },
                    assetFileNames: (assetInfo) => {
                        if (!assetInfo.name) return 'unknown/[name][extname]';
                        const info = assetInfo.name.split('.');
                        const ext = info[info.length - 1];
                        if (assetInfo.name === 'style.css') return 'css/neoadmin.css';
                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                            return `images/[name][extname]`;
                        }
                        if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
                            return `fonts/[name][extname]`;
                        }
                        return `css/[name][extname]`;
                    },
                },
            },
            emptyOutDir: true,
        },
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: 'src/images/*',
                        dest: 'images'
                    },
                    {
                        src: 'node_modules/bootstrap-icons/font/fonts/*',
                        dest: 'fonts'
                    }
                ]
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '~': path.resolve(__dirname, 'node_modules'),
                '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            }
        },
        css: {
            postcss: {
                plugins: [
                    autoprefixer()
                ],
            },
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api'],
                    quietDeps: true,
                },
            },
        },
        define: {
            __AUTO_INIT__: !isVueBuild,
        },
        preview: {
            port: 4173,
            open: true,
        },
        server: {
            port: 3000,
            open: true,
        }
    };
});
