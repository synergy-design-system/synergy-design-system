/* eslint-disable @typescript-eslint/unbound-method */
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { property, state } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import SynergyElement from '../../internal/synergy-element.js';
import { HasSlotController } from '../../internal/slot.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './header.styles.js';
import SynIcon from '../icon/icon.js';
import type SynSideNav from '../side-nav/side-nav.component.js';
import { LocalizeController } from '../../utilities/localize.js';
import { watch } from '../../internal/watch.js';

/**
 * @summary The <syn-header /> element provides a generic application header
 * that can be used to add applications name, toolbar and primary navigation.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-header--docs
 * @status stable
 * @since 1.10.0
 *
 * @slot - The label for the header.
 * @slot logo - The logo that should be displayed. Will fall back to the SICK logo if not provided.
 * @slot meta-navigation - The meta-navigation is used to add various application toolbar icons.
 *                     Best used with `<syn-icon-button />` and `<syn-drop-down />`
 * @slot navigation - This slot can be used to add an optional horizontal navigation
 * @slot show-burger-menu - An icon to use in lieu of the default show burger menu icon
 * @slot hide-burger-menu - An icon to use in lieu of the default hide burger menu icon
 *
 * @event syn-burger-menu-show - Emitted when the burger menu button is toggled to visible
 * @event syn-burger-menu-hide - Emitted when the burger menu button is toggled to not visible
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The wrapper most content items reside
 * @csspart logo - The wrapper the application logo resides in
 * @csspart label - The element wrapping the application name
 * @csspart meta-navigation - The Item wrapping the optional application menu
 * @csspart navigation - The wrapper that is holding the optional top navigation section
 * @csspart burger-menu-toggle-button - The button that toggles the burger menu
 */
export default class SynHeader extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  static dependencies = {
    'syn-icon': SynIcon,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'logo', 'label', 'meta-navigation', 'navigation');

  private readonly localize = new LocalizeController(this);

  /**
   * Internal mutation observer
   */
  private mutationObserver: MutationObserver;

  /**
   * The headers label. If you need to display HTML, use the `default` slot instead.
   */
  @property() label = '';

  /**
   * Adds a button to toggle the burger menu's visibility.
   * The button is added automatically, if the component finds a syn-side-nav in non-rail mode.
   */
  @property({ attribute: 'show-burger-menu', reflect: true, type: Boolean }) showBurgerMenu = false;

  /**
   * Determines whether or not the burger menu is currently visible.
   */
  @property({ attribute: 'burger-menu-visible', reflect: true, type: Boolean }) burgerMenuVisible = false;

  /**
   * The side nav
   */
  @state() private sideNav: SynSideNav | null;

  private handleBurgerMenuToggle() {
    // If there is a side-nav in non-rail mode, toggle the open state!
    if (this.sideNav && !this.sideNav.rail) {
      this.sideNav.open = !this.sideNav.open;
    }
    this.burgerMenuVisible = !this.burgerMenuVisible;
  }

  private updateBurgerMenuBasedOnSideNav() {
    // The side-nav has a higher priority than when the burger menu toggle and visibility
    // is set via property
    if (this.sideNav) {
      this.showBurgerMenu = !this.sideNav.rail;
      this.burgerMenuVisible = !this.sideNav.rail ? this.sideNav.open : false;
    }
  }

  @watch('burgerMenuVisible', { waitUntilFirstUpdate: true })
  handleBurgerMenuVisible() {
    this.emit(this.burgerMenuVisible ? 'syn-burger-menu-show' : 'syn-burger-menu-hide');
  }

  connectedCallback() {
    super.connectedCallback();

    this.mutationObserver = new MutationObserver(() => this.updateBurgerMenuBasedOnSideNav());
  }

  firstUpdated() {
    // Search for a side-nav and use the first found in case of the connectSideNavigation method
    // is not used by the user.
    const sideNav = document.querySelector('syn-side-nav')!;
    this.connectSideNavigation(sideNav);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    //  Remove observer
    this.mutationObserver.disconnect();
  }

  /**
   * Connect a `syn-side-nav` to add automatic interaction of the header with the side navigation
   * like showing the burger menu icon and open / close handling.
   *
   * If no side navigation is connected, the header will use the first `syn-side-nav` element it
   * finds.
   *
   * @param sideNav The side navigation to connect to the header
   */
  connectSideNavigation(sideNav: SynSideNav) {
    this.mutationObserver.disconnect();

    this.sideNav = sideNav || document.querySelector('syn-side-nav');
    if (this.sideNav) {
      // Need to call the method initially, if the side-nav is not open on connect time.
      // Otherwise the mutation observer won`t trigger the method.
      this.updateBurgerMenuBasedOnSideNav();
      this.mutationObserver.observe(this.sideNav, { attributeFilter: ['open', 'rail'], attributes: true });
    }
  }

  render() {
    const hasNavigation = this.hasSlotController.test('navigation');

    return html`
      <header
        class=${classMap({
          header: true,
          'header--has-burger-menu': this.showBurgerMenu,
          'header--has-navigation': hasNavigation,
        })}
        part="base"
      >
        <!-- .header__content -->
        <div part="content" class="header__content">

          ${this.showBurgerMenu
              ? html`
                  <button
                    part="burger-menu-toggle-button"
                    class="header__burger-menu-toggle"
                    type="button"
                    @click=${this.handleBurgerMenuToggle}
                    aria-label=${this.localize.term(this.burgerMenuVisible ? 'closeMenu' : 'openMenu')}
                  >
                    ${this.burgerMenuVisible
                      ? html`
                          <slot name="show-burger-menu">
                            <syn-icon name="x-lg" library="system"></syn-icon>
                          </slot>
                        `
                      : html`
                          <slot name="hide-burger-menu">
                            <syn-icon name="menu" library="system"></syn-icon>
                          </slot>
                        `}
                  </button>
                `
              : ''}

          <div part="logo" class="header__logo">
            <slot name="logo">
              <syn-icon name="logo-color" library="system" label="SICK Sensor Intelligence"></syn-icon>
            </slot>
          </div>

          <div part="label" class="header__label">
            <slot>
              ${this.label}
            </slot>
          </div>

          <div part="meta-navigation" class="header__meta-navigation">
            <slot name="meta-navigation"></slot>
          </div>
        </div>
        <!-- /.header__content -->

        <div part="navigation" class="header__navigation">
          <slot name="navigation"></slot>
        </div>
      </header>
    `;
  }
}
