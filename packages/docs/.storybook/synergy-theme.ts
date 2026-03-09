import { create } from 'storybook/theming/create';

const baseConfig = {
  brandImage: '/synergy_logo_transparent.png',
  brandTarget: '_self',
  brandTitle: 'Synergy Design System',
  brandUrl: '/',
};

export const light = create({
  ...baseConfig,
  base: 'light',
});

export const dark = create({
  ...baseConfig,
  base: 'dark',
});
