/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynInitialFocusEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-initial-focus': SynInitialFocusEvent;
  }
}
