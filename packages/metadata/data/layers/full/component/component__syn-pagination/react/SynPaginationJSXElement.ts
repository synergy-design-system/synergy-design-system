export type SynPaginationJSXElement = SynCustomElement<
  SynPagination,
  [
    ['syn-pagination-page-changed', SynPaginationPageChangedEvent],
    ['syn-pagination-page-size-changed', SynPaginationPageSizeChangedEvent],
  ]
>;