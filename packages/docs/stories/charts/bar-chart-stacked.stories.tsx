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
import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';
import isChromatic from 'chromatic';
import type SynChart from '../../../components/src/components/chart/chart.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { ChartSeriesDocumentation } from '../../src/helpers/chart-series-documentation.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';

declare global {
  interface Window {
    ChartTokens: typeof ChartTokens;
  }
}
window.ChartTokens = ChartTokens;

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      ...chartChromaticConfig,
    },
    docs: {
      description: {
        component: generateStoryDescription('chart', 'bar-chart-stacked-default'),
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ChartSeriesDocumentation section="Bar series presets" />
          <Stories title="" />
        </>
      ),
    },
  },
  tags: ['Charting', 'Data Visualization'],
  title: 'Charts/Series Types/Bar Chart Stacked',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-stacked-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-stacked-default"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-stacked-default');

      charts.forEach(chart => {
        chart.config = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: { name: 'Values' },
          series: [
            {
              data: [120, 180, 150, 80, 70, 110, 130],
              stack: 'total',
              type: 'bar',
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              stack: 'total',
              type: 'bar',
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              stack: 'total',
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
        story: generateStoryDescription('chart', 'bar-chart-stacked-vertical'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-stacked-vertical"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-stacked-vertical');

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
              stack: 'total',
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              stack: 'total',
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              stack: 'total',
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
        story: generateStoryDescription('chart', 'bar-chart-stacked-horizontal'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-stacked-horizontal"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-stacked-horizontal');

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
              data: [120, 180, 150, 80, 70, 110, 130],
              stack: 'total',
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              stack: 'total',
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              stack: 'total',
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
        story: generateStoryDescription('chart', 'bar-chart-stacked-value-range'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-stacked-value-range"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-stacked-value-range');

      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: { 
          name: 'Values',
          max: 600
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowYSplitLines()
          .seriesBar([
            {
              data: [120, 180, 150, 80, 70, 110, 130],
              stack: 'total',
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              stack: 'total',
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              stack: 'total',
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
        story: generateStoryDescription('chart', 'bar-chart-stacked-negative'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-stacked-negative"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-stacked-negative');

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
            data: [-120, -180, -150, -80, -70, -110, -130],
            stack: 'total',
          },
          {
            data: [-80, -130, -100, -70, -90, -160, -140],
            stack: 'total',
          },
          {
            data: [-90, -120, -140, -100, -110, -70, -80],
            stack: 'total',
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
        story: generateStoryDescription('chart', 'bar-chart-stacked-positive-and-negative'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-stacked-positive-and-negative"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-stacked-positive-and-negative');

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
              data: [ -100, -120, 150, 80, 70, -110, 130],
              stack: 'total'
            },
            {
              data: [60, 40, -20, 60, -30, -80, -50],
              stack: 'total'
            },
            {
              data: [120, -70, 50, -90, 80, 60, 140],
              stack: 'total'
            },
          ])
        });
    </script>
  `,
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-stacked-custom-color'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-stacked-custom-colors"></syn-chart>
    <script type="module">
      // To use Synergy chart colors, import the resolved chart tokens. The chart
      // configuration currently requires hex values, which can be retrieved
      // directly from the chart tokens object:
      //
      // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

      const getChartColor = (token) => {
        return ChartTokens[token]['light'];
      };

      const charts = document.querySelectorAll('#bar-stacked-custom-colors');
      const baseConfig = {
        xAxis: {
          data: ['A', 'B', 'C',],
          name: 'Category',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            ...baseConfig,
            color: [
              getChartColor('SynChartSequential02_80'),
              getChartColor('SynChartSequential02_70'),
              getChartColor('SynChartSequential02_50'),
            ],
          })
          .axesShowYSplitLines()
          .seriesBar([
          {
            data: [120, 180, 150],
            stack: 'total'
          },
          {
            data: [80, 130, 100],
            stack: 'total'
          },
          {
            data: [90, 120, 140],
            stack: 'total'
          },
        ])
      });
    </script>
  `,
};

export const CategoricalVsSequential: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-grouped-palette'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-grouped-categorical"></syn-chart>
    <syn-chart id="bar-series-grouped-sequential"></syn-chart>
    <script type="module">
      // To use Synergy chart colors, import the resolved chart tokens. The chart
      // configuration currently requires hex values, which can be retrieved
      // directly from the chart tokens object:
      //
      // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

      const getChartColor = (token) => {
        return ChartTokens[token]['light'];
      };

      const categoricalCharts = document.querySelectorAll('#bar-series-grouped-categorical');
      const sequentialCharts = document.querySelectorAll(' #bar-series-grouped-sequential');
      const baseConfig = {
        xAxis: {
          data: ['A', 'B', 'C',],
          name: 'Category',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
        },
      };

      categoricalCharts.forEach(categorical => {
        categorical.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowYSplitLines()
          .seriesBar([
          {
            data: [120, 180, 150],
            stack: 'total'
          },
          {
            data: [80, 130, 100],
            stack: 'total'
          },
          {
            data: [90, 120, 140],
            stack: 'total'
          },
          {
            data: [110, 140, 170],
            stack: 'total'
          },
        ])
      });
     
      sequentialCharts.forEach(sequential => {
        sequential.config = handle => handle
          .baseConfig({
            ...baseConfig,
            color: [
              getChartColor('SynChartSequential01_80'),
              getChartColor('SynChartSequential01_70'),
              getChartColor('SynChartSequential01_50'),
            ],
          })
          .axesShowYSplitLines()
          .seriesBar([
          {
            data: [120, 180, 150],
            stack: 'total'
          },
          {
            data: [80, 130, 100],
            stack: 'total'
          },
          {
            data: [90, 120, 140],
            stack: 'total'
          },
        ])
      });
    </script>
  `,
};

export const Tooltip: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-stacked-tooltip'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Only run this code when running in Chromatic, as it is used to show the tooltip for the snapshot.
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#bar-series-stacked-tooltip');
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
    <syn-chart id="bar-series-stacked-tooltip"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-stacked-tooltip');

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
              name: 'Series A',
              stack: 'total',
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              name: 'SeriesB',
              stack: 'total',
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              name: 'Series C',
              stack: 'total',
            },
          ])
          .tooltipShow({ axisPointer: { type: 'shadow' } })
      });
    </script>
  `,
};

export const Legend: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-stacked-legend'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-stacked-legend"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-stacked-legend');

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
              name: 'Series A',
              stack: 'total',
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              name: 'Series B',
              stack: 'total',
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              name: 'Series C',
              stack: 'total',
            },
          ])
          .legendShow()
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
  CustomColors,
  CategoricalVsSequential,
  Legend,
}, 700);
/* eslint-enable sort-keys */
