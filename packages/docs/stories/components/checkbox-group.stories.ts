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

const capitalizeFirstLetter = (value: string) => `${value[0].toUpperCase()}${value.slice(1)}`;

const createCheckboxes = (
  count: number = 3,
  options: {
    checked?: number[];
    disabled?: number[];
    readonly?: number[];
  } = {},
) => Array.from({ length: count }, (_, i) => html`
  <syn-checkbox
    ?checked="${options.checked?.includes(i)}"
    ?disabled="${options.disabled?.includes(i)}"
    ?readonly="${options.readonly?.includes(i)}"
    name="checkbox-${i + 1}"
    value="checkbox-${i + 1}"
  >Option</syn-checkbox>
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

export const VerticalLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'vertical-layout'),
      },
    },
  },
  render: () => html`
    <syn-checkbox-group label="This is a label" layout="vertical">
      ${createCheckboxes()}
    </syn-checkbox-group>
  `,
};

export const HorizontalLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'horizontal-layout'),
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
      ${createCheckboxes(3)}
    </syn-checkbox-group>
  `,
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'checked'),
      },
    },
  },
  render: () => html`
    <syn-checkbox-group label="This is a label">
      ${createCheckboxes(3, {
        checked: [1],
      })}
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
      ${createCheckboxes(3, {
        checked: [1],
      })}
    </syn-checkbox-group>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-checkbox-group label="This is a label">
      ${createCheckboxes(3, {
        disabled: [1],
      })}
    </syn-checkbox-group>
  `,
};

export const Readonly: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('checkbox-group', 'readonly'),
      },
    },
  },
  render: () => html`
    <syn-checkbox-group label="This is a label">
      ${createCheckboxes(3, {
        readonly: [1],
      })}
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
    <div class="demo-checkbox-group-grid">
      ${(['small', 'medium', 'large'] as const).map(size => html`
        <div class="demo-checkbox-group-tile">
          <syn-checkbox-group
            label="${`${capitalizeFirstLetter(size)} size vertical`}"
            size="${size}"
            layout="vertical"
          >
            ${createCheckboxes(2)}
          </syn-checkbox-group>
        </div>
        <div class="demo-checkbox-group-tile">
          <syn-checkbox-group
            label="${`${capitalizeFirstLetter(size)} size horizontal`}"
            size="${size}"
            layout="horizontal"
          >
            ${createCheckboxes(2)}
          </syn-checkbox-group>
        </div>
      `)}
    </div>
    <style>
    .demo-checkbox-group-grid {
      column-gap: var(--syn-spacing-large);
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
    }

    .demo-checkbox-group-tile {
      background: var(--syn-page-background);
      padding: var(--syn-spacing-large);
      box-sizing: border-box;
      height: 100%;
    }
    </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  VerticalLayout,
  HorizontalLayout,
  Labels,
  Checked,
  HelpText,
  Disabled,
  Readonly,
  Sizes,
}, 400);
/* eslint-enable sort-keys */
