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
import isChromatic from 'chromatic';
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';
import type SynChart from '../../../components/src/components/chart/chart.js';

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      ...chartChromaticConfig,
    },
    docs: {
      description: {
        component: generateStoryDescription('chart', 'bar-chart-single-default'),
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
  title: 'Charts/Series Types/Bar Chart Single',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-single-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-default"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-default');

      charts.forEach(chart => {
        chart.config = {
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            name: 'Days',
            type: 'category',
          },
          yAxis: { name: 'Values' },
          series: [
            {
              data: [120, 180, 150, 80, 70, 110, 130],
              type: 'bar',
            },
          ]
        }
      });
    </script>
  `,
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-single-vertical'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-single-vertical"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-single-vertical');

      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: { 
          name: 'Values',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowYSplitLines()
          .seriesBar([
          {
            data: [120, 180, 150, 80, 70, 110, 130],
          },
        ])
      });
    </script>
  `,
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-single-horizontal'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-single-horizontal"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-single-horizontal');

      const baseConfig = {
        yAxis: {
          data: ['Brazil', 'Pakistan', 'Indonesia', 'United States', 'China', 'India'],
          name: 'Country',
          type: 'category',
        },
        xAxis: { type: 'value', name: 'Population (in Millions)' },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowXSplitLines()
          .seriesBar([
          {
            data: [215, 241, 278, 335, 1412, 1428],
          },
        ])
      });
    </script>
  `,
};

export const FixedValueRange: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-single-value-range'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-single-value-range"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-single-value-range');

      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: { 
          min: 60,
          max: 200,
          name: 'Values',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowYSplitLines()
          .seriesBar([
          {
            data: [120, 180, 150, 80, 70, 110, 130],
          },
        ])
      });
    </script>
  `,
};

export const NegativeValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-single-negative'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-single-negative"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-single-negative');

      const baseConfig = {
        yAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        xAxis: {
          name: 'Values',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowXSplitLines()
          .seriesBar([
          {
            data: [-120, -175, -150, -80, -70, -110, -130],
          },
        ])
      });
    </script>
  `,
};

export const PositiveAndNegative: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-single-positive-and-negative'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-single-horizontal-positive-and-negative"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-single-horizontal-positive-and-negative');

      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowYSplitLines()
          .seriesBar([
          {
            data: [ 100, -120, 150, -80, 70, -110, 130],
          },
        ])
      });
    </script>
  `,
};

export const Tooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-single-tooltip'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Only run this code when running in Chromatic, as it is used to show the tooltip for the snapshot.
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#bar-series-single-tooltip');
      if (!chart) return;
      const instance = chart.getInstance()!;

      const finishedPromise = new Promise<void>(resolve => {
        instance.on('finished', () => {
          instance.dispatchAction({
            type: 'showTip',
            x: 320,
            y: 50,
          });
          resolve();
        });
      });

      await finishedPromise;
    }
  },
  render: () => html`
    <syn-chart id="bar-series-single-tooltip"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-single-tooltip');

      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: { 
          name: 'Values',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowYSplitLines()
          .seriesBar([
            {
              data: [120, 180, 150, 80, 70, 110, 130],
            },
          ])
          .tooltipShow({ axisPointer: { type: 'shadow' } })
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Vertical,
  Horizontal,
  FixedValueRange,
  NegativeValues,
  PositiveAndNegative,
}, 700);
/* eslint-enable sort-keys */
