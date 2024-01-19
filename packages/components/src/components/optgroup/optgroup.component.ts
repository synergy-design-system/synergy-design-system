/* eslint-disable @typescript-eslint/unbound-method */
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { property, query, state } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import { watch } from '../../internal/watch.js';
import SynergyElement from '../../internal/synergy-element.js';
import { HasSlotController } from '../../internal/slot.js';
import SynDivider from '../divider/divider.component.js';
import type SynOption from '../option/option.component.js';
import styles from './optgroup.styles.js';

/**
 * @summary The <syn-optgroup> element creates a grouping for <syn-option />s within a <syn-select>.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-optgroup--docs
 * @status stable
 * @since 1.3.0
 *
 * @dependency syn-divider
 *
 * @slot - The given options. Must be `<syn-option>` elements.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot label - The label for the opt group
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label-container - The container that wraps prefix, label and base
 * @csspart divider - The divider that is displayed above the content
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart options - The container that wraps the syn-options.
 *
 * @cssproperty --display-divider - Display property of the divider
 */
export default class SynOptgroup extends SynergyElement {
  static styles: CSSResultGroup = styles;

  static dependencies = {
    'syn-divider': SynDivider,
  };

  private readonly hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix', 'label');

  /**
   * The default slot
   */
  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /**
   * The disabled state
   */
  @state() private isDisabled = false;

  /**
   * Provides a method that sets the disabled prop to all syn-options when it is triggered
   */
  private handleDisableOptions() {
    const { disabled } = this;
    this.defaultSlot
      .assignedElements()
      .filter(opt => opt.tagName.toLowerCase() === 'syn-option')
      .forEach((opt: SynOption) => {
        // eslint-disable-next-line no-param-reassign
        opt.disabled = disabled;
      });
  }

  connectedCallback() {
    super.connectedCallback();
    this.isDisabled = this.disabled;
  }

  /** The optgroups label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** Disables all options in the optgroup. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange(_: typeof this.disabled, newValue: typeof this.disabled) {
    this.isDisabled = newValue;
    this.handleDisableOptions();
  }

  render() {
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
        role="${this.isDisabled ? 'presentation' : 'group'}"
        part="base"
      >
        <syn-divider class="optgroup--divider" part="divider"></syn-divider>
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
          <slot @slotchange=${this.handleDisableOptions}></slot>
        </div>
      </div>
    `;
  }
}
