// vite.config.ts
import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      // https://vite-pwa-org.netlify.app/examples/react.html
      // https://github.com/vite-pwa/vite-plugin-pwa/
      // https://web.dev/add-manifest/ manifest
      // https://maskable.app/editor <-- pour générer les icones avec fond de couleur
      // Utiliser lightHouse pour tester le PWA
      registerType: 'autoUpdate',
      workbox: {
        // clientsClaim: true, // <-- this one generate sw.js and workbox-xxx.js
        // skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  css: { modules: { localsConvention: 'camelCase' } },
  base: '/',
  publicDir: 'public',
  server: {
    host: 'localhost',
    port: 3945,
    strictPort: true,
  },
  preview: {
    host: 'localhost',
    port: 4467,
  },
  build: {
    assetsInlineLimit: 50000,
  },
});
