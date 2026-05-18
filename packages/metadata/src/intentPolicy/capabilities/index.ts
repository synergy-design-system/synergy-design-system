import type { IntentCapability } from '../types.js';
import { actionCapabilities } from './action.js';
import { assistanceCapabilities } from './assistance.js';
import { disclosureCapabilities } from './disclosure.js';
import { feedbackCapabilities } from './feedback.js';
import { inputCapabilities } from './input.js';
import { navigationCapabilities } from './navigation.js';
import { statusCapabilities } from './status.js';
import { structureCapabilities } from './structure.js';

export const targetCapabilities: IntentCapability[] = [
  ...actionCapabilities,
  ...feedbackCapabilities,
  ...inputCapabilities,
  ...navigationCapabilities,
  ...disclosureCapabilities,
  ...statusCapabilities,
  ...assistanceCapabilities,
  ...structureCapabilities,
];
