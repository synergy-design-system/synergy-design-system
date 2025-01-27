export type * from './base.js';
export { defaultSettings, INITIAL_DEFAULT_SETTINGS } from './base.js';
export * from './decorator.js';

// We only export the outbound interface of the decorator
export {
  enableExperimentalSettingEmitEvents,
  setDefaultSettingsForElement,
  setGlobalDefaultSettings,
} from './functions.js';
