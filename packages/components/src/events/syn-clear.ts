/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynClearEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-clear': SynClearEvent;
  }
}
