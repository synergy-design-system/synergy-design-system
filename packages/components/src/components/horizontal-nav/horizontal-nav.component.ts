import { classMap } from 'lit/directives/class-map.js';
import type { CSSResultGroup } from 'lit';
import { html } from 'lit/static-html.js';
import { query, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './horizontal-nav.styles.js';
import SynIcon from '../icon/icon.component.js';
import SynNavItem from '../nav-item/nav-item.component.js';

/**
 * @summary Dividers are used to visually separate or group elements.
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
 */
export default class SynHorizontalNav extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-icon': SynIcon,
    'syn-nav-item': SynNavItem,
  };

  /**
   * Internal intersection observer that decides when to move items into the priority menu
   */
  private intersectionObserver: IntersectionObserver;

  /**
   * Reference to the rendered children slot
   */
  @query('slot') defaultSlot: HTMLSlotElement;

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
   * Make sure that items will get moved to the priority menu.
   */
  private handleSlotChange() {
    // Add all slotted nav-items to the intersection observer
    this.getSlottedNavItems().forEach(navItem => {
      this.intersectionObserver.observe(navItem);
    });
  }

  private renderPriorityMenu() {
    const items = this.priorityMenuItems;

    if (items.length === 0) {
      return html``;
    }

    return html`
      <div
        class=${classMap({
          'priority-menu': true,
        })}
      >
        <syn-nav-item>
          <syn-icon name="more_horiz" label="More" slot="prefix"></syn-icon>
          Menu
        </syn-nav-item>

        <ul
          class=${classMap({
            'priority-menu-list': true,
          })}
        >
          ${items.map(i => html`
            <li>${i.textContent}</li>
          `)}
        </ul>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    const callback = (entries: IntersectionObserverEntry[]) => {
      console.log(entries);
      entries.forEach(({ isIntersecting, target }) => {
        const ariaHidden = isIntersecting ? 'false' : 'true';
        const display = isIntersecting ? 'block' : 'none';
        target.setAttribute('aria-hidden', ariaHidden);
        target.style.display = display;
      });

      this.priorityMenuItems = entries
        .filter(({ isIntersecting }) => !isIntersecting)
        .map(({ target }) => (target as SynNavItem));
    };

    this.intersectionObserver = new IntersectionObserver(callback, {
      root: this,
      threshold: 1.0,
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.intersectionObserver.disconnect();
  }

  render() {
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <nav
        class=${classMap({
          'horizontal-nav': true,
        })}
        part="base"
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${this.renderPriorityMenu()}
      </nav>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
