import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig, UserConfig } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';

const config: UserConfig = {
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true
        }),
        react(),
        tailwindcss()
    ],
    base: isProduction ? 'https://kaykay-app-production.up.railway.app/build/' : '/',
    server: isProduction
        ? undefined // production doesn’t use dev server
        : {
              host: true // dev on LAN
              // remove https entirely
          },
    esbuild: {
        jsx: 'automatic'
    },
    build: {
        manifest: true,
        outDir: 'public/build',
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    }
};

export default defineConfig(config);
