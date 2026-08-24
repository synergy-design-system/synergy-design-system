import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/input/input.js';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import '../../../components/src/components/chart/chart.js';
import { formatter } from '../../../components/src/components/chart/index.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { Chromatic_Modes_Sick_2025 } from '../../.storybook/modes.js';
import { waitForFinishedChartPlayFunction } from '../../src/playFunction/waitForFinishedCharts.js';

declare global {
  interface Window {
    formatter: typeof formatter;
  }
}

window.formatter = formatter;

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_Sick_2025,
    },
    docs: {
      description: {
        component: generateStoryDescription('chart', 'axes-default'),
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
  play: waitForFinishedChartPlayFunction,
  tags: ['Charting', 'Data Visualization'],
  title: 'Charts/Features/Axes',
};
export default meta;

type Story = StoryObj;

export const AxesSplitLinesHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-split-lines-hidden'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-hidden"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#chart-lines-hidden');

      charts.forEach(chart => {
        chart.config = {
          series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
          xAxis: { 
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'category', name: 'Days',
          },
          yAxis: { type: 'value', name: 'Values' },
        };
      });
    </script>
  `,
};

export const AxesSplitLinesVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-split-lines-visible'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-visible"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#chart-lines-visible');

      const baseConfig = {
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
          type: 'value',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowSplitLines();
      });
    </script>
  `,
};

export const HorizontalSplitLinesVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-horizontal-split-lines'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-horizontal-lines-visible"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#chart-horizontal-lines-visible');

      const baseConfig = {
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
          type: 'value',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowYSplitLines();
      });
    </script>
  `,
};

export const VerticalSplitLinesVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-vertical-split-lines'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-vertical-lines-visible"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#chart-vertical-lines-visible');

      const baseConfig = {
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
          type: 'value',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowXSplitLines();
      });
    </script>
  `,
};

export const AxesLabelsHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-labels-hidden'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-hidden-values-hidden"></syn-chart>
    <script type="module">
        const charts = document.querySelectorAll('#chart-lines-hidden-values-hidden');

        const baseConfig = {
          series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            name: 'Days',
            type: 'category',
          },
          yAxis: {
            name: 'Values',
            type: 'value',
          },
        };
        charts.forEach(chart => {
          chart.config = handle => handle
            .baseConfig(baseConfig)
            .axesHideLabels();
        });
    </script>
  `,
};

export const AxesLinesVisibleWithLabelsHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-lines-visible-labels-hidden'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-visible-values-hidden"></syn-chart>
    <script type="module">
      const baseConfig = {
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
          type: 'value',
        },
      };

      const charts = document.querySelectorAll('#chart-lines-visible-values-hidden');
      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesHideLabels();
      });
    </script>
  `,
};

export const AxesLabelsWithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-labels-with-icons'),
      },
    },
  },
  render: () => html`
    <div class="controls">
      <syn-select value="top" label="x-axis icon position" id="x-axis-icon-position">
        <syn-option value="top">Top</syn-option>
        <syn-option value="bottom">Bottom</syn-option>
      </syn-select>
      <syn-select value="left" label="y-axis icon position" id="y-axis-icon-position">
        <syn-option value="left">Left</syn-option>
        <syn-option value="right">Right</syn-option>
      </syn-select>
    </div>
    <syn-chart id="chart-axis-prefix-icons"></syn-chart>
    <script type="module">
      const XAXIS_ICONS = ['calendar_today', 'event_available', 'schedule', 'event_note', 'event_upcoming', 'weekend', 'sunny'];
      const YAXIS_ICONS = ['wallpaper', 'tune', 'watch', 'format_paint', 'brush', 'gradient', 'format_color_reset'];

      let yAxisIconUrls = [];
      let xAxisIconUrls = [];

      const fetchIcons = async () => {
        xAxisIconUrls = await Promise.all(
          XAXIS_ICONS.map(async (iconName) => {
            const svg = await fetch('/assets/sick2025/' + iconName + '.svg').then(r => r.text());
            return 'data:image/svg+xml;base64,' + btoa(svg);
          })
        );
        yAxisIconUrls = await Promise.all(
          YAXIS_ICONS.map(async (iconName) => {
            const svg = await fetch('/assets/sick2025/' + iconName + '.svg').then(r => r.text());
            return 'data:image/svg+xml;base64,' + btoa(svg);
          })
        );
      };

      const xAxisIconPositionSelect = document.querySelector('#x-axis-icon-position');
      const yAxisIconPositionSelect = document.querySelector('#y-axis-icon-position');

      const setConfig = async () => {        
        const baseConfig = {
          series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            name: 'Days',
            type: 'category',
          },
          yAxis: {
            name: 'Values',
            type: 'value',
          },
        };

        const yAxisIconPosition = yAxisIconPositionSelect.value;
        const xAxisIconPosition = xAxisIconPositionSelect.value;

        const charts = document.querySelectorAll('#chart-axis-prefix-icons');
        charts.forEach(chart => {
          chart.config = handle => handle
            .baseConfig(baseConfig)
            .axesShowSplitLines()
            .axesAddXLabelIcons({
              iconUrls: xAxisIconUrls,
              iconPosition: xAxisIconPosition,
            })
            .axesAddYLabelIcons({
              iconUrls: yAxisIconUrls,
              iconPosition: yAxisIconPosition,
            });
        });
      };

      fetchIcons().then(setConfig);
      xAxisIconPositionSelect.addEventListener('syn-change', setConfig);
      yAxisIconPositionSelect.addEventListener('syn-change', setConfig);
    </script>
    <style>
      .controls {
        display: flex;
        gap: var(--syn-spacing-large);
        margin-bottom: var(--syn-spacing-large);
      }
    </style>
  `,
};

