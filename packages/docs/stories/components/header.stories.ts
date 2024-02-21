/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/optgroup/optgroup';
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

export const MetaNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('header', 'meta-navigation'),
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

export const Navigation: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('header', 'top-navigation'),
      },
    },
  },
  render: () => html`
    <syn-header>
      App with Navigation
      <nav class="demo-header-navigation" slot="navigation">
        <syn-button variant="text">Domains</syn-button>
        <syn-button variant="text">Projects</syn-button>
        <syn-button variant="text">Trainings</syn-button>
        <syn-button variant="text">Evaluations</syn-button>
        <syn-button variant="text">Deployments</syn-button>
      </nav>
    </syn-header>
    <style>
    .demo-header-navigation {
      padding: 0;
    }

    /**
     * The slot itself has a padding of --syn-spacing-large,
     * so we have to adjust the button position slightly to make it
     * appear as it has the same left alignment as the logo
     */
    .demo-header-navigation syn-button:first-of-type {
      margin-left: calc(var(--syn-spacing-medium) * -1);
    }
    </style>
  `,
} as Story;

export const Screenshot: Story = generateScreenshotStory({
  Default,
  Label,
  Logo,
  MetaNavigation,
  Navigation,
}, {
  heightPx: 150,
});
