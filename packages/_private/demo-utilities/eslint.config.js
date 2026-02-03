import {
  createCustomConfig,
} from '@synergy-design-system/eslint-config-syn/ts';

export default createCustomConfig({
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
});
