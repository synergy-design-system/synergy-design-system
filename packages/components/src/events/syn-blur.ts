/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynBlurEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-blur': SynBlurEvent;
  }
}
