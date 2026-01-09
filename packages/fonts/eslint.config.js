import jsConfig from '@synergy-design-system/eslint-config-syn';
import scriptsPreset from '@synergy-design-system/eslint-config-syn/presets/scripts';

export default [
  ...jsConfig,
  // Build scripts configuration
  scriptsPreset,
];
