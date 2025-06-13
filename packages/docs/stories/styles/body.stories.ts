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
    design: generateFigmaPluginObject('4415-2387'),
    docs: {
      description: {
        component: generateStoryDescription('styles', 'body'),
      },
    },
  },
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

const Body: StoryObj = {
  render: () => html`
    <p class="syn-body--x-small">syn-body--x-small</p>
    <p class="syn-body--small">syn-body--small</p>
    <p class="syn-body--medium">syn-body--medium</p>
    <p class="syn-body--large">syn-body--large</p>
  `,
};

export const Screenshot: StoryObj = generateScreenshotStory({
  Body,
});
