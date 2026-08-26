import {
  type EChartsType, init, registerPreprocessor, registerTheme, use,
} from 'echarts/core.js';
import type { RegisteredSeriesOption } from 'echarts/types/dist/shared.js';
import { CanvasRenderer } from 'echarts/renderers.js';
import { html } from 'lit';
import type { CSSResultGroup, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { BarChart, LineChart, ScatterChart } from 'echarts/charts.js';
import {
  DataZoomComponent,
  GridComponent, LegendComponent, TitleComponent, TooltipComponent,
} from 'echarts/components.js';
import SynergyElement from '../../internal/synergy-element.js';
import componentStyles from '../../styles/component.styles.js';
import styles from '../chart/chart.styles.js';
import { type ChartPalette, PALETTE_TOKENS } from '../chart/chart.palettes.js';
import { resolveConfigInput } from '../chart/configs/config.js';
import { mergeConfigs } from '../chart/configs/utilities.js';
import type { ChartConfigType, ECConfig } from '../chart/types.js';
import { applyAxisDefaultsPreprocessor } from '../chart/configs/axes/utilities.js';
import { getRealStyleValue, setGlobalThemeStore } from '../chart/themes/utilities.js';
import { getSynergyTheme } from '../chart/themes/theme.js';

type SeriesTypeWithData = {
  [K in keyof RegisteredSeriesOption]: RegisteredSeriesOption[K] extends { data?: unknown } ? K : never;
}[keyof RegisteredSeriesOption];

type SeriesDataByType<T extends SeriesTypeWithData> = NonNullable<
  RegisteredSeriesOption[T] extends { data?: infer TData } ? TData : never
>;

type SupportedSeriesType = 'line' | 'bar' | 'scatter';

type ChartDataInput = SeriesDataByType<SupportedSeriesType>;

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
]);

/**
 * @summary The `<syn-chart-prop>` component is a chart convenience wrapper that configures line charts through declarative properties.
 * @documentation https://synergy-design-system.github.io/?path=/docs/charting-syn-chart--docs
 * @status experimental
 * @since 3.23.0
 * @csspart base - The component's base wrapper.
 */
export default class SynChartProp extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  @query('.chart')
  private chartContainer: HTMLDivElement;

  private chartInstance: EChartsType;

  private resizeObserver: ResizeObserver;

  private resolvedConfig: ECConfig = {};

  private themeObserver: MutationObserver;

  @property({ attribute: false })
  config: ChartConfigType = {};

  @property({ attribute: 'type', reflect: true })
  chartType: SupportedSeriesType = 'line';

  @property({ attribute: false })
  chartData: ChartDataInput | ChartDataInput[] = [];

  @property({ attribute: false })
  series: RegisteredSeriesOption[SupportedSeriesType][] = [];

  @property({ attribute: false })
  xAxisData: ECConfig['xAxis'];

  @property({ attribute: false })
  yAxisData: ECConfig['yAxis'];

  @property({ reflect: true })
  palette: ChartPalette = 'categorical';

  private applyPalette(): void {
    if (!this.chartInstance) return;
    if (Array.isArray(this.resolvedConfig.color) && this.resolvedConfig.color.length > 0) return;

    const tokens = PALETTE_TOKENS[this.palette];
    const colors = tokens.map(token => getRealStyleValue(token));

    if (colors.length > 0) {
      const oldOption = this.chartInstance.getOption();
      if (!oldOption) return;

      oldOption.color = colors;
      this.chartInstance.setOption(oldOption, { notMerge: true });
    }
  }

  private createSeriesOption(data: ChartDataInput): RegisteredSeriesOption[SupportedSeriesType] {
    switch (this.chartType) {
      case 'bar':
        return {
          data: data as SeriesDataByType<'bar'>,
          type: 'bar',
        };
      case 'line':
      default:
        return {
          data: data as SeriesDataByType<'line'>,
          type: 'line',
        };
    }
  }

  private buildSeriesOptionsFromData(): RegisteredSeriesOption[SupportedSeriesType][] {
    if (!Array.isArray(this.chartData) || this.chartData.length === 0) {
      return [];
    }

    const chartData = this.chartData as ChartDataInput;
    const firstEntry = chartData[0] as unknown;
    const isMultipleDataSets = Array.isArray(firstEntry) && this.chartType !== 'scatter';

    if (isMultipleDataSets) {
      return (chartData as unknown as ChartDataInput[]).map((seriesData) => this.createSeriesOption(seriesData));
    }

    return [this.createSeriesOption(chartData)];
  }

  private buildConveniencePropertyConfig(): ECConfig {
    const seriesOptionsFromData = this.buildSeriesOptionsFromData();
    const seriesArray = Array.isArray(this.series) ? this.series : [this.series];
    const seriesOptions = seriesOptionsFromData.length > 0 ? seriesOptionsFromData : seriesArray;
    const propertyConfig: ECConfig = {};

    if (this.xAxisData !== undefined) propertyConfig.xAxis = this.xAxisData;

    if (this.yAxisData !== undefined) {
      propertyConfig.yAxis = this.yAxisData;
    }
    if (seriesOptions.length > 0) propertyConfig.series = Array.isArray(seriesOptions) ? seriesOptions : [seriesOptions];

    return propertyConfig;
  }

  private resolveRuntimeConfig(): ECConfig {
    const configInput = resolveConfigInput(this.config);
    const convenienceConfig = this.buildConveniencePropertyConfig();

    return mergeConfigs(configInput, convenienceConfig);
  }

  private applyResolvedConfigToChart(): void {
    if (!this.chartInstance) return;

    this.resolvedConfig = this.resolveRuntimeConfig();
    this.chartInstance.setOption(this.resolvedConfig, { notMerge: true });
    this.applyPalette();
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    const configRelatedChange = changedProperties.has('config')
      || changedProperties.has('chartType')
      || changedProperties.has('chartData')
      || changedProperties.has('series')
      || changedProperties.has('xAxisData')
      || changedProperties.has('yAxisData');

    if (configRelatedChange && this.chartInstance) {
      this.applyResolvedConfigToChart();
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
          this.resolvedConfig = this.resolveRuntimeConfig();
          this.chartInstance.setOption(this.resolvedConfig, { notMerge: true });
          this.chartInstance.setTheme(newTheme === 'syn-sick2025-dark' ? 'dark' : 'default');

          this.applyPalette();
        }
      }
    });
    this.themeObserver.observe(document.body, { attributeFilter: ['class'], attributeOldValue: true });

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

  protected firstUpdated(_changedProperties: PropertyValues): void {
    if (this.chartContainer !== null && this.chartContainer !== undefined) {
      this.chartInstance = init(this.chartContainer, 'default');
      this.registerLegendListener();

      this.resizeObserver = new ResizeObserver(() => {
        this.chartInstance?.resize();
      });
      this.resizeObserver.observe(this.chartContainer);

      this.resolvedConfig = this.resolveRuntimeConfig();
      if (Object.keys(this.resolvedConfig).length > 0) {
        this.chartInstance.setOption(this.resolvedConfig);
      }
      this.applyPalette();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.themeObserver?.disconnect();
    this.chartInstance?.dispose();
  }

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
