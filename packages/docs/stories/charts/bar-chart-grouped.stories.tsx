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
        component: generateStoryDescription('chart', 'bar-chart-grouped-default'),
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
  title: 'Charts/Series Types/Bar Chart Grouped',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-grouped-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-grouped-default"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-grouped-default');

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
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              type: 'bar',
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
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
        story: generateStoryDescription('chart', 'bar-chart-grouped-vertical'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-grouped-vertical"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-grouped-vertical');

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
          {
            data: [80, 130, 100, 70, 90, 160, 140],
          },
          {
            data: [90, 120, 140, 100, 110, 70, 60],
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
        story: generateStoryDescription('chart', 'bar-chart-grouped-horizontal'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-grouped-horizontal"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-grouped-horizontal');

      const baseConfig = {
        yAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        xAxis: { type: 'value', name: 'Values' },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowXSplitLines()
          .seriesBar([
          {
            barWidth: 8,
            data: [120, 180, 150, 80, 70, 110, 130],
          },
          {
            barWidth: 8,
            data: [80, 130, 100, 70, 90, 160, 140],
          },
          {
            barWidth: 8,
            data: [90, 120, 140, 100, 110, 70, 60],
          }
        ])
      });
    </script>
  `,
};

export const FixedValueRange: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-grouped-value-range'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-grouped-value-range"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-grouped-value-range');

      const baseConfig = {
        yAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        xAxis: {
          min: 60,
          max: 200,
          name: 'Values',
          type: 'value',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowXSplitLines()
          .seriesBar([
          {
            barWidth: 8,
            data: [120, 180, 150, 80, 70, 110, 130],
          },
          {
            barWidth: 8,
            data: [80, 130, 100, 70, 90, 160, 140],
          },
          {
            barWidth: 8,
            data: [90, 120, 140, 100, 110, 70, 60],
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
        story: generateStoryDescription('chart', 'bar-chart-grouped-negative'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-grouped-negative"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-grouped-negative');

      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: {
          max: -60,
          min: -200,
          name: 'Values',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowYSplitLines()
          .seriesBar([
          {
            data: [-120, -180, -150, -80, -70, -110, -130],
          },
          {
            data: [-80, -130, -100, -70, -90, -160, -140],
          },
          {
            data: [-90, -120, -140, -100, -110, -70, -80],
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
        story: generateStoryDescription('chart', 'bar-chart-grouped-positive-and-negative'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-grouped-positive-and-negative"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-grouped-positive-and-negative');

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
          {
            data: [60, -40, -20, -60, 30, -80, -50],
          },
          {
            data: [120, -70, 50, -90, 80, -40, 140],
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
        story: generateStoryDescription('chart', 'bar-chart-grouped-custom-color'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-grouped-colors"></syn-chart>
    <script type="module">
      // To use Synergy chart colors, import the resolved chart tokens. The chart
      // configuration currently requires hex values, which can be retrieved
      // directly from the chart tokens object:
      //
      // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

      const getChartColor = (token) => {
        return ChartTokens[token]['light'];
      };

      const charts = document.querySelectorAll('#bar-series-grouped-colors');
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
          },
          {
            data: [80, 130, 100],
          },
          {
            data: [90, 120, 140],
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
            barWidth: 8,
            data: [120, 180, 150],
          },
          {
            barWidth: 8,
            data: [80, 130, 100],
          },
          {
            barWidth: 8,
            data: [90, 120, 140],
          },
          {
            barWidth: 8,
            data: [110, 140, 170],
          },
          {
            barWidth: 8,
            data: [70, 100, 130],
          },
          {
            barWidth: 8,
            data: [130, 160, 190],
          },
          {
            barWidth: 8,
            data: [100, 130, 160],
          },
          {
            barWidth: 8,
            data: [60, 90, 120],
          },
          {
            barWidth: 8,
            data: [140, 170, 200],
          },
          {
            barWidth: 8,
            data: [85, 115, 145],
          },
          {
            barWidth: 8,
            data: [125, 155, 185],
          },
          {
            barWidth: 8,
            data: [95, 125, 155],
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
            barWidth: 8,
            data: [120, 180, 150],
          },
          {
            barWidth: 8,
            data: [80, 130, 100],
          },
          {
            barWidth: 8,
            data: [90, 120, 140],
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
        story: generateStoryDescription('chart', 'bar-chart-grouped-tooltip'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Only run this code when running in Chromatic, as it is used to show the tooltip for the snapshot.
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#bar-series-grouped-tooltip');
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
    <syn-chart id="bar-series-grouped-tooltip"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-grouped-tooltip');

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
              name: 'Series A'
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              name: 'SeriesB'
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              name: 'Series C'
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
        story: generateStoryDescription('chart', 'bar-chart-grouped-legend'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-grouped-legend"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-grouped-legend');

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
              name: 'Series A'
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              name: 'Series B'
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              name: 'Series C'
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
