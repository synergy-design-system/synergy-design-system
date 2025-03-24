/* eslint-disable @typescript-eslint/unbound-method */
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { property, queryAssignedElements } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import SynergyElement from '../../internal/synergy-element.js';
import { HasSlotController } from '../../internal/slot.js';
import SynDivider from '../divider/divider.component.js';
import type SynOption from '../option/option.component.js';
import styles from './optgroup.styles.js';

/**
 * @summary The <syn-optgroup> element creates a grouping for <syn-option>s within a <syn-select>.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-optgroup--docs
 * @status stable
 * @since 1.3.0
 *
 * @dependency syn-divider
 *
 * @slot - The given options. Must be `<syn-option>` elements.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot label - The label for the optgroup
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label-container - The container that wraps prefix, label and base
 * @csspart divider - The divider that is displayed above the content
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart options - The container that wraps the <syn-option> elements.
 *
 * @cssproperty --display-divider - Display property of the divider. Defaults to "block"
 */
export default class SynOptgroup extends SynergyElement {
  static styles: CSSResultGroup = styles;

  static dependencies = {
    'syn-divider': SynDivider,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix', 'label');

  private mutationObserver: MutationObserver;

  @queryAssignedElements({ selector: 'syn-option' }) assignedOptions: SynOption[];

  /**
   * Disables all options in the optgroup.
   */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /**
   * The optgroups label. If you need to display HTML, use the `label` slot instead.
   */
  @property() label = '';

  connectedCallback() {
    super.connectedCallback();

    this.mutationObserver = new MutationObserver(entries => {
      /* eslint-disable no-param-reassign */

      // Check if the mutation is for this optgroup
      const hasChangesForOptGroup = entries.some(entry => entry.target === this);

      // If the optgroup is disabled, disable all options
      // If the optgroup is enabled, reenable all options that were enabled before
      if (hasChangesForOptGroup) {
        this.mutationObserver.disconnect();

        this.assignedOptions.forEach(option => {
          if (this.disabled) {
            option.disabled = true;
          } else {
            option.disabled = !!option.dataset?.originallyDisabled;
          }
        });

        // We need to disable the mutation observer to make sure
        // that we don't get the changed from above in this update cycle.
        // This makes it possible to use just one mutation observer for all optgroups.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.updateComplete.then(() => {
          this.mutationObserver.observe(this, {
            attributeFilter: ['disabled'],
            subtree: true,
          });
        });

        return;
      }

      entries
        .filter(entry => (entry.target as HTMLElement).matches('syn-option'))
        .forEach(entry => {
          const option = entry.target as SynOption;
          if (option.disabled) {
            option.dataset.originallyDisabled = 'true';
          } else {
            delete option.dataset.originallyDisabled;
          }
        });
      /* eslint-enable no-param-reassign */
    });

    this.mutationObserver.observe(this, {
      attributeFilter: ['disabled'],
      subtree: true,
    });
  }

  render() {
    const { disabled } = this;
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    return html`
      <div
        class=${classMap({
          optgroup: true,
          'optgroup--has-label': hasLabel,
          'optgroup--has-prefix': this.hasSlotController.test('prefix'),
          'optgroup--has-suffix': this.hasSlotController.test('suffix'),
          'optgroup--is-disabled': this.disabled,
        })}
        role="${disabled ? 'presentation' : 'group'}"
        part="base"
      >
        <syn-divider class="optgroup__divider" part="divider"></syn-divider>
        <div class="optgroup__label-container" part="label-container">
          <slot name="prefix" part="prefix" class="optgroup__prefix"></slot>
          <slot name="label" part="label" class="optgroup__label">
            <span class="optgroup__label-content">
              ${this.label}
            </span>
          </slot>
          <slot name="suffix" part="suffix" class="optgroup__suffix"></slot>
        </div>
        <div class="optgroup__options" role="group" part="options">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
