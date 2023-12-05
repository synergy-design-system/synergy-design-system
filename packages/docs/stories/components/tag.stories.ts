// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED BY VENDORISM
// Removing this comment will prevent it from being managed by it.
// ---------------------------------------------------------------------

/* eslint-disable */

/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/tag/tag';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { storybookDefaults, storybookHelpers, storybookTemplate, generateStoryDescription } from '../../src/helpers/component.js';
const { args, argTypes } = storybookDefaults('syn-tag');
const { overrideArgs } = storybookHelpers('syn-tag');
const { generateTemplate } = storybookTemplate('syn-tag');

const meta: Meta = {
  component: 'tag',
  args,
  argTypes,
  title: 'Components/syn-tag',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('tag', 'default'),
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
        story: generateStoryDescription('tag', 'default'),
      }
    }
  }
} as Story;


/**
 * Use the size attribute to change a tab's size.
 */
export const Sizes: Story = {
  render: () => html`<syn-tag size="small">Small</syn-tag>
<syn-tag size="medium">Medium</syn-tag>
<syn-tag size="large">Large</syn-tag>`,
};

/**
 * Use the pill attribute to give tabs rounded edges.
 */
export const Pill: Story = {
  render: () => html`<syn-tag size="small" pill>Small</syn-tag>
<syn-tag size="medium" pill>Medium</syn-tag>
<syn-tag size="large" pill>Large</syn-tag>`,
};

/**
 * Use the removable attribute to add a remove button to the tag.
 */
export const Removable: Story = {
  render: () => html`<div class="tags-removable">
  <syn-tag size="small" removable>Small</syn-tag>
  <syn-tag size="medium" removable>Medium</syn-tag>
  <syn-tag size="large" removable>Large</syn-tag>
</div>

<script type="module">
  const div = document.querySelector('.tags-removable');

  div.addEventListener('syn-remove', event => {
    const tag = event.target;
    tag.style.opacity = '0';
    setTimeout(() => (tag.style.opacity = '1'), 2000);
  });
</script>

<style>
  .tags-removable syn-tag {
    transition: var(--syn-transition-medium) opacity;
  }
</style>`,
};
