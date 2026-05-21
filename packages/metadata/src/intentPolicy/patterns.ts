import type { IntentUsagePattern } from './types.js';
import { actionPatterns } from './domains/action/index.js';
import { assistancePatterns } from './domains/assistance/index.js';
import { disclosurePatterns } from './domains/disclosure/index.js';
import { feedbackPatterns } from './domains/feedback/index.js';
import { inputPatterns } from './domains/input/index.js';
import { navigationPatterns } from './domains/navigation/index.js';
import { statusPatterns } from './domains/status/index.js';
import { structurePatterns } from './domains/structure/index.js';

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
