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
import { watch } from '../../internal/watch.js';
import { LocalizeController } from '../../utilities/localize.js';

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
   * The headers label. If you need to display HTML, use the `default` slot instead.
   */
  @property() label = '';

  /**
   * Adds a button to toggle the burger menu's visibility.
   * The button is added automatically, if the component finds a syn-side-nav in non-rail mode.
   */
  @property({ attribute: 'burger-menu-toggle', type: Boolean }) burgerMenuToggle = false;

  /**
   * Determines whether or not the burger menu is currently visible.
   */
  @property({ attribute: 'burger-menu-visible', type: Boolean }) burgerMenuVisible = false;

  /**
   * The selector for the side nav, so the header can find the side nav via querySelector
   * and add automatic burger menu icon and toggle handling.
   *
   * If no selector is provided, the header will use the first `syn-side-nav` element it finds.
   */
  @property({ attribute: 'side-nav-selector' }) sideNavSelector = '';

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

  /**
   * Request render update in case of the side-nav was closed / opened
   */
  private handleSideNavStateChange() {
    this.requestUpdate();
  }

  private addSideNavListener() {
    this.sideNav?.addEventListener('syn-show', () => this.handleSideNavStateChange());
    this.sideNav?.addEventListener('syn-hide', () => this.handleSideNavStateChange());
  }

  private removeSideNavListener() {
    this.sideNav?.removeEventListener('syn-show', () => this.handleSideNavStateChange());
    this.sideNav?.removeEventListener('syn-hide', () => this.handleSideNavStateChange());
  }

  @watch('sideNavSelector')
  handleSideNavSelectorChange() {
    this.removeSideNavListener();
    this.sideNav = document.querySelector(this.sideNavSelector || 'syn-side-nav');
    this.addSideNavListener();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    //  Remove listeners
    this.removeSideNavListener();
  }

  // eslint-disable-next-line complexity
  render() {
    // The side-nav has a higher priority than when the burger menu toggle and visibility
    // is set via property
    const showBurgerMenu = (this.sideNav && !this.sideNav.rail) || this.burgerMenuToggle;
    const burgerMenuVisibility = (this.sideNav && !this.sideNav.rail)
      ? this.sideNav.open : this.burgerMenuVisible;

    const hasNavigation = this.hasSlotController.test('navigation');

    return html`
      <header
        class=${classMap({
          header: true,
          'header--has-burger-menu': this.burgerMenuToggle,
          'header--has-navigation': hasNavigation,
        })}
        part="base"
      >
        <!-- .header__content -->
        <div part="content" class="header__content">

          ${showBurgerMenu
              ? html`
                  <button
                    part="burger-menu-toggle-button"
                    class="header__burger-menu-toggle"
                    type="button"
                    @click=${this.handleBurgerMenuToggle}
                    aria-label=${this.localize.term(this.burgerMenuVisible ? 'closeMenu' : 'openMenu')}
                  >
                  <!-- TODO: Exchange burger menu icons with the correct ones as soon as they are available as system icons -->
                    ${burgerMenuVisibility
                      ? html`
                          <slot name="show-burger-menu">
                            <syn-icon name="add" library="system"></syn-icon>
                          </slot>
                        `
                      : html`
                          <slot name="hide-burger-menu">
                            <syn-icon name="indeterminate" library="system"></syn-icon>
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
