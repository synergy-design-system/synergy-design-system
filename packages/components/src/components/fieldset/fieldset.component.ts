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
  getFormElements,
  isDisabledElement,
} from './helpers.js';

/**
 * @summary Fieldsets are used to group related elements in a form.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-fieldset--docs
 * @status stable
 * @since 3.x.x
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
 * @cssproperty --item-gap-normal - The gap between the fields in the fieldset when using normal layout. Defaults to `--syn-spacing-large`
 * @cssproperty --item-gap-dense - The gap between the fields in the fieldset when using dense layout. Defaults to `--syn-spacing-x-small`
 */
export default class SynFieldset extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, 'description', 'legend');

  private readonly forcedDisabledElements = new WeakSet<Element>();

  private readonly forcedGroupAwareElements = new WeakSet<Element>();

  private readonly lightDomObserver = new MutationObserver(() => {
    if (this.disabled) {
      this.syncDisabledState();
    }
  });

  private handleSlotChange = () => {
    if (this.disabled) {
      this.syncDisabledState();
    }

    this.syncGroupAwareState();
  };

  /**
   * The legend for the fieldset. This is displayed as the title of the fieldset.
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
    * The layout of the fieldset. This determines how the fields are displayed.
    * Defaults to `one-column`.
    *
    * - `one-column`: All fields are displayed in a single column.
    * - `two-columns`: Fields are displayed in two columns. Will automatically fall back to one-column if the fieldset is too narrow to display two columns.
   */
  @property({ reflect: true }) layout: 'one-column' | 'two-columns' = 'one-column';

  /**
   * The spacing between the fields in the fieldset. This can be set to `dense` or `normal`. Defaults to `normal`.
   * A dense layout is useful for displaying smaller form controls, e.g. checkboxes or radio buttons, while a normal layout is better suited for larger form controls, e.g. text inputs or selects.
   * The spacing can also be controlled with the `--item-gap-normal` and `--item-gap-dense` CSS variables.
   */
  @property({ attribute: 'item-spacing', reflect: true, type: String }) itemSpacing: 'dense' | 'normal' = 'normal';

  /**
   * Enables group-aware handling for direct child radio groups in two-column layout.
   * When enabled, direct child `<syn-radio-group>` elements are set to `option-layout="inline"`
   * unless they already define an explicit `option-layout`.
   */
  @property({ attribute: 'group-aware', reflect: true, type: Boolean }) groupAware = false;

  private syncDisabledState() {
    const elements = getFormElements(this);
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      if (isDisabledElement(el)) {
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
      }
    }
  }

  private getDirectChildRadioGroups() {
    return Array.from(this.children).filter(
      el => el.tagName.toLowerCase() === 'syn-radio-group',
    ) as HTMLElement[];
  }

  private syncGroupAwareState() {
    const radioGroups = this.getDirectChildRadioGroups();
    const shouldApplyInlineLayout = this.groupAware && this.layout === 'two-columns';

    for (let i = 0; i < radioGroups.length; i += 1) {
      const group = radioGroups[i];
      const hasExplicitLayout = group.hasAttribute('option-layout');

      if (shouldApplyInlineLayout && !hasExplicitLayout) {
        group.setAttribute('option-layout', 'inline');
        this.forcedGroupAwareElements.add(group);
      } else if (!shouldApplyInlineLayout && this.forcedGroupAwareElements.has(group)) {
        if (group.getAttribute('option-layout') === 'inline') {
          group.removeAttribute('option-layout');
        }
        this.forcedGroupAwareElements.delete(group);
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.lightDomObserver.observe(this, {
      attributeFilter: ['disabled'],
      attributes: true,
      childList: true,
      subtree: true,
    });

    this.syncGroupAwareState();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.lightDomObserver?.disconnect();
  }

  protected updated(_changedProperties: PropertyValues<this>) {
    super.updated(_changedProperties);
    if (_changedProperties.has('disabled')) {
      this.syncDisabledState();
    }

    if (_changedProperties.has('groupAware') || _changedProperties.has('layout')) {
      this.syncGroupAwareState();
    }
  }

  render() {
    const legendExists = this.hasSlotController.test('legend') || this.legend.length > 0;
    const descriptionExists = this.hasSlotController.test('description') || this.description.length > 0;

    return html`
      <fieldset
        class=${classMap({
          fieldset: true,
          'fieldset--dense': this.itemSpacing === 'dense',
          'fieldset--group-aware': this.groupAware,
          'fieldset--normal': this.itemSpacing === 'normal',
        })}
        ?disabled=${this.disabled}
        aria-describedby=${ifDefined(descriptionExists ? 'description' : undefined)}
        part="base"
      >
        ${legendExists
          ? html`
            <legend class="legend" part="legend">
              <slot name="legend">${this.legend}</slot>
            </legend>
          `
          : null
        }
        
        ${descriptionExists
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
