import '../../../dist/components/chart/chart.js';
import { expect, fixture, html } from '@open-wc/testing';
import type { SeriesOption } from 'echarts';
import type { XAXisOption, YAXisOption } from 'echarts/types/dist/shared';
import type SynChart from './chart.component.js';
import { PALETTE_TOKENS } from './chart.palettes.js';
import type { ChartConfigCallback, ECConfig } from './types.js';
import { getRealStyleValue } from './themes/utilities.js';

async function createChart(template = html`<syn-chart></syn-chart>`): Promise<SynChart> {
  return fixture<SynChart>(template);
}

function firstOf<T>(value: T | T[]): T {
  return Array.isArray(value) ? value[0] : value;
}

function getAxisThemeColors(chart: SynChart) {
  const option = chart.getInstance()!.getOption();
  const xAxis = firstOf(option.xAxis) as XAXisOption;
  const yAxis = firstOf(option.yAxis) as YAXisOption;

  return {
    xAxisLabelColor: xAxis.axisLabel?.color,
    xAxisNameColor: xAxis.nameTextStyle?.color,
    xAxisSplitLineColor: xAxis.splitLine?.lineStyle?.color,
    yAxisLabelColor: yAxis.axisLabel?.color,
    yAxisNameColor: yAxis.nameTextStyle?.color,
    yAxisSplitLineColor: yAxis.splitLine?.lineStyle?.color,
  };
}

function getExpectedGeneralThemeColors(mode: 'light' | 'dark') {
  return {
    axisLabelColor: getRealStyleValue('SynTypographyColorTextQuiet', mode),
    gridColor: getRealStyleValue('SynChartGridLinesColor', mode),
    nameColor: getRealStyleValue('SynTypographyColorText', mode),
  };
}

