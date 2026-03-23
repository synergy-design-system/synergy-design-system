/* eslint-disable */
import SynOptGroup from './optgroup.component.js';

export * from './optgroup.component.js';
export default SynOptGroup;

SynOptGroup.define('syn-optgroup');

declare global {
  interface HTMLElementTagNameMap {
    'syn-optgroup': SynOptGroup;
  }
}
