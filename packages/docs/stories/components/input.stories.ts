/* eslint-disable */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/input/input';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';
const { args, argTypes } = storybookDefaults('syn-input');
const { overrideArgs } = storybookHelpers('syn-input');
const { generateTemplate } = storybookTemplate('syn-input');

const generateStoryParameters = (attributeName : string) => {
  const description = (docsTokens?.components?.['input'] as any)?.[attributeName]?.description?.value ?? 'No Description';
  return {
    docs: {
      description: {
        story: description,
      }
    }
  };
};

const meta: Meta = {
  component: 'input',
  args,
  argTypes,
  title: 'Components/syn-input',
  parameters: generateStoryParameters('default')
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return generateTemplate({ args });
  },
  parameters: generateStoryParameters('default')
} as Story;

export const Labels: Story = {
  render: () => html`<syn-input label="What is your name?"></syn-input>`,
  parameters: generateStoryParameters('label')
};

export const HelpText: Story = {
  render: () => html`<syn-input label="Nickname" help-text="What would you like people to call you?"></syn-input>`,
  parameters: generateStoryParameters('help-text')
};

export const Placeholders: Story = {
  render: () => html`<syn-input placeholder="Type something"></syn-input>`,
  parameters: generateStoryParameters('placeholder')
};

export const Clearable: Story = {
  render: () => html`<syn-input placeholder="Clearable" clearable></syn-input>`,
  parameters: generateStoryParameters('clearable')
};

export const TogglePassword: Story = {
  render: () => html`<syn-input type="password" placeholder="Password Toggle" password-toggle></syn-input>`,
  parameters: generateStoryParameters('password-toggle')
};

export const ReadonlyInputs: Story = {
  render: () => html`<syn-input value="Readonly content" readonly></syn-input>`,
  parameters: generateStoryParameters('filled')
};

export const Disabled: Story = {
  render: () => html`<syn-input placeholder="Disabled" disabled></syn-input>`,
  parameters: generateStoryParameters('disabled')
};

/**
 * Use the size attribute to change an input's size.
 */
export const Sizes: Story = {
  render: () => html`<syn-input placeholder="Small" size="small"></syn-input>
<br />
<syn-input placeholder="Medium" size="medium"></syn-input>
<br />
<syn-input placeholder="Large" size="large"></syn-input>`,
  parameters: generateStoryParameters('size')
};

/**
 * The error state is used to warn the user that the input is invalid.
 */
export const Error: Story = {
  render: () => html`<form>
  <syn-input required placeholder="Small" size="small" help-text="Help Error Text"></syn-input>
<button type="submit">Submit</button>
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
  parameters: generateStoryParameters('prefix-suffix')
};

/**
 * Use  to customize the way form controls are drawn. This example uses CSS grid to position the label to the left of the control, but the possible orientations are nearly endless. The same technique works for inputs, textareas, radio groups, and similar form controls.
 */
export const CustomizingLabelPosition: Story = {
  render: () => html`<syn-input class="label-on-left" label="Name" help-text="Enter your name"></syn-input>
<syn-input class="label-on-left" label="Email" type="email" help-text="Enter your email"></syn-input>
<syn-input class="label-on-left" label="Bio" help-text="Tell us something about yourself"></syn-input>

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
