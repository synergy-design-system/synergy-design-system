/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/button/button';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-button');
const { overrideArgs } = storybookHelpers('syn-button');
const { generateTemplate } = storybookTemplate('syn-button');

const generateStoryDescription = (attributeName: string) => ({
  story: (docsTokens?.components?.button as Record<string, any>)?.[attributeName]?.description?.value ?? 'No Description',
});

const meta: Meta = {
  component: 'button',
  args: overrideArgs({ type: 'slot', value: 'Button', name: 'default' }, defaultArgs),
  argTypes,
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  title: 'Components/syn-button',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  render: (args: any) => generateTemplate({ args }),
} as Story;

export const Variants: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('variant'),
    },
  },
  render: () => html`
  <syn-button variant="filled">Filled</syn-button>
  <syn-button variant="outline">Outline</syn-button>
  <syn-button variant="text">Text</syn-button>
  <style>
    syn-button {
      margin: 0.2rem;
    }
  </style>`,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('size'),
    },
  },
  render: () => html`
  <syn-button size="small">Small</syn-button>
  <syn-button size="medium">Medium</syn-button>
  <syn-button size="large">Large</syn-button>
  <style>
    syn-button {
      margin: 0.2rem;
    }
  </style>`,
};

/** The focus attribute provides feedback to the users,
 * informing them that the button component is ready for use.  */
export const Focus: Story = {
  play: ({ canvasElement }: { canvasElement: HTMLElement; }) => {
    const button = canvasElement.querySelector('syn-button') as HTMLInputElement;
    if (button) {
      button.focus();
    }
  },
  render: () => html`<syn-button>Default</syn-button>`,
};

export const LinkButtons: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('link'),
    },
  },
  render: () => html`
  <syn-button href="https://example.com/">Link</syn-button>
  <syn-button href="https://example.com/" target="_blank">New Window</syn-button>
  <syn-button href="/assets/images/wordmark.svg" download="synergy.svg">Download</syn-button>
  <syn-button href="https://example.com/" disabled>Disabled</syn-button>
  <style>
    syn-button {
      margin: 0.2rem;
    }
  </style>`,
};

export const SettingACustomWidth: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('width'),
    },
  },
  render: () => html`
  <syn-button size="small" style="width: 100%; margin-bottom: 1rem;">Small</syn-button>
  <syn-button size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</syn-button>
  <syn-button size="large" style="width: 100%;">Large</syn-button>`,
};

export const PrefixAndSuffixIcons: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('prefix-suffix'),
    },
  },
  render: () => html`
  <syn-button size="small">
    <syn-icon slot="prefix" name="gear"></syn-icon>
    Settings
  </syn-button>

  <syn-button size="small">
    <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
    Refresh
  </syn-button>

  <syn-button size="small">
    <syn-icon slot="prefix" name="link-45deg"></syn-icon>
    <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
    Open
  </syn-button>

  <br/><br/>

  <syn-button>
    <syn-icon slot="prefix" name="gear"></syn-icon>
    Settings
  </syn-button>

  <syn-button>
    <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
    Refresh
  </syn-button>

  <syn-button>
    <syn-icon slot="prefix" name="link-45deg"></syn-icon>
    <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
    Open
  </syn-button>

  <br/><br/>

  <syn-button size="large">
    <syn-icon slot="prefix" name="gear"></syn-icon>
    Settings
  </syn-button>

  <syn-button size="large">
    <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
    Refresh
  </syn-button>

  <syn-button size="large">
    <syn-icon slot="prefix" name="link-45deg"></syn-icon>
    <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
    Open
  </syn-button>
  <style>
    syn-button {
      margin: 0.2rem;
    }
  </style>`,
};

export const Caret: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('caret'),
    },
  },
  render: () => html`
  <syn-button size="small" caret>Small</syn-button>
  <syn-button size="medium" caret>Medium</syn-button>
  <syn-button size="large" caret>Large</syn-button>
  <style>
    syn-button {
      margin: 0.2rem;
    }
  </style>`,
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('loading'),
    },
  },
  render: () => html`
  <syn-button variant="filled" loading>Filled</syn-button>
  <syn-button variant="outline" loading>Outline</syn-button>
  <syn-button variant="text" loading>Text</syn-button>
  <style>
    syn-button {
      margin: 0.2rem;
    }
  </style>`,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('disabled'),
    },
  },
  render: () => html`
  <syn-button variant="filled" disabled>Filled</syn-button>
  <syn-button variant="outline" disabled>Outline</syn-button>
  <syn-button variant="text" disabled>Text</syn-button>`,
};
