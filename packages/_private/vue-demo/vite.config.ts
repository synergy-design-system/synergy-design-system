import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          dest: './assets/icons/',
          src: './node_modules/@synergy-design-system/assets/src/sick2025/icons/outline/*',
        },
      ],
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
