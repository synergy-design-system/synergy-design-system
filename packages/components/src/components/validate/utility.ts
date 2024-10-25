import SynergyElement from '../../internal/synergy-element.js';

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
  .map(s => s.trim())
  .filter(Boolean);

/**
 * Get the event name for the provided element
 * @param element The element to get the event name for
 * @param eventName The event name to get
 */
export const getEventNameForElement = (element: HTMLElement, eventName: string) => {
  const sanitizedEventName = eventName.trim();
  return element instanceof SynergyElement
    ? `syn-${sanitizedEventName.replace('syn-', '')}`
    : sanitizedEventName;
};
