import {
  type EChartsType, init, registerPreprocessor, registerTheme, use,
} from 'echarts/core.js';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers.js';
import { html } from 'lit';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import {
  GaugeChart, LineChart,
} from 'echarts/charts.js';
import {
  DataZoomComponent,
  GridComponent, LegendComponent, TitleComponent, TooltipComponent,
} from 'echarts/components.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './chart.styles.js';
import { type ChartPalette, PALETTE_TOKENS } from './chart.palettes.js';
import { resolveConfigInput } from './configs/config.js';
import type { ChartConfigType, ECConfig } from './types.js';
import { applyAxisDefaultsPreprocessor } from './configs/axes/utilities.js';
import { getRealStyleValue, setGlobalThemeStore } from './themes/utilities.js';
import { getSynergyTheme } from './themes/theme.js';
import { donutInstall } from './configs/donut-series/install.js';
import { gaugeInstall } from './configs/gauge-series/install.js';

// TODO: Check, should we let the user define the *use* so the bundle size is optimized for their specific use case?
use([
  CanvasRenderer,
  SVGRenderer,
  LineChart,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  // @ts-expect-error - I don't know where this typescript error comes from
  donutInstall,
  // @ts-expect-error - I don't know where this typescript error comes from
  gaugeInstall,
]);

