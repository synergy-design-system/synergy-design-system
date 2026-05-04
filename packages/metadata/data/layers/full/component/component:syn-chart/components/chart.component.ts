import { html } from 'lit';
import type { CSSResultGroup } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './chart.styles.js';

/**
 * @summary The `<syn-chart>` component is a container for displaying charts. It provides a structured layout and styling for chart elements, allowing for consistent presentation across different types of charts.
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-chart--docs
 * @status experimental
 * @since 0.0.0
 *
 * @csspart base - The component's base wrapper.
 */
export default class SynChart extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  render() {
    console.log(this);
    return html`
      <div 
        part="base"
        class=${classMap({
          chart: true,
        })}>
      </div>
    `;
  }
}
