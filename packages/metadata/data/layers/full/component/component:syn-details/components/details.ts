/* eslint-disable */
import SynDetails from './details.component.js';

export * from './details.component.js';
export default SynDetails;

SynDetails.define('syn-details');

declare global {
  interface HTMLElementTagNameMap {
    'syn-details': SynDetails;
  }
}
