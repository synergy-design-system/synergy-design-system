import type {
  SelectItem,
  SelectItemMixedId,
} from '../types.js';

/**
 * Shared stub for select items
 */
export const selectItems: SelectItem[] = [
  { label: 'Novice', value: '1' },
  { label: 'Intermediate', value: '2' },
  { label: 'Advanced', value: '3' },
];

export const selectItemsMixedId: SelectItemMixedId[] = [
  { disabled: false, id: 1, label: 'Option 1' },
  { disabled: false, id: 2, label: 'Option 2' },
  { disabled: true, id: 'three', label: 'Option 3' },
  { disabled: false, id: 'four', label: 'Option 4' },
  { disabled: false, id: 'five', label: 'Option 5' },
  { disabled: false, id: '6', label: 'Option 6' },
];

/**
 * Shared stub for select items nationalities
 */
export const nationalities: string[] = [
  'American',
  'Australian',
  'Brazilian',
  'British',
  'Canadian',
  'Chinese',
  'Dutch',
  'French',
  'German',
  'Greek',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mexican',
  'Russian',
  'Spanish',
  'Swedish',
  'Turkish',
];
