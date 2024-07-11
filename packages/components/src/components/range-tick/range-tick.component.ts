import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './range-tick.styles.js';

/**
 * @summary Ticks visually improve positioning on range sliders.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-range--docs
 * @status stable
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The component's label.
 *
 * @cssproperty --tick-height - The height of the tick marker.
 * @cssproperty --tick-label-top - The top offset of the tick label.
 */
export default class SynRangeTick extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  private readonly hasSlotController = new HasSlotController(this, '[default]');

  /** The ticks's label. If you need to display HTML, use the default slot instead. */
  @property() label = '';

  render() {
    const hasLabel = this.hasSlotController.test('[default]') || this.label?.length > 0;
    return html`
      <div
        class=${classMap({
          tick: true,
          'tick--has-label': hasLabel,
        })}
        part="base"
      >
        <div class="tick-label" part="label">
          <slot>
            ${this.label}
          </slot>
        </div>
      </div>
    `;
  }
}
