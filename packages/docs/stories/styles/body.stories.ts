/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import {
  // generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { type RenderArgs, renderStyles } from '../../src/helpers/styles.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-body');
const { overrideArgs } = storybookHelpers('syn-body');
const { generateTemplate } = storybookTemplate('syn-body');

console.log(defaultArgs, argTypes);

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
    // @todo: Link to figma
    // design: generateFigmaPluginObject('15172-32035'),
    // @todo: Add description tokens
    // docs: {
    //   description: {
    //     component: generateStoryDescription('body', 'default'),
    //   },
    // },
  },
  title: 'Styles/syn-body',
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
