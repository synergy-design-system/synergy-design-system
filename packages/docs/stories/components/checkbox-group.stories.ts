import '../../../components/src/components/checkbox-group/checkbox-group.js';
import '../../../components/src/components/checkbox/checkbox.js';
import '../../../components/src/components/button/button.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { argTypes } = storybookDefaults('syn-checkbox-group');
const { overrideArgs } = storybookHelpers('syn-checkbox-group');
const { generateTemplate } = storybookTemplate('syn-checkbox-group');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'label',
      type: 'attribute',
      value: 'This is a label',
    },
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>
        <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
        <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>
      `,
    },
  ]),
  argTypes,
  component: 'syn-checkbox-group',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('50279-43830'),
    docs: {
      description: {
        component: generateStoryDescription('checkbox-group', 'default'),
      },
    },
  },
  tags: ['Form'],
  title: 'Components/syn-checkbox-group',
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
        story: generateStoryDescription('checkbox-group', 'default'),
      },
    },
  },
  render: (args) => generateTemplate({ args }),
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
}, 200);
/* eslint-enable sort-keys */
