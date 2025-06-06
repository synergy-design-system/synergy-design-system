/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { SynButton, SynCheckbox } from '@synergy-design-system/components';
import '../../../components/src/components/checkbox/checkbox.js';
import '../../../components/src/components/button/button.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/test';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { argTypes } = storybookDefaults('syn-checkbox');
const { overrideArgs } = storybookHelpers('syn-checkbox');
const { generateTemplate } = storybookTemplate('syn-checkbox');

const meta: Meta = {
  args: overrideArgs([
    { name: 'default', type: 'slot', value: 'Checkbox' },
  ]),
  argTypes,
  component: 'syn-checkbox',
  parameters: {
    design: generateFigmaPluginObject('1847-5654'),
    docs: {
      description: {
        component: generateStoryDescription('checkbox', 'default'),
      },
    },
  },
  title: 'Components/syn-checkbox',
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
        story: generateStoryDescription('checkbox', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox', 'checked'),
      },
    },
  },
  render: () => html`<syn-checkbox checked>Checked</syn-checkbox>`,
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox', 'indeterminate'),
      },
    },
  },
  render: () => html`<syn-checkbox indeterminate>Indeterminate</syn-checkbox>`,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox', 'disabled'),
      },
    },
  },
  render: () => html`<syn-checkbox disabled>Disabled</syn-checkbox>`,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox', 'sizes'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <syn-checkbox size="small">Small</syn-checkbox>
      <syn-checkbox size="medium">Medium</syn-checkbox>
      <syn-checkbox size="large">Large</syn-checkbox>
    </div>
  `,
};

export const CustomValidity: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('checkbox', 'validity'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const form = canvasElement.querySelector('form');
      const button = canvasElement.querySelector('syn-button') as SynButton;
      const checkbox = canvasElement.querySelector('syn-checkbox') as SynCheckbox;
      const errorMessage = "Don't forget to check me!";

      if (form && button && checkbox) {
        checkbox.setCustomValidity(errorMessage);

        // make sure to always fire both events:
        // 1. userEvent.click is needed for storybooks play function to register
        // 2. button.click is needed to really click the button
        // userEvent.click works on native elements only
        await userEvent.click(button);
        button.click();
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`
    <form class="custom-validity">
      <syn-checkbox name="checked" value="on">Check me</syn-checkbox>
      <syn-button type="submit" variant="filled">Submit</syn-button>
    </form>
    <style>
    .custom-validity {
      display: inline-flex;
      flex-direction: column;
      gap: 1rem;
    }
    </style>

    <script type="module">
    const form = document.querySelector('.custom-validity');
    const checkbox = form.querySelector('syn-checkbox');
    const errorMessage = "Don't forget to check me!";

    // Update validity on change
    checkbox.addEventListener('syn-change', () => {
      checkbox.setCustomValidity(checkbox.checked ? '' : errorMessage);
    });

    // Handle submit
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
    </script>
  `,
};

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Checked,
  Indeterminate,
  Disabled,
  Sizes,
});
