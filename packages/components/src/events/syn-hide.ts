/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynHideEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-hide': SynHideEvent;
  }
}
