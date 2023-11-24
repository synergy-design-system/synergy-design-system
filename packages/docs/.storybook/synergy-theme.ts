import { create } from '@storybook/theming/create';

const baseConfig = {
  brandTitle: 'Synergy Design System',
  brandUrl: 'https://github.com/synergy-design-system/synergy-design-system/',
  brandImage: '/logo-claim.svg',
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
