/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynFocusEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-focus': SynFocusEvent;
  }
}
