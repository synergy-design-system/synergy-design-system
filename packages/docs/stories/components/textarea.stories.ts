/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/textarea/textarea';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import { waitUntil } from '@open-wc/testing-helpers';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-textarea');
const { overrideArgs } = storybookHelpers('syn-textarea');
const { generateTemplate } = storybookTemplate('syn-textarea');

const generateStoryDescription = (attributeName: string) => ({
  story: (docsTokens?.components?.textarea as any)?.[attributeName]?.description?.value ?? 'No Description',
});

const meta: Meta = {
  component: 'textarea',
  args,
  argTypes,
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  title: 'Components/syn-textarea',
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
      description: generateStoryDescription('labels'),
    },
  },
  render: () => html`<syn-textarea label="Comments"></syn-textarea>`,
};

export const HelpText: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('help-text'),
    },
  },
  render: () => html`<syn-textarea label="Feedback" help-text="Please tell us what you think."> </syn-textarea>`,
};

export const Rows: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('rows'),
    },
  },
  render: () => html`
    <syn-textarea rows="1" placeholder="One row shown"></syn-textarea>
    <syn-textarea rows="5" placeholder="Five rows shown"></syn-textarea>
    <syn-textarea rows="3" placeholder="Three rows shown"></syn-textarea>
    <style>
    syn-textarea {
      margin-bottom: 1rem;
    }
    </style>`,
};

export const Placeholders: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('placeholder'),
    },
  },
  render: () => html`<syn-textarea placeholder="Type something"></syn-textarea>`,
};

export const ReadonlyTextareas: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('readonly'),
    },
  },
  render: () => html`<syn-textarea value="Read-only content"  readonly></syn-textarea>`,
};

/** The focus attribute provides feedback to the users,
 * informing them that the textarea component is ready for use.  */
export const Focus: Story = {
  args: {
    placeholder: 'This is in focus',
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const textarea = canvasElement.querySelector('syn-textarea') as HTMLInputElement;
    if (textarea) {
      textarea.focus();
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
  render: () => html`<syn-textarea placeholder="Textarea" help-text="Please tell us what you think." label="Label" disabled></syn-textarea>`,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('size'),
    },
  },
  render: () => html`
  <syn-textarea placeholder="Small" size="small"></syn-textarea><br/>
  <syn-textarea placeholder="Medium" size="medium"></syn-textarea><br/>
  <syn-textarea placeholder="Large" size="large"></syn-textarea>`,
};

/**
 * The invalid state is used to warn the user that the input is invalid.
 */
export const Invalid: Story = {
  args: {
    helpText: 'This textarea is required.',
    placeholder: 'Type something',
  },
  parameters: { controls: { exclude: ['required'] } },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    try {
      const textarea = canvasElement.querySelector('syn-textarea');
      const button = canvasElement.querySelector('button');

      await waitUntil(() => textarea?.shadowRoot?.querySelector('textarea'));

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

export const PreventResizing: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('resize'),
    },
  },
  render: () => html`<syn-textarea resize="none"></syn-textarea>`,
};

export const ExpandWithContent: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('resize-auto'),
    },
  },
  render: () => html`<syn-textarea resize="auto" placeholder="Type something"></syn-textarea>`,
};
