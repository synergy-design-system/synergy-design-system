/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/tag/tag';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { generateStoryDescription, storybookDefaults } from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-tag');

const meta: Meta = {
  component: 'tag',
  args,
  argTypes,
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tag', 'default'),
      },
    },
  },
  title: 'Components/syn-tag',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tag', 'default'),
      },
    },
  },
  render: () => html`<syn-tag>Option</syn-tag>`,
} as Story;

export const Icon: Story = {
  render: () => html`
  <syn-tag>
    <syn-icon name="auto_awesome"></syn-icon>
    Option
 </syn-tag>`,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tag', 'size'),
      },
    },
  },
  render: () => html`
  <syn-tag size="small">Small</syn-tag>
  <syn-tag size="medium">Medium</syn-tag>
  <syn-tag size="large">Large</syn-tag>
  
  <br>
  <br>
  
  <syn-tag size="small">
    <syn-icon name="auto_awesome"></syn-icon>
    Small
  </syn-tag>
  <syn-tag size="medium">
    <syn-icon name="auto_awesome"></syn-icon>
    Medium
  </syn-tag>
  <syn-tag size="large">
    <syn-icon name="auto_awesome"></syn-icon>
    Large
  </syn-tag>`,
};

export const Removable: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tag', 'removable'),
      },
    },
  },
  render: () => html`
    <div class="tags-removable">
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
