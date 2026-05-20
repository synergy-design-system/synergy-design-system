import {
  type EChartsType, init, use,
} from 'echarts/core.js';
import { CanvasRenderer } from 'echarts/renderers.js';
import { html } from 'lit';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { LineChart } from 'echarts/charts.js';
import {
  GridComponent, LegendComponent, TitleComponent, TooltipComponent,
} from 'echarts/components.js';
import { classMap } from 'lit/directives/class-map.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './chart.styles.js';
import { PALETTE_TOKENS, type SynChartPalette } from './chart.palettes.js';
import type { ECOption } from './types.js';

// TODO: Check, should we let the user define the *use* so the bundle size is optimized for their specific use case?
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

/**
 * @summary The `<syn-chart>` component is a container for displaying charts. It provides a structured layout and styling for chart elements, allowing for consistent presentation across different types of charts. The chart component is based on [Apache ECharts](https://echarts.apache.org)
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/charting-syn-chart--docs
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

  @query('.chart')
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

  /**
   * The color palette to apply to chart series.
   *
   * - `categorical` (default) — 12 distinct colors for comparing unrelated data series
   * - `sequential-01` … `sequential-07` — 10-step single-hue ramps:
   *   `01`=primary, `02`=accent, `03`=muted, `04`=purple, `05`=teal, `06`=magenta, `07`=neutral
   * - `sequential-status-critical`, `sequential-status-error`, `sequential-status-info`,
   *   `sequential-status-success`, `sequential-status-warning` — 10-step status ramps
   *
   * The palette sets the ECharts `color` array. If `option.color` is explicitly provided,
   * it takes precedence over the palette.
   */
  @property({ reflect: true })
  palette: SynChartPalette = 'categorical';

  /** Resolves palette CSS custom properties to computed color values and applies them to the chart. */
  private applyPalette(): void {
    if (!this.chartInstance) return;
    // If the user explicitly set option.color, respect it — palette is a default only
    if (Array.isArray(this.option.color) && this.option.color.length > 0) return;

    const tokens = PALETTE_TOKENS[this.palette];
    const computedStyles = getComputedStyle(this);
    const colors = tokens
      .map(token => computedStyles.getPropertyValue(token).trim())
      .filter(Boolean);

    if (colors.length > 0) {
      this.chartInstance.setOption({ color: colors }, { notMerge: false });
    }
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('option') && this.chartInstance) {
      this.chartInstance.setOption(this.option, { notMerge: true });
    }
    if ((changedProperties.has('palette') || changedProperties.has('option')) && this.chartInstance) {
      this.applyPalette();
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
      // Apply palette after option so colors blend in without replacing the full config
      this.applyPalette();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.chartInstance?.dispose();
  }

  /**
   * Returns the underlying ECharts instance, giving direct access to the full
   * [ECharts API](https://echarts.apache.org/en/api.html#echartsInstance).
   *
   * Use this when the `option` property alone is not sufficient — for example to
   * imperatively call `setOption()` with custom merge flags, listen to ECharts events,
   * trigger actions, or retrieve chart data.
   *
   * Returns `undefined` if called before the component has been connected to the DOM
   * (i.e. before `firstUpdated` has run).
   *
   * @example
   * ```js
   * const instance = chart.getInstance();
   *
   * // Listen to ECharts events
   * instance?.on('click', params => console.log(params));
   *
   * // Partial update without replacing the full option
   * instance?.setOption({ series: [{ data: [1, 2, 3] }] }, { replaceMerge: 'series' });
   * ```
   */
  getInstance(): EChartsType | undefined {
    return this.chartInstance;
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
