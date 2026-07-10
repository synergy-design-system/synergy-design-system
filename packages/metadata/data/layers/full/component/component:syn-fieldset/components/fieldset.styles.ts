import { css } from 'lit';
import { FIELDSET_TWO_COLUMN_BREAKPOINT } from './constants.js';

export default css`
  :host {
    /*
     * The amount of items per row.
     * This is used to calculate the width of the items in the fieldset when not using stacked layout.
     * Defaults to 2.
     */
    --items-per-row: 2;

    /**
     * The gap between the fields in the fieldset.
     */
    --item-gap: var(--syn-spacing-large);

    display: block;
  }

  .fieldset {
    border: none;
    color: var(--syn-typography-color-text);
    margin: 0;
    padding: 0;
  }

  .legend {
    display: block;
    font: var(--syn-heading-large);
    margin-bottom: var(--syn-spacing-large);
    padding: 0;
    width: 100%;
  }

  .description {
    font: var(--syn-body-medium-regular);
    margin: 0 0 var(--syn-spacing-large);
  }

  .fieldset--has-description.fieldset--has-legend .legend {
    margin-bottom: var(--syn-spacing-medium);
  }

  .fields {
    align-items: start;
    container-type: inline-size;
    display: flex;
    flex-flow: wrap;
    flex-direction: row;
    gap: var(--item-gap);
  }

  .fields ::slotted(*) {
    flex-basis: 100%;
  }

  @container (min-width: ${FIELDSET_TWO_COLUMN_BREAKPOINT}px) {
    .fields--two-columns ::slotted(*) {
      flex-basis: calc((100% - (var(--item-gap) * (var(--items-per-row) - 1))) / var(--items-per-row));
    }
  }
`;
