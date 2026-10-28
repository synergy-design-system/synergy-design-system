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
import '../../../components/src/components/switch/switch.js';
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
        component: generateStoryDescription('chart', 'bar-series-single-default'),
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
        story: generateStoryDescription('chart', 'bar-series-single-preset'),
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
        story: generateStoryDescription('chart', 'bar-series-vertical'),
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
        story: generateStoryDescription('chart', 'bar-series-horizontal'),
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
        story: generateStoryDescription('chart', 'bar-series-value-range'),
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
        story: generateStoryDescription('chart', 'bar-series-negative'),
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
        story: generateStoryDescription('chart', 'bar-series-positive-and-negative'),
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
        story: generateStoryDescription('chart', 'bar-series-custom-width'),
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
              barWidth: 40,
              barMaxWidth: 40,
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
        story: generateStoryDescription('chart', 'bar-series-custom-color'),
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
        story: generateStoryDescription('chart', 'bar-series-tooltip'),
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
        story: generateStoryDescription('chart', 'bar-series-selected-mode'),
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

export const LargeDataSet: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-series-large-data'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; align-items: flex-start; flex-direction: column; gap: var(--syn-spacing-medium); margin-bottom: var(--syn-spacing-small);">
      <syn-switch id="bar-chart-single-large-toggle" checked>Optimize rendering</syn-switch>
      <span id="bar-chart-single-large-status" class="syn-body--medium"></span>
    </div>
    <syn-chart id="bar-chart-single-large-data"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#bar-chart-single-large-data');
      const largeToggles = document.querySelectorAll('#bar-chart-single-large-toggle');
      const statuses = document.querySelectorAll('#bar-chart-single-large-status');
      const length = 4e4;
      const categories = Array.from({ length }, (_, index) => String(index + 1));
      let seed = 123456;
      const random = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };
      const segmentSize = 1000;
      const levels = Array.from(
        { length: Math.ceil(length / segmentSize) + 1 },
        () => 1000 + random() * 8000,
      );
      const values = Array.from({ length }, (_, index) => {
        const segment = Math.floor(index / segmentSize);
        const linearProgress = (index % segmentSize) / segmentSize;
        const progress = linearProgress * linearProgress * (3 - 2 * linearProgress);
        const level = levels[segment] + (levels[segment + 1] - levels[segment]) * progress;
        return Math.max(0, Math.round(level + (random() - 0.5) * 3000));
      });

      const baseConfig = {
        xAxis: {
          data: categories,
          name: 'Category',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
        },
        dataZoom: [{
          type: 'slider',
        }],
        grid: {
          bottom: 120,
        }
      };

      largeToggles.forEach((largeToggle, index) => {
        const chart = charts[index];
        const status = statuses[index];
        if (!chart || !status) return;

        const updateChart = () => {
          const large = largeToggle.checked;
          status.textContent = large
            ? 'Performance optimization: enabled'
            : 'Performance optimization: disabled';
          chart.config = handle => handle
            .baseConfig(baseConfig)
            .seriesBar([{
              data: values,
              large,
              largeThreshold: 1000,
            }]);
        };

        largeToggle.addEventListener('syn-change', updateChart);
        updateChart();
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
  LargeDataSet,
}, 700);
/* eslint-enable sort-keys */
