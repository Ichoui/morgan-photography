// vite.config.ts
import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: { modules: { localsConvention: 'camelCase' } },
  server: {
    host: 'localhost',
    port: 3945
  },

});
