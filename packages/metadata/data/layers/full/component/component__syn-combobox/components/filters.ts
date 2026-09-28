import SynOption from '../option/option.component.js';
import { normalizeString } from './utils.js';

/**
 * A function used to filter options in the combobox component.
 *
 * @param option - The option to be filtered.
 * @param queryString - The query string used for filtering.
 * @returns A boolean indicating whether the option should be included in the filtered results.
 */
export type ComboboxFilter = (option: SynOption, queryString: string) => boolean;

/**
 * The default filter, which is a case- and diacritic-insensitive string comparison
 * of the option's label, as well as a partial match on its value.
 */
export const containsFilter: ComboboxFilter = (option, queryStr) => {
  let content = option?.textContent || '';
  if (option instanceof SynOption) {
    content = option.getTextLabel();
  }
  const normalizedOption = normalizeString(content);
  const normalizedQuery = normalizeString(queryStr);

  if (normalizedOption.includes(normalizedQuery)) {
    return true;
  }

  // #1362 do not do an equal test, as other filtered options should also be shown if they partially match
  const value = option?.value?.toString() || '';
  return value.includes(queryStr);
};

/**
 * A filter that does not filter at all and always shows all options.
 * Make sure to combine this with getOption highlight renderer for better ux.
 */
export const noneFilter: ComboboxFilter = () => true;

/**
 * The predefined filters that may be used via their name for the combobox `filter` property.
 */
export const comboboxFilters = {
  contains: containsFilter,
  none: noneFilter,
} as const satisfies Record<string, ComboboxFilter>;

export type ComboboxFilterName = keyof typeof comboboxFilters;
