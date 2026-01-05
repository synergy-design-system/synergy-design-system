import { defineConfig } from 'eslint/config';
import synergyConfig from '@synergy-design-system/eslint-config-syn/ts';

export default defineConfig([
  ...synergyConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      complexity: ['error', 10],
      'max-len': ['error', { code: 150 }],
      'no-console': 'off',
    },
  },
]);
