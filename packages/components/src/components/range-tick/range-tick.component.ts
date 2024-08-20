import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './range-tick.styles.js';

/**
 * @summary Ticks visually improve positioning on range sliders.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-range--docs
 * @status stable
 *
 * @slot - The tick's label
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The component's label.
 * @csspart line - The component's tick line.
 *
 * @cssproperty --tick-height - The height of the tick marker.
 * @cssproperty --tick-label-top - The top offset of the tick label.
 */
export default class SynRangeTick extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  /** The ticks's label. If you need to display HTML, use the default slot instead. */
  @property() label = '';

  /**
   * Whether the tick should be shown as a subdivision.
   */
  @property({ reflect: true, type: Boolean }) subdivision = false;

  render() {
    return html`
      <div
        class=${classMap({
          tick: true,
          'tick--subdivision': this.subdivision,
        })}
        part="base"
      >
        <div class="tick-line" part="line"></div>
        <div class="tick-label" part="label">
          <slot>
            ${this.label}
          </slot>
        </div>
      </div>
    `;
  }
}
