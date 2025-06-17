/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components-vite';
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
  <br> <br>
  **Note:** The auto styling table classes work for simple table layouts. For more complex ones or advanced use cases, the table cell classes should be used.
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

const createComplexTable = (tableType: 'default' | 'border' | 'alternating' = 'default') => html`
  <table class="syn-table--${tableType}">
    <col>
    <col>
    <colgroup span="3"></colgroup>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Header Col</th>
        <th colspan="3" scope="colgroup">Header Col</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th rowspan="2" scope="rowgroup">Header Row Group</th>
        <th scope="row">Header Row</th>
        <td>Cell Content</td>
        <td>Cell Content</td>
        <td>Cell Content</td>
      </tr>
      <tr>
        <th scope="row">Header Row</th>
        <td>Cell Content</td>
        <td>Cell Content</td>
        <td>Cell Content</td>
      </tr>
      <tr>
        <th rowspan="2" scope="rowgroup">Header Row Group</th>
        <th scope="row">Header Row</th>
        <td>Cell Content</td>
        <td>Cell Content</td>
        <td>Cell Content</td>
      </tr>
      <tr>
      <th scope="row">Header Row</th>
        <td>Cell Content</td>
        <td>Cell Content</td>
        <td>Cell Content</td>
      </tr>
    </tbody>
  </table>
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
  tags: ['Structure'],
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

const ComplexTableDefault: StoryObj = {
  render: () => createComplexTable(),
};

const ComplexTableBorder: StoryObj = {
  render: () => createComplexTable('border'),
};

const ComplexTableAlternating: StoryObj = {
  render: () => createComplexTable('alternating'),
};

/* eslint-disable sort-keys */
export const Screenshot: StoryObj = generateScreenshotStory({
  AtomicTable,
  AutoDefaultTable,
  AutoAlternatingTable,
  AutoBorderTable,
  ComplexTableDefault,
  ComplexTableBorder,
  ComplexTableAlternating,
}, 400);
/* eslint-enable sort-keys */
