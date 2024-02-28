/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/nav-item/nav-item.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-nav-item');
const { overrideArgs } = storybookHelpers('syn-nav-item');
const { generateTemplate } = storybookTemplate('syn-nav-item');

const meta: Meta = {
  // args: overrideArgs([
  //   {
  //     name: 'default',
  //     type: 'slot',
  //     value: `
  //       <syn-option value="1">Option 1</syn-option>
  //       <syn-option value="2">Option 2</syn-option>
  //       <syn-option value="3">Option 3</syn-option>
  //     `,
  //   },
  //   {
  //     name: 'label',
  //     type: 'attribute',
  //     value: 'Section 1',
  //   },
  // ], defaultArgs),
  args: defaultArgs,
  argTypes,
  component: 'syn-nav-item',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('nav-item', 'default'),
      },
      // story: {
      //   height: '400px',
      // },
    },
  },
  title: 'Components/syn-nav-item',
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
        story: generateStoryDescription('nav-item', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
};
