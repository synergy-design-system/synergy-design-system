/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynTabHideEvent = CustomEvent<{ name: string }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-tab-hide': SynTabHideEvent;
  }
}
