import '../../../components/src/components/button-group/button-group.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/dropdown/dropdown.js';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-item/menu-item.js';
import '../../../components/src/components/tooltip/tooltip.js';
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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-button-group');
const { overrideArgs } = storybookHelpers('syn-button-group');
const { generateTemplate } = storybookTemplate('syn-button-group');

const meta: Meta = {
  args: overrideArgs(
    {
      name: 'default',
      type: 'slot',
      value: `
<syn-button>Left</syn-button>
<syn-button>Center</syn-button>
<syn-button>Right</syn-button>
      `.trim(),
    },
    defaultArgs,
  ),
  argTypes,
  component: 'syn-button-group',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('45597-333058'),
    docs: {
      description: {
        component: generateStoryDescription('button-group', 'default'),
      },
    },
  },
  title: 'Components/syn-button-group',
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
        story: generateStoryDescription('button', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
} as Story;

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button-group', 'variant'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: var(--syn-spacing-large); flex-direction: column;">
      ${['outline', 'filled'].map(variant => html`
        <syn-button-group variant="${variant}" label="Variant (${variant})">
          <syn-button>Left</syn-button>
          <syn-button>Center</syn-button>
          <syn-button>Right</syn-button>
        </syn-button-group>
      `)}
    </div>
  `,
};

export const ButtonSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button-group', 'size'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: var(--syn-spacing-large); flex-direction: column;">
      ${['small', 'medium', 'large'].map(size => html`
        <syn-button-group size="${size}" label="Alignment (${size})">
          <syn-button>Left</syn-button>
          <syn-button>Center</syn-button>
          <syn-button>Right</syn-button>
        </syn-button-group>
      `)}
    </div>
  `,
};

export const DropdownsInButtonGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button-group', 'dropdowns-in-button-groups'),
      },
    },
  },
  render: () => html`
    <syn-button-group label="Example Button Group">
      <syn-button>Button</syn-button>
      <syn-button>Button</syn-button>
      <syn-dropdown placement="bottom-end">
        <syn-button slot="trigger" caret>Dropdown</syn-button>
        <syn-menu>
          <syn-menu-item>Save</syn-menu-item>
          <syn-menu-item>Save as&hellip;</syn-menu-item>
          <syn-menu-item>Save all</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </syn-button-group>
  `,
};

export const SplitButtons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button-group', 'split-buttons'),
      },
    },
  },
  render: () => html`
    <syn-button-group label="Example Button Group">
      <syn-button>Save</syn-button>
      <syn-dropdown placement="bottom-end">
        <syn-button slot="trigger" variant="primary" caret></syn-button>
        <syn-menu>
          <syn-menu-item>Save</syn-menu-item>
          <syn-menu-item>Save as&hellip;</syn-menu-item>
          <syn-menu-item>Save all</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </syn-button-group>
  `,
};

export const TooltipsInButtonGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button-group', 'tooltips'),
      },
    },
  },
  render: () => html`
    <syn-button-group label="Example Button Group">
      <syn-tooltip content="I am on the left">
        <syn-button>Left</syn-button>
      </syn-tooltip>
      <syn-tooltip content="I am in the center">
        <syn-button>Center</syn-button>
      </syn-tooltip>
      <syn-tooltip content="I am on the right">
        <syn-button>Right</syn-button>
      </syn-tooltip>
    </syn-button-group>
  `,
};

export const ToolbarExample: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button-group', 'tooltips'),
      },
    },
  },
  render: () => html`
    <div class="button-group-toolbar">
      <syn-button-group label="Download and save">
        <syn-tooltip content="Save">
          <syn-button><syn-icon name="save" label="Save"></syn-icon></syn-button>
        </syn-tooltip>
        <syn-tooltip content="Download">
          <syn-button><syn-icon name="save_alt" label="Download"></syn-icon></syn-button>
        </syn-tooltip>
      </syn-button-group>

      <syn-button-group label="Misc">
        <syn-tooltip content="Edit">
          <syn-button><syn-icon name="edit" label="Edit"></syn-icon></syn-button>
        </syn-tooltip>
        <syn-tooltip content="Settings">
          <syn-button><syn-icon name="settings" label="Settings"></syn-icon></syn-button>
        </syn-tooltip>
        <syn-tooltip content="Preview">
          <syn-button><syn-icon name="wallpaper" label="Preview"></syn-icon></syn-button>
        </syn-tooltip>
      </syn-button-group>

      <syn-button-group>
        <syn-tooltip content="Add">
          <syn-button><syn-icon name="add" label="Add"></syn-icon></syn-button>
        </syn-tooltip>
        <syn-tooltip content="Info">
          <syn-button><syn-icon name="info" label="Info"></syn-icon></syn-button>
        </syn-tooltip>
        <syn-tooltip content="Upload File">
          <syn-button><syn-icon name="upload_file" label="Upload File"></syn-icon></syn-button>
        </syn-tooltip>
      </syn-button-group>
    </div>

    <style>
      .button-group-toolbar syn-button-group:not(:last-of-type) {
        margin-right: var(--syn-spacing-large);
      }
    </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Variants,
  ButtonSizes,
  DropdownsInButtonGroups,
  SplitButtons,
  TooltipsInButtonGroups,
  ToolbarExample,
}, 280);
/* eslint-enable sort-keys */
