/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/option/option.js';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/icon/icon.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { openSelect } from '../../src/helpers/select.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

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
    design: generateFigmaPluginObject('5548-17028'),
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
      <syn-option value="Option_2">Option 2</syn-option>
      <syn-option value="Option_3">Option 3</syn-option>
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

/**
 * This screenshot story shows all different variants from above.
 * The reason for this is that we are unfortunately only able to
 * automatically open ONE select tag per default.
 *
 * This also happens when using iframe isolation, so we have opted to
 * go for one story that manually holds all information of the stories
 * above.
 *
 * !! Please make sure to always update this story when adding new features to `<syn-option>`!
 */
const ScreenshotStory: Story = {
  render: () => html`
    <syn-select>
      <!-- Default -->
      <syn-option value="Option_1">Option 1</syn-option>
      <syn-option value="Option_2">Option 2</syn-option>
      <syn-option value="Option_3">Option 3</syn-option>
      <!-- /Default -->

      <!-- Disabled -->
      <syn-option value="Option_4" disabled>Option 4 (Disabled)</syn-option>
      <!-- /Disabled -->

      <!-- Prefix and Suffix -->
      <syn-option value="Option-5">
        <syn-icon slot="prefix" name="email"></syn-icon>
        Email
        <syn-icon slot="suffix" name="check_circle_outline"></syn-icon>
      </syn-option>

      <syn-option value="Option-6">
        <syn-icon slot="prefix" name="local_phone"></syn-icon>
        Phone
        <syn-icon slot="suffix" name="check_circle_outline"></syn-icon>
      </syn-option>

      <syn-option value="Option-7">
        <syn-icon slot="prefix" name="chat_bubble_outline"></syn-icon>
        Chat
        <syn-icon slot="suffix" name="check_circle_outline"></syn-icon>
      </syn-option>
      <!-- /Prefix and Suffix -->

    </syn-select>
  `,
};

// Bundled screenshot story
// Note we are not able to screenshot more than the Screenshot story
// because of the reasons outlined above!
export const Screenshot: Story = generateScreenshotStory({
  ScreenshotStory,
}, {
  afterRender: openSelect('syn-select'),
  heightPx: 400,
});
