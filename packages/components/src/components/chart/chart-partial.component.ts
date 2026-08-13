import {
  type EChartsType, init, registerPreprocessor, registerTheme, use,
} from 'echarts/core.js';
import { CanvasRenderer } from 'echarts/renderers.js';
import { html } from 'lit';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { LineChart } from 'echarts/charts.js';
import {
  DataZoomComponent,
  GridComponent, LegendComponent, TitleComponent, TooltipComponent,
} from 'echarts/components.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './chart.styles.js';
import { type ChartPalette, PALETTE_TOKENS } from './chart.palettes.js';
import { resolveConfigInput } from './configs/config.js';
import { mergeConfigs } from './configs/utilities.js';
import type { ChartConfigType, ECConfig } from './types.js';
import { applyAxisDefaultsPreprocessor } from './configs/axes/utilities.js';
import { getRealStyleValue, setGlobalThemeStore } from './themes/utilities.js';
import { getSynergyTheme } from './themes/theme.js';
import type SynChartAxis from '../chart-axis/chart-axis.component.js';
import type SynChartData from '../chart-series/chart-series.component.js';

// TODO: Check, should we let the user define the *use* so the bundle size is optimized for their specific use case?
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
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
export default class SynChartPartial extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  @query('.chart')
  private chartContainer: HTMLDivElement;

  @query('slot')
  private defaultSlot: HTMLSlotElement;

  private chartInstance: EChartsType;

  private resizeObserver: ResizeObserver;

  private resolvedConfig: ECConfig = {};

  // TODO: check if a global mutation observer is a better solution for theme changes, as it will be created for every chart instance. Needs to be checked with the real theme switch handling, if mutation observer does make sense at all.
  private themeObserver: MutationObserver;

  private renderScheduled = false;

  private renderScheduleMap: Map<string, boolean> = new Map();

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
      const oldOption = this.chartInstance.getOption();
      if (!oldOption) return;

      oldOption.color = colors;
      // We can not only replace 'color' via { replaceMerge: ['color'] }. Echarts does not allow to do this.
      // Therefore we need to completely replace it, with the old option but new color.
      this.chartInstance.setOption(oldOption, { notMerge: true });
    }
  }

  private buildSubComponentDataConfig(element: SynChartData): ECConfig {
    const { data, name, type } = element;

    if (data.length === 0) {
      return {};
    }

    return {
      series: [{
        data,
        name,
        type,
      }],
    };
  }

  private buildSubComponentAxisConfig(element: SynChartAxis): ECConfig {
    const { axis, data } = element;
    const type = element.type ?? (axis === 'x' ? 'category' : 'value');

    const config = {
      type,
      ...(data ? { data } : {})
    };

    if (axis === 'x') {
      return {
        xAxis: {
          ...config,
        },
      };
    }

    return {
      yAxis: {
        ...config,
      },
    };
  }

  private buildSubComponentConfig(): ECConfig {
    if (!this.defaultSlot) {
      return {};
    }

    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })] as HTMLElement[];
    let componentConfig: ECConfig = {};

    slottedElements.forEach((element) => {
      const tagName = element.tagName.toLowerCase();

      if (tagName === 'syn-chart-series') {
        componentConfig = mergeConfigs(
          componentConfig,
          this.buildSubComponentDataConfig(element as SynChartData),
          { arrayStrategy: 'append' },
        );
      }

      if (tagName === 'syn-chart-axis') {
        componentConfig = mergeConfigs(componentConfig, this.buildSubComponentAxisConfig(element as SynChartAxis));
      }
    });

    return componentConfig;
  }

  private resolveRuntimeConfig(): ECConfig {
    const configInput = resolveConfigInput(this.config);
    const subComponentConfig = this.buildSubComponentConfig();

    return mergeConfigs(configInput, subComponentConfig);
  }

  private applyResolvedConfigToChart(): void {
    if (!this.chartInstance) return;

    this.resolvedConfig = this.resolveRuntimeConfig();
    this.chartInstance.setOption(this.resolvedConfig, { notMerge: true });
    this.applyPalette();
  }

  private handleSlotChange = () => {
    this.scheduleRenderChart();
  };

  protected updated(changedProperties: PropertyValues<this>): void {
    const configRelatedChange = changedProperties.has('config');

    if (configRelatedChange && this.chartInstance) {
      this.scheduleRenderChart();
      return;
    }

    if (changedProperties.has('palette') && this.chartInstance) {
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
          this.resolvedConfig = this.resolveRuntimeConfig();
          // We need to reapply the config as otherwise the theme change will not be applied.
          // See caveat section of https://echarts.apache.org/en/api.html#echartsInstance.setTheme
          this.chartInstance.setOption(this.resolvedConfig, { notMerge: true });
          this.chartInstance.setTheme(newTheme === 'syn-sick2025-dark' ? 'dark' : 'default');

          this.applyPalette();
        }
      }
    });

    this.themeObserver.observe(document.body, { attributeFilter: ['class'], attributeOldValue: true });
    this.addEventListener('syn-chart-subcomponent-change', this.handleSubComponentChange);

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
      this.resolvedConfig = this.resolveRuntimeConfig();
      if (Object.keys(this.resolvedConfig).length > 0) {
        this.chartInstance.setOption(this.resolvedConfig);
      }
      // Apply palette after config so colors blend in without replacing the full config
      this.applyPalette();
    }
  }

  // TODO: Sollte man nur das data als partielles Update machen, oder alles? 
  // we would also need like an unique id for each sub somponent do correctly do the map. For now do it without renderScheduleMap
  private schedulePartialChartUpdate = (event: CustomEvent) => {
    const element = event.target as HTMLElement;
    const subcomponent = element.tagName.toLowerCase();
    // const key = `${subcomponent}-${property}`;
    if (subcomponent !== 'syn-chart-series') return;
    // if (this.renderScheduleMap.get(key)) return;
    // this.renderScheduleMap.set(key, true);

    // requestAnimationFrame(() => {
    //   this.renderScheduleMap.set(key, false);
    if (subcomponent === 'syn-chart-series') {
      const data = this.buildSubComponentDataConfig(element as SynChartData);
      this.chartInstance.setOption(data, { notMerge: false });
    }
    // });
  };

  private handleSubComponentChange = (event: CustomEvent) => {
    const target = event.target as HTMLElement;
    const subcomponent = target.tagName.toLowerCase();
    if (subcomponent === 'syn-chart-series') {
      this.schedulePartialChartUpdate(event);
    }else {
      this.scheduleRenderChart();
    }
  };

  private scheduleRenderChart = () => {
    if (this.renderScheduled) return;
    this.renderScheduled = true;
    requestAnimationFrame(() => {
      this.renderScheduled = false;
      this.applyResolvedConfigToChart();
    });
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.themeObserver?.disconnect();
    this.removeEventListener('syn-chart-subcomponent-change', this.scheduleRenderChart);
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
      <slot hidden @slotchange=${this.handleSlotChange}></slot>
    `;
  }
}
