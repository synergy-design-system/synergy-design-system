import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { property, query, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './horizontal-nav.styles.js';
import SynDropdown from '../dropdown/dropdown.component.js';
import SynIcon from '../icon/icon.component.js';
import SynMenu from '../menu/menu.component.js';
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
 * @dependency syn-dropdown
 * @dependency syn-icon
 * @dependency syn-menu
 * @dependency syn-nav-item
 *
 * @slot - The given navigation items. Must be `<syn-nav-item>` elements.
 *
 * @csspart base - The component's base wrapper.
 * @csspart nav-item-wrapper - The wrapper around the slotted `<syn-nav-item />` elements
 * @csspart priority-menu - The wrapper around the priority menu
 * @csspart priority-menu-label - The label for the priority menu
 *
 * @cssproperty --navigation-spacing - The amount of padding to use for the horizontal navigation.
 *
 * @todo: more_horiz icon should be part of system library (and renamed!)
 */
export default class SynHorizontalNav extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-dropdown': SynDropdown,
    'syn-icon': SynIcon,
    'syn-menu': SynMenu,
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

  /**
   * The wrapper that holds the horizontal navigation items
   */
  @query('.horizontal-nav-items') navItemWrapper: HTMLDivElement;

  /**
   * The priority menu wrapper
   */
  @query('syn-dropdown') priorityMenu: SynDropdown;

  /**
   * Reference to the priority menu label
   */
  @query('.priority-menu__label') priorityMenuLabelElement: HTMLSpanElement;

  /**
   * The components priority menu label.
   * This will be shown after the priority menu 3 dots link
   */
  @property({ attribute: 'priority-menu-label' }) priorityMenuLabel = 'Menu';

  /**
   * The items that are currently not completely visible and moved to the priority menu
   */
  @state() protected priorityMenuItems: SynNavItem[] = [];

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
   * Adjust the visual placement of the priority menu
   * @param startPos The start position to calculate from
   */
  private adjustPriorityMenuPosition(startPosition: number) {
    const relativeX = startPosition - this.priorityMenu.offsetLeft;
    this.priorityMenu.style.transform = `translate(${relativeX}px, 0)`;
  }

  /**
   * Determines which items should be shown or hidden, depending on the current width
   */
  private handlePriorityMenu() {
    const navItems = this.getSlottedNavItems();
    const { width } = this.navItemWrapper.getBoundingClientRect();

    let firstHiddenItemRightPos: number | undefined;
    const nextPriorityMenuItems: SynNavItem[] = [];

    // eslint-disable-next-line complexity
    navItems.forEach(item => {
      // If we already have found an item,
      // skip the position check as we already know the first hidden item.
      // Else, check if the most right position of the item is in the view
      const isHidden = firstHiddenItemRightPos || item.getBoundingClientRect().right > width;

      // eslint-disable-next-line no-param-reassign
      item.style.visibility = isHidden ? 'hidden' : 'visible';
      item.setAttribute('aria-hidden', isHidden ? 'true' : 'false');

      if (isHidden) {
        // Save a reference to the currently hidden elements.
        // This makes it possible to render them via renderPriorityMenu
        nextPriorityMenuItems.push(item);

        // Get the position of the first item
        // Will get used to position the priority menu
        if (!firstHiddenItemRightPos) {
          firstHiddenItemRightPos = item.offsetLeft;
        }
      }
    });

    this.priorityMenuItems = nextPriorityMenuItems;

    // Only show the priority menu label if there are no visible items anymore
    const labelVisibility = nextPriorityMenuItems.length === navItems.length ? 'visible' : 'hidden';
    this.priorityMenuLabelElement.style.visibility = labelVisibility;

    if (firstHiddenItemRightPos) {
      this.adjustPriorityMenuPosition(firstHiddenItemRightPos);
    }
  }

  /**
   * Renders the priority menu with all items that are currently not available on screen
   */
  private renderPriorityMenu() {
    const items = this.priorityMenuItems;

    return html`
      <syn-dropdown
        class=${classMap({
          'priority-menu': true,
          'priority-menu--hidden': items.length === 0,
        })}
        part="priority-menu"
        placement="bottom-end"
      >
        <syn-nav-item slot="trigger">
          <syn-icon name="more_horiz" label="More" slot="prefix"></syn-icon>
          <span class="priority-menu__label" part="priority-menu-label">
            ${this.priorityMenuLabel}
          </span>
        </syn-nav-item>

        <syn-menu>
          ${items.map((item, index) => html`
            <syn-nav-item
              ?divider=${index !== 0}
              vertical
            >
              ${item.textContent}
            </syn-nav-item>
          `)}
        </syn-menu>
      </syn-dropdown>
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
