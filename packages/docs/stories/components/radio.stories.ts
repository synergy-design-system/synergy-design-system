/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import '../../../components/src/components/radio/radio.js';
import '../../../components/src/components/radio-group/radio-group.js';
import '../../../components/src/components/button/button.js';
import { type SynRadioGroup } from '@synergy-design-system/components';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { userEvent } from 'storybook/test';
import {
  generateScreenshotStory,
  generateStoryDescription, storybookDefaults, storybookHelpers, storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args, argTypes } = storybookDefaults('syn-radio');
const { overrideArgs } = storybookHelpers('syn-radio');
const { generateTemplate } = storybookTemplate('syn-radio');

const meta: Meta = {
  args: overrideArgs({ name: 'default', type: 'slot', value: 'Option' }, args),
  argTypes,
  component: 'syn-radio',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('1175-2494'),
    docs: {
      description: {
        component: generateStoryDescription('radio', 'default'),
      },
    },
  },
  tags: ['Form', 'SICK2018', 'SICK2025'],
  title: 'Components/syn-radio',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
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
  render: storyArgs => generateTemplate({ args: storyArgs }),
};

export const InitialValue: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio', 'initialValue'),
      },
    },
  },
  render: () => html`
    <syn-radio-group value="1">
      <syn-radio value="1" selected>Option</syn-radio>
    </syn-radio-group>
  `,
};

export const Focus: Story = {
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

export const Disabled: Story = {
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

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio', 'sizes'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-large);">
      <syn-radio value="1" size="small">Option</syn-radio>
      <syn-radio value="2" size="medium">Option</syn-radio>
      <syn-radio value="3" size="large">Option</syn-radio>
    </div>
  `,
};

export const Invalid: Story = {
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
      const form = canvasElement.querySelector('form');
      const radioGroup = canvasElement.querySelector<SynRadioGroup>('syn-radio-group');
      const button = form?.querySelector('syn-button');

      if (button && form && radioGroup) {
        radioGroup.setCustomValidity('Invalid');
        await userEvent.click(button);
        button.click();

        (document.activeElement as HTMLElement)?.blur();
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`
    <form class="custom-validity">
      <syn-radio-group required value="2">
        <syn-radio value="1">Invalid</syn-radio>
        <syn-radio value="2">Invalid</syn-radio>
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
    </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  InitialValue,
  Disabled,
  Sizes,
});
/* eslint-enable sort-keys */
