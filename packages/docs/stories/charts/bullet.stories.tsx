import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';
import { ResolvedTokens as ComponentTokens } from '@synergy-design-system/tokens/resolved';
import isChromatic from 'chromatic';
import '../../../components/src/components/chart/chart.js';
import type SynChart from '../../../components/src/components/chart/chart.js';
import { ChartSeriesDocumentation } from '../../src/helpers/chart-series-documentation.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';
import { generateScreenshotStory, generateStoryDescription } from '../../src/helpers/component.js';

declare global {
  interface Window {
    ChartTokens: typeof ChartTokens;
    ComponentTokens: typeof ComponentTokens;
  }
}

window.ChartTokens = ChartTokens;
window.ComponentTokens = ComponentTokens;

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: { ...chartChromaticConfig },
    docs: {
      description: { component: generateStoryDescription('chart', 'bullet-series-default') },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ChartSeriesDocumentation section="Bullet series presets" />
          <Stories title="" />
        </>
      ),
    },
  },
  tags: ['Charting', 'Data Visualization'],
  title: 'Charts/Series Types/Bullet Chart',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-preset') } },
  },
  render: () => html`
    <syn-chart id="bullet-default"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bullet-default');
      charts.forEach(chart => {
        chart.config = {
          xAxis: { data: ['Pressure', 'Flow', 'Temperature', 'Speed'], type: 'category' },
          yAxis: { type: 'value' },
          series: [
            {
              type: 'synBullet',
              data: [
                { start: 10, end: 80, current: 65 },
                { start: -10, end: 60, current: 48 },
                { start: 20, end: 100, current: 42 },
                { start: -15, end: 45, current: -6 },
              ],
            },
          ],
        };
      });
    </script>
  `,
};

export const Vertical: Story = {
  parameters: {
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-vertical') } },
  },
  render: () => html`
    <syn-chart id="bullet-vertical"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bullet-vertical');
      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: { data: ['Pressure', 'Flow', 'Temperature', 'Speed'], type: 'category' },
            yAxis: { type: 'value' },
          })
          .seriesBullet({
            data: [
              { start: 10, end: 80, current: 65 },
              { start: -10, end: 60, current: 48 },
              { start: 20, end: 100, current: 42 },
              { start: -15, end: 45, current: -6 },
            ],
          });
      });
    </script>
  `,
};

export const ColorBy: Story = {
  parameters: {
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-color-by') } },
  },
  render: () => html`
    <syn-chart id="bullet-color-by-data"></syn-chart>
    <syn-chart id="bullet-color-by-series"></syn-chart>
    <script type="module">
      const byData = document.querySelectorAll('#bullet-color-by-data');
      const bySeries = document.querySelectorAll('#bullet-color-by-series');
      const baseConfig = {
        xAxis: { data: ['Pressure', 'Flow', 'Temperature', 'Speed'], type: 'category' },
        yAxis: { type: 'value' },
      };
      const data = [
        { start: 10, end: 80, current: 65 },
        { start: -10, end: 60, current: 48 },
        { start: 20, end: 100, current: 42 },
        { start: -15, end: 45, current: -6 },
      ];
      byData.forEach(chart => {
        chart.config = handle =>
          handle.baseConfig(baseConfig)
            .seriesBullet({ colorBy: 'data', data });
      });
      bySeries.forEach(chart => {
        chart.config = handle =>
          handle.baseConfig(baseConfig)
            .seriesBullet({ colorBy: 'series', data });
      });
    </script>
  `,
};

export const Horizontal: Story = {
  parameters: {
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-horizontal') } },
  },
  render: () => html`
    <syn-chart id="bullet-horizontal"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bullet-horizontal');
      charts.forEach(chart => {
        chart.config = handle => handle
        .baseConfig({
          xAxis: { type: 'value' },
          yAxis: { data: ['Pressure', 'Flow', 'Temperature', 'Speed'], type: 'category' },
        })
        .seriesBullet({
          data: [
            { start: 10, end: 80, current: 65 },
            { start: -10, end: 60, current: 48 },
            { start: 20, end: 100, current: 42 },
            { start: -15, end: 45, current: -6 },
          ],
        });
      });
    </script>
  `,
};

export const PaletteColors: Story = {
  parameters: {
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-palette') } },
  },
  render: () => html`
    <syn-chart id="bullet-palette" palette="sequential-status-success"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bullet-palette');
      charts.forEach(chart => {
        chart.config = handle => handle
        .baseConfig({
          xAxis: { data: ['Pressure', 'Flow', 'Temperature', 'Speed'], type: 'category' },
          yAxis: { type: 'value' },
        })
        .seriesBullet({
          data: [
            { start: 10, end: 80, current: 65 },
            { start: -10, end: 60, current: 48 },
            { start: 20, end: 100, current: 42 },
            { start: -15, end: 45, current: -6 },
          ],
        });
      });
    </script>
  `,
};

