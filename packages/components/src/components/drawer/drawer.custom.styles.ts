import { css } from 'lit';

export default css`
  :host {
    /**
     * Used as the default padding for the drawer title
     */
    --header-spacing: var(--syn-spacing-large) var(--syn-spacing-x-small) 0 var(--syn-spacing-large);

    /**
     * Defines the default body spacing
     */
    --body-spacing: var(--syn-spacing-medium) var(--syn-spacing-large);

    /**
     * Defines the default footer spacing
     */
    --footer-spacing: var(--syn-spacing-medium) var(--syn-spacing-large) var(--syn-spacing-large);
  }

  /**
   * Synergy uses a border to distinguish the drawer from its background and
   * removes the default shoelace shadow completely
   */
  .drawer__panel {
    border: 0 solid var(--syn-color-neutral-300);
    box-shadow: none;
    color: var(--syn-color-neutral-950);
  }

  /*
   * The border of the panel is always placed in direction to the content,
   * depending on the position of the drawer itself
   */
  :host([placement="end"]) .drawer__panel {
    border-left-width: 1px;
  }

  :host([placement="start"]) .drawer__panel {
    border-right-width: 1px;
  }

  :host([placement="top"]) .drawer__panel {
    border-bottom-width: 1px;
  }

  :host([placement="bottom"]) .drawer__panel {
    border-top-width: 1px;
  }

  .drawer__header-actions {
    align-items: flex-end;
    gap: var(--syn-spacing-x-small);
    padding: 0 var(--syn-spacing-x-small) 0 0;
  }

  .drawer__title {
    font-family: var(--syn-font-sans);
    font-size: var(--syn-font-size-x-large);
    font-weight: var(--syn-font-weight-bold);
    line-height: var(--syn-line-height-normal);
  }

  /**
   * We need this to make sure we are big enough as defined in the layout
   * When omitting this statement, we will get rounding problems via line-height
   */
  .drawer__title,
  .header-actions {
    min-height: 64px;
  }

  .drawer__header-actions syn-icon-button,
  .drawer__header-actions ::slotted(syn-icon-button) {
    color: var(--syn-color-neutral-950);
    font-size: var(--syn-font-size-x-large);
  }
`;
