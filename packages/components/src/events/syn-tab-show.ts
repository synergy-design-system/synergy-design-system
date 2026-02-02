/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynTabShowEvent = CustomEvent<{ name: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-tab-show': SynTabShowEvent;
  }
}
