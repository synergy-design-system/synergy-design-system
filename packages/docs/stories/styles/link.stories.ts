/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
} from '../../src/helpers/component.js';
import { type RenderArgs, renderStyles } from '../../src/helpers/styles.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-link');
const { overrideArgs } = storybookHelpers('syn-link');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'Link label',
    },
    {
      name: 'syn-link',
      type: 'attribute',
      value: 'syn-link--medium',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-link',
  parameters: {
    design: generateFigmaPluginObject('24700-38828'),
    docs: {
      description: {
        component: generateStoryDescription('styles', 'link'),
      },
    },
  },
  title: 'Styles/syn-link',
};
export default meta;

export const Default: StoryObj = {
  parameters: {
    controls: {
      disable: false,
    },
  },
  render: (args: unknown) => renderStyles(args as RenderArgs, 'a', {
    class: 'syn-link',
    // eslint-disable-next-line no-script-url
    href: 'javascript:void(0)',
  }),
};

export const Inline: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link', 'inline'),
      },
    },
  },
  render: () => html`
    <p style="width: 266px;">
      This is some random text that contains <a href="javascript:void(0)" class="syn-link">a link that spans over several lines</a> to imply how it works in real life.
    </p>
  `,
};

export const PrefixSuffixIcons: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link', 'prefix-suffix-icons'),
      },
    },
  },
  render: () => html`
    <nav class="storybook-demo-syn-link">
      <a href="javascript:void(0)" class="syn-link syn-link--medium">
        Open link in new window
        <syn-icon name="arrow_outward"></syn-icon>
      </a>
      <a href="javascript:void(0)" class="syn-link syn-link--medium">
        <syn-icon name="picture_as_pdf"></syn-icon>
        Download PDF
      </a>
      <a href="javascript:void(0)" class="syn-link syn-link--medium">
        <syn-icon name="picture_as_pdf"></syn-icon>
        Open PDF in new window
        <syn-icon name="arrow_outward"></syn-icon>
      </a>
    </nav>
    <style>
      .storybook-demo-syn-link {
        display: inline-flex;
        flex-direction: column;
        gap: var(--syn-spacing-large);
      }
    </style>
  `,
};

export const Quiet: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link', 'quiet'),
      },
    },
  },
  render: () => html`
    <a href="javascript:void(0)" class="syn-link syn-link--quiet">
      <syn-icon name="keyboard_arrow_right"></syn-icon>
      Link Label
    </a>
  `,
};

export const Disabled: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link', 'disabled'),
      },
    },
  },
  render: () => html`
    <a class="syn-link syn-link--disabled">
      <syn-icon name="keyboard_arrow_right"></syn-icon>
      Link Label
    </a>
  `,
};

export const Focus: StoryObj = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('link', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const link = canvasElement.querySelector('a');
    if (link) {
      link.focus();
    }
  },
  render: () => html`
    <a href="javascript:void(0)" class="syn-link">
      <syn-icon name="keyboard_arrow_right"></syn-icon>
      Link Label
    </a>
  `,
};

export const Size: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link', 'size'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: var(--syn-spacing-large);">
      <a href="javascript:void(0)" class="syn-link syn-link--small">
        <syn-icon name="keyboard_arrow_right"></syn-icon>
        Link Label
      </a>
      <a href="javascript:void(0)" class="syn-link syn-link--medium">
        <syn-icon name="keyboard_arrow_right"></syn-icon>
        Link Label
      </a>
      <a href="javascript:void(0)" class="syn-link syn-link--large">
        <syn-icon name="keyboard_arrow_right"></syn-icon>
        Link Label
      </a>
    </div>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: StoryObj = generateScreenshotStory({
  Default,
  Inline,
  PrefixSuffixIcons,
  Quiet,
  Disabled,
  Focus,
  Size,
});
/* eslint-enable sort-keys */
