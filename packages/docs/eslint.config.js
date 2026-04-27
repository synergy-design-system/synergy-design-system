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
      // We are not allowed to change Chromatic_Modes_All to camelCase, so we need to allow it in the camelcase rule
      // This is because chromatic will create a complete new baseline and we want to avoid that as much as possible.
      camelcase: ['warn', {
        allow: [
          'Chromatic_Modes_All',
          'Chromatic_Modes_Sick_2018',
          'Chromatic_Modes_Sick_2025',
        ],
      }],
      // Allow devDependencies in documentation/stories
      'import/no-extraneous-dependencies': 'off',
      // Allow relative package imports for examples
      'import/no-relative-packages': 'off',
      // Story names can be descriptive beyond component names
      'storybook/no-redundant-story-name': 'off',
    },
  },
];
