import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/chart/chart.js';
import {
  generateStoryDescription,
  storybookDefaults,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { paddingDecorator } from '../../src/decorators/PaddingDecorator.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-accordion');
const { generateTemplate } = storybookTemplate('syn-accordion');

const meta: Meta = {
  args: defaultArgs,
  argTypes,
  component: 'syn-chart',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('41094-279501'),
    docs: {
      description: {
        component: generateStoryDescription('accordion', 'default'),
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
        story: generateStoryDescription('accordion', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const General: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('accordion', 'contained'),
      },
    },
  },
  render: () => html`
    <syn-chart .option=${{
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: [150, 230, 224] }],
    }}></syn-chart>
  `,
};
