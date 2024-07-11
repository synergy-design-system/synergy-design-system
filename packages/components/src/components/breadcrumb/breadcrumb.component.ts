/**
 * ---------------------------------------------------------------------
 * 🔒 AUTOGENERATED BY VENDORISM
 * Removing this comment will prevent it from being managed by it.
 * ---------------------------------------------------------------------
 */

/* eslint-disable */
import { html } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { property, query } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynIcon from '../icon/icon.component.js';
import styles from './breadcrumb.styles.js';
import customStyles from './breadcrumb.custom.styles.js';
import type { CSSResultGroup } from 'lit';
import type SynBreadcrumbItem from '../breadcrumb-item/breadcrumb-item.js';

/**
 * @summary Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.
 * @documentation https://synergy.style/components/breadcrumb
 * @status stable
 * @since 2.0
 *
 * @slot - One or more breadcrumb items to display.
 * @slot separator - The separator to use between breadcrumb items. Works best with `<syn-icon>`.
 *
 * @dependency syn-icon
 *
 * @csspart base - The component's base wrapper.
 */
export default class SynBreadcrumb extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles, customStyles];
  static dependencies = { 'syn-icon': SynIcon };

  private readonly localize = new LocalizeController(this);
  private separatorDir = this.localize.dir();

  @query('slot') defaultSlot: HTMLSlotElement;
  @query('slot[name="separator"]') separatorSlot: HTMLSlotElement;

  /**
   * The label to use for the breadcrumb control. This will not be shown on the screen, but it will be announced by
   * screen readers and other assistive devices to provide more context for users.
   */
  @property() label = '';

  // Generates a clone of the separator element to use for each breadcrumb item
  private getSeparator() {
    const separator = this.separatorSlot.assignedElements({ flatten: true })[0] as HTMLElement;

    // Clone it, remove ids, and slot it
    const clone = separator.cloneNode(true) as HTMLElement;
    [clone, ...clone.querySelectorAll('[id]')].forEach(el => el.removeAttribute('id'));
    clone.setAttribute('data-default', '');
    clone.slot = 'separator';

    return clone;
  }

  private handleSlotChange() {
    const items = [...this.defaultSlot.assignedElements({ flatten: true })].filter(
      item => item.tagName.toLowerCase() === 'syn-breadcrumb-item'
    ) as SynBreadcrumbItem[];

    items.forEach((item, index) => {
      // Append separators to each item if they don't already have one
      const separator = item.querySelector('[slot="separator"]');
      if (separator === null) {
        // No separator exists, add one
        item.append(this.getSeparator());
      } else if (separator.hasAttribute('data-default')) {
        // A default separator exists, replace it
        separator.replaceWith(this.getSeparator());
      } else {
        // The user provided a custom separator, leave it alone
      }

      // The last breadcrumb item is the "current page"
      if (index === items.length - 1) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  render() {
    // We clone the separator and inject them into breadcrumb items, so we need to regenerate the default ones when
    // directionality changes. We do this by storing the current separator direction, waiting for render, then calling
    // the function that regenerates them.
    if (this.separatorDir !== this.localize.dir()) {
      this.separatorDir = this.localize.dir();
      this.updateComplete.then(() => this.handleSlotChange());
    }

    return html`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <syn-icon name="chevron-down" library="system" class=${this.localize.dir()}></syn-icon>
        </slot>
      </span>
    `;
  }
}