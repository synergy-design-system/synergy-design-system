import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';
import storybook from 'eslint-plugin-storybook';

export default [
  ...createCustomConfig({
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
  }),
  // Storybook-specific configuration
  {
    plugins: {
      storybook,
    },
    rules: {
      ...storybook.configs.recommended.rules,
    },
  },
  // Documentation-specific rule overrides
  {
    rules: {
      // Allow devDependencies in documentation/stories
      'import/no-extraneous-dependencies': 'off',
      // Allow relative package imports for examples
      'import/no-relative-packages': 'off',
      // Story names can be descriptive beyond component names
      'storybook/no-redundant-story-name': 'off',
    },
  },
];
