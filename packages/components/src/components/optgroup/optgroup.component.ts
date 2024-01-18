import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import type { CSSResultGroup } from 'lit';
import { watch } from '../../internal/watch.js';
import SynergyElement from '../../internal/synergy-element.js';
import { HasSlotController } from '../../internal/slot.js';
import SynDivider from '../divider/divider.component.js';
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

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  /** The optgroups label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  // @todo: Add disabled prop
  // @todo: Add watcher for disabled

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    return html`
      <div
        class=${classMap({
          optgroup: true,
          'optgroup--has-label': hasLabelSlot,
          'optgroup--has-prefix': this.hasSlotController.test('prefix'),
          'optgroup--has-suffix': this.hasSlotController.test('suffix'),
        })}
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
          <slot></slot>
        </div>
      </div>
    `;
  }
}
