import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  .calendar {
    --container-padding-block: var(--syn-spacing-medium);
    --container-padding-inline: var(--syn-spacing-small);

    /* Sizes */
    --calendar-min-width: 390px;
    --calendar-item-font: var(--syn-body-small-regular);
    --day-selector-th-font: var(--syn-body-small-bold);

    background: var(--syn-panel-background-color);
    border: var(--syn-border-width-small) solid var(--syn-panel-border-color);
    border-radius: var(--syn-panel-border-radius);
    display: flex;
    flex-direction: column;
    max-width: 100%;
    min-width: min(var(--calendar-min-width), 100vw);
    user-select: none;
  }

  .header {
    border-bottom: var(--syn-border-width-small) solid var(--syn-panel-border-color);
    padding-block: var(--syn-spacing-x-small);
    padding-inline: var(--container-padding-inline);
  }

  .content {
    padding-block: var(--container-padding-block);
    padding-inline: var(--container-padding-inline);
  }

  .footer {
    padding-block: 0 var(--container-padding-block);
    padding-inline: var(--container-padding-inline);
  }

  /* Header Selection */
  .selection-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .header-selection {
    align-items: center;
    color: var(--syn-typography-color-text);
    display: flex;
    font: var(--syn-body-medium-bold);
    gap: var(--syn-spacing-2x-small);
    justify-content: space-between;
  }

  .header-selection syn-button::part(label) {
    /* Header selection rows are dynamically positioned via flex, so we skip the inner padding */
    padding-inline: 0;
  }

  /* Custom headers for day selection */
  .header--month-selection {
    width: 100%;
  }

  .header--month-selection syn-button {
    flex: 1;
    width: 100%;
  }

  .header--year-selection syn-button {
    /* We are sure to always show 4 characters per year, so we fix the width to prevent jumps */
    width: 4em;
  }

  /* Calendar Items */
  .calendar-item {
    appearance: none;
    background: none;
    border: var(--syn-border-width-small) solid transparent;
    border-radius: var(--syn-date-picker-border-radius);
    box-sizing: content-box;
    color: var(--syn-typography-color-text);
    cursor: pointer;
    display: inline-block;
    font: var(--calendar-item-font);
    height: var(--syn-spacing-x-large);
    margin: 0;
    overflow-wrap: anywhere;
    padding: var(--syn-spacing-x-small);
    position: relative;
    width: 100%;
  }

  :where(.calendar:not(.calendar--readonly)) .calendar-item:hover,
  :where(.calendar--readonly) .calendar-item:where(:not([data-kind="day"])):hover,
  .calendar-item:focus {
    border-color: var(--syn-focus-ring-color);
    outline: none;
  }

  .calendar-item--active {
    background-color: var(--syn-date-picker-color);
    color: var(--syn-color-neutral-0);
  }

  .calendar-item--range-clipped {
    cursor: not-allowed;
  }

  .calendar-item--range-interior {
    background-color: var(--syn-date-picker-color-range);
  }

  .calendar-item--range-pending {
    border-style: dashed;
  }

  .calendar-item--range-preview {
    background-color: var(--syn-date-picker-color-range);
  }

  .calendar-item--range-preview-start {
    background-image: linear-gradient(
      to right,
      var(--syn-date-picker-gradient-start),
      var(--syn-date-picker-gradient-end)
    );
  }

  .calendar-item--range-preview-end,
  .calendar-item--range-interior-end {
    background-image: linear-gradient(
      to left,
      var(--syn-date-picker-gradient-start),
      var(--syn-date-picker-gradient-end)
    );
  }

  .calendar--rtl .calendar-item--range-preview-start,
  .calendar--rtl .calendar-item--range-interior-start {
    background-image: linear-gradient(
      to left,
      var(--syn-date-picker-gradient-start),
      var(--syn-date-picker-gradient-end)
    );
  }

  .calendar--rtl .calendar-item--range-preview-end,
  .calendar--rtl .calendar-item--range-interior-end {
    background-image: linear-gradient(
      to right,
      var(--syn-date-picker-gradient-start),
      var(--syn-date-picker-gradient-end)
    );
  }

  .calendar-item--range-preview-start.calendar-item--range-preview-end,
  .calendar-item--range-interior-start.calendar-item--range-interior-end {
    background-image:
      linear-gradient(to right, var(--syn-date-picker-gradient-start), var(--syn-date-picker-gradient-end)),
      linear-gradient(to left, var(--syn-date-picker-gradient-start), var(--syn-date-picker-gradient-end));
    background-position: left, right;
    background-repeat: no-repeat;
    background-size: 50% 100%;
  }

  .calendar-item--range-unavailable {
    border-style: dashed;
    cursor: not-allowed;
  }

  .calendar-item--outside {
    box-shadow: inset 0 0 0 var(--syn-border-width-small) hotpink;
  }

  .calendar-item--disabled {
    background-color: red;
    cursor: not-allowed;
  }

  .calendar--readonly .calendar-item[data-kind="day"]:not(:disabled) {
    cursor: default;
  }

  .calendar-item--today::after {
    background: var(--syn-typography-color-text);
    border-radius: var(--syn-border-radius-circle);
    bottom: 10px;
    content: "";
    height: var(--syn-spacing-2x-small);
    left: calc(50% - var(--syn-spacing-2x-small) / 2);
    position: absolute;
    width: var(--syn-spacing-2x-small);
  }

  .calendar-item--active.calendar-item--today::after {
    background: var(--syn-typography-color-text-inverted);
  }

  /* Day View */
  .day-selector {
    border: none;
    border-collapse: collapse;
    text-align: center;
  }

  .day-selector th,
  .day-selector td {
    vertical-align: middle;
  }

  .day-selector th {
    box-sizing: content-box;
    font: var(--day-selector-th-font);
    height: var(--syn-spacing-x-large);
    padding: var(--syn-spacing-x-small);
  }

  .day-selector .calendar-item {
    height: var(--syn-spacing-x-large);
    width: var(--syn-spacing-x-large);
  }

  .calendar--view-month .header--year-selection,
  .calendar--view-year .header--year-selection {
    width: 100%;
  }

  .period-selector {
    display: grid;
    gap: var(--syn-spacing-small);
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .period-selector .calendar-item {
    width: auto;
  }

  /* Sizes */
  .calendar--size-small {
    --calendar-item-font: var(--syn-body-small-regular);
    --day-selector-th-font: var(--syn-body-2x-small-bold);
  }

  .calendar--size-large {
    --calendar-item-font: var(--syn-body-medium-regular);
    --day-selector-th-font: var(--syn-body-small-bold);
  }
`;
