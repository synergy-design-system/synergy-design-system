import {
  type ComposeOption, type EChartsType, init, use,
} from 'echarts/core.js';
import { CanvasRenderer } from 'echarts/renderers.js';
import { html } from 'lit';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { LineChart, type LineSeriesOption } from 'echarts/charts.js';
import {
  GridComponent, LegendComponent, TitleComponent, TooltipComponent,
} from 'echarts/components.js';
import { classMap } from 'lit/directives/class-map.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './chart.styles.js';

// Scoped option type — only includes the components and chart types registered via use()
type ECOption = ComposeOption<LineSeriesOption>;

// TODO: Check, should we dynamically import these, so bundle size is optimized for users for only the things they use?
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

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

  @query('.chart', true)
  private chartContainer: HTMLDivElement;

  private chartInstance: EChartsType;

  private resizeObserver: ResizeObserver;

  /**
   * The ECharts configuration option object.
   *
   * This property maps 1:1 to the ECharts `option` parameter passed to `setOption()`.
   * Consult the [ECharts option documentation](https://echarts.apache.org/en/option.html)
   * and assign the object directly to this property.
   *
   * > **Note:** Currently only **line charts** (`series[].type: 'line'`) are supported.
   * > Support for additional chart types (bar, pie, etc.) will be added in future releases or can be requested.
   *
   * Assigning a new object completely replaces the previous chart configuration (`notMerge: true`).
   * To update only parts of the chart, access the underlying ECharts instance directly and
   * call `setOption()` with custom merge options.
   *
   * @example
   * ```js
   * chart.option = {
   *   xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
   *   yAxis: { type: 'value' },
   *   series: [{ type: 'line', data: [150, 230, 224] }],
   * };
   * ```
   */
  @property({ attribute: false })
  option: ECOption = {};

  protected updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('option') && this.chartInstance) {
      this.chartInstance.setOption(this.option, { notMerge: true });
    }
  }

  // Initialize echarts instance and resize observer
  protected firstUpdated(_changedProperties: PropertyValues): void {
    if (this.chartContainer !== null && this.chartContainer !== undefined) {
      this.chartInstance = init(this.chartContainer);
      // Resize observer
      this.resizeObserver = new ResizeObserver(() => {
        this.chartInstance?.resize();
      });
      this.resizeObserver.observe(this.chartContainer);

      // Apply option if already set before first render
      if (Object.keys(this.option).length > 0) {
        this.chartInstance.setOption(this.option);
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.chartInstance?.dispose();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
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
