import { classMap } from 'lit/directives/class-map.js';
import type { CSSResultGroup } from 'lit';
import { html } from 'lit/static-html.js';
import { property, query } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './side-nav.styles.js';
import SynDrawer from '../drawer/drawer.component.js';
import SynDivider from '../divider/divider.component.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import { getAnimation, setAnimation, setDefaultAnimation } from '../../utilities/animation-registry.js';
import { LocalizeController } from '../../utilities/localize.js';

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
 * @csspart overlay - The overlay that covers the screen behind the side-nav.
 *
 * @cssproperty --side-nav-size - The width of the side-nav. Can be used to shrink the main content.
 *
 * @animation sideNav.showNonRail - The animation to use when showing the side-nav in non-rail mode.
 * @animation sideNav.showRail - The animation to use when showing the side-nav in rail mode.
 * @animation sideNav.hideNonRail - The animation to use when hiding the side-nav in non-rail mode.
 * @animation sideNav.hideRail - The animation to use when hiding the side-nav in rail mode.
 * @animation sideNav.overlay.show - The animation to use when showing the side-nav's overlay.
 * @animation sideNav.overlay.hide - The animation to use when hiding the side-nav's overlay.
 */
export default class SynSideNav extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-divider': SynDivider,
    'syn-drawer': SynDrawer,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'footer');

  private readonly localize = new LocalizeController(this);

  private isInitial: boolean = true;

  private timeout: NodeJS.Timeout;

  /**
   * Reference to the drawer
   */
  @query('.side-nav__drawer') private drawer: SynDrawer;

  /**
   * Indicates whether or not the side-nav is open.
   * You can toggle this attribute to show and hide the side-nav, or you can use the `show()` and
   * `hide()` methods and this attribute will reflect the side-nav's open state.
   *
   * Depending if the rail attribute is set or not, the behavior will differ.
   *
   * __Non rail__:
   * With `open` will show the side-nav.
   * Without `open`, the side-nav will be hidden.
   *
   * __Rail__:
   * With `open` will show the whole side-nav with an overlay for touch devices
   * or without an overlay for non-touch devices.
   * Without `open`, the side-nav will only show the prefix of nav-item's.
   *
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /**
   * Use the rail attribute to only show the prefix of navigation items in closed state.
   * This will open on hover on the rail navigation.
   * On touch devices the navigation opens on click and shows an overlay.
   *
   * Note: The Rail is only an option if all Navigation Items on the first level have an Icon.
   * If this is not the case you should use a burger navigation.
   */
  @property({ reflect: true, type: Boolean }) rail = false;

  private setDelayedCallback(callback: () => void) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(callback, 100);
  }

  private handleMouseEnter() {
    // Debounce mouse events, to avoid infinite loop of open / closing in rail mode
    this.setDelayedCallback(() => {
      this.open = true;
    });
  }

  private handleMouseLeave() {
    // Debounce mouse events, to avoid infinite loop of open / closing in rail mode
    this.setDelayedCallback(() => {
      this.open = false;
    });
  }

  private addMouseListener() {
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.addEventListener('mouseenter', () => this.handleMouseEnter());
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.addEventListener('mouseleave', () => this.handleMouseLeave());
  }

  private removeMouseListener() {
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.removeEventListener('mouseenter', () => this.handleMouseEnter());
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.removeEventListener('mouseleave', () => this.handleMouseLeave());
  }

  private forceDrawerVisibilityForRailMode() {
    return waitForEvent(this, 'syn-after-hide').then(() => {
      if (this.rail) {
        (this.drawer.shadowRoot!.querySelector('.drawer') as HTMLElement).hidden = false;
      }
    });
  }

  private setDrawerAnimations() {
    const showAnimation = getAnimation(this, `sideNav.show${this.rail ? 'Rail' : 'NonRail'}`, { dir: this.localize.dir() });
    const hideAnimation = getAnimation(this, `sideNav.hide${this.rail ? 'Rail' : 'NonRail'}`, { dir: this.localize.dir() });
    const hideOverlay = getAnimation(this, 'sideNav.overlay.hide', { dir: this.localize.dir() });
    const showOverlay = getAnimation(this, 'sideNav.overlay.show', { dir: this.localize.dir() });

    setAnimation(this.drawer, 'drawer.showStart', showAnimation);
    setAnimation(this.drawer, 'drawer.hideStart', hideAnimation);
    setAnimation(this.drawer, 'drawer.overlay.hide', hideOverlay);
    setAnimation(this.drawer, 'drawer.overlay.show', showOverlay);
  }

  /**
   * Initial setup for first render like special rail mode handling and drawer animations.
   */
  private initialSetup() {
    // Needed to add initial listener to element in drawer shadow dom
    if (this.isInitial && this.drawer) {
      this.isInitial = false;

      this.setDrawerAnimations();

      if (this.rail) {
        this.addMouseListener();
        // set initial visibility of drawer for rail mode
        (this.drawer.shadowRoot!.querySelector('.drawer') as HTMLElement).hidden = false;
      }
    }
  }

  @watch('rail', { waitUntilFirstUpdate: true })
  handleModeChange() {
    this.setDrawerAnimations();

    if (this.rail) {
      this.addMouseListener();
    } else {
      this.removeMouseListener();
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  handleOpenChange() {
    if (!this.open && this.rail) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.forceDrawerVisibilityForRailMode();
    }
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

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <nav
        class=${classMap({
      'side-nav': true,
      'side-nav--fix': !this.rail,
      'side-nav--has-footer': hasFooter,
      'side-nav--open': this.open,
      'side-nav--rail': this.rail,
      'side-nav--touch': isTouch,
    })}
        part="base"
      >
        
        <syn-drawer
          class="side-nav__drawer"
          contained
          exportparts="overlay"
          no-header
          ?open=${this.open}
          part="drawer"
          placement="start"
        >
          <main part="content-container" class="side-nav__content-container">
            <slot part="content" ></slot>
          </main>

          
          <footer class="side-nav__footer" part="footer-container" slot="footer">  

            ${hasFooter ? html`<syn-divider part="footer-divider" class="side-nav__footer-divider"></syn-divider>` : ''}
            <slot name="footer" part="footer" ></slot> 
          
          </footer>

        </syn-drawer>

      </nav>
    `;
    /* eslint-enable lit/no-invalid-html */
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}

// Show animations
setDefaultAnimation('sideNav.showRail', {
  keyframes: [
    { width: '4.5rem' },
    { width: '25rem' },
  ],
  options: { duration: 250, easing: 'ease' },
});

setDefaultAnimation('sideNav.showNonRail', {
  keyframes: [
    { opacity: 0, translate: '-100%' },
    { opacity: 1, translate: '0' },
  ],
  options: { duration: 250, easing: 'ease' },
});

// Hide animations
setDefaultAnimation('sideNav.hideNonRail', {
  keyframes: [
    { opacity: 1, translate: '0' },
    { opacity: 0, translate: '-100%' },
  ],
  options: { duration: 250, easing: 'ease' },
});

setDefaultAnimation('sideNav.hideRail', {
  keyframes: [
    { width: '25rem' },
    { width: '4.5rem' },
  ],
  options: { duration: 250, easing: 'ease' },
});

// Overlay animations
setDefaultAnimation('sideNav.overlay.show', {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 },
});

setDefaultAnimation('sideNav.overlay.hide', {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 },
});
