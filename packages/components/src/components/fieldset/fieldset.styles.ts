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
     * The gap between the fields in the fieldset when using normal layout.
     */
    --item-gap-normal: var(--syn-spacing-large);

    /**
     * The gap between the fields in the fieldset when using dense layout.
     */
    --item-gap-dense: var(--syn-spacing-x-small);

    display: block;
  }

  .fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  /* Density Control */
  .fieldset--dense {
    --item-gap: var(--item-gap-dense);
  }

  .fieldset--normal {
    --item-gap: var(--item-gap-normal);
  }

  .legend {
    display: block;
    font: var(--syn-heading-large);
    margin-bottom: var(--syn-spacing-large);
    padding: 0;
    width: 100%;
  }

  .description {
    font-size: var(--syn-font-size-medium);
    margin: 0 0 var(--syn-font-size-large);
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

  @container (min-width: 640px) {
    .fields--two-columns ::slotted(*) {
      flex-basis: calc((100% - (var(--item-gap) * (var(--items-per-row) - 1))) / var(--items-per-row));
    }
  }
`;
