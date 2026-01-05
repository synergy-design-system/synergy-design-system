import { defineConfig } from 'eslint/config';
import synergyConfig from '@synergy-design-system/eslint-config-syn/ts';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default defineConfig([
  ...synergyConfig,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
