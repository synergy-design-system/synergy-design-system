/* eslint-disable no-param-reassign */
import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { query, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './prio-nav.styles.js';
import SynDropdown from '../dropdown/dropdown.component.js';
import SynIcon from '../icon/icon.component.js';
import SynMenu from '../menu/menu.component.js';
import SynNavItem from '../nav-item/nav-item.component.js';
import { LocalizeController } from '../../utilities/localize.js';
import {
  filterOnlyNavItems,
  getAssignedElementsForSlot,
  hideNavigationItem,
  showNavigationItem,
} from './utils.js';

/**
 * @summary The `<syn-prio-nav />` element provides a generic navigation bar
 * that can be used to group multiple navigation items  (usually horizontal `<syn-nav-item />`s)
 * together. It will automatically group all items not visible in the viewport into a custom
 * priority menu.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-prio-nav--docs
 * @example
 * <syn-prio-nav>
 *  <syn-nav-item current horizontal>Item 1</syn-nav-item>
 *  <button role="menuitem">Item 2 (custom)</button>
 *  <syn-nav-item horizontal>Item 3</syn-nav-item>
 * </syn-prio-nav>
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-prio-nav--docs
 * @status stable
 * @since 1.14.0
 *
 * @dependency syn-dropdown
 * @dependency syn-icon
 * @dependency syn-menu
 * @dependency syn-nav-item
 *
 * @slot - The given navigation items. Must be horizontal `<syn-nav-item>`s
 *    or have a role of "menuitem"
 *
 * @csspart base - The component's base wrapper.
 * @csspart priority-menu - The wrapper around the priority menu
 * @csspart priority-menu-nav-item - The navigation item for the priority menu
 * @csspart priority-menu-label - The label for the priority menu
 * @csspart priority-menu-icon - The icon for the priority menu
 * @csspart priority-menu-container - The container for the shifted navigation items,
 *    if there is not enough space.
 *
 */
export default class SynPrioNav extends SynergyElement {
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

  private readonly localize = new LocalizeController(this);

  /**
   * Reference to the rendered children slot
   */
  @query('slot:not([name])') private defaultSlot: HTMLSlotElement;

  /**
   * Reference to the slot where priority menu items are placed
   */
  @query('slot[name=menu]') private menuSlot: HTMLSlotElement;

  /**
   * The wrapper that holds the horizontal navigation items
   */
  @query('.horizontal-nav') private horizontalNav: HTMLDivElement;

  /**
   * The priority menu dropdown
   */
  @query('.priority-menu') private priorityMenu: SynDropdown;

  /**
   * Internal state reflecting if the item positions have been cached
   */
  @state() private itemPositionsCached = false;

  /**
   * The amount of nav items that are currently slotted
   */
  @state() private amountOfNavItems = 0;

  /**
   * The amount of items that are currently visible
   */
  @state() private amountOfVisibleItems = 0;

  /**
   * Internal state reflecting if there are items in the priority menu
   */
  @state() private hasItemsInDropdown = false;

  /**
   * Get a list of all slotted `<syn-nav-item />` elements
   * that are either in the main slot or the priority menu slot
   */
  private getSlottedNavItems() {
    const navItemsInDefaultSlot = filterOnlyNavItems(getAssignedElementsForSlot(this.defaultSlot));
    const navItemsInMenuSlot = filterOnlyNavItems(getAssignedElementsForSlot(this.menuSlot));
    return navItemsInDefaultSlot.concat(navItemsInMenuSlot);
  }

  /**
   * Cache the items right offset position to make faster checks placement into priority menu
   * @param items The items to cache the position for
   */
  private cacheItemPositions(items: SynNavItem[]) {
    const { left } = this.horizontalNav.getBoundingClientRect();
    items.forEach(item => {
      // We have to measure while the items are in the primary slot,
      // else we will just get the placement in the priority menu
      item.removeAttribute('slot');
      const { right } = item.getBoundingClientRect();
      // We also need to consider the location of the parent
      item.dataset.right = (right - left).toString();
    });

    this.itemPositionsCached = true;
  }

  /**
   * Determines which items should be shown or hidden, depending on the current width
   */
  private handlePriorityMenu() {
    const navItems = this.getSlottedNavItems();

    if (!this.itemPositionsCached) {
      this.cacheItemPositions(navItems);
    }

    // Get the widths of the horizontal nav and the priority menu
    // We subtract the width of the priority menu to get the final width
    const { width } = this.horizontalNav.getBoundingClientRect();

    // #651: Do not take the size of the priority menu
    // into account when it is hidden
    const reservedPrioMenuSize = this.priorityMenu.classList.contains('priority-menu--hidden')
      ? 0
      : this.priorityMenu.clientWidth;

    const finalWidth = width - reservedPrioMenuSize;

    // Cache the first item that should be hidden
    let firstHiddenItemRightPos: number | undefined;

    // Cache the last item so we can decide to use the finalWidth or just the width
    // later on. This is needed as otherwise the last item will be hidden when using finalWidth
    const lastNavItem = navItems.at(-1);

    const itemVisibilities = navItems.map(item => {
      const measureWidth = item === lastNavItem ? width : finalWidth;
      const isHidden = !!(
        firstHiddenItemRightPos
        || parseFloat(item.dataset.right!) > measureWidth
      );

      // Get the position of the first item
      // Will get used to position the priority menu
      if (isHidden && !firstHiddenItemRightPos) {
        firstHiddenItemRightPos = parseFloat(item.dataset.right!);
      }

      return {
        isHidden,
        item,
      };
    });

    const visibleItems = itemVisibilities.filter(({ isHidden }) => !isHidden).length;
    const hasOnlyOneItem = visibleItems === 1;

    // Finally, hide or show the items based on the visibility
    // As requested in #410, we hide all items if there is only one item
    itemVisibilities.forEach(({ item, isHidden }) => {
      if (isHidden || hasOnlyOneItem) {
        hideNavigationItem(item);
      } else {
        showNavigationItem(item);
      }
    });

    // Tell the render call that we have items in the priority menu
    // and toggle the visibility of the priority menu label
    this.hasItemsInDropdown = visibleItems !== navItems.length;
    this.amountOfVisibleItems = hasOnlyOneItem ? 0 : visibleItems;
  }

  private renderPriorityMenu() {
    return html`
      <syn-dropdown
        class=${classMap({
          'priority-menu': true,
          'priority-menu--has-visible-items': this.amountOfVisibleItems !== 0,
          'priority-menu--hidden': !this.hasItemsInDropdown,
        })}
        part="priority-menu"
        placement="bottom-end"
      >
        <syn-nav-item class="priority-menu__nav-item" slot="trigger" horizontal part="priority-menu-nav-item">
          <syn-icon 
            class="priority-menu__icon"
            label="More"
            library="system"
            name="more"
            part="priority-menu-icon"
            slot="prefix"
          >
          </syn-icon>
          <span
            class=${classMap({
              'priority-menu__label': true,
              'priority-menu__label--visible': this.amountOfVisibleItems === 0,
            })}
            part="priority-menu-label"
          >
            ${this.localize.term('menu')}
          </span>
        </syn-nav-item>

        <syn-menu part="priority-menu-container">
          <slot name="menu"></slot>
        </syn-menu>

      </syn-dropdown>
    `;
  }

  private slotChange() {
    const slottedItems = this.getSlottedNavItems();

    // Make sure to trigger a recalculation of the item positions if we a new list of slotted items
    if (slottedItems.length !== this.amountOfNavItems) {
      this.cacheItemPositions(slottedItems);
      this.handlePriorityMenu();
      this.amountOfNavItems = slottedItems.length;
    }
  }

  protected firstUpdated() {
    // Cache the original role of the items so we can reset it if needed.
    this.getSlottedNavItems().forEach(item => {
      item.dataset.originalRole = item.getAttribute('role') ?? '';
    });
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
        <slot @slotchange=${this.slotChange}></slot>
        ${this.renderPriorityMenu()}
      </nav>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
