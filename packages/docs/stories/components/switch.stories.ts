/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/switch/switch.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { SynButton, SynSwitch } from '@synergy-design-system/components';
import { html } from 'lit';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults } from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-switch');

const generateStoryDescription = (attributeName: string) => ({
  story: (docsTokens?.components?.switch)?.[attributeName]?.description?.value ?? 'No Description',
});

const meta: Meta = {
  component: 'switch',
  args,
  argTypes,
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  title: 'Components/syn-switch',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  render: () => html`<syn-switch>Option</syn-switch>`,
} as Story;

export const Checked: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('checked'),
    },
  },
  render: () => html`<syn-switch checked>Checked</syn-switch>`,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('disabled'),
    },
  },
  render: () => html`<syn-switch disabled>Disabled</syn-switch>`,
};

export const Focus: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('focus'),
    },
  },
  play: ({ canvasElement }) => {
    const synSwitch = canvasElement.querySelector('syn-switch') as SynSwitch;
    if (synSwitch) {
      if (synSwitch) {
        synSwitch.focus();
      }
    }
  },
  render: () => html`<syn-switch>Focused</syn-switch>`,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('sizes'),
    },
  },
  render: () => html`
  <syn-switch size="small">Small</syn-switch><br>
  <syn-switch size="medium">Medium</syn-switch><br>
  <syn-switch size="large">Large</syn-switch>`,
};
