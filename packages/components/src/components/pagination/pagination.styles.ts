import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  .base {
    --pagination-page-size-option-char-count: 2;
    --pagination-total-pages-char-count: 3;
    --base-padding: var(--syn-spacing-medium);
    --base-gap: var(--syn-spacing-small);
    --base-font: var(--syn-body-medium-regular);
    --navigation-gap: var(--syn-spacing-small);

    align-items: center;
    display: flex;
    font: var(--base-font);
    gap: var(--base-gap);
    padding: var(--base-padding);
  }

  /* Select */
  .pagination__page-size-select::part(form-control) {
    align-items: center;
    display: flex;
    gap: var(--base-gap);
  }

  .pagination__page-size-select::part(form-control-label) {
    font: var(--base-font);
    margin-bottom: 0;
  }

  .pagination__page-size-select::part(display-input) {
    max-width: calc((var(--pagination-page-size-option-char-count) * 1ch) + 1ch);
  }

  /* Navigation */
  .pagination__navigation {
    align-items: center;
    display: flex;
    flex: 1;
    gap: var(--navigation-gap);
    justify-content: end;
    margin-inline-start: var(--base-gap);
  }

  .pagination__navigation section > * {
    display: inline-flex;
  }

  .pagination__page-input {
    margin-inline-end: var(--navigation-gap);
  }

  .pagination__page-input::part(input) {
    max-width: calc((var(--pagination-total-pages-char-count) * 1ch) + 3ch);
    text-align: center;
  }
`;
