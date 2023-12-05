/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/radio/radio.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import { generateStoryDescription, storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';

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
        story: generateStoryDescription('radio', 'default'),
      },
    },
  },
  title: 'Components/syn-radio',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio', 'default'),
      },
    },
  },
  render: (storyArgs: unknown) => generateTemplate({ args: storyArgs }),
  // render: () => html`
  // <syn-radio value="1" size="medium">Option</syn-radio>`,
} as Story;

export const Disabled: Story = {
  parameters: {
    controls: {
      disable: true,
    },
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
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story: generateStoryDescription('radio', 'focus'),
      },
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
    controls: {
      disable: true,
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
    controls: {
      disable: true,
    },
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
