/* eslint-disable */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/button/button';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';
const { args, argTypes } = storybookDefaults('syn-button');
const { overrideArgs } = storybookHelpers('syn-button');
const { generateTemplate } = storybookTemplate('syn-button');

const generateStoryDescription = (attributeName: string) => {
  return {
    story: (docsTokens?.components?.['button'] as any)?.[attributeName]?.description?.value ?? 'No Description',
  }
};

const meta: Meta = {
  component: 'button',
  args: overrideArgs({ type: 'slot', value: 'Button', name: 'default' }, args),
  argTypes,
  title: 'Components/syn-button',
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return generateTemplate({ args });
  },
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
} as Story;


export const Variants: Story = {
  render: () => html`<syn-button variant="default">Default</syn-button>
<syn-button variant="outline">Outline</syn-button>
<syn-button variant="text">Text</syn-button>
<style>
  syn-button {
    margin: 0.5rem;
  }
</style>`,
  parameters: {
    docs: {
      description: generateStoryDescription('variant'),
    },
  },
};

export const Sizes: Story = {
  render: () => html`<syn-button size="small">Small</syn-button>
<syn-button size="medium">Medium</syn-button>
<syn-button size="large">Large</syn-button>`,
  parameters: {
    docs: {
      description: generateStoryDescription('size'),
    },
  },
};

export const LinkButtons: Story = {
  render: () => html`<syn-button href="https://example.com/">Link</syn-button>
<syn-button href="https://example.com/" target="_blank">New Window</syn-button>
<syn-button href="/assets/images/wordmark.svg" download="synergy.svg">Download</syn-button>
<syn-button href="https://example.com/" disabled>Disabled</syn-button>`,
  parameters: {
    docs: {
      description: generateStoryDescription('link'),
    },
  },
};

export const SettingACustomWidth: Story = {
  render: () => html`<syn-button variant="default" size="small" style="width: 100%; margin-bottom: 1rem;">Small</syn-button>
<syn-button variant="default" size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</syn-button>
<syn-button variant="default" size="large" style="width: 100%;">Large</syn-button>`,
  parameters: {
    docs: {
      description: generateStoryDescription('width'),
    },
  },
};

export const PrefixAndSuffixIcons: Story = {
  render: () => html`<syn-button variant="default" size="small">
  <syn-icon slot="prefix" name="gear"></syn-icon>
  Settings
</syn-button>

<syn-button variant="default" size="small">
  <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
  Refresh
</syn-button>

<syn-button variant="default" size="small">
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>

<br /><br />

<syn-button variant="default">
  <syn-icon slot="prefix" name="gear"></syn-icon>
  Settings
</syn-button>

<syn-button variant="default">
  <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
  Refresh
</syn-button>

<syn-button variant="default">
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>

<br /><br />

<syn-button variant="default" size="large">
  <syn-icon slot="prefix" name="gear"></syn-icon>
  Settings
</syn-button>

<syn-button variant="default" size="large">
  <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
  Refresh
</syn-button>

<syn-button variant="default" size="large">
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>

<br/><br/><br/>

<syn-button variant="outline" size="small">
  <syn-icon slot="prefix" name="gear"></syn-icon>
  Settings
</syn-button>

<syn-button variant="outline" size="small">
  <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
  Refresh
</syn-button>

<syn-button variant="outline" size="small">
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>

<br /><br />

<syn-button variant="outline">
  <syn-icon slot="prefix" name="gear"></syn-icon>
  Settings
</syn-button>

<syn-button variant="outline">
  <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
  Refresh
</syn-button>

<syn-button variant="outline">
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>

<br /><br />

<syn-button variant="outline" size="large">
  <syn-icon slot="prefix" name="gear"></syn-icon>
  Settings
</syn-button>

<syn-button variant="outline" size="large">
  <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
  Refresh
</syn-button>

<syn-button variant="outline" size="large">
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>

<br/><br/><br/>

<syn-button variant="text" size="small">
  <syn-icon slot="prefix" name="gear"></syn-icon>
  Settings
</syn-button>

<syn-button variant="text" size="small">
  <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
  Refresh
</syn-button>

<syn-button variant="text" size="small">
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>

<br /><br />

<syn-button variant="text">
  <syn-icon slot="prefix" name="gear"></syn-icon>
  Settings
</syn-button>

<syn-button variant="text">
  <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
  Refresh
</syn-button>

<syn-button variant="text">
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>

<br /><br />

<syn-button variant="text" size="large">
  <syn-icon slot="prefix" name="gear"></syn-icon>
  Settings
</syn-button>

<syn-button variant="text" size="large">
  <syn-icon slot="suffix" name="arrow-counterclockwise"></syn-icon>
  Refresh
</syn-button>

<syn-button variant="text" size="large">
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>`,
  parameters: {
    docs: {
      description: generateStoryDescription('prefix-suffix'),
    },
  },
};

export const Caret: Story = {
  render: () => html`<syn-button size="small" caret>Small</syn-button>
<syn-button size="medium" caret>Medium</syn-button>
<syn-button size="large" caret>Large</syn-button>`,
  parameters: {
    docs: {
      description: generateStoryDescription('caret'),
    },
  },
};

export const Loading: Story = {
  render: () => html`<syn-button variant="default" loading>Default</syn-button>
<syn-button variant="outline" loading>Primary</syn-button>
<syn-button variant="text" loading>Success</syn-button>`,
  parameters: {
    docs: {
      description: generateStoryDescription('loading'),
    },
  },
};

export const Disabled: Story = {
  render: () => html`<syn-button variant="default" disabled>Default</syn-button>
<syn-button variant="outline" disabled>Primary</syn-button>
<syn-button variant="text" disabled>Success</syn-button>
<br><br>
<syn-button variant="default" disabled>
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>
<syn-button variant="outline" disabled>
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>
<syn-button variant="text" disabled>
  <syn-icon slot="prefix" name="link-45deg"></syn-icon>
  <syn-icon slot="suffix" name="box-arrow-up-right"></syn-icon>
  Open
</syn-button>
`,
  parameters: {
    docs: {
      description: generateStoryDescription('disabled'),
    },
  },
};

