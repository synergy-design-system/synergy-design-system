import { actionCategory } from './action.js';
import { assistanceCategory } from './assistance.js';
import { disclosureCategory } from './disclosure.js';
import { feedbackCategory } from './feedback.js';
import { inputCategory } from './input.js';
import { navigationCategory } from './navigation.js';
import { statusCategory } from './status.js';
import { structureCategory } from './structure.js';

/**
 * A comprehensive list of intent categories, each representing a distinct classification of user intents that can be utilized within a user interface.
 * These categories serve as a foundational framework for organizing and understanding the various types of user interactions and behaviors that can occur within a digital product, enabling designers and developers to create more intuitive and user-friendly interfaces that effectively address the needs and goals of their users.
 */
export const intentCategories = [
  actionCategory,
  feedbackCategory,
  inputCategory,
  navigationCategory,
  disclosureCategory,
  statusCategory,
  assistanceCategory,
  structureCategory,
];
