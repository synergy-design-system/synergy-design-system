import type { IntentDefinition } from '../../types.js';

export const inputIntents: IntentDefinition[] = [
  {
    category: 'input',
    description: 'Use when a user should provide short, single-line text input.',
    id: 'input.text.short',
    userGoal: 'Capture compact textual or numeric values in a form field.',
  },
  {
    category: 'input',
    description: 'Use when a user should provide longer, multi-line input.',
    id: 'input.text.long',
    userGoal: 'Capture detailed comments, descriptions, or narrative responses.',
  },
  {
    category: 'input',
    description: 'Use when one option should be selected from predefined choices.',
    id: 'input.selection.single',
    userGoal: 'Make one explicit selection from a known set.',
  },
  {
    category: 'input',
    description: 'Use when multiple options should be selected from predefined choices.',
    id: 'input.selection.multiple',
    userGoal: 'Select multiple relevant options in one control.',
  },
  {
    category: 'input',
    description: 'Use when options are numerous and should be filtered by typing.',
    id: 'input.selection.searchable',
    userGoal: 'Find and select options quickly through live filtering.',
  },
  {
    category: 'input',
    description: 'Use for binary choices that apply immediately on toggle.',
    id: 'input.binary.immediate',
    userGoal: 'Enable or disable a setting with instant effect.',
  },
  {
    category: 'input',
    description: 'Use for binary choices that are submitted later with the form.',
    id: 'input.binary.deferred',
    userGoal: 'Record a binary preference without immediate side effects.',
  },
  {
    category: 'input',
    description: 'Use when files or folders must be attached or uploaded.',
    id: 'input.file.upload',
    userGoal: 'Provide one or more local files for processing.',
  },
  {
    category: 'input',
    description: 'Use sliders when selecting a numeric value within a bounded range.',
    id: 'input.range.slider',
    userGoal: 'Pick a value quickly with immediate visual feedback across a range.',
  },
  {
    category: 'input',
    description: 'Use grouped options to organize long option lists into logical clusters.',
    id: 'input.selection.grouped-options',
    userGoal: 'Find and choose options faster through labeled option groupings.',
  },
];
