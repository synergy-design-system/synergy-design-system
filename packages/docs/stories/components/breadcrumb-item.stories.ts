/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/breadcrumb-item/breadcrumb-item.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-breadcrumb-item');
const { overrideArgs } = storybookHelpers('syn-breadcrumb-item');
const { generateTemplate } = storybookTemplate('syn-breadcrumb-item');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'Breadcrumb Item',
    },
    {
      name: 'suffix',
      type: 'slot',
      value: '<syn-icon slot="suffix" name="wallpaper"></syn-icon>',
    },
    {
      name: 'prefix',
      type: 'slot',
      value: '<syn-icon slot="prefix" name="home"></syn-icon>',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-breadcrumb-item',
  parameters: {
    design: generateFigmaPluginObject('17186-185318'),
    docs: {
      description: {
        component: generateStoryDescription('breadcrumb-item', 'default'),
      },
    },
  },
  title: 'Components/syn-breadcrumb-item',
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
        story: generateStoryDescription('breadcrumb-item', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
    <syn-breadcrumb>
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
      ${generateTemplate({ args })}
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
    </syn-breadcrumb>
  `,
} as Story;

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
}, 100);
/* eslint-enable sort-keys */
