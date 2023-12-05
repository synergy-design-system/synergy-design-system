import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [{
        src: 'node_modules/@synergy-design-system/assets/src/icons/*',
        dest: './assets/icons/',
      }],
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('syn-'),
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
