import type { IntentCapability } from './types.js';
import { actionCapabilities } from './domains/action/index.js';
import { assistanceCapabilities } from './domains/assistance/index.js';
import { disclosureCapabilities } from './domains/disclosure/index.js';
import { feedbackCapabilities } from './domains/feedback/index.js';
import { inputCapabilities } from './domains/input/index.js';
import { navigationCapabilities } from './domains/navigation/index.js';
import { statusCapabilities } from './domains/status/index.js';
import { structureCapabilities } from './domains/structure/index.js';

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
