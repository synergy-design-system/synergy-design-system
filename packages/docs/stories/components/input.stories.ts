/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { SynButton, SynInput } from '@synergy-design-system/components';
import '../../../components/src/components/input/input';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import {
  generateScreenshotStory, generateStoryDescription, storybookDefaults, storybookTemplate,
} from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-input');
const { generateTemplate } = storybookTemplate('syn-input');

const meta: Meta = {
  args,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('input', 'default'),
      },
    },
  },
  title: 'Components/syn-input',
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
        story: generateStoryDescription('input', 'default'),
      },
    },
  },
  render: (storyArgs: unknown) => generateTemplate({ args: storyArgs }),
} as Story;

export const Labels: Story = {
  name: 'Labels',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('input', 'label'),
      },
    },
  },
  render: () => html`<syn-input label="What is your name?"></syn-input>`,
};

export const HelpText: Story = {
  name: 'Help text',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('input', 'help-text'),
      },
    },
  },
  render: () => html`<syn-input label="Nickname" help-text="What would you like people to call you?"></syn-input>`,
};

export const Placeholders: Story = {
  name: 'Placeholder',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('input', 'placeholder'),
      },
    },
  },
  render: () => html`<syn-input placeholder="Type something"></syn-input>`,
};

export const Clearable: Story = {
  name: 'Clearable',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('input', 'clearable'),
      },
    },
  },
  render: () => html`<syn-input value="Clearable" placeholder="Clearable" clearable></syn-input>`,
};

export const TogglePassword: Story = {
  name: 'Toggle password',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('input', 'password-toggle'),
      },
    },
  },
  render: () => html`<syn-input type="password" placeholder="Password Toggle" password-toggle></syn-input>`,
};

export const ReadonlyInputs: Story = {
  name: 'Readonly inputs',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('input', 'readonly'),
      },
    },
  },
  render: () => html`<syn-input value="Readonly content" readonly></syn-input>`,
};

export const Focus: Story = {
  name: 'Focus',
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('input', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const input = canvasElement.querySelector('syn-input') as SynInput;
    if (input) {
      input.focus();
    }
  },
  render: () => html`
      <form>
        <syn-input help-text="This input is focused." label="Label" placeholder="Insert text here..."></syn-input>
      </form>
    `,
};

export const Disabled: Story = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('input', 'disabled'),
      },
    },
  },
  render: () => html`
  <syn-input placeholder="Disabled" help-text="Help Text" label="Label" disabled>
    <syn-icon name="house" slot="prefix"></syn-icon>
    <syn-icon name="chat" slot="suffix"></syn-icon>
  </syn-input>`,
};

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('input', 'size'),
      },
    },
  },
  render: () => html`
  <syn-input placeholder="Small" size="small"></syn-input><br/>
  <syn-input placeholder="Medium" size="medium"></syn-input><br/>
  <syn-input placeholder="Large" size="large"></syn-input>`,
};

export const Invalid: Story = {
  name: 'Invalid',
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('input', 'invalid'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const form = canvasElement.querySelector('form')!;
      const input = form.querySelector('syn-input') as SynInput;
      const button = form.querySelector('syn-button') as SynButton;

      if (button && input) {
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
      <syn-input help-text="This input is required." label="Label" placeholder="Insert text here..." required></syn-input>
      <syn-button type="submit" variant="filled">Submit</syn-button>
    </form>
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
};

/**
 * The type attribute controls the type of input the browser renders.
 */
export const InputTypes: Story = {
  name: 'Input types',
  render: () => html`
  <syn-input type="email" placeholder="Email"></syn-input><br/>
  <syn-input type="number" placeholder="Number"></syn-input><br/>
  <syn-input type="date" placeholder="Date"></syn-input>`,
};

export const PrefixSuffixIcons: Story = {
  name: 'Prefix and suffix icons',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('input', 'prefix-suffix'),
      },
    },
  },
  render: () => html`
  <syn-input placeholder="Small" size="small">
    <syn-icon name="house" slot="prefix"></syn-icon>
    <syn-icon name="chat" slot="suffix"></syn-icon>
  </syn-input>
  <br/>
  <syn-input placeholder="Medium" size="medium">
    <syn-icon name="house" slot="prefix"></syn-icon>
    <syn-icon name="chat" slot="suffix"></syn-icon>
  </syn-input>
  <br/>
  <syn-input placeholder="Large" size="large">
    <syn-icon name="house" slot="prefix"></syn-icon>
    <syn-icon name="chat" slot="suffix"></syn-icon>
  </syn-input>`,
};

/**
 * Use  to customize the way form controls are drawn.
 * This example uses CSS grid to position the label to the left of the control,
 * but the possible orientations are nearly endless.
 * The same technique works for inputs, textareas, radio groups, and similar form controls.
 */
export const CustomizingLabelPosition: Story = {
  name: 'Customizing label position',
  render: () => html`
  <syn-input class="label-on-left" label="Name" help-text="Enter your name"></syn-input>
  <syn-input class="label-on-left" label="Email" type="email" help-text="Enter your email"></syn-input>
  <syn-textarea class="label-on-left" label="Bio" help-text="Tell us something about yourself"></syn-textarea>

  <style>
    .label-on-left {
      --label-width: 3.75rem;
      --gap-width: 1rem;
    }

    .label-on-left + .label-on-left {
      margin-top: var(--syn-spacing-medium);
    }

    .label-on-left::part(form-control) {
      display: grid;
      grid: auto / var(--label-width) 1fr;
      gap: var(--syn-spacing-3x-small) var(--gap-width);
      align-items: center;
    }

    .label-on-left::part(form-control-label) {
      text-align: right;
    }

    .label-on-left::part(form-control-help-text) {
      grid-column-start: 2;
    }
  </style>`,
};

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory([
  Labels,
  HelpText,
  Placeholders,
  Clearable,
  TogglePassword,
  ReadonlyInputs,
  Disabled,
  Sizes,
  InputTypes,
  PrefixSuffixIcons,
  CustomizingLabelPosition,
], 360);
