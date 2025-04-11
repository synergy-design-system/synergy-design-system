/**
 * A type representing a single select item.
 * Mainly for usage in in select tests
 */
export type SelectItem = {
  value: string;
  label: string;
};

/**
 * A type representing a single select item with mixed id types.
 */
export type SelectItemMixedId = {
  disabled: boolean,
  id: string | number,
  label: string,
};
