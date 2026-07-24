/* eslint-disable */
import SynProgressBar from './progress-bar.component.js';

export * from './progress-bar.component.js';
export default SynProgressBar;

SynProgressBar.define('syn-progress-bar');

declare global {
  interface HTMLElementTagNameMap {
    'syn-progress-bar': SynProgressBar;
  }
}
