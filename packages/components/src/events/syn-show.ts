/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynShowEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-show': SynShowEvent;
  }
}
