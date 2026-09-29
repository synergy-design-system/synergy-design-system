/**
 * Synergy custom event
 */
export type SynLoadMoreEvent = CustomEvent<{
  /** The current query string typed into the control, if applicable. */
  query?: string;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-load-more': SynLoadMoreEvent;
  }
}
