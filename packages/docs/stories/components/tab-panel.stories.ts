/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/tab-panel/tab-panel';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription, storybookDefaults, storybookHelpers, storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-tab-panel');
const { overrideArgs } = storybookHelpers('syn-tab-panel');
const { generateTemplate } = storybookTemplate('syn-tab-panel');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'This is the general tab panel.',
    },
    {
      name: 'name',
      type: 'attribute',
      value: 'general',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-tab-panel',
  parameters: {
    design: generateFigmaPluginObject('18086-44682'),
    docs: {
      description: {
        component: generateStoryDescription('tab-panel', 'description'),
      },
    },
  },
  title: 'Components/syn-tab-panel',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tab-panel', 'description'),
      },
    },
  },
  render: (args: unknown) => html`
  <syn-tab-group>
    <syn-tab slot="nav" panel="general">General</syn-tab>
    <syn-tab slot="nav" panel="custom">Custom</syn-tab>
    <syn-tab slot="nav" panel="advanced">Advanced</syn-tab>
    <syn-tab slot="nav" panel="disabled" disabled>Disabled</syn-tab>
    
    ${generateTemplate({ args })}
    <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
    <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
    <syn-tab-panel name="disabled">This is a disabled tab panel.</syn-tab-panel>
  </syn-tab-group>
  `,
} as Story;

export const Screenshot: Story = generateScreenshotStory({
  Default,
});
