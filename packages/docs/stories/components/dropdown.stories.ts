/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/dropdown/dropdown.js';
import '../../../components/src/components/divider/divider.js';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-item/menu-item.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-dropdown');
const { overrideArgs } = storybookHelpers('syn-dropdown');
const { generateTemplate } = storybookTemplate('syn-dropdown');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-button slot="trigger" caret>Dropdown</syn-button>
        <syn-menu style="min-width: 240px;">
          <syn-menu-item>Dropdown Item 1</syn-menu-item>
          <syn-menu-item>Dropdown Item 2</syn-menu-item>
          <syn-menu-item>Dropdown Item 3</syn-menu-item>
          <syn-divider></syn-divider>
          <syn-menu-item type="checkbox" checked>Checkbox</syn-menu-item>
          <syn-menu-item disabled>Disabled</syn-menu-item>
          <syn-divider></syn-divider>
          <syn-menu-item>
            Prefix
            <syn-icon slot="prefix" name="wallpaper"></syn-icon>
          </syn-menu-item>
          <syn-menu-item>
            Suffix Icon
            <syn-icon slot="suffix" name="wallpaper"></syn-icon>
          </syn-menu-item>
        </syn-menu>    
      `,
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-dropdown',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('dropdown', 'default'),
      },
      story: {
        height: '250px',
      },
    },
  },
  title: 'Components/syn-dropdown',
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
        story: generateStoryDescription('dropdown', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
    <div style="position: relative">
      ${generateTemplate({ args })}
    </div>
  `,
} as Story;

export const GettingTheSelectedItem: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('dropdown', 'getting-the-selected-item'),
      },
    },
  },
  render: () => html`
    <div style="position: relative">
      <div class="dropdown-selection">
        <syn-dropdown>
          <syn-button slot="trigger" caret>Edit</syn-button>
          <syn-menu style="min-width: 240px;">
            <syn-menu-item value="cut">Cut</syn-menu-item>
            <syn-menu-item value="copy">Copy</syn-menu-item>
            <syn-menu-item value="paste">Paste</syn-menu-item>
          </syn-menu>
        </syn-dropdown>
      </div>
    </div>

    <script type="module">
      const container = document.querySelector('.dropdown-selection');
      const dropdown = container.querySelector('syn-dropdown');

      dropdown.addEventListener('syn-select', event => {
        const selectedItem = event.detail.item;
        console.log(selectedItem.value);
      });
    </script>
  `,
};

export const Placement: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('dropdown', 'placement'),
      },
    },
  },
  render: () => html`
    <div style="position: relative">
      <syn-dropdown placement="right-start">
        <syn-button slot="trigger" caret>Edit</syn-button>
        <syn-menu style="min-width: 240px;">
          <syn-menu-item>Cut</syn-menu-item>
          <syn-menu-item>Copy</syn-menu-item>
          <syn-menu-item>Paste</syn-menu-item>
          <syn-divider></syn-divider>
          <syn-menu-item>Find</syn-menu-item>
          <syn-menu-item>Replace</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </div>
  `,
};

export const Distance: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('dropdown', 'distance'),
      },
    },
  },
  render: () => html`
    <div style="position: relative">
      <syn-dropdown distance="30">
        <syn-button slot="trigger" caret>Edit</syn-button>
        <syn-menu style="min-width: 240px;">
          <syn-menu-item>Cut</syn-menu-item>
          <syn-menu-item>Copy</syn-menu-item>
          <syn-menu-item>Paste</syn-menu-item>
          <syn-divider></syn-divider>
          <syn-menu-item>Find</syn-menu-item>
          <syn-menu-item>Replace</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </div>
  `,
};

export const Skidding: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('dropdown', 'skidding'),
      },
    },
  },
  render: () => html`
    <div style="position: relative">
      <syn-dropdown skidding="30">
        <syn-button slot="trigger" caret>Edit</syn-button>
        <syn-menu style="min-width: 240px;">
          <syn-menu-item>Cut</syn-menu-item>
          <syn-menu-item>Copy</syn-menu-item>
          <syn-menu-item>Paste</syn-menu-item>
          <syn-divider></syn-divider>
          <syn-menu-item>Find</syn-menu-item>
          <syn-menu-item>Replace</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </div>
  `,
};

export const Submenus: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('dropdown', 'submenus'),
      },
    },
  },
  render: () => html`
    <div style="position: relative">
      <syn-dropdown>
        <syn-button slot="trigger" caret>Edit</syn-button>

        <syn-menu style="min-width: 240px;">
          <syn-menu-item value="undo">Undo</syn-menu-item>
          <syn-menu-item value="redo">Redo</syn-menu-item>
          <syn-divider></syn-divider>
          <syn-menu-item value="cut">Cut</syn-menu-item>
          <syn-menu-item value="copy">Copy</syn-menu-item>
          <syn-menu-item value="paste">Paste</syn-menu-item>
          <syn-divider></syn-divider>
          <syn-menu-item>
            Find
            <syn-menu slot="submenu">
              <syn-menu-item value="find">Find…</syn-menu-item>
              <syn-menu-item value="find-previous">Find Next</syn-menu-item>
              <syn-menu-item value="find-next">Find Previous</syn-menu-item>
            </syn-menu>
          </syn-menu-item>
          <syn-menu-item>
            Transformations
            <syn-menu slot="submenu">
              <syn-menu-item value="uppercase">Make uppercase</syn-menu-item>
              <syn-menu-item value="lowercase">Make lowercase</syn-menu-item>
              <syn-menu-item value="capitalize">Capitalize</syn-menu-item>
            </syn-menu>
          </syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </div>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  GettingTheSelectedItem,
  Placement,
  Distance,
  Skidding,
  Submenus,
}, 100);
/* eslint-enable sort-keys */
