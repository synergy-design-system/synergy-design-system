/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynAfterShowEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-after-show': SynAfterShowEvent;
  }
}
