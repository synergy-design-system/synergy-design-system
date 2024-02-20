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

/**
 * The header is used to indicate the name of the app,
 * provide important actions in a toolbar and a navigation.
 */
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

/**
 * Use the label attribute to change the app name.
 * Important: The label will be hidden on mobile, if there are items in the toolbar.
 */
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

/**
 * Use the logo slot to change the app logo.
 * Usually this is only needed in whitelabel solutions,
 * when the SICK branding explicitly has to be hidden.
 */
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

/**
 * Use the Option Menu slot to add additional functionalities to your application.
 * Please be aware of the guidelines regarding the order of icons in the toolbar.
 *
 * Important: The Options Menu doesn’t handle any responsive behaviour,
 * e. g. if there is not enough space for all items in different screen sizes.
 *
 * You have to make sure yourself, that your app works correctly and
 * e. g. move elements into the footer of the side navigation or inside
 * a “more” button in the Options Menu.
 */
export const OptionMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('header', 'option-menu'),
      },
    },
  },
  render: () => html`
    <syn-header>
      <nav slot="option-menu">
        <syn-icon-button color="neutral" name="apps" label="Apps"></syn-icon-button>
        <syn-icon-button color="neutral" name="account_circle" label="Account"></syn-icon-button>
        <syn-icon-button color="neutral" name="more_vert" label="More"></syn-icon-button>
      </nav>
      Options Menu
    </syn-header>
  `,
} as Story;

/**
 * Use the top navigation slot to add syn-navigation and horizontal syn-navigation-items
 */
export const TopNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('header', 'top-navigation'),
      },
    },
  },
  render: () => html`
    <syn-header>
      App with Top Navigation
      <nav class="demo-header-navigation" slot="top-navigation">
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
  OptionMenu,
  TopNavigation,
}, {
  heightPx: 150,
});
