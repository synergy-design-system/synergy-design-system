import {
  type CSSResultGroup,
  type PropertyValues,
  html,
  nothing,
} from 'lit';
import { property } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './pagination.styles.js';
import SynDivider from '../divider/divider.component.js';
import SynIconButton from '../icon-button/icon-button.component.js';
import SynInput from '../input/input.component.js';
import SynOption from '../option/option.component.js';
import SynSelect from '../select/select.component.js';
import {
  calculatePageItemIndices,
  calculateTotalPages,
  clampPage,
  getMaxOptionCharCount,
  getTotalPages,
  getTotalPagesCharCount,
} from './utility.js';
import type { SynInputEvent } from '../../events/events.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * @summary <syn-pagination /> is a component that provides a data-heavy views, combining page navigation, direct page input, and configurable page-size selection in one control.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-pagination--docs
 * @status stable
 * @since 3.0.0
 *
 * @event syn-pagination-page-changed - Emitted when the current page changes
 * @event syn-pagination-page-size-changed - Emitted when the page size changes
 *
 * @csspart base - The component's base wrapper.
 * @csspart page-size-select - The page size select element.
 * @csspart page-item-summary - The text element displaying the current page item range and total items.
 * @csspart page-input-section - The section containing the page number input and total pages display.
 * @csspart page-input - The page number input element.
 * @csspart navigation - The pagination navigation element.
 */
@enableDefaultSettings('SynPagination')
export default class SynPagination extends SynergyElement {
  private readonly baseRef = createRef<HTMLDivElement>();

  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  static dependencies = {
    'syn-divider': SynDivider,
    'syn-icon-button': SynIconButton,
    'syn-input': SynInput,
    'syn-option': SynOption,
    'syn-select': SynSelect,
  };

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
  @property({ attribute: 'page-size', reflect: true, type: Number }) pageSize = 25;

  /**
   * An array of numbers representing the available options for the number of items to display per page. The default value is [10, 25, 50, 100].
   * The component will use this array to populate the rows-per-page selector, allowing users to choose from the specified options.
   */
  @property({
    attribute: 'page-size-options',
    converter: {
      fromAttribute: (value: string) => value
        .split(',')
        .map(val => {
          const num = parseInt(val.trim(), 10);
          return Number.isSafeInteger(num) ? num : null;
        })
        .filter(Boolean),
    },
    type: Array,
  }) pageSizeOptions: number[] = [10, 25, 50, 100];

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

  private pageChangedViaUserInput(e: SynInputEvent) {
    this.updateCurrentPage((e.target as SynInput).valueAsNumber);
  }

  /**
   * Updates the current page number and emits a "syn-pagination-page-changed" event with the new and previous page numbers.
    * This method is called when the page number is changed via the page input or the navigation buttons.
   */
  private updateCurrentPage(newPage: number) {
    const { currentPage } = this;
    this.emit('syn-pagination-page-changed', {
      detail: {
        currentPage: newPage,
        previousPage: currentPage,
      },
    });

    this.currentPage = newPage;
  }

  /**
   * Called when the page size is changed via the page size input.
   * Emits a "syn-pagination-page-size-changed" event with the new and previous page sizes.
   */
  private pageSizeChanged(e: SynInputEvent) {
    const { currentPage, pageSize } = this;
    const currentTarget = e.target as SynSelect;
    const { value } = currentTarget;
    const nextPageSize = parseInt(value as string, 10);

    // Validate the new page size before applying it
    if (!Number.isSafeInteger(nextPageSize) || nextPageSize <= 0) return;

    // When we switch from a smaller value to a larger one,
    // we also have to adjust the current page marker.
    const oldStartIndex = (currentPage - 1) * pageSize + 1;
    const nextTotalPages = getTotalPages(nextPageSize, this.totalItems);

    const nextPage = clampPage(
      Math.floor((oldStartIndex - 1) / nextPageSize) + 1,
      nextTotalPages,
    );

    this.pageSize = nextPageSize;
    this.currentPage = nextPage;

    this.emit('syn-pagination-page-size-changed', {
      detail: {
        currentPageSize: nextPageSize,
        previousPageSize: pageSize,
      },
    });

    if (nextPage !== currentPage) {
      this.emit('syn-pagination-page-changed', {
        detail: {
          currentPage: nextPage,
          previousPage: currentPage,
        },
      });
    }
  }

