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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-table');
const { overrideArgs } = storybookHelpers('syn-table');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: `<tbody>
    <tr>
      <td>
        Cell content
      </td>
    </tr>
  </tbody>`,
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-table',
  parameters: {
    design: generateFigmaPluginObject('19479-134433'),
    docs: {
      description: {
      },
    },
  },
  title: 'Styles/syn-table',
};
export default meta;

export const Default: StoryObj = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('table', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
  ${renderStyles(args as RenderArgs, 'table')}
  `,
};

export const Screenshot: StoryObj = generateScreenshotStory({
  Default,
});
