/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/horizontal-nav/horizontal-nav.js';
import '../../../components/src/components/nav-item/nav-item.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-header');
const { overrideArgs } = storybookHelpers('syn-header');
const { generateTemplate } = storybookTemplate('syn-header');

const meta: Meta = {
  args: overrideArgs([
    { name: 'default', type: 'slot', value: 'App Name' },
  ], defaultArgs),
  argTypes,
  component: 'syn-header',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('header', 'default'),
      },
    },
  },
  title: 'Components/syn-header',
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
        story: generateStoryDescription('header', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Label: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('header', 'label'),
      },
    },
  },
  render: () => html`
    <syn-header label="A new label"></syn-header>
  `,
} as Story;

export const Logo: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('header', 'logo'),
      },
    },
  },
  render: () => html`
    <syn-header>
      <span
        style="width: 32px; height: 32px; border-radius: 32px; background: var(--syn-color-primary-500); display: block;"
        slot="logo"
      ></span>
      App Name
    </syn-header>
  `,
} as Story;

export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('header', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const link = canvasElement.querySelector('a');
    link?.focus();
  },
  render: () => html`
    <style>
    .custom-header-link-with-logo {
      color: var(--syn-color-primary-600) !important;
    }
    .custom-header-link-with-logo syn-icon {
      display: block;
      width: auto;
      height: 32px;
    }
    </style>
    <syn-header>
      <a href="#" slot="logo" class="custom-header-link-with-logo">
        <syn-icon name="logo-color" library="system" label="Custom Logo with link"></syn-icon>
      </a>
      App Name
    </syn-header>
  `,
} as Story;

export const MetaNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('header', 'options'),
      },
    },
  },
  render: () => html`
    <syn-header>
      <nav slot="meta-navigation">
        <syn-icon-button color="neutral" name="apps" label="Apps"></syn-icon-button>
        <syn-icon-button color="neutral" name="account_circle" label="Account"></syn-icon-button>
        <syn-icon-button color="neutral" name="more_vert" label="More"></syn-icon-button>
      </nav>
      Meta Navigation
    </syn-header>
  `,
} as Story;

export const Navigation = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('header', 'navigation'),
      },
    },
  },
  render: () => html`
    <syn-header>
      <syn-horizontal-nav slot="navigation">
        <syn-nav-item current>Domains</syn-nav-item>
        <syn-nav-item>Projects</syn-nav-item>
        <syn-nav-item>Trainings</syn-nav-item>
        <syn-nav-item>Evaluations</syn-nav-item>
        <syn-nav-item>Deployments</syn-nav-item>
      </syn-horizontal-nav>
      App with Navigation
    </syn-header>
  `,
};

export const BurgerMenu = {
  parameters: {
    docs: {
      description: {
        // TODO: exchange description with the correct from figma asap it is available as token
        story: generateStoryDescription('header', 'navigation'),
      },
    },
  },
  render: () => html`
    <syn-header burger-menu-toggle>
      Burger Menu
    </syn-header>
  `,
};

export const Screenshot: Story = generateScreenshotStory({
  Default,
  Label,
  Logo,
  MetaNavigation,
  Navigation,
  BurgerMenu,
}, {
  heightPx: 150,
});
