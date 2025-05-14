/* eslint-disable @typescript-eslint/unbound-method */
import { classMap } from 'lit/directives/class-map.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { html } from 'lit/static-html.js';
import { property, query, state } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './side-nav.styles.js';
import SynDrawer from '../drawer/drawer.component.js';
import SynDivider from '../divider/divider.component.js';
import SynIcon from '../icon/icon.js';
import SynNavItem from '../nav-item/nav-item.component.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import { getAnimation, setAnimation, setDefaultAnimation } from '../../utilities/animation-registry.js';
import { LocalizeController } from '../../utilities/localize.js';
import { unlockBodyScrolling } from '../../internal/scroll.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

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
  (where the footer slot content is rendered)
 * @csspart footer-divider - The components footer divider
 * @csspart footer - The components footer content
 * @csspart overlay - The overlay that covers the screen behind the side-nav.
 * @csspart panel - The side-nav's panel (where the whole content is rendered).
 * @csspart body - The side-nav's body (where the default slot content is rendered)
 * @csspart drawer__base - The drawer's base wrapper
 * @csspart toggle-nav-item - The nav-item to toggle open state for variant="sticky"
 * @csspart toggle-icon - The icon of the toggle nav-item for variant="sticky"
 *
 * @cssproperty  --side-nav-open-width - The width of the side-nav if in open state
 *
 * @animation sideNav.showNonRail - The animation to use when showing the side-nav
 *  in variant="fixed".
 * @animation sideNav.showRail - The animation to use when showing the side-nav in variant="rail"
 *  and variant="sticky".
 * @animation sideNav.hideNonRail - The animation to use when hiding the side-nav
 *  in variant="fixed".
 * @animation sideNav.hideRail - The animation to use when hiding the side-nav in variant="rail"
 *  and variant="sticky".
 * @animation sideNav.overlay.show - The animation to use when showing the side-nav's overlay.
 * @animation sideNav.overlay.hide - The animation to use when hiding the side-nav's overlay.
 */
