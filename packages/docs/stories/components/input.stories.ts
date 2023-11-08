/* eslint-disable */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/input/input';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { waitUntil } from '@open-wc/testing-helpers';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';
import { userEvent } from '@storybook/testing-library';
const { args, argTypes } = storybookDefaults('syn-input');
const { overrideArgs } = storybookHelpers('syn-input');
const { generateTemplate } = storybookTemplate('syn-input');

const generateStoryDescription = (attributeName : string) => {
  return {
    story: (docsTokens?.components?.['input'] as any)?.[attributeName]?.description?.value ?? 'No Description',
      }
};

const meta: Meta = {
  component: 'input',
  args,
  argTypes,
  title: 'Components/syn-input',
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return generateTemplate({ args });
  },
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
} as Story;

export const Labels: Story = {
  render: () => html`<syn-input label="What is your name?"></syn-input>`,
  parameters: {
    docs: {
      description: generateStoryDescription('label'),
    },
  },
};

export const HelpText: Story = {
  render: () => html`<syn-input label="Nickname" help-text="What would you like people to call you?"></syn-input>`,
  parameters: {
    docs: {
      description: generateStoryDescription('help-text'),
    },
  },
};

export const Placeholders: Story = {
  render: () => html`<syn-input placeholder="Type something"></syn-input>`,
  parameters: {
    docs: {
      description: generateStoryDescription('placeholder'),
    },
  },
};

export const Clearable: Story = {
  render: () => html`<syn-input placeholder="Clearable" clearable></syn-input>`,
  parameters: {
    docs: {
      description: generateStoryDescription('clearable'),
    },
  },
};

export const TogglePassword: Story = {
  render: () => html`<syn-input type="password" placeholder="Password Toggle" password-toggle></syn-input>`,
  parameters: {
    docs: {
      description: generateStoryDescription('password-toggle'),
    },
  },
};

export const ReadonlyInputs: Story = {
  render: () => html`<syn-input value="Readonly content" readonly></syn-input>`,
  parameters: {
    docs: {
      description: generateStoryDescription('filled'),
    },
  },
};

export const Disabled: Story = {
  render: () => html`
  <syn-input placeholder="Disabled" help-text="Help Text" label="Label" disabled>
    <syn-icon name="house" slot="prefix"></syn-icon>
    <syn-icon name="chat" slot="suffix">
  </syn-input>`,
  parameters: {
    docs: {
      description: generateStoryDescription('disabled'),
    },
  },
};


export const Sizes: Story = {
  render: () => html`<syn-input placeholder="Small" size="small"></syn-input>
<br />
<syn-input placeholder="Medium" size="medium"></syn-input>
<br />
<syn-input placeholder="Large" size="large"></syn-input>`,
  parameters: {
    docs: {
      description: generateStoryDescription('size'),
    },
  },
};

/**
 * The error state is used to warn the user that the input is invalid.
 */
export const Error: Story = {
  args: {
    label: 'Label',
    placeholder: 'Insert text here...',
    helpText: 'This input is required.'
  },
  parameters: { controls: { exclude: ['required'] } },
  render: (args: any) => {
    return html`
  <form>
   ${generateTemplate({
     args,
     constants: [
       { type: 'attribute', name: 'required', value: true }
     ]
   })}
    <syn-button size="medium" type="submit">Submit</syn-button>
  </form>
  <style>
  form {
    display: flex;
    flex-direction: column;
  }

  syn-button {
    margin-top: 1rem;
    align-self: flex-end;
    padding: 0.5rem 1rem;
    min-width: 5%;
  }
  </style>
`;
},
  play: async ({ canvasElement }: { canvasElement: HTMLUnknownElement }) => {
    const el = canvasElement.querySelector('syn-button');
    await waitUntil(() => el?.shadowRoot?.querySelector('button'));
    await userEvent.type(el!.shadowRoot!.querySelector('button')!, '{return}', { pointerEventsCheck: 0 });
  }
};

/**
 * The type attribute controls the type of input the browser renders.
 */
export const InputTypes: Story = {
  render: () => html`<syn-input type="email" placeholder="Email"></syn-input>
<br />
<syn-input type="number" placeholder="Number"></syn-input>
<br />
<syn-input type="date" placeholder="Date"></syn-input>`,
};

export const PrefixSuffixIcons: Story = {
  render: () => html`<syn-input placeholder="Small" size="small">
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-icon name="chat" slot="suffix"></syn-icon>
</syn-input>
<br />
<syn-input placeholder="Medium" size="medium">
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-icon name="chat" slot="suffix"></syn-icon>
</syn-input>
<br />
<syn-input placeholder="Large" size="large">
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-icon name="chat" slot="suffix"></syn-icon>
</syn-input>`,
  parameters: {
    docs: {
      description: generateStoryDescription('prefix-suffix'),
    },
  },
};

/**
 * Use  to customize the way form controls are drawn. This example uses CSS grid to position the label to the left of the control, but the possible orientations are nearly endless. The same technique works for inputs, textareas, radio groups, and similar form controls.
 */
export const CustomizingLabelPosition: Story = {
  render: () => html`<syn-input class="label-on-left" label="Name" help-text="Enter your name"></syn-input>
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


