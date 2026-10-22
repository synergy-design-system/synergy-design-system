import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import isChromatic from 'chromatic';
import '../../../components/src/components/chart/chart.js';
import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';
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
        component: generateStoryDescription('chart', 'area-series-default'),
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
  title: 'Charts/Series Types/Area Chart',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-default"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-default');

      charts.forEach(chart => {
        chart.config = {
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'category', name: 'Days',
          },
          yAxis: { type: 'value', name: 'Values' },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              areaStyle: {
                opacity: 0.2,
              },
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              type: 'line',
              areaStyle: {
                opacity: 0.2,
              },
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
              type: 'line',
              areaStyle: {
                opacity: 0.2,
              },
            },
          ],
        };
      });
    </script>
  `,
};

export const CurvedLine: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-curved'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-curved"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-curved');

      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category', name: 'Days',
        },
        yAxis: { type: 'value', name: 'Values' },
      };

      const lineData = [
        [820, 932, 901, 934, 1290, 1330, 1320],
        [620, 732, 701, 734, 1090, 1130, 1120],
        [420, 532, 501, 534, 890, 930, 920],
      ];

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesArea(lineData.map(data => ({
            data,
            smooth: true,
          })));
      });
    </script>
  `,
};

export const HiddenLine: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-hidden-lines'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-hidden"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-hidden');

      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category', name: 'Days',
        },
        yAxis: { type: 'value', name: 'Values' },
      };

      const lineData = [[820, 932, 901, 934, 1290, 1330, 1320], [620, 732, 701, 734, 1090, 1130, 1120]];

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesArea(lineData.map(data => ({
            data,
            lineStyle: {
              width: 0,
            },
            symbol: 'circle',
          })));
      });
    </script>
  `,
};

export const LineStylesAndWidths: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-line-styles'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-line-styles"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-line-styles');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesArea([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              lineStyle: { type: 'solid', width: 2 },
              name: 'Solid, 2 px',
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              lineStyle: { type: 'dashed', width: 4 },
              name: 'Dashed, 4 px',
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
              lineStyle: { type: 'dotted', width: 6 },
              name: 'Dotted, 6 px',
            },
          ])
          .legendShow();
      });
    </script>
  `,
};

export const SymbolStylesAndSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-symbols'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-symbols"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-symbols');

      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category', name: 'Days',
        },
        yAxis: { type: 'value', name: 'Values' },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesArea([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              name: 'Empty circle',
              symbol: 'emptyCircle',
              symbolSize: 8,
            },
            {
              data: [720, 832, 801, 834, 1190, 1230, 1220],
              name: 'Circle',
              symbol: 'circle',
              symbolSize: 10,
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              name: 'Diamond',
              symbol: 'diamond',
              symbolSize: 14,
            },
            {
              data: [520, 632, 601, 634, 990, 1030, 1020],
              name: 'Triangle',
              symbol: 'triangle',
              symbolSize: 12,
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
              name: 'Rect',
              symbol: 'rect',
              symbolSize: 12,
            },
            {
              data: [320, 432, 401, 434, 790, 830, 820],
              name: 'Pin',
              symbol: 'pin',
              symbolSize: 16,
            },
            {
              data: [220, 332, 301, 334, 690, 730, 720],
              name: 'Arrow',
              symbol: 'arrow',
              symbolSize: 14,
            },
            {
              data: [120, 232, 201, 234, 590, 630, 620],
              name: 'Round rect',
              symbol: 'roundRect',
              symbolSize: 12,
            },
            {
              data: [20, 132, 101, 134, 490, 530, 520],
              name: 'None',
              symbol: 'none',
            },
          ])
          .legendShow({}, { top: 140 });
      });
    </script>
  `,
};

export const ColorPalettes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-palette'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-palettes" palette="sequential-01"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-palettes');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesArea([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
            },
          ]);
      });
    </script>
  `,
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-custom-colors'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-custom-colors"></syn-chart>
    <script type="module">
      // To use Synergy chart colors, import the resolved chart tokens. The chart
      // configuration currently requires hex values, which can be retrieved
      // directly from the chart tokens object:
      //
      // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

      const getChartColor = (token) => {
        return ChartTokens[token]['light'];
      };

      const charts = document.querySelectorAll('#area-series-custom-colors');
      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category', name: 'Days',
        },
        yAxis: { type: 'value', name: 'Values' },
        color: [
          getChartColor('SynChartSequential02_80'),
          getChartColor('SynChartSequential02_70'),
          getChartColor('SynChartSequential02_50'),
        ],
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesArea([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              name: 'Series A',
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              name: 'Series B',
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
              name: 'Series C',
            },
          ]);
      });
    </script>
  `,
};

export const PositiveAndNegativeValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-positive-and-negative-values'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-positive-and-negative-values"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-positive-and-negative-values');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesArea([
            {
              data: [-820, 932, -901, 934, -1290, 1330, 1320],
            },
          ]);
      });
    </script>
  `,
};

