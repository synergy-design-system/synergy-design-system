import type {
  SelectItem,
  SelectItemMixedValue,
} from '../types.js';

/**
 * Shared stub for select items
 */
export const selectItems: SelectItem[] = [
  { label: 'Novice', value: '1' },
  { label: 'Intermediate', value: '2' },
  { label: 'Advanced', value: '3' },
];

export const selectItemsMixedValue: SelectItemMixedValue[] = [
  { disabled: false, label: 'Option 1', value: 1 },
  { disabled: false, label: 'Option 2', value: 2 },
  { disabled: true, label: 'Option 3', value: 'three' },
  { disabled: false, label: 'Option 4', value: 'four' },
  { disabled: false, label: 'Option 5', value: 'five' },
  { disabled: false, label: 'Option 6', value: '6' },
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

/**
 * Shared stub for select items for delimiter tests
 */
export const selectItemsWithSpace: SelectItem[] = [
  { label: 'Option 1', value: 'Option 1' },
  { label: 'Option 2', value: 'Option 2' },
  { label: 'Option 3', value: 'Option 3' },
];

/**
 * Shared stub for combobox items for delimiter tests
 */
export const comboboxItemsWithPipe: SelectItem[] = [
  { label: 'This is option 1', value: 'Option|1' },
  { label: 'This is option 2', value: 'Option|2' },
  { label: 'This is option 3', value: 'Option|3' },
];

export const valueWithSpace = 'Option 2';

export const valueWithPipe = 'Option|2';
