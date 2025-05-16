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
 * @slot label - The label for the header
 * @slot logo - The logo that should be displayed. Will fall back to the SICK logo if not provided
 * @slot meta-navigation - The meta-navigation is used to add various application toolbar icons
 *                     Best used with `<syn-icon-button />` and `<syn-drop-down />`
 * @slot navigation - This slot can be used to add an optional horizontal navigation
 * @slot open-burger-menu-icon - An icon to use in lieu of the default burger-menu=open state.
 *                      The default close icon is a 'x'.
 * @slot closed-burger-menu-icon - An icon to use in lieu of the default burger-menu=closed state.
 *                      The default open icon is a burger menu.
 *
 * @event syn-burger-menu-closed - Emitted when the burger menu is toggled to closed
 * @event syn-burger-menu-hidden - Emitted when the burger menu is toggled to hidden
 * @event syn-burger-menu-open - Emitted when the burger menu is toggled to open
 *
 * @csspart base - The component's base wrapper
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
   * The headers label. If you need to display HTML, use the `label` slot instead.
   */
  @property() label = '';

  /**
   * Defines the current visibility and icon of the burger-menu icon.
   * The menu button is added automatically if the component finds a syn-side-nav in
   * variant="default".
   * The following values can be used:
   * - hidden: The burger menu is not visible
   * - open: The burger menu is visible and shows the close icon
   * - closed: The burger menu is visible and shows the open icon
   */
  @property({ attribute: 'burger-menu', reflect: true }) burgerMenu: 'hidden' | 'open' | 'closed' = 'hidden';

  /**
   * The side nav
   */
  @state() private sideNav: SynSideNav | null;

  private toggleBurgerMenu() {
    switch (this.burgerMenu) {
    case 'closed': this.burgerMenu = 'open'; break;
    case 'open': this.burgerMenu = 'closed'; break;
    default: break;
    }
  }

  private handleBurgerMenuToggle() {
    // If there is a side-nav in variant="default", toggle the open state!
    if (this.sideNav && this.sideNav.variant === 'default') {
      this.sideNav.open = !this.sideNav.open;
    }
    this.toggleBurgerMenu();
  }

  /**
   * Automatically update the burger menu icon based
   * on the state of the side-nav, if one is connected.
   */
  private updateBurgerMenuBasedOnSideNav() {
    if (this.sideNav) {
      // Hide the burger menu icon if the side-nav is not variant="default"
      if (this.sideNav.variant !== 'default') {
        this.burgerMenu = 'hidden';
      } else {
        this.burgerMenu = this.sideNav.open ? 'open' : 'closed';
      }
    }
  }

  @watch('burgerMenu', { waitUntilFirstUpdate: true })
  handleBurgerMenu() {
    const myEvt: keyof GlobalEventHandlersEventMap = `syn-burger-menu-${this.burgerMenu}`;
    this.emit(myEvt);
  }

  connectedCallback() {
    super.connectedCallback();

    this.mutationObserver = new MutationObserver(() => this.updateBurgerMenuBasedOnSideNav());
  }

  firstUpdated() {
    // Search for a side-nav and use the first found in case of the connectSideNavigation method
    // is not used by the user.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.updateComplete.then(() => {
      const sideNav = document.querySelector('syn-side-nav');
      this.connectSideNavigation(sideNav);
    });
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
  connectSideNavigation(sideNav: SynSideNav | null) {
    this.mutationObserver.disconnect();

    this.sideNav = sideNav || document.querySelector('syn-side-nav');
    if (this.sideNav) {
      // Need to call the method initially, if the side-nav is not open on connect time.
      // Otherwise the mutation observer won`t trigger the method.
      this.updateBurgerMenuBasedOnSideNav();
      this.mutationObserver.observe(this.sideNav, { attributeFilter: ['open', 'variant'], attributes: true });
    }
  }

  render() {
    const hasNavigation = this.hasSlotController.test('navigation');
    const showBurgerMenu = this.burgerMenu !== 'hidden';
    return html`
      <header
        class=${classMap({
          header: true,
          'header--has-burger-menu': showBurgerMenu,
          'header--has-navigation': hasNavigation,
        })}
        part="base"
      >
        <!-- .header__content -->
        <div part="content" class="header__content">

          ${showBurgerMenu
              ? html`
                  <button
                    aria-label=${this.localize.term(this.burgerMenu === 'closed' ? 'openMenu' : 'closeMenu')}
                    class="header__burger-menu-toggle"
                    @click=${this.handleBurgerMenuToggle}
                    part="burger-menu-toggle-button"
                    type="button"
                  >
                    ${this.burgerMenu === 'open'
                      ? html`
                          <slot name="open-burger-menu-icon">
                            <syn-icon name="x-lg" library="system"></syn-icon>
                          </slot>
                        `
                      : html`
                          <slot name="closed-burger-menu-icon">
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
            <slot name="label">
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
