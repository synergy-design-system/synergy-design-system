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
  render: (args: unknown) => renderStyles(args as RenderArgs, 'a'),
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
    <a href="javascript:alert('Here')" class="syn-link syn-link--disabled">
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

export const PrefixSuffixIcons: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link', 'prefix-suffix-icons'),
      },
    },
  },
  render: () => html`
    <a href="javascript:void(0)" class="syn-link">
      <syn-icon name="arrow_outward"></syn-icon>
      Link Label
      <syn-icon name="refresh"></syn-icon>
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

export const Inline: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link', 'inline'),
      },
    },
  },
  render: () => html`
    <p style="width: 220px;">
      Qui do.
      <a href="javascript:void(0)" class="syn-link">Magna ex elit cupidatat non esse</a>.
      Eiusmod minim excepteur.
    </p>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: StoryObj = generateScreenshotStory({
  Default,
  Quiet,
  Disabled,
  PrefixSuffixIcons,
  Size,
  Inline,
});
/* eslint-enable sort-keys */
