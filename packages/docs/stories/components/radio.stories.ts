import '../../../components/src/components/radio/radio.js';
import '../../../components/src/components/radio-group/radio-group.js';
import '../../../components/src/components/button/button.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { userEvent } from 'storybook/test';
import { FormSubmitDecorator } from '../../src/decorators/index.js';
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
    design: generateFigmaPluginObject('41310-252390'),
    docs: {
      description: {
        component: generateStoryDescription('radio', 'default'),
      },
    },
  },
  tags: ['Form'],
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

export const Readonly: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio', 'readonly'),
      },
    },
  },
  render: () => html`
    <syn-radio-group value="1">
      <syn-radio value="1" readonly>Read-only content</syn-radio>
    </syn-radio-group>
  `,
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
  decorators: [FormSubmitDecorator],
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
      const button = form?.querySelector('syn-button');

      if (button && form) {
        await userEvent.click(button);
        button.click();

        (document.activeElement as HTMLElement)?.blur();
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`
    <syn-radio-group required>
      <syn-radio value="1">Invalid</syn-radio>
      <syn-radio value="">Invalid</syn-radio>
    </syn-radio-group>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  InitialValue,
  Disabled,
  Readonly,
  Sizes,
});
/* eslint-enable sort-keys */
