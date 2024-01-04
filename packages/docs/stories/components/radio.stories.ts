/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import '../../../components/src/components/radio/radio.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import {
  generateScreenshotStory,
  generateStoryDescription, storybookDefaults, storybookHelpers, storybookTemplate,
} from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-radio');
const { overrideArgs } = storybookHelpers('syn-radio');
const { generateTemplate } = storybookTemplate('syn-radio');

const meta: Meta = {
  args: overrideArgs({ name: 'default', type: 'slot', value: 'Option' }, args),
  argTypes,
  component: 'radio',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('radio', 'default'),
      },
    },
  },
  title: 'Components/syn-radio',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('radio', 'default'),
      },
    },
  },
  render: (storyArgs: unknown) => generateTemplate({ args: storyArgs }),
} as Story;

export const Disabled: Story = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-radio value="1" disabled>Option</syn-radio>`,
};

export const Focus: Story = {
  name: 'Focus',
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('radio', 'focus'),
      },
    },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const radio = canvasElement.querySelector('syn-radio');
    if (radio) {
      radio.focus();
    }
  },
  render: () => html`
    <syn-radio value="1">Option</syn-radio>`,
};

export const Invalid: Story = {
  name: 'Invalid',
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('radio', 'invalid'),
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    try {
      const radio = canvasElement.querySelector('syn-radio');
      const button = canvasElement.querySelector('syn-button');

      if (button && radio) {
        // make sure to always fire both events:
        // 1. userEvent.click is needed for storybooks play function to register
        // 2. button.click is needed to really click the button
        // userEvent.click works on native elements only
        await userEvent.click(button);
        button.click();
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
    <syn-button type="submit" variant="filled">Submit</syn-button>
  </form>
  <style>
  syn-button {
    margin-top: 1rem;
  }
  </style>`,
};

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio', 'sizes'),
      },
    },
  },
  render: () => html`
    <syn-radio value="1" size="small">Option</syn-radio>
    <syn-radio value="2" size="medium">Option</syn-radio>
    <syn-radio value="3" size="large">Option</syn-radio>`,
};

// Bundled screenshot story
const bundledStories: Array<Story> = [
  Disabled,
  Sizes,
];

export const Screenshot: Story = generateScreenshotStory(bundledStories);
