/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynRepositionEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-reposition': SynRepositionEvent;
  }
}