/**
 * @summary The `<syn-chart>` component is a container for displaying charts. It provides a structured layout and styling for chart elements, allowing for consistent presentation across different types of charts. The chart component is based on [Apache ECharts](https://echarts.apache.org)
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/charting-syn-chart--docs
 * @status experimental
 * @since 3.15.0
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

  private resolvedConfig: ECConfig = {};

  // TODO: check if a global mutation observer is a better solution for theme changes, as it will be created for every chart instance. Needs to be checked with the real theme switch handling, if mutation observer does make sense at all.
  private themeObserver: MutationObserver;

  private isInitialConfigSet = false;

  /**
   * The ECharts configuration input.
   *
   * This property accepts either:
   * - a plain `ECConfig` object, or
   * - a callback that receives a typed preset handle and applies chart presets.
   *
   * The resolved result maps 1:1 to the ECharts `option` parameter passed to
   * `setOption()`.
   * Consult the [ECharts option documentation](https://echarts.apache.org/en/option.html)
   * and assign either the object directly or build it through the handle.
   *
   * > **Note:** Currently only **line charts** (`series[].type: 'line'`) are supported.
   * > Support for additional chart types (bar, pie, etc.) will be added in future releases or can be requested.
   *
   * Assigning a new config input completely replaces the previous chart
   * configuration (`notMerge: true`).
   * To update only parts of the chart, access the underlying ECharts instance directly and
   * call `setOption()` with custom merge options.
   *
   * @example
   * ```js
   * // Using a plain object
   * chart.config = {
   *   xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
   *   yAxis: { type: 'value' },
   *   series: [{ type: 'line', data: [150, 230, 224] }],
   * };
   *
   * // Using the handle with method chaining
   * chart.config = (handle) => handle
   *   .baseConfig({
   *     xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
   *     yAxis: { type: 'value' },
   *     series: [{ type: 'line', data: [150, 230, 224] }],
   *   })
   *   .axesShowSplitLines();
   *
   * // Using the handle with sequential calls
   * chart.config = (handle) => {
   *   handle.baseConfig({
   *     xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
   *     yAxis: { type: 'value' },
   *     series: [{ type: 'line', data: [150, 230, 224] }],
   *   });
   *   handle.axesShowSplitLines();
   * };
   * ```
   */
  @property({ attribute: false })
  config: ChartConfigType = {};

  /**
   * The color palette to apply to chart series.
   *
   * - `categorical` (default) — 12 distinct colors for comparing unrelated data series
   * - `sequential-01` … `sequential-07` — 10-step single-hue ramps:
   *   `01`=primary, `02`=accent, `03`=muted, `04`=purple, `05`=teal, `06`=magenta, `07`=neutral
   * - `sequential-status-critical`, `sequential-status-error`, `sequential-status-info`,
   *   `sequential-status-success`, `sequential-status-warning` — 10-step status ramps
   *
   * The palette sets the ECharts `color` array. If `config.color` is explicitly provided,
   * it takes precedence over the palette.
   */
  @property({ reflect: true })
  palette: ChartPalette = 'categorical';

  /** Resolves palette CSS custom properties to computed color values and applies them to the chart. */
  private applyPalette(): void {
    if (!this.chartInstance) return;
    // If the user explicitly set config.color, respect it — palette is a default only
    if (Array.isArray(this.resolvedConfig.color) && this.resolvedConfig.color.length > 0) return;

    const tokens = PALETTE_TOKENS[this.palette];
    const colors = tokens
      .map(token => getRealStyleValue(token));

    if (colors.length > 0) {
      // Instead of the this.chartInstance.getOption(), we need to use the resolvedConfig, as the getOption() omits the "media" property
      const oldOption = { ...this.resolvedConfig };
      if (!oldOption) return;

      oldOption.color = colors;
      // We can not only replace 'color' via { replaceMerge: ['color'] }. Echarts does not allow to do this.
      // Therefore we need to completely replace it, with the old option but new color.
      this.chartInstance.setOption(oldOption, { notMerge: true });
    }
  }

  /**
   * Selects the rendering backend based on the configured series types.
   *
   * Uses the default canvas renderer when at least one `line` or `bar` series is present.
   * For other chart types, the chart is re-initialized with the SVG renderer to improve font rendering quality.
   */
  private setRenderer(): void {
    const allSeriesTypes = Array.isArray(this.resolvedConfig.series)
      ? this.resolvedConfig.series.map(s => s.type) : [this.resolvedConfig.series?.type];
    const hasLineOrBarSeries = allSeriesTypes.some(type => type === 'line' || type === 'bar');
    // for line or bar series, we always use the canvas renderer
    if (hasLineOrBarSeries) {
      return;
    }
    // for other series we use svg renderer, as the font rendering is better for svg
    this.chartInstance.dispose();
    this.chartInstance = init(this.chartContainer, 'default', { renderer: 'svg' });
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('config') && this.chartInstance) {
      this.resolvedConfig = resolveConfigInput(this.config);

      if (!this.isInitialConfigSet && Object.keys(this.resolvedConfig).length > 0) {
        this.isInitialConfigSet = true;
        this.setRenderer();
      }
      this.chartInstance.setOption(this.resolvedConfig, { notMerge: true });
    }
    if ((changedProperties.has('palette') || changedProperties.has('config')) && this.chartInstance) {
      this.applyPalette();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    registerTheme('default', getSynergyTheme('light'));
    registerTheme('dark', getSynergyTheme('dark'));

    // Add mutation observer to detect changes of light dark mode and get the current mode to apply the correct theme
    // TODO: this is currently only a first prototype for theme switch. We need to add a more robust solution, which might also check if any other parent element has a synergy theme class.
    // Therefore the global theme story might not be the best solution, but maybe a chart instance theme store?
    this.themeObserver = new MutationObserver((entries) => {
      const themeChanged = entries.some((entry) => {
        const oldTheme = entry.oldValue?.split(' ').find((cls) => cls.includes('syn-sick2025-'));
        const newTheme = (entry.target as HTMLElement).classList.value.split(' ').find((cls) => cls.includes('syn-sick2025-'));
        return oldTheme !== newTheme;
      });
      if (themeChanged) {
        if (this.chartInstance) {
          const newTheme = document.body.classList.value.split(' ').find((cls) => cls.includes('syn-sick2025-'));
          setGlobalThemeStore(newTheme === 'syn-sick2025-dark' ? 'dark' : 'light');
          // We need to re-resolve the config as otherwise the theme change will not be applied to the config if they contain synergy tokens
          this.resolvedConfig = resolveConfigInput(this.config);
          // We need to reapply the config as otherwise the theme change will not be applied.
          // See caveat section of https://echarts.apache.org/en/api.html#echartsInstance.setTheme
          this.chartInstance.setOption(this.resolvedConfig, { notMerge: true });
          this.chartInstance.setTheme(newTheme === 'syn-sick2025-dark' ? 'dark' : 'default');

          this.applyPalette();
        }
      }
    });
    this.themeObserver.observe(document.body, { attributeFilter: ['class'], attributeOldValue: true });

    /**
     * Depending if x-axis or y-axis, the axis name has different positions and alignments. This preprocessor ensures that the correct styles are applied to the axis names based on the axis type.
     * This is needed because ECharts does not provide a way to set specific styles for x and y axis, only for axis types.
     */
    registerPreprocessor(applyAxisDefaultsPreprocessor);
  }

  private registerLegendListener() {
    this.chartInstance?.on('legendselectchanged', (params: { selected: Record<string, boolean> }) => {
      const legendFormatter = (name: string) => {
        const isVisible = params.selected[name];
        const icon = isVisible ? 'showIcon' : 'hideIcon';
        return `${name}  {${icon}|}`;
      };

      this.chartInstance?.setOption({
        legend: {
          formatter: legendFormatter,
        },
      });
    });
  }

  // Initialize echarts instance and resize observer
  protected firstUpdated(_changedProperties: PropertyValues): void {
    if (this.chartContainer !== null && this.chartContainer !== undefined) {
      this.chartInstance = init(this.chartContainer, 'default');
      this.registerLegendListener();

      // Resize observer
      this.resizeObserver = new ResizeObserver(() => {
        this.chartInstance?.resize();
      });
      this.resizeObserver.observe(this.chartContainer);

      // Apply config if already set before first render
      this.resolvedConfig = resolveConfigInput(this.config);
      if (Object.keys(this.resolvedConfig).length > 0) {
        this.chartInstance.setOption(this.resolvedConfig);
      }
      // Apply palette after config so colors blend in without replacing the full config
      this.applyPalette();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.themeObserver?.disconnect();
    this.chartInstance?.dispose();
  }

  /**
   * Returns the underlying ECharts instance, giving direct access to the full
   * [ECharts API](https://echarts.apache.org/en/api.html#echartsInstance).
   *
   * Use this when the `config` property alone is not sufficient — for example to
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
        class="chart">
      </div>
    `;
  }
}
