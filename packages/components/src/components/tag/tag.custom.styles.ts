import { css } from 'lit';

export default css`
  .tag {
    border-color: var(--syn-color-neutral-400);
    color: var(--syn-input-color);
  }

  .tag:hover .tag__remove {
    color: var(--syn-input-icon-color-hover);
  }

  .tag--small.tag--removable {
    padding-inline-end: var(--syn-spacing-2x-small);
  }

  .tag--medium.tag--removable {
    padding-inline-end: var(--syn-spacing-x-small);
  }

  .tag--large.tag--removable {
    padding-inline-end: var(--syn-spacing-small);
  }

  .tag--medium .tag__remove {
    margin-inline-start: var(--syn-spacing-small);
  }

  .tag--large .tag__remove {
    margin-inline-start: var(--syn-spacing-medium);
  }

  .tag.tag--removable:focus ~ .tag__remove {
    border: solid 1px var(--syn-color-primary-500);
  }

  .tag--small {
    font-size: var(--syn-font-size-small);
    height: var(--syn-font-size-x-large);
  }

  .tag--medium {
    font-size: var(--syn-font-size-small);
    height: var(--syn-font-size-2x-large);
  }

  .tag--large {
    font-size: var(--syn-font-size-medium);
    height: var(--syn-font-size-3x-large);
  }

  .tag--small ::slotted(syn-icon) {
    padding-right: var(--syn-spacing-x-small);
  }

  .tag--medium ::slotted(syn-icon) {
    margin-inline-end: var(--syn-spacing-x-small);
  }

  .tag--large ::slotted(syn-icon) {
    margin-inline-end: var(--syn-spacing-x-small);
  }

`;
