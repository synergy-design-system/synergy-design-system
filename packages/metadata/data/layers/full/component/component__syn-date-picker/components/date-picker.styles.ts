import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  .segments {
    align-items: center;
    cursor: text;
    display: flex;
    flex-wrap: wrap;
    font-variant-numeric: tabular-nums;
    gap: var(--syn-spacing-3x-small);
    min-width: 0;
  }

  .input--multiple-dates {
    height: auto;
    min-height: var(--input-height);
  }

  .date-entry {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    white-space: nowrap;
  }

  .remove-date {
    align-items: center;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    display: flex;
    font: inherit;
    padding: var(--syn-spacing-3x-small);
  }

  .remove-date:disabled {
    cursor: not-allowed;
  }

  .remove-date:focus-visible {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  /* Date Segments for manual input */
  .segment {
    border-radius: var(--syn-border-radius-small);
    box-sizing: content-box;
    flex: 0 0 auto;
    padding: var(--syn-spacing-3x-small);
    text-align: center;
    user-select: none;
    width: 2em;
  }

  .segment--year {
    width: 4em;
  }

  .segment--empty {
    color: var(--syn-input-placeholder-color);
  }

  .segment:focus {
    background: var(--syn-date-picker-color-range);
    color: var(--syn-input-color-focus);
    outline: none;
  }

  .segment:focus-visible {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  .select__clear {
    background: none;
    border: none;
    color: var(--syn-input-icon-icon-clearable-color);
    cursor: pointer;
    display: flex;
    font: inherit;
    padding: var(--syn-spacing-2x-small);
  }

  .segment-literal {
    user-select: none;
    white-space: pre;
  }

  .sr-only,
  .value-input {
    /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
  }

  .date-picker__expand-button {
    align-items: center;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    font: inherit;
    padding-inline: var(--syn-spacing-small);
  }

  .date-picker__expand-button:disabled {
    cursor: not-allowed;
  }

  .date-picker__expand-button:focus {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  /* Expand icon */
  .date-picker__expand-icon {
    align-items: center;
    color: var(--syn-color-neutral-950);
    display: flex;
    flex: 0 0 auto;
    font-size: var(--syn-select-expand-icon-font-size);
    margin-inline: var(--input-suffix-margin-inline);
  }

  /* Popup calendar wrapper */
  .calendar-wrapper {
    background: var(--syn-panel-background-color);
    border-radius: var(--syn-input-border-radius-medium);
    box-shadow: var(--syn-shadow-medium);
    display: block;
  }
`;
