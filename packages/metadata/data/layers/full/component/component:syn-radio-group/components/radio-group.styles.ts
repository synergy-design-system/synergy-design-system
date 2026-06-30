import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  :host([data-user-invalid]) {
    --syn-input-border-color: var(--syn-input-border-color-focus-error);
    --syn-input-border-color-hover: var(--syn-input-border-color-focus-error);
    --syn-color-primary-600: var(--syn-input-border-color-focus-error);
    --syn-color-primary-900: var(--syn-color-error-900);
    --syn-color-primary-950: var(--syn-color-error-950);
    --syn-color-neutral-1000: var(--syn-input-border-color-focus-error);
    --syn-interactive-emphasis-color: var(--syn-input-border-color-focus-error);
    --syn-interactive-emphasis-color-hover: var(--syn-input-border-color-focus-error);
    --syn-interactive-emphasis-color-active: var(--syn-input-border-color-focus-error);
  }

  .form-control {
    border: none;
    margin: 0;
    padding: 0;
    position: relative;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--syn-input-required-content);
    margin-inline-start: var(--syn-input-required-content-offset);
  }

  .visually-hidden {
    border: 0;
    /* stylelint-disable-next-line property-no-deprecated */
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .form-control-input {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-x-small);
  }

  .form-control--inline .form-control-input slot {
    display: flex;
    flex-wrap: wrap;
    gap:
      var(--syn-radio-group-inline-row-gap, var(--syn-spacing-x-small))
      var(--syn-radio-group-inline-column-gap, var(--syn-spacing-medium));
  }

  .form-control--inline .form-control-input slot::slotted(syn-radio),
  .form-control--inline .form-control-input slot::slotted(syn-radio-button) {
    flex-basis: 100%;
    min-width: 100%;
  }

  /**
   * Picked up from the fieldset component to ensure that radio groups inside a fieldset with a dense item spacing are displayed correctly.
   */
  @container (min-width: 640px) {
    .form-control--inline .form-control-input slot::slotted(syn-radio),
    .form-control--inline .form-control-input slot::slotted(syn-radio-button) {
      flex: 1 1 calc(
        (100% - var(--syn-radio-group-inline-column-gap, var(--syn-spacing-medium))) / 2
      );
      min-width: min(18rem, 100%);
    }
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--syn-spacing-x-small);
  }
`;
