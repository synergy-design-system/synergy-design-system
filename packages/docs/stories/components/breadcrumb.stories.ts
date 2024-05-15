/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/breadcrumb/breadcrumb.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-breadcrumb');
const { overrideArgs } = storybookHelpers('syn-breadcrumb');
const { generateTemplate } = storybookTemplate('syn-breadcrumb');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
        <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
        <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
        <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
      `,
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-breadcrumb',
  parameters: {
    design: generateFigmaPluginObject('15172-32035'),
    docs: {
      description: {
        component: generateStoryDescription('breadcrumb', 'default'),
      },
    },
  },
  title: 'Components/syn-breadcrumb',
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
        story: generateStoryDescription('breadcrumb', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const BreadcrumbLinks: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('breadcrumb', 'links'),
      },
    },
  },
  render: () => html`
    <syn-breadcrumb>
      <syn-breadcrumb-item href="#" target="_blank">Breadcrumb Item</syn-breadcrumb-item>
      <syn-breadcrumb-item href="#" target="_blank">Breadcrumb Item</syn-breadcrumb-item>
      <syn-breadcrumb-item href="#" target="_blank">Breadcrumb Item</syn-breadcrumb-item>
      <syn-breadcrumb-item href="#" target="_blank">Breadcrumb Item</syn-breadcrumb-item>
    </syn-breadcrumb>
  `,
};

export const Prefixes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('breadcrumb', 'prefix'),
      },
    },
  },
  render: () => html`
    <syn-breadcrumb>
      <syn-breadcrumb-item>
        <syn-icon slot="prefix" name="home"></syn-icon>
        Breadcrumb Item
      </syn-breadcrumb-item>
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
    </syn-breadcrumb>
  `,
};

export const Suffixes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('breadcrumb', 'suffix'),
      },
    },
  },
  render: () => html`
    <syn-breadcrumb>
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
      <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
      <syn-breadcrumb-item>
        Breadcrumb Item
        <syn-icon slot="suffix" name="security"></syn-icon>
      </syn-breadcrumb-item>
    </syn-breadcrumb>
  `,
};

export const WithDropdowns: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('breadcrumb', 'menu'),
      },
    },
  },
  render: () => html`
    <!-- This <div> is only here for positioning the dropdown in storybook -->
    <div style="position: relative;">
      <syn-breadcrumb>
        <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
        <syn-breadcrumb-item>
          <syn-dropdown>
            <button slot="trigger" class="manual-strigger">
              <syn-icon label="More options" name="more_horiz"></syn-icon>
            </button>
            <syn-menu>
              <syn-menu-item>Breadcrumb Item</syn-menu-item>
              <syn-menu-item>Breadcrumb Item</syn-menu-item>
              <syn-menu-item>Breadcrumb Item</syn-menu-item>
            </syn-menu>
          </syn-dropdown>
        </syn-breadcrumb-item>
        <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
        <syn-breadcrumb-item>Breadcrumb Item</syn-breadcrumb-item>
      </syn-breadcrumb>
    </div>
    <style>
      .manual-strigger {
        appearance: none;
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        font-size: var(--syn-font-size-small);
        margin: 0;
        padding: 0;
      }
    </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  BreadcrumbLinks,
  Prefixes,
  Suffixes,
  WithDropdowns,
}, 250);
/* eslint-enable sort-keys */
