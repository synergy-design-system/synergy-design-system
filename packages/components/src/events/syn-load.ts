/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynLoadEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-load': SynLoadEvent;
  }
}
