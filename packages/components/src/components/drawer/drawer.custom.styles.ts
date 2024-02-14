import { css } from 'lit';

export default css`
  :host {
    --body-spacing: var(--syn-spacing-medium) var(--syn-spacing-large);
    --footer-spacing: var(--syn-spacing-medium) var(--syn-spacing-large) var(--syn-spacing-large);
  }

  .drawer__panel {
    border: 1px solid var(--syn-color-neutral-300);
    box-shadow: none;
    color: var(--syn-color-neutral-950);
  }

  /*
   * The border of the panel is always placed in direction to the content,
   * depending on the position of the drawer itself
   */
  :host([placement="end"]) .drawer__panel {
    border-width: 0 0 0 1px;
  }

  :host([placement="start"]) .drawer__panel {
    border-width: 0 1px 0 0;
  }

  :host([placement="top"]) .drawer__panel {
    border-width: 1px 0 0;
  }

  :host([placement="bottom"]) .drawer__panel {
    border-width: 0 0 1px;
  }

  .drawer__header-actions {
    align-items: flex-end;
    padding-right: var(--syn-spacing-x-small);
  }

  .drawer__title {
    font-family: var(--syn-font-sans);
    font-size: var(--syn-font-size-x-large);
    font-weight: var(--syn-font-weight-bold);
    line-height: var(--syn-line-height-normal);
    padding-bottom: 0;
  }

  .drawer__header-actions syn-icon-button,
  .drawer__header-actions ::slotted(syn-icon-button) {
    font-size: var(--syn-font-size-x-large);
  }
`;
