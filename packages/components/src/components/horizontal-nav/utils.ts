import SynNavItem from '../nav-item/nav-item.component.js';

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
export const isNavItem = (item: HTMLElement): item is SynNavItem => (
  item.tagName.toLocaleLowerCase() === 'syn-nav-item'
  || (item.getAttribute('role') ?? '') === 'menuitem'
);

/**
 * Get a list of only SynNavItem elements
 * @param items List of items to check for
 * @returns New array of all found syn-nav-items
 */
export const filterOnlyNavItems = (items: HTMLElement[]) => items.filter(isNavItem);
