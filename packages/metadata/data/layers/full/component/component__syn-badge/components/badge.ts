/* eslint-disable */
import SynBadge from './badge.component.js';

export * from './badge.component.js';
export default SynBadge;

SynBadge.define('syn-badge');

declare global {
  interface HTMLElementTagNameMap {
    'syn-badge': SynBadge;
  }
}
