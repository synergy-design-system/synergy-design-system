/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import {
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
} from '../../src/helpers/component.js';
import { type RenderArgs, renderStyles } from '../../src/helpers/styles.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-weight');
const { overrideArgs } = storybookHelpers('syn-weight');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'This is a default body text',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-weight',
  parameters: {
    design: generateFigmaPluginObject('4415-2387'),
    docs: {
      description: {
        component: generateStoryDescription('styles', 'weight'),
      },
    },
  },
  title: 'Styles/syn-weight',
};
export default meta;

export const Default: StoryObj = {
  parameters: {
    controls: {
      disable: false,
    },
    // @todo: Add description tokens
    // docs: {
    //   description: {
    //     story: generateStoryDescription('body', 'default'),
    //   },
    // },
  },
  render: (args: unknown) => renderStyles(args as RenderArgs),
};
