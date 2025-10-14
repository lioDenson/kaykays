import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true
        }),
        react(),
        tailwindcss()
        // ✅ Temporarily disable wayfinder for phone debugging
        // ...(process.env.NODE_ENV === 'production' ? [] : [wayfinder({ formVariants: true })])
    ],
    esbuild: {
        jsx: 'automatic'
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: '192.168.100.161',
            port: 5173
        }
    }
});
