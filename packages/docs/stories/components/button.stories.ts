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


/**
 * Use the variant attribute to set the button's variant.
 */
export const Variants: Story = {
  render: () => html`<syn-button variant="default">Default</syn-button>
<syn-button variant="outline">Outline</syn-button>
<syn-button variant="text">Text</syn-button>`,
};

/**
 * Use the size attribute to change a button's size.
 */
export const Sizes: Story = {
  render: () => html`<syn-button size="small">Small</syn-button>
<syn-button size="medium">Medium</syn-button>
<syn-button size="large">Large</syn-button>`,
};

/**
 * Use the outline attribute to draw outlined buttons with transparent backgrounds.
 */
export const OutlineButtons: Story = {
  render: () => html`<syn-button variant="default" outline>Default</syn-button>
<syn-button variant="outline">Primary</syn-button>`,
};

/**
 * Use the text variant to create text buttons that share the same size as regular buttons but don't have backgrounds or borders.
 */
export const TextButtons: Story = {
  render: () => html`<syn-button variant="text" size="small">Text</syn-button>
<syn-button variant="text" size="medium">Text</syn-button>
<syn-button variant="text" size="large">Text</syn-button>`,
};

/**
 * It's often helpful to have a button that works like a link. This is possible by setting the href attribute, which will make the component render an <a> under the hood. This gives you all the default link behavior the browser provides (e.g. [[CMD/CTRL/SHIFT]] + [[CLICK]]) and exposes the target and download attributes.
 */
export const LinkButtons: Story = {
  render: () => html`<syn-button href="https://example.com/">Link</syn-button>
<syn-button href="https://example.com/" target="_blank">New Window</syn-button>
<syn-button href="/assets/images/wordmark.svg" download="synergy.svg">Download</syn-button>
<syn-button href="https://example.com/" disabled>Disabled</syn-button>`,
};

/**
 * As expected, buttons can be given a custom width by setting the width attribute. This is useful for making buttons span the full width of their container on smaller screens.
 */
export const SettingACustomWidth: Story = {
  render: () => html`<syn-button variant="default" size="small" style="width: 100%; margin-bottom: 1rem;">Small</syn-button>
<syn-button variant="default" size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</syn-button>
<syn-button variant="default" size="large" style="width: 100%;">Large</syn-button>`,
};

/**
 * Use the prefix and suffix slots to add icons.
 */
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
</syn-button>`,
};

/**
 * Use the caret attribute to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.
 */
export const Caret: Story = {
  render: () => html`<syn-button size="small" caret>Small</syn-button>
<syn-button size="medium" caret>Medium</syn-button>
<syn-button size="large" caret>Large</syn-button>`,
};

/**
 * Use the loading attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around. Clicks will be suppressed until the loading state is removed.
 */
export const Loading: Story = {
  render: () => html`<syn-button variant="default" loading>Default</syn-button>
<syn-button variant="outline" loading>Primary</syn-button>
<syn-button variant="text" loading>Success</syn-button>`,
};

/**
 * Use the disabled attribute to disable a button.
 */
export const Disabled: Story = {
  render: () => html`<syn-button variant="default" disabled>Default</syn-button>
<syn-button variant="outline" disabled>Primary</syn-button>
<syn-button variant="text" disabled>Success</syn-button>`,
};

