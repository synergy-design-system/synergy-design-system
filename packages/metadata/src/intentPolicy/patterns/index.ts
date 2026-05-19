import type { IntentUsagePattern } from '../types.js';
import { actionPatterns } from './action.js';
import { assistancePatterns } from './assistance.js';
import { disclosurePatterns } from './disclosure.js';
import { feedbackPatterns } from './feedback.js';
import { inputPatterns } from './input.js';
import { navigationPatterns } from './navigation.js';
import { statusPatterns } from './status.js';
import { structurePatterns } from './structure.js';

/**
 * A comprehensive list of intent usage patterns, categorized by their respective intent categories.
 * Each pattern provides a specific example of how an intent can be implemented within a user interface, demonstrating best practices and common use cases for that category.
 */
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