@enableDefaultSettings('SynSideNav')
export default class SynSideNav extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-divider': SynDivider,
    'syn-drawer': SynDrawer,
    'syn-icon': SynIcon,
    'syn-nav-item': SynNavItem,
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
   * Depending on the "variant" attribute, the behavior will differ.
   *
   * __Fixed__:
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
   *
   * @deprecated Use the `variant` attribute with `rail` instead.
   * Will be removed in synergy version 3.0
   */
  @property({ reflect: true, type: Boolean }) rail = false;

  /**
   * The variant that should be used to show the side navigation.
   *
   * The following variants are supported:
   * - **fixed** (default): Always shows the whole content and additionally an overlay.
   * This makes especially sense for applications, where you navigate to a place and stay
   * there for a longer time.
   * - **rail**: Only show the prefix of navigation items in closed state.
   * This will open on hover on the rail navigation.
   * On touch devices the navigation opens on click and shows an overlay.
   * Note: The rail variant is only an option if all Navigation Items on the first level
   * have an Icon.
   * If this is not the case you should use a burger navigation.
   * - **sticky**: The side-nav has a pin button to show the side-nav in small (icon only)
   * and full width. This variant is only possible for non-nested navigation items.
   * Note: The sticky variant is only an option if all Navigation Items on the first level
   * have an Icon and if there are only "first level" items.
   */
  @property({ reflect: true }) variant: 'fixed' | 'rail' | 'sticky' = 'fixed';

  /**
   * By default, the side-nav traps the focus if in variant="fixed" and open.
   * To disable the focus trapping, set this attribute.
   */
  @property({ attribute: 'no-focus-trapping', reflect: true, type: Boolean }) noFocusTrapping = false;

  private setDelayedCallback(callback: () => void) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(callback, 100);
  }

  private handleMouseEnter() {
    // Debounce mouse events, to avoid infinite loop of open / closing in variant="rail"
    this.setDelayedCallback(() => {
      this.open = true;
    });
  }

  private handleMouseLeave() {
    // Debounce mouse events, to avoid infinite loop of open / closing in variant="rail"
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

  private setDrawerAnimations() {
    const showAnimation = getAnimation(this, `sideNav.show${this.variant === 'fixed' ? 'NonRail' : 'Rail'}`, { dir: this.localize.dir() });
    const hideAnimation = getAnimation(this, `sideNav.hide${this.variant === 'fixed' ? 'NonRail' : 'Rail'}`, { dir: this.localize.dir() });
    const hideOverlay = getAnimation(this, 'sideNav.overlay.hide', { dir: this.localize.dir() });
    const showOverlay = getAnimation(this, 'sideNav.overlay.show', { dir: this.localize.dir() });

    setAnimation(this.drawer, 'drawer.showStart', showAnimation);
    setAnimation(this.drawer, 'drawer.hideStart', hideAnimation);
    setAnimation(this.drawer, 'drawer.overlay.hide', hideOverlay);
    setAnimation(this.drawer, 'drawer.overlay.show', showOverlay);
  }

  @watch('variant', { waitUntilFirstUpdate: true })
  handleVariantChange() {
    this.setDrawerAnimations();
    this.drawer.forceVisibility(this.variant !== 'fixed');

    switch (this.variant) {
    case 'rail':
      // For hover handling
      this.addMouseListener();
      break;
    case 'sticky':
    case 'fixed':
    default:
      this.removeMouseListener();
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  handleOpenChange() {
    if (this.variant === 'fixed') {
      return;
    }

    this.isAnimationActive = true;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    waitForEvent(this.drawer, `syn-after-${this.open ? 'show' : 'hide'}`).then(() => {
      this.isAnimationActive = false;
    });
  }

  @watch('noFocusTrapping', { waitUntilFirstUpdate: true })
  handleFocusTrapping() {
    if (this.variant === 'fixed') {
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

    return waitForEvent(this.drawer, 'syn-after-show');
  }

  /** Hides the side-nav */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;

    return waitForEvent(this.drawer, 'syn-after-hide');
  }

  constructor() {
    super();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.addEventListener('syn-initial-focus', (event) => {
      if (this.variant !== 'fixed') {
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
      // Open the side-nav if it`s in variant="rail", closed and the focused element is a nav-item
      if (targetTag === 'syn-nav-item' && this.variant === 'rail' && !this.open) {
        this.open = true;
      }
    });

    this.addEventListener('focusout', (event) => {
      const targetTag = (event.target as HTMLElement).tagName.toLowerCase();
      const relatedTargetTag = (event.relatedTarget as HTMLElement)?.tagName.toLowerCase();

      // Close the side-nav, if it`s in variant="rail", open and the next focused element
      // is no longer a nav-item
      if (targetTag === 'syn-nav-item' && relatedTargetTag !== 'syn-nav-item' && this.variant === 'rail' && this.open) {
        this.open = false;
      }
    });
  }

  /**
   * Initial setup for first render like special variant="rail" and variant="sticky" handling
   * and drawer animations.
   * */
  firstUpdated() {
    this.setDrawerAnimations();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.drawer.updateComplete.then(() => {
      this.drawer.forceVisibility(this.variant !== 'fixed');
      // change tabindex of drawer to make only nav-items focusable and not the panel of the drawer
      (this.drawer.shadowRoot!.querySelector('.drawer__panel') as HTMLElement).tabIndex = -1;
    });

    switch (this.variant) {
    case 'rail':
      // Wait for the drawer`s update to be completed
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.drawer.updateComplete.then(() => {
        this.addMouseListener();
      });
      break;
    case 'sticky': break;
    case 'fixed':
    default:
      if (this.noFocusTrapping) {
        // Disable the focus trapping of the modal
        this.drawer.modal.activateExternal();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    //  Remove modal listeners
    if (this.drawer) {
      unlockBodyScrolling(this.drawer);
      this.drawer.modal.deactivate();
    }
  }

  // eslint-disable-next-line complexity
  protected override willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);

    // TODO: this can be removed in synergy version 3.0
    if (changedProperties.has('rail')) {
      if (this.rail && process.env.NODE_ENV !== 'production') {
        // Add deprecation console warning for stakeholder, which do not use linting
        // to get their attention
        console.warn('<syn-side-nav/>: The `rail` attribute is deprecated. Please use the `variant` attribute with `rail` instead. It will be removed in synergy version 3.0');
      }

      // The `variant` should be adapted to the `rail` attribute,
      // if it was explicitly set or unset by the user.
      // This is needed to be backwards compatible with the `rail` attribute
      if (!changedProperties.has('variant')) {
        this.variant = this.rail ? 'rail' : 'fixed';
        return;
      }

      if (this.rail) {
        this.variant = 'rail';
      }
    }
  }

  private toggleOpenState() {
    // TODO: do we need to stopPropagation?
    this.open = !this.open;
  }

  // eslint-disable-next-line complexity
  render() {
    const isTouch = window.navigator.maxTouchPoints > 0 || !!('ontouchstart' in window);
    const hasFooter = this.hasSlotController.test('footer');
    const showFooterDivider = hasFooter || this.variant === 'sticky';

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <nav
        class=${classMap({
      'side-nav': true,
      'side-nav--animation': this.isAnimationActive,
      'side-nav--fix': this.variant === 'fixed',
      'side-nav--has-footer': hasFooter,
      'side-nav--open': this.open,
      'side-nav--rail': this.variant === 'rail',
      'side-nav--sticky': this.variant === 'sticky',
      'side-nav--touch': isTouch,
    })}
        part="base"
      >
        
        <syn-drawer
          class="side-nav__drawer"
          ?contained=${this.variant !== 'fixed'}
          exportparts="overlay,panel,body,base:drawer__base"
          label=${this.localize.term('sideNav')}
          no-header
          ?open=${this.open}
          part="drawer"
          placement="start"
          @syn-request-close=${this.handleRequestClose} 
        >
          <div part="content-container" class="side-nav__content-container">
            <slot part="content"></slot>
          </div>
          
          <footer class="side-nav__footer" part="footer-container" slot="footer">  

            ${showFooterDivider ? html`<syn-divider part="footer-divider" class="side-nav__footer-divider"></syn-divider>` : ''}
            <slot name="footer" part="footer" ></slot>
            ${this.variant === 'sticky'
              ? html`<syn-nav-item part="toggle-nav-item" class="side-nav__toggle-nav-item" @click=${this.toggleOpenState} ?divider=${hasFooter}>
                      <syn-icon slot="prefix" library="system" name="sticky_sidebar" part="toggle-icon"></syn-icon>
                      ${this.open ? this.localize.term('sideNavHide') : this.localize.term('sideNavShow')}
                    </syn-nav-item>`
              : ''
            }
          
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
