/* eslint-disable @typescript-eslint/unbound-method */
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import SynergyElement from '../../internal/synergy-element.js';
import { HasSlotController } from '../../internal/slot.js';
import SynIconButton from '../icon-button/icon-button.component.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './header.styles.js';

/**
 * @summary The <syn-header /> element provides a generic application header
 * that can be used to add applications name, toolbar and primary navigation.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-header--docs
 * @status stable
 * @since 1.8.0
 *
 * @dependency syn-icon-button
 *
 * @slot - The label for the header. Will automatically be hidden on mobile.
 * @slot logo - The logo that should be displayed. Will fall back to the SICK logo if not applied.
 * @slot option-menu - Used to add various application toolbar icons.
 *                     Best used with `<syn-icon-button />` and `<syn-drop-down />`
 * @slot top-navigation - Used to add an optional horizontal navigation
 *
 * @csspart base - The component's base wrapper.
 * @csspart side-navigation-button - Can be used to apply styles to the side-navigation menu icon
 * @csspart logo - The wrapper where the application logo resides in
 * @csspart label - Wrapper of the application name label
 * @csspart option-menu - Item that wraps the optional application menu
 * @csspart top-navigation - Wrapper that holds the optional top navigation section
 */
export default class SynHeader extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  static dependencies = {
    'syn-icon-button': SynIconButton,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'logo', 'label', 'option-menu', 'top-navigation');

  /**
   * Can be used to indicate the state of a connected `<syn-side-navigation />`
   * Please be aware that this is __NOT functional__ yet and the full version will only be
   * __available after initial release of this component__!
   */
  @property({ attribute: 'side-navigation' }) sideNavigation: 'open' | 'closed';

  /**
   * The headers label. If you need to display HTML, use the `label` slot instead.
   */
  @property() label = '';

  /**
   * Label that should be used for the side navigation menu when it is in closed state
   */
  @property({ attribute: 'menu-label-closed' }) menuLabelClosed = 'Open Menu';

  /**
   * Label that should be used for the side navigation menu if it is in open state
   */
  @property({ attribute: 'menu-label-opened' }) menuLabelOpened = 'Close Menu';

  render() {
    const isSideNavEnabled = !!this.sideNavigation;
    const hasTopNavigation = this.hasSlotController.test('top-navigation');

    return html`
      <header
        class=${classMap({
          header: true,

          // Side navigation status
          'header--has-side-navigation': isSideNavEnabled,
          'header--has-side-navigation-closed': this.sideNavigation === 'closed',
          'header--has-side-navigation-open': this.sideNavigation === 'open',

          // Is the top navigation available?
          'header--has-top-navigation': hasTopNavigation,
        })}
        part="header"
      >
        <!-- .primary-content-area -->
        <div part="primary-content-area" class="primary-content-area">

          <!-- .header__side-navigation-button -->
          ${isSideNavEnabled
            ? html`
              <div part="side-navigation-button" class="header__side-navigation-button">
                <syn-icon-button
                  color="neutral"
                  name=${this.sideNavigation === 'open' ? 'close' : 'menu'}
                  label=${this.sideNavigation === 'open' ? this.menuLabelOpened : this.menuLabelClosed}
                  size="medium"
                ></syn-icon-button>
              </div>
            `
            : ''
          }
          <!-- /.header__side-navigation-button -->

          <div part="logo" class="header__logo">
            <slot name="logo">
              <!-- @todo: Use syn-icon for this! -->
              <svg width="295" height="94" viewBox="0 0 295 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_41_4080)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M207.961 69.0591C200.132 83.8898 184.613 93.983 166.804 93.983C141.096 93.983 120.257 72.9431 120.257 46.9915C120.257 21.0399 141.096 0 166.804 0C184.439 0 199.775 9.89295 207.674 24.4885L188.602 34.7821C184.335 26.9182 176.088 21.6757 166.804 21.6757C153.262 21.6757 141.932 32.8139 141.932 46.9915C141.932 61.1691 153.262 72.3074 166.804 72.3074C176.279 72.3074 184.726 66.8558 188.907 58.7133L207.961 69.0591ZM111.078 1.66335H89.7768V91.8668H111.078V1.66335ZM26.0822 91.8669C13.9511 91.8669 0.592136 85.318 0.592136 70.1128C0.592136 70.1128 47.1743 70.1128 54.5941 70.1215C62.4927 68.5453 61.6132 58.5826 54.5941 57.2067H26.8746C12.1223 57.2067 0.444092 44.6141 0.444092 29.6092C0.444092 15.1791 11.234 1.67206 26.8746 1.67206H57.285C69.8254 1.67206 78.7778 11.0599 78.7778 22.9645H26.8746C19.8991 23.9573 19.4549 34.6602 26.8746 35.8707H54.5157C69.6773 36.28 81.7735 48.3501 81.7735 63.6336C81.7735 77.7154 69.8254 91.8669 54.5853 91.8669H26.0822ZM215.99 91.8668V1.66335H237.535V37.8388H245.826L268.224 1.66335H294.716L264.192 47.3399L294.272 91.8668H267.771L245.103 56.9193H237.535V91.8668H215.99Z" fill="#007CC1"/>
                </g>
                <defs>
                  <clipPath id="clip0_41_4080">
                  <rect width="295" height="94" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </slot>
          </div>

          <div part="label" class="header__label">
            <slot>
              ${this.label}
            </slot>
          </div>

          <div part="option-menu" class="header__option-menu">
            <slot name="option-menu"></slot>
          </div>
        </div>
        <!-- /.primary-content-area -->

        <div part="top-navigation" class="header__top-navigation">
          <slot name="top-navigation"></slot>
        </div>
      </header>
    `;
  }
}
