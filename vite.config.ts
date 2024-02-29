import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api/v1': {
        target: 'http://0.0.0.0:8000',
        changeOrigin: true,
      },
    },
  },
  base: '/labs-bmstu-2023-dia-frontend/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['github.svg', 'vk.svg', 'tg.svg'],
      manifest: {
        name: 'Podjobka',
        short_name: 'Podjobka',
        description: 'Сайт для самозанятых, чтобы каждый нашел работу по душе',
        start_url: '/labs-bmstu-2023-dia-frontend/',
        display: 'standalone',
        orientation: 'portrait-primary',
        theme_color: '#ffffff',
        icons: [
          {
            src: '16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: '32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '80.png',
            sizes: '80x80',
            type: 'image/png',
          },
          {
            src: '128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ],
      },
    }),
  ],
});
