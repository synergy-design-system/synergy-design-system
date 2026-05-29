import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/chart/chart.js';
import { PALETTE_TOKENS } from '../../../components/src/components/chart/chart.palettes.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';


const { overrideArgs } = storybookHelpers('syn-chart');
const { args: defaultArgs, argTypes } = storybookDefaults('syn-chart');
const { generateTemplate } = storybookTemplate('syn-chart');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'id',
      type: 'attribute',
      value: 'chart-default',
    },
  ], defaultArgs),
  argTypes: {
    ...argTypes,
    palette: {
      control: 'select',
      options: Object.keys(PALETTE_TOKENS),
    },
  },
  component: 'syn-chart',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('41094-279501'),
    docs: {
      description: {
        component:
          [
            '>⚠️ **Experimental Status**:',
            '>syn-chart is currently experimental.',
            '>The API may change in future releases without prior notice.',
            '>Use it with caution in production environments and expect potential breaking changes.\n',
            generateStoryDescription('chart', 'default'),
          ].join('\n'),
      },
    },
  },
  tags: ['Charting', 'Data Visualization'],
  title: 'Charts/syn-chart',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('chart', 'default'),
      },
    },
  },
  render: args => html`
    ${generateTemplate({ args })}
    <script type="module">
      const charts = document.querySelectorAll('#chart-default');
      charts.forEach(chart => {
        chart.config = {
          series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
          xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category', name: 'Days' },
          yAxis: { type: 'value', name: 'Values' },
        };
      });
    </script>
  `,
};

export const Config: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'config'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-config"></syn-chart>
    <script type="module">
      const chart = document.querySelector('#chart-config');
      chart.config = {
        series: [{ data: [150, 230, 224], type: 'line' }],
        xAxis: { data: ['Mon', 'Tue', 'Wed'], type: 'category' },
        yAxis: { type: 'value' },
      };
    </script>
  `,
};

export const Palette: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'palette'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-palette" palette="sequential-02"></syn-chart>
    <script type="module">
      const chart = document.querySelector('#chart-palette');
      chart.config = {
        series: [
          { data: [150, 230, 224, 218, 135, 147, 260], name: 'Series A', type: 'line' },
          { data: [80, 130, 180, 100, 90, 120, 200], name: 'Series B', type: 'line' },
          { data: [200, 160, 140, 170, 210, 180, 150], name: 'Series C', type: 'line' },
          { data: [100, 120, 150, 80, 70, 110, 130], name: 'Series D', type: 'line' },
          { data: [180, 200, 170, 190, 220, 210, 240], name: 'Series E', type: 'line' },
          { data: [90, 110, 130, 70, 60, 100, 120], name: 'Series F', type: 'line' },
          { data: [160, 190, 150, 200, 230, 220, 250], name: 'Series G', type: 'line' },
        ],
        xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' },
        yAxis: { type: 'value' },
      };
    </script>
  `,
};

export const GetInstance: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'get-instance'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-get-instance"></syn-chart>
    <p style="color:var(--syn-color-neutral-600); font-size:0.875rem; margin-top:1rem">
      Open the browser console and click a data point to see the native ECharts event payload.
    </p>
    <script type="module">
      const chart = document.querySelector('#chart-get-instance');
      chart.config = {
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        tooltip: { trigger: 'item' },
        xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' },
        yAxis: { type: 'value' },
      };
      const chartInstance = chart.getInstance();
      chartInstance.on('click', params => console.log('ECharts click event:', params));
    </script>
  `,
};

export const MultipleChartsWithDifferentPalettes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'multiple-charts'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-multiple-charts" palette="categorical"></syn-chart>
    <script type="module">
      const chart = document.querySelector('#chart-multiple-charts');

      const getHexValueFromVariable = (val) => getComputedStyle(document.documentElement).getPropertyValue(val).trim();

      chart.config = {
        series: [
          {
            data: [160, 185, 180, 175, 150, 160, 190], name: 'Series A', type: 'line',
          },
          {
            data: [170, 165, 155, 168, 180, 170, 158], name: 'Series B', type: 'line',
          },
          {
            data: [165, 175, 158, 172, 182, 175, 185], name: 'Series C', type: 'line',
          },
          {
            color: [getHexValueFromVariable('--syn-sequential-05-80')],
            data: [80, 60, 90, 50, 70, 55, 85], name: 'Series D', type: 'line',
          },
          {
            color: [getHexValueFromVariable('--syn-sequential-05-60')],
            data: [65, 75, 55, 80, 45, 70, 60], name: 'Series E', type: 'line',
          },
          {
            color: [getHexValueFromVariable('--syn-sequential-05-40')],
            data: [50, 70, 60, 45, 55, 65, 75], name: 'Series F', type: 'line',
          },
        ],
        xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' },
        yAxis: { type: 'value' },
      };
    </script>
  `,
};

