import tsConfig from '@synergy-design-system/eslint-config-syn/ts';
import scriptsPreset from '@synergy-design-system/eslint-config-syn/presets/scripts';

export default [
  // Global ignores - must come first
  {
    ignores: ['dist/', 'dist/**/*'],
  },
  // Base TypeScript configuration
  ...tsConfig,
  // Build scripts configuration
  scriptsPreset,
];
