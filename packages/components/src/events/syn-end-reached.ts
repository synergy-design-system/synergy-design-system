/**
 * Synergy custom event
 */
export type SynEndReachedEvent = CustomEvent<Record<PropertyKey, never>>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-end-reached': SynEndReachedEvent;
  }
}
