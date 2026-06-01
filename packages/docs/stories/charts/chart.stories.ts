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

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Config,
  Palette,
  GetInstance,
  MultipleChartsWithDifferentPalettes,
}, 600);
/* eslint-enable sort-keys */
