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
import { generateScreenshotStory, generateStoryDescription } from '../../src/helpers/component.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';

declare global {
  interface Window {
    ComponentTokens: typeof ComponentTokens;
  }
}

window.ComponentTokens = ComponentTokens;

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      ...chartChromaticConfig,
    },
    docs: {
      description: {
        component: generateStoryDescription('chart', 'mark-area-default'),
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
  title: 'Charts/Features/Mark Areas',
};
export default meta;

type Story = StoryObj;

export const MinMaxAndAverage: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-area-min-max'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-area-min-max"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-area-min-max');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesLine([
            { 
              data: [150, 230, 270, 218, 135, 147, 260],
              markArea: {
                data: [
                  [{ type: 'average' }, { type: 'max' }], 
                ],
              }
            }
          ])
      });
    </script>
  `,
};

export const ValueRange: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-area-value-range'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-area-value-range"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-area-value-range');

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
            markArea: {
              data: [[
                { yAxis: 120 },
                { yAxis: 200 },
              ]],
            },
          }]);
      });
    </script>
  `,
};

export const CategoryRange: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-area-category-ranges'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-area-category-ranges"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-area-category-ranges');

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
            markArea: {
              data: [
                [
                  { xAxis: 'Mon', name: 'Low activity', label: { position: 'insideTop' } },
                  { xAxis: 'Tue' },
                ],
                [
                  { xAxis: 'Fri', name: 'High activity', label: { position: 'insideTop' } },
                  { xAxis: 'Sun' },
                ],
              ],
            },
          }]);
      });
    </script>
  `,
};

export const LabelPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-area-label-position'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-area-label-position"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-area-label-position');
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
            markArea: {
              data: [
                [
                  {
                    yAxis: 110,
                    name: 'Horizontal Position',
                  },
                  { yAxis: 160 },
                ],
                [
                  {
                    xAxis: 'Wed',
                    name: 'Vertical Position',
                    label: {
                      position: 'insideTop',
                    } },
                  { xAxis: 'Fri' },
                ],
              ],
            },
          }]);
      });
    </script>
  `,
};

export const IntentColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-area-intent-colors'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-area-intent-colors"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-area-intent-colors');
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
            markArea: {
              data: [
                [
                  {
                    yAxis: 230,
                    name: 'Too high',
                    itemStyle: { color: getColor('SynNamurErrorColor'), opacity: 0.3 },
                  },
                  { yAxis: 280 },
                ],
                [
                  {
                    yAxis: 80,
                    name: 'Too low',
                    itemStyle: { color: getColor('SynNamurErrorColor'), opacity: 0.3 },
                  },
                  { yAxis: 120 },
                ],
              ],
            },
          }]);
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  MinMaxAndAverage,
  ValueRange,
  CategoryRange,
  LabelPosition,
  IntentColors,
}, 700);
/* eslint-enable sort-keys */
