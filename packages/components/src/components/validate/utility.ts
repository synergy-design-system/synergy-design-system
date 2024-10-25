import SynergyElement from '../../internal/synergy-element.js';

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
  const isSynergyElement = element instanceof SynergyElement;

  if (!isSynergyElement) {
    return sanitizedEventName;
  }

  return WhitelistedSynergyFormEventNames.includes(sanitizedEventName)
    ? `syn-${sanitizedEventName}`
    : sanitizedEventName;
};
