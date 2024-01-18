import { css } from 'lit';

export default css`
  :host {
    --display-divider: block;
  }

  .optgroup--divider {
    --spacing: var(--syn-spacing-x-small);

    display: var(--display-divider);
  }

  .optgroup__label-container {
    align-items: center;
    box-sizing: border-box;
    color: var(--syn-color-neutral-950);
    display: flex;
    gap: var(--syn-spacing-small);
    padding-block: var(--syn-spacing-small);
    padding-inline: var(--syn-spacing-medium);
  }

  /**
   * Format main label
   */
  .optgroup__label-content,
  .optgroup--has-label .optgroup__label::slotted(*) {
    flex: 1;
    font-family: var(--syn-font-sans);
    font-size: var(--syn-font-size-medium);
    font-weight: var(--syn-font-weight-semibold);
    line-height: var(--syn-line-height-normal);
  }

  .optgroup__prefix,
  .optgroup__suffix {
    color: var(--syn-color-neutral-950);
    font-size: var(--syn-spacing-large);
  }
`;
