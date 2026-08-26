import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { PALETTE_TOKENS } from '../../../components/src/components/chart/chart.palettes.js';
import '../../../components/src/components/chart/chart.js';
import '../../../components/src/components/chart-axis/chart-axis.js';
import '../../../components/src/components/chart-series/chart-series.js';
import {
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
} from '../../src/helpers/component.js';
import { Chromatic_Modes_Sick_2025 } from '../../.storybook/modes.js';
import { waitForFinishedChartPlayFunction } from '../../src/playFunction/waitForFinishedCharts.js';

const { overrideArgs } = storybookHelpers('syn-chart');
const { args: defaultArgs, argTypes } = storybookDefaults('syn-chart');

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
      modes: Chromatic_Modes_Sick_2025,
    },
    // This is needed as otherwise the `id` attribute is shown in the docs table
    controls: {exclude: ['id']},
    docs: {
      description: {
        component:
          [
            '>⚠️ **Experimental**:',
            '>syn-chart is currently experimental.',
            '>The API may change in future releases without prior notice.',
            '>Use it with caution in production environments and expect potential breaking changes.\n',
            generateStoryDescription('chart', 'default'),
          ].join('\n'),
      },
    },
  },
  play: waitForFinishedChartPlayFunction,
  tags: ['Charting', 'Data Visualization'],
  title: 'Charts/Convenience API/Sub components',
};
export default meta;

type Story = StoryObj;

export const SimpleExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Builds a line chart through `syn-chart-axis` and `syn-chart-series` children using direct array data.',
      },
    },
  },
  render: () => html`
    <syn-chart>
      <syn-chart-axis axis="x" .data=${['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}></syn-chart-axis>
      <syn-chart-axis axis="y" type="value"></syn-chart-axis>
      <syn-chart-series type="line" name="Revenue" .data=${[120, 160, 140, 210, 240]}></syn-chart-series>
    </syn-chart>
  `,
};

export const ReactiveUpdate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates runtime updates by changing child properties after initial render.',
      },
    },
  },
  render: () => html`
    <syn-chart>
      <syn-chart-axis axis="y" type="value"></syn-chart-axis>
      <syn-chart-axis id="reactive-y-axis" axis="x" .data=${['Q1', 'Q2', 'Q3', 'Q4']}></syn-chart-axis>
      <syn-chart-series id="reactive-series" type="line" name="Forecast" .data=${[90, 140, 160, 180]}></syn-chart-series>
    </syn-chart>
    <script type="module">
      
        setTimeout(() => {
          const axis = document.querySelector('#reactive-y-axis');
          const series = document.querySelector('#reactive-series');
          if (axis) {
            axis.data = ['Mo', 'Di', 'Mi', 'Do'];
          }
          if (series) {
            series.data = [100, 150, 175, 210];
          }
        }, 900);

    </script>
  `,
};

export const MultipleSeries: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates multiple series declared as individual `syn-chart-series` children.',
      },
    },
  },
  render: () => html`
    <syn-chart .config=${{ legend: { show: true } }}>
      <syn-chart-axis axis="x" .data=${['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}></syn-chart-axis>
      <syn-chart-axis axis="y" type="value"></syn-chart-axis>
      <syn-chart-series type="line" name="Revenue" .data=${[120, 160, 140, 210, 240]}></syn-chart-series>
      <syn-chart-series type="line" name="Cost" .data=${[90, 110, 120, 140, 170]}></syn-chart-series>
      <syn-chart-series type="line" name="Profit" .data=${[30, 50, 20, 70, 70]}></syn-chart-series>
    </syn-chart>
  `,
};

export const InconsistentDataLengths: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: x-axis has more labels than series points to visualize mismatch handling in sub-components.',
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-convenience-sub-inconsistent" palette="sequential-05">
      <syn-chart-axis axis="x" type="category" .data=${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}></syn-chart-axis>
      <syn-chart-axis axis="y" type="value"></syn-chart-axis>
      <syn-chart-series type="line" name="Short Series" .data=${[110, 140, 130, 180]}></syn-chart-series>
      <syn-chart-series type="line" name="Long Series" .data=${[90, 120, 150, 170, 160, 190, 210]}></syn-chart-series>
    </syn-chart>
  `,
};

export const CyclicDataUpdate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates cyclic updates to a series data array to simulate live data changes.',
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-convenience-sub-cyclic" palette="categorical">
      <syn-chart-axis axis="y" type="value"></syn-chart-axis>
      <syn-chart-axis axis="x" .data=${['Jan', 'Feb', 'Mar', 'Apr', 'May']}></syn-chart-axis>
      <syn-chart-series type="line" name="Cyclic Data" .data=${[100, 150, 200, 250, 300]}></syn-chart-series>
    </syn-chart>
    <script type="module">
      const chart = document.querySelector('#chart-convenience-sub-cyclic');
      if (chart) {
        const series = chart.querySelector('syn-chart-series');
        setInterval(() => {
          if (series) {
            const data = Array.from({length:5}).map(() => Math.floor(Math.random() * 300));
            series.data = data;
          }
        }, 1500);
      }
    </script>
  `,
};

export const MultipleAxes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates multiple series declared as individual `syn-chart-series` children.',
      },
    },
  },
  render: () => html`
    <syn-chart .config=${{ legend: { show: true } }}>
      <syn-chart-axis axis="x" .data=${['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}></syn-chart-axis>
      <syn-chart-axis axis="y" .index=${0} type="value"></syn-chart-axis>
      <syn-chart-axis axis="y" .index=${1} type="value"></syn-chart-axis>
      <syn-chart-series .axisIndex=${0} type="line" name="Revenue" .data=${[120, 160, 140, 210, 240]}></syn-chart-series>
      <syn-chart-series .axisIndex=${0} type="line" name="Cost" .data=${[90, 110, 120, 140, 170]}></syn-chart-series>
      <syn-chart-series .axisIndex=${1} type="line" name="Profit" .data=${[12, 10, 20, 12, 13]}></syn-chart-series>
    </syn-chart>
  `,
};
