import synergyConfig from '@synergy-design-system/eslint-config-syn/ts';

export default [
  ...synergyConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Release utilities need console access for CLI output
  {
    rules: {
      'no-console': 'off',
    },
  },
];
