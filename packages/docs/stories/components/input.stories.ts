/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { SynButton, SynInput } from '@synergy-design-system/components';
import '../../../components/src/components/input/input';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import { waitUntil } from '@open-wc/testing-helpers';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-input');
const { overrideArgs } = storybookHelpers('syn-input');
const { generateTemplate } = storybookTemplate('syn-input');

const generateStoryDescription = (attributeName: string) => ({
  story: (docsTokens?.components?.input as any)?.[attributeName]?.description?.value ?? 'No Description',
});

const meta: Meta = {
  args,
  argTypes,
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  title: 'Components/syn-input',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  render: (args: any) => generateTemplate({ args }),
} as Story;

export const Labels: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('label'),
    },
  },
  render: () => html`<syn-input label="What is your name?"></syn-input>`,
};

export const HelpText: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('help-text'),
    },
  },
  render: () => html`<syn-input label="Nickname" help-text="What would you like people to call you?"></syn-input>`,
};

export const Placeholders: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('placeholder'),
    },
  },
  render: () => html`<syn-input placeholder="Type something"></syn-input>`,
};

export const Clearable: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('clearable'),
    },
  },
  render: () => html`<syn-input placeholder="Clearable" clearable></syn-input>`,
};

export const TogglePassword: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('password-toggle'),
    },
  },
  render: () => html`<syn-input type="password" placeholder="Password Toggle" password-toggle></syn-input>`,
};

export const ReadonlyInputs: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('filled'),
    },
  },
  render: () => html`<syn-input value="Readonly content" readonly></syn-input>`,
};

export const Focus: Story = {
  args: {
    helpText: 'This input is focused.',
    label: 'Label',
    placeholder: 'Insert text here...',
  },
  parameters: {
    docs: {
      description: generateStoryDescription('focus'),
    },
  },
  play: ({ canvasElement }) => {
    const input = canvasElement.querySelector('syn-input') as SynInput;
    if (input) {
      input.focus();
    }
  },
  render: (args: any) => html`
      <form>
        ${generateTemplate({
    args,
  })}
      </form>
    `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('disabled'),
    },
  },
  render: () => html`
  <syn-input placeholder="Disabled" help-text="Help Text" label="Label" disabled>
    <syn-icon name="house" slot="prefix"></syn-icon>
    <syn-icon name="chat" slot="suffix"></syn-icon>
  </syn-input>`,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('size'),
    },
  },
  render: () => html`
  <syn-input placeholder="Small" size="small"></syn-input><br/>
  <syn-input placeholder="Medium" size="medium"></syn-input><br/>
  <syn-input placeholder="Large" size="large"></syn-input>`,
};

export const Invalid: Story = {
  args: {
    helpText: 'This input is required.',
    label: 'Label',
    placeholder: 'Insert text here...',
  },
  parameters: {
    controls: { exclude: ['required'] },
    docs: {
      description: generateStoryDescription('invalid'),
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const form = canvasElement.querySelector('form');
      const input = form.querySelector('syn-input') as SynInput;
      const button = form.querySelector('syn-button') as SynButton;

      if (button && input) {
        await userEvent.click(button);
        button.click();
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: (args) => html`
    <form class="custom-validity">
  ${generateTemplate({
    args,
    constants: [{
      name: 'required',
      type: 'attribute',
      value: true,
    }],
  })}
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
  render: () => html`
  <syn-input type="email" placeholder="Email"></syn-input><br/>
  <syn-input type="number" placeholder="Number"></syn-input><br/>
  <syn-input type="date" placeholder="Date"></syn-input>`,
};

export const PrefixSuffixIcons: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('prefix-suffix'),
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
