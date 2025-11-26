/* eslint-disable import/no-extraneous-dependencies */
import fs from 'node:fs';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { AllowedIconsets, createSpriteSheet, Icon2018Keys, Icon2025Keys } from '@synergy-design-system/assets';

type IconKeys = Icon2018Keys | Icon2025Keys;

type SynSpriteSheetOptions<Icons extends IconKeys> = {
  /**
   * The output file name. Make sure the path exists
   */
  outFileName: string;

  /**
   * List of icons to include in the sprite sheet
   */
  icons: Icons[];

  iconset: AllowedIconsets;
};

const icons = [
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
  'light_mode',
  'dark_mode',
] satisfies (Icon2018Keys & Icon2025Keys)[];

const defaultOptions: SynSpriteSheetOptions<Icon2018Keys> = {
  icons: [],
  iconset: 'sick2018',
  outFileName: './public/synergy-icon-sprites.svg',
};

const synSpriteSheetCreator = <T extends Icon2018Keys | Icon2025Keys>(
  options: Partial<SynSpriteSheetOptions<T>> = {},
) => ({
  buildStart: () => {
    const finalOptions = {
      ...defaultOptions,
      ...options,
    };
    const {
      icons,
      iconset,
      outFileName,
    } = finalOptions;

    let sheet;
    if (iconset === 'sick2018') {
      sheet = createSpriteSheet(icons as Icon2018Keys[], 'sick2018');
    } else {
      sheet = createSpriteSheet(icons as Icon2025Keys[], 'sick2025');
    }

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
        {
          dest: './assets/fonts/',
          src: 'node_modules/@synergy-design-system/assets/src/fonts/*',
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
    synSpriteSheetCreator<Icon2018Keys>({
      icons,
      iconset: 'sick2018',
    }),
    synSpriteSheetCreator<Icon2025Keys>({
      icons,
      iconset: 'sick2025',
      outFileName: './public/synergy-icon-sprites-2025.svg',
    }),
    viteStaticCopy({
      targets: [
        {
          dest: './assets/fonts/',
          src: 'node_modules/@synergy-design-system/assets/src/fonts/*',
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

// https://vitejs.dev/config/
export default defineConfig(
  // Change this to withSpriteSheetGenerator to test the sprite sheet generator
  withSpriteSheetGenerator,
  // defaultConfig,
);
