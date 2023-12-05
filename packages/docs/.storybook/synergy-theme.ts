import { create } from '@storybook/theming/create';

const baseConfig = {
  brandTitle: 'Synergy Design System',
  brandUrl: 'https://github.com/SickDesignSystem/synergy/',
  brandImage: '/synergy_logo_transparent.png',
  brandTarget: '_self',
};

export const light = create({
  ...baseConfig,
  base: 'light',
});

export const dark = create({
  ...baseConfig,
  base: 'dark',
});
