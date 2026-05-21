import type { IntentCategory } from './types.js';
import { actionCategory } from './domains/action/index.js';
import { assistanceCategory } from './domains/assistance/index.js';
import { disclosureCategory } from './domains/disclosure/index.js';
import { feedbackCategory } from './domains/feedback/index.js';
import { inputCategory } from './domains/input/index.js';
import { navigationCategory } from './domains/navigation/index.js';
import { statusCategory } from './domains/status/index.js';
import { structureCategory } from './domains/structure/index.js';

/**
 * A comprehensive list of intent categories, each representing a distinct classification of user intents that can be utilized within a user interface.
 * These categories serve as a foundational framework for organizing and understanding the various types of user interactions and behaviors that can occur within a digital product, enabling designers and developers to create more intuitive and user-friendly interfaces that effectively address the needs and goals of their users.
 */
export const intentCategories: IntentCategory[] = [
  actionCategory,
  feedbackCategory,
  inputCategory,
  navigationCategory,
  disclosureCategory,
  statusCategory,
  assistanceCategory,
  structureCategory,
];
