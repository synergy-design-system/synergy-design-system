import '../../../components/src/components/pagination/pagination.js';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-pagination');
const { overrideArgs } = storybookHelpers('syn-pagination');
const { generateTemplate } = storybookTemplate('syn-pagination');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'total-items',
      type: 'attribute',
      value: 500,
    },
    {
      name: 'page-size-options',
      type: 'attribute',
      value: '10, 25, 50, 100',
    },
    {
      name: 'current-page',
      type: 'attribute',
      value: 1,
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-pagination',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('10540-8605'),
    docs: {
      description: {
        component: generateStoryDescription('pagination', 'default'),
      },
    },
  },
  tags: ['Navigation', 'Filter'],
  title: 'Components/syn-pagination',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('pagination', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const WithDivider: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('pagination', 'with-divider'),
      },
    },
  },
  render: () => html`
    <syn-pagination divider current-page="2" page-size="25" total-items="500" ></syn-pagination>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('pagination', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-pagination disabled current-page="1" page-size="25" total-items="500" ></syn-pagination>
  `,
};

export const Compact: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('pagination', 'compact'),
      },
    },
  },
  render: () => html`
    <syn-pagination variant="compact" current-page="1" page-size="25" total-items="500"></syn-pagination>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('pagination', 'sizes'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-2x-large);">
      <syn-pagination current-page="1" page-size="25" total-items="500" size="small"></syn-pagination>
      <syn-pagination current-page="1" page-size="25" total-items="500" size="medium"></syn-pagination>
      <syn-pagination current-page="1" page-size="25" total-items="500" size="large"></syn-pagination>
    </div>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  WithDivider,
  Disabled,
  Compact,
  Sizes,
});
/* eslint-enable sort-keys */
