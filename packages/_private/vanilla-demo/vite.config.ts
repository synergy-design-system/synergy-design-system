import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@synergy-design-system/assets/src/icons/*',
          dest: './assets/icons/',
        },
      ]
    }),
  ], 
})
