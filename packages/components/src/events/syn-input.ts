/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynInputEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-input': SynInputEvent;
  }
}
