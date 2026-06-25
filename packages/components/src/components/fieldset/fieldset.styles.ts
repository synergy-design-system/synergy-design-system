import { css } from 'lit';

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
  }

  .fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  .legend {
    font: var(--syn-heading-large);
    margin-bottom: var(--syn-spacing-large);
  }

  .description {
    font-size: var(--syn-font-size-medium);
    margin: 0 0 var(--syn-font-size-large);
  }

  .fields {
    align-items: end; /* Todo: Test if this is really what we want! */
    container-type: inline-size;
    display: flex;
    flex-flow: wrap;
    flex-direction: row;
    gap: var(--item-gap);
    margin-bottom: var(--item-gap);
  }

  .fields ::slotted(*) {
    flex-basis: 100%;
  }

  @container (min-width: 640px) {
    .fields--two-columns ::slotted(*) {
      flex-basis: calc((100% - (var(--item-gap) * (var(--items-per-row) - 1))) / var(--items-per-row));
    }
  }
`;
