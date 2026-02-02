/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-change': SynChangeEvent;
  }
}
