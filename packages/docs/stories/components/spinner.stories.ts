/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/spinner/spinner';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args, argTypes } = storybookDefaults('syn-spinner');
const { generateTemplate } = storybookTemplate('syn-spinner');

const meta: Meta = {
  args,
  argTypes,
  component: 'syn-spinner',
  parameters: {
    design: generateFigmaPluginObject('14127-697884'),
    docs: {
      description: {
        component: generateStoryDescription('spinner', 'default'),
      },
    },
  },
  title: 'Components/syn-spinner',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('spinner', 'default'),
      },
    },
  },
  render: (storyArgs: unknown) => generateTemplate({ args: storyArgs }),
} as Story;

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('spinner', 'size'),
      },
    },
  },
  render: () => html`
    <div style="align-items: baseline; display: flex; gap: var(--syn-spacing-large);">
      <syn-spinner style="font-size: var(--syn-font-size-medium)"></syn-spinner>
      <syn-spinner style="font-size: var(--syn-font-size-2x-large);"></syn-spinner>
      <syn-spinner style="font-size: 40px;"></syn-spinner>
    </div>
  `,
};

export const TrackWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('spinner', 'track-width'),
      },
    },
  },
  render: () => html`
    <syn-spinner style="font-size: 48px; --track-width: 8px;"></syn-spinner>
  `,
};

export const Color: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('spinner', 'color'),
      },
    },
  },
  render: () => html`
    <syn-spinner style="font-size: 48px; --indicator-color: var(--syn-color-error-600);"></syn-spinner>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Size,
  TrackWidth,
  Color,
}, 280);
/* eslint-enable sort-keys */
