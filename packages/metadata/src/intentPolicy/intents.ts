import type { IntentDefinition } from './types.js';
import { actionIntents } from './domains/action/index.js';
import { assistanceIntents } from './domains/assistance/index.js';
import { disclosureIntents } from './domains/disclosure/index.js';
import { feedbackIntents } from './domains/feedback/index.js';
import { inputIntents } from './domains/input/index.js';
import { navigationIntents } from './domains/navigation/index.js';
import { statusIntents } from './domains/status/index.js';
import { structureIntents } from './domains/structure/index.js';

/**
 * A comprehensive list of intent definitions, categorized by their respective intent categories.
 * Each intent definition includes detailed information about the intent's purpose, usage guidelines, and examples to illustrate how it can be effectively implemented within a user interface.
 * This collection serves as a valuable resource for designers and developers seeking to create intuitive and user-friendly interfaces that align with established best practices for intent usage.
 */
export const intents: IntentDefinition[] = [
  ...actionIntents,
  ...feedbackIntents,
  ...inputIntents,
  ...navigationIntents,
  ...disclosureIntents,
  ...statusIntents,
  ...assistanceIntents,
  ...structureIntents,
];
