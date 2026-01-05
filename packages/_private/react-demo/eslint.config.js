import synergyConfig from '@synergy-design-system/eslint-config-syn/ts';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default [
  ...synergyConfig,
  // React-specific configuration for demo application
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
      // Enforce file extensions for ESM compatibility
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      // Prefer arrow function components for consistency
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      // Allow JSX in .tsx files
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      // React 17+ doesn't require React import
      'react/react-in-jsx-scope': 'off',
      // Enforce React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['eslint.config.js'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