export const AxesPositioning: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-positioning'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: var(--syn-spacing-large); margin-bottom: var(--syn-spacing-large);">
      <syn-select value="bottom" label="x-axis position" id="x-axis-position">
        <syn-option value="top">Top</syn-option>
        <syn-option value="bottom">Bottom</syn-option>
      </syn-select>
      <syn-select value="left" label="y-axis position" id="y-axis-position">
        <syn-option value="left">Left</syn-option>
        <syn-option value="right">Right</syn-option>
      </syn-select>
    </div>
    <syn-chart id="chart-axis-position"></syn-chart>
    <script type="module">

      const setConfig = (xAxisSelect, yAxisSelect) => {

        const baseConfig = {
          series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            name: 'Days',
            type: 'category',
            position: xAxisSelect ? xAxisSelect.value : undefined,         
          },
          yAxis: {
            name: 'Values',
            type: 'value',
            position: yAxisSelect ? yAxisSelect.value : undefined,
          },
        };

        const charts = document.querySelectorAll('#chart-axis-position');
        charts.forEach(chart => {
          chart.config = handle => handle
            .baseConfig(baseConfig)
            .axesShowSplitLines();
        });
      };

      const xAxisPositionSelects = document.querySelectorAll('#x-axis-position');
      const yAxisPositionSelects = document.querySelectorAll('#y-axis-position');
      const positionSelects = Array.from(xAxisPositionSelects).map((select, index) => ({
        xAxisSelect: select,
        yAxisSelect: yAxisPositionSelects[index],
      }));

      positionSelects.forEach(({ xAxisSelect, yAxisSelect }) => {
        xAxisSelect.addEventListener('syn-change', () => {
          setConfig(xAxisSelect, yAxisSelect);
        });
        yAxisSelect.addEventListener('syn-change', () => {
          setConfig(xAxisSelect, yAxisSelect);
        });

        setConfig(xAxisSelect, yAxisSelect);
      });
    </script>
  `,
};

export const MinMaxValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-min-max-values'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: var(--syn-spacing-large); margin-bottom: var(--syn-spacing-large);">
        <syn-input type="number" id="x-axis-min-value" label="X-Axis min value"></syn-input>
        <syn-input type="number" id="x-axis-max-value" label="X-Axis max value"></syn-input>
        <syn-input type="number" id="y-axis-min-value" label="Y-Axis min value"></syn-input>
        <syn-input type="number" id="y-axis-max-value" label="Y-Axis max value"></syn-input>
    </div>
    <syn-chart id="chart-min-max"></syn-chart>
    <script type="module">


      const xAxisMinInput = document.querySelector('#x-axis-min-value');
      const xAxisMaxInput = document.querySelector('#x-axis-max-value');
      const yAxisMinInput = document.querySelector('#y-axis-min-value');
      const yAxisMaxInput = document.querySelector('#y-axis-max-value');

      xAxisMinInput.addEventListener('syn-change', () => {
        setConfig();
      });
      xAxisMaxInput.addEventListener('syn-change', () => {
        setConfig();
      });
      yAxisMinInput.addEventListener('syn-change', () => {
        setConfig();
      });
      yAxisMaxInput.addEventListener('syn-change', () => {
        setConfig();
      });

      const setConfig = () => {

        const baseConfig = {
          series: [{ data: [[-100, -150], [-50, 230], [0, 224], [50, -218], [100, 135], [150, 147], [200, 260]], type: 'line' }],
          xAxis: {
            data: [-100, -50, 0, 50, 100, 150, 200],
            name: 'Days',
            type: 'value',
            min: xAxisMinInput.value ? parseFloat(xAxisMinInput.value) : undefined,
            max: xAxisMaxInput.value ? parseFloat(xAxisMaxInput.value) : undefined,
          },
          yAxis: {
            name: 'Values',
            type: 'value',
            min: yAxisMinInput.value ? parseFloat(yAxisMinInput.value) : undefined,
            max: yAxisMaxInput.value ? parseFloat(yAxisMaxInput.value) : undefined,
          },
        };

        const charts = document.querySelectorAll('#chart-min-max');
        charts.forEach(chart => {
          chart.config = handle => handle
            .baseConfig(baseConfig)
            .axesShowSplitLines();
        });
      };

      setConfig();

    </script>
  `,
};

