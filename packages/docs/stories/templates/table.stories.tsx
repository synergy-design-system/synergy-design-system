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
import { generateStoryDescription } from '../../src/helpers/component.js';
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
 * @param background - Cell background color
 * @param shadow - Shadow position
 */
const createBodyRow = (alternate: boolean = false, shadow: 'start' | 'end' | undefined = undefined) => {
  const classes = `syn-table-cell ${alternate ? 'syn-table-cell--alternating' : ''}`;
  const shadowClass = shadow ? `syn-table-cell--shadow-${shadow} shadow-cell` : '';
  const getClassesForColumn = (column: number) => `${classes} ${((shadow === 'end' && column === 0) || (shadow === 'start' && column === 4)) ? shadowClass : ''}`;

  return html`
    <tr>
      <td class="${getClassesForColumn(0)}">${getTranslation('table.body.name')}</td>
      <td class="${getClassesForColumn(1)}">${getTranslation('table.body.customer')}</td>
      <td class="${getClassesForColumn(2)}">${getTranslation('table.body.location')}</td>
      <td class="${getClassesForColumn(3)}">${getTranslation('table.body.contractStart')}</td>
      <td class="${getClassesForColumn(4)} buttons-cell"> 
        <syn-button variant="text" size="small">
          <syn-icon name="edit"></syn-icon>
        </syn-button>
        <syn-button variant="text" size="small">
          <syn-icon name="delete_outline"></syn-icon>
        </syn-button>
      </td>
    </tr>
  `;
};

