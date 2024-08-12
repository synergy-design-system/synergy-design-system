/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/file/file.js';
import type { SynFile } from '@synergy-design-system/components';
import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { userEvent } from '@storybook/test';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-file');
const { overrideArgs } = storybookHelpers('syn-file');
const { generateTemplate } = storybookTemplate('syn-file');

const meta: Meta = {
  args: overrideArgs([
  ], defaultArgs),
  argTypes,
  component: 'syn-file',
  parameters: {
    design: generateFigmaPluginObject('21709-49135'),
    docs: {
      description: {
        component: generateStoryDescription('file', 'default'),
      },
    },
  },
  title: 'Components/syn-file',
};
export default meta;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('file', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Label: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'label'),
      },
    },
  },
  render: () => html`
    <syn-file label="This is a label"></syn-file>
  `,
} as Story;

export const HelpText: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'help-text'),
      },
    },
  },
  render: () => html`
    <syn-file
      help-text="This is a help text."
      label="This is a label"
    ></syn-file>
  `,
} as Story;

export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'multiple'),
      },
    },
  },
  render: () => html`
    <syn-file
      label="Multiple file input"
      multiple
    ></syn-file>
  `,
} as Story;

export const HideValue: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'hide-value'),
      },
    },
  },
  render: () => html`
    <syn-file
      hide-value
      label="This is a label"
    ></syn-file>
  `,
} as Story;

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'disabled'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <syn-file
        disabled
        label="This is a label"
      ></syn-file>
      <syn-file
        disabled
        droparea
        label="This is a label"
      ></syn-file>
    </div>
`,
} as Story;

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'sizes'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-large);">
      <syn-file size="small" label="Small"></syn-file>
      <syn-file size="medium" label="Medium"></syn-file>
      <syn-file size="large" label="Large"></syn-file>
    </div>
  `,
} as Story;

export const Droparea: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'droparea'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-large);">
      <syn-file
        accept="text/plain,image/*"
        droparea
        help-text="This is a help text"
        label="Small"
        multiple
        size="small"
      ></syn-file>
      <syn-file
        accept="text/plain,image/*"
        droparea
        help-text="This is a help text"
        label="Medium"
        multiple
        size="medium"
      ></syn-file>
      <syn-file
        accept="text/plain,image/*"
        droparea
        help-text="This is a help text"
        label="Large"
        multiple
        size="large"
      ></syn-file>
    </div>
  `,
} as Story;

export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('file', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const input = canvasElement.querySelector('syn-file') as SynFile;
    if (input) {
      input.focus();
    }
  },
  render: () => html`
    <syn-file label="This is a label" help-text="This is a help text" droparea></syn-file>
  `,
} as Story;

export const Invalid: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('file', 'focus'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const form = canvasElement.querySelector('form')!;
      const files = form.querySelectorAll('syn-file');
      const button = form.querySelector('syn-button')!;

      if (button && files) {
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
      <syn-file
        class="syn-file-invalid"
        droparea
        help-text="This is an error text."
        label="This is a label"
      ></syn-file>
      <syn-button type="submit" variant="filled">Submit</syn-button>
    </form>
    <script type="module">
      const file = document.querySelector('.syn-file-invalid');
      file.setCustomValidity('This is an error text');
      
      const form = document.querySelector('form');
       // Handle submit
      form.addEventListener('submit', event => {
        event.preventDefault();
      });
    </script>
    <style>
      .custom-validity {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      syn-button {
        align-self: flex-start;
      }
    </style>
  `,
} as Story;

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Label,
  HelpText,
  Multiple,
  HideValue,
  Disabled,
  Sizes,
  Droparea,
}, 350);
/* eslint-enable sort-keys */
