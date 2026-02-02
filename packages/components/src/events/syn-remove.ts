/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynRemoveEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-remove': SynRemoveEvent;
  }
}
