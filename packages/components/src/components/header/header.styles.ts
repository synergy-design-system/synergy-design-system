import { css } from 'lit';

export default css`
  :host {
    /* @todo: Debug only, remove this when ready! */
    box-shadow: 0 0 0 15px #efefef;
    display: block;
  }

  .header {
    background: var(--syn-color-neutral-0);
    box-shadow: inset 0 -1px 0 0 var(--syn-color-neutral-400);
  }

  /**
   * The primary content area displays one to many slotted items
   * and contains the following items:
   * - side nav state icon (OPTIONAL)
   * - company or application logo
   * - application name
   * - option-menu
   */
  .primary-content-area {
    align-items: center;
    box-sizing: content-box;
    display: flex;
    min-height: 40px;
    padding: var(--syn-spacing-large);
  }

  /**
   * If the top navigation is provided, use a smaller spacing
   * between the primary content area and the top navigation
   */
  .header--has-top-navigation .primary-content-area {
    padding-bottom: var(--syn-spacing-medium);
  }

  /**
   * The optional side navigation control will be displayed as the most left item
   */
  .header__side-navigation-button {
    padding-right: var(--syn-spacing-small);
  }

  /**
   * The menu icon button should not have extra spacing on the left side
   * to better align it with the boundaries of the header component.
   */
  .header__side-navigation-button syn-icon-button::part(base) {
    padding-left: 0;
  }

  /**
   * The logo slot includes the application or company logo
   */
  .header__logo ::slotted(*),
  .header__logo svg {
    display: block;
  }

  /**
   * Styles for the default logo.
   * @todo: Will have to be adjusted after using <syn-icon />
   */
  .header__logo svg {
    max-height: 32px;
    width: auto;
  }

  /**
   * The label section hosts the application name
   */
  .header__label {
    font: var(--syn-body-large-bold);
    padding: 0 var(--syn-spacing-2x-large);
  }

  /**
   * The options menu holds an arbitary list of <syn-icon-button />
   */
  .header__option-menu {
    display: flex;
    flex: 1;
    gap: var(--syn-spacing-x-small);
    justify-content: end;
  }

  .header__option-menu ::slotted(*) {
    display: contents;
    font-size: var(--syn-font-size-x-large);
  }

  /**
   * The top navigation is displayed underneath the primary content area
   * @todo: This is currently disabled
   */
  .header__top-navigation {
    display: none;
  }
`;
