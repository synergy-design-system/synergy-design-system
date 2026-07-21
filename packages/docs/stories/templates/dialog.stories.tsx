import React from 'react';
import type { Meta } from '@storybook/web-components-vite';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { html } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/dialog/dialog.js';
import '../../../components/src/components/icon/icon.js';
import '../../../components/src/components/input/input.js';
import { generateStoryDescription } from '../../src/helpers/component.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const meta: Meta = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
      modes: Chromatic_Modes_All,
    },
    docs: {
      description: {
        component: generateStoryDescription('dialog', 'default', 'templates'),
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories title="" />
        </>
      ),
    },
  },
  tags: ['Structure'],
  title: 'Templates/Dialog',
};
export default meta;

export const ConfirmationDialog = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'confirmation', 'templates'),
      },
    },
  },
  render: () => html`
    <table class="item-table syn-table--default">
      <thead>
        <th class="table-id">Id</th>
        <th>Item</th>
        <th>Description</th>
        <th>Status</th>
        <th class="table-action">Edit</th>
        <th class="table-action">Delete</th>
      </thead>
      <tbody>
        <tr>
          <td colspan="5">Table of Items</td>
        </tr>
      </tbody>
    </table>
    <syn-dialog
      class="confirmation-dialog"
      label="Delete Item"
    >
      <div id="dialog-content"></div>
      <nav slot="footer">
        <syn-button variant="text">Cancel</syn-button>
        <syn-button variant="filled">Confirm</syn-button>
      </nav>
    </syn-dialog>
    <style>
    .item-table {
      width: 400px;
      
      td {
        vertical-align: middle;
      }

      .table-id {
        text-align: right;
      }

      .table-action {
        text-align: center;
      }
    }
    </style>
    <script>
    let data = new Array(5)
      .fill(undefined)
      .map((_, index) => ({
        description: 'Description for Item ' + (index + 1),
        status: 'active',
        id: index + 1,
        name: 'Item ' + (index + 1),
      }));

    let currentItemId = null;

    const tableBody = document.querySelector('table.item-table tbody');
    const dialog = document.querySelector('.confirmation-dialog');
    const dialogContent = document.getElementById('dialog-content');
    const cancelButton = dialog.querySelector('syn-button[variant="text"]');
    const confirmButton = dialog.querySelector('syn-button[variant="filled"]');

    updateTable = items => {
      const rows = items.map(item => {
        const row = document.createElement('tr');
        row.innerHTML = \`
          <td class="table-id">\${item.id}</td>
          <td>\${item.name}</td>
          <td>\${item.description}</td>
          <td>\${item.status}</td>
          <td class="table-action">
            <syn-button data-id="\${item.id}" variant="text" data-action="edit">
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
          </td>
          <td class="table-action">
            <syn-button data-id="\${item.id}" variant="text" data-action="delete">
              <syn-icon name="delete" label="Delete"></syn-icon>
            </syn-button>
          </td>
        \`;
        return row;
      });
      tableBody.innerHTML = '';
      rows.forEach(row => tableBody.appendChild(row));
    };

    const editItem = itemId => {
      const item = data.find(item => item.id == itemId);

      if (!item) {
        return;
      }

      const form = \`
        <form method="post">
          <syn-input name="name" label="Name" value="\${item.name}"></syn-input>
        </form>
      \`;

      dialogContent.innerHTML = form;
      dialog.label = "Edit Item " + itemId;
      dialog.open = true;
    };

    updateTable(data);

    tableBody.addEventListener('click', e => {
      const button = e.target.closest('syn-button');
      if (button && button.dataset.id) {
        const action = button.dataset.action;
        const itemId = button.dataset.id;

        if (action === 'delete') {
          dialog.label = "Delete Item " + itemId + "?";
          dialogContent.innerHTML = "Are you sure you want to delete this item? This action cannot be undone.";
          dialog.open = true;
          currentItemId = itemId;
        }

        if (action === 'edit') {
          editItem(itemId);
        }
      }
    });

    // Allows closing via the close button, but not via the overlay click
    cancelButton.addEventListener('click', () => {
      dialog.requestClose('close-button');
      currentItemId = null;
    });

    // Deletion of the item and closing the dialog
    confirmButton.addEventListener('click', () => {
      data = data.filter(item => item.id != currentItemId);
      updateTable(data);
      dialog.requestClose('close-button');
      currentItemId = null;
    });

    dialog.addEventListener('syn-request-close', e => {
      if (event.detail.source === 'overlay') {
        e.preventDefault();
      }
    });
    </script>
  `,
};