export const CustomStyle: Story = {
  parameters: {
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-custom-color') } },
  },
  render: () => html`
    <syn-chart id="bullet-custom-colors"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bullet-custom-colors');
      charts.forEach(chart => {
        chart.config = handle => handle
        .baseConfig({
          xAxis: { data: ['Pressure', 'Flow', 'Temperature', 'Speed'], type: 'category' },
          yAxis: { type: 'value' },
        })
        .seriesBullet({
          itemStyle: { borderColor: ComponentTokens.SynColorNeutral800.light, borderWidth: 2, color: ChartTokens.SynChartSequential02_40.light },
          data: [
            { start: 10, end: 80, current: 65, },
            { start: -10, end: 60, current: 48 },
            { start: 20, end: 100, current: 42, itemStyle: { borderColor: ComponentTokens.SynColorWarning600.light, color: ChartTokens.SynChartSequential02_70.light } },
            { start: -15, end: 45, current: -6 },
          ],
        });
      });
    </script>
  `,
};

export const Tooltip: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-tooltip') } },
  },
  play: async ({ canvasElement }) => {
    // Only run this code when running in Chromatic, as it is used to show the tooltip for the snapshot.
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#bullet-tooltip');
      if (!chart) return;
      const instance = chart.getInstance()!;

      const finishedPromise = new Promise<void>(resolve => {
        instance.on('finished', () => {
          instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
          resolve();
        });
      });

      await finishedPromise;
    }
  },
  render: () => html`
    <syn-chart id="bullet-tooltip"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bullet-tooltip');
      charts.forEach(chart => {
        chart.config = handle => handle
        .baseConfig({
          xAxis: { data: ['Pressure', 'Flow', 'Temperature', 'Speed'], type: 'category' },
          yAxis: { type: 'value' },
        })
        .seriesBullet({
          data: [
            { name: 'Sensor A', start: 10, end: 80, current: 65 },
            { name: 'Sensor B', start: -10, end: 60, current: 48 },
            { name: 'Sensor C', start: 20, end: 100, current: 42 },
            { name: 'Sensor D', start: -15, end: 45, current: -6 },
          ],
        })
        .tooltipShow({ axisPointer: { type: 'shadow' } });
      });
    </script>
  `,
};

export const LegendSelection: Story = {
  parameters: {
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-legend') } },
  },
  render: () => html`
    <syn-chart id="bullet-legend"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bullet-legend');
      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: { data: ['Pressure', 'Flow', 'Temperature', 'Speed'], type: 'category' },
            yAxis: { type: 'value' },
          })
          .seriesBullet({
            data: [
              { name: 'Pressure', start: 10, end: 80, current: 65 },
              { name: 'Flow', start: -10, end: 60, current: 48 },
              { name: 'Temperature', start: 20, end: 100, current: 42 },
              { name: 'Speed', start: -15, end: 45, current: -6 },
            ],
          })
          .legendShow();
      });
    </script>
  `,
};

export const FixedAxisRange: Story = {
  parameters: {
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-value-range') } },
  },
  render: () => html`
    <syn-chart id="bullet-fixed-axis-range"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bullet-fixed-axis-range');
      charts.forEach(chart => {
        chart.config = handle => handle
        .baseConfig({
          xAxis: { data: ['Pressure', 'Flow', 'Speed'], type: 'category' },
          yAxis: { min: -100, max: 100, type: 'value' },
        })
        .seriesBullet({
          data: [
            { name: 'Pressure', start: -70, end: 70, current: -40 },
            { name: 'Flow', start: -45, end: 65, current: 50 },
            { name: 'Speed', start: -30, end: 40, current: -20 },
          ],
        });
      });
    </script>
  `,
};

export const CustomRangeWidth: Story = {
  parameters: {
    docs: { description: { story: generateStoryDescription('chart', 'bullet-series-custom-width') } },
  },
  render: () => html`
    <syn-chart id="bullet-fixed-width"></syn-chart>
    <syn-chart id="bullet-relative-width"></syn-chart>
    <script type="module">
      const fixedWidthCharts = document.querySelectorAll('#bullet-fixed-width');
      const relativeWidthCharts = document.querySelectorAll('#bullet-relative-width');
      const baseConfig = {
        xAxis: { data: ['Pressure', 'Flow', 'Temperature', 'Speed'], type: 'category' },
        yAxis: { type: 'value' },
      };
      const data = [
        { start: 10, end: 80, current: 65 },
        { start: -10, end: 60, current: 48 },
        { start: 20, end: 100, current: 42 },
        { start: -15, end: 45, current: -6 },
      ];

      fixedWidthCharts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesBullet({ barWidth: 40, barMaxWidth: 40, data });
      });
      relativeWidthCharts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesBullet({ barWidth: '30%', barMaxWidth: undefined, data });
      });
    </script>
  `,
};

export const CustomMarker: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bullet-series-marker'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bullet-custom-marker"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bullet-custom-marker');

      charts.forEach(chart => {
        chart.config = handle => handle
        .baseConfig({ xAxis: { data: ['Pressure', 'Flow', 'Speed', 'Temperature'], type: 'category' }, yAxis: {type: 'value'} })
        .seriesBullet({
          data: [
            { start: 10, end: 80, current: 65 },
            { start: -10, end: 60, current: 48 },
            { start: 20, end: 100, current: 42 },
            { start: -15, end: 45, current: -6 }
          ],
          markerStyle: {
            width: 40,
            height: 8,
            color: ComponentTokens.SynColorNeutral400.light
          },
        });
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const CommonOptionsScreenshot: Story = generateScreenshotStory({
  Default,
  Vertical,
  Horizontal,
  ColorBy,
  PaletteColors,
  CustomStyle,
  LegendSelection,
  FixedAxisRange,
  CustomRangeWidth,
  CustomMarker,
}, 700);
/* eslint-enable sort-keys */
