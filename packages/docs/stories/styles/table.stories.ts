/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
  generateScreenshotStory,
  storybookDefaults,
  storybookHelpers,
} from '../../src/helpers/component.js';
import { type RenderArgs, renderStyles } from '../../src/helpers/styles.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-table');
const { overrideArgs } = storybookHelpers('syn-table');

const tableDocs = `It is possible to achieve different table stylings (default, with border, alternating, ...) 
 either via multiple classes on the \`table\`, \`td\` and \`th\` elements or as a convenient alternative
 as auto styling class, which is applied on a \`table\` element. These auto styling classes will
 style the \`td\` and \`th\` elements correctly, without the need to apply further classes.
`;

const createTableData = () => `
  <thead>
    <tr>
      <th> Header content </th>
      <th> Header content </th>
      <th> Header content </th>
    </tr>
    </thead>
  <tbody>
    <tr>
      <td> Cell content </td>
      <td> Cell content </td>
      <td> Cell content </td>
    </tr>
    <tr>
      <td> Cell content </td>
      <td> Cell content </td>
      <td> Cell content </td>
    </tr>
    <tr>
      <td> Cell content </td>
      <td> Cell content </td>
      <td> Cell content </td>
    </tr>
    <tr>
      <td> Cell content </td>
      <td> Cell content </td>
      <td> Cell content </td>
    </tr>
  </tbody>
`;

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: createTableData().trim(),
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-table',
  parameters: {
    design: generateFigmaPluginObject('19479-134433'),
    docs: {
      description: {
        component: tableDocs,
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
        story: tableDocs,
      },
    },
  },
  render: (args: unknown) => renderStyles(args as RenderArgs, 'table'),
};

/**
 * Create table styles using multiple classes attached to `table`, `td` and `th` elements.
 */
export const AtomicTable: StoryObj = {
  render: () => html`
    <table class="syn-table">
      <thead>
        <tr>
          <th class="syn-table-cell--header"> Header content </th>
          <th class="syn-table-cell--header"> Header content </th>
          <th class="syn-table-cell--header"> Header content </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="syn-table-cell"> Cell content </td>
          <td class="syn-table-cell"> Cell content </td>
          <td class="syn-table-cell"> Cell content </td>
        </tr>
        <tr>
          <td class="syn-table-cell"> Cell content </td>
          <td class="syn-table-cell"> Cell content </td>
          <td class="syn-table-cell"> Cell content </td>
        </tr>
        <tr>
          <td class="syn-table-cell"> Cell content </td>
          <td class="syn-table-cell"> Cell content </td>
          <td class="syn-table-cell"> Cell content </td>
        </tr>
        <tr>
          <td class="syn-table-cell"> Cell content </td>
          <td class="syn-table-cell"> Cell content </td>
          <td class="syn-table-cell"> Cell content </td>
        </tr>
      </tbody>
    </table>
  `,
};

/**
 * Use default table style with the auto styling class `syn-table--default`.
 */
export const AutoDefaultTable: StoryObj = {
  render: () => html`
    <table class="syn-table--default">
     ${unsafeHTML(createTableData())}
    </table>
  `,
};

/**
 * Use alternating table style with the auto styling class `syn-table--alternating`.
 */
export const AutoAlternatingTable: StoryObj = {
  render: () => html`
    <table class="syn-table--alternating">
     ${unsafeHTML(createTableData())}
    </table>
  `,
};

/**
 * Use border table style with the auto styling class `syn-table--border`.
 */
export const AutoBorderTable: StoryObj = {
  render: () => html`
    <table class="syn-table--border">
     ${unsafeHTML(createTableData())}
    </table>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: StoryObj = generateScreenshotStory({
  AtomicTable,
  AutoDefaultTable,
  AutoAlternatingTable,
  AutoBorderTable,
});
/* eslint-enable sort-keys */
