/* eslint-disable import/no-relative-packages */

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
  component: 'input',
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

/** The focus attribute provides feedback to the users,
 * informing them that the input component is ready for use.  */
export const Focus: Story = {
  args: {
    helpText: 'This input is focused.',
    label: 'Label',
    placeholder: 'Insert text here...',
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const input = canvasElement.querySelector('syn-input') as HTMLInputElement;
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
    <syn-icon name="chat" slot="suffix">
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

/**
 * The invalid state is used to warn the user that the input is invalid.
 */
export const Invalid: Story = {
  args: {
    helpText: 'This input is required.',
    label: 'Label',
    placeholder: 'Insert text here...',
  },
  parameters: {
    controls: { exclude: ['required'] },
  },
  play: async ({ canvasElement }) => {
    try {
      const input = canvasElement.querySelector('syn-input');
      const button = canvasElement.querySelector('button');

      await waitUntil(() => input?.shadowRoot?.querySelector('input'));

      if (button) {
        await userEvent.click(button);
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: (args: any) => html`
  <form>
   ${generateTemplate({
    args,
    constants: [
      { type: 'attribute', name: 'required', value: true },
    ],
  })}
    <button size="medium" type="submit">Submit</button>
  </form>
  <style>
  form {
    display: flex;
    flex-direction: column;
  }

  button {
    margin-top: 1rem;
    align-self: flex-end;
    padding: 0.5rem 1rem;
    min-width: 5%;
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
