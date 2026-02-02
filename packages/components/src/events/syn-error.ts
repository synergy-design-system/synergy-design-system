/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynErrorEvent = CustomEvent<{ status?: number }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-error': SynErrorEvent;
  }
}