export const AxisLinesHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'multiple-charts'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-hidden" palette="categorical"></syn-chart>
    <script type="module">
      const chart = document.querySelector('#chart-lines-hidden');

      chart.config = {
          series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
          xAxis: { 
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'category', name: 'Days',
          },
          yAxis: { type: 'value', name: 'Values' },
      };
    </script>
  `,
};

export const AxisLinesVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'multiple-charts'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-visible" palette="categorical"></syn-chart>
    <script type="module">
       // preview-ignore:start
      import { enhanceConfig, showGridLines } from '../node_modules/@synergy-design-system/components/dist/components/chart/configs/index.js';
      // preview-ignore:end

      
      const chart = document.querySelector('#chart-lines-visible');

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

      chart.config = enhanceConfig(baseConfig).with(showGridLines).build();
      setTimeout(() => {
        const instance = chart.getInstance();
        console.log('ECharts instance with axis lines visible:');
        console.log(instance.getOption());
      }, 2000);
    </script>
  `,
};

export const HorizontalLinesVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'multiple-charts'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-horizontal-lines-visible" palette="categorical"></syn-chart>
    <script type="module">
       // preview-ignore:start
       // Because of browser errors I cant import these functions on top of the chart.stories.ts and need to directly import it here.
       // But the caveat is, that every time something is changed in the chart component, the components package needs to be rebuild to see the changes in the story :/
      import { enhanceConfig, showHorizontalGridLines } from '../node_modules/@synergy-design-system/components/dist/components/chart/configs/index.js';
      // preview-ignore:end
      
      const chart = document.querySelector('#chart-horizontal-lines-visible');

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

      chart.config = enhanceConfig(baseConfig).with(showHorizontalGridLines).build();
      setTimeout(() => {
        const instance = chart.getInstance();
        console.log('ECharts instance with axis lines visible:');
        console.log(instance.getOption());
      }, 2000);
    </script>
  `,
};

export const VerticalLinesVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'multiple-charts'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-vertical-lines-visible"></syn-chart>
    <script type="module">
       // preview-ignore:start
      import { enhanceConfig, showVerticalGridLines } from '../node_modules/@synergy-design-system/components/dist/components/chart/configs/index.js';
      // preview-ignore:end
      
      const chart = document.querySelector('#chart-vertical-lines-visible');

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

      chart.config = enhanceConfig(baseConfig).with(showVerticalGridLines).build();
      setTimeout(() => {
        const instance = chart.getInstance();
        console.log('ECharts instance with axis lines visible:');
        console.log(instance.getOption());
      }, 2000);
    </script>
  `,
};

export const AxisLinesHiddenValuesHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'multiple-charts'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-hidden-values-hidden" palette="categorical"></syn-chart>
    <script type="module">
        // preview-ignore:start
        import { enhanceConfig, hideAxisValues } from '../node_modules/@synergy-design-system/components/dist/components/chart/configs/index.js';
        // preview-ignore:end
        
        const chart = document.querySelector('#chart-lines-hidden-values-hidden');

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
        chart.config = enhanceConfig(baseConfig).with(hideAxisValues).build();
    </script>
  `,
};

export const AxisLinesVisibleValuesHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'multiple-charts'),
      },
    },
  },
  render: () => html`
      <syn-chart id="chart-lines-visible-values-hidden" palette="categorical"></syn-chart>
      <script type="module">
        // preview-ignore:start
        import { enhanceConfig, hideAxisValues, showGridLines } from '../node_modules/@synergy-design-system/components/dist/components/chart/configs/index.js';
        // preview-ignore:end

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

        const chart = document.querySelector('#chart-lines-visible-values-hidden');
        chart.config = enhanceConfig(baseConfig).with(hideAxisValues).with(showGridLines).build();
      </script>
    `
  ,
};

export const PrefixIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'multiple-charts'),
      },
    },
  },
  render: () => html`
      <syn-chart id="chart-axis-prefix-icons" palette="categorical"></syn-chart>
      <script type="module">
        // preview-ignore:start
        import { enhanceConfig, showGridLines, xAxisWithIconLabels, yAxisWithIconLabels } from '../node_modules/@synergy-design-system/components/dist/components/chart/configs/index.js';
        // preview-ignore:end

        const DAY_ICONS = [
          'calendar_today',
          'event_available',
          'schedule',
          'event_note',
          'event_upcoming',
          'weekend',
          'sunny',
        ];

        const YAXIS_ICONS = ['wallpaper', 'tune', 'watch', 'format_paint', 'brush', 'gradient', 'format_color_reset'];

        const bootstrap = async () => {
          const iconUrls = await Promise.all(
            DAY_ICONS.map(async (iconName) => {
              const svg = await fetch('/assets/sick2025/' + iconName + '.svg').then(r => r.text());
              return 'data:image/svg+xml;base64,' + btoa(svg);
            })
          );
          const yAxisIconUrls = await Promise.all(
            YAXIS_ICONS.map(async (iconName) => {
              const svg = await fetch('/assets/sick2025/' + iconName + '.svg').then(r => r.text());
              return 'data:image/svg+xml;base64,' + btoa(svg);
            })
          );
          

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
              axisLabel: {
                color: 'green',
              }
            },
          };

          const chart = document.querySelector('#chart-axis-prefix-icons');
          chart.config = enhanceConfig(baseConfig)
            .with(showGridLines)
            .with(xAxisWithIconLabels({
              iconUrls,
              iconPosition: 'top',
            }))
            .with(yAxisWithIconLabels({
              iconUrls: yAxisIconUrls,
              iconPosition: 'left',
            }))
            .build();
        };

        bootstrap();
      </script>
    `
  ,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Config,
  Palette,
  GetInstance,
  MultipleChartsWithDifferentPalettes,
}, 600);
/* eslint-enable sort-keys */
