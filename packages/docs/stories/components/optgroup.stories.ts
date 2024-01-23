/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/optgroup/optgroup';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-optgroup');
const { overrideArgs } = storybookHelpers('syn-optgroup');
const { generateTemplate } = storybookTemplate('syn-optgroup');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: '<syn-option value="1">Option 1</syn-option>',
    },
    {
      name: 'label',
      type: 'attribute',
      value: 'Section 1',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-optgroup',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('optiongroup', 'default'),
      },
      story: {
        height: '250px',
      },
    },
  },
  title: 'Components/syn-optgroup',
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
        story: generateStoryDescription('optiongroup', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Disabled = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('optiongroup', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-optgroup disabled>
      <em slot="label">Section 1</em>
      <syn-option value="1">Option 1</syn-option>
    </syn-optgroup>
  `,
};

export const PrefixAndSuffix = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('optiongroup', 'prefix-suffix'),
      },
    },
  },
  render: () => html`
    <syn-optgroup label="Section 1">
      <syn-icon name="settings" slot="prefix"></syn-icon>
      <syn-option value="1">Option 1</syn-option>
    </syn-optgroup>

    <syn-optgroup>
      <syn-icon name="refresh" slot="suffix"></syn-icon>
      <em slot="label">Section 1</em>
      <syn-option value="1">Option 1</syn-option>
    </syn-optgroup>

    <syn-optgroup>
      <syn-icon name="settings" slot="prefix"></syn-icon>
      <syn-icon name="refresh" slot="suffix"></syn-icon>
      <em slot="label">Section 1</em>
      <syn-option value="1">Option 1</syn-option>
    </syn-optgroup>
  `,
};

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory({
  Disabled,
  PrefixAndSuffix,
}, 280);