/**
* Create table product body row
*/
const createBodyRowProduct = () => html`
  <tr>
    <td class="syn-table-cell syn-table-cell--shadow-end shadow-cell">
      <div class="product-cell">
        <img
          class="product-image"
          src="/card-example.jpg"
          alt="Multiple persons having lunch in SICK Academy"
        />
        <div>
          <div>${getTranslation('table.productTable.body.productDetails')}</div>
          <div class="product-name">${getTranslation('table.productTable.body.productName')}</div>
          <div>${getTranslation('table.productTable.body.partNo')}</div> 
        </div>
      </div>
    </td>
    <td class="syn-table-cell">
      <div class="availability">
        <syn-icon class="check_icon" name="check_circle_outline"></syn-icon>
        ${getTranslation('table.productTable.body.availability')}
      </div>
    </td>
    <td class="syn-table-cell">
      ${getTranslation('table.productTable.body.earliestDelivery')}
    </td>
    <td class="syn-table-cell">
      <div class="price">
        <div>${getTranslation('table.productTable.body.listPrice.text')}</div>
        <div>${getTranslation('table.productTable.body.netPrice.text')}</div>  
      </div>
    </td>
    <td class="syn-table-cell">
      <div class="price">
        <div>${getTranslation('table.productTable.body.listPrice.unitPrice')}</div>
        <div>${getTranslation('table.productTable.body.netPrice.unitPrice')}</div>
      </div>
    </td>
    <td class="syn-table-cell">
      <div class="price">
        <div>${getTranslation('table.productTable.body.listPrice.totalPrice')}</div>
        <div>${getTranslation('table.productTable.body.netPrice.totalPrice')}</div>
      </div>
    </td>
    <td class="syn-table-cell"> 
      <syn-button variant="text" size="small">
        <syn-icon name="edit"></syn-icon>
      </syn-button>
      <syn-button variant="text" size="small">
        <syn-icon name="delete_outline"></syn-icon>
      </syn-button>
    </td>
    <td class="syn-table-cell"> 
      <syn-button variant="filled" size="small">
        <syn-icon slot="prefix" name="shopping_cart"></syn-icon>
        ${getTranslation('table.productTable.body.button.cart')}
      </syn-button>
      <syn-button variant="text" size="small">
        <syn-icon slot="suffix" name="keyboard_arrow_right"></syn-icon>
        ${getTranslation('table.productTable.body.button.request')}
      </syn-button>
    </td>
  </tr>
`;

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
        component: generateStoryDescription('templates', 'table'),
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
      <style>
        .buttons-cell {
          padding-top: var(--syn-spacing-2x-small);
          padding-bottom: var(--syn-spacing-2x-small);
          min-width: 76px;
        }
      </style>
    `;
  },
};

export const TableWithAlternatingRows: Story = {
  render: () => {
    const alternateBody = repeatFor((_val, index) => {
      const isAlternating = index % 2 !== 0;
      return createBodyRow(isAlternating);
    });

    return html`
      <table class="syn-table">
        ${createHeader()}
        <tbody>
          ${alternateBody}
        </tbody>
      </table>
      <style>
        .buttons-cell {
          padding-top: var(--syn-spacing-2x-small);
          padding-bottom: var(--syn-spacing-2x-small);
          min-width: 76px;
        }
      </style>
    `;
  },
};

export const TableWithBorders: Story = {
  render: () => {
    const borderBody = repeatFor((_val, index) => {
      const classes = `syn-table-cell syn-table-cell--border-end ${index !== 4 ? 'syn-table-cell--border-bottom' : ''}`;
      return html`
    <tr>
      <td class="${classes}">${getTranslation('table.body.name')}</td>
      <td class="${classes}">${getTranslation('table.body.customer')}</td>
      <td class="${classes}">${getTranslation('table.body.location')}</td>
      <td class="${classes}">${getTranslation('table.body.contractStart')}</td>
      <td class="syn-table-cell buttons-cell ${index !== 4 ? 'syn-table-cell--border-bottom' : ''}"> 
        <syn-button variant="text" size="small">
          <syn-icon name="edit"></syn-icon>
        </syn-button>
        <syn-button variant="text" size="small">
          <syn-icon name="delete_outline"></syn-icon>
        </syn-button>
      </td>
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
      <style>
        .buttons-cell {
          padding-top: var(--syn-spacing-2x-small);
          padding-bottom: var(--syn-spacing-2x-small);
          min-width: 76px;
        }
      </style>
    `;
  },
};

/**
 * If using a table with borders, sticky row and scrolling mechanism together, the 'border-collapse'
 * property should be set to 'separate'. Otherwise the table will have some strange behaviors.
 */
export const TableShadowLeftColumn: Story = {
  render: () => {
    const bodyData = repeatFor(() => createBodyRow(false, 'end'));

    return html`
      <div id="horizontal-scrollable-table">
        <table class="syn-table">
          ${createHeader('end')}
          <tbody>
            ${bodyData}
          </tbody>
        </table>
      </div>
      <style>
        #horizontal-scrollable-table {
          overflow-x: auto;
          width: 550px;
        }

        #horizontal-scrollable-table > table {
          /* Set border-collapse to separate, if using scrolling mechanism together with a table with borders */
          /* border-collapse: separate; */
        }

        #horizontal-scrollable-table .shadow-cell {
          position: sticky;
          left: 0;
          z-index: 1;
        }

        #horizontal-scrollable-table td {
          min-width: 112px;
        }

        #horizontal-scrollable-table .buttons-cell {
          padding-top: var(--syn-spacing-2x-small);
          padding-bottom: var(--syn-spacing-2x-small);
          min-width: 76px;
        }
      </style>
      <script type="module">
        const scrollableTable = document.getElementById('horizontal-scrollable-table');
        const shadowCells = scrollableTable.querySelectorAll('.syn-table-cell--shadow-end');

        scrollableTable.addEventListener('scroll', () => {
          shadowCells.forEach(shadowCell => {
            if (scrollableTable.scrollLeft === 0) {
              shadowCell.classList.remove('syn-table-cell--shadow-active');
            } else {
              shadowCell.classList.add('syn-table-cell--shadow-active');
            }
          });
        });

        scrollableTable.scrollLeft = 20;
      </script>
    `;
  },
};

/**
 * If using a table with borders, sticky row and scrolling mechanism together, the 'border-collapse'
 * property should be set to 'separate'. Otherwise the table will have some strange behaviors.
 */
export const TableShadowRightColumn: Story = {
  render: () => {
    const bodyData = repeatFor(() => createBodyRow(false, 'start'));

    return html`
      <div id="horizontal-scrollable-table2">
        <table class="syn-table">
          ${createHeader('start')}
          <tbody>
            ${bodyData}
          </tbody>
        </table>
      </div>
      <style>
        #horizontal-scrollable-table2 {
          overflow-x: auto;
          width: 550px;
        }

        #horizontal-scrollable-table2 > table {
          /* Set border-collapse to separate, if using scrolling mechanism together with a table with borders */
          /* border-collapse: separate; */
        }

        #horizontal-scrollable-table2 .shadow-cell {
          position: sticky;
          right: 0;
          z-index: 1;
        }

        #horizontal-scrollable-table2 td {
          min-width: 112px;
        }

        #horizontal-scrollable-table2 .buttons-cell {
          padding-top: var(--syn-spacing-2x-small);
          padding-bottom: var(--syn-spacing-2x-small);
          min-width: 76px;
        }
      </style>
      <script type="module">
        const scrollableTable = document.getElementById('horizontal-scrollable-table2');
        const shadowCells = scrollableTable.querySelectorAll('.syn-table-cell--shadow-start');
        const maxScrollX = scrollableTable.scrollWidth - scrollableTable.clientWidth;

        const handleShadow = () => {
          shadowCells.forEach(shadowCell => {
            if (scrollableTable.scrollLeft === maxScrollX) {
              shadowCell.classList.remove('syn-table-cell--shadow-active');
            } else {
              shadowCell.classList.add('syn-table-cell--shadow-active');
            }
          });
        }

        // Initially set shadow on load
        handleShadow();

        scrollableTable.addEventListener('scroll', handleShadow);
      </script>
    `;
  },
};

/**
 * If using a table with borders, sticky row and scrolling mechanism together, the 'border-collapse'
 * property should be set to 'separate'. Otherwise the table will have some strange behaviors.
 */
export const TableShadowTopRow: Story = {
  render: () => {
    const bodyData = repeatFor(() => createBodyRow());

    return html`
      <div id="vertical-scrollable-table">
        <table class="syn-table">
          ${createHeader('bottom')}
          <tbody>
            ${bodyData}
          </tbody>
        </table>
      </div>
      <style>
        #vertical-scrollable-table {
          overflow-y: auto;
          height: 200px;
          width: fit-content;
        }

        #vertical-scrollable-table > table {
          /* Set border-collapse to separate, if using scrolling mechanism together with a table with borders */
          /* border-collapse: separate; */
        }

        #vertical-scrollable-table .shadow-cell {
          position: sticky;
          z-index: 1;
          top: 0;
        }

        .buttons-cell {
          padding-top: var(--syn-spacing-2x-small);
          padding-bottom: var(--syn-spacing-2x-small);
          min-width: 76px;
        }
      </style>
      <script type="module">
        const scrollableTable = document.getElementById('vertical-scrollable-table');
        const shadowCells = scrollableTable.querySelectorAll('.syn-table-cell--shadow-bottom');

        scrollableTable.addEventListener('scroll', () => {
          shadowCells.forEach(shadowCell => {

            if (scrollableTable.scrollTop === 0) {
              shadowCell.classList.remove('syn-table-cell--shadow-active')
            } else {
              shadowCell.classList.add('syn-table-cell--shadow-active'); 
            }
          });
        });

        scrollableTable.scrollTop = 20;
      </script>
    `;
  },
};

export const TableProduct: Story = {
  render: () => {
    const bodyData = repeatFor(() => createBodyRowProduct());

    return html`
      <div id="product-table">
        <table class="syn-table">
          <thead>
            <tr>
              <th class="syn-table-cell--header syn-table-cell--shadow-end shadow-cell">
                ${getTranslation('table.productTable.header.product')}
              </th>
              <th class="syn-table-cell--header">
                ${getTranslation('table.productTable.header.availability')}
              </th>
              <th class="syn-table-cell--header">
                ${getTranslation('table.productTable.header.earliestDelivery')}
              </th>
              <th class="syn-table-cell--header"></th>
              <th class="syn-table-cell--header">
                ${getTranslation('table.productTable.header.unitPrice')}
              </th>
              <th class="syn-table-cell--header">
                ${getTranslation('table.productTable.header.totalPrice')}
              </th>
              <th class="syn-table-cell--header"></th>
              <th class="syn-table-cell--header"></th>
            </tr>
          </thead>
          <tbody>
            ${bodyData}
          </tbody>
        </table>
      </div>
      <script type="module">
      const scrollableTable = document.getElementById('product-table');
        const shadowCells = scrollableTable.querySelectorAll('.syn-table-cell--shadow-end');

        scrollableTable.addEventListener('scroll', () => {
          shadowCells.forEach(shadowCell => {
            if (scrollableTable.scrollLeft === 0) {
              shadowCell.classList.remove('syn-table-cell--shadow-active');
            } else {
              shadowCell.classList.add('syn-table-cell--shadow-active');
            }
          });
        });

        scrollableTable.scrollLeft = 20;
      </script>
      <style>
        #product-table {
          overflow-y: auto;
          width: 900px;
        }

        #product-table .shadow-cell {
          position: sticky;
          z-index: 1;
          left: 0;
        }

        #product-table td {
          min-width: 100px;
        }

        .product-image {
          height: var(--syn-spacing-3x-large);
          width: var(--syn-spacing-3x-large);
          object-fit: cover;
        }

        .product-cell {
          color: var(--syn-typography-color-text);
          display: flex;
          flex-direction: row;
          font: var(--syn-body-x-small-regular);
          gap: var(--syn-spacing-medium);
          width: 230px;
        }

        .product-name {
          color: var(--syn-color-primary-600);
          font: var(--syn-body-medium-semibold);
        }

        .availability {
          display: flex;
          align-items: center;
          gap: var(--syn-spacing-2x-small);
        }

        .check_icon {
          font-size: var(--syn-font-size-medium);
          color: var(--syn-color-success-600);
        }

        .price {
          display: flex;
          flex-direction: column;
          gap: var(--syn-spacing-2x-small);
        }

        .price :nth-child(2) {
          font: var(--syn-body-small-semibold);
        }
      </style>
    `;
  },
};
