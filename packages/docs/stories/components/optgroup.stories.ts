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

const autoOpen = html`
  <script>
  customElements.whenDefined('syn-select').then(() => {
    document.querySelector('syn-select').show();
  });
  </script>
`;

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
  render: (args: unknown) => html`
    <syn-select>
      ${generateTemplate({ args })}
    </syn-select>
    ${autoOpen}
  `,
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
    <syn-select>
      <syn-optgroup disabled>
        <span slot="label">Section 1</span>
        <syn-option value="1">Option 1</syn-option>
        <syn-option value="2">Option 2</syn-option>
      </syn-optgroup>
    </syn-select>
    ${autoOpen}
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
    <syn-select>
      <syn-optgroup label="Section 1">
        <syn-option value="1">Option 1</syn-option>
      </syn-optgroup>

      <syn-optgroup>
        <span slot="label">Section 1</span>
        <syn-option value="1">Option 1</syn-option>
      </syn-optgroup>

      <syn-optgroup>
        <syn-icon name="settings" slot="prefix"></syn-icon>
        <syn-icon name="refresh" slot="suffix"></syn-icon>
        <span slot="label">Section 1</span>
        <syn-option value="1">Option 1</syn-option>
      </syn-optgroup>
    </syn-select>
    ${autoOpen}
  `,
};

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Disabled,
  PrefixAndSuffix,
}, 280);
