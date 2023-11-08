/* eslint-disable */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/textarea/textarea';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';
const { args, argTypes } = storybookDefaults('syn-textarea');
const { overrideArgs } = storybookHelpers('syn-textarea');
const { generateTemplate } = storybookTemplate('syn-textarea');

const generateStoryDescription = (attributeName: string) => {
  return {
    story: (docsTokens?.components?.['textarea'] as any)?.[attributeName]?.description?.value ?? 'No Description',
  }
};

const meta: Meta = {
  component: 'textarea',
  args,
  argTypes,
  title: 'Components/syn-textarea',
  parameters: {
    docs: {
      description: {
        component: docsTokens?.components?.['textarea']?.default?.description?.value ?? 'No Description',
      },
    }
  }
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return generateTemplate({ args });
  },
  parameters: {
    docs: {
      description: {
        story: docsTokens?.components?.['textarea']?.default?.description?.value ?? 'No Description',
      }
    }
  }
} as Story;


/**
 * Use the label attribute to give the textarea an accessible label. For labels that contain HTML, use the label slot instead.
 */
export const Labels: Story = {
  render: () => html`<syn-textarea label="Comments"></syn-textarea>`,
};

/**
 * Add descriptive help text to a textarea with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.
 */
export const HelpText: Story = {
  render: () => html`<syn-textarea label="Feedback" help-text="Please tell us what you think."> </syn-textarea>`,
};

/**
 * Use the rows attribute to change the number of text rows that get shown.
 */
export const Rows: Story = {
  render: () => html`<syn-textarea rows="2"></syn-textarea>`,
};

/**
 * Use the placeholder attribute to add a placeholder.
 */
export const Placeholders: Story = {
  render: () => html`<syn-textarea placeholder="Type something"></syn-textarea>`,
};

/**
 * Add the readonly attribute to draw a readonly textarea.
 */
export const ReadonlyTextareas: Story = {
  render: () => html`<syn-textarea value="Readonly content" help-text="Please tell us what you think." label="Label" readonly></syn-textarea>`,
};

/**
 * Use the disabled attribute to disable a textarea.
 */
export const Disabled: Story = {
  render: () => html`<syn-textarea placeholder="Textarea" help-text="Please tell us what you think." label="Label" disabled></syn-textarea>`,
};

/**
 * Use the size attribute to change a textarea's size.
 */
export const Sizes: Story = {
  render: () => html`<syn-textarea placeholder="Small" size="small" help-text="Please tell us what you think." label="Label"></syn-textarea>
<br/>
<syn-textarea placeholder="Medium" size="medium" help-text="Please tell us what you think." label="Label"></syn-textarea>
<br/>
<syn-textarea placeholder="Large" size="large" help-text="Please tell us what you think." label="Label"></syn-textarea>`,
};

export const Error: Story = {
  render: () => html` 
  <form @submit="${handleSubmit}">
    <syn-textarea required placeholder="Please insert text here..." size="medium" help-text="Help Error Text" label="Label"></syn-textarea>
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

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  const inputField = document.getElementById('inputField');

  if (!inputField?.value.trim()) {
    inputField?.setAttribute('help-text', 'Input is required');
  } else {
    inputField.setAttribute('help-text', '');
  }
}

/**
 * By default, textareas can be resized vertically by the user. To prevent resizing, set the resize attribute to none.
 */
export const PreventResizing: Story = {
  render: () => html`<syn-textarea resize="none"></syn-textarea>`,
};

/**
 * Textareas will automatically resize to expand to fit their content when resize is set to auto.
 */
export const ExpandWithContent: Story = {
  render: () => html`<syn-textarea resize="auto"></syn-textarea>`,
};
