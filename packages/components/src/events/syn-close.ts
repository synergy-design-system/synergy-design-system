/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynCloseEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-close': SynCloseEvent;
  }
}
