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
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { ChartSeriesDocumentation } from '../../src/helpers/chart-series-documentation.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';
import type SynChart from '../../../components/src/components/chart/chart.js';

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
        component: generateStoryDescription('chart', 'bar-chart-single-default'),
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
          yAxis: {
            name: 'Values',
          },
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
        story: generateStoryDescription('chart', 'bar-chart-vertical'),
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
        story: generateStoryDescription('chart', 'bar-chart-horizontal'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-single-horizontal"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-single-horizontal');

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
          .seriesBar([
            {
              data: [120, 180, 150, 80, 70, 110, 130],
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
        story: generateStoryDescription('chart', 'bar-chart-value-range'),
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
        story: generateStoryDescription('chart', 'bar-chart-negative'),
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
        story: generateStoryDescription('chart', 'bar-chart-positive-and-negative'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-single-positive-and-negative"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-single-positive-and-negative');

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
          .seriesBar([
            {
              data: [ 100, -120, 150, -80, 70, -110, 130],
            },
          ])
      });
    </script>
  `,
};

export const CustomBarWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-custom-width'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-single-fixed-width"></syn-chart>
    <syn-chart id="bar-series-single-relative-width"></syn-chart>
    <script type="module">
      const fixedWidthCharts = document.querySelectorAll('#bar-series-single-fixed-width');
      const relativeWidthCharts = document.querySelectorAll('#bar-series-single-relative-width');
      const baseConfig = {
        xAxis: {
          data: ['A', 'B', 'C'],
          name: 'Category',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
        },
      };

      fixedWidthCharts.forEach((fixed) => {
        fixed.config = handle => handle
          .baseConfig(baseConfig)
          .seriesBar([
            { 
              barWidth: 20,
              data: [120, 180, 150],
            }
          ]);
      });


      relativeWidthCharts.forEach((relative) => {
        relative.config = handle => handle
          .baseConfig(baseConfig)
          .seriesBar([
            {
              barWidth: '30%',
              data: [120, 180, 150],
            }
          ]);
      });
    </script>
  `,
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-custom-color'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-single-custom-color"></syn-chart>
    <script type="module">
      const getChartColor = token => ChartTokens[token]['light'];
      const charts = document.querySelectorAll('#bar-series-single-custom-color');
      const baseConfig = {
        xAxis: {
          data: ['A', 'B', 'C'],
          name: 'Category',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
        },
        color: [getChartColor('SynChartSequential02_70')],
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesBar([{ data: [120, 180, 150] }]);
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
        story: generateStoryDescription('chart', 'bar-chart-tooltip'),
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

export const SelectedMode: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-chart-selected-mode'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#bar-series-single-selected-mode');
      if (!chart) return;
      const instance = chart.getInstance()!;

      const finishedPromise = new Promise<void>(resolve => {
        instance.on('finished', () => {
          instance.dispatchAction({
            dataIndex: [1, 3],
            seriesIndex: 0,
            type: 'select',
          });
          resolve();
        });
      });

      await finishedPromise;
    }
  },
  render: () => html`
    <syn-chart id="bar-series-single-selected-mode"></syn-chart>
    <div class="syn-body--medium">
      Selected day: <span id="bar-series-selected-day" >-</span>
    </div>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-single-selected-mode');
      const status = document.querySelectorAll('#bar-series-selected-day');
      const values = [120, 180, 150, 80, 70, 110, 130];
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
          .seriesBar([
            {
              data: values,
              selectedMode: 'single',
            },
          ]);

        const instance = chart.getInstance();
        instance.on('selectchanged', ({ selected }) => {
          const selectedIndex = selected.flatMap(item => item.dataIndex)[0];
          status.forEach(el => {
            el.textContent = selectedIndex !== undefined
              ? baseConfig.xAxis.data[selectedIndex] + ' (' + values[selectedIndex] + ')'
              : '-';
          });
        });
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
  CustomBarWidth,
  CustomColors,
}, 700);
/* eslint-enable sort-keys */
