import '../../../components/src/components/tag-group/tag-group.js';
import '../../../components/src/components/tag/tag.js';
import '../../../components/src/components/icon/icon.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-tag-group');
const { generateTemplate } = storybookTemplate('syn-tag-group');
const { overrideArgs } = storybookHelpers('syn-tag-group');

const generateTags = (count: number) => new Array(count)
  .fill(`
<syn-tag removable>
  <syn-icon name="wallpaper"></syn-icon>
  Option
 </syn-tag>    
  `.trim())
  .join('\n');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'label',
      type: 'slot',
      value: 'This is a label',
    },
    {
      name: 'default',
      type: 'slot',
      value: generateTags(6),
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-tag-group',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('45275-174458'),
    docs: {
      description: {
        component: generateStoryDescription('tag-group', 'default'),
      },
    },
  },
  tags: ['Feedback', 'Tags', 'Filter'],
  title: 'Components/syn-tag-group',
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
        story: generateStoryDescription('tag-group', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tag-group', 'size'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-x-large);">
      ${(['small', 'medium', 'large'] as const).map(size => html`
        <syn-tag-group
          size="${size}"
          label=${size.charAt(0).toUpperCase() + size.slice(1)}
        >
          ${unsafeHTML(generateTags(6))}
        </syn-tag-group>
      `)}
    </div>
  `,
};

export const LabelAlignment: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tag-group', 'label-alignment'),
      },
    },
  },
  render: () => html`
    <syn-tag-group label="This is a label" label-position="start">
      ${unsafeHTML(generateTags(6))}
    </syn-tag-group>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Sizes,
  LabelAlignment,
}, 350);
/* eslint-enable sort-keys */
