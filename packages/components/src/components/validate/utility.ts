import type { ComplexAttributeConverter } from 'lit';

/**
 * Check if two string arrays differ
 * @param a The first array
 * @param b The second array
 * @returns True if the arrays differ, false otherwise
 */
export const arraysDiffer = (a: readonly string[], b: readonly string[]): boolean => {
  if (a.length !== b.length) return true;

  // As the sort order is not guaranteed, we need to sort the arrays before comparing
  const sortedA = a.slice().sort();
  const sortedB = b.slice().sort();
  for (let i = 0; i < sortedA.length; i += 1) {
    if (sortedA[i] !== sortedB[i]) return true;
  }
  return false;
};

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
 * Get a list of event names from the provided attribute string
 * @param events The events string
 * @returns an array of events
 */
export const normalizeEventAttribute = (events: string = '') => events
  .split(' ')
  .map(s => s.trim());

/**
 * Custom attribute converter for the "on" property
 */
export const onConverter = (): ComplexAttributeConverter<string> => ({
  fromAttribute: (on: string) => on,
  toAttribute: (on: string) => normalizeEventAttribute(on),
});
