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
        component: generateStoryDescription('chart', 'area-range-series-default'),
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
  title: 'Charts/Series Types/Area Range Chart',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-range-series-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-range-series-default"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-range-series-default');

      const lower = [620, 732, 701, 734, 1090, 1130, 1120];
      const upper = [820, 1032, 901, 1134, 1390, 1430, 1320];
      charts.forEach(chart => {
        chart.config = {
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'category', name: 'Days',
          },
          yAxis: { type: 'value', name: 'Values' },
          tooltip: {},
          series: [
            {
              data: lower,
              stack: 'arearange',
              name: 'Series A',
              type: 'line',
              tooltip: {
                show: false,
              },
            },
            {
              data: upper.map((value, index) => value - lower[index]),
              stack: 'arearange',
              type: 'line',
              name: 'Series A',
              areaStyle: { opacity: 0.2 },
              tooltip: {
                valueFormatter: (_, dataIndex) => lower[dataIndex] + " - " + upper[dataIndex],
              },
            }
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
        story: generateStoryDescription('chart', 'area-range-series-curved'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-range-series-curved"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-range-series-curved');

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
          .seriesAreaRange(
            [[620, 820], [732, 932], [701, 901], [734, 934], [1090, 1290], [1130, 1330], [1120, 1320]],
            { smooth: true },
          );
      });
    </script>
  `,
};

export const HiddenLine: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-range-series-hidden-lines'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-range-series-hidden"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-range-series-hidden');

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
          .seriesAreaRange(
            [[620, 820], [732, 932], [701, 901], [734, 934], [1090, 1290], [1130, 1330], [1120, 1320]],
            {
              lineStyle: {
                width: 0,
              },
              symbol: 'circle',
            }
          );
      });
    </script>
  `,
};

export const LineStylesAndWidths: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-range-series-line-styles'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-range-series-line-styles"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-range-series-line-styles');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesAreaRange(
            [[620, 820], [732, 932], [701, 901], [734, 934], [1090, 1290], [1130, 1330], [1120, 1320]],
            {
              lineStyle: { type: 'solid', width: 2 },
              name: 'Solid, 2 px',
            }
          )
          .seriesAreaRange(
            [[370, 520], [482, 682], [451, 631], [484, 714], [840, 1040], [880, 1080], [870, 1070]],
            {
              lineStyle: { type: 'dashed', width: 4 },
              name: 'Dashed, 4 px',
            }
          )
          .seriesAreaRange(
            [[120, 270], [232, 382], [201, 351], [234, 384], [590, 740], [630, 780], [620, 770]],
            {
              lineStyle: { type: 'dotted', width: 6 },
              name: 'Dotted, 6 px',
            }
          )
          .legendShow();
      });
    </script>
  `,
};

export const SymbolStylesAndSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-range-series-symbols'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-range-series-symbols"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-range-series-symbols');

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
          .seriesAreaRange(
            [[7170, 7470], [7282, 7582], [7251, 7551], [7284, 7584], [7640, 7940], [7680, 7980], [7670, 7970]],
            {
              name: 'Empty circle',
              symbol: 'emptyCircle',
              symbolSize: 8,
            },
          )
          .seriesAreaRange(
            [[6270, 6570], [6382, 6682], [6351, 6651], [6384, 6684], [6740, 7040], [6780, 7080], [6770, 7070]],
            {
              name: 'Circle',
              symbol: 'circle',
              symbolSize: 10,
            },
          )
          .seriesAreaRange(
            [[5370, 5670], [5482, 5782], [5451, 5751], [5484, 5784], [5840, 6140], [5880, 6180], [5870, 6170]],
            {
              name: 'Diamond',
              symbol: 'diamond',
              symbolSize: 14,
            },
          )
          .seriesAreaRange(
            [[4470, 4770], [4582, 4882], [4551, 4851], [4584, 4884], [4940, 5240], [4980, 5280], [4970, 5270]],
            {
              name: 'Triangle',
              symbol: 'triangle',
              symbolSize: 12,
            },
          )
          .seriesAreaRange(
            [[3570, 3870], [3682, 3982], [3651, 3951], [3684, 3984], [4040, 4340], [4080, 4380], [4070, 4370]],
            {
              name: 'Rect',
              symbol: 'rect',
              symbolSize: 12,
            },
          )
          .seriesAreaRange(
            [[2670, 2970], [2782, 3082], [2751, 3051], [2784, 3084], [3140, 3440], [3180, 3480], [3170, 3470]],
            {
              name: 'Pin',
              symbol: 'pin',
              symbolSize: 16,
            },
          )
          .seriesAreaRange(
            [[1770, 2070], [1882, 2182], [1851, 2151], [1884, 2184], [2240, 2540], [2280, 2580], [2270, 2570]],
            {
              name: 'Arrow',
              symbol: 'arrow',
              symbolSize: 14,
            },
          )
          .seriesAreaRange(
            [[870, 1170], [982, 1282], [951, 1251], [984, 1284], [1340, 1640], [1380, 1680], [1370, 1670]],
            {
              name: 'Round rect',
              symbol: 'roundRect',
              symbolSize: 12,
            },
          )
          .seriesAreaRange(
            [[30, 270], [82, 382], [51, 351], [84, 384], [440, 740], [480, 780], [470, 770]],
            {
              name: 'None',
              symbol: 'none',
            },
          )
          .legendShow({}, { top: 140 });
      });
    </script>
  `,
};

