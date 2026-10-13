import DatePicker from './date-picker.component.js';

export * from './date-picker.component.js';
export default DatePicker;

DatePicker.define('syn-date-picker');

declare global {
  interface HTMLElementTagNameMap {
    'syn-date-picker': DatePicker;
  }
}
