import { css } from 'lit';

export default css`
  :host {
    --tag-group-item-gap: var(--syn-spacing-x-small);
    --tag-group-label-gap: var(--syn-spacing-small);
    --tag-group-label-font: var(--syn-body-medium-semibold);

    display: block;
  }

  .tag-group {
    align-items: baseline;
    display: flex;
  }

  .tag-group--top {
    flex-direction: column;
    gap: var(--syn-spacing-small);
  }

  .tag-group--start {
    flex-direction: row;
    gap: var(--tag-group-label-gap);
  }

  /* Label Styles */
  .tag-group__label {
    color: var(--syn-input-label-color);
    font: var(--tag-group-label-font);
  }

  /* Tag Container */
  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tag-group-item-gap);
  }

  /* Size Modifiers */
  .tag-group--small {
    --tag-group-item-gap: var(--syn-spacing-2x-small);
    --tag-group-label-gap: var(--syn-spacing-x-small);
    --tag-group-label-font: var(--syn-body-small-semibold);
  }

  .tag-group--large {
    --tag-group-item-gap: var(--syn-spacing-small);
    --tag-group-label-gap: var(--syn-spacing-medium);
    --tag-group-label-font: var(--syn-body-large-semibold);
  }
`;
