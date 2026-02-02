/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          dest: './assets/icons/',
          src: './node_modules/@synergy-design-system/assets/src/sick2025/icons/outline/*',
        },
      ],
    }),
    react(),
  ],
  server: {
    port: 5175,
  },
});
