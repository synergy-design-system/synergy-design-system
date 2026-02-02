/* eslint-disable */
/**
 * Synergy custom event
 */
export type SynResizeEvent = CustomEvent<{ entries: ResizeObserverEntry[] }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-resize': SynResizeEvent;
  }
}
