import { classMap } from 'lit/directives/class-map.js';
import type { CSSResultGroup } from 'lit';
import { html } from 'lit/static-html.js';
import { property, query, state } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './side-nav.styles.js';
import SynDrawer from '../drawer/drawer.component.js';
import type SynNavItem from '../nav-item/nav-item.component.js';
import SynDivider from '../divider/divider.component.js';
import type { SynRequestCloseEvent } from '../../events/events.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import { setAnimation } from '../../utilities/animation-registry.js';

type NavMode = 'fix' | 'rail' | 'shrink';

/**
 * @summary The <syn-side-nav /> element contains secondary navigation and fits below the header.
 *
 * @status stable
 * @since 1.11.0
 *
 * @dependency syn-divider
 * @dependency syn-drawer
 *
 * @slot - The main content of the side-nav. Used for <syn-nav-item /> elements.
 * @slot footer - The footer content of the side-nav. Used for <syn-nav-item /> elements.
 *    Please avoid having to many nav-items as it can massively influence the user experience.
 *
 * // TODO: what about the other two events? Do we want them also exposed?
 *     And do we want the css-properties of the drawer be exposed?
 * @event syn-show - Emitted when the drawer opens.
 * @event syn-after-show - Emitted after the drawer opens and all animations are complete.
 * @event syn-hide - Emitted when the drawer closes.
 * @event syn-after-hide - Emitted after the drawer closes and all animations are complete.
 *
 * @csspart base - The components base wrapper
 * @csspart drawer - The drawer that is used under the hood for creating the side-nav
 * @csspart content-container - The components main content container
 * @csspart content - The components main content
 * @csspart footer-container - The components footer content container
 * @csspart footer-divider - The components footer divider
 * @csspart footer - The components footer content
 *
 */
