/* eslint-disable complexity */
import {
  type CSSResultGroup,
  type PropertyValues,
  html,
  nothing,
} from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, query } from 'lit/decorators.js';
import { defaultValue } from '../../internal/default-value.js';
import { FormControlController } from '../../internal/form.js';
import { watch } from '../../internal/watch.js';
import { waitForEvent } from '../../internal/event.js';
import { HasSlotController } from '../../internal/slot.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynCalendar from '../calendar/calendar.component.js';
import type { CalendarDateDisabledPredicate, CalendarSelectionMode, CalendarWeekday } from '../calendar/types.js';
import {
  fromNativeDate,
  getMonthNames,
  getRangeEndpointState,
  isDateDisabled,
  normalizeCalendarValue,
  parseCalendarSelectionMode,
  parseCalendarValue,
  parseDisabledDates,
  parseDisabledWeekdays,
  parseIsoDate,
  prepareCalendarConstraints,
  stopNestedFocusEvent,
  toIsoDate,
  toNativeDate,
  today,
} from '../calendar/utility/index.js';
import SynIcon from '../icon/icon.component.js';
import SynPopup from '../popup/popup.component.js';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './date-picker.styles.js';
import inputStyles from '../input/input.styles.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';
import {
  type DateField,
  type DateSegments,
  clampDay,
  emptySegments,
  getSegmentLayout,
  isoToSegments,
  parsePastedSelection,
  segmentBounds,
  segmentsToIso,
  typeDigit,
} from './utility/segments.js';

/**
 * @summary A date picker component for selecting dates.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-date-picker--docs
 * @status experimental
 * @since 0.0.0
 *
 * @dependency syn-calendar
 * @dependency syn-icon
 * @dependency syn-popup
 *
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - The input's help text. Alternatively, you can use the `help-text` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the date field.
 * @slot suffix - Used to append a presentational icon or similar element to the date field.
 * @slot expand-icon - The icon used by the calendar toggle button.
 * @slot day-YYYY-MM-DD - Forwarded to the calendar to replace a date's label.
 * @slot month-0 - Forwarded to the calendar to replace January's label; month-1 through month-11 replace the other months.
 * @slot year-YYYY - Forwarded to the calendar to replace a year's label.
 *
 * @event syn-before-change - Cancelable event before a user commit or Clear. The picker exposes the proposed value; preventing default restores the previous value. Pending range starts emit only syn-input.
 * @event syn-clear - Emitted when the calendar clears a non-empty selection.
 * @event syn-input - Emitted when the user edits a segment or selects a date.
 * @event syn-change - Emitted when an edit changes the canonical ISO value or a calendar selection is committed.
 * @event syn-focus - Emitted when focus enters the date picker.
 * @event syn-blur - Emitted when focus leaves the date picker.
 * @event syn-invalid - Emitted when constraint validation fails.
 * @event syn-show - Emitted when the calendar opens.
 * @event syn-after-show - Emitted after the calendar is visible and positioned.
 * @event syn-hide - Emitted when the calendar closes.
 * @event syn-after-hide - Emitted after the calendar is hidden.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart form-control-input - The input and popup wrapper.
 * @csspart base - The segmented field's wrapper.
 * @csspart input - The group containing editable date segments.
 * @csspart segment - An editable day, month, or year spinbutton.
 * @csspart segment-literal - A locale-specific separator between fields.
 * @csspart range-separator - The separator between start and end date groups.
 * @csspart remove-date-button - A multiple-selection date's remove button.
 * @csspart expand-button - The calendar toggle button.
 * @csspart calendar - The calendar component.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart expand-icon - The container that wraps the expand icon.
 * @csspart popup - The popup's exported container.
 */
@enableDefaultSettings('SynDatePicker')
export default class SynDatePicker extends SynergyElement {
  static styles: CSSResultGroup = [
    inputStyles,
    componentStyles,
    formControlStyles,
    styles,
  ];

  static dependencies = {
    'syn-calendar': SynCalendar,
    'syn-icon': SynIcon,
    'syn-popup': SynPopup,
  };

  private readonly hasSlotController = new HasSlotController(
    this,
    'help-text',
    'label',
    'prefix',
    'suffix',
  );

  private readonly localize = new LocalizeController(this);

