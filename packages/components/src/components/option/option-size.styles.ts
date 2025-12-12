import { css } from 'lit';

export default css`
  /**
   * Size adjustments for syn-select and other widgets that use syn-option
   * This allows to share the common settings between all components that
   * should be able to set the size of a syn-option tag.
   *
   * Also note that we have to adjust the padding to take the border size into account.
   */
  :host([size="small"]) {
    --option-inset-border-horizontal: 0;
    --option-inset-border-vertical: calc(var(--syn-spacing-2x-small) - 1px);
    --option-min-height: var(--syn-input-height-small);
    --option-padding: var(--syn-input-spacing-small);
    --option-font-size: var(--syn-input-font-size-small);
    --option-icon-size: var(--syn-spacing-medium);
  }

  :host([size="medium"]) {
    --option-inset-border-horizontal: var(--syn-spacing-2x-small);
    --option-inset-border-vertical: calc(var(--syn-spacing-x-small) - 1px);
    --option-min-height: var(--syn-input-height-medium);
    --option-padding: var(--syn-input-spacing-medium);
    --option-font-size: var(--syn-input-font-size-medium);
    --option-icon-size: var(--syn-spacing-large);
  }

  :host([size="large"]) {
    --option-inset-border-horizontal: var(--syn-spacing-2x-small);
    --option-inset-border-vertical: calc(var(--syn-spacing-x-small) - 1px);
    --option-min-height: var(--syn-input-height-large);
    --option-padding: var(--syn-input-spacing-large);
    --option-font-size: var(--syn-input-font-size-large);
    --option-icon-size: var(--syn-spacing-x-large);
  }
`;
