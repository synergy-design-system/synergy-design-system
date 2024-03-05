import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { property, query, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './horizontal-nav.styles.js';
import SynIcon from '../icon/icon.component.js';
import SynNavItem from '../nav-item/nav-item.component.js';

/**
 * @summary The `<syn-horizontal-nav />` element provides a generic navigation bar that
 * can be used to group multiple `<syn-nav-item />` elements together.
 * It will group all `<syn-nav-item />`s that cannot be displayed into a custom priority menu
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-horizontal-nav--docs
 * @status stable
 * @since 1.10
 *
 * @dependency syn-icon
 * @dependency syn-nav-item
 *
 * @slot - The given navigation items. Must be `<syn-nav-item>` elements.
 *
 * @csspart base - The component's base wrapper.
 * @csspart nav-item-wrapper - The wrapper around the slotted `<syn-nav-item />` elements
 * @csspart priority-menu - The wrapper around the priority menu
 */
export default class SynHorizontalNav extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-icon': SynIcon,
    'syn-nav-item': SynNavItem,
  };

  /**
   * Internal resize observer
   */
  private resizeObserver: ResizeObserver;

  /**
   * Reference to the rendered children slot
   */
  @query('slot') defaultSlot: HTMLSlotElement;

  @query('.horizontal-nav-items') navItemWrapper: HTMLDivElement;

  /**
   * The components priority menu label.
   * This will be shown after the priority menu 3 dots link
   */
  @property({ attribute: 'priority-menu-label' }) priorityMenuLabel = 'Menu';

  /**
   * The items that are currently not completely visible and moved to the priority menu
   */
  @state() priorityMenuItems: SynNavItem[] = [];

  /**
   * Get a list of all slotted `<syn-nav-item />` elements
   */
  private getSlottedNavItems() {
    const slottedItems = Array.from(
      this.defaultSlot.assignedElements({ flatten: true }),
    ) as HTMLElement[];

    return slottedItems.filter(i => i instanceof SynNavItem) as SynNavItem[];
  }

  /**
   * Determines which items should be shown or hidden, depending on the current width
   */
  private handlePriorityMenu() {
    const navItems = this.getSlottedNavItems();
    const { width } = this.navItemWrapper.getBoundingClientRect();

    navItems.forEach(item => {
      const { right } = item.getBoundingClientRect();
      const isHidden = right > width;

      // eslint-disable-next-line no-param-reassign
      item.style.visibility = isHidden ? 'hidden' : 'visible';
      item.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
    });

    // Save a reference to the currently hidden elements.
    // This makes it possible to render them via renderPriorityMenu
    this.priorityMenuItems = navItems.filter(i => i.style.visibility === 'hidden');
  }

  /**
   * Renders the priority menu with all items that are currently not available on screen
   */
  private renderPriorityMenu() {
    const items = this.priorityMenuItems;

    return html`
      <div
        class=${classMap({
          'priority-menu': true,
          'priority-menu--hidden': items.length === 0,
        })}
        part="priority-menu"
      >
        <syn-nav-item>
          <syn-icon name="more_horiz" label="More" slot="prefix"></syn-icon>
          ${this.priorityMenuLabel}
          <nav class="priority-menu-list" slot="children">
            ${items.map((item, index) => html`
              <syn-nav-item
                ?divider=${index !== 0}
                vertical
              >
                ${item.textContent}
              </syn-nav-item>
            `)}
          </nav>
        </syn-nav-item>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.handlePriorityMenu());
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this);
  }

  render() {
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <nav class="horizontal-nav" part="base">
        <div class="horizontal-nav-items" part="nav-item-wrapper">
          <slot></slot>
        </div>
        ${this.renderPriorityMenu()}
      </nav>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
