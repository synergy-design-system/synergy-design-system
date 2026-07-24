import SynPagination from './pagination.component.js';

export * from './pagination.component.js';
export default SynPagination;

SynPagination.define('syn-pagination');

declare global {
  interface HTMLElementTagNameMap {
    'syn-pagination': SynPagination;
  }
}
