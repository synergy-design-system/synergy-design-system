/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/optgroup/optgroup';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  // generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-optgroup');
const { overrideArgs } = storybookHelpers('syn-optgroup');
const { generateTemplate } = storybookTemplate('syn-optgroup');

const afterRender = (selector: string) => html`
  <script>
      Promise.all([
      customElements.whenDefined('syn-select'),
      customElements.whenDefined('syn-optgroup'),
      customElements.whenDefined('syn-option')
    ]).then(async () => {
      const elm = document.querySelector('${selector}');
        await elm?.show();
    });
  </script>
`;

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-option value="1">Option 1</syn-option>
        <syn-option value="2">Option 2</syn-option>
        <syn-option value="3">Option 3</syn-option>
      `,
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
        height: '400px',
        inline: false,
      },
    },
  },
  title: 'Components/syn-optgroup',
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
        story: generateStoryDescription('optiongroup', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
    <syn-select id="optgroup-default">
      ${generateTemplate({ args })}
      <syn-optgroup label="Section 2">
        <syn-option value="4">Option 4</syn-option>
      </syn-optgroup>
    </syn-select>
    ${afterRender('#optgroup-default')}
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
    <syn-select id="optgroup-disabled">
      <syn-optgroup disabled>
        <span slot="label">Section 1</span>
        <syn-option value="1">Option</syn-option>
        <syn-option value="2">Option</syn-option>
        <syn-option value="3">Option</syn-option>
      </syn-optgroup>
    </syn-select>
    ${afterRender('#optgroup-disabled')}
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
    <syn-select id="optgroup-prefix-suffix">
      <syn-optgroup label="Contact Support">
        <syn-icon name="contact_support" slot="prefix"></syn-icon>
        <syn-icon name="check_circle_outline" slot="suffix"></syn-icon>
        
        <syn-option value="1">
          <syn-icon name="mail" slot="prefix"></syn-icon>
          <syn-icon name="check_circle_outline" slot="suffix"></syn-icon>
          E-Mail
        </syn-option>

        <syn-option value="2">
          <syn-icon name="phone" slot="prefix"></syn-icon>
          <syn-icon name="check_circle_outline" slot="suffix"></syn-icon>  
          Phone
        </syn-option>
        
        <syn-option value="3">
          <syn-icon name="chat_bubble_outline" slot="prefix"></syn-icon>
          <syn-icon name="check_circle_outline" slot="suffix"></syn-icon>  
          Chat
        </syn-option>
      </syn-optgroup>
    </syn-select>
    ${afterRender('#optgroup-prefix-suffix')}
  `,
};

// @todo: Disabled until we know what we want to do with selects screenshots
// // Bundled screenshot story
// export const Screenshot: Story = generateScreenshotStory({
//   Default,
//   Disabled,
//   PrefixAndSuffix,
// }, {
//   afterRender: afterRender('syn-select'),
//   heightPx: 600,
// });
