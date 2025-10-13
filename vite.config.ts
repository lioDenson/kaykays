import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
            // Add this line:
            server: {
                host: true,
                https: true
            },
            // OR if needed for production build:
            build: {
                assetsPublicPath: 'https://kaykay-app-production.up.railway.app/build/'
            }
        }),
        react(),
        tailwindcss()
    ],
    esbuild: {
        jsx: 'automatic'
    }
});
