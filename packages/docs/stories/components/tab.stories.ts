/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/tab/tab';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription, storybookDefaults, storybookHelpers, storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-tab');
const { overrideArgs } = storybookHelpers('syn-tab');
const { generateTemplate } = storybookTemplate('syn-tab');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'Tab',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-tab',
  parameters: {
    design: generateFigmaPluginObject('18008-40436'),
    docs: {
      description: {
        component: generateStoryDescription('tab', 'default'),
      },
    },
  },
  title: 'Components/syn-tab',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('tab', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
  ${generateTemplate({ args })}
  <syn-tab active>Active</syn-tab>
  <syn-tab closable>Closable</syn-tab>
  <syn-tab disabled>Disabled</syn-tab>
  `,
} as Story;

export const Screenshot: Story = generateScreenshotStory({
  Default,
});
