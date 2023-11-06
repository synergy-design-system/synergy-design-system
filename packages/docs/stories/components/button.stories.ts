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

const generateStoryParameters = (attributeName: string) => {
  const description = (docsTokens?.components?.['button'] as any)?.[attributeName]?.description?.value ?? 'No Description';
  return {
    docs: {
      description: {
        story: description,
      }
    }
  };
};

const meta: Meta = {
  component: 'button',
  args: overrideArgs({ type: 'slot', value: 'Button', name: 'default' }, args),
  argTypes,
  title: 'Components/syn-button',
  parameters: { 
    docs: {
      description: {
        component: docsTokens?.components?.['button']?.default?.description?.value ?? 'No Description',
      },
    }
  }
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return generateTemplate({ args });
  },
  parameters: {
    docs: {
      description: {
        story: docsTokens?.components?.['button']?.default?.description?.value ?? 'No Description',
      }
    }
  }
} as Story;


export const Variants: Story = {
  render: () => html`<syn-button variant="default">Default</syn-button>
<syn-button variant="outline">Outline</syn-button>
<syn-button variant="text">Text</syn-button>`,
  parameters: generateStoryParameters('variant')
};

export const Sizes: Story = {
  render: () => html`<syn-button size="small">Small</syn-button>
<syn-button size="medium">Medium</syn-button>
<syn-button size="large">Large</syn-button>`,
  parameters: generateStoryParameters('size')
};

export const OutlineButtons: Story = {
  render: () => html`<syn-button variant="outline" size="small">Outline</syn-button>
<syn-button variant="outline" size="medium">Outline</syn-button>
<syn-button variant="outline" size="large">Outline</syn-button>`,
  parameters: generateStoryParameters('outline')
};

export const TextButtons: Story = {
  render: () => html`<syn-button variant="text" size="small">Text</syn-button>
<syn-button variant="text" size="medium">Text</syn-button>
<syn-button variant="text" size="large">Text</syn-button>`,
  parameters: generateStoryParameters('text')
};

export const LinkButtons: Story = {
  render: () => html`<syn-button href="https://example.com/">Link</syn-button>
<syn-button href="https://example.com/" target="_blank">New Window</syn-button>
<syn-button href="/assets/images/wordmark.svg" download="synergy.svg">Download</syn-button>
<syn-button href="https://example.com/" disabled>Disabled</syn-button>`,
  parameters: generateStoryParameters('link')
};

export const SettingACustomWidth: Story = {
  render: () => html`<syn-button variant="default" size="small" style="width: 100%; margin-bottom: 1rem;">Small</syn-button>
<syn-button variant="default" size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</syn-button>
<syn-button variant="default" size="large" style="width: 100%;">Large</syn-button>`,
  parameters: generateStoryParameters('width')
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
  parameters: generateStoryParameters('prefix-suffix')
};

export const Caret: Story = {
  render: () => html`<syn-button size="small" caret>Small</syn-button>
<syn-button size="medium" caret>Medium</syn-button>
<syn-button size="large" caret>Large</syn-button>`,
  parameters: generateStoryParameters('caret')
};

export const Loading: Story = {
  render: () => html`<syn-button variant="default" loading>Default</syn-button>
<syn-button variant="outline" loading>Primary</syn-button>
<syn-button variant="text" loading>Success</syn-button>`,
  parameters: generateStoryParameters('loading')
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
  parameters: generateStoryParameters('disabled')
};

