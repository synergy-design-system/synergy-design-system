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
      <syn-chart id="get-instance" 
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
        const chart = document.getElementById('get-instance');
        const chartInstance = chart.getInstance();
        chartInstance.on('click', params => console.log('ECharts click event:', params));
      </script>
    `,
};
