import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { PALETTE_TOKENS } from '../../../components/src/components/chart/chart.palettes.js';
import '../../../components/src/components/chart-prop/chart-prop.js';
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
  component: 'syn-chart-prop',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_Sick_2025,
    },
    // This is needed as otherwise the `id` attribute is shown in the docs table
    controls: { exclude: ['id'] },
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
  title: 'Charts/Convenience API/Enhanced properties',
};
export default meta;

type Story = StoryObj;

export const SimpleExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Builds a line chart through typed properties by passing arrays directly.',
      },
    },
  },
  render: () => html`
    <syn-chart-prop
      palette="categorical"
      chartType="line"
      .xAxisData=${{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }}
      .yAxisData=${{ type: 'value' }}
      .chartData=${[120, 160, 140, 210, 240]}>
    </syn-chart-prop>
  `,
};

export const ReactiveUpdate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates runtime updates by changing typed properties after initial render.',
      },
    },
  },
  render: () => html`
    <syn-chart-prop
      id="chart-convenience-props-update"
      palette="sequential-02"
      type="line"
      .xAxisData=${{ type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] }}
      .yAxisData=${{ type: 'value' }}
      .chartData=${[90, 140, 160, 180]}>
    </syn-chart-prop>
    <script type="module">
      setTimeout(() => {
        const chart = document.querySelector('#chart-convenience-props-update');
        if (chart) {
          chart.xAxisData = { type: 'category', data: ['Mo', 'Di', 'Mi', 'Do'] };
          chart.chartData = [100, 150, 175, 210];
        }
      }, 900);
    </script>
  `,
};

export const MultipleSeries: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates multiple series by passing an array of arrays to `chartData`.',
      },
    },
  },
  render: () => html`
    <syn-chart-prop
      palette="categorical"
      type="line"
      .xAxisData=${{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }}
      .yAxisData=${{ type: 'value' }}
      .series=${[{
        data: [120, 160, 140, 210, 240],
        name: 'Revenue',
        type: 'line',
      }, {
        data: [90, 110, 120, 140, 170],
        name: 'Profit',
        type: 'line',
      }, {
        data: [30, 50, 20, 70, 70],
        name: 'Expenses',
        type: 'line',
      }]}
      .config=${{ legend: { show: true } }}
      >
    </syn-chart-prop>
  `,
};

export const InconsistentDataLengths: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: x-axis has more labels than series points to visualize mismatch handling.',
      },
    },
  },
  render: () => html`
    <syn-chart-prop
      id="chart-convenience-props-inconsistent"
      palette="sequential-05"
      type="line"
      .xAxisData=${{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
      .yAxisData=${{ type: 'value' }}
      .chartData=${[
        [110, 140, 130, 180],
        [90, 120, 150, 170, 160, 190, 210],
      ]}>
    </syn-chart-prop>
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
    <syn-chart-prop id="chart-cyclic-data-update" palette="categorical"
      .xAxisData=${{ type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] }}
      .yAxisData=${{ type: 'value' }}
      type="line" .chartData=${[100, 150, 200, 250, 300]}>
    </syn-chart-prop>
    <script type="module">
      const chart = document.querySelector('#chart-cyclic-data-update');
      if (chart) {
        setInterval(() => {
          const data = Array.from({length:5}).map(() => Math.floor(Math.random() * 300));
          chart.chartData = data;
        }, 1500);
      }
    </script>
  `,
};
