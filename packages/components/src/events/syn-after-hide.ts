/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynAfterHideEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-after-hide': SynAfterHideEvent;
  }
}
