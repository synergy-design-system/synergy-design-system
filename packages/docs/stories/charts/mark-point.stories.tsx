import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import '../../../components/src/components/chart/chart.js';
import { ResolvedTokens as ComponentTokens } from '@synergy-design-system/tokens/resolved';
import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';
import { generateScreenshotStory, generateStoryDescription } from '../../src/helpers/component.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';

declare global {
  interface Window {
    ComponentTokens: typeof ComponentTokens;
    ChartTokens: typeof ChartTokens;
  }
}

window.ComponentTokens = ComponentTokens;
window.ChartTokens = ChartTokens;

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      ...chartChromaticConfig,
    },
    docs: {
      description: {
        component: generateStoryDescription('chart', 'mark-point-default'),
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories title="" />
        </>
      ),
    },
  },
  tags: ['Charting', 'Data Visualization'],
  title: 'Charts/Features/Mark Points',
};
export default meta;

type Story = StoryObj;

export const MinMaxAndAverage: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-point-min-max-average'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-point-min-max-and-average"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-point-min-max-and-average');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesLine([{
            data: [150, 230, 270, 218, 135, 147, 260],
            markPoint: {
              data: [
                { type: 'min' },
                { type: 'max' },
                { type: 'average' },
              ],
            },
          }]);
      });
    </script>
  `,
};

export const Coordinates: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-point-coordinates'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-point-coordinates"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-point-coordinates');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesLine([{
            data: [150, 230, 224, 218, 135, 147, 260],
            markPoint: {
              data: [
                { coord: ['Tue', 230], value: 230 },
                { coord: ['Fri', 135], value: 135 },
              ],
            },
          }]);
      });
    </script>
  `,
};

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-point-custom-styling'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-point-custom-styling"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-point-custom-styling');
      const getColor = (token) => ComponentTokens[token]['light'];

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesLine([{
            data: [150, 230, 224, 218, 135, 147, 260],
            markPoint: {
              data: [
                {
                  coord: ['Tue', 230],
                  name: 'Target met',
                  symbol: 'circle',
                  symbolSize: 18,
                  label: { position: 'top' },
                  itemStyle: { color: getColor('SynNamurSuccessColor') },
                },
                {
                  coord: ['Thu', 218],
                  name: 'Warning',
                  symbol: 'triangle',
                  symbolSize: 20,
                  label: { position: 'top' },
                  itemStyle: { color: getColor('SynNamurWarningColor') },
                },
                {
                  coord: ['Sat', 147],
                  name: 'Critical',
                  symbol: 'diamond',
                  symbolSize: 24,
                  label: { position: 'right' },
                  itemStyle: { color: getColor('SynNamurErrorColor') },
                },
              ],
              label: { formatter: '{b}' },
            },
          }]);
      });
    </script>
  `,
};

export const LongLabels: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-point-long-labels'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-point-labels"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-point-labels');
      const getChartColor = (token) => ChartTokens[token]['light'];

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesLine([{
            data: [150, 230, 224, 218, 135, 147, 260],
            markPoint: {
              data: [
                { coord: ['Tue', 230], name: 'Inspection', label: { position: 'top' } },
                { coord: ['Fri', 135], name: 'Maintenance', label: { position: 'bottom' } },
              ],
              label: { formatter: '{b}', position: 'top' },
              symbol: 'circle',
              symbolSize: 16,
              itemStyle: { color: getChartColor('SynChartCategorical01') }
            },
          }]);
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  MinMaxAndAverage,
  Coordinates,
  CustomStyling,
  LongLabels,
}, 700);
/* eslint-enable sort-keys */
