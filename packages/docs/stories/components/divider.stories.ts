/* eslint-disable */

/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/divider/divider';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { storybookDefaults, storybookHelpers, storybookTemplate, generateStoryDescription } from '../../src/helpers/component.js';
const { args, argTypes } = storybookDefaults('syn-divider');
const { overrideArgs } = storybookHelpers('syn-divider');
const { generateTemplate } = storybookTemplate('syn-divider');

const meta: Meta = {
  component: 'syn-divider',
  args,
  argTypes,
  title: 'Components/syn-divider',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('divider', 'default'),
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
        story: generateStoryDescription('divider', 'default'),
      }
    }
  }
} as Story;


/**
 * Use the --width custom property to change the width of the divider.
 */
export const Width: Story = {
  render: () => html`<syn-divider style="--width: 4px;"></syn-divider>`,
};

/**
 * Use the --color custom property to change the color of the divider.
 */
export const Color: Story = {
  render: () => html`<syn-divider style="--color: tomato;"></syn-divider>`,
};

/**
 * Use the --spacing custom property to change the amount of space between the divider and it's neighboring elements.
 */
export const Spacing: Story = {
  render: () => html`
    <div style="text-align: center;">
      Above
      <syn-divider style="--spacing: 2rem;"></syn-divider>
      Below
    </div>
  `,
};

/**
 * Add the vertical attribute to draw the divider in a vertical orientation. The divider will span the full height of its container. Vertical dividers work especially well inside of a flex container.
 */
export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; height: 2rem;">
      First
      <syn-divider vertical></syn-divider>
      Middle
      <syn-divider vertical></syn-divider>
      Last
    </div>
  `,
};
