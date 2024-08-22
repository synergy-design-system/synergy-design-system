import SynCombobox from './combobox.component.js';

export * from './combobox.component.js';
export default SynCombobox;

SynCombobox.define('syn-autocomplete');

declare global {
  interface HTMLElementTagNameMap {
    'syn-combobox': SynCombobox;
  }
}
