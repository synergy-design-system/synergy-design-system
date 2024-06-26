import React from 'react';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';
import { html } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
// import { generateStoryDescription } from '../../src/helpers/component.js';
import { getTranslation } from '../../src/translations.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

/**
 * Repeats a given iterator function a specified number of times.
 *
 * @param iterator - The iterator function to be repeated.
 * @param times - The number of times the iterator function should be repeated. Default is 5.
 * @returns An array containing the results of each iteration.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const repeatFor = (iterator: (value: any, index: number, array: any[]) => unknown, times = 5) => {
  const d = new Array(times).fill(undefined).map(iterator);
  return d;
};

/**
 * Create table header
 *
 * @param shadow - Shadow position
 */
const createHeader = (shadow: 'top' | 'bottom' | 'start' | 'end' | undefined = undefined) => {
  const shadowClass = shadow ? `syn-table-cell--shadow-${shadow} shadow-cell` : '';

  // eslint-disable-next-line complexity
  const getClassesForColumn = (column: number) => `syn-table-cell--header ${
    ((shadow === 'end' && column === 0) || (shadow === 'start' && column === 4) || shadow === 'bottom') ? shadowClass : ''
  }`;

  return html`
  <thead>
    <tr>
      <th class="${getClassesForColumn(0)}">${getTranslation('table.header.name')}</th>
      <th class="${getClassesForColumn(1)}">${getTranslation('table.header.customer')}</th>
      <th class="${getClassesForColumn(2)}">${getTranslation('table.header.location')}</th>
      <th class="${getClassesForColumn(3)}">${getTranslation('table.header.contractStart')}</th>
      <th class="${getClassesForColumn(4)}"></th>
    </tr>
  </thead>
`;
};

/**
 * Create table body row
 *
 * @param alternate - Alternate row
 * @param shadow - Shadow position
 */
const createBodyRow = (alternate: boolean = false, shadow: 'start' | 'end' | undefined = undefined) => {
  const classes = `syn-table-cell ${alternate ? 'syn-table-cell--bg-neutral-50' : ''}`;
  const shadowClass = `syn-table-cell--shadow-${shadow} shadow-cell`;
  const getClassesForColumn = (column: number) => `${classes} ${((shadow === 'end' && column === 0) || (shadow === 'start' && column === 4)) ? shadowClass : ''}`;

  return html`
  <tr>
    <th class="${getClassesForColumn(0)}">${getTranslation('table.body.name')}</th>
    <th class="${getClassesForColumn(1)}">${getTranslation('table.body.customer')}</th>
    <th class="${getClassesForColumn(2)}">${getTranslation('table.body.location')}</th>
    <th class="${getClassesForColumn(3)}">${getTranslation('table.body.contractStart')}</th>
    <th class="${getClassesForColumn(4)}"> 
      <syn-button variant="text" size="small">
        <syn-icon name="edit"></syn-icon>
      </syn-button>
      <syn-button variant="text" size="small">
        <syn-icon name="delete_outline"></syn-icon>
      </syn-button>
    </th>
  </tr>
`;
};

const meta: Meta = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
    design: generateFigmaPluginObject('19923-55456'),
    docs: {
      description: {
        // TODO: use doc-tokens as soon as available
        // component: generateStoryDescription('templates', 'application-shell'),
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories title="" />
        </>
      ),
      story: {
        iframeHeight: 550,
      },
    },
  },
  title: 'Templates/Table',
};
export default meta;

export const TableWithHeader: Story = {
  render: () => {
    const bodyData = repeatFor(() => createBodyRow());

    return html`
    <table class="syn-table">
      ${createHeader()}
      <tbody>
        ${bodyData}
      </tbody>
    </table>
  `;
  },
};

export const TableWithAlternatingRows: Story = {
  render: () => {
    const alternateBody = repeatFor((_val, index) => {
      const alternate = index % 2 !== 0;
      return createBodyRow(alternate);
    });

    return html`
    <table class="syn-table">
      ${createHeader()}
      <tbody>
        ${alternateBody}
      </tbody>
    </table>
  `;
  },
};

export const TableWithBorders: Story = {
  render: () => {
    const borderBody = repeatFor((_val, index) => {
      const classes = `syn-table-cell syn-table-cell--border-end ${index !== 4 ? 'syn-table-cell--border-bottom' : ''}`;
      return html`
    <tr>
      <th class="${classes}">${getTranslation('table.body.name')}</th>
      <th class="${classes}">${getTranslation('table.body.customer')}</th>
      <th class="${classes}">${getTranslation('table.body.location')}</th>
      <th class="${classes}">${getTranslation('table.body.contractStart')}</th>
      <th class="syn-table-cell ${index !== 4 ? 'syn-table-cell--border-bottom' : ''}"> 
        <syn-button variant="text" size="small">
          <syn-icon name="edit"></syn-icon>
        </syn-button>
        <syn-button variant="text" size="small">
          <syn-icon name="delete_outline"></syn-icon>
        </syn-button>
      </th>
    </tr>
  `;
    });

    return html`
    <table class="syn-table">
      ${createHeader()}
      <tbody>
        ${borderBody}
      </tbody>
    </table>
  `;
  },
};

export const TableShadowLeftColumn: Story = {
  render: () => {
    const bodyData = repeatFor(() => createBodyRow(false, 'end'));

    return html`
    <table class="syn-table">
      ${createHeader('end')}
      <tbody>
        ${bodyData}
      </tbody>
    </table>
    <style>
      .shadow-cell {
        position: relative;
        z-index: 1;
      }
    </style>
  `;
  },
};

export const TableShadowRightColumn: Story = {
  render: () => {
    const bodyData = repeatFor(() => createBodyRow(false, 'start'));

    return html`
    <table class="syn-table">
      ${createHeader('start')}
      <tbody>
        ${bodyData}
      </tbody>
    </table>
    <style>
      .shadow-cell {
        position: relative;
        z-index: 1;
      }
    </style>
  `;
  },
};

export const TableShadowTopRow: Story = {
  render: () => {
    const bodyData = repeatFor(() => createBodyRow());

    return html`
    <table class="syn-table">
      ${createHeader('bottom')}
      <tbody>
        ${bodyData}
      </tbody>
    </table>
    <style>
      .shadow-cell {
        position: relative;
        z-index: 1;
      }
    </style>
  `;
  },
};
