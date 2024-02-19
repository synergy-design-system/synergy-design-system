import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  /* stylelint-disable */
  ${componentStyles}
  /* stylelint-enable */

  :host {
    display: block;
  }

  .header {
    background: var(--syn-color-neutral-0);
    border-bottom: 1px solid var(--syn-color-neutral-400);
    box-shadow: 0 0 0 5px #efefef;
    padding: var(--syn-spacing-large) var(--syn-spacing-large) 0;
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
    display: flex;
    padding-bottom: var(--syn-spacing-large);
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
  .header__logo {
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
  .header__option_menu {
    display: flex;
    flex: 1;
    justify-content: end;
    gap: var(--syn-spacing-x-small);
  }

  .header__option_menu ::slotted(*) {
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
