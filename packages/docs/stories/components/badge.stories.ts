/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/badge/badge.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/icon/icon.js';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-label/menu-label.js';
import '../../../components/src/components/menu-item/menu-item.js';
import '../../../components/src/components/popup/popup.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-badge');
const { overrideArgs } = storybookHelpers('syn-badge');
const { generateTemplate } = storybookTemplate('syn-badge');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'Badge',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-badge',
  parameters: {
    design: generateFigmaPluginObject('14127-697884'),
    docs: {
      description: {
        component: generateStoryDescription('badge', 'default'),
      },
    },
  },
  title: 'Components/syn-badge',
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
        story: generateStoryDescription('badge', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('badge', 'variants'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: var(--syn-spacing-large);">
      <syn-badge variant="primary">primary</syn-badge>
      <syn-badge variant="success">success</syn-badge>
      <syn-badge variant="neutral">neutral</syn-badge>
      <syn-badge variant="warning">warning</syn-badge>
      <syn-badge variant="danger">danger</syn-badge>
    </div>
  `,
};

export const WithButtons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('badge', 'withButton'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: var(--syn-spacing-2x-large)">
      <syn-button>
        Requests
        <syn-badge pill>30</syn-badge>
      </syn-button>

      <syn-button style="margin-inline-start: 1rem;">
        Warnings
        <syn-badge variant="warning" pill>8</syn-badge>
      </syn-button>

      <syn-button style="margin-inline-start: 1rem;">
        Errors
        <syn-badge variant="danger" pill>6</syn-badge>
      </syn-button>
    </div>
  `,
};

export const WithMenuItems: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('badge', 'menu'),
      },
    },
  },
  render: () => html`
    <syn-menu style="max-width: 228px;">
      <syn-menu-label>Messages</syn-menu-label>
      <syn-menu-item>Comments <syn-badge slot="suffix" variant="neutral" pill>4</syn-badge></syn-menu-item>
      <syn-menu-item>Replies <syn-badge slot="suffix" variant="neutral" pill>12</syn-badge></syn-menu-item>
    </syn-menu>
  `,
};

export const WithEmptyContent: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('badge', 'withEmptyContent'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; position: relative; gap: var(--syn-spacing-3x-large);">
      <syn-popup
        active
        distance="-8"
        placement="right-start"
        skidding="-10"
      >
        <syn-icon
          name="wallpaper"
          style="font-size: var(--syn-font-size-x-large)"
          slot="anchor"
        ></syn-icon>
        <syn-badge></syn-badge>
      </syn-popup>

      <syn-popup
        active
        distance="-8"
        placement="right-start"
        skidding="-10"
      >
        <syn-icon
          name="wallpaper"
          style="font-size: var(--syn-font-size-x-large)"
          slot="anchor"
        ></syn-icon>
        <syn-badge>12</syn-badge>
      </syn-popup>
    </div>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Variants,
  WithButtons,
  WithMenuItems,
  WithEmptyContent,
});
/* eslint-enable sort-keys */
