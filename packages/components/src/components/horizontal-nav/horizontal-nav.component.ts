/* eslint-disable no-param-reassign */
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
 * Get a list of all assigned elements for a given slot
 * @param slot The slot to query
 * @returns Flattened list of assigned elements
 */
const getAssignedElementsForSlot = (slot: HTMLSlotElement) => Array.from(
  slot.assignedElements({ flatten: true }),
) as HTMLElement[];

/**
 * Check if an item is a SynNavItem or otherwise an item that has a role of menuitem.
 * Note we always treat all items as SynNavItems here
 * @param item The item to check for
 * @returns True if the item is a SynNavItem, false otherwise
 */
const isNavItem = (item: HTMLElement): item is SynNavItem => (
  item.tagName.toLocaleLowerCase() === 'syn-nav-item'
  || (item.getAttribute('role') ?? '') === 'menuitem'
);

/**
 * Get a list of only SynNavItem elements
 * @param items List of items to check for
 * @returns New array of all found syn-nav-items
 */
const filterOnlyNavItems = (items: HTMLElement[]) => items.filter(isNavItem);

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
 * @slot - The given navigation items. Must be `<syn-nav-item>`s or have a role of "menuitem"
 * @slot more - The content to display in the priority menu.
 * Will be filled with all items that cannot be displayed in the main navigation
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
  @query('slot:not([name])') private defaultSlot: HTMLSlotElement;

  /**
   * Reference to the slot where priority menu items are placed
   */
  @query('slot[name=more]') private menuSlot: HTMLSlotElement;

  /**
   * The wrapper that holds the horizontal navigation items
   */
  @query('.horizontal-nav') private horizontalNav: HTMLDivElement;

  /**
   * The priority menu dropdown
   */
  @query('.priority-menu') private priorityMenu: SynDropdown;

  /**
   * The components priority menu label.
   * This will be shown after the priority menu 3 dots link
   */
  @property({ attribute: 'priority-menu-label' }) priorityMenuLabel = 'Menu';

  /**
   * Internal state reflecting if the item positions have been cached
   */
  @state() private itemPositionsCached = false;

  /**
   * The amount of nav items that are currently slotted
   */
  @state() private itemAmount = 0;

  /**
   * Internal state reflecting if there are items in the priority menu
   */
  @state() private hasItemsInDropdown = false;

  /**
   * Get a list of all slotted `<syn-nav-item />` elements
   * that are either in the main slot or the priority menu slot
   */
  private getSlottedNavItems() {
    const slottedDefaultItems = getAssignedElementsForSlot(this.defaultSlot);
    const slottedMenuItems = getAssignedElementsForSlot(this.menuSlot);

    const filteredDefaultSlot = filterOnlyNavItems(slottedDefaultItems);
    const filteredMenuSlot = filterOnlyNavItems(slottedMenuItems);

    return filteredDefaultSlot.concat(filteredMenuSlot);
  }

  /**
   * Cache the items right offset position to make faster checks placement into priority menu
   * @param items The items to cache the position for
   */
  private cacheItemPositions(items: SynNavItem[]) {
    items.forEach(item => {
      // We have to measure while the items are in the primary slot,
      // else we will just get the placement in the priority menu
      item.removeAttribute('slot');
      const { right } = item.getBoundingClientRect();
      item.dataset.right = right.toString();
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
    const { clientWidth } = this.priorityMenu;
    const finalWidth = width - clientWidth;

    // Cache the first item
    let firstHiddenItemRightPos: number | undefined;

    // Save the position of all the elements in a cache
    navItems.forEach(item => {
      // Make sure to use the cache obtained in createGhostItems
      const isHidden = firstHiddenItemRightPos || parseFloat(item.dataset.right!) >= finalWidth;

      if (isHidden) {
        item.setAttribute('vertical', 'true');
        item.setAttribute('slot', 'more');

        // Makes sure the item is focusable in a syn-dropdown
        item.setAttribute('role', 'menuitem');

        // Get the position of the first item
        // Will get used to position the priority menu
        if (!firstHiddenItemRightPos) {
          firstHiddenItemRightPos = parseFloat(item.dataset.right!);
        }
      } else {
        item.removeAttribute('vertical');
        item.removeAttribute('slot');
        item.setAttribute('role', item.dataset.originalRole!);
      }
    });

    // Tell the render call that we have items in the priority menu
    this.hasItemsInDropdown = !!firstHiddenItemRightPos;
  }

  private renderPriorityMenu() {
    return html`
      <syn-dropdown
        class=${classMap({
          'priority-menu': true,
          'priority-menu--hidden': !this.hasItemsInDropdown,
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
          <slot name="more"></slot>
        </syn-menu>

      </syn-dropdown>
    `;
  }

  private slotChange() {
    const slottedItems = this.getSlottedNavItems();

    // Make sure to trigger a recalculation of the item positions if we a new list of slotted items
    if (slottedItems.length !== this.itemAmount) {
      this.cacheItemPositions(slottedItems);
      this.handlePriorityMenu();
      this.itemAmount = slottedItems.length;
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