export const MultipleYAxes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-multiple-y-axes'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-multiple-y-axes"></syn-chart>
    <script type="module">


      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: [
          {
            name: 'Values',
            type: 'value',
          },
          {
            name: 'Values 2',
            type: 'value',
          },
          {
            name: 'Values 3',
            type: 'value',
            position: 'right',
          },
        ]
      };

      const charts = document.querySelectorAll('#chart-multiple-y-axes');
      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesLine([
            {
              data: [1820, 1932, 1901, 1934, 5290, 3330, 4320],
              name: 'Series 1',
              yAxisIndex: 0,
            },
            {
              data: [620, 732, 701, 734, 1090, 1130, 1120],
              yAxisIndex: 1,
              name: 'Series 2',
            },
            {
              data: [90, 50, 99, 143, 15, 32, 45],
              yAxisIndex: 2,
              name: 'Series 3',
            },
          ])
          .axesShowSplitLines();
      });

    </script>
  `,
};

export const MultipleSharedYAxes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-multiple-shared-y-axes'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-multiple-shared-y-axes"></syn-chart>
    <script type="module">


      const baseConfig = {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: [
          {
            name: 'Temperature (°C)',
            type: 'value',
  
          },
          {
            name: 'Precipitation (mm)',
            type: 'value',
            position: 'right',
          },
        ]
      };

      const charts = document.querySelectorAll('#chart-multiple-shared-y-axes');
      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesLine([
            {
              data: [18, 21, 23, 25, 22, 19, 17],
              name: 'Temperature Deutschland',
              yAxisIndex: 0,
              symbol: 'rect',
              itemStyle: {
                color: '#005aff',
              },
            },
            {
              data: [22, 24, 27, 29, 26, 23, 20],
              yAxisIndex: 0,
              name: 'Temperature Frankreich',
              symbol: 'rect',
              itemStyle: {
                color: '#005aff',
              },
              lineStyle: {
                type: 'dashed',
              }
            },
            {
              data: [5, 0, 2, 12, 18, 8, 3],
              yAxisIndex: 1,
              name: 'Precipitation Deutschland',
              symbol: 'dotted',
               itemStyle: {
                color: '#2d9c60',
              },
            
            },
            {
              data: [2, 0, 0, 8, 14, 6, 1],
              yAxisIndex: 1,
              name: 'Precipitation Frankreich',
              symbol: 'circle',
               itemStyle: {
                color: '#2d9c60',
              },
              lineStyle: {
                type: 'dotted',
              }
            },
          ])
          .axesShowSplitLines()
          .legendShow();
      });

    </script>
  `,
};

