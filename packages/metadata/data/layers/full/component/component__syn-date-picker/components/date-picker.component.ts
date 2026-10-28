/* eslint-disable complexity */
import {
  type CSSResultGroup,
  type PropertyValues,
  html,
  nothing,
} from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { property, query } from 'lit/decorators.js';
import { defaultValue } from '../../internal/default-value.js';
import { FormControlController } from '../../internal/form.js';
import { watch } from '../../internal/watch.js';
import { HasSlotController } from '../../internal/slot.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import SynergyElement, { type SynergyFormControl } from '../../internal/synergy-element.js';
import SynCalendar from '../calendar/calendar.component.js';
import type { CalendarDateDisabledPredicate, CalendarSelectionMode, CalendarWeekday } from '../calendar/types.js';
import {
  CalendarLocalizeController,
  fromNativeDate,
  getMonthNames,
  isDateDisabled,
  isRangeLengthAllowed,
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
import styles from './date-picker.styles.js';
import inputStyles from '../input/input.styles.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';
import {
  type DateField,
  type DateInputGroup,
  type DateSegments,
  clampDay,
  emptySegments,
  getDateFieldName,
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
 * @slot clear-icon - The icon used by the clearable field's Clear button.
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
 * @csspart clear-button - The field's Clear button when clearable and a selection or draft is present.
 * @csspart calendar - The calendar component.
 * @csspart calendar__base - The calendar's base wrapper.
 * @csspart calendar__header - The calendar header.
 * @csspart calendar__content - The calendar view content.
 * @csspart calendar__footer - The calendar footer actions.
 * @csspart calendar__day-grid - The day-of-month table.
 * @csspart calendar__day-cell - A day table cell, independent of its button.
 * @csspart calendar__weekdays - The weekday table heading group.
 * @csspart calendar__weekday - An individual localized weekday heading.
 * @csspart calendar__month-grid - The month selection grid.
 * @csspart calendar__year-grid - The year selection grid.
 * @csspart calendar__calendar-item - A day, month, or year button.
 * @csspart calendar__calendar-item-label - An item's custom content slot or fallback label.
 * @csspart calendar__calendar-item-day - A day button.
 * @csspart calendar__calendar-item-month - A month button.
 * @csspart calendar__calendar-item-year - A year button.
 * @csspart calendar__calendar-item-active - An active calendar item.
 * @csspart calendar__calendar-item-today - The item representing today.
 * @csspart calendar__calendar-item-outside - A day item belonging to an adjacent month.
 * @csspart calendar__calendar-item-disabled - A disabled calendar item.
 * @csspart calendar__calendar-item-range-begin - The pending anchor or completed range start; an alias of range-start.
 * @csspart calendar__calendar-item-range-clipped - A date whose requested endpoint is adjusted by a range length limit.
 * @csspart calendar__calendar-item-range-start - The pending anchor or completed range start; an alias of range-begin.
 * @csspart calendar__calendar-item-range-end - The completed or adjusted preview endpoint, including reverse selections.
 * @csspart calendar__calendar-item-range-interior - A date inside the selected or previewed range.
 * @csspart calendar__calendar-item-range-interior-start - The first interior date of a completed range, excluding its endpoints.
 * @csspart calendar__calendar-item-range-interior-end - The last interior date of a completed range, excluding its endpoints.
 * @csspart calendar__calendar-item-range-pending - The selected start while waiting for a range end.
 * @csspart calendar__calendar-item-range-preview - A date in the pending pointer or keyboard range preview.
 * @csspart calendar__calendar-item-range-preview-start - The first preview date, excluding the anchor but including the prospective endpoint.
 * @csspart calendar__calendar-item-range-preview-end - The last preview date, excluding the anchor but including the prospective endpoint.
 * @csspart calendar__calendar-item-range-unavailable - An endpoint whose adjusted boundary is disabled or range length invalid.
 * @csspart calendar__month-navigation - The month navigation controls.
 * @csspart calendar__year-navigation - The year navigation controls.
 * @csspart calendar__previous-button - The previous-period icon button host.
 * @csspart calendar__previous-button__base - The previous-period control's forwarded base part.
 * @csspart calendar__navigation-label - The current month, year, or year range in the navigation header.
 * @csspart calendar__navigation-label__base - The navigation label's forwarded button base when it offers a view switch.
 * @csspart calendar__next-button - The next-period icon button host.
 * @csspart calendar__next-button__base - The next-period control's forwarded base part.
 * @csspart calendar__current-period-button - The control for navigating to the current day, month, or year.
 * @csspart calendar__current-period-button__base - The current-period control's forwarded base part.
 * @csspart calendar__clear-button - The control for clearing the selected value.
 * @csspart calendar__clear-button__base - The Clear control's forwarded base part.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart expand-icon - The container that wraps the expand icon.
 * @csspart popup - The popup's exported container.
 */
@enableDefaultSettings('SynDatePicker')
export default class SynDatePicker extends SynergyElement implements SynergyFormControl {
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

  private readonly localize = new CalendarLocalizeController(this);

  private readonly formControlController = new FormControlController(this, {
    assumeInteractionOn: ['syn-blur'],
    setValue: (_control, value) => {
      this.value = typeof value === 'string' ? value : '';
      this.#syncSegments();
      this.#showErrors = false;
      this.requestUpdate();
    },
  });

  #groups: DateInputGroup[] = [{
    ...emptySegments(), committed: '', edited: [], id: 0,
  }];

  #nextGroupId = 1;

  #nextBatchId = 1;

  // A pasted list is atomic even when unrelated date groups commit while it is pending.
  #batches = new Map<number, { ids: number[]; originals: DateInputGroup[] }>();

  // Calendar previews may contain a pending anchor that must not become submitted form data.
  #calendarValue: string[] = [];

  #ignoreCalendarEvents = false;

  #committedValue = '';

  // Expose a proposal only during synchronous before-change dispatch, not as committed state.
  #stagedValue?: string;

  #valueRevision = 0;

  #externalValuePending = false;

  #proposalRejected = false;

  #showErrors = false;

  #popupOpen = false;

  #popupRevision = 0;

  #popupSettled = true;

  #popupWaiters = new Set<() => void>();

  #layoutLocale = '';

  #pendingSegmentFocus?: { explicit?: boolean; field: DateField; id: number; options?: FocusOptions };

  #activeGroup = 0;

  get #segments() {
    return this.#groups[this.#activeGroup];
  }

  set #segments(segments: DateSegments) {
    Object.assign(this.#groups[this.#activeGroup], segments);
  }

  #activeField: DateField = 'month';

  #buffers = new Map<string, string>();

  #hasFocus = false;

  #customValidity = '';

  @query('.popup') popup: SynPopup;

  @query('syn-calendar') private calendar: SynCalendar;

  @query('.value-input') private valueInput: HTMLInputElement;

  /** The name of the input, submitted as a name/value pair with form data. */
  @property() name = '';

  /**
   * Whitespace-separated ISO dates: one date in single mode, two endpoints in range mode,
  * or distinct sorted dates in multiple mode. Range endpoints publish together.
  * Unfinished/invalid drafts retain the last committed value and invalidate normal submission.
   */
  @property({ noAccessor: true })
  get value(): string {
    return this.#stagedValue ?? this.#committedValue;
  }

  set value(value: string) {
    const normalized = normalizeCalendarValue(parseCalendarValue(value), this.mode).join(' ');
    // Controlled consumers can echo value without erasing the user's unfinished draft.
    if (normalized === this.value) {
      return;
    }
    // Writing the committed baseline during dispatch rejects only the staged proposal.
    if (this.#stagedValue !== undefined && normalized === this.#committedValue) {
      this.#proposalRejected = true;
      return;
    }
    const previous = this.#committedValue;
    // A genuinely new application value supersedes any in-flight user operation.
    this.#stagedValue = undefined;
    this.#committedValue = normalized;
    this.#valueRevision += 1;
    this.#externalValuePending = true;
    this.requestUpdate('value', previous);
  }

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
  @property({ noAccessor: true, reflect: true, type: Boolean })
  get open(): boolean {
    return this.#popupOpen;
  }

  set open(open: boolean) {
    if (open === this.#popupOpen) {
      return;
    }
    const previous = this.#popupOpen;
    // Superseded callers must settle even though their requested after-event will never fire.
    this.#settlePopup();
    this.#popupRevision += 1;
    this.#popupOpen = open;
    this.#popupSettled = false;
    this.requestUpdate('open', previous);
  }

  /** The input's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The input's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Disables the input. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /** Makes the input readonly. */
  @property({ reflect: true, type: Boolean }) readonly = false;

  /** Adds a Clear button when the field has a committed selection or a started draft. */
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
    // Date objects reflect committed selections only; incomplete segment groups stay internal drafts.
    return this.#selectionValues().map(value => toNativeDate(parseIsoDate(value)!));
  }

  /** Sets selected UTC date-only Date instances without emitting user value events. */
  set valueAsDates(dates: readonly Date[] | null) {
    // This is a programmatic assignment: normalize like `value` and do not emit user-edit events.
    const values = dates?.map(fromNativeDate).map(toIsoDate).filter(Boolean) ?? [];
    this.value = normalizeCalendarValue(values, this.mode).join(' ');
  }

  connectedCallback() {
  // A mode change invalidates the old group shape; otherwise rebuild only for a new external selection.
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
    this.#hasFocus = false;
    this.#slotObserver?.disconnect();
    this.#removeOpenListeners();
    this.#settlePopup();
    this.#popupRevision += 1;
  }

  protected willUpdate(changed: PropertyValues<this>) {
    const locale = this.localize.lang();
    const active = this.shadowRoot?.activeElement as HTMLElement | null;
    // Remember the logical field: a locale change can move its DOM position without changing its meaning.
    if (this.#layoutLocale && locale !== this.#layoutLocale && active?.dataset.segment) {
      this.#pendingSegmentFocus = { field: active.dataset.segment as DateField, id: Number(active.dataset.groupId) };
    }
    this.#layoutLocale = locale;
    // Both paths rebuild drafts from authoritative state; ordinary draft rerenders must not do this.
    if (changed.has('mode')) {
      this.#committedValue = normalizeCalendarValue(parseCalendarValue(this.#committedValue), this.mode).join(' ');
      this.#syncSegments();
    } else if (this.#externalValuePending) {
      this.#syncSegments();
    }
    this.#externalValuePending = false;
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
    // Coalesced toggles back to the rendered state skip the watcher, but their callers still need to settle.
    if (changed.has('open') && changed.get('open') === this.open) {
      this.#settlePopup();
    }
    this.#updateValidity();
    const pending = this.#pendingSegmentFocus;
    this.#pendingSegmentFocus = undefined;
    // Explicit actions may target a newly rendered group; locale-only updates must not steal outside focus.
    if (pending && (pending.explicit || this.#hasFocus) && !this.disabled) {
      this.renderRoot.querySelector<HTMLElement>(`[data-group-id="${pending.id}"][data-segment="${pending.field}"]`)
        ?.focus(pending.options ?? { preventScroll: true });
    }
  }

  @watch('mode')
  handleModeChange() {
    this.#valueRevision += 1;
  }

  @watch(['disabled', 'readonly'])
  handleInteractionStateChange() {
    // An application state override cancels editing, unlike ordinary blur, which preserves invalid drafts.
    if (this.disabled || this.readonly) {
      this.open = false;
      this.#syncSegments();
    }
  }

  @watch('open')
  async handleOpenChange() {
    if (!this.hasUpdated || !this.isConnected) {
      this.#settlePopup();
      return;
    }
    const opening = this.open && !this.disabled && !this.readonly;
    const revision = this.#popupRevision;
    this.emit(opening ? 'syn-show' : 'syn-hide');
    if (opening) {
      this.#addOpenListeners();
    } else {
      this.#removeOpenListeners();
    }
    await this.updateComplete;
    await this.popup.updateComplete;
    // A newer transition owns lifecycle events and focus; do not finish this stale transition.
    if (revision !== this.#popupRevision || opening !== this.open || !this.isConnected) {
      return;
    }
    if (opening) {
      this.popup.reposition();
    }
    this.emit(opening ? 'syn-after-show' : 'syn-after-hide');
    this.#settlePopup();
  }

  #settlePopup() {
    // Promise settlement means the request is finished or superseded, not necessarily that it became visible.
    this.#popupSettled = true;
    this.#popupWaiters.forEach(resolve => resolve());
    this.#popupWaiters.clear();
  }

  #waitForPopup() {
    return this.#popupSettled ? Promise.resolve() : new Promise<void>(resolve => {
      this.#popupWaiters.add(resolve);
    });
  }

  /** Shows the calendar unless the date picker is disabled or readonly. */
  async show() {
    if (!this.isConnected || this.disabled || this.readonly) {
      return undefined;
    }
    await this.updateComplete;
    // The initial render may yield to disabling, readonly, or removal before opening can start.
    if (!this.isConnected || this.disabled || this.readonly) {
      return undefined;
    }
    this.open = true;
    return this.#waitForPopup();
  }

  /** Hides the calendar. */
  async hide() {
    if (!this.isConnected) {
      this.#settlePopup();
      return undefined;
    }
    this.open = false;
    return this.#waitForPopup();
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
    let active = this.shadowRoot?.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    if (active instanceof HTMLElement) {
      active.blur();
    }
  }

  /** Checks validity without showing a browser validation message. */
  checkValidity() {
    this.#updateValidity();
    return this.valueInput.checkValidity();
  }

  /** Shows the browser validation message when the date is invalid. */
  reportValidity() {
    this.#showErrors = true;
    this.#updateValidity();
    if (!this.validity.valid) {
      // Native validation uses a clipped proxy input, but correction belongs on a visible date segment.
      const invalid = this.#groups.findIndex(group => this.#isDraft(group)
        || (group.committed && isDateDisabled(parseIsoDate(group.committed)!, this.#getConstraints())));
      this.#activeGroup = Math.max(invalid, 0);
      const group = this.#groups[this.#activeGroup];
      const field = this.#fields().find(candidate => {
        const bounds = segmentBounds(candidate, group);
        const value = group[candidate];
        const buffer = this.#buffers.get(`${group.id}:${candidate}`);
        return value === null || value < bounds.min || value > bounds.max
          || (candidate === 'year' && buffer !== undefined && buffer.length !== 4);
      }) ?? this.#fields()[0];
      this.#focusField(field, { preventScroll: true });
      this.requestUpdate();
    }
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
    // Keep form-facing data independent from visible draft groups and temporary before-change proposals.
    return normalizeCalendarValue(parseCalendarValue(this.#committedValue), this.mode);
  }

  #newGroup(value = '', fields = isoToSegments(value)): DateInputGroup {
    // Stable IDs let Lit preserve the logical segment node when groups reorder or locale changes.
    const id = this.#nextGroupId;
    this.#nextGroupId += 1;
    return {
      ...fields, committed: value, edited: [], id,
    };
  }

  #syncSegments() {
    // Reset is authoritative: rebuild every group from committed state and cancel all draft transactions.
    const values = this.#selectionValues();
    this.#groups = values.map(value => this.#newGroup(value));
    if (this.mode === 'range') {
      this.#groups = [this.#newGroup(values[0] ?? ''), this.#newGroup(values[1] ?? '')];
    } else if (this.mode === 'multiple' || this.#groups.length === 0) {
      this.#groups.push(this.#newGroup());
    }
    this.#activeGroup = Math.min(this.#activeGroup, this.#groups.length - 1);
    this.#buffers.clear();
    this.#batches.clear();
    this.#updateCalendarValue();
  }

  #groupDate(group: DateInputGroup) {
    const yearBuffer = this.#buffers.get(`${group.id}:year`);
    // ISO serialization could pad "2" into year 0002; an unfinished typed year must remain a draft instead.
    return yearBuffer !== undefined && yearBuffer.length !== 4 ? '' : segmentsToIso(group);
  }

  #isDraft(group: DateInputGroup) {
    return group.edited.length > 0 || group.batch !== undefined
      || this.#fields().some(field => this.#buffers.has(`${group.id}:${field}`));
  }

  #hasDrafts() {
    return this.#groups.some(group => this.#isDraft(group));
  }

  #clearGroupBuffers(group: DateInputGroup) {
    this.#fields().forEach(field => this.#buffers.delete(`${group.id}:${field}`));
  }

  #ensureAddGroup() {
    const last = this.#groups[this.#groups.length - 1];
    if (this.mode === 'multiple' && (last.committed || this.#isDraft(last))) {
      // Keep a separate untouched entry available; it does not invalidate an otherwise complete selection.
      this.#groups.push(this.#newGroup());
    }
  }

  #updateCalendarValue(values?: string[]) {
    let next = values ?? this.#selectionValues();
    // Let the calendar preview/complete a draft range while the picker retains its last committed pair.
    if (!values && this.mode === 'range' && this.#hasDrafts()) {
      next = this.#groups.map(group => this.#groupDate(group)).filter(Boolean);
    }
    // Stable array identity avoids resetting calendar state on every segment-only render.
    if (next.length !== this.#calendarValue.length || next.some((date, index) => date !== this.#calendarValue[index])) {
      this.#calendarValue = [...next];
    }
  }

  #refreshDraft() {
    this.#ensureAddGroup();
    this.#updateCalendarValue();
    this.#updateValidity();
    this.requestUpdate();
  }

  #restoreBatch(batchId: number) {
    const batch = this.#batches.get(batchId);
    if (!batch) {
      return;
    }
    const index = this.#groups.findIndex(group => batch.ids.includes(group.id));
    this.#groups.forEach(group => {
      if (batch.ids.includes(group.id)) {
        this.#clearGroupBuffers(group);
      }
    });
    // Restore this batch only; a full-list snapshot would erase unrelated changes made since the paste.
    this.#groups = this.#groups.filter(group => !batch.ids.includes(group.id));
    this.#groups.splice(Math.max(index, 0), 0, ...batch.originals);
    this.#batches.delete(batchId);
    this.#activeGroup = Math.min(this.#activeGroup, this.#groups.length - 1);
  }

  #restoreCommittedGroups(groups: DateInputGroup[]) {
    groups.forEach(group => {
      if (group.batch !== undefined) {
        this.#restoreBatch(group.batch);
      } else {
        Object.assign(group, isoToSegments(group.committed), { edited: [] });
        this.#clearGroupBuffers(group);
      }
    });
    this.#refreshDraft();
    if (this.#hasFocus) {
      this.#focusField(this.#activeField, { preventScroll: true });
    }
  }

  #finishSegment(field = this.#activeField, group = this.#groups[this.#activeGroup]) {
    const key = `${group.id}:${field}`;
    const buffer = this.#buffers.get(key);
    if (buffer === undefined) {
      return false;
    }
    // Incomplete years and impossible explicit fields stay visible drafts; never publish a fabricated date.
    if ((field === 'year' && buffer.length !== 4) || group[field] === null) {
      this.#refreshDraft();
      return false;
    }
    // Repair an existing day after a completed month/year edit, never an explicitly entered invalid day.
    if (field !== 'day' && !group.edited.includes('day') && group.month !== null && group.month >= 1 && group.month <= 12
      && group.year !== null && group.year >= 0 && group.year <= 9999) {
      Object.assign(group, clampDay(group));
    }
    this.#buffers.delete(key);
    this.#commitSegments(group);
    return true;
  }

  #reconcileGroups() {
    // Called on whole-picker blur so sorting/deduplication cannot move the field being typed into.
    if (this.mode === 'range') {
      // Reversed endpoint editing is allowed in place; only completed public values are chronological.
      if (!this.#hasDrafts()) {
        this.#groups.sort((first, second) => first.committed.localeCompare(second.committed));
      }
    } else if (this.mode === 'multiple') {
      // Merge only committed groups; draft and atomic-paste group identities must survive reconciliation.
      const drafts = this.#groups.filter(group => this.#isDraft(group));
      const unique = new Map<string, DateInputGroup>();
      this.#groups.filter(group => !this.#isDraft(group) && group.committed).forEach(group => {
        if (!unique.has(group.committed)) {
          unique.set(group.committed, group);
        }
      });
      this.#groups = [...unique.values()].sort((first, second) => first.committed.localeCompare(second.committed));
      this.#groups.push(...drafts, this.#newGroup());
    }
    this.#activeGroup = Math.min(this.#activeGroup, this.#groups.length - 1);
    this.requestUpdate();
  }

  #bufferKey(field: DateField, group = this.#activeGroup) {
    return `${this.#groups[group]?.id}:${field}`;
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

  #requestUserValue(value: string, commit: boolean, apply = true) {
    const previous = this.#committedValue;
    const revision = this.#valueRevision;
    const {mode} = this;
    this.#proposalRejected = false;
    this.#stagedValue = value;
    if (commit) {
      const event = this.emit('syn-before-change', { cancelable: true });
      // Application replacements win; rolling back our old snapshot would overwrite the listener's intent.
      if (revision !== this.#valueRevision || mode !== this.mode) {
        this.#stagedValue = undefined;
        return false;
      }
      if (event.defaultPrevented || this.#proposalRejected || this.disabled || this.readonly) {
        this.#stagedValue = undefined;
        return false;
      }
    }
    this.#stagedValue = undefined;
    // Nested calendar proposals are checked here, then applied when its accepted input event arrives.
    if (apply) {
      this.#committedValue = value;
      this.requestUpdate('value', previous);
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
    const {id} = this.#groups[group];
    const target = this.renderRoot.querySelector<HTMLElement>(`[data-group-id="${id}"][data-segment="${field}"]`);
    if (target) {
      target.focus(options);
    } else {
      // Clear/paste/rollback can create a group before Lit has rendered its focusable segments.
      this.#pendingSegmentFocus = {
        explicit: true, field, id, options,
      };
    }
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

  #commitSegments(active = this.#groups[this.#activeGroup]) {
    const batch = active.batch === undefined ? undefined : this.#batches.get(active.batch);
    // Ranges and pasted lists commit together; ordinary multiple-date edits commit only their own group.
    const groups = this.mode === 'range' ? this.#groups : this.#groups.filter(group => batch?.ids.includes(group.id) || group === active);
    // Do not partially publish a range or paste batch while any member is still incomplete or impossible.
    if (groups.some(group => !this.#groupDate(group))) {
      this.#refreshDraft();
      this.emit('syn-input');
      return;
    }
    // Keep committed dates behind unrelated drafts; filtering their visible fields would silently remove them.
    const values = this.#groups.map(group => (groups.includes(group) ? this.#groupDate(group) : group.committed)).filter(Boolean);
    const value = normalizeCalendarValue(values, this.mode).join(' ');
    const previous = this.#committedValue;
    const revision = this.#valueRevision;
    const {mode} = this;
    if (!this.#requestUserValue(value, value !== previous)) {
      // Only a veto of our still-current operation may restore fields; an application replacement owns them now.
      if (revision === this.#valueRevision && mode === this.mode) {
        this.#restoreCommittedGroups(groups);
      }
      return;
    }
    groups.forEach(group => {
      const batchId = group.batch;
      Object.assign(group, { batch: undefined, committed: this.#groupDate(group), edited: [] });
      this.#clearGroupBuffers(group);
      if (batchId !== undefined) {
        this.#batches.delete(batchId);
      }
    });
    this.#refreshDraft();
    this.emit('syn-input');
    if (value !== previous) {
      this.emit('syn-change');
    }
  }

  #removeDate(group: number) {
    if (this.mode !== 'multiple' || this.disabled || this.readonly) {
      return;
    }
    const target = this.#groups[group];
    // Removing one committed multiple value must not commit or erase unrelated draft groups.
    const previous = this.#committedValue;
    const remaining = this.#groups.filter(candidate => candidate !== target).map(candidate => candidate.committed).filter(Boolean);
    const value = normalizeCalendarValue(remaining, this.mode).join(' ');
    if (!this.#requestUserValue(value, value !== previous)) {
      return;
    }
    if (target.batch !== undefined) {
      this.#restoreBatch(target.batch);
    }
    this.#groups = this.#groups.filter(candidate => candidate.id !== target.id);
    this.#clearGroupBuffers(target);
    this.#activeGroup = Math.min(this.#activeGroup, this.#groups.length - 1);
    this.#refreshDraft();
    this.emit('syn-input');
    if (value !== previous) {
      this.emit('syn-change');
    }
    this.#focusField(this.#activeField);
  }

  #updateValidity() {
    if (!this.valueInput) {
      return;
    }
    this.valueInput.value = this.value;
    this.valueInput.disabled = this.disabled || this.readonly;
    this.valueInput.required = this.required;
    const message = this.disabled || this.readonly ? '' : this.#getValidationMessage();
    this.valueInput.setCustomValidity(message);
    this.formControlController.updateValidity();
    // Invalidity is truthful during editing, but error styling waits for blur or explicit validation.
    this.toggleAttribute('data-user-invalid', this.#showErrors && !this.validity.valid && !this.disabled && !this.readonly);
  }

  #getValidationMessage() {
    if (this.#customValidity) {
      return this.#customValidity;
    }
    const values = this.#selectionValues();
    // A retained old value cannot make an unfinished visible draft eligible for normal submission.
    if (this.#hasDrafts()) {
      return 'Enter a complete, valid date.';
    }
    if (this.mode === 'range' && values.length === 1) {
      return 'Enter both range endpoints.';
    }
    if (this.mode === 'range' && values.length === 2
      && !isRangeLengthAllowed(parseIsoDate(values[0])!, parseIsoDate(values[1])!, this.minRange, this.maxRange)) {
      return 'Choose a range within the allowed length.';
    }
    const constraints = this.#getConstraints();
    return values.some(value => isDateDisabled(parseIsoDate(value)!, constraints)) ? 'Choose an available date.' : '';
  }

  #handleSegmentFocus(event: FocusEvent) {
    const { groupId, segment } = (event.currentTarget as HTMLElement).dataset;
    const group = this.#groups.findIndex(candidate => candidate.id === Number(groupId));
    // Replaced nodes can still dispatch focus events while Lit reconciles the old DOM.
    if (group < 0) {
      return;
    }
    this.#activeGroup = group;
    this.#activeField = segment as DateField;
    this.requestUpdate();
  }

  #handleSegmentBlur(event: FocusEvent) {
    const { groupId, segment } = (event.currentTarget as HTMLElement).dataset;
    const target = this.#groups.find(group => group.id === Number(groupId));
    if (target) {
      this.#finishSegment(segment as DateField, target);
    }
    this.requestUpdate();
  }

  async #focusCalendar() {
    if (this.disabled || this.readonly) {
      return;
    }
    await this.show();
    // show() also resolves when interrupted; its resolution alone does not authorize focus in the popup.
    if (!this.isConnected || !this.open || this.disabled || this.readonly) {
      return;
    }
    await this.calendar.updateComplete;
    if (this.open && !this.disabled && !this.readonly) {
      this.calendar.focus({ preventScroll: true });
    }
  }

  async #handleSegmentKeyDown(event: KeyboardEvent) {
    const field = (event.currentTarget as HTMLElement).dataset.segment as DateField;
    if (this.disabled || event.isComposing) {
      return;
    }
    // The open-popup Escape is dismissal only; a subsequent closed-popup Escape cancels unfinished editing.
    if (event.key === 'Escape' && !this.open && this.#hasDrafts()) {
      event.preventDefault();
      event.stopPropagation();
      this.#syncSegments();
      this.#updateValidity();
      this.requestUpdate();
      this.#focusField(this.#activeField);
      this.emit('syn-input');
      return;
    }
    if (event.altKey && event.key === 'ArrowDown') {
      event.preventDefault();
      event.stopPropagation();
      await this.#focusCalendar();
      return;
    }
    if (event.altKey && event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();
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
      // Finish the field but leave Tab traversal native, including reverse traversal with Shift.
      this.#finishSegment(field);
      this.requestUpdate();
      return true;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      this.#finishSegment(field);
      // Keep focus moving in displayed locale order, not hard-coded calendar chronology.
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      this.#moveField(field, this.localize.dir() === 'rtl' ? -direction : direction);
      return true;
    }
    if (event.key === 'Enter') {
      if (event.isComposing || event.shiftKey) {
        return true;
      }
      this.#finishSegment(field);
      // Closing the popup consumes Enter; only an already-closed field may request form submission.
      if (this.open) {
        event.preventDefault();
        event.stopPropagation();
        this.open = false;
      } else {
        // Give application keydown handlers a chance to cancel before invoking Synergy's submission path.
        queueMicrotask(() => {
          if (!event.defaultPrevented && !event.isComposing) {
            this.formControlController.submit();
          }
        });
      }
      return true;
    }
    return false;
  }

  #handleSegmentEditing(event: KeyboardEvent, field: DateField) {
    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      // Storybook and other enclosing shortcut handlers must not reinterpret digits consumed by this spinbutton.
      event.stopPropagation();
      const key = this.#bufferKey(field);
      const revision = this.#valueRevision;
      const result = typeDigit(field, this.#buffers.get(key) ?? '', event.key, this.#segments);
      this.#buffers.set(key, result.buffer);
      this.#segments = { ...this.#segments, [field]: result.value };
      const group = this.#groups[this.#activeGroup];
      if (!group.edited.includes(field)) {
        group.edited.push(field);
      }
      if (result.advance) {
        if (!this.#finishSegment(field)) {
          this.emit('syn-input');
        }
        if (revision === this.#valueRevision && this.#groups.includes(group)) {
          this.#moveField(field, 1);
        }
      } else {
        this.#refreshDraft();
        this.emit('syn-input');
      }
      return;
    }
    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      this.#stepSegment(field, event.key);
      return;
    }
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      event.stopPropagation();
      this.#buffers.delete(this.#bufferKey(field));
      this.#segments = { ...this.#segments, [field]: null };
      const group = this.#groups[this.#activeGroup];
      if (!group.edited.includes(field)) {
        group.edited.push(field);
      }
      // Clearing an unused add-date group returns it to its neutral state, rather than leaving an invalid draft.
      if (!group.committed && group.batch === undefined && this.#fields().every(candidate => group[candidate] === null)) {
        group.edited = [];
      }
      this.#refreshDraft();
      this.emit('syn-input');
      return;
    }
    const separators = getSegmentLayout(this.localize.lang()).filter(token => !token.field);
    if (['/', '-', '.', ' '].includes(event.key) || separators.some(token => token.text.includes(event.key))) {
      event.preventDefault();
      event.stopPropagation();
      this.#finishSegment(field);
      this.#moveField(field, 1);
    }
  }

  #stepSegment(field: DateField, key: string) {
    // A step is a separate gesture; finish any numeric buffer before applying it.
    this.#finishSegment(field);
    const { max, min } = segmentBounds(field, this.#segments);
    const current = this.#segments[field];
    let value = current ?? today()[field];
    if (key === 'Home' || key === 'End') {
      value = key === 'Home' ? min : max;
    } else if (current !== null) {
      value += key === 'ArrowUp' ? 1 : -1;
    }
    value = Math.min(max, Math.max(min, value));
    const fields = { ...this.#segments, [field]: value };
    this.#segments = this.#groups[this.#activeGroup].edited.includes('day') ? fields : clampDay(fields);
    this.#groups[this.#activeGroup].edited.push(field);
    this.#buffers.delete(this.#bufferKey(field));
    this.#commitSegments();
  }

  #handleSegmentPaste(event: ClipboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }
    event.preventDefault();
    const fields = parsePastedSelection(event.clipboardData?.getData('text') ?? '', this.localize.lang(), this.mode);
    // Unknown/ambiguous text leaves both the current draft and committed selection untouched.
    if (!fields) {
      return;
    }
    const active = this.#groups[this.#activeGroup];
    // Replacing a member of an atomic paste first restores that whole pending operation.
    if (active.batch !== undefined) {
      this.#restoreBatch(active.batch);
    }
    const start = this.mode === 'range' && fields.length === 2 ? 0 : this.#activeGroup;
    const originals = this.#groups.slice(start, start + (this.mode === 'range' && fields.length === 2 ? 2 : 1));
    // Treat a recognized list as one repairable operation; keep replaced values as rollback originals.
    const batchId = this.#nextBatchId;
    this.#nextBatchId += 1;
    // Preserve original committed dates behind invalid pasted fields until the entire batch can commit.
    const groups = fields.map((date, index) => {
      const group = this.#newGroup(originals[index]?.committed ?? '', date);
      group.batch = batchId;
      group.edited = [...this.#fields()];
      return group;
    });
    this.#batches.set(batchId, { ids: groups.map(group => group.id), originals });
    originals.forEach(group => this.#clearGroupBuffers(group));
    this.#groups.splice(start, originals.length, ...groups);
    this.#activeGroup = start;
    this.#commitSegments(groups[0]);
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
    if (this.#ignoreCalendarEvents || this.disabled || this.readonly) {
      return;
    }
    const values = normalizeCalendarValue(this.calendar.value, this.mode);
    // A first calendar range click is a picker draft, not a one-endpoint form value.
    if (this.mode === 'range' && values.length === 1) {
      // Mirror the anchor into segments for feedback, while keeping it out of committed form data.
      this.#groups = [this.#newGroup('', isoToSegments(values[0])), this.#newGroup()];
      this.#groups[0].edited = [...this.#fields()];
      this.#batches.clear();
      this.#buffers.clear();
      this.#activeGroup = Math.min(this.#activeGroup, 1);
      this.#refreshDraft();
      this.emit('syn-input');
      return;
    }
    const previous = this.#selectionValues();
    if (this.mode === 'multiple') {
      // Apply the calendar's date delta, not a complete group rebuild that would discard unrelated typed drafts.
      const removed = previous.filter(value => !values.includes(value));
      this.#groups.filter(group => removed.includes(group.committed)).forEach(group => {
        if (group.batch !== undefined) {
          this.#restoreBatch(group.batch);
        }
      });
      this.#groups = this.#groups.filter(group => !removed.includes(group.committed));
      values.filter(value => !previous.includes(value)).forEach(value => {
        this.#groups.splice(Math.max(this.#groups.length - 1, 0), 0, this.#newGroup(value));
      });
      this.#committedValue = values.join(' ');
    } else {
      this.#committedValue = values.join(' ');
      this.#syncSegments();
    }
    this.#activeGroup = Math.min(this.#activeGroup, this.#groups.length - 1);
    this.requestUpdate('value', previous.join(' '));
    this.#refreshDraft();
    this.emit('syn-input');
  }

  #handleCalendarBeforeChange(event: Event) {
    event.stopPropagation();
    const candidate = normalizeCalendarValue(this.calendar.value, this.mode).join(' ');
    // Let picker listeners accept or veto the calendar proposal before its input/change notifications arrive.
    if (!this.#requestUserValue(candidate, true, false)) {
      event.preventDefault();
    }
  }

  #handleCalendarClear(event: Event) {
    event.stopPropagation();
    // The calendar emits clear/input/change synchronously; our unified Clear already sends the picker events.
    this.#ignoreCalendarEvents = true;
    this.#clearSelection(true);
    queueMicrotask(() => { this.#ignoreCalendarEvents = false; });
  }

  async #handleCalendarChange(event: Event) {
    event.stopPropagation();
    if (this.#ignoreCalendarEvents || this.disabled || this.readonly) {
      return;
    }
    this.emit('syn-change');
    const values = this.#selectionValues();
    const complete = this.mode === 'single' ? values.length === 1 : this.mode === 'range' && values.length === 2;
    if (complete) {
      await this.hide();
      if (!this.open && this.isConnected && !this.disabled) {
        this.#focusField(this.#activeField);
      }
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
    // Wait for native focus transfer so moving into the nested calendar is not mistaken for leaving the picker.
    queueMicrotask(() => {
      if (this.isConnected && this.#hasFocus && !this.matches(':focus-within')) {
        this.#finishSegment();
        this.#showErrors = true;
        this.#reconcileGroups();
        this.#hasFocus = false;
        this.#updateValidity();
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
    if (event.key === 'Escape' && !event.isComposing && !event.defaultPrevented && event.composedPath().includes(this)) {
      event.preventDefault();
      event.stopPropagation();
      this.open = false;
      this.#focusField(this.#activeField);
    }
  };

  #handleClearClick() {
    this.#clearSelection();
  }

  #clearSelection(checked = false) {
    if (this.disabled || this.readonly || (!this.#committedValue && !this.#hasDrafts())) {
      return;
    }
    const previous = this.#committedValue;
    if (!this.#requestUserValue('', !checked)) {
      return;
    }
    this.#syncSegments();
    this.#updateValidity();
    this.requestUpdate();
    this.emit('syn-clear');
    this.emit('syn-input');
    // Draft-only Clear changes the editing surface, but there was no committed value change to announce.
    if (previous) {
      this.emit('syn-change');
    }
    this.focus({ preventScroll: true });
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
    const label = getDateFieldName(this.localize.lang(), field);
    const groupLabel = this.mode === 'range' ? ['Start date', 'End date'][group] : `Date ${group + 1}`;
    let valueText = value === null ? placeholder : String(value);
    if (field === 'month' && value !== null) {
      valueText = getMonthNames(this.localize.lang())[value - 1];
    }
    const display = value === null ? placeholder : String(value).padStart(field === 'year' ? 4 : 2, '0');
    const segmentId = `segment-label-${segments.id}-${field}`;
    const hasLabel = !!this.label || this.hasSlotController.test('label');
    return html`
      <span class="sr-only" id=${segmentId}>${this.mode === 'single' ? label : `${groupLabel} ${label}`}</span>
      <span
        class=${classMap({ segment: true, 'segment--empty': value === null, 'segment--year': field === 'year' })}
        data-segment=${field}
        data-group=${group}
        data-group-id=${segments.id}
        part="segment"
        role="spinbutton"
        tabindex=${!this.disabled && group === this.#activeGroup && field === this.#activeField ? 0 : -1}
        aria-labelledby=${hasLabel ? `label ${segmentId}` : segmentId}
        aria-valuemin=${min}
        aria-valuemax=${max}
        aria-valuenow=${ifDefined(value !== null && value >= min && value <= max ? value : undefined)}
        aria-valuetext=${buffer ?? valueText}
        aria-disabled=${this.disabled}
        aria-readonly=${this.readonly}
        aria-required=${this.required}
        aria-invalid=${this.#showErrors && !this.validity.valid}
        aria-errormessage=${this.#showErrors && !this.validity.valid ? 'validation-message' : nothing}
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
    const hasClearIcon = this.clearable && (!this.disabled && !this.readonly) && (!!this.value || this.#hasDrafts());

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
        <span class="sr-only" id="validation-message" role="alert">${this.#showErrors ? this.validationMessage : ''}</span>
        <label
          aria-hidden=${hasLabel ? 'false' : 'true'}
          class="form-control__label"
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
                ${repeat(this.#groups, segments => segments.id, (segments, group) => html`
                  ${this.mode === 'range' && group === 1
                    ? html`<span class="segment-literal" part="range-separator" aria-hidden="true"> - </span>` : nothing}
                  <span class="date-entry">
                    ${repeat(getSegmentLayout(this.localize.lang()), (token, index) => token.field ?? `literal-${index}`, token => (token.field
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
                @focus=${() => this.#focusField(this.#activeField)}
                @invalid=${this.#handleInvalid}
              />

              <span class="input__suffix" part="suffix">
                <slot name="suffix"></slot>
              </span>

              ${hasClearIcon
                ? html`
                    <button
                      aria-label=${this.localize.term('clearEntry')}
                      class="input__clear"
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

            <div
              aria-label=${hasLabel ? nothing : 'Date'}
              aria-labelledby=${hasLabel ? 'label' : nothing}
              class="calendar-wrapper"
              id="calendar"
              role="dialog"
            >
              <syn-calendar
                part="calendar"
                lang=${this.localize.lang()}
                dir=${this.localize.dir()}
                exportparts=${[
                  'base', 'header', 'content', 'footer', 'day-grid', 'day-cell', 'weekdays', 'weekday',
                  'month-grid', 'year-grid', 'calendar-item', 'calendar-item-label', 'calendar-item-day',
                  'calendar-item-month', 'calendar-item-year', 'calendar-item-active', 'calendar-item-today',
                  'calendar-item-outside', 'calendar-item-disabled', 'calendar-item-range-begin',
                  'calendar-item-range-clipped', 'calendar-item-range-start', 'calendar-item-range-end',
                  'calendar-item-range-interior', 'calendar-item-range-pending', 'calendar-item-range-preview',
                  'calendar-item-range-interior-start', 'calendar-item-range-interior-end',
                  'calendar-item-range-preview-start', 'calendar-item-range-preview-end',
                  'calendar-item-range-unavailable', 'month-navigation', 'year-navigation', 'previous-button',
                  'previous-button__base', 'navigation-label', 'navigation-label__base', 'next-button',
                  'next-button__base', 'current-period-button', 'current-period-button__base', 'clear-button',
                  'clear-button__base',
                ].map(part => `${part}:calendar__${part}`).join(',')}
                .mode=${this.mode}
                .value=${this.#calendarValue}
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
              >
                ${this
                  .#calendarSlots
                  .map(name => html`
                    <slot name=${name} slot=${name}></slot>
                  `)}
              </syn-calendar>
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
