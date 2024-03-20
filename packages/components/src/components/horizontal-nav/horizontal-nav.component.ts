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
 * Check if an item is a SynNavItem
 * @param item The item to check for
 * @returns True if the item is a SynNavItem, false otherwise
 */
const isNavItem = (item: HTMLElement): item is SynNavItem => item instanceof SynNavItem;

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
 * @slot - The given navigation items. Must be `<syn-nav-item>` elements
 * @slot more - The content to display in the priority menu
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
  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /**
   * Reference to the slot where priority menu items are placed
   */
  @query('slot[name=more]') menuSlot: HTMLSlotElement;

  /**
   * The wrapper that holds the horizontal navigation items
   */
  @query('.horizontal-nav') horizontalNav: HTMLDivElement;

  /**
   * The components priority menu label.
   * This will be shown after the priority menu 3 dots link
   */
  @property({ attribute: 'priority-menu-label' }) priorityMenuLabel = 'Menu';

  @state() private ghostItemsCreated = false;

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
   * Create ghost items that will be used for determining the position of the items
   * @param items The items to cache the position for
   */
  private createGhostItems(items: SynNavItem[]) {
    items.forEach(item => {
      const { right } = item.getBoundingClientRect();
      // const uniqueItemId = uuid();
      item.dataset.right = right.toString();
      // item.dataset.id = uniqueItemId;

      // const ghost = item.cloneNode(true) as SynNavItem;
      // ghost.setAttribute('visibility', 'hidden');
      // ghost.style.display = 'none';
      // ghost.style.visibility = 'hidden';
      // ghost.setAttribute('aria-hidden', 'true');
      // item.after(ghost);
    });

    this.ghostItemsCreated = true;
  }

  /**
   * Determines which items should be shown or hidden, depending on the current width
   */
  private handlePriorityMenu() {
    const navItems = this.getSlottedNavItems();

    if (!this.ghostItemsCreated) {
      this.createGhostItems(navItems);
    }

    const { width } = this.horizontalNav.getBoundingClientRect();

    // Save the position of all the elements in a cache
    navItems.forEach(item => {
      // Move the item to the priority menu if it's hidden
      // Make sure to use the cache obtained in createGhostItems
      const savedRightPosition = parseFloat(item.dataset.right!);
      const isHidden = savedRightPosition >= width;

      console.log(item.innerText, isHidden);

      if (isHidden) {
        item.setAttribute('vertical', 'true');
        item.setAttribute('slot', 'more');

        // Makes sure the item is tababble in a syn-dropdown
        item.setAttribute('role', 'menuitem');
      } else {
        item.removeAttribute('vertical');
        item.removeAttribute('slot');
        item.removeAttribute('role');
      }
    });
  }

  private renderPriorityMenu() {
    return html`
      <syn-dropdown
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
    console.log(slottedItems);
    // if (this.itemAmount !== slottedItems.length) {
    //   console.log('here');
    //   this.itemAmount = slottedItems.length;
    //   this.ghostItemsCreated = false;
    //   this.handlePriorityMenu();
    // }
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
