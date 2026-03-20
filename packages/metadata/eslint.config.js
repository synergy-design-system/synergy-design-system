import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';

export default [
  ...createCustomConfig({
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
  }),
  // Build and utility scripts need relaxed rules
  {
    files: [
      'src/**/*.ts',
    ],
  },
];
