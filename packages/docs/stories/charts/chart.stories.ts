import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/chart/chart.js';
import {
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
      name: 'option',
      type: 'attribute',
      value: {
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' },
        yAxis: { type: 'value' },
      },
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-chart',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('41094-279501'),
    docs: {
      description: {
        // TODO: update this by using our docs helpers to generate a description based on the JSDoc comments in the component source code
        component: 'The default story demonstrates a basic line chart configuration. The chart is configured via the `option` property, which accepts an object that maps directly to the ECharts option configuration. In this example, we set up a simple line chart with data for three categories (Mon, Tue, Wed) and corresponding values.',
      },
    },
  },
  tags: ['Charting'],
  title: 'Charting/syn-chart',
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
        // TODO: update this by using our docs helpers to generate a description based on the JSDoc comments in the component source code
        story: 'The default story demonstrates a basic line chart configuration. The chart is configured via the `option` property, which accepts an object that maps directly to the ECharts option configuration. In this example, we set up a simple line chart with data for three categories (Mon, Tue, Wed) and corresponding values.',
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const General: Story = {
  parameters: {
    docs: {
      description: {
        // TODO: update this by using our docs helpers to generate a description based on the JSDoc comments in the component source code
        story: 'The `option` property is the main way to configure the chart. It accepts an object that maps 1:1 to the ECharts option configuration. Assigning a new object to this property will update the chart with the new configuration.',
      },
    },
  },
  render: () => html`
    <syn-chart .option=${{
      series: [{ data: [150, 230, 224], type: 'line' }],
      xAxis: { data: ['Mon', 'Tue', 'Wed'], type: 'category' },
      yAxis: { type: 'value' },
    }}></syn-chart>
  `,
};

export const Palette: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          'Use the `palette` attribute to apply a Synergy design token color palette to chart series.',
          'Palette names map 1:1 to Synergy token groups: `categorical` (default, 12 colors),',
          '`sequential-01`–`sequential-07` (10-step single-hue ramps), and',
          '`sequential-status-critical/error/info/success/warning` (10-step status ramps).',
          '<br><br>',
          'If `option.color` is explicitly set, it takes precedence over the `palette` attribute.',
        ].join(' '),
      },
    },
  },
  render: () => html`
    <syn-chart
      palette="sequential-02"
      .option=${{
      legend: {},
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
    }}
    ></syn-chart>
  `,
};

export const GetInstance: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          // TODO: update this by using our docs helpers to generate a description based on the JSDoc comments in the component source code
          'Use `getInstance()` to access the underlying ECharts instance directly and work with its full native API.',
          'This is useful when the `option` property alone is not sufficient — for example to listen to ECharts events,',
          'trigger actions, or call `setOption()` with custom merge behavior.',
          '<br><br>',
          'This example attaches a click listener via the native ECharts API.',
          'Click any data point to see the event payload logged to the browser console.',
        ].join(' '),
      },
    },
  },
  render: () => html`
      <syn-chart id="chart-get-instance" 
        .option=${{
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        tooltip: { trigger: 'item' },
        xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' },
        yAxis: { type: 'value' },
      }}>

      </syn-chart>
      <p style="color:var(--syn-color-neutral-600);font-size:0.875rem;margin-top:1rem">
        Open the browser console and click a data point to see the native ECharts event payload.
      </p>
      <script type="module">
        const chart = document.getElementById('chart-get-instance');
        const chartInstance = chart.getInstance();
        chartInstance.on('click', params => console.log('ECharts click event:', params));
      </script>
    `,
};

export const MultipleCharts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'You can use multiple charts in one `<syn-chart>` instance, each with its own configuration and colors.',
      },
    },
  },
  render: () => html`
      <syn-chart
        palette="categorical"
        .option=${{
        legend: {},
        series: [
          {
            color: ['#7CFC00'], data: [150, 230, 224, 218, 135, 147, 260], name: 'Series A', type: 'line',
          },
          {
            color: ['#FFA500'],data: [80, 130, 180, 100, 90, 120, 200], name: 'Series B', type: 'line',
          },
          {
            data: [200, 160, 140, 170, 210, 180, 150], name: 'Series C', type: 'line',
          },
        ],
        xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], type: 'category' },
        yAxis: { type: 'value' },
      }}
      ></syn-chart>`,
};
