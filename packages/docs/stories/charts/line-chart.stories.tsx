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
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_Sick_2025 } from '../../.storybook/modes.js';

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_Sick_2025,
      pauseAnimationAtEnd: false,
    },
    design: generateFigmaPluginObject('41094-279501'),
    docs: {
      description: {
        component: generateStoryDescription('chart', 'line-chart-default'),
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
  title: 'Charts/Features/Line Chart',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'line-chart-default'),
      },
    },
  },
  render: () => html`
    <syn-chart id="line-series-default"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#line-series-default');

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
          .seriesLine([
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
        ])
      });
    </script>
  `,
};

export const CurvedLine: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'line-series-curved'),
      },
    },
  },
  render: () => html`
    <syn-chart id="line-series-curved"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#line-series-curved');

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
          .seriesLine(lineData.map(data => ({
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
        story: generateStoryDescription('chart', 'line-series-hidden-lines'),
      },
    },
  },
  render: () => html`
    <syn-chart id="line-series-hidden"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#line-series-hidden');

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
          .seriesLine(lineData.map(data => ({
            data,
            lineStyle: {
              width: 0,
            }
          })));
      });
    </script>
  `,
};

export const MultipleLineStyles: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'line-series-styles'),
      },
    },
  },
  render: () => html`
    <syn-chart id="line-series-styles"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#line-series-styles');

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
          .seriesLine([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              name: 'Solid Line',
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              name: 'Dashed Line',
              lineStyle: {
                type: 'dashed',
              },
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
              name: 'Dotted Line',
              lineStyle: {
                type: 'dotted',
              },
            },
          ])
          .legendShow();
      });
    </script>
  `,
};

export const MultipleLineWidthsAndSymbolSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'line-series-widths-symbol-sizes'),
      },
    },
  },
  render: () => html`
    <syn-chart id="line-series-widths"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#line-series-widths');

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
          .seriesLine([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              name: 'Default',
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              name: 'Width: 4',
              lineStyle: {
                width: 4,
              },
              symbolSize: 10,
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
              name: 'Width: 8',
              lineStyle: {
                width: 8,
              },
              symbolSize: 12,
            },
            {
              data: [220, 332, 301, 334, 690, 730, 720],
              name: 'Width: 12',
              lineStyle: {
                width: 12,
              },
              symbolSize: 16,
            }
          ])
          .legendShow();
      });
    </script>
  `,
};

export const MultipleSymbolStyles: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'line-series-symbols'),
      },
    },
  },
  render: () => html`
    <syn-chart id="line-series-symbols"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#line-series-symbols');

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
          .seriesLine([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              name: 'Empty circle symbol',
            },
            {
              data: [720, 832, 801, 834, 1190, 1230, 1220],
              name: 'Circle symbol',
              symbol: 'circle',
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              name: 'Diamond symbol',
              symbol: 'diamond',
            },
            {
              data: [520, 632, 601, 634, 990, 1030, 1020],
              name: 'Triangle symbol',
              symbol: 'triangle',
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
              name: 'Rect symbol',
              symbol: 'rect',
            },
            {
              data: [320, 432, 401, 434, 790, 830, 820],
              name: 'Pin symbol',
              symbol: 'pin',
            },
            {
              data: [220, 332, 301, 334, 690, 730, 720],
              name: 'Arrow symbol',
              symbol: 'arrow',
            },
            {
              data: [120, 232, 201, 234, 590, 630, 620],
              name: 'Round rect symbol',
              symbol: 'roundRect',
            },
            {
              data: [20, 132, 101, 134, 490, 530, 520],
              name: 'None symbol',
              symbol: 'none',
            },
          ])
          .legendShow( {}, { top: 140 });
      });
    </script>
  `,
};

export const CustomLineAndSymbolColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'line-series-custom-colors'),
      },
    },
  },
  render: () => html`
    <syn-chart id="line-series-custom-colors"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#line-series-custom-colors');

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
          .seriesLine([
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              lineStyle: {
                color: '#6ad88f',
              },
              itemStyle: {
                color: '#6ad88f',
              },
            },
            {
              data: [420, 532, 501, 534, 890, 930, 920],
              lineStyle: {
                color: '#d19800',
              },
              itemStyle: {
                color: '#d19800',
              },
            },
          ])
      });
    </script>
  `,
};

export const IntegratedZooming: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'line-series-integrated-zooming'),
      },
    },
  },
  render: () => html`
    <syn-chart id="line-series-integrated-zooming"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#line-series-integrated-zooming');

      const baseConfig = {
        xAxis: {
          data: Array.from({ length: 30 }, (_, i) => {
            const d = new Date(2026, 0, 1 + i);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }),
          type: 'category', name: 'Date',
        },
        yAxis: { type: 'value', name: 'Values' },
        dataZoom: [{
          type: 'inside',
        }],
      };


      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesLine([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320, 620, 732, 701, 734, 1090, 1130, 1120, 420, 532, 501, 534, 890, 930, 920, 320, 432, 401, 434, 790, 830, 820, 220, 332],
            },
            {
              data: [450, 680, 550, 890, 720, 850, 610, 1100, 950, 820, 1050, 650, 780, 560, 920, 1200, 680, 750, 1040, 590, 875, 1150, 740, 920, 680, 1080, 620, 950, 1220, 750],
            },
          ])
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  CurvedLine,
  HiddenLine,
  MultipleLineStyles,
  MultipleLineWidthsAndSymbolSizes,
  MultipleSymbolStyles,
  CustomLineAndSymbolColors,
  IntegratedZooming,
}, 700);
/* eslint-enable sort-keys */
