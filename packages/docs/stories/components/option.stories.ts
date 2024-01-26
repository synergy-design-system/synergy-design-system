/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/option/option';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  // generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-option');
const { overrideArgs } = storybookHelpers('syn-option');
const { generateTemplate } = storybookTemplate('syn-option');

const meta: Meta = {
  args: overrideArgs([
    { name: 'default', type: 'slot', value: 'Option 1' },
    { name: 'value', type: 'attribute', value: 'Option_1' },
  ], defaultArgs),
  argTypes,
  component: 'syn-option',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('option', 'default'),
      },
      story: {
        height: '250px',
      },
    },
  },
  title: 'Components/syn-option',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('option', 'default'),
      },
    },
  },
  render: (args: any) => html`
    <syn-select label="Select one">
      ${generateTemplate({ args })}
      <syn-option value="2">Option 2</syn-option>
      <syn-option value="2">Option 3</syn-option>
    </syn-select>
  `,
} as Story;

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('option', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-select label="Select one" label="Select one">
      <syn-option value="option-1">Email</syn-option>
      <syn-option value="option-2" disabled>Phone</syn-option>
      <syn-option value="option-3">Chat</syn-option>
    </syn-select>
  `,
};

export const PrefixAndSuffix: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('option', 'prefix-suffix'),
      },
    },
  },
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">
        <syn-icon slot="prefix" name="email"></syn-icon>
        Email
        <syn-icon slot="suffix" name="check_circle_outline"></syn-icon>
      </syn-option>

      <syn-option value="option-2">
        <syn-icon slot="prefix" name="local_phone"></syn-icon>
        Phone
        <syn-icon slot="suffix" name="check_circle_outline"></syn-icon>
      </syn-option>

      <syn-option value="option-3">
        <syn-icon slot="prefix" name="chat_bubble_outline"></syn-icon>
        Chat
        <syn-icon slot="suffix" name="check_circle_outline"></syn-icon>
      </syn-option>
    </syn-select>
  `,
};

// @todo: Disabled until we know what we want to do with selects screenshots
// // Bundled screenshot story
// export const Screenshot: Story = generateScreenshotStory({
//   Default,
//   Disabled,
//   PrefixAndSuffix,
// }, 250);
