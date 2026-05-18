import type { IntentDefinition } from '../types.js';
import { actionIntents } from './action.js';
import { assistanceIntents } from './assistance.js';
import { disclosureIntents } from './disclosure.js';
import { feedbackIntents } from './feedback.js';
import { inputIntents } from './input.js';
import { navigationIntents } from './navigation.js';
import { statusIntents } from './status.js';
import { structureIntents } from './structure.js';

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
