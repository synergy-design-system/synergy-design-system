/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/divider/divider.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  generateScreenshotStory, generateStoryDescription, storybookDefaults, storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-divider');
const { generateTemplate } = storybookTemplate('syn-divider');

const meta: Meta = {
  args: defaultArgs,
  argTypes,
  component: 'syn-divider',
  parameters: {
    design: generateFigmaPluginObject('5521-515898'),
    docs: {
      description: {
        component: generateStoryDescription('divider', 'default'),
      },
    },
  },
  tags: ['Structure'],
  title: 'Components/syn-divider',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('divider', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const Width: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('divider', 'width'),
      },
    },
  },
  render: () => html`<syn-divider style="--width: var(--syn-spacing-x-small);"></syn-divider>`,
};

export const Color: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('divider', 'color'),
      },
    },
  },
  render: () => html`<syn-divider style="--color: var(--syn-color-primary-600);"></syn-divider>`,
};

export const Spacing: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('divider', 'spacing'),
      },
    },
  },
  render: () => html`
    <div style="text-align: center;">
      Above
      <syn-divider style="--spacing: var(--syn-spacing-large);"></syn-divider>
      Below
    </div>
  `,
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('divider', 'vertical'),
      },
    },
  },
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

/**
 * Use dividers in  to visually group menu items.
 * @todo: Enable when <syn-menu /> is implemented!
 */
// export const MenuDividers: Story = {
//   render: () => html`<syn-menu style="max-width: 200px;">
//   <syn-menu-item value="1">Option 1</syn-menu-item>
//   <syn-menu-item value="2">Option 2</syn-menu-item>
//   <syn-menu-item value="3">Option 3</syn-menu-item>
//   <syn-divider></syn-divider>
//   <syn-menu-item value="4">Option 4</syn-menu-item>
//   <syn-menu-item value="5">Option 5</syn-menu-item>
//   <syn-menu-item value="6">Option 6</syn-menu-item>
// </syn-menu>`,
// };

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Width,
  Color,
  Spacing,
  Vertical,
}, 180);
/* eslint-enable sort-keys */
