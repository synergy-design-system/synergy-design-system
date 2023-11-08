/* eslint-disable */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/textarea/textarea';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { waitUntil } from '@open-wc/testing-helpers';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';
import { userEvent } from '@storybook/testing-library';
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
  render: () => html`<syn-textarea label="Comments"></syn-textarea>`,
  parameters: {
    docs: {
      description: generateStoryDescription('labels'),
    },
  },
};

export const HelpText: Story = {
  render: () => html`<syn-textarea label="Feedback" help-text="Please tell us what you think."> </syn-textarea>`,
  parameters: {
    docs: {
      description: generateStoryDescription('help-text'),
    },
  },
};

export const Rows: Story = {
  render: () => html`<syn-textarea rows="2"></syn-textarea>`,
  parameters: {
    docs: {
      description: generateStoryDescription('rows'),
    },
  },
};

export const Placeholders: Story = {
  render: () => html`<syn-textarea placeholder="Type something"></syn-textarea>`,
  parameters: {
    docs: {
      description: generateStoryDescription('placeholder'),
    },
  },
};

export const ReadonlyTextareas: Story = {
  render: () => html`<syn-textarea value="Readonly content" help-text="Please tell us what you think." label="Label" readonly></syn-textarea>`,
  parameters: {
    docs: {
      description: generateStoryDescription('readonly'),
    },
  },
};

export const Disabled: Story = {
  render: () => html`<syn-textarea placeholder="Textarea" help-text="Please tell us what you think." label="Label" disabled></syn-textarea>`,
  parameters: {
    docs: {
      description: generateStoryDescription('disabled'),
    },
  },
};

export const Sizes: Story = {
  render: () => html`<syn-textarea placeholder="Small" size="small" help-text="Please tell us what you think." label="Label"></syn-textarea>
<br/>
<syn-textarea placeholder="Medium" size="medium" help-text="Please tell us what you think." label="Label"></syn-textarea>
<br/>
<syn-textarea placeholder="Large" size="large" help-text="Please tell us what you think." label="Label"></syn-textarea>`,
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
    helpText: 'This textarea is required.'
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
`;
},
  play: async ({ canvasElement }: { canvasElement: HTMLUnknownElement }) => {
    const el = canvasElement.querySelector('syn-button');
    await waitUntil(() => el?.shadowRoot?.querySelector('button'));
    await userEvent.type(el!.shadowRoot!.querySelector('button')!, '{return}', { pointerEventsCheck: 0 });
  }
};

export const PreventResizing: Story = {
  render: () => html`<syn-textarea resize="none"></syn-textarea>`,
  parameters: {
    docs: {
      description: generateStoryDescription('resize'),
    },
  },
};

export const ExpandWithContent: Story = {
  render: () => html`<syn-textarea resize="auto"></syn-textarea>`,
  parameters: {
    docs: {
      description: generateStoryDescription('resize-auto'),
    },
  },
};
