export type SynPaginationPageChangedEvent = CustomEvent<{
  currentPage: number;
  previousPage: number;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-pagination-page-changed': SynPaginationPageChangedEvent;
  }
}
