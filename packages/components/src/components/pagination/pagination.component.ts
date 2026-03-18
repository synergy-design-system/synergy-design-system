import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './pagination.styles.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * @summary The default pagination offers the most comprehensive controls and is optimized for tables, lists, and complex data views.
 * It is intended for use cases where users need to adjust both the number of displayed rows and the active page.
 * The navigation controls allow switching between pages as well as jumping directly to the first or last page.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-pagination--docs
 * @status stable
 * @since 3.0.0
 *
 * @csspart base - The component's base wrapper.
 */
@enableDefaultSettings('SynPagination')
export default class SynPagination extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  /**
   * When true, a divider is displayed between the page navigation controls and the rows-per-page selector.
   */
  @property({ type: Boolean }) divider = false;

  /**
   * When true, the pagination controls are disabled and non-interactive.
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * The size of the pagination controls.
   */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * The current page number. The default value is 1.
   * The component will emit a "page-change" event whenever the page changes, allowing you to respond to page changes in your application.
   */
  @property({ attribute: 'current-page', reflect: true, type: Number }) currentPage = 1;

  /**
   * The number of items to display per page. The default value is 25.
   * The component will emit a "page-size-change" event whenever the page size changes, allowing you to respond to page size changes in your application.
   */
  @property({ attribute: 'page-size', reflect: true, type: Number }) pageSize = 0;

  /**
   * An array of numbers representing the available options for the number of items to display per page. The default value is [10, 25, 50, 100].
   * The component will use this array to populate the rows-per-page selector, allowing users to choose from the specified options.
   */
  @property({ attribute: 'page-size-options', reflect: true, type: Array }) pageSizeOptions = [10, 25, 50, 100];

  /**
   * Total amount of items. The component will use this value to calculate the total number of pages based on the selected rows per page.
   */
  @property({ attribute: 'total-items', reflect: true, type: Number }) totalItems = 0;

  /**
   * The pagination variant to use. The "full" variant includes comprehensive controls for navigating between pages and adjusting the number of displayed rows,
   * while the "compact" variant offers a streamlined interface with essential navigation controls.
   * The default value is "full".
   */
  @property({ attribute: 'variant', reflect: true }) variant: 'full' | 'compact' = 'full';

  render() {
    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      <div
        class=${classMap({
          base: true,
          'pagination--compact': this.variant === 'compact',
          'pagination--full': this.variant === 'full',
        })}
      >
        Hello pagination ${this.variant}
      </div>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
