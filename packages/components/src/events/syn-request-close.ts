/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynRequestCloseEvent = CustomEvent<{ source: 'close-button' | 'keyboard' | 'overlay' }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-request-close': SynRequestCloseEvent;
  }
}
