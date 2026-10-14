import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/date-picker/date-picker.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-date-picker');
const { overrideArgs } = storybookHelpers('syn-date-picker');
const { generateTemplate } = storybookTemplate('syn-date-picker');

const meta: Meta = {
  args: overrideArgs([], defaultArgs),
  argTypes,
  component: 'syn-date-picker',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    docs: {
      description: {
        component: generateStoryDescription('date-picker', 'default'),
      },
    },
  },
  tags: ['Forms'],
  title: 'Components/syn-date-picker',
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
        story: generateStoryDescription('date-picker', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const Demo: Story = {
  render: () => html`
    <form name="something">
      <syn-date-picker
        clearable
        name="something"
        value="2024-06-06"
        required
      >
        <span slot="label">Wurstbrot</span>
        <span slot="prefix">Prefix</span>
        <span slot="suffix">Sufix</span>
        <span slot="help-text">This is some help text.</span>
      </syn-date-picker>

      <syn-date-picker
        clearable
        name="something-else"
        mode="multiple"
        label="Multiple"
        help-text="Please select multiple dates"
      >
      </syn-date-picker>

      <syn-date-picker
        clearable
        name="something-even-elser"
        mode="range"
        label="Range"
        help-text="Please select a date range"
      >
      </syn-date-picker>
      <button type="submit">Submit</button>
    </form>

    <script>
      document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        console.log('Form submitted');

        const fd = new FormData(event.target);
        for (const [key, value] of fd.entries()) {
          console.log(key, value);
        }
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
}, 350);
/* eslint-enable sort-keys */
