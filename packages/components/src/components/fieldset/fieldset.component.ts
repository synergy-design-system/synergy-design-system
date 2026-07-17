import {
  type CSSResultGroup,
  type PropertyValues,
  html,
} from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { HasSlotController } from '../../internal/slot.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './fieldset.styles.js';
import {
  applyGroupedControlLayout,
  getFormElements,
  getGroupedControlLayout,
  isDisabledElement,
} from './helpers.js';

/**
 * @summary Fieldsets are used to group related elements in a form.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-fieldset--docs
 * @status stable
 * @since 3.18.x
 *
 * @slot - The fieldset's main content. Place form controls inside the fieldset to group them together.
 * @slot legend - Add a legend to the fieldset. This is displayed as the title of the fieldset. Alternatively, you can use the `legend` attribute.
 * @slot description - Add a description to the fieldset. This is displayed below the legend and provides additional information about the fieldset. Alternatively, you can use the `description` attribute.
 *
 * @csspart base - The component's base wrapper.
 * @csspart legend - The component's legend element.
 * @csspart description - The component's description element.
 * @csspart field-container - The container for the fieldset's fields.
 *
 * @cssproperty --item-gap - The gap between the fields in the fieldset. Defaults to `--syn-spacing-large`
 */
export default class SynFieldset extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, 'description', 'legend');

  private readonly forcedDisabledElements = new WeakSet<Element>();

  private readonly lightDomObserver = new MutationObserver((records) => {
    if (this.disabled) {
      this.syncDisabledState();
    }

    if (records.some(record => record.type === 'childList')) {
      this.scheduleGroupedControlLayoutSync();
    }
  });

  private readonly fieldContainerResizeObserver = new ResizeObserver(() => {
    this.scheduleGroupedControlLayoutSync();
  });

  private groupedLayoutSyncAnimationFrame: number | null = null;

  private handleSlotChange = () => {
    if (this.disabled) {
      this.syncDisabledState();
    }

    this.scheduleGroupedControlLayoutSync();
  };

  /**
    * The description for the fieldset. This is displayed below the legend.
   * If not provided, the fieldset will not have a description.
   */
  @property({ reflect: true, type: String }) description = '';

  /**
   * The legend for the fieldset. This is displayed as the title of the fieldset.
   * If not provided, the fieldset will not have a legend.
   */
  @property({ reflect: true, type: String }) legend = '';

  /**
   * Whether the fieldset is disabled.
   * When true, all form controls inside the fieldset are disabled
   */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /**
   * Disables automatic grouped control layout syncing.
   * When true, nested grouped controls keep their own layout configuration.
   */
  @property({ attribute: 'disable-auto-group-layout', reflect: true, type: Boolean }) disableAutoGroupLayout = false;

  /**
    * The layout of the fieldset. This determines how the fields are displayed.
    * Defaults to `one-column`.
    *
    * - `one-column`: All fields are displayed in a single column.
    * - `two-columns`: Fields are displayed in two columns. Will automatically fall back to one-column if the fieldset is too narrow to display two columns.
   */
  @property({ reflect: true }) layout: 'one-column' | 'two-columns' = 'one-column';

  private getFieldContainerWidth(): number {
    const fieldContainer = this.shadowRoot?.querySelector<HTMLElement>('.fields');
    return fieldContainer?.getBoundingClientRect().width ?? 0;
  }

  private syncGroupedControlLayouts() {
    if (this.disableAutoGroupLayout) {
      return;
    }

    const targetLayout = getGroupedControlLayout(this.layout, this.getFieldContainerWidth());
    applyGroupedControlLayout(this, targetLayout);
  }

  private scheduleGroupedControlLayoutSync() {
    if (this.groupedLayoutSyncAnimationFrame !== null) {
      return;
    }

    this.groupedLayoutSyncAnimationFrame = requestAnimationFrame(() => {
      this.groupedLayoutSyncAnimationFrame = null;
      this.syncGroupedControlLayouts();
    });
  }

  private syncDisabledState() {
    Array
      .from(getFormElements(this))
      .filter(isDisabledElement)
      .forEach(el => {
        /* eslint-disable no-param-reassign */
        if (this.disabled) {
          if (!el.disabled) {
            this.forcedDisabledElements.add(el);
            el.disabled = true;
          }
        }

        // Only revert controls that were disabled by this fieldset instance.
        if (!this.disabled && this.forcedDisabledElements.has(el)) {
          el.disabled = false;
        }
        /* eslint-enable no-param-reassign */
      });
  }

  connectedCallback() {
    super.connectedCallback();
    this.lightDomObserver.observe(this, {
      attributeFilter: ['disabled'],
      attributes: true,
      childList: true,
      subtree: true,
    });
  }

  firstUpdated() {
    const fieldContainer = this.shadowRoot?.querySelector<HTMLElement>('.fields');
    if (fieldContainer) {
      this.fieldContainerResizeObserver.observe(fieldContainer);
    }

    this.syncGroupedControlLayouts();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.lightDomObserver?.disconnect();
    this.fieldContainerResizeObserver?.disconnect();

    if (this.groupedLayoutSyncAnimationFrame !== null) {
      cancelAnimationFrame(this.groupedLayoutSyncAnimationFrame);
      this.groupedLayoutSyncAnimationFrame = null;
    }
  }

  protected updated(_changedProperties: PropertyValues<this>) {
    super.updated(_changedProperties);
    if (_changedProperties.has('disabled')) {
      this.syncDisabledState();
    }

    if (_changedProperties.has('layout') || _changedProperties.has('disableAutoGroupLayout')) {
      this.scheduleGroupedControlLayoutSync();
    }
  }

  render() {
    const hasLegend = this.hasSlotController.test('legend') || this.legend.length > 0;
    const hasDescription = this.hasSlotController.test('description') || this.description.length > 0;

    return html`
      <fieldset
        class=${classMap({
          fieldset: true,
          'fieldset--has-description': hasDescription,
          'fieldset--has-legend': hasLegend,
        })}
        ?disabled=${this.disabled}
        aria-describedby=${ifDefined(hasDescription ? 'description' : undefined)}
        part="base"
      >
        ${hasLegend
          ? html`
            <legend class="legend" part="legend">
              <slot name="legend">${this.legend}</slot>
            </legend>
          `
          : null
        }

        ${hasDescription
          ? html`
            <div class="description" id="description" part="description">
              <slot name="description">${this.description}</slot>
            </div>
          `
          : null
        }

        <div
          class=${classMap({
            fields: true,
            'fields--two-columns': this.layout === 'two-columns',
          })}
          part="field-container"
        >
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
      </fieldset>
    `;
  }
}
