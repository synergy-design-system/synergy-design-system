/* eslint-disable import/no-extraneous-dependencies */
import fs from 'node:fs';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createSpriteSheet } from '@synergy-design-system/assets';

type SynSpriteSheetOptions = {
  /**
   * The output file name. Make sure the path exists
   */
  outFileName: string;

  /**
   * List of icons to include in the sprite sheet
   */
  icons: Parameters<typeof createSpriteSheet>[0];
};

const defaultOptions: SynSpriteSheetOptions = {
  icons: [],
  outFileName: './public/synergy-icon-sprites.svg',
};

const synSpriteSheetCreator = (options: Partial<SynSpriteSheetOptions> = {}) => ({
  buildStart: () => {
    const finalOptions = {
      ...defaultOptions,
      ...options,
    };
    const {
      icons,
      outFileName,
    } = finalOptions;

    const sheet = createSpriteSheet(icons);

    // Create the output file
    fs.writeFileSync(outFileName, sheet);
  },
  name: 'syn-sprite-sheet-creator',
});

export const defaultConfig = {
  plugins: [
    viteStaticCopy({
      targets: [
        // Copy all static assets to the dist folder
        {
          dest: './assets/icons/',
          src: 'node_modules/@synergy-design-system/assets/src/icons/*',
        },
        // Allow loading subpages from the src/pages directory
        {
          dest: './pages/',
          src: './src/pages/*',
        },
      ],
    }),
  ],
  server: {
    port: 5173,
  },
};

export const withSpriteSheetGenerator = {
  plugins: [
    synSpriteSheetCreator({
      icons: [
        'weekend',
        'home',
        'contact_mail',
        'contact_emergency',
        'density_small',
        'density_medium',
        'density_large',
        'grid_view',
        'wallpaper',
        'house',
        'chat',
        'info',
        'check_circle',
        'settings',
        'warning',
        'error',
        'lunch_dining',
        'space_dashboard',
        'preview',
        'bug_report',
      ],
    }),
    viteStaticCopy({
      targets: [
        // Allow loading subpages from the src/pages directory
        {
          dest: './pages/',
          src: './src/pages/*',
        },
      ],
    }),
  ],
  server: {
    port: 5173,
  },
};

// https://vitejs.dev/config/
export default defineConfig(
  // Change this to withSpriteSheetGenerator to test the sprite sheet generator
  // withSpriteSheetGenerator,
  defaultConfig,
);
