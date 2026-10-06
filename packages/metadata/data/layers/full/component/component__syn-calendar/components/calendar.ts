import SynCalendar from './calendar.component.js';

export * from './calendar.component.js';
export default SynCalendar;

SynCalendar.define('syn-calendar');

declare global {
  interface HTMLElementTagNameMap {
    'syn-calendar': SynCalendar;
  }
}
