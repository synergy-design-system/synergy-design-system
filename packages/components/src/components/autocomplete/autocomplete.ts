import SynAutocomplete from './autocomplete.component.js';

export * from './autocomplete.component.js';
export default SynAutocomplete;

SynAutocomplete.define('syn-autocomplete');

declare global {
  interface HTMLElementTagNameMap {
    'syn-autocomplete': SynAutocomplete;
  }
}
