/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/radio/radio.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import { waitUntil } from '@open-wc/testing-helpers';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults } from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-radio');

const generateStoryDescription = (attributeName: string) => ({
  story: (docsTokens?.components?.radio as Record<string, unknown>)?.[attributeName]?.description?.value ?? 'No Description',
});

const meta: Meta = {
  component: 'radio',
  args,
  argTypes,
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  title: 'Components/syn-radio',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  render: () => html`
  <syn-radio value="1" size="medium">Option</syn-radio>`,
} as Story;

export const Disabled: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('disabled'),
    },
  },
  render: () => html`
    <syn-radio value="1" disabled>Option</syn-radio>`,
};

export const Focus: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('focus'),
    },
  },
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
  parameters: {
    docs: {
      description: generateStoryDescription('invalid'),
    },
  },
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
  parameters: {
    docs: {
      description: generateStoryDescription('sizes'),
    },
  },
  render: () => html`
    <syn-radio value="1" size="small">Option</syn-radio>
    <syn-radio value="2" size="medium">Option</syn-radio>
    <syn-radio value="3" size="large">Option</syn-radio>`,
};
