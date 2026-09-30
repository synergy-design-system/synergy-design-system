import SynDatePicker from './date-picker.component.js';

export * from './date-picker.component.js';
export default SynDatePicker;

SynDatePicker.define('syn-date-picker');

declare global {
  interface HTMLElementTagNameMap {
    'syn-date-picker': SynDatePicker;
  }
}
