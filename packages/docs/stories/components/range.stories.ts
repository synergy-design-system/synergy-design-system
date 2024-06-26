/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
// import { html } from 'lit';
import '../../../components/src/components/range/range.js';
import {
  // generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-range');
const { overrideArgs } = storybookHelpers('syn-range');
const { generateTemplate } = storybookTemplate('syn-range');

const meta: Meta = {
  args: overrideArgs([], defaultArgs),
  argTypes,
  component: 'syn-range',
  parameters: {
    design: generateFigmaPluginObject('20575-35283'),
    docs: {
      description: {
        component: generateStoryDescription('range', 'default'),
      },
    },
  },
  title: 'Components/syn-range',
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
        story: generateStoryDescription('range', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;