  protected willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);

    if (changed.has('currentPage') || changed.has('pageSize') || changed.has('totalItems')) {
      // If the current page exceeds the total number of pages based on the new page size or total items, we need to adjust it to ensure it remains within valid bounds.
      const totalPages = getTotalPages(this.pageSize, this.totalItems);
      const clamped = clampPage(this.currentPage, totalPages);
      if (clamped !== this.currentPage) {
        this.currentPage = clamped;
      }
    }
  }

  protected updated(changed: PropertyValues<this>) {
    super.updated(changed);

    // When the size of available options or the page size changes,
    // we have to adjust the width of our page size select/input controls.
    if (changed.has('pageSizeOptions') || changed.has('pageSize') || changed.has('totalItems')) {
      const maxOptionCharCount = getMaxOptionCharCount(this.pageSizeOptions);
      const totalPagesCharCount = getTotalPagesCharCount(this.pageSize, this.totalItems);
      const baseElement = this.baseRef.value;

      if (baseElement) {
        baseElement.style.setProperty('--pagination-page-size-option-char-count', String(maxOptionCharCount));
        baseElement.style.setProperty('--pagination-total-pages-char-count', String(totalPagesCharCount));
      }
    }
  }

  render() {
    // List of total pages.
    // Used to determine the disabled state of navigation buttons and to calculate the page item indices for display.
    const totalPages = calculateTotalPages(this.totalItems, this.pageSize);

    // Condition to determine if the pagination controls should be disabled.
    const isDisabled = this.disabled || totalPages === 0;

    // Calculate the start and end item indices for the current page to display in the pagination summary (e.g., "11-20 of 100 items").
    const pageItemIndices = calculatePageItemIndices(this.totalItems, this.pageSize, this.currentPage);

    // If the current page size is not included in the available options,
    // we select the first option as the default value to ensure the select input displays a valid option.
    const selectedPageSizeOption = this.pageSizeOptions.includes(this.pageSize)
      ? this.pageSize
      : this.pageSizeOptions[0];

    /* eslint-disable @typescript-eslint/unbound-method */
    return html`
      ${this.divider ? html`<syn-divider></syn-divider>` : nothing}
      <div class="base" ${ref(this.baseRef)}>
        <syn-select
          class="pagination__page-size-select"
          ?disabled=${isDisabled}
          part="page-size-select"
          value=${selectedPageSizeOption}
          size=${this.size}
          @syn-change=${this.pageSizeChanged}
        >
          <span slot="label">
            Items per page
          </span>

          ${this.pageSizeOptions.map(option => html`
            <syn-option value="${option}">
              ${option}
            </syn-option>
          `)}
        </syn-select>
        <!-- /.pagination__page-size-select -->

        <span part="page-item-summary">
          ${pageItemIndices.startIndex}-${pageItemIndices.endIndex} of ${this.totalItems} items
        </span>
        <!-- /.pagination__page-item-summary -->

        <nav
          aria-label="Pagination navigation"
          class="pagination__navigation"
          part="navigation"
        >
          <section aria-label="Page navigation controls for first and previous page">
            <syn-icon-button
              @click=${() => this.updateCurrentPage(1)}
              color="primary"
              ?disabled=${this.currentPage === 1 || isDisabled}
              label="First page"
              name="first_page"
              size=${this.size}
            ></syn-icon-button>

            <syn-icon-button
              @click=${() => this.updateCurrentPage(this.currentPage - 1)}
              color="primary"
              ?disabled=${this.currentPage === 1 || isDisabled}
              label="Previous page"
              name="chevron_left"
              size=${this.size}
            ></syn-icon-button>
          </section>

          <section aria-label="Manual page input" part="page-input-section">
            <syn-input
              class="pagination__page-input"
              ?disabled=${isDisabled}
              max=${totalPages}
              min="1"
              no-spin-buttons
              numeric-strategy="modern"
              part="page-input"
              size=${this.size}
              @syn-change=${this.pageChangedViaUserInput}
              type="number"
              value=${this.currentPage}
            ></syn-input>
            
            <span>of ${totalPages}</span>
          </section>

          <section aria-label="Page navigation controls for next and last page">
            <syn-icon-button
              @click=${() => this.updateCurrentPage(this.currentPage + 1)}
              color="primary"
              ?disabled=${this.currentPage === totalPages || isDisabled}
              label="Next page"
              name="chevron_right"
              size=${this.size}
            ></syn-icon-button>
            
            <syn-icon-button
              @click=${() => this.updateCurrentPage(totalPages)}
              color="primary"
              ?disabled=${this.currentPage === totalPages || isDisabled}
              label="Last page"
              name="last_page"
              size=${this.size}
            ></syn-icon-button>
          </section>
        </nav>
        <!-- /.pagination__navigation -->
      </div>
    `;
    /* eslint-enable @typescript-eslint/unbound-method */
  }
}