export const ColorPalettes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-range-series-palette'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-range-series-palettes" palette="sequential-01"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-range-series-palettes');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesAreaRange(
            [[620, 820], [732, 932], [701, 901], [734, 934], [1090, 1290], [1130, 1330], [1120, 1320]],
          )
          .seriesAreaRange(
            [[370, 520], [482, 682], [451, 631], [484, 714], [840, 1040], [880, 1080], [870, 1070]],
          )
          .seriesAreaRange(
            [[120, 270], [232, 382], [201, 351], [234, 384], [590, 740], [630, 780], [620, 770]],
          );
      });
    </script>
  `,
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-range-series-custom-colors'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-range-series-custom-colors"></syn-chart>
    <script type="module">
      // To use Synergy chart colors, import the resolved chart tokens. The chart
      // configuration currently requires hex values, which can be retrieved
      // directly from the chart tokens object:
      //
      // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

      const getChartColor = (token) => {
        return ChartTokens[token]['light'];
      };

      const charts = document.querySelectorAll('#area-range-series-custom-colors');
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
          .seriesAreaRange(
            [[620, 820], [732, 932], [701, 901], [734, 934], [1090, 1290], [1130, 1330], [1120, 1320]],
          )
          .seriesAreaRange(
            [[370, 520], [482, 682], [451, 631], [484, 714], [840, 1040], [880, 1080], [870, 1070]],
          )
          .seriesAreaRange(
            [[120, 270], [232, 382], [201, 351], [234, 384], [590, 740], [630, 780], [620, 770]],
          );
      });
    </script>
  `,
};

export const PositiveAndNegativeValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-range-series-positive-and-negative-values'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-range-series-positive-and-negative-values"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-range-series-positive-and-negative-values');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesAreaRange(
            [[-280, -120], [-220, -40], [-80, 140], [50, 260], [120, 290], [-170, 180], [-260, 240]],
          );
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
        story: generateStoryDescription('chart', 'area-range-series-tooltip'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#area-range-series-tooltip');
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
    <syn-chart id="area-range-series-tooltip"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-range-series-tooltip');

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig({
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              type: 'category', name: 'Days',
            },
            yAxis: { type: 'value', name: 'Values' },
          })
          .seriesAreaRange(
            [[620, 820], [732, 932], [701, 901], [734, 934], [1090, 1290], [1130, 1330], [1120, 1320]],
            {
              name: 'Series A',
            }
            )
          .seriesAreaRange(
            [[370, 520], [482, 682], [451, 631], [484, 714], [840, 1040], [880, 1080], [870, 1070]],
            {
              name: 'Series B',
            }
          )
          .seriesAreaRange(
            [[120, 270], [232, 382], [201, 351], [234, 384], [590, 740], [630, 780], [620, 770]],
            {
              name: 'Series C',
            }
          )
          .tooltipShow();
      });
    </script>
  `,
};

export const WithLegend: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'area-range-series-with-legend'),
      },
    },
  },
  render: () => html`
    <syn-chart id="area-range-series-legend"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#area-range-series-legend');

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
          .seriesAreaRange(
            [[620, 820], [732, 932], [701, 901], [734, 934], [1090, 1290], [1130, 1330], [1120, 1320]],
            {
              name: 'Series A',
            }
            )
          .seriesAreaRange(
            [[370, 520], [482, 682], [451, 631], [484, 714], [840, 1040], [880, 1080], [870, 1070]],
            {
              name: 'Series B',
            }
          )
          .seriesAreaRange(
            [[120, 270], [232, 382], [201, 351], [234, 384], [590, 740], [630, 780], [620, 770]],
            {
              name: 'Series C',
            }
          )
          .legendShow();
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  CurvedLine,
  HiddenLine,
  LineStylesAndWidths,
  SymbolStylesAndSizes,
  ColorPalettes,
  CustomColors,
  PositiveAndNegativeValues,
  WithLegend,
}, 700);
/* eslint-enable sort-keys */
