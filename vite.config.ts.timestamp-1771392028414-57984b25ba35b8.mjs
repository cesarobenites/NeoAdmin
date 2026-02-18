// vite.config.ts
import { defineConfig } from "file:///C:/Users/cesar/Google%20Drive/Proyectos/Web/NeoAdmin/node_modules/vite/dist/node/index.js";
import { viteStaticCopy } from "file:///C:/Users/cesar/Google%20Drive/Proyectos/Web/NeoAdmin/node_modules/vite-plugin-static-copy/dist/index.js";
import path from "path";
import autoprefixer from "file:///C:/Users/cesar/Google%20Drive/Proyectos/Web/NeoAdmin/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "C:\\Users\\cesar\\Google Drive\\Proyectos\\Web\\NeoAdmin";
var vite_config_default = defineConfig(({ mode }) => {
  const isVueBuild = mode === "vue";
  return {
    publicDir: false,
    // Disable public dir to avoid conflicts
    build: {
      outDir: "docs/assets",
      lib: {
        entry: path.resolve(__vite_injected_original_dirname, "src/ts/neoadmin.ts"),
        name: "NeoAdmin",
        fileName: () => "js/neoadmin.js",
        formats: isVueBuild ? ["es"] : ["umd"]
      },
      rollupOptions: {
        external: isVueBuild ? ["vue"] : [],
        output: {
          globals: {
            vue: "Vue"
          },
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return "unknown/[name][extname]";
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (assetInfo.name === "style.css") return "css/neoadmin.css";
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `images/[name][extname]`;
            }
            if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
              return `fonts/[name][extname]`;
            }
            return `css/[name][extname]`;
          }
        }
      },
      emptyOutDir: true
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: "src/images/*",
            dest: "images"
          },
          {
            src: "node_modules/bootstrap-icons/font/fonts/*",
            dest: "fonts"
          }
        ]
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src"),
        "~": path.resolve(__vite_injected_original_dirname, "node_modules"),
        "~bootstrap": path.resolve(__vite_injected_original_dirname, "node_modules/bootstrap")
      }
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer()
        ]
      },
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api", "import"],
          quietDeps: true
        }
      }
    },
    define: {
      __AUTO_INIT__: !isVueBuild
    },
    preview: {
      port: 4173,
      open: true
    },
    server: {
      port: 3e3,
      open: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxjZXNhclxcXFxHb29nbGUgRHJpdmVcXFxcUHJveWVjdG9zXFxcXFdlYlxcXFxOZW9BZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcY2VzYXJcXFxcR29vZ2xlIERyaXZlXFxcXFByb3llY3Rvc1xcXFxXZWJcXFxcTmVvQWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2Nlc2FyL0dvb2dsZSUyMERyaXZlL1Byb3llY3Rvcy9XZWIvTmVvQWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tICd2aXRlLXBsdWdpbi1zdGF0aWMtY29weSc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgICBjb25zdCBpc1Z1ZUJ1aWxkID0gbW9kZSA9PT0gJ3Z1ZSc7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwdWJsaWNEaXI6IGZhbHNlLCAvLyBEaXNhYmxlIHB1YmxpYyBkaXIgdG8gYXZvaWQgY29uZmxpY3RzXHJcbiAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgb3V0RGlyOiAnZG9jcy9hc3NldHMnLFxyXG4gICAgICAgICAgICBsaWI6IHtcclxuICAgICAgICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3RzL25lb2FkbWluLnRzJyksXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnTmVvQWRtaW4nLFxyXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6ICgpID0+ICdqcy9uZW9hZG1pbi5qcycsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXRzOiBpc1Z1ZUJ1aWxkID8gWydlcyddIDogWyd1bWQnXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWw6IGlzVnVlQnVpbGQgPyBbJ3Z1ZSddIDogW10sXHJcbiAgICAgICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ1ZTogJ1Z1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzc2V0SW5mby5uYW1lKSByZXR1cm4gJ3Vua25vd24vW25hbWVdW2V4dG5hbWVdJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mbyA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dCA9IGluZm9baW5mby5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09PSAnc3R5bGUuY3NzJykgcmV0dXJuICdjc3MvbmVvYWRtaW4uY3NzJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9wbmd8anBlP2d8c3ZnfGdpZnx0aWZmfGJtcHxpY28vaS50ZXN0KGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgaW1hZ2VzL1tuYW1lXVtleHRuYW1lXWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC93b2ZmfHdvZmYyfGVvdHx0dGZ8b3RmL2kudGVzdChleHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYGZvbnRzL1tuYW1lXVtleHRuYW1lXWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBjc3MvW25hbWVdW2V4dG5hbWVdYDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW1wdHlPdXREaXI6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgIHZpdGVTdGF0aWNDb3B5KHtcclxuICAgICAgICAgICAgICAgIHRhcmdldHM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJ3NyYy9pbWFnZXMvKicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3Q6ICdpbWFnZXMnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJ25vZGVfbW9kdWxlcy9ib290c3RyYXAtaWNvbnMvZm9udC9mb250cy8qJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdDogJ2ZvbnRzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICBdLFxyXG4gICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICAgICAgICAgICAgJ34nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnbm9kZV9tb2R1bGVzJyksXHJcbiAgICAgICAgICAgICAgICAnfmJvb3RzdHJhcCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdub2RlX21vZHVsZXMvYm9vdHN0cmFwJyksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNzczoge1xyXG4gICAgICAgICAgICBwb3N0Y3NzOiB7XHJcbiAgICAgICAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3ByZWZpeGVyKClcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzaWxlbmNlRGVwcmVjYXRpb25zOiBbJ2xlZ2FjeS1qcy1hcGknLCAnaW1wb3J0J10sXHJcbiAgICAgICAgICAgICAgICAgICAgcXVpZXREZXBzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlZmluZToge1xyXG4gICAgICAgICAgICBfX0FVVE9fSU5JVF9fOiAhaXNWdWVCdWlsZCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByZXZpZXc6IHtcclxuICAgICAgICAgICAgcG9ydDogNDE3MyxcclxuICAgICAgICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlcnZlcjoge1xyXG4gICAgICAgICAgICBwb3J0OiAzMDAwLFxyXG4gICAgICAgICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pOyJdLAogICJtYXBwaW5ncyI6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
