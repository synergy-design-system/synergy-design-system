/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynInvalidEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-invalid': SynInvalidEvent;
  }
}
