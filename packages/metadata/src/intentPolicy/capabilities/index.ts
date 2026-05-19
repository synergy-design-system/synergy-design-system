import type { IntentCapability } from '../types.js';
import { actionCapabilities } from './action.js';
import { assistanceCapabilities } from './assistance.js';
import { disclosureCapabilities } from './disclosure.js';
import { feedbackCapabilities } from './feedback.js';
import { inputCapabilities } from './input.js';
import { navigationCapabilities } from './navigation.js';
import { statusCapabilities } from './status.js';
import { structureCapabilities } from './structure.js';

/**
 * A comprehensive list of intent capabilities, categorized by their respective intent categories.
 * Each capability outlines the specific functionalities and features that an intent can support within a user interface, providing designers and developers with a clear understanding of how to effectively implement and leverage these capabilities to enhance user interactions and overall experience.
 */
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
