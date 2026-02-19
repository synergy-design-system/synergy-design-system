import '../../../components/src/components/checkbox/checkbox.js';
import '../../../components/src/components/button/button.js';
import { type SynCheckbox } from '@synergy-design-system/components';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { userEvent } from 'storybook/test';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

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
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('1847-5654'),
    docs: {
      description: {
        component: generateStoryDescription('checkbox', 'default'),
      },
    },
  },
  tags: ['Form'],
  title: 'Components/syn-checkbox',
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
        story: generateStoryDescription('checkbox', 'default'),
      },
    },
  },
  render: (args) => generateTemplate({ args }),
};

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

export const HelpText: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox', 'help-text'),
      },
    },
  },
  render: () => html`
    <syn-checkbox help-text="What should the user know about the checkbox?">Label</syn-checkbox>
  `,
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

export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('checkbox', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const synCheckbox = canvasElement.querySelector('syn-checkbox');
    if (synCheckbox) {
      synCheckbox.focus();
    }
  },
  render: () => html`<syn-checkbox>Focused</syn-checkbox>`,
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

export const Readonly: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox', 'readonly'),
      },
    },
  },
  render: () => html`
    <syn-checkbox name="a" value="a" readonly>Read only content</syn-checkbox>
    <syn-checkbox name="b" value="b" readonly indeterminate>Read only content (indet)</syn-checkbox>
    <syn-checkbox name="c" value="c" readonly checked>Read only content (checked)</syn-checkbox>
  `,
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
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-large);">
      <syn-checkbox size="small">Small</syn-checkbox>
      <syn-checkbox size="medium">Medium</syn-checkbox>
      <syn-checkbox size="large">Large</syn-checkbox>
    </div>
  `,
};

export const Invalid: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('checkbox', 'invalid'),
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    try {
      const form = canvasElement.querySelector('form');
      const synCheckbox = form?.querySelector<SynCheckbox>('syn-checkbox');
      const lastCheckbox = form?.querySelector<SynCheckbox>('syn-checkbox:last-of-type');
      const button = form?.querySelector('syn-button');

      if (lastCheckbox) {
        lastCheckbox.setCustomValidity('This checkbox is invalid');
      }

      if (button && synCheckbox) {
        await userEvent.click(button);
        button.click();
        synCheckbox.blur();
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`
    <form class="custom-validity">
      <div class="custom-validity">
        <syn-checkbox required>Invalid</syn-checkbox>
        <syn-checkbox required indeterminate>Invalid</syn-checkbox>
        <syn-checkbox required checked>Invalid</syn-checkbox>
      </div>
      <syn-button type="submit" variant="filled">Submit</syn-button>
    </form>
    <style>
    .custom-validity {
      display: flex;
      flex-direction: column;
      gap: var(--syn-spacing-large);
    }
    syn-button {
      align-self: flex-start;
    }
    </style>
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
      const button = canvasElement.querySelector('syn-button');
      const checkbox = canvasElement.querySelector('syn-checkbox');
      const errorMessage = "Don't forget to check me!";

      if (form && button && checkbox) {
        checkbox.setCustomValidity(errorMessage);

        // make sure to always fire both events:
        // 1. userEvent.click is needed for storybooks play function to register
        // 2. button.click is needed to really click the button
        // userEvent.click works on native elements only
        await userEvent.click(button);
        button.click();
        checkbox.blur();
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

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Checked,
  HelpText,
  Indeterminate,
  Disabled,
  Readonly,
  Sizes,
});
/* eslint-enable sort-keys */
