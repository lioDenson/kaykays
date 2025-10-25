import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            // disable SSR unless you're actually using it
            refresh: ['resources/views/**', 'routes/**']
        }),
        react(),
        tailwindcss()
    ],
    esbuild: {
        jsx: 'automatic'
    },
    server: {
        // use only localhost for dev
        host: 'localhost',
        port: 5173,
        strictPort: true, // avoids random port switching
        hmr: {
            host: 'localhost'
        }
    }
});
