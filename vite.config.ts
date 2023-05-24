// vite.config.ts
import {defineConfig} from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: { modules: { localsConvention: 'camelCase' } },
  server: {
    host: 'localhost',
    port: 3945,
    strictPort: true
  },
  preview: {
    host: 'localhost',
    port: 8080,
  },
  build: {}
});
