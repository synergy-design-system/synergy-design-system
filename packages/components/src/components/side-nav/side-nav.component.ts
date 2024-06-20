/* eslint-disable @typescript-eslint/unbound-method */
import { classMap } from 'lit/directives/class-map.js';
import type { CSSResultGroup } from 'lit';
import { html } from 'lit/static-html.js';
import { property, query, state } from 'lit/decorators.js';
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
import { unlockBodyScrolling } from '../../internal/scroll.js';

/**
 * @summary The <syn-side-nav /> element contains secondary navigation and fits below the header.
 * It can be used to group multiple navigation items (<syn-nav-item />s) together.
 *
 * @example
 * <syn-side-nav open>
 *  <syn-nav-item >Item 1</syn-nav-item>
 *  <syn-nav-item divider>Item 2</syn-nav-item>
 * </syn-side-nav>
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-side-nav--docs
 * @status stable
 * @since 1.14.0
 *
 * @dependency syn-divider
 * @dependency syn-drawer
 *
 * @slot - The main content of the side-nav. Used for <syn-nav-item /> elements.
 * @slot footer - The footer content of the side-nav. Used for <syn-nav-item /> elements.
 *    Please avoid having to many nav-items as it can massively influence the user experience.
 *
 * @event syn-show - Emitted when the side-nav opens.
 * @event syn-after-show - Emitted after the side-nav opens and all animations are complete.
 * @event syn-hide - Emitted when the side-nav closes.
 * @event syn-after-hide - Emitted after the side-nav closes and all animations are complete.
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
 * @cssproperty  --side-nav-open-width - The width of the side-nav if in open state
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

  private timeout: NodeJS.Timeout;

  /**
   * Current animation active state
   */
  @state() private isAnimationActive = false;

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

  /**
   * By default, the side-nav traps the focus if in non-rail mode and open.
   * To disable the focus trapping, set this attribute.
   */
  @property({ attribute: 'no-focus-trapping', reflect: true, type: Boolean }) noFocusTrapping = false;

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

  private handleRequestClose() {
    if (this.open) {
      this.open = false;
    }
  }

  private addMouseListener() {
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.addEventListener('mouseenter', this.handleMouseEnter);
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.addEventListener('mouseleave', this.handleMouseLeave);
  }

  private removeMouseListener() {
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.removeEventListener('mouseenter', this.handleMouseEnter);
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  private setDrawerVisibility(isVisible: boolean) {
    (this.drawer.shadowRoot!.querySelector('.drawer') as HTMLElement).hidden = !isVisible;
    this.drawer.shadowRoot!.querySelector('.drawer__panel')?.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
  }

  private forceDrawerVisibilityForRailMode() {
    return waitForEvent(this, 'syn-after-hide').then(() => {
      this.setDrawerVisibility(true);
      this.isAnimationActive = false;
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

  @watch('rail', { waitUntilFirstUpdate: true })
  handleModeChange() {
    this.setDrawerAnimations();

    if (this.rail) {
      this.addMouseListener();
      // Force drawer visibility for rail mode
      this.setDrawerVisibility(true);
    } else {
      this.removeMouseListener();
      // Remove forcing of drawer visibility for rail mode if not open
      if (!this.open) {
        this.setDrawerVisibility(false);
      }
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  handleOpenChange() {
    if (this.rail) {
      this.isAnimationActive = true;

      if (!this.open) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.forceDrawerVisibilityForRailMode();
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        waitForEvent(this.drawer, 'syn-after-show').then(() => {
          this.isAnimationActive = false;
        });
      }
    }
  }

  @watch('noFocusTrapping', { waitUntilFirstUpdate: true })
  handleFocusTrapping() {
    if (!this.rail) {
      if (this.noFocusTrapping) {
        this.drawer.modal.activateExternal();
      } else {
        this.drawer.modal.deactivateExternal();
      }
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

  constructor() {
    super();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.addEventListener('syn-initial-focus', (event) => {
      if (this.rail) {
        // We need to do this, to stop the drawer from giving focus to the panel
        event.preventDefault();

        // The originalTrigger needs to be removed, otherwise when closing the drawer,
        // the first focused nav-item is focused again...
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.drawer['originalTrigger'] = null;
      }
    });

    this.addEventListener('focusin', (event) => {
      const targetTag = (event.target as HTMLElement).tagName.toLowerCase();
      // Open the side-nav if it`s in rail mode, closed and the focused element is a nav-item
      if (targetTag === 'syn-nav-item' && this.rail && !this.open) {
        this.open = true;
      }
    });

    this.addEventListener('focusout', (event) => {
      const targetTag = (event.target as HTMLElement).tagName.toLowerCase();
      const relatedTargetTag = (event.relatedTarget as HTMLElement)?.tagName.toLowerCase();

      // Close the side-nav, if it`s in rail mode, open and the next focused element
      // is no longer a nav-item
      if (targetTag === 'syn-nav-item' && relatedTargetTag !== 'syn-nav-item' && this.rail && this.open) {
        this.open = false;
      }
    });
  }

  /**
   * Initial setup for first render like special rail mode handling and drawer animations.
   * */
  firstUpdated() {
    this.setDrawerAnimations();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.drawer.updateComplete.then(() => {
      // change tabindex of drawer to make only nav-items focusable and not the panel of the drawer
      (this.drawer.shadowRoot!.querySelector('.drawer__panel') as HTMLElement).tabIndex = -1;
    });

    if (this.rail) {
      // Wait for the drawer`s update to be completed

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.drawer.updateComplete.then(() => {
        this.addMouseListener();
        // set initial visibility of drawer for rail mode
        this.setDrawerVisibility(true);
      });
    } else if (this.noFocusTrapping) {
      // Disable the focus trapping of the modal
      this.drawer.modal.activateExternal();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    //  Remove modal listeners
    unlockBodyScrolling(this.drawer);
    this.drawer.modal.deactivate();
  }

  render() {
    const isTouch = window.navigator.maxTouchPoints > 0 || !!('ontouchstart' in window);
    const hasFooter = this.hasSlotController.test('footer');

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <nav
        class=${classMap({
          'side-nav': true,
          'side-nav--animation': this.isAnimationActive,
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
          ?contained=${this.rail}
          exportparts="overlay"
          label=${this.localize.term('sideNav')}
          no-header
          ?open=${this.open}
          part="drawer"
          placement="start"
          @syn-request-close=${this.handleRequestClose} 
        >
          <div part="content-container" class="side-nav__content-container">
            <slot part="content" ></slot>
          </div>
          
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
    { width: 'var(--side-nav-rail-width)' },
    { width: 'var(--side-nav-open-width)' },
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
    { width: 'var(--side-nav-open-width)' },
    { width: 'var(--side-nav-rail-width)' },
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
