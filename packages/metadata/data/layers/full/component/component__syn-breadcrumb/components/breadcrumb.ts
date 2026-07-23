/* eslint-disable */
import SynBreadcrumb from './breadcrumb.component.js';

export * from './breadcrumb.component.js';
export default SynBreadcrumb;

SynBreadcrumb.define('syn-breadcrumb');

declare global {
  interface HTMLElementTagNameMap {
    'syn-breadcrumb': SynBreadcrumb;
  }
}
