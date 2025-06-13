/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-heading');
const { overrideArgs } = storybookHelpers('syn-heading');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'This is a default body text',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-heading',
  parameters: {
    design: generateFigmaPluginObject('4420-3048'),
    docs: {
      description: {
        component: generateStoryDescription('styles', 'headings'),
      },
    },
  },
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

const Heading: StoryObj = {
  render: () => html`
    <p class="syn-heading--large">syn-heading--large</p>
    <p class="syn-heading--x-large">syn-heading--x-large</p>
    <p class="syn-heading--2x-large">syn-heading--2x-large</p>
    <p class="syn-heading--3x-large">syn-heading--3x-large</p>
  `,
};

export const Screenshot: StoryObj = generateScreenshotStory({
  Heading,
});
