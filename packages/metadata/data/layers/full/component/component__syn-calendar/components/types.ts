/** Synchronous custom rule; receives a UTC date-only Date and returns true to disable it. */
export type CalendarDateDisabledPredicate = (date: Date) => boolean;

/** Determines whether values represent one date, range endpoints, or independent dates. */
export type CalendarSelectionMode = 'single' | 'range' | 'multiple';

/** Size forwarded from the calendar to its navigation and footer controls. */
export type CalendarSize = 'small' | 'medium' | 'large';

/** Public weekday names accepted by the disabled-weekdays attribute and property. */
export type CalendarWeekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
