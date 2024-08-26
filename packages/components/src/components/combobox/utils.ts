import type SynOption from '../option/option.component.js';

/**
 * Get a list of all assigned elements for a given slot
 * @param slot The slot to query
 * @returns Flattened list of assigned elements
 */
export const getAssignedElementsForSlot = (slot: HTMLSlotElement) => Array.from(
  slot.assignedElements({ flatten: true }),
) as HTMLElement[];

/**
 * Check if an item is a SynNavItem or otherwise an item that has a role of menuitem.
 * Note we always treat all items as SynNavItems here
 * @param item The item to check for
 * @returns True if the item is a SynNavItem, false otherwise
 */
export const isOption = (item: HTMLElement): item is SynOption => (
  item.tagName.toLocaleLowerCase() === 'syn-option'
  || (item.getAttribute('role') ?? '') === 'option'
);

/**
 * Get a list of only Option elements
 * @param items List of items to check for
 * @returns New array of all found syn-nav-items
 */
export const filterOnlyOptions = (items: HTMLElement[]) => items.filter(isOption);

/**
 * Normalize a string by removing accents and converting to lowercase
 * @param str The string to normalize
 * @returns The normalized string
 */
export const normalizeString = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
