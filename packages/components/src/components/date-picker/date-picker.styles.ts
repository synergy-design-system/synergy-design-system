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
  }

  .segment--empty {
    color: var(--syn-input-placeholder-color);
  }

  .segment:focus-visible {
    background: var(--syn-color-primary-100);
    color: var(--syn-color-input-text);
    outline: none;
  }

  .segment-literal {
    user-select: none;
    white-space: pre;
  }

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
`;
