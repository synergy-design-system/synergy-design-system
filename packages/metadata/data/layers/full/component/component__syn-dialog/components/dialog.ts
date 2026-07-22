/* eslint-disable */
import SynDialog from './dialog.component.js';

export * from './dialog.component.js';
export default SynDialog;

SynDialog.define('syn-dialog');

declare global {
  interface HTMLElementTagNameMap {
    'syn-dialog': SynDialog;
  }
}
