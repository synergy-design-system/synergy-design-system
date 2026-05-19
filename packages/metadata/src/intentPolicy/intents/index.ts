import type { IntentDefinition } from '../types.js';
import { actionIntents } from './action.js';
import { assistanceIntents } from './assistance.js';
import { disclosureIntents } from './disclosure.js';
import { feedbackIntents } from './feedback.js';
import { inputIntents } from './input.js';
import { navigationIntents } from './navigation.js';
import { statusIntents } from './status.js';
import { structureIntents } from './structure.js';

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