export const Origin: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-origin'),
      },
    },
  },
  render: () => html`
    <div style="display: grid; grid-template-columns: 50% 50%; gap: var(--syn-spacing-medium);">
    ${['auto', 'start', 'end', 500].map(origin => html`
      <div>
        <span style="display: block; margin-bottom: var(--syn-spacing-medium)">Origin: ${origin}</span>
        <syn-chart
        class="area-series-origin"
        data-origin=${JSON.stringify(origin)}
        ></syn-chart>
      </div>
      `)}
    </div>
    <script type="module">
      const charts = document.querySelectorAll('.area-series-origin');

      charts.forEach(chart => {
        const origin = JSON.parse(chart.dataset.origin);

        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesArea([{
            areaStyle: { origin },
            data: [-620, -320, 200, 734, 1090, 530, -120],
          }])
      });
    </script>
  `,
};

export const Stack: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-stack'),
      },
    },
  },
  render: () => html`
    <div style="display: grid; grid-template-columns: 50% 50%; gap: var(--syn-spacing-medium);">
      ${['samesign', 'all', 'positive', 'negative'].map(strategy => html`
        <div style="min-width: 0;">
          <span style="display: block; margin-bottom: var(--syn-spacing-medium)">
            Stack strategy: ${strategy}
          </span>
          <syn-chart
            class="area-series-stack"
            data-stack-strategy=${strategy}
          ></syn-chart>
        </div>
      `)}
    </div>
    <script type="module">
      const charts = document.querySelectorAll('.area-series-stack');
      const seriesData = [
        [400, -400, 400, -400],
        [200, -200, -200, 200],
      ];

      charts.forEach(chart => {
        const stackStrategy = chart.dataset.stackStrategy;

        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Both positive', 'Both negative', '1. positive, 2. negative', '1. negative, 2. positive'],
              type: 'category', name: 'Days',
              axisLabel: {
                interval: 0,
                width: 70,
                overflow: 'break',
              }
            },
            yAxis: { min: -1000, max: 1000, type: 'value', name: 'Values' },
          })
          .seriesArea(seriesData.map((data, index) => ({
            data,
            name: 'Series ' + (index + 1),
            stack: 'total',
            stackStrategy,
          })))
          .legendShow();
      });
    </script>
  `,
};

export const FocusOnHover: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-focus-hover'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#area-series-focus');
      if (!chart) return;
      const instance = chart.getInstance()!;

      const finishedPromise = new Promise<void>(resolve => {
        instance.on('finished', () => {
          instance.dispatchAction({ seriesIndex: 2, type: 'highlight' });
          resolve();
        });
      });

      await finishedPromise;
    }
  },
  render: () => html`
    <syn-chart id="area-series-focus"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-focus');
      const seriesData = [
        [820, 932, 901, 934, 1290, 1330, 1320],
        [620, 732, 701, 734, 1090, 1130, 1120],
        [420, 532, 501, 534, 890, 930, 920],
      ];

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesArea(seriesData.map((data, index) => ({
            data,
            emphasis: {
              focus: 'series',
            },
          })));
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
        story: generateStoryDescription('chart', 'area-series-tooltip'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#area-series-tooltip');
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
    <syn-chart id="area-series-tooltip"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-tooltip');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesArea([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              name: 'Series A',
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              name: 'Series B',
            },
            ])
          .tooltipShow();
      });
    </script>
  `,
};

export const WithLegend: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-with-legend'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-legend"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-legend');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            legend: { selectedMode: 'multiple' },
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesArea([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              name: 'Series A',
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              name: 'Series B',
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
              name: 'Series C',
            },
          ])
          .legendShow();
      });
    </script>
  `,
};

export const Zoom: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-series-zoom'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-series-zoom"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-series-zoom');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            dataZoom: [
              { type: 'slider', start: 30, end: 70 },
            ],
            grid: { bottom: 120 },
            xAxis: {
              data: Array.from({ length: 30 }, (_, index) => {
                const date = new Date(2026, 0, 1 + index);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }),
              type: 'category', name: 'Date',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesArea([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320, 620, 732, 701, 734, 1090, 1130, 1120, 420, 532, 501, 534, 890, 930, 920, 320, 432, 401, 434, 790, 830, 820, 220, 332],
              name: 'Series A',
            },
            {
              data: [450, 680, 550, 890, 720, 850, 610, 1100, 950, 820, 1050, 650, 780, 560, 920, 1200, 680, 750, 1040, 590, 875, 1150, 740, 920, 680, 1080, 620, 950, 1220, 750],
              name: 'Series B',
            },
          ]);
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  CurvedLine,
  LineStylesAndWidths,
  SymbolStylesAndSizes,
  ColorPalettes,
  CustomColors,
  PositiveAndNegativeValues,
  Origin,
  Stack,
  WithLegend,
  Zoom,
}, 700);
/* eslint-enable sort-keys */
