import '../../../components/src/components/checkbox-group/checkbox-group.js';
import '../../../components/src/components/checkbox/checkbox.js';
import '../../../components/src/components/button/button.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const createCheckboxes = (count: number = 3) => Array.from({ length: count }, (_, i) => html`
  <syn-checkbox name="checkbox-${i + 1}" value="checkbox-${i + 1}">Option</syn-checkbox>
`);

const { argTypes } = storybookDefaults('syn-checkbox-group');
const { overrideArgs } = storybookHelpers('syn-checkbox-group');
const { generateTemplate } = storybookTemplate('syn-checkbox-group');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'label',
      type: 'attribute',
      value: 'This is a label',
    },
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-checkbox name="checkbox-1" value="checkbox-1">Option</syn-checkbox>
        <syn-checkbox name="checkbox-2" value="checkbox-2">Option</syn-checkbox>
        <syn-checkbox name="checkbox-3" value="checkbox-3">Option</syn-checkbox>
      `,
    },
  ]),
  argTypes,
  component: 'syn-checkbox-group',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('50279-43830'),
    docs: {
      description: {
        component: generateStoryDescription('checkbox-group', 'default'),
      },
    },
  },
  tags: ['Form'],
  title: 'Components/syn-checkbox-group',
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
        story: generateStoryDescription('checkbox-group', 'default'),
      },
    },
  },
  render: (args) => generateTemplate({ args }),
};

export const LayoutVertical: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'layout-vertical'),
      },
    },
  },
  render: () => html`
    <syn-checkbox-group label="This is a label" layout="vertical">
      ${createCheckboxes()}
    </syn-checkbox-group>
  `,
};

export const LayoutHorizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'layout-horizontal'),
      },
    },
  },
  render: () => html`
    <syn-checkbox-group label="This is a label" layout="horizontal">
      ${createCheckboxes(11)}
    </syn-checkbox-group>
  `,
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-checkbox-group label="This is a label">
      ${createCheckboxes(11)}
    </syn-checkbox-group>
  `,
};

export const HelpText: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'help-text'),
      },
    },
  },
  render: () => html`
    <syn-checkbox-group label="This is a label" help-text="Choose the most appropriate option.">
      ${createCheckboxes(3)}
    </syn-checkbox-group>
  `,
};

export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const checkboxGroup = canvasElement.querySelector('syn-checkbox-group');
    checkboxGroup?.focus();
  },
  render: () => html`
    <syn-checkbox-group label="This is a label" help-text="Choose the most appropriate option.">
      ${createCheckboxes(3)}
    </syn-checkbox-group>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'sizes'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-large);">
      ${['small', 'medium', 'large'].map(size => html`
        <syn-checkbox-group label="This is a label" help-text="Choose the most appropriate option." size="${size}">
          ${createCheckboxes(2)}
        </syn-checkbox-group>
      `)}
    </div>
  `,
};


/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
}, 200);
/* eslint-enable sort-keys */
