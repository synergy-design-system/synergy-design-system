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
        component: generateStoryDescription('chart', 'mark-line-default'),
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
  title: 'Charts/Features/Mark Lines',
};
export default meta;

type Story = StoryObj;

export const MinAndMax: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-line-min-max'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-line-min-max"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-line-min-max');

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
              markLine: {
                data: [
                  { type: 'min', name: 'Minimum'},
                  { type: 'max', name: 'Maximum' }
                ],
              }
            }
          ])
      });
    </script>
  `,
};

export const Average: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-line-average'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-line-average"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-line-average');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
            grid: { left: 80 },
          })
          .seriesLine([
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              markLine: {
                data: [{ type: 'average', name: 'Average' }],
              }
            }
          ])
      });
    </script>
  `,
};

export const FixedThresholds: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-line-thresholds'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-line-thresholds"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-line-thresholds');

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
            markLine: {
              data: [
                { yAxis: 240 },
                { 
                  xAxis: 'Sat',
                  label: {
                    position: 'start',
                  }
                },
              ],
            },
          }])
      });
    </script>
  `,
};

export const CoordinateLine: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-line-coordinates'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-line-coordinates"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-line-coordinates');

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
              data: [150, 230, 224, 218, 135, 147, 260],
              markLine: {
                data: [
                  [
                    { coord: ['Mon', 100], name: 'Trend' }, 
                    { coord: ['Sun', 280] },
                  ]
                ],
                symbol: ['none', 'arrow']
              }
            }
          ])
      });
    </script>
  `,
};

export const IntentColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'mark-line-intent-colors'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-line-intent-colors"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-line-intent-colors');
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
            markLine: {
              data: [
                {
                  yAxis: 100,
                  name: 'Target met',
                  lineStyle: { color: getColor('SynNamurSuccessColor') },
                },
                {
                  yAxis: 180,
                  name: 'Warning',
                  lineStyle: { color: getColor('SynNamurWarningColor') },
                },
                {
                  yAxis: 260,
                  name: 'Critical limit',
                  lineStyle: { color: getColor('SynNamurErrorColor') },
                },
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
        story: generateStoryDescription('chart', 'mark-line-label-position'),
      },
    },
  },
  render: () => html`
    <syn-chart id="mark-line-label-position"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#mark-line-label-position');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
            grid: {
              left: 200,
              right: 200,
              top: 50,
            }
          })
          .seriesLine([{
            data: [150, 230, 224, 218, 135, 147, 260],
            markLine: {
              data: [
                {
                  yAxis: 80,
                  name: 'Horizontal start',
                  label: {
                    formatter: '{b}: {c}',
                    position: 'start',
                  },
                },
                {
                  yAxis: 220,
                  name: 'Horizontal end',
                  label: {
                    formatter: '{b}: {c}',
                    position: 'end',
                  },
                },
                {
                  xAxis: 'Tue',
                  name: 'Vertical start',
                  label: {
                    formatter: '{b}: {c}',
                    position: 'start',
                  },
                },
                {
                  xAxis: 'Sat',
                  name: 'Vertical end',
                  label: {
                    formatter: '{b}: {c}',
                    position: 'end',
                  },
                },
              ],
            },
          }]);
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  MinAndMax,
  Average,
  FixedThresholds,
  CoordinateLine,
  IntentColors,
  LabelPosition,
}, 700);
/* eslint-enable sort-keys */
