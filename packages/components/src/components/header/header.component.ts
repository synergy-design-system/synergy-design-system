/* eslint-disable @typescript-eslint/unbound-method */
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import SynergyElement from '../../internal/synergy-element.js';
import { HasSlotController } from '../../internal/slot.js';
import SynIconButton from '../icon-button/icon-button.component.js';
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
  static styles: CSSResultGroup = styles;

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
              SICK LOGO
            </slot>
          </div>

          <div part="label" class="header__label">
            <slot>
              ${this.label}
            </slot>
          </div>

          <div part="option-menu" class="header__option_menu">
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
