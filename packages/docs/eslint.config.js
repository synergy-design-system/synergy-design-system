import { defineConfig } from 'eslint/config';
import tsConfig from '@synergy-design-system/eslint-config-syn/ts';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  ...tsConfig,
  {
    plugins: {
      storybook,
    },
    rules: {
      ...storybook.configs.recommended.rules,
    },
  },
  {
    rules: {
      complexity: ['error', { max: 10 }],
      'import/no-extraneous-dependencies': 'off',
      'import/no-relative-packages': 'off',
      'storybook/no-redundant-story-name': 'off',
    },
  },
]);
