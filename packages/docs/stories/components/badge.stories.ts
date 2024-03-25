/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/badge/badge.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-label/menu-label.js';
import '../../../components/src/components/menu-item/menu-item.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

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
    <syn-badge variant="primary">Primary</syn-badge>
    <syn-badge variant="success">Success</syn-badge>
    <syn-badge variant="neutral">Neutral</syn-badge>
    <syn-badge variant="warning">Warning</syn-badge>
    <syn-badge variant="danger">Danger</syn-badge>
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
    <syn-menu style="max-width: 240px;">
      <syn-menu-label>Messages</syn-menu-label>
      <syn-menu-item>Comments <syn-badge slot="suffix" variant="neutral" pill>4</syn-badge></syn-menu-item>
      <syn-menu-item>Replies <syn-badge slot="suffix" variant="neutral" pill>12</syn-badge></syn-menu-item>
    </syn-menu>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Variants,
  WithButtons,
  WithMenuItems,
});
/* eslint-enable sort-keys */
