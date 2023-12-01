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
      const radio = canvasElement.querySelector('syn-radio');
      const button = canvasElement.querySelector('syn-button');

      if (button && radio) {
        await userEvent.click(button);
        button.click();
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`
  <form class="custom-validity">
    <syn-radio-group required>
      <syn-radio value="1">Option</syn-radio>
    </syn-radio-group>
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
