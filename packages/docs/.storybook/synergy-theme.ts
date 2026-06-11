import { create } from 'storybook/theming/create';

const baseConfig = {
  brandImage: '/synergy_logo_transparent.png',
  brandTarget: '_self',
  brandTitle: 'Synergy Design System',
  brandUrl: '/',

  // Override Storybook's default Nunito Sans with the design system font.
  // Open Sans is loaded in manager-head.html so it is available in both
  // the manager frame (sidebar / toolbar) and the preview iframe.
  fontBase: "'SICK Intl', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
};

export const light = create({
  ...baseConfig,
  base: 'light',
});

export const dark = create({
  ...baseConfig,
  base: 'dark',
});
