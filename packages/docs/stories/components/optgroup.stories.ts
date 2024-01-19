/* eslint-disable */

/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/optgroup/optgroup';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
  generateStoryDescription,
} from '../../src/helpers/component.js';
const { args: defaultArgs, argTypes } = storybookDefaults('syn-optgroup');
const { overrideArgs } = storybookHelpers('syn-optgroup');
const { generateTemplate } = storybookTemplate('syn-optgroup');

const meta: Meta = {
  component: 'syn-optgroup',
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: `<syn-option value="1">Option 1</syn-option>`,
    },
    {
      name: 'label',
      type: 'attribute',
      value: 'Section 1',
    },
  ], defaultArgs),
  argTypes,
  title: 'Components/syn-optgroup',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('optgroup', 'default'),
      },
      story: {
        height: '250px',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

/**
 * Use <syn-optgroup> to group listbox items visually.
 */
export const Default = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('optgroup', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

/**
 * Use the disabled attribute in the <syn-optgroup> to disable the Section and prevent it from being selected.
 */
export const Disabled = {
  name: 'Disabled',
  render: () => html`
    <syn-optgroup disabled>
      <em slot="label">Section 1</em>
      <syn-option value="1">Option 1</syn-option>
    </syn-optgroup>
  `,
};

export const PrefixAndSuffixIcons = {
  name: 'Prefix and Suffix Icons',
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
export const Screenshot: Story = generateScreenshotStory([
  Disabled,
  PrefixAndSuffixIcons,
], 280);
