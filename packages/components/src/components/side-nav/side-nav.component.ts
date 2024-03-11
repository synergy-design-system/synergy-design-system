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

  constructor() {
    super();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /**
* Reference to the default slot.
   */
  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /**
* Reference to the footer slot.
   */
  @query('slot[name="footer"]') footerSlot: HTMLSlotElement;

  /**
* Reference to the drawer
   */
  @query('.side-nav__drawer') drawer: SynDrawer;

  /**
* State if all nav-items have a prefix icon.
   */
  @state() private hasPrefixIcons = false;

  @state() private hasHoverOnRail = false;

  /**
* Use the rail attribute to only show the prefix of navigation items.
* This will open on hover on the rail navigation.
* On touch devices the navigation opens on click and shows an overlay.
  *
* Note: The Rail is only an option if all Navigation Items on the first level have an Icon.
* If this is not the case you should use a burger navigation.
   */
  @property({ reflect: true, type: Boolean }) rail = false;

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
* Rail mode is only valid if every nav-item has a syn-icon as prefix.
   */
  // eslint-disable-next-line complexity
  private handleRailMode() {
    const navItems = this.getAllNavItems();

    const itemsWithPrefixIcon = navItems.filter((navItem) => {
      const prefixSlot = navItem.querySelector(':scope > [slot="prefix"]');
      return (prefixSlot && prefixSlot.tagName.toLowerCase() === 'syn-icon');
    });

    this.hasPrefixIcons = navItems.length !== 0 && itemsWithPrefixIcon.length === navItems.length;

    // Only do rail mode, if every nav-item has a syn-icon as prefix
    // TODO: do we only want to allow syn-icon as prefix or also other elements?
    if (this.hasPrefixIcons && this.rail && !this.hasHoverOnRail) {
      if (!this.querySelector('style.hide-parts-style')) {
        const partsHideStyle = document.createElement('style');
        partsHideStyle.className = 'hide-parts-style';
        //   partsHideStyle.textContent = `syn-nav-item::part(content-container),
        // syn-nav-item::part(suffix),
        // syn-nav-item::part(chevron),
        // syn-nav-item [slot="children"] {
        //   display: none
        // }`;
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
    if (this.rail && this.hasPrefixIcons) {
      this.hasHoverOnRail = true;
    }
  }

  private handleMouseLeave() {
    if (this.rail && this.hasPrefixIcons) {
      this.hasHoverOnRail = false;
    }
  }

  /**
* Prevent drawer from being closed.
* @param event - The requested close event emitted from the drawer
   */
  private handleRequestClose(event: SynRequestCloseEvent) {
    event.preventDefault();
    this.hasHoverOnRail = false;
  }

  /* eslint-disable complexity */
  render() {
    if (this.isInitial && this.drawer) {
      this.isInitial = false;
      this.drawer.shadowRoot!.querySelector('.drawer__panel')?.addEventListener('mouseenter', this.handleMouseEnter);
      this.drawer.shadowRoot!.querySelector('.drawer__panel')?.addEventListener('mouseleave', this.handleMouseLeave);
    }
    const isTouch = window.navigator.maxTouchPoints > 0 || !!('ontouchstart' in window);

    const hasFooter = this.hasSlotController.test('footer');
    this.handleRailMode();

    /* eslint-disable lit/no-invalid-html */
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <nav
        class=${classMap({
          'side-nav': true,
          'side-nav--has-footer': hasFooter,
          'side-nav--has-prefix-icons': this.hasPrefixIcons,
          'side-nav--rail': this.rail,
          'side-nav--rail-hover': this.hasHoverOnRail,
          'side-nav--rail-touch': isTouch,
        })}
        part="base"
      >
        
        <syn-drawer
          class="side-nav__drawer"
          contained
          no-header
          open
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
    /* eslint-enable complexity */
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
