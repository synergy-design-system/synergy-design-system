/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/optgroup/optgroup';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { openSelect } from '../../src/helpers/select.js';
import {
  generatePageDescription,
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
        component: generatePageDescription('optiongroup', '5619-21837'),
      },
      story: {
        height: '400px',
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
    <syn-select>
      ${generateTemplate({ args })}
      <syn-optgroup label="Section 2">
        <syn-option value="4">Option 4</syn-option>
      </syn-optgroup>
    </syn-select>
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
        <syn-option value="1">Option</syn-option>
        <syn-option value="2">Option</syn-option>
        <syn-option value="3">Option</syn-option>
      </syn-optgroup>
    </syn-select>
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
 * !! Please make sure to always update this story when adding new features to `<syn-optgroup>`!
 */
const ScreenshotStory: Story = {
  render: () => html`
    <syn-select>
      <!-- Default -->
      <syn-optgroup label="Section 1">
        <syn-option value="1">Option 1</syn-option>
        <syn-option value="2">Option 2</syn-option>
        <syn-option value="3">Option 3</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Section 2">
        <syn-option value="4">Option 4</syn-option>
      </syn-optgroup>
      <!-- /Default -->

      <!-- Disabled -->
      <syn-optgroup disabled>
        <span slot="label">Section 3 (Disabled)</span>
        <syn-option value="1">Option</syn-option>
        <syn-option value="2">Option</syn-option>
        <syn-option value="3">Option</syn-option>
      </syn-optgroup>
      <!-- /Disabled -->
      
      <!-- prefix and suffix -->
      <syn-optgroup label="Section 4 (With Prefix and Suffix Icons)">
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
      <!-- /prefix and suffix -->
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
