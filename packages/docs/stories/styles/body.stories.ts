import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
} from '../../src/helpers/component.js';
import { type RenderArgs, renderStyles } from '../../src/helpers/styles.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-body');
const { overrideArgs } = storybookHelpers('syn-body');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'This is a default body text',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-body',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('41127-558410'),
    docs: {
      description: {
        component: generateStoryDescription('styles', 'body'),
      },
    },
  },
  tags: ['Typography', 'Styles'],
  title: 'Styles/syn-body',
};
export default meta;

export const Default: StoryObj = {
  parameters: {
    controls: {
      disable: false,
    },
  },
  render: (args: unknown) => renderStyles(args as RenderArgs),
};

export const AvailableBodyText: StoryObj = {
  render: () => html`
    <section class="body-stories-list">
      <p class="syn-body--2x-small">The quick brown fox jumped over the lazy dog.</p>
      <p class="syn-body--x-small">The quick brown fox jumped over the lazy dog.</p>
      <p class="syn-body--small">The quick brown fox jumped over the lazy dog.</p>
      <p class="syn-body--medium">The quick brown fox jumped over the lazy dog.</p>
      <p class="syn-body--large">The quick brown fox jumped over the lazy dog.</p>
    </section>
    <style>
    section.body-stories-list {
      display: flex;
      gap: var(--syn-spacing-medium);
      flex-direction: column;

      p {
        margin: 0;
      }
    }
    </style>
  `,
};

export const Screenshot: StoryObj = generateScreenshotStory({
  AvailableBodyText,
});
