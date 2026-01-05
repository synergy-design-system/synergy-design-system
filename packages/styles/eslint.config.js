import synergy from '@synergy-design-system/eslint-config-syn/ts';
import scriptsPreset from '@synergy-design-system/eslint-config-syn/presets/scripts';

export default [
  ...synergy,
  // Build scripts configuration
  scriptsPreset,
];