export default class SynSideNav extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-divider': SynDivider,
    'syn-drawer': SynDrawer,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'footer');

  private isInitial: boolean = true;

  /**
   * Reference to the default slot.
   */
  @query('slot:not([name])') private defaultSlot: HTMLSlotElement;

  /**
   * Reference to the footer slot.
   */
  @query('slot[name="footer"]') private footerSlot: HTMLSlotElement;

  /**
   * Reference to the drawer
   */
  @query('.side-nav__drawer') private drawer: SynDrawer;

  /**
   * State if all nav-items have a prefix icon.
   */
  @state() private hasPrefixIcons = false;

  /**
   * Indicates whether or not the side-nav is open.
   * You can toggle this attribute to show and hide the side-nav, or you can use the `show()` and
   * `hide()` methods and this attribute will reflect the side-nav's open state.
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /**
   * Different side-nav modes.
   *
   * __Fixed mode (default):__
   *
   * With `open` will show the side-nav with an overlay.
   * Without `open`, the side-nav will be hidden.
   *
   * This should always be the case, if the content of the app is not shrinking.
   * This makes especially sense for applications, where you navigate to a place and
   * stay there for a longer time.
   *
   *
   *
   * __Rail mode:__
   *
   * With `open` will show the whole side-nav with an overlay (on touch devices)
   * or without an overlay for non-touch devices.
   * Without `open`, the side-nav will only show the prefix of nav-item's.
   *
   * Use the rail mode to only show the prefix of navigation items.
   * This will open on hover on the rail navigation.
   * On touch devices the navigation opens on click and shows an overlay.
   *
   * Note: The Rail is only an option if all Navigation Items on the first level have an Icon.
   * If this is not the case you should use a burger navigation.
   *
   *
   * __Shrink mode:__
   *
   * For specific cases it might make sense to have the navigation open
   * while still being able to interact with the app. This especially makes sense
   * for cases where you switch a lot between areas to interact with an app.
   *
   * With `open` will show the side-nav without any overlay.
   * Without `open`, the side-nav will be hidden.
   *
   */
  @property({ reflect: true }) mode: NavMode = 'fix';

  /**
   * Get all nav-items from the default and footer slot.
   */
  private getAllNavItems(): SynNavItem[] {
    const navItemsAll: SynNavItem[] = [];

    const addNavItems = (element: Element) => {
      if (element.tagName.toLowerCase() === 'syn-nav-item') {
        navItemsAll.push(element as SynNavItem);
      } else {
        // Check for first child nav-items.
        // It`s possible that they were wrapped in another element (e.g. div or nav)
        const nestedNavItems = Array.from(element.children).filter(nestedElement => (nestedElement.tagName.toLowerCase() === 'syn-nav-item')) as SynNavItem[];
        navItemsAll.push(...nestedNavItems);
      }
    };

    (this.defaultSlot?.assignedElements({ flatten: true }) || []).forEach(addNavItems);
    (this.footerSlot?.assignedElements({ flatten: true }) || []).forEach(addNavItems);

    return navItemsAll;
  }

  /**
   * This function handles the rail mode.
   * Rail mode is only valid if every nav-item has a prefix.
   */
  // eslint-disable-next-line complexity
  private handleRailMode() {
    if (this.mode !== 'rail') {
      this.querySelector('style.hide-parts-style')?.remove();
      return;
    }

    const navItems = this.getAllNavItems();

    const itemsWithPrefix = navItems.filter((navItem) => !!navItem.querySelector(':scope > [slot="prefix"]'));

    this.hasPrefixIcons = navItems.length !== 0 && itemsWithPrefix.length === navItems.length;

    // Only show shrunk rail mode, if every nav-item has prefix
    if (this.hasPrefixIcons && !this.open) {
      if (!this.querySelector('style.hide-parts-style')) {
        // if in closed rail mode, hide all nested nav-items
        const partsHideStyle = document.createElement('style');
        partsHideStyle.className = 'hide-parts-style';
        partsHideStyle.textContent = `syn-nav-item [slot="children"] {
          display: none
        }`;
        this.append(partsHideStyle);
      }
    } else {
      this.querySelector('style.hide-parts-style')?.remove();
    }
  }

  private handleMouseEnter() {
    if (this.hasPrefixIcons) {
      this.open = true;
    }
  }

  private handleMouseLeave() {
    if (this.hasPrefixIcons) {
      this.open = false;
    }
  }

  /**
   * Prevent drawer from being closed.
   * @param event - The requested close event emitted from the drawer
   */
  // eslint-disable-next-line class-methods-use-this
  private handleRequestClose(event: SynRequestCloseEvent) {
    event.preventDefault();
  }

  private addMouseListener() {
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.addEventListener('mouseenter', this.handleMouseEnter);
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.addEventListener('mouseleave', this.handleMouseLeave);
  }

  private removeMouseListener() {
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.removeEventListener('mouseenter', this.handleMouseEnter);
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  private forceDrawerVisibilityForRailMode() {
    return waitForEvent(this, 'syn-after-hide').then(() => {
      if (this.mode === 'rail') {
        (this.drawer.shadowRoot!.querySelector('.drawer') as HTMLElement).hidden = false;
      }
    });
  }

  /**
   * Initial setup for first render like special rail mode handling and animations reset.
   */
  private initialSetup() {
    // Needed to add initial listener to element in drawer shadow dom
    if (this.isInitial && this.drawer) {
      this.isInitial = false;
      const animation = {
        keyframes: [],
        options: {},
        rtlKeyframes: [],
      };
      // Disable all drawer animations.
      // TODO: do we want any animation? If yes we need to add different animations for the modes
      // and maybe instead of expose the `drawer` animation names reexpose them like
      // following: `drawer.showStart`-->`sideNav.show`, `drawer.hideStart` --> `sideNav.hide`
      setAnimation(this.drawer, 'drawer.showStart', animation);
      setAnimation(this.drawer, 'drawer.hideStart', animation);
      setAnimation(this.drawer, 'drawer.overlay.hide', animation);
      setAnimation(this.drawer, 'drawer.overlay.show', animation);

      if (this.mode === 'rail') {
        this.addMouseListener();
        // set initial visibility of drawer for rail mode
        (this.drawer.shadowRoot!.querySelector('.drawer') as HTMLElement).hidden = false;
      }
    }
  }

  @watch('mode', { waitUntilFirstUpdate: true })
  handleModeChange(oldValue: NavMode, newValue: NavMode) {
    if (oldValue === 'rail') {
      this.removeMouseListener();
    }

    if (newValue === 'rail') {
      this.addMouseListener();
    }

    // TODO: what shall happen on shrink mode with open=false?
  }

  @watch('open', { waitUntilFirstUpdate: true })
  handleOpenChange() {
    if (!this.open && this.mode === 'rail') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.forceDrawerVisibilityForRailMode();
    }
  }

  constructor() {
    super();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /** Shows the side-nav. */
  async show() {
    if (this.open) {
      return undefined;
    }
    this.open = true;

    return waitForEvent(this, 'syn-after-show');
  }

  /** Hides the side-nav */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;

    return waitForEvent(this, 'syn-after-hide');
  }

  render() {
    const isTouch = window.navigator.maxTouchPoints > 0 || !!('ontouchstart' in window);
    const hasFooter = this.hasSlotController.test('footer');

    this.initialSetup();
    this.handleRailMode();

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <nav
        class=${classMap({
      'side-nav': true,
      'side-nav--fix': this.mode === 'fix',
      'side-nav--has-footer': hasFooter,
      'side-nav--has-prefix-icons': this.hasPrefixIcons,
      'side-nav--open': this.open,
      'side-nav--rail': this.mode === 'rail',
      'side-nav--shrink': this.mode === 'shrink',
      'side-nav--touch': isTouch,
    })}
        part="base"
      >
        
        <syn-drawer
          class="side-nav__drawer"
          contained
          no-header
          ?open=${this.open}
          part="drawer"
          placement="start"
          @syn-request-close=${this.handleRequestClose}          
        >
          <main part="content-container" class="side-nav__content-container">
            <slot part="content" @slotchange=${this.handleRailMode}></slot>
          </main>

          
          <footer class="side-nav__footer" part="footer-container" slot="footer">  

            ${hasFooter ? html`<syn-divider part="footer-divider" class="side-nav__footer-divider"></syn-divider>` : ''}
            <slot name="footer" part="footer"></slot> 

          </footer>

        </syn-drawer>

      </nav>
    `;
    /* eslint-enable lit/no-invalid-html */
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
