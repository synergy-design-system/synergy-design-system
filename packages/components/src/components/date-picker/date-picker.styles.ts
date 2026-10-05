import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
  }

  .date-picker {
    --container-padding-block: var(--syn-spacing-medium);
    --container-padding-inline: var(--syn-spacing-small);

    background: var(--syn-panel-background-color);
    display: flex;
    flex-direction: column;
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
    justify-content: space-between;
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
    /* We always use 4 characters, so no need to move */
    width: 4ch;
  }

  /* Day View */
  .day-selector {
    border: none;
    border-collapse: collapse;
    text-align: center;
    width: 100%;
  }

  .day-selector th,
  .day-selector td {
    vertical-align: middle;
  }

  .day-selector th {
    font: var(--syn-body-small-bold);
    height: var(--syn-spacing-x-large);
    padding: var(--syn-spacing-x-small);
  }

  .day-selector__day-button {
    appearance: none;
    background: none;
    border: var(--syn-border-width-small) solid transparent;
    border-radius: var(--syn-border-radius-small);
    box-sizing: content-box;
    cursor: pointer;
    display: inline-block;
    font: var(--syn-body-small-regular);
    height: var(--syn-spacing-x-large);
    margin: 0;
    overflow-wrap: anywhere;
    padding: var(--syn-spacing-x-small);
    position: relative;
    width: 100%;
  }

  .day-selector .day-selector__day-button {
    width: var(--syn-spacing-x-large);
  }

  .day-selector__day-button:hover,
  .day-selector__day-button:focus {
    border-color: var(--syn-focus-ring-color);
    outline: none;
  }

  .day-selector__day--active {
    background-color: var(--syn-color-primary-600);
    color: var(--syn-color-neutral-0);
  }

  .day-selector__day--today::after {
    background: var(--syn-typography-color-text);
    border-radius: var(--syn-border-radius-circle);
    bottom: 10px;
    content: "";
    height: var(--syn-spacing-2x-small);
    left: calc(50% - var(--syn-spacing-2x-small) / 2);
    position: absolute;
    width: var(--syn-spacing-2x-small);
  }

  .day-selector__day--active.day-selector__day--today::after {
    background: var(--syn-typography-color-text-inverted);
  }

  .day-selector__day--outside {
    visibility: hidden;
  }

  .date-picker--view-month .header--year-selection,
  .date-picker--view-year .header--year-selection {
    width: 100%;
  }

  .month-selector,
  .year-selector {
    display: grid;
    gap: var(--syn-spacing-small);
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

`;
