import type { IntentUsagePattern } from '../types.js';
import { actionPatterns } from './action.js';
import { assistancePatterns } from './assistance.js';
import { disclosurePatterns } from './disclosure.js';
import { feedbackPatterns } from './feedback.js';
import { inputPatterns } from './input.js';
import { navigationPatterns } from './navigation.js';
import { statusPatterns } from './status.js';
import { structurePatterns } from './structure.js';

export const usagePatterns: IntentUsagePattern[] = [
  ...actionPatterns,
  ...feedbackPatterns,
  ...inputPatterns,
  ...navigationPatterns,
  ...disclosurePatterns,
  ...statusPatterns,
  ...assistancePatterns,
  ...structurePatterns,
];
