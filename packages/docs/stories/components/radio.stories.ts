/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/radio/radio.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import { waitUntil } from '@open-wc/testing-helpers';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-radio');
const { overrideArgs } = storybookHelpers('syn-radio');
const { generateTemplate } = storybookTemplate('syn-radio');

const generateStoryDescription = (attributeName: string) => ({
  story: (docsTokens?.components?.radio as Record<string, any>)?.[attributeName]?.description?.value ?? 'No Description',
});

const meta: Meta = {
  component: 'radio',
  args,
  argTypes,
  title: 'Components/syn-radio',
  parameters: {
    docs: {
      description: {
        component: docsTokens?.components?.radio?.default?.description?.value ?? 'No Description',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => generateTemplate({ args }),
  parameters: {
    docs: {
      description: {
        story: docsTokens?.components?.radio?.default?.description?.value ?? 'No Description',
      },
    },
  },
} as Story;

/**
 * Use the disabled attribute to disable a radio.
 */
export const Disabled: Story = {
  render: () => html`
    <syn-radio value="1" disabled>Option</syn-radio>`,
};

export const Focus: Story = {
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const radio = canvasElement.querySelector('syn-radio') as unknown as HTMLInputElement;
    if (radio) {
      radio.focus();
    }
  },
  render: () => html`
    <syn-radio value="1">Option</syn-radio>`,
};

export const Invalid: Story = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    try {
      const radioGroup = canvasElement.querySelector('syn-radio-group');
      const radio = canvasElement.querySelector('syn-radio');
      const button = canvasElement.querySelector('button');

      await waitUntil(() => radioGroup?.shadowRoot?.querySelector('fieldset'));

      if (button instanceof HTMLButtonElement && radio) {
        await userEvent.click(button);
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`
  <form>
    <syn-radio-group required>
      <syn-radio value="1">Option</syn-radio>
    </syn-radio-group>
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
  </style>`,
};

export const Sizes: Story = {
  render: () => html`
    <syn-radio value="1" size="small">Option 1</syn-radio>
    <syn-radio value="2" size="medium">Option 2</syn-radio>
    <syn-radio value="3" size="large">Option 3</syn-radio>`,
};
