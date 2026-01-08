/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable complexity */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/radio-group/radio-group.js';
import '../../../components/src/components/radio/radio.js';
import '../../../components/src/components/button/button.js';
import type { SynRadioGroup } from '@synergy-design-system/components';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { userEvent } from 'storybook/test';
import {
  generateScreenshotStory,
  generateStoryDescription, storybookDefaults, storybookHelpers, storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args, argTypes } = storybookDefaults('syn-radio-group');
const { overrideArgs } = storybookHelpers('syn-radio-group');
const { generateTemplate } = storybookTemplate('syn-radio-group');

const meta: Meta = {
  args,
  argTypes,
  component: 'syn-radio-group',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('1345-16160'),
    docs: {
      description: {
        component: generateStoryDescription('radio-group', 'default'),
      },
    },
  },
  tags: ['Form'],
  title: 'Components/syn-radio-group',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: overrideArgs([
    { name: 'label', type: 'attribute', value: 'This is a label' },
    {
      name: 'default', type: 'slot', value: `<syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
    <syn-radio value="3">Option</syn-radio>`,
    }], args),
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('radio-group', 'default'),
      },
    },
  },
  render: storyArgs => generateTemplate({ args: storyArgs }),
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-group', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-radio-group label="This is a label">
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
      <syn-radio value="3">Option</syn-radio>
    </syn-radio-group>
  `,
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-group', 'checked'),
      },
    },
  },
  render: () => html`
  <syn-radio-group label="This is a label" help-text="This is checked" name="a" value="2">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
    <syn-radio value="3">Option</syn-radio>
  </syn-radio-group>`,
};

export const HelpText: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-group', 'help-text'),
      },
    },
  },
  render: () => html`
    <syn-radio-group label="This is a label" help-text="Choose the most appropriate option." name="a">
      <syn-radio value="1">Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
      <syn-radio value="3">Option</syn-radio>
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
        story: generateStoryDescription('radio-group', 'focus'),
      },
    },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const elm = canvasElement.querySelector<SynRadioGroup>('syn-radio-group');
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    elm?.focus();
  },
  render: () => html`
    <syn-radio-group label="This is a label" name="a">
      <syn-radio value="1" disabled>Option</syn-radio>
      <syn-radio value="2">Option</syn-radio>
      <syn-radio value="3">Option</syn-radio>
    </syn-radio-group>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-group', 'disabled'),
      },
    },
  },
  render: () => html`
  <syn-radio-group label="This is a label" help-text="This is disabled" name="a">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2" disabled>Option</syn-radio>
    <syn-radio value="3">Option</syn-radio>
  </syn-radio-group>`,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-group', 'size'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-large);">
      <syn-radio-group label="Small size" size="small">
        <syn-radio value="1">Option</syn-radio>
        <syn-radio value="2">Option</syn-radio>
      </syn-radio-group>
      <syn-radio-group label="Medium size" size="medium">
        <syn-radio value="1">Option</syn-radio>
        <syn-radio value="2">Option</syn-radio>
      </syn-radio-group>
      <syn-radio-group label="Large size" size="large">
        <syn-radio value="1">Option</syn-radio>
        <syn-radio value="2">Option</syn-radio>
      </syn-radio-group>
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
        story: generateStoryDescription('radio-group', 'invalid'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const button = canvasElement.querySelector('syn-button');

      if (button) {
        // make sure to always fire both events:
        // 1. userEvent.click is needed for storybooks play function to register
        // 2. button.click is needed to really click the button
        // userEvent.click works on native elements only
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
      <syn-radio-group label="Select an option" name="a" help-text="This is required" required>
        <syn-radio value="1">Option 1</syn-radio>
        <syn-radio value="2">Option 2</syn-radio>
        <syn-radio value="3">Option 3</syn-radio>
      </syn-radio-group>
      <syn-button type="submit" variant="filled">Submit</syn-button>
    </form>
    <style>
      .custom-validity {
        display: flex;
        flex-direction: column;
        gap: var(--syn-spacing-large);
      }
      syn-button {
        align-self: flex-start;
      }
    </style>
  `,
};

export const CustomValidity: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('radio-group', 'setCustomValidity'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const radioGroup = canvasElement.querySelector('syn-radio-group');
      const button = canvasElement.querySelector('syn-button');
      const initiallySelectedOption = canvasElement.querySelector('syn-radio[value="1"]');
      const correctRadioOption = canvasElement.querySelector('syn-radio[value="3"]');
      const errorMessage = 'You must choose the last option';

      radioGroup?.setCustomValidity(errorMessage);

      if (initiallySelectedOption) {
        await userEvent.click(initiallySelectedOption);
      }

      if (correctRadioOption && radioGroup?.value === '3') {
        radioGroup?.setCustomValidity('');
      } else {
        radioGroup?.setCustomValidity(errorMessage);
      }

      if (button) {
        // make sure to always fire both events:
        // 1. userEvent.click is needed for storybooks play function to register
        // 2. button.click is needed to really click the button
        // userEvent.click works on native elements only
        await userEvent.click(button);
        button.click();
        if (radioGroup?.checkValidity()) {
          console.log('All fields are valid!');
        } else {
          console.error('Form validation failed');
        }
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },

  render: () => html`
  <form>
    <syn-radio-group label="Select an option" name="a" value="1">
      <syn-radio value="1">Not me</syn-radio>
      <syn-radio value="2">Me neither</syn-radio>
      <syn-radio value="3">Choose me</syn-radio>
    </syn-radio-group>
    <br />
    <syn-button type="submit" variant="filled">Submit</syn-button>
  </form>`,
};

// Bundled screenshot story
/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Labels,
  Checked,
  HelpText,
  Disabled,
  Sizes,
}, 400);
/* eslint-enable sort-keys */
