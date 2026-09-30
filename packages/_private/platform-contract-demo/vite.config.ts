/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export const defaultConfig = {
  plugins: [
    viteStaticCopy({
      targets: [
        // Copy all static assets to the dist folder
        {
          dest: './assets/icons/',
          rename: {
            stripBase: true,
          },
          src: './node_modules/@synergy-design-system/assets/src/sick2025/icons/outline/*',
        },
        // Allow loading subpages from the src/pages directory
        {
          dest: './pages/',
          rename: {
            stripBase: true,
          },
          src: './src/pages/*',
        },
      ],
    }),
  ],
  server: {
    forwardConsole: false,
    port: 5177,
  },
};

// https://vitejs.dev/config/
export default defineConfig(defaultConfig);
