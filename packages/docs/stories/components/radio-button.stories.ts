import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/radio-group/radio-group.js';
import '../../../components/src/components/radio-button/radio-button.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { ChromaticModesAll } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-radio-button');
const { overrideArgs } = storybookHelpers('syn-radio-button');
const { generateTemplate } = storybookTemplate('syn-radio-button');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'Option 1',
    },
    {
      name: 'value',
      type: 'attribute',
      value: '1',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-radio-button',
  parameters: {
    chromatic: {
      modes: ChromaticModesAll,
    },
    design: generateFigmaPluginObject('16967-26428'),
    docs: {
      description: {
        component: generateStoryDescription('radio-button', 'default'),
      },
    },
  },
  tags: ['Structure'],
  title: 'Components/syn-radio-button',
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
        story: generateStoryDescription('radio-button', 'default'),
      },
    },
  },
  render: args => html`
    <syn-radio-group label="Select an option" name="a" value="1">
      ${generateTemplate({ args })}
      <syn-radio-button value="2">Option 2</syn-radio-button>
      <syn-radio-button value="3">Option 3</syn-radio-button>
    </syn-radio-group>
  `,
};

export const CheckedStates: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-button', 'checked-states'),
      },
    },
  },
  render: () => html`
    <syn-radio-group label="Select an option" name="b" value="1">
      <syn-radio-button value="1">Option 1</syn-radio-button>
      <syn-radio-button value="2">Option 2</syn-radio-button>
      <syn-radio-button value="3">Option 3</syn-radio-button>
    </syn-radio-group>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-button', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-radio-group label="Select an option" name="b" value="1">
      <syn-radio-button value="1">Option 1</syn-radio-button>
      <syn-radio-button value="2" disabled>Option 2</syn-radio-button>
      <syn-radio-button value="3">Option 3</syn-radio-button>
    </syn-radio-group>
  `,
};

export const Readonly: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-button', 'readonly'),
      },
    },
  },
  render: () => html`
    <syn-radio-group label="Select an option" name="b" value="1">
      <syn-radio-button value="1" readonly>Option 1</syn-radio-button>
      <syn-radio-button value="2" readonly>Option 2</syn-radio-button>
      <syn-radio-button value="3" readonly>Option 3</syn-radio-button>
    </syn-radio-group>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-button', 'sizes'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium);">
      ${(['small', 'medium', 'large'] as const).map(size => html`
        <syn-radio-group label="Select an option" name="size" size=${size} value="1">
          <syn-radio-button value="1">Option 1</syn-radio-button>
          <syn-radio-button value="2">Option 2</syn-radio-button>
          <syn-radio-button value="3">Option 3</syn-radio-button>
        </syn-radio-group>
      `)}
    </div>
  `,
};

export const PrefixAndSuffixIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-button', 'prefix-suffix'),
      },
    },
  },
  render: () => html`
    <syn-radio-group label="Select an option" name="b" value="1">
      <syn-radio-button value="1">
        <syn-icon slot="prefix" name="wallpaper"></syn-icon>
        Option 1
      </syn-radio-button>
      <syn-radio-button value="2">
        Option 2
        <syn-icon slot="suffix" name="wallpaper"></syn-icon>
      </syn-radio-button>
      <syn-radio-button value="3">
        <syn-icon slot="prefix" name="wallpaper"></syn-icon>
        Option 3
        <syn-icon slot="suffix" name="wallpaper"></syn-icon>
      </syn-radio-button>
    </syn-radio-group>
  `,
};

export const ButtonsWithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('radio-button', 'buttons-with-icons'),
      },
    },
  },
  render: () => html`
    <syn-radio-group label="Select an option" name="a" value="neutral">
      <syn-radio-button value="angry">
        <syn-icon name="face_5" label="Angry"></syn-icon>
      </syn-radio-button>

      <syn-radio-button value="sad">
        <syn-icon name="face_4" label="Sad"></syn-icon>
      </syn-radio-button>

      <syn-radio-button value="neutral">
        <syn-icon name="face_3" label="Neutral"></syn-icon>
      </syn-radio-button>

      <syn-radio-button value="happy">
        <syn-icon name="face_2" label="Happy"></syn-icon>
      </syn-radio-button>

      <syn-radio-button value="laughing">
        <syn-icon name="face_6" label="Laughing"></syn-icon>
      </syn-radio-button>
    </syn-radio-group>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  CheckedStates,
  Disabled,
  Readonly,
  Sizes,
  PrefixAndSuffixIcons,
  ButtonsWithIcons,
}, 350);
/* eslint-enable sort-keys */
