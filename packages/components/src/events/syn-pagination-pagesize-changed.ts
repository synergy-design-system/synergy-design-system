export type SynPaginationPageSizeChangedEvent = CustomEvent<{
  currentPageSize: number;
  previousPageSize: number;
}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'syn-pagination-page-size-changed': SynPaginationPageSizeChangedEvent;
  }
}
