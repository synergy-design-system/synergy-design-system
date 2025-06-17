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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-table-cell');
const { overrideArgs } = storybookHelpers('syn-table-cell');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: 'Cell content',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-table-cell',
  parameters: {
    design: generateFigmaPluginObject('19479-134433'),
    docs: {
      description: {
        component: generateStoryDescription('table', 'default'),
      },
    },
  },
  tags: ['Structure', 'Styles'],
  title: 'Styles/syn-table-cell',
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
  <table class="syn-table">
    <tbody>
      <tr>
        ${renderStyles(({ ...(args as RenderArgs), sticky: true } as RenderArgs), 'td')}
      </tr>
    </tbody>
  </table>
  <style>
    .sticky {
      position: sticky;
    }
  </style>
  `,
};

export const Header: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('table', 'header'),
      },
    },
  },
  render: () => html`
    <table class="syn-table">
      <thead>
        <tr>
          <th class="syn-table-cell--header">Cell header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="syn-table-cell">Cell content</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const Alternating: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('table', 'alternating'),
      },
    },
  },
  render: () => html`
    <table class="syn-table">
      <tbody>
        <tr>
          <td class="syn-table-cell">Cell content</td>
        </tr>
        <tr>
          <td class="syn-table-cell syn-table-cell--alternating">Cell content</td>
        </tr>
        <tr>
          <td class="syn-table-cell">Cell content</td>
        </tr>
        <tr>
          <td class="syn-table-cell syn-table-cell--alternating">Cell content</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const Border: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('table', 'border'),
      },
    },
  },
  render: () => html`
    <table class="syn-table">
      <tbody>
        <tr>
          <td class="syn-table-cell syn-table-cell--border-top">Border Top</td>
        </tr>
        <tr>
          <td class="syn-table-cell syn-table-cell--border-start">Border Start</td>
        </tr>
        <tr>
          <td class="syn-table-cell syn-table-cell--border-end">Border End</td>
        </tr>
        <tr>
          <td class="syn-table-cell syn-table-cell--border-bottom">Border Left</td>
        </tr>
      </tbody>
    </table>
  `,
};

export const ScrollingBehavior: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('table', 'scroll'),
      },
    },
  },
  render: () => html`
    <table class="syn-table">
      <thead>
        <tr>
          <th class="syn-table-cell--header syn-table-cell--shadow-bottom syn-table-cell--shadow-active sticky">Cell header</th>
          <th class="syn-table-cell--header syn-table-cell--shadow-bottom syn-table-cell--shadow-active sticky">Cell header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="syn-table-cell">Cell content</td>
          <td class="syn-table-cell">Cell content</td>
        </tr>
      </tbody>
    </table>
    <style>
      .sticky {
        position: sticky;
      }
    </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: StoryObj = generateScreenshotStory({
  Default,
  Header,
  Alternating,
  Border,
  ScrollingBehavior,
}, 250);
/* eslint-enable sort-keys */