  private readonly formControlController = new FormControlController(this, {
    assumeInteractionOn: ['syn-blur', 'syn-input'],
    setValue: (_control, value) => {
      this.value = typeof value === 'string' ? value : '';
      this.#syncSegments();
      this.requestUpdate();
    },
  });

  #groups: DateSegments[] = [emptySegments()];

  #activeGroup = 0;

  get #segments() {
    return this.#groups[this.#activeGroup];
  }

  set #segments(segments: DateSegments) {
    this.#groups[this.#activeGroup] = segments;
  }

  #activeField: DateField = 'month';

  #buffers = new Map<string, string>();

  #pendingSegmentValue?: string;

  #hasFocus = false;

  #customValidity = '';

  @query('.popup') popup: SynPopup;

  @query('syn-calendar') private calendar: SynCalendar;

  @query('.value-input') private valueInput: HTMLInputElement;

  /** The name of the input, submitted as a name/value pair with form data. */
  @property() name = '';

  /**
   * Whitespace-separated ISO dates: one date in single mode, two endpoints in range mode,
   * or distinct sorted dates in multiple mode. One range endpoint represents a pending selection.
   * Partial segment groups are retained for editing but excluded from this canonical value.
   */
  @property() value = '';

  /** The calendar selection mode; changing modes uses the calendar's normalization policy. */
  @property({
    converter: { fromAttribute: parseCalendarSelectionMode, toAttribute: (mode: CalendarSelectionMode) => mode },
    reflect: true,
  }) mode: CalendarSelectionMode = 'single';

  /** The default value of the form control. Primarily used for resetting the form control. */
  @defaultValue() defaultValue = '';

  /** The input's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
  * Indicates whether the calendar is open. Use this attribute or the `show()` and `hide()` methods.
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /** The input's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The input's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Disables the input. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /** Makes the input readonly. */
  @property({ reflect: true, type: Boolean }) readonly = false;

  /** Adds a clear button when the select is not empty. */
  @property({ type: Boolean }) clearable = false;

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** Makes the input a required field. */
  @property({ reflect: true, type: Boolean }) required = false;

  /** The earliest selectable date as an ISO YYYY-MM-DD string. */
  @property() min = '';

  /** The latest selectable date as an ISO YYYY-MM-DD string. */
  @property() max = '';

  /** Minimum inclusive length for user-created ranges; ignored outside range mode. */
  @property({ attribute: 'min-range', type: Number }) minRange?: number;

  /** Maximum inclusive length for user-created ranges; ignored outside range mode. */
  @property({ attribute: 'max-range', type: Number }) maxRange?: number;

  /** ISO dates that cannot be selected, using the calendar's attribute converter. */
  @property({
    attribute: 'disabled-dates',
    converter: {
      fromAttribute: parseDisabledDates,
      toAttribute: (dates: string[]) => dates.join(' '),
    },
  }) disabledDates: string[] = [];

  /** Disabled ISO weekday names, using the calendar's attribute converter. */
  @property({
    attribute: 'disabled-weekdays',
    converter: { fromAttribute: parseDisabledWeekdays, toAttribute: (days: CalendarWeekday[]) => days.join(' ') },
  }) disabledWeekdays: CalendarWeekday[] = [];

  /** An additional synchronous rule receiving a UTC date-only Date, shared with the calendar. */
  @property({ attribute: false }) isDateDisabled?: CalendarDateDisabledPredicate;

  /** Gets the constraint validation state. */
  get validity() {
    return this.valueInput.validity;
  }

  /** Gets the browser's constraint validation message. */
  get validationMessage() {
    return this.valueInput.validationMessage;
  }

  /** Gets the selected date as UTC midnight, or null for empty or invalid values. */
  get valueAsDate(): Date | null {
    if (this.mode !== 'single') {
      return null;
    }
    const date = parseIsoDate(this.value);
    return date ? toNativeDate(date) : null;
  }

  /** Gets selected dates as UTC date-only Date instances, using the calendar's conversions. */
  get valueAsDates(): Date[] {
    return this.#selectionValues().map(value => toNativeDate(parseIsoDate(value)!));
  }

  /** Sets selected UTC date-only Date instances without emitting user value events. */
  set valueAsDates(dates: readonly Date[] | null) {
    const values = dates?.map(fromNativeDate).map(toIsoDate).filter(Boolean) ?? [];
    this.value = normalizeCalendarValue(values, this.mode).join(' ');
  }

  connectedCallback() {
    super.connectedCallback();
    this.#slotObserver = new MutationObserver(() => this.#updateCalendarSlots());
    this.#slotObserver.observe(this, {
      attributeFilter: ['slot'], attributes: true, childList: true, subtree: true,
    });
    this.#updateCalendarSlots();
    if (this.hasUpdated && this.open) {
      this.#addOpenListeners();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#slotObserver?.disconnect();
    this.#removeOpenListeners();
  }

  firstUpdated() {
    [this.#activeField] = this.#fields();
    this.requestUpdate();
    if (this.open && !this.disabled && !this.readonly) {
      this.#addOpenListeners();
    }
  }

  updated(changed: PropertyValues) {
    super.updated(changed);
    this.#updateValidity();
  }

  @watch('value')
  handleValueChange() {
    const normalized = normalizeCalendarValue(parseCalendarValue(this.value), this.mode).join(' ');
    if (this.value !== normalized) {
      this.value = normalized;
    }
    if (this.value !== this.#pendingSegmentValue) {
      this.#syncSegments();
    }
    this.#pendingSegmentValue = undefined;
  }

  @watch('mode')
  handleModeChange(previousMode: CalendarSelectionMode) {
    this.value = normalizeCalendarValue(parseCalendarValue(this.value), this.mode, previousMode).join(' ');
    this.#pendingSegmentValue = undefined;
    this.#syncSegments();
  }

  @watch(['disabled', 'readonly'])
  handleInteractionStateChange() {
    if (this.disabled || this.readonly) {
      this.open = false;
      this.#buffers.clear();
    }
  }

  @watch('open')
  async handleOpenChange() {
    if (!this.hasUpdated) {
      return;
    }
    const opening = this.open && !this.disabled && !this.readonly;
    this.emit(opening ? 'syn-show' : 'syn-hide');
    if (opening) {
      this.#addOpenListeners();
    } else {
      this.#removeOpenListeners();
    }
    await this.updateComplete;
    await this.popup.updateComplete;
    if (opening !== this.open) {
      return;
    }
    if (opening) {
      this.popup.reposition();
    }
    this.emit(opening ? 'syn-after-show' : 'syn-after-hide');
  }

  /** Shows the calendar unless the date picker is disabled or readonly. */
  async show() {
    if (this.open || this.disabled || this.readonly) {
      return undefined;
    }
    await this.updateComplete;
    const shown = waitForEvent(this, 'syn-after-show');
    this.open = true;
    return shown;
  }

  /** Hides the calendar. */
  async hide() {
    if (!this.open) {
      return undefined;
    }
    await this.updateComplete;
    const hidden = waitForEvent(this, 'syn-after-hide');
    this.open = false;
    return hidden;
  }

  /** Focuses the first empty date segment, or the last active segment for a complete date. */
  focus(options?: FocusOptions) {
    const emptyGroup = this.#groups.findIndex(group => Object.values(group).some(value => value === null));
    if (emptyGroup >= 0) {
      this.#activeGroup = emptyGroup;
    }
    const field = this.#fields().find(candidate => this.#segments[candidate] === null) ?? this.#activeField;
    this.#focusField(field, options);
  }

  /** Removes focus from the date picker. */
  blur() {
    (this.shadowRoot?.activeElement as HTMLElement | null)?.blur();
  }

  /** Checks validity without showing a browser validation message. */
  checkValidity() {
    this.#updateValidity();
    return this.valueInput.checkValidity();
  }

  /** Shows the browser validation message when the date is invalid. */
  reportValidity() {
    this.#updateValidity();
    return this.valueInput.reportValidity();
  }

  /** Sets a custom validation message, or clears it with an empty string. */
  setCustomValidity(message: string) {
    this.#customValidity = message;
    this.#updateValidity();
  }

  /** Gets the associated form, if any. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  #fields() {
    return getSegmentLayout(this.localize.lang()).flatMap(token => (token.field ? [token.field] : []));
  }

  #selectionValues() {
    return normalizeCalendarValue(parseCalendarValue(this.value), this.mode);
  }

  #syncSegments() {
    const values = this.#selectionValues();
    this.#groups = values.map(isoToSegments);
    if (this.mode === 'range') {
      this.#groups = [isoToSegments(values[0] ?? ''), isoToSegments(values[1] ?? '')];
    } else if (this.mode === 'multiple' || this.#groups.length === 0) {
      this.#groups.push(emptySegments());
    }
    this.#activeGroup = Math.min(this.#activeGroup, this.#groups.length - 1);
    this.#buffers.clear();
  }

  #bufferKey(field: DateField, group = this.#activeGroup) {
    return `${group}:${field}`;
  }

  #getConstraints() {
    return prepareCalendarConstraints({
      disabledDates: this.disabledDates,
      disabledWeekdays: this.disabledWeekdays,
      isDateDisabled: this.isDateDisabled,
      max: parseIsoDate(this.max),
      min: parseIsoDate(this.min),
    });
  }

  #calendarSlots: string[] = [];

  #slotObserver?: MutationObserver;

  #updateCalendarSlots() {
    const pattern = /^(?:day-\d{4}-\d{2}-\d{2}|month-(?:[0-9]|1[01])|year--?\d+)$/;
    const names = [...new Set(Array.from(this.children)
      .map(child => child.getAttribute('slot') ?? '').filter(name => pattern.test(name)))].sort();
    if (names.join(' ') !== this.#calendarSlots.join(' ')) {
      this.#calendarSlots = names;
      this.requestUpdate();
    }
  }

  #requestUserValue(value: string, commit: boolean) {
    const previous = this.value;
    this.#pendingSegmentValue = value;
    this.value = value;
    if (commit && value !== previous) {
      const event = this.emit('syn-before-change', { cancelable: true });
      if (event.defaultPrevented || this.disabled || this.readonly) {
        this.value = previous;
        this.#pendingSegmentValue = undefined;
        this.#syncSegments();
        this.requestUpdate();
        return false;
      }
    }
    return true;
  }

  #focusField(field: DateField, options?: FocusOptions, group = this.#activeGroup) {
    if (this.disabled) {
      return;
    }
    this.#activeGroup = group;
    this.#activeField = field;
    this.requestUpdate();
    this.renderRoot.querySelector<HTMLElement>(`[data-group="${group}"][data-segment="${field}"]`)?.focus(options);
  }

  #moveField(field: DateField, offset: number) {
    const fields = this.#fields();
    const current = this.#activeGroup * fields.length + fields.indexOf(field);
    const next = current + offset;
    if (next >= 0 && next < this.#groups.length * fields.length) {
      this.#activeGroup = Math.floor(next / fields.length);
      this.#focusField(fields[next % fields.length]);
    }
  }

  #commitSegments() {
    const values = this.#groups.map(segmentsToIso);
    if (this.mode === 'range' && values[0] && values[1]) {
      const endpoint = getRangeEndpointState(
        parseIsoDate(values[0])!,
        parseIsoDate(values[1])!,
        { maxRange: this.maxRange, minRange: this.minRange },
        this.#getConstraints(),
      );
      if (endpoint.allowed) {
        values[1] = toIsoDate(endpoint.date);
        this.#groups[1] = isoToSegments(values[1]);
      } else {
        values[1] = '';
      }
    }
    const value = normalizeCalendarValue(values.filter(Boolean), this.mode).join(' ');
    const previous = this.value;
    const rangeComplete = this.mode !== 'range' || parseCalendarValue(value).length === 2 || !value;
    if (!this.#requestUserValue(value, rangeComplete)) {
      return;
    }
    if (this.mode === 'multiple' && segmentsToIso(this.#groups[this.#groups.length - 1])) {
      this.#groups.push(emptySegments());
    }
    this.requestUpdate();
    this.#updateValidity();
    this.emit('syn-input');
    if (value !== previous && rangeComplete) {
      this.emit('syn-change');
    }
  }

  #removeDate(group: number) {
    if (this.mode !== 'multiple' || this.disabled || this.readonly) {
      return;
    }
    this.#groups.splice(group, 1);
    this.#activeGroup = Math.min(this.#activeGroup, this.#groups.length - 1);
    this.#buffers.clear();
    this.#commitSegments();
    this.#focusField(this.#activeField);
  }

  #updateValidity() {
    if (!this.valueInput) {
      return;
    }
    this.valueInput.value = this.value;
    const message = this.disabled || this.readonly ? '' : this.#getValidationMessage();
    this.valueInput.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  #getValidationMessage() {
    if (this.#customValidity) {
      return this.#customValidity;
    }
    const values = this.#selectionValues();
    const partial = this.#groups.some(group => Object.values(group).some(value => value !== null) && !segmentsToIso(group));
    if (partial || (this.value.trim() && values.length === 0)) {
      return 'Enter a complete, valid date.';
    }
    if (this.mode === 'range' && values.length === 1) {
      return 'Enter both range endpoints.';
    }
    if (this.mode === 'range' && this.#groups.every(group => !!segmentsToIso(group)) && values.length !== 2) {
      return 'Choose an available range.';
    }
    const constraints = this.#getConstraints();
    return values.some(value => isDateDisabled(parseIsoDate(value)!, constraints)) ? 'Choose an available date.' : '';
  }

  #handleSegmentFocus(event: FocusEvent) {
    const { group, segment } = (event.currentTarget as HTMLElement).dataset;
    this.#activeGroup = Number(group);
    this.#activeField = segment as DateField;
    this.requestUpdate();
  }

  #handleSegmentBlur(event: FocusEvent) {
    const { group, segment } = (event.currentTarget as HTMLElement).dataset;
    this.#buffers.delete(this.#bufferKey(segment as DateField, Number(group)));
    this.requestUpdate();
  }

  async #focusCalendar() {
    if (this.disabled || this.readonly) {
      return;
    }
    await this.show();
    await this.calendar.updateComplete;
    this.calendar.focus({ preventScroll: true });
  }

  async #handleSegmentKeyDown(event: KeyboardEvent) {
    const field = (event.currentTarget as HTMLElement).dataset.segment as DateField;
    if (this.disabled) {
      return;
    }
    if (event.altKey && event.key === 'ArrowDown') {
      event.preventDefault();
      await this.#focusCalendar();
      return;
    }
    if (event.altKey && event.key === 'ArrowUp') {
      event.preventDefault();
      await this.hide();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    if (this.#handleSegmentNavigation(event, field)) {
      return;
    }
    if (!this.readonly) {
      this.#handleSegmentEditing(event, field);
    }
  }

  #handleSegmentNavigation(event: KeyboardEvent, field: DateField) {
    if (event.key === 'Tab') {
      this.#buffers.delete(this.#bufferKey(field));
      this.requestUpdate();
      return true;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      this.#moveField(field, this.localize.dir() === 'rtl' ? -direction : direction);
      return true;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      this.#buffers.clear();
      this.open = false;
      this.requestUpdate();
      return true;
    }
    return false;
  }

  #handleSegmentEditing(event: KeyboardEvent, field: DateField) {
    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      const key = this.#bufferKey(field);
      const result = typeDigit(field, this.#buffers.get(key) ?? '', event.key, this.#segments);
      this.#buffers.set(key, result.buffer);
      this.#segments = clampDay({ ...this.#segments, [field]: result.value });
      this.#commitSegments();
      if (result.advance) {
        this.#buffers.delete(key);
        this.#moveField(field, 1);
      }
      return;
    }
    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      this.#stepSegment(field, event.key);
      return;
    }
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      this.#buffers.delete(this.#bufferKey(field));
      this.#segments = { ...this.#segments, [field]: null };
      this.#commitSegments();
      return;
    }
    const separators = getSegmentLayout(this.localize.lang()).filter(token => !token.field);
    if (['/', '-', '.', ' '].includes(event.key) || separators.some(token => token.text.includes(event.key))) {
      event.preventDefault();
      this.#buffers.delete(this.#bufferKey(field));
      this.#moveField(field, 1);
    }
  }

  #stepSegment(field: DateField, key: string) {
    this.#buffers.clear();
    const { max, min } = segmentBounds(field, this.#segments);
    const current = this.#segments[field];
    let value = current ?? today()[field];
    if (key === 'Home' || key === 'End') {
      value = key === 'Home' ? min : max;
    } else if (current !== null) {
      value += key === 'ArrowUp' ? 1 : -1;
    }
    const length = max - min + 1;
    value = ((((value - min) % length) + length) % length) + min;
    this.#segments = clampDay({ ...this.#segments, [field]: value });
    this.#commitSegments();
  }

  #handleSegmentPaste(event: ClipboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }
    event.preventDefault();
    const groups = parsePastedSelection(event.clipboardData?.getData('text') ?? '', this.localize.lang(), this.mode);
    if (groups) {
      if (groups.length === 1) {
        [this.#segments] = groups;
      } else if (this.mode === 'range') {
        this.#groups = groups;
      } else {
        this.#groups.splice(this.#activeGroup, 1, ...groups);
      }
      this.#buffers.clear();
      this.#commitSegments();
    }
  }

  #handleAnchorPointerDown(event: PointerEvent) {
    if (this.disabled) {
      return;
    }

    const path = event.composedPath();
    const isButton = path.some(node => node instanceof Element
      && node.matches('button, a, [role="button"]'));

    if (isButton) {
      return;
    }

    event.preventDefault();

    const segmentEl = path.find((node): node is HTMLElement => node instanceof HTMLElement
      && node.hasAttribute('data-segment'));

    if (segmentEl) {
      const { group, segment } = segmentEl.dataset;
      if (group !== undefined && segment !== undefined) {
        this.#focusField(segment as DateField, { preventScroll: true }, Number(group));
      }
    } else {
      this.focus({ preventScroll: true });
    }

    if (!this.readonly && !this.open) {
      this.open = true;
    }
  }

  async #handleToggle() {
    if (this.open) {
      await this.hide();
    } else {
      await this.#focusCalendar();
    }
  }

  #handleCalendarInput(event: Event) {
    event.stopPropagation();
    this.value = normalizeCalendarValue(this.calendar.value, this.mode).join(' ');
    this.#pendingSegmentValue = undefined;
    this.#syncSegments();
    this.#updateValidity();
    this.emit('syn-input');
  }

  #handleCalendarBeforeChange(event: Event) {
    event.stopPropagation();
    const candidate = normalizeCalendarValue(this.calendar.value, this.mode).join(' ');
    const previous = this.value;
    if (!this.#requestUserValue(candidate, true)) {
      event.preventDefault();
    } else {
      this.value = previous;
      this.#pendingSegmentValue = undefined;
    }
  }

  #handleCalendarClear(event: Event) {
    event.stopPropagation();
    this.emit('syn-clear');
  }

  async #handleCalendarChange(event: Event) {
    event.stopPropagation();
    this.emit('syn-change');
    const values = this.#selectionValues();
    const complete = this.mode === 'single' ? values.length === 1 : this.mode === 'range' && values.length === 2;
    if (complete) {
      await this.hide();
      this.#focusField(this.#activeField);
    }
  }

  #handleInvalid(event: Event) {
    this.formControlController.emitInvalidEvent(event);
  }

  #handleFocusIn() {
    if (!this.#hasFocus) {
      this.#hasFocus = true;
      this.requestUpdate();
      this.emit('syn-focus');
    }
  }

  #handleFocusOut() {
    queueMicrotask(() => {
      if (!this.matches(':focus-within')) {
        this.#hasFocus = false;
        this.requestUpdate();
        this.emit('syn-blur');
      }
    });
  }

  #handleDocumentPointerDown = (event: Event) => {
    if (!event.composedPath().includes(this)) {
      this.open = false;
    }
  };

  #handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !event.defaultPrevented && event.composedPath().includes(this)) {
      event.preventDefault();
      event.stopPropagation();
      this.open = false;
      this.#focusField(this.#activeField);
    }
  };

  #handleClearClick() {
    this.value = '';
    this.emit('syn-clear');
  }

  // eslint-disable-next-line class-methods-use-this
  #handleClearMouseDown(event: MouseEvent) {
    // Don't lose focus or propagate events when clicking the clear button
    event.stopPropagation();
    event.preventDefault();
  }

  #addOpenListeners() {
    this.ownerDocument.addEventListener('pointerdown', this.#handleDocumentPointerDown);
    this.ownerDocument.addEventListener('focusin', this.#handleDocumentPointerDown);
    this.ownerDocument.addEventListener('keydown', this.#handleDocumentKeyDown);
  }

  #removeOpenListeners() {
    this.ownerDocument.removeEventListener('pointerdown', this.#handleDocumentPointerDown);
    this.ownerDocument.removeEventListener('focusin', this.#handleDocumentPointerDown);
    this.ownerDocument.removeEventListener('keydown', this.#handleDocumentKeyDown);
  }

  #renderSegment(field: DateField, group: number) {
    const segments = this.#groups[group];
    const value = segments[field];
    const buffer = this.#buffers.get(this.#bufferKey(field, group));
    const placeholder = field === 'year' ? 'yyyy' : `${field[0]}${field[0]}`;
    const { max, min } = segmentBounds(field, segments);
    const label = new Intl.DisplayNames(this.localize.lang(), { type: 'dateTimeField' }).of(field);
    const groupLabel = this.mode === 'range' ? ['Start date', 'End date'][group] : `Date ${group + 1}`;
    let valueText = value === null ? placeholder : String(value);
    if (field === 'month' && value !== null) {
      valueText = getMonthNames(this.localize.lang())[value - 1];
    }
    const display = value === null ? placeholder : String(value).padStart(field === 'year' ? 4 : 2, '0');
    return html`
      <span
        class=${classMap({ segment: true, 'segment--empty': value === null, 'segment--year': field === 'year' })}
        data-segment=${field}
        data-group=${group}
        part="segment"
        role="spinbutton"
        tabindex=${!this.disabled && group === this.#activeGroup && field === this.#activeField ? 0 : -1}
        aria-label=${this.mode === 'single' ? label ?? field : `${groupLabel} ${label ?? field}`}
        aria-valuemin=${min}
        aria-valuemax=${max}
        aria-valuenow=${ifDefined(value ?? undefined)}
        aria-valuetext=${buffer ?? valueText}
        aria-disabled=${this.disabled}
        aria-readonly=${this.readonly}
        aria-required=${this.required}
        aria-describedby="help-text"
        inputmode="numeric"
        @keydown=${this.#handleSegmentKeyDown}
        @focus=${this.#handleSegmentFocus}
        @blur=${this.#handleSegmentBlur}
        @paste=${this.#handleSegmentPaste}
      >${buffer ?? display}</span>
    `;
  }

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasPrefixSlot = this.hasSlotController.test('prefix');
    const hasSuffixSlot = this.hasSlotController.test('suffix');

    const hasLabel = Boolean(this.label || hasLabelSlot);
    const hasHelpText = Boolean(this.helpText || hasHelpTextSlot);
    const hasClearIcon = this.clearable && (!this.disabled && !this.readonly) && !!this.value;

    return html`
      <div
        class=${classMap({
          'form-control': true,
          'form-control--has-help-text': hasHelpText,
          'form-control--has-label': hasLabel,
          'form-control--has-prefix': hasPrefixSlot,
          'form-control--has-suffix': hasSuffixSlot,
          'form-control--large': this.size === 'large',
          'form-control--medium': this.size === 'medium',
          'form-control--small': this.size === 'small',
        })}
        part="form-control"
        @focusin=${this.#handleFocusIn}
        @focusout=${this.#handleFocusOut}
      >
        <label
          aria-hidden=${hasLabel ? 'false' : 'true'}
          class="form-control__label"
          for="input"
          id="label"
          part="form-control-label"
          @click=${() => this.focus()}
        >
          <slot name="label">${this.label}</slot>
        </label>
        <!-- /.form-control__label -->

        <div part="form-control-input" class="form-control-input">
          <syn-popup
            class="popup"
            exportparts="popup"
            placement="bottom-start"
            ?active=${this.open && !this.disabled && !this.readonly}
            flip
            shift
          >
            <div
              class=${classMap({
                input: true,
                'input--disabled': this.disabled,
                'input--empty': !this.value,
                'input--focused': this.#hasFocus,
                'input--large': this.size === 'large',
                'input--medium': this.size === 'medium',
                'input--multiple-dates': this.mode !== 'single',
                'input--readonly': this.readonly,
                'input--small': this.size === 'small',
                'input--standard': !this.readonly,
              })}
              part="base"
              slot="anchor"
              @pointerdown=${this.#handleAnchorPointerDown}
            >
              <span class="input__prefix" part="prefix">
                <slot name="prefix"></slot>
              </span>

              <div
                aria-labelledby=${hasLabel ? 'label' : nothing}
                aria-label=${hasLabel ? nothing : 'Date'}
                class="input__control segments"
                part="input"
                role="group"
              >
                ${this.#groups.map((segments, group) => html`
                  ${this.mode === 'range' && group === 1
                    ? html`<span class="segment-literal" part="range-separator" aria-hidden="true"> - </span>` : nothing}
                  <span class="date-entry">
                    ${getSegmentLayout(this.localize.lang()).map(token => (token.field
                      ? this.#renderSegment(token.field, group)
                      : html`<span class="segment-literal" part="segment-literal" aria-hidden="true">${token.text}</span>`))}
                    ${this.mode === 'multiple' && segmentsToIso(segments) ? html`
                      <button
                        class="remove-date"
                        part="remove-date-button"
                        type="button"
                        aria-label=${`${this.localize.term('clearEntry')} ${segmentsToIso(segments)}`}
                        ?disabled=${this.disabled || this.readonly}
                        @click=${() => this.#removeDate(group)}
                      ><syn-icon library="system" name="x-circle-fill"></syn-icon></button>
                    ` : nothing}
                  </span>
                `)}
              </div>
              <input
                class="value-input"
                type="text"
                tabindex="-1"
                aria-hidden="true"
                .value=${this.value}
                ?disabled=${this.disabled || this.readonly}
                ?readonly=${this.readonly}
                ?required=${this.required}
                @focus=${() => this.focus()}
                @invalid=${this.#handleInvalid}
              />

              <span class="input__suffix" part="suffix">
                <slot name="suffix"></slot>
              </span>

              ${hasClearIcon
                ? html`
                    <button
                      aria-label=${this.localize.term('clearEntry')}
                      class="select__clear"
                      @click=${this.#handleClearClick}
                      @mousedown=${this.#handleClearMouseDown}
                      part="clear-button"
                      tabindex="-1"
                      type="button"
                    >
                      <slot name="clear-icon">
                        <syn-icon name="x-circle-fill" library="system"></syn-icon>
                      </slot>
                    </button>
                  `
                : ''}

              <button
                class="date-picker__expand-button"
                part="expand-button"
                type="button"
                aria-label=${this.localize.term(this.open ? 'closeMenu' : 'openMenu')}
                aria-haspopup="dialog"
                aria-expanded=${this.open}
                aria-controls="calendar"
                @click=${this.#handleToggle}
                tabindex="-1"
                ?disabled=${this.disabled || this.readonly}
              >
                <slot class="date-picker__expand-icon" name="expand-icon" part="expand-icon">
                  <syn-icon library="system" name="calendar-month"></syn-icon>
                </slot>
              </button>
            </div>
            <!-- /.input -->

            <div id="calendar" role="dialog" aria-label=${this.label || 'Date'}>
              <syn-calendar
                part="calendar"
                exportparts=${[
                  'base', 'header', 'content', 'footer', 'day-grid', 'day-cell', 'weekdays', 'weekday',
                  'month-grid', 'year-grid', 'calendar-item', 'calendar-item-label', 'calendar-item-day',
                  'calendar-item-month', 'calendar-item-year', 'calendar-item-active', 'calendar-item-today',
                  'calendar-item-outside', 'calendar-item-disabled', 'calendar-item-range-begin',
                  'calendar-item-range-clipped', 'calendar-item-range-start', 'calendar-item-range-end',
                  'calendar-item-range-interior', 'calendar-item-range-pending', 'calendar-item-range-preview',
                  'calendar-item-range-unavailable', 'month-navigation', 'year-navigation', 'previous-button',
                  'previous-button__base', 'navigation-label', 'navigation-label__base', 'next-button',
                  'next-button__base', 'current-period-button', 'current-period-button__base', 'clear-button',
                  'clear-button__base',
                ].map(part => `${part}:calendar__${part}`).join(',')}
                .mode=${this.mode}
                .value=${this.#selectionValues()}
                .minRange=${this.minRange}
                .maxRange=${this.maxRange}
                .disabledDates=${this.disabledDates}
                .disabledWeekdays=${this.disabledWeekdays}
                .isDateDisabled=${this.isDateDisabled}
                min=${this.min}
                max=${this.max}
                size=${this.size}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                @syn-before-change=${this.#handleCalendarBeforeChange}
                @syn-input=${this.#handleCalendarInput}
                @syn-change=${this.#handleCalendarChange}
                @syn-clear=${this.#handleCalendarClear}
                @syn-focus=${stopNestedFocusEvent}
                @syn-blur=${stopNestedFocusEvent}
              >${this.#calendarSlots.map(name => html`<slot name=${name} slot=${name}></slot>`)}</syn-calendar>
            </div>
          </syn-popup>
        </div>
        <!-- /.form-control-input -->

        <div
          aria-hidden=${hasHelpText ? 'false' : 'true'}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
        <!-- /.form-control-help-text -->

      </div>
    `;
  }
}
