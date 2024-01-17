/* eslint-disable */

/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/option/option';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { storybookDefaults, storybookHelpers, storybookTemplate, generateStoryDescription } from '../../src/helpers/component.js';
const { args: defaultArgs, argTypes } = storybookDefaults('syn-option');
const { overrideArgs } = storybookHelpers('syn-option');
const { generateTemplate } = storybookTemplate('syn-option');

const meta: Meta = {
  component: 'syn-option',
  args: overrideArgs({ name: 'default', type: 'slot', value: 'Option' }, defaultArgs),
  argTypes,
  title: 'Components/syn-option',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('option', 'default'),
      },
    }
  }
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return generateTemplate({ args });
  },
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('option', 'default'),
      }
    }
  }
} as Story;


/**
 * Use the disabled attribute to disable an option and prevent it from being selected.
 */
export const Disabled: Story = {
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2" disabled>Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

/**
 * Add icons to the start and end of menu items using the prefix and suffix slots.
 */
export const PrefixSuffix: Story = {
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">
        <syn-icon slot="prefix" name="alternate_email"></syn-icon>
        Email
        <syn-icon slot="suffix" name="check_circle"></syn-icon>
      </syn-option>

      <syn-option value="option-2">
        <syn-icon slot="prefix" name="contact_phone"></syn-icon>
        Phone
        <syn-icon slot="suffix" name="check_circle"></syn-icon>
      </syn-option>

      <syn-option value="option-3">
        <syn-icon slot="prefix" name="chat_bubble"></syn-icon>
        Chat
        <syn-icon slot="suffix" name="check_circle"></syn-icon>
      </syn-option>
    </syn-select>
  `,
};