describe('<syn-chart>', () => {
  it('is accessible', async () => {
    const chart = await createChart();

    await expect(chart).to.be.accessible();
  });

  it('default properties', async () => {
    const chart = await createChart();
    await chart.updateComplete;
    expect(chart.config).to.deep.equal({});
    expect(chart.palette).to.equal('categorical');
  });

  describe('getInstance()', () => {
    it('should return an ECharts instance after first render', async () => {
      const el = await createChart();
      const instance = el.getInstance();
      expect(instance).to.exist;
      expect(instance).to.be.an('object');
    });
  });

  describe('config property', () => {
    it('should apply an config object', async () => {
      const initialConfig: ECConfig = {
        series: [{ data: [100, 200], type: 'line' }],
        xAxis: { data: ['Mon', 'Tue'], type: 'category' },
        yAxis: { type: 'value' },
      };

      const el = await createChart(html`<syn-chart .config=${initialConfig}></syn-chart>`);
      await el.updateComplete;
      const instance = el.getInstance()!;
      const option = instance.getOption();
      expect(firstOf(option.xAxis)).to.deep.include(initialConfig.xAxis);
      expect(firstOf(option.yAxis)).to.deep.include(initialConfig.yAxis);
      expect(firstOf(option.series)).to.have.property('data').that.deep.equals(firstOf(initialConfig.series!).data);
    });

    it('should update the chart when config changes', async () => {
      const el = await createChart();
      await el.updateComplete;

      const instance = el.getInstance()!;
      const firstConfig: ECConfig = {
        series: [{ data: [1, 2, 3], type: 'line' }],
        xAxis: { data: ['One', 'Two', 'Three'], type: 'category' },
        yAxis: { type: 'value' },
      };
      el.config = firstConfig;
      await el.updateComplete;
      const option = instance.getOption();
      expect(firstOf(option.series)).to.have.property('data').that.deep.equals(firstOf(firstConfig.series!).data);
      const secondConfig: ECConfig = {
        series: [{ data: [4, 5, 6], type: 'line' }],
        xAxis: { data: ['Four', 'Five', 'Six'], type: 'category' },
        yAxis: { type: 'value' },
      };
      el.config = secondConfig;
      await el.updateComplete;
      const updatedOptions = instance.getOption();
      expect(firstOf(updatedOptions.series)).to.have.property('data').that.deep.equals(firstOf(secondConfig.series!).data);
    });

    it('should apply config callback input with sequential handle calls', async () => {
      const el = await createChart();
      await el.updateComplete;

      const instance = el.getInstance()!;
      el.config = (handle) => {
        handle.baseConfig({
          series: [{ data: [11, 22, 33], type: 'line' }],
          xAxis: { data: ['A', 'B', 'C'], type: 'category' },
          yAxis: { type: 'value' },
        });
        handle.axesShowSplitLines();
      };

      await el.updateComplete;
      const option = instance.getOption();

      expect(firstOf(option.series)).to.have.property('data').that.deep.equals([11, 22, 33]);
      expect((firstOf(option.xAxis) as XAXisOption).splitLine?.show).to.equal(true);
      expect((firstOf(option.yAxis) as YAXisOption).splitLine?.show).to.equal(true);
    });

    it('should apply config callback input with chained handle calls', async () => {
      const el = await createChart();
      await el.updateComplete;

      const instance = el.getInstance()!;
      el.config = handle => handle
        .baseConfig({
          series: [{ data: [21, 42, 63], type: 'line' }],
          xAxis: { data: ['X', 'Y', 'Z'], type: 'category' },
          yAxis: { type: 'value' },
        })
        .axesShowSplitLines();

      await el.updateComplete;
      const option = instance.getOption();

      expect(firstOf(option.series)).to.have.property('data').that.deep.equals([21, 42, 63]);
      expect((firstOf(option.xAxis) as XAXisOption).splitLine?.show).to.equal(true);
      expect((firstOf(option.yAxis) as YAXisOption).splitLine?.show).to.equal(true);
    });
  });

  describe('palette property', () => {
    const allPalettes = Object.keys(PALETTE_TOKENS) as Array<keyof typeof PALETTE_TOKENS>;

    allPalettes.forEach(palette => {
      it(`should accept palette="${palette}"`, async () => {
        const el = await createChart(html`<syn-chart palette="${palette}"></syn-chart>`);
        await el.updateComplete;
        expect(el.palette).to.equal(palette);
        const instance = el.getInstance()!;
        const option = instance.getOption();
        const expectedColors = PALETTE_TOKENS[palette].map(token => getRealStyleValue(token));
        expect(option.color).to.deep.equal(expectedColors);
      });
    });

    it('should respect custom global config.color over the palette', async () => {
      const customColors = ['#ff0000', '#00ff00', '#0000ff'];
      const customConfig: ECConfig = { color: customColors };
      const el = await createChart(html`<syn-chart palette="sequential-01" .config=${customConfig}></syn-chart>`);
      await el.updateComplete;
      const instance = el.getInstance()!;
      const option = instance.getOption();
      expect(option.color).to.deep.equal(customColors);
    });

    it('should respect explicit series color over the palette', async () => {
      const initialConfig: ECConfig = {
        series: [
          {
            color: ['#7CFC00'], data: [150, 230, 224], name: 'Series A', type: 'line',
          },
          { data: [200, 160, 140], name: 'Series B', type: 'line' },
        ],
        xAxis: { data: ['One', 'Two', 'Three'], type: 'category' },
        yAxis: { type: 'value' },
      };
      const el = await createChart(html`<syn-chart palette="categorical" .config=${initialConfig}></syn-chart>`);
      await el.updateComplete;
      const instance = el.getInstance()!;
      const option = instance.getOption();
      const series = option.series as SeriesOption[];
      // Series A has explicit per-series color overrides – these must be preserved
      expect(series[0].color).to.deep.equal(['#7CFC00'], 'Series A should use its custom color');
      expect(series[1].color).to.be.undefined;
      const paletteColors = PALETTE_TOKENS.categorical.map(token => getRealStyleValue(token));
      expect(option.color).to.deep.equal(paletteColors, 'Global option.color should reflect the categorical palette for series without explicit color');
    });
  });

  describe('Theme mode change', () => {
    it('should change palette colors from light to dark when the theme class changes', async () => {
      const previousBodyClass = document.body.className;

      try {
        document.body.classList.remove('syn-sick2025-light', 'syn-sick2025-dark');
        document.body.classList.add('syn-sick2025-light');

        const el = await createChart(html`<syn-chart palette="categorical"></syn-chart>`);
        await el.updateComplete;
        const instance = el.getInstance()!;

        const lightColors = PALETTE_TOKENS.categorical.map(token => getRealStyleValue(token, 'light'));
        const colorsBeforeThemeSwitch = instance.getOption().color as string[];
        expect(colorsBeforeThemeSwitch).to.deep.equal(lightColors);

        document.body.classList.replace('syn-sick2025-light', 'syn-sick2025-dark');
        await el.updateComplete;

        const darkColors = PALETTE_TOKENS.categorical.map(token => getRealStyleValue(token, 'dark'));
        const colorsAfterThemeSwitch = instance.getOption().color as string[];

        expect(colorsAfterThemeSwitch).to.not.deep.equal(colorsBeforeThemeSwitch);
        expect(colorsAfterThemeSwitch).to.deep.equal(darkColors);

        el.remove();
      } finally {
        document.body.className = previousBodyClass;
      }
    });

    it('should change general theme colors from light to dark when the theme class changes', async () => {
      const previousBodyClass = document.body.className;

      try {
        document.body.classList.remove('syn-sick2025-light', 'syn-sick2025-dark');
        document.body.classList.add('syn-sick2025-light');

        const config: ECConfig = {
          series: [{ data: [11, 22, 33], type: 'line' }],
          xAxis: {
            data: ['Jan', 'Feb', 'Mar'],
            name: 'Months',
            splitLine: { show: true },
            type: 'category',
          },
          yAxis: {
            name: 'Revenue',
            splitLine: { show: true },
            type: 'value',
          },
        };

        const el = await createChart(html`<syn-chart .config=${config}></syn-chart>`);
        await el.updateComplete;
        const lightColors = getAxisThemeColors(el);
        const expectedLightColors = getExpectedGeneralThemeColors('light');

        expect(lightColors.xAxisLabelColor).to.equal(expectedLightColors.axisLabelColor);
        expect(lightColors.yAxisLabelColor).to.equal(expectedLightColors.axisLabelColor);
        expect(lightColors.xAxisNameColor).to.equal(expectedLightColors.nameColor);
        expect(lightColors.yAxisNameColor).to.equal(expectedLightColors.nameColor);
        expect(lightColors.xAxisSplitLineColor).to.equal(expectedLightColors.gridColor);
        expect(lightColors.yAxisSplitLineColor).to.equal(expectedLightColors.gridColor);

        document.body.classList.replace('syn-sick2025-light', 'syn-sick2025-dark');
        await el.updateComplete;

        const darkColors = getAxisThemeColors(el);
        const expectedDarkColors = getExpectedGeneralThemeColors('dark');

        expect(darkColors.xAxisLabelColor).to.equal(expectedDarkColors.axisLabelColor);
        expect(darkColors.yAxisLabelColor).to.equal(expectedDarkColors.axisLabelColor);
        expect(darkColors.xAxisNameColor).to.equal(expectedDarkColors.nameColor);
        expect(darkColors.yAxisNameColor).to.equal(expectedDarkColors.nameColor);
        expect(darkColors.xAxisSplitLineColor).to.equal(expectedDarkColors.gridColor);
        expect(darkColors.yAxisSplitLineColor).to.equal(expectedDarkColors.gridColor);

        el.remove();
      } finally {
        document.body.className = previousBodyClass;
      }
    });
  });

  describe('lifecycle', () => {
    it('should dispose the ECharts instance when removed from the DOM', async () => {
      const el = await createChart();
      await el.updateComplete;
      const instance = el.getInstance()!;
      expect(instance.isDisposed()).to.be.undefined;
      el.remove();
      expect(instance.isDisposed()).to.be.true;
    });
  });

  describe('setRenderer()', () => {
    it('keeps the initial chart instance for line series', async () => {
      const el = await createChart();
      await el.updateComplete;

      const initialInstance = el.getInstance();
      const lineConfig: ECConfig = {
        series: [{ data: [1, 2, 3], type: 'line' }],
        xAxis: { data: ['Mon', 'Tue', 'Wed'], type: 'category' },
        yAxis: { type: 'value' },
      };

      el.config = lineConfig;
      await el.updateComplete;

      expect(el.getInstance()).to.equal(initialInstance);
    });

    it('re-initializes the chart instance for non-line-or-bar series (e.g. gauge)', async () => {
      const el = await createChart();
      await el.updateComplete;

      const initialInstance = el.getInstance();
      const gaugeConfig: ECConfig = {
        series: [{ data: [{ name: 'Score', value: 70 }], type: 'gauge' }],
      };

      el.config = gaugeConfig;
      await el.updateComplete;

      const updatedInstance = el.getInstance();
      expect(updatedInstance).to.not.equal(initialInstance);
    });
  });

  describe('applyAxisDefaultsPreprocessor', () => {
    it('should apply default y and y axis styles', async () => {
      const el = await createChart();
      await el.updateComplete;
      const instance = el.getInstance()!;
      const config: ECConfig = {
        series: [{ data: [150, 230], type: 'line' }],
        xAxis: { data: ['Mon', 'Tue'], type: 'category' },
        yAxis: { type: 'value' },
      };
      el.config = config;
      await el.updateComplete;
      const option = instance.getOption();
      const xAxis = firstOf(option.xAxis) as XAXisOption;
      const yAxis = firstOf(option.yAxis) as YAXisOption;
      expect(xAxis.nameLocation).to.equal('center');
      expect(yAxis.nameLocation).to.equal('end');
    });

    it('should not apply default x and y axis styles when explicitly set', async () => {
      const el = await createChart();
      await el.updateComplete;
      const instance = el.getInstance()!;
      const config: ECConfig = {
        series: [{ data: [150, 230], type: 'line' }],
        xAxis: { data: ['Mon', 'Tue'], nameLocation: 'start', type: 'category' },
        yAxis: { nameLocation: 'center', type: 'value' },
      };
      el.config = config;
      await el.updateComplete;
      const option = instance.getOption();
      const xAxis = firstOf(option.xAxis) as XAXisOption;
      const yAxis = firstOf(option.yAxis) as YAXisOption;
      expect(xAxis.nameLocation).to.equal('start');
      expect(yAxis.nameLocation).to.equal('center');
    });
  });

  describe('registerLegendListener()', () => {
    const baseConfig: ECConfig = {
      series: [
        { data: [1, 2, 3], name: 'Series A', type: 'line' },
        { data: [4, 5, 6], name: 'Series B', type: 'line' },
      ],
      xAxis: { data: ['Mon', 'Tue', 'Wed'], type: 'category' },
      yAxis: { type: 'value' },
    };

    it('updates the legend formatter to hideIcon or showIcon depending of the series visibility state', async () => {
      const configWithLegend: ChartConfigCallback = (handle) => handle.baseConfig(baseConfig).legendShow();
      const el = await createChart(html`<syn-chart .config=${configWithLegend}></syn-chart>`);
      await el.updateComplete;
      const instance = el.getInstance()!;

      // Toggle Series A off — this fires legendselectchanged with selected['Series A'] = false
      instance.dispatchAction({ name: 'Series A', type: 'legendToggleSelect' });

      const option = instance.getOption();
      const legend = firstOf(option.legend) as { formatter: (name: string) => string };
      const { formatter } = legend;

      expect(formatter('Series A')).to.equal('Series A  {hideIcon|}');
      expect(formatter('Series B')).to.equal('Series B  {showIcon|}');
    });

    it('restores the showIcon formatter when a hidden series is toggled back on', async () => {
      const configWithLegend: ChartConfigCallback = (handle) => handle.baseConfig(baseConfig).legendShow();
      const el = await createChart(html`<syn-chart .config=${configWithLegend}></syn-chart>`);

      await el.updateComplete;
      const instance = el.getInstance()!;

      // Toggle off then on again
      instance.dispatchAction({ name: 'Series A', type: 'legendToggleSelect' });
      instance.dispatchAction({ name: 'Series A', type: 'legendToggleSelect' });

      const option = instance.getOption();
      const legend = firstOf(option.legend) as { formatter?: (name: string) => string };
      expect(legend.formatter!('Series A')).to.equal('Series A  {showIcon|}');
    });
  });
});
