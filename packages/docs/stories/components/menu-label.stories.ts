/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-label/menu-label.js';
import '../../../components/src/components/menu-item/menu-item.js';
import {
  generatePageDescription,
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-menu-label');
const { overrideArgs } = storybookHelpers('syn-menu-label');
const { generateTemplate } = storybookTemplate('syn-menu-label');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'Fruits',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-menu-label',
  parameters: {
    docs: {
      description: {
        component: generatePageDescription('menu-label', '10461-8649'),
      },
    },
  },
  title: 'Components/syn-menu-label',
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
        story: generateStoryDescription('menu-label', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
    <syn-menu style="width: 200px;">
      ${generateTemplate({ args })}
      <syn-menu-item>Apple</syn-menu-item>
      <syn-menu-item>Banana</syn-menu-item>
      <syn-menu-item>Orange</syn-menu-item>
      <syn-menu-label>Vegetables</syn-menu-label>
      <syn-menu-item>Broccoli</syn-menu-item>
      <syn-menu-item>Carrot</syn-menu-item>
      <syn-menu-item>Zucchini</syn-menu-item>
    </syn-menu>
  `,
} as Story;

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
}, 150);
/* eslint-enable sort-keys */
