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
        component: generateStoryDescription('chart', 'bar-series-stacked-default'),
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
        story: generateStoryDescription('chart', 'bar-series-stacked-preset'),
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: { 
            name: 'Values',
          },
          series: [
            {
              data: [120, 180, 150, 80, 70, 110, 130],
              type: 'bar',
              stack: 'total',
              itemStyle: {
                borderColor: 'transparent',
                borderWidth: 1,
              },
              barMinWidth: 12,
              barCategoryGap: 32,
              label: {
                color: 'inherit',
                position: 'left',
                show: true,
              }
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              type: 'bar',
              stack: 'total',
              barMinWidth: 12,
              barCategoryGap: 32,
              itemStyle: {
                borderColor: 'transparent',
                borderWidth: 1,
              },
              label: {
                color: 'inherit',
                position: 'left',
                show: true,
              }
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              type: 'bar',
              stack: 'total',
              barMinWidth: 12,
              barCategoryGap: 32,
              itemStyle: {
                borderColor: 'transparent',
                borderWidth: 1,
              },
              label: {
                color: 'inherit',
                position: 'left',
                show: true,
              }
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
          .seriesBarStacked([
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
        story: generateStoryDescription('chart', 'bar-series-horizontal'),
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
        .seriesBarStacked([
          {
            data: [120, 180, 150, 80, 70, 110, 130],
          },
          {
            data: [80, 130, 100, 70, 90, 160, 140],
            
          },
          {
            data: [90, 120, 140, 100, 110, 70, 60],
          },
          ], { orientation: 'horizontal' })
      });
    </script>
  `,
};

export const FixedValueRange: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-series-stacked-value-range'),
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
          .seriesBarStacked([
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

export const NegativeValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-series-stacked-negative'),
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
          .seriesBarStacked([
            {
              data: [-120, -180, -150, -80, -70, -110, -130],
            },
            {
              data: [-80, -130, -100, -70, -90, -160, -140],
            },
            {
              data: [-90, -120, -140, -100, -110, -70, -80],
            },
          ], { orientation: 'horizontal' })
      });
    </script>
  `,
};

export const PositiveAndNegative: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'bar-series-stacked-positive-and-negative'),
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
          .seriesBarStacked([
            {
              data: [ -100, -120, 150, 80, 70, -110, 130],
            },
            {
              data: [60, 40, -20, 60, -30, -80, -50],
            },
            {
              data: [120, -70, 50, -90, 80, 60, 140],
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
    <syn-chart id="bar-stacked-fixed-width"></syn-chart>
    <syn-chart id="bar-stacked-relative-width"></syn-chart>
    <script type="module">
      const fixedWidthCharts = document.querySelectorAll('#bar-stacked-fixed-width');
      const relativeWidthCharts = document.querySelectorAll('#bar-stacked-relative-width');
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

      fixedWidthCharts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesBarStacked([
            {
              barWidth: 30,
              barMaxWidth: 30,
              data: [120, 180, 150, 80, 70, 110, 130],
            },
            {
              barWidth: 30,
              barMaxWidth: 30,
              data: [80, 130, 100, 70, 90, 160, 140],
            },
            {
              barWidth: 30,
              barMaxWidth: 30,
              data: [90, 120, 140, 100, 110, 70, 60],
            },
          ]);
      });

      relativeWidthCharts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesBarStacked([
            {
              barWidth: '30%',
              data: [120, 180, 150, 80, 70, 110, 130],
            },
            {
              barWidth: '30%',
              data: [80, 130, 100, 70, 90, 160, 140],
            },
            {
              barWidth: '30%',
              data: [90, 120, 140, 100, 110, 70, 60],
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
        story: generateStoryDescription('chart', 'bar-series-custom-color'),
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
        color: [
          getChartColor('SynChartSequential02_80'),
          getChartColor('SynChartSequential02_70'),
          getChartColor('SynChartSequential02_50'),
        ],
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesBarStacked([
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
        story: generateStoryDescription('chart', 'bar-series-palette'),
      },
    },
  },
  render: () => html`
    <syn-chart id="bar-series-stacked-categorical"></syn-chart>
    <syn-chart id="bar-series-stacked-sequential"></syn-chart>
    <script type="module">
      // To use Synergy chart colors, import the resolved chart tokens. The chart
      // configuration currently requires hex values, which can be retrieved
      // directly from the chart tokens object:
      //
      // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

      const getChartColor = (token) => {
        return ChartTokens[token]['light'];
      };

      const categoricalCharts = document.querySelectorAll('#bar-series-stacked-categorical');
      const sequentialCharts = document.querySelectorAll(' #bar-series-stacked-sequential');
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
          .seriesBarStacked([
            {
              data: [120, 180, 150],
            },
            {
              data: [80, 130, 100],
            },
            {
              data: [90, 120, 140],
            },
            {
              data: [110, 140, 170],
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
          .seriesBarStacked([
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
          .seriesBarStacked([
            {
              data: [120, 180, 150, 80, 70, 110, 130],
              name: 'Series A',
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              name: 'SeriesB',
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              name: 'Series C',
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
        story: generateStoryDescription('chart', 'bar-series-legend'),
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
          .seriesBarStacked([
            {
              data: [120, 180, 150, 80, 70, 110, 130],
              name: 'Series A',
            },
            {
              data: [80, 130, 100, 70, 90, 160, 140],
              name: 'Series B',
            },
            {
              data: [90, 120, 140, 100, 110, 70, 60],
              name: 'Series C',
            },
          ])
          .legendShow()
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
    // Only run this code when running in Chromatic, as it is used to show the tooltip for the snapshot.
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#bar-series-stacked-selected-mode');
      if (!chart) return;
      const instance = chart.getInstance()!;

      const finishedPromise = new Promise<void>(resolve => {
        instance.on('finished', () => {
          instance.dispatchAction({
            dataIndex: [1, 3],
            seriesName: 'Multiple',
            type: 'select',
          });
          resolve();
        });
      });

      await finishedPromise;
    }
  },
  render: () => html`
    <syn-chart id="bar-series-stacked-selected-mode"></syn-chart>
    <div class="selected-container syn-body--small">
      <div>Select a bar to see the selections here:</div>
      <div id="bar-series-stacked-selected-info" class="syn-body--x-small"></div>
    </div>
    <script type="module">
      const charts = document.querySelectorAll('#bar-series-stacked-selected-mode');
      const selectedInfos = document.querySelectorAll('#bar-series-stacked-selected-info');

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

      const data = [
        {
          selectedMode: true,
          data: [120, 180, 150, 80, 70, 110, 130],
          name: 'Single / True'
        },
        {
          selectedMode: 'series',
          data: [80, 130, 100, 70, 90, 160, 140],
          name: 'Series'
        },
        {
          selectedMode: 'multiple',
          data: [90, 120, 140, 100, 110, 70, 60],
          name: 'Multiple'
        },
      ];

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesBarStacked(data)
          .legendShow();

        const instance = chart.getInstance();
        instance.on('selectchanged', ({ selected }) => {
          selectedInfos.forEach(selectedInfo => {
            selectedInfo.innerHTML = '';
            const selections = selected.map(item => ({ dataIndex: item.dataIndex, seriesIndex: item.seriesIndex }));
            selections.forEach(item => {
              const seriesName = document.createElement('div');
              const seriesValue = document.createElement('div');
              const selectedValues = item.dataIndex.map(index =>
                baseConfig.xAxis.data[index] + ' (' + data[item.seriesIndex].data[index] + ')'
              );
              seriesName.textContent = data[item.seriesIndex].name + ': ';
              seriesValue.textContent = selectedValues.join(', ');
              selectedInfo.appendChild(seriesName);
              selectedInfo.appendChild(seriesValue);
            });
          });
        });
      });
    </script>
    <style>
      .selected-container {
        border: 1px solid var(--syn-panel-border-color);
        background-color: var(--syn-panel-background-color);
        height: 80px;

      }
      #bar-series-stacked-selected-info {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: var(--syn-spacing-2x-small) var(--syn-spacing-small);
      }
    </style>
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
  CategoricalVsSequential,
  Legend,
}, 700);
/* eslint-enable sort-keys */
