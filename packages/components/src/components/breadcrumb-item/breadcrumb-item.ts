/* eslint-disable */
import SynBreadcrumbItem from './breadcrumb-item.component.js';

export * from './breadcrumb-item.component.js';
export default SynBreadcrumbItem;

SynBreadcrumbItem.define('syn-breadcrumb-item');

declare global {
  interface HTMLElementTagNameMap {
    'syn-breadcrumb-item': SynBreadcrumbItem;
  }
}
