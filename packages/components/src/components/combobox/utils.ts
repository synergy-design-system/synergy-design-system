import { type TemplateResult, html, render } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type SynOptGroup from '../optgroup/optgroup.js';
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
 * Retrieves the option or nested options from the provided HTMLElement.
 *
 * @param item - The HTMLElement representing the option or containing nested options.
 * @returns The found syn-option(s)
 */
export const getOptionOrNestedOptions = (item: HTMLElement): SynOption | SynOption[] => (
  item.tagName.toLocaleLowerCase() === 'syn-option' ? item as SynOption : Array.from(item.querySelectorAll<SynOption>(':scope > syn-option'))
);

/**
 * Check if an item is a syn-optgroup
 * @param item The item to check for
 * @returns True if the item is a SynOptgroup, false otherwise
 */
export const isOptgroup = (item: HTMLElement): item is SynOptGroup => (
  item.tagName.toLocaleLowerCase() === 'syn-optgroup'
);

/**
 * Get a list of only Option elements
 * @param items List of items to check for
 * @returns New array of all found syn-nav-items
 */
export const getAllOptions = (items: HTMLElement[]) => items.map(getOptionOrNestedOptions);

/**
 * Get a list of only Optgroup elements
 * @param items List of items to check for
 * @returns New array of all found syn-optgroup's
 */
export const filterOnlyOptgroups = (items: HTMLElement[]) => items.filter(isOptgroup);

/**
 * Normalize a string by removing accents and converting to lowercase
 * @param str The string to normalize
 * @returns The normalized string
 */
export const normalizeString = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/**
 * Creates a `SynOption` element from a given `TemplateResult`.
 * We assume that the given `TemplateResult` is a <syn-option>.
 *
 * @param template - The `TemplateResult` to be rendered into a `SynOption`.
 * @returns The created SynOption element
 */
export const createElementFromTemplateResult = (template: TemplateResult) => {
  const container = document.createElement('div');
  render(template, container);
  return container.firstElementChild as HTMLElement;
};

/**
 * This function takes an input of type `TemplateResult`, `string`, or `HTMLElement`
 * and creates an SynOption from it.
 *
 * @param option - The option which can be of type `TemplateResult`, `string` or `HTMLElement`.
 * @returns The created SynOption or undefined if the option was not a valid type.
 */
export const createOptionFromDifferentTypes = (option: TemplateResult | string | HTMLElement) => {
  if (!option) return undefined;

  const getOptionOrUndefined = (element: HTMLElement) => (element.tagName.toLocaleLowerCase() === 'syn-option' ? element as SynOption : undefined);

  if (option instanceof HTMLElement) {
    return getOptionOrUndefined(option);
  }

  if (typeof option === 'string') {
    const template = html`${unsafeHTML(option)}`;
    const element = createElementFromTemplateResult(template);
    return getOptionOrUndefined(element);
  }

  if (Object.prototype.hasOwnProperty.call(option, '_$litType$')) {
    const element = createElementFromTemplateResult(option);
    return getOptionOrUndefined(element);
  }

  return undefined;
};
