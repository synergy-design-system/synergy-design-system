import SynergyElement from '../../internal/synergy-element.js';
import type SynInput from '../input/input.component.js';

/**
 * @var WhitelistedSynergyFormEventNames A list of all the event names that should be transformed
 * This is needed to allow the automatic transformation of events to synergy events,
 * but only for those synergy needs (e.g. we do not want to transform click to syn-click).
 */
const WhitelistedSynergyFormEventNames = [
  'blur',
  'change',
  'clear',
  'focus',
  'invalid',
  'input',
  'move',
];

/**
 * Low level interface to check for event type
 * @param eventName The event name to check
 * @param type The type to check
 * @returns True if the event name is of the provided type, false otherwise
 */
const isEventOfType = (eventName: string, type: string) => eventName.includes(type);

/**
 * Check if the provided event name is a blur event
 * @param eventName The event name to check
 */
export const isBlurEvent = (eventName: string) => isEventOfType(eventName, 'blur');

/**
 * Check if the provided event name is a change event
 * @param eventName The event name to check
 */
export const isChangeEvent = (eventName: string) => isEventOfType(eventName, 'change');

/**
 * Check if the provided event is an invalid event
 * @param eventName The event name to check
 */
export const isInvalidEvent = (eventName: string) => isEventOfType(eventName, 'invalid');

/**
 * Check if the provided element is a synergy element
 * @param element The element to check for
 * @returns True if the element is a synergy element, false otherwise
 */
export const isSynergyElement = (element?: HTMLElement) => element instanceof SynergyElement;

/**
 * Get a list of event names from the provided attribute string
 * @param events The events string
 * @returns an array of events
 */
export const normalizeEventAttribute = (events: string = '') => events
  .split(' ')
  .map(s => s.trim())
  .filter(Boolean);

/**
 * Get the event name for the provided element
 * @param element The element to get the event name for
 * @param eventName The event name to get
 */
export const getEventNameForElement = (element: HTMLElement, eventName: string) => {
  const sanitizedEventName = eventName.trim();
  const elementIsSynergyElement = isSynergyElement(element);

  if (!elementIsSynergyElement) {
    return sanitizedEventName;
  }

  return WhitelistedSynergyFormEventNames.includes(sanitizedEventName)
    ? `syn-${sanitizedEventName}`
    : sanitizedEventName;
};

/**
 * Check the size that the alert should use based on the provided element
 * @param element The html element to check for
 * @returns The size that the alert should use
 */
export const alertSizeForInput = (element?: HTMLElement) => {
  // Don´t set alert size if we are not dealing with a synergy element
  if (!isSynergyElement(element)) {
    return undefined;
  }

  const { size } = element as SynInput;
  const hasSize = size !== undefined && size !== null;
  return hasSize ? size : undefined;
};

/**
 * Mapping of Synergy element tag names to their internal input selectors
 */
const ELEMENT_SELECTORS = {
  'syn-checkbox': 'input',
  'syn-combobox': '.combobox__value-input',
  'syn-file': 'input',
  'syn-input': 'input',
  'syn-radio-group': 'input',

  // Range could also use the first thumb, but unfortunately this collides with the already present tooltip
  'syn-range': '.input__control',

  'syn-select': '.select__value-input',
  'syn-switch': 'input',
  'syn-textarea': '.textarea__control',
} as const;

/**
 * Helper function to query an element's shadow DOM for an input
 */
const queryInputInShadowRoot = (
  element: HTMLElement,
  selector: string,
): HTMLInputElement | null => element
  .shadowRoot
  ?.querySelector<HTMLInputElement>(selector) ?? null;

/**
 * Retrieve the actual input element from the provided element, if it exists.
 * @param element The element to get the actual input for
 * @returns The html input element
 */
export const getActualInputElement = (element: HTMLInputElement | undefined): HTMLInputElement | undefined => {
  // If there is no input, skip before doing any harm
  if (!element) {
    return undefined;
  }

  const tagName = element.tagName.toLowerCase() as keyof typeof ELEMENT_SELECTORS;

  // Check if it's a known Synergy element
  const selector = ELEMENT_SELECTORS[tagName];
  if (selector) {
    const actualInput = queryInputInShadowRoot(element, selector);
    if (actualInput) return actualInput;
  }

  // Fallback: try common input selectors in shadow DOM (for any custom element)
  const fallbackInput = queryInputInShadowRoot(element, 'input,select,textarea');
  if (fallbackInput) return fallbackInput;

  // For elements without shadow DOM or no inputs found, return the element itself
  return element;
};
