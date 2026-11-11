/**
 * Synergy custom event
 */
export type SynBeforeChangeEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-before-change': SynBeforeChangeEvent;
  }
}