export const AxesLabelFormatting: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-label-formatting'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; margin-bottom: var(--syn-spacing-large);">
      <syn-select style="width: 300px;" value="celsius" label="Label formatter" id="y-axis-formatter">
        <syn-option value="celsius">Unit °C formatter</syn-option>
        <syn-option value="local">Local formatter</syn-option>
        <syn-option value="shorthand">Shorthand labels formatter</syn-option>
        <syn-option value="shorthand-min">Shorthand labels with min fraction formatter</syn-option>
        <syn-option value="number-min-max">Number with min / max fraction formatter</syn-option>
        <syn-option value="none">No formatter</syn-option>
      </syn-select>
    </div>
    <syn-chart id="chart-axis-label-formatter"></syn-chart>
    <script type="module">
      // import { formatter } from '../../../components/src/components/chart/index.js';

      const setConfig = (formatterSelect) => {
        let labelFormatter;
        switch (formatterSelect.value) {
        case 'celsius':
          labelFormatter = formatter.unitFormatter('°C');
          break;
        case 'shorthand':
          labelFormatter = formatter.numberShorthandFormatter();
          break;
        case 'shorthand-min':
          labelFormatter = formatter.numberShorthandFormatter(undefined, { minimumFractionDigits: 2 });
          break;
        case 'number-min-max':
          labelFormatter = formatter.numberFormatter(undefined, { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
          break;
        default:
          labelFormatter = undefined;
          break;
        }

        const baseConfig = {
          series: [{ data: [1500, 2300, 2242, 2184, 1352, 1479, 2605], type: 'line' }],
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            name: 'Days',
            type: 'category',
          },
          yAxis: {
            name: 'Values',
            type: 'value',
            axisLabel: {
              formatter: labelFormatter,
            },
          },
        };

        const charts = document.querySelectorAll('#chart-axis-label-formatter');
        charts.forEach(chart => {
          chart.config = handle => handle
            .baseConfig(baseConfig)
            .axesShowSplitLines();
        });
      };

      const selectFormatters = document.querySelectorAll('#y-axis-formatter');
     
      selectFormatters.forEach((select) => {
        select.addEventListener('syn-change', () => {
          setConfig(select);
        });
        setConfig(select);
      });
    </script>
  `,
};

export const CategoryAxesLabelGreedily: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-label-greedily'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; margin-bottom: var(--syn-spacing-large);">
      <syn-select style="width: 300px;" value="greedily" label="Axes label justification" id="x-axis-greedily">
        <syn-option value="greedily">Space greedily</syn-option>
        <syn-option value="default">Default</syn-option>
      </syn-select>
    </div>
    <syn-chart id="chart-axis-greedily"></syn-chart>
    <script type="module">
      const setConfig = (select) => {
        const charts = document.querySelectorAll('#chart-axis-greedily');
        charts.forEach(chart => {
          let axisLabel;

          if(select.value === 'greedily') {
            axisLabel = {
              interval: 0,
              hideOverlap: true,
            };
          }

          const baseConfig = {
            series: [{ data: [1500, 2300, 2541, 2184, 1352, 1479, 2605], type: 'line' }],
            xAxis: {
              data: [
                'France',
                'Germany',
                'South Africa',
                'United Kingdom',
                'Portugal',
                'Bosnia and Herzegovina',
                'Malaysia',
              ],
              name: 'Days',
              type: 'category',
              axisLabel: {
                ...axisLabel,
              },
            },
            yAxis: {
              name: 'Values',
              type: 'value',
            },
          };

          chart.config = handle => handle
            .baseConfig(baseConfig)
            .axesShowSplitLines();
        });
      };

      const selects = document.querySelectorAll('#x-axis-greedily');
     
      selects.forEach((select) => {
        select.addEventListener('syn-change', () => {
          setConfig(select);
        });
        setConfig(select);
      });
    </script>
  `,
};

export const CategoryAxesLabelEvenly: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-label-evenly'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-axis-evenly"></syn-chart>
    <script type="module">

      // Calculate the available width for each axis label based on the chart width and the number of labels
      const getAxisLabelWidth = (chart) => {
        const width = chart.getWidth() - 100; // Subtract some padding for the y-axis width
        const labelCount = 7;
        const labelWidth = width / labelCount;
        return labelWidth;
      }

      const updateChart = (chart) => {
        const chartInstance = chart.getInstance();

        const baseConfig = {
          series: [{ data: [1500, 2300, 2541, 2184, 1352, 1479, 2605], type: 'line' }],
          xAxis: {
            data: [
              'France',
              'Germany',
              'South Africa',
              'United Kingdom',
              'Portugal',
              'Bosnia and Herzegovina',
              'Malaysia',
            ],
            name: 'Days',
            type: 'category',
            axisLabel: {
              interval: 0,
              width: getAxisLabelWidth(chartInstance),
              overflow: 'truncate',
            },
          },
          yAxis: {
            name: 'Values',
            type: 'value',
          },
        };

        chart.config = handle => handle
          .baseConfig(baseConfig)
          .axesShowSplitLines();
      }

      const charts = document.querySelectorAll('#chart-axis-evenly');
      charts.forEach(chart => {
        const chartInstance = chart.getInstance();
        updateChart(chart);

        // Update the chart when the window is resized to recalculate the available width for each axis label
        window.addEventListener('resize', () => {
          updateChart(chart);
        });
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  AxesSplitLinesHidden,
  AxesSplitLinesVisible,
  HorizontalSplitLinesVisible,
  VerticalSplitLinesVisible,
  AxesLabelsHidden,
  AxesLinesVisibleWithLabelsHidden,
  AxesLabelsWithIcons,
  AxesPositioning,
  MinMaxValues,
  MultipleYAxes,
  MultipleSharedYAxes,
  AxesLabelFormatting,
  CategoryAxesLabelGreedily,
  CategoryAxesLabelEvenly,
}, 700);
/* eslint-enable sort-keys */
