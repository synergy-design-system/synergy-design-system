import { css } from 'lit';

export default css`
  :host {
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
   * - meta-navigation
   */
  .header__content {
    align-items: center;
    box-sizing: content-box;
    display: flex;
    min-height: 40px;
    padding: var(--syn-spacing-large);
  }

  /**
   * If the primary navigation is provided, use a smaller spacing
   * between the primary content area and the navigation area
   */
  .header--has-navigation .header__content {
    padding-bottom: var(--syn-spacing-medium);
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
  .header__meta-navigation {
    display: flex;
    flex: 1;
    gap: var(--syn-spacing-x-small);
    justify-content: end;
  }

  .header__meta-navigation ::slotted(*) {
    display: contents;
    font-size: var(--syn-font-size-x-large);
  }

  .header__navigation {
    padding: 0 var(--syn-spacing-large);
  }
`;
