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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-heading');
const { overrideArgs } = storybookHelpers('syn-heading');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'This is a default heading text',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-heading',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('41127-558410'),
    docs: {
      description: {
        component: generateStoryDescription('styles', 'headings'),
      },
    },
  },
  tags: ['Typography', 'Styles'],
  title: 'Styles/syn-heading',
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

export const AvailableHeadings: StoryObj = {
  render: () => html`
    <section class="heading-stories-list">
      <h6 class="syn-heading--medium">The quick brown fox jumped over the lazy dog.</h6>
      <h5 class="syn-heading--large">The quick brown fox jumped over the lazy dog.</h5>
      <h4 class="syn-heading--x-large">The quick brown fox jumped over the lazy dog.</h4>
      <h3 class="syn-heading--2x-large">The quick brown fox jumped over the lazy dog.</h3>
      <h2 class="syn-heading--3x-large">The quick brown fox jumped over the lazy dog.</h2>
      <h1 class="syn-heading--4x-large">The quick brown fox jumped over the lazy dog.</h1>
    </section>
    <style>
    section.heading-stories-list {
      display: flex;
      gap: var(--syn-spacing-medium);
      flex-direction: column;

      h1, h2, h3, h4, h5, h6 {
        margin: 0;
      }
    }
    </style>
  `,
};

export const Screenshot: StoryObj = generateScreenshotStory({
  AvailableHeadings,
});
