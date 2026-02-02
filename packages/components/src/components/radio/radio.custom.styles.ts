import { css } from 'lit';

export default css`
  :host(:focus-visible) .radio__control {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-width);
  }

  .radio {
    align-items: flex-start;
  }

  /** #429: Use token for opacity */
  .radio--disabled { 
    opacity: var(--syn-input-disabled-opacity);
  }

  /* Checked */
  /* stylelint-disable-next-line no-descending-specificity */
  .radio--checked .radio__control {
    background-color: var(--syn-interactive-emphasis-color);
    border-color: var(--syn-interactive-emphasis-color);
  }

  /* Reset original hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    background: inherit;
    border-color: inherit;
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled):hover .radio__control  {
    background-color: var(--syn-interactive-emphasis-color-hover);
    border-color: var(--syn-interactive-emphasis-color-hover);
  }

  /* Checked + active */
  .radio.radio--checked:not(.radio--disabled):active .radio__control  {
    background-color: var(--syn-interactive-emphasis-color-active);
    border-color: var(--syn-interactive-emphasis-color-active);
  }

  /* Not-Checked + Hover */
  .radio:not(.radio--checked):not(.radio--disabled):hover .radio__control {
    border-color: var(--syn-input-border-color-hover);
  }

  /* Not-Checked + active */
  .radio:not(.radio--checked):not(.radio--disabled):active .radio__control {
    border-color: var(--syn-input-border-color-active);
  }

  /* Fix#456: Multi line radio fixes */
  .radio__label {
    align-self: center;
    margin-inline-start: var(--syn-spacing-x-small);
    margin-top: -1px;
  }

  .radio--small .radio__label {
    font: var(--syn-body-small-regular);
  }

  .radio--medium .radio__label {
    font: var(--syn-body-medium-regular);
  }

  .radio--large .radio__label {
    font: var(--syn-body-large-regular);
  }

  /* /Fix#456 */

  /**
   * #920: The new icons are instances in figma.
   * The width of the system icon is 12px x 12px, so there is no inner padding.
   * To accommodate for this, we need to set the width and height of the icon to 50% to get the same result as before.
   */
  .radio__checked-icon {
    scale: 0.5;
  }

  .radio--small .radio__label, .radio--large .radio__label  {
    margin-inline-start: var(--syn-spacing-x-small);
  }
`;
