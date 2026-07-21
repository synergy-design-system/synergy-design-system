import React from 'react';
import type { Meta } from '@storybook/web-components-vite';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { html, render } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/dialog/dialog.js';
import '../../../components/src/components/fieldset/fieldset.js';
import '../../../components/src/components/icon/icon.js';
import '../../../components/src/components/input/input.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/textarea/textarea.js';
import '../../../components/src/components/tooltip/tooltip.js';
import '../../../components/src/components/validate/validate.js';
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
  render: () => {
    const initialData = Array.from({ length: 3 }, (_, index) => ({
      description: `Description for Item ${index + 1}`,
      id: index + 1,
      name: `Item ${index + 1}`,
      status: 'active',
    }));

    const container = document.createElement('div');
    container.style.minHeight = '450px';

    let state = {
      currentItemId: null as null | number,
      data: [...initialData],
      deleteDialogOpen: false,
      editDialogOpen: false,
      editingDraft: null as null | {
        description: string;
        id: number;
        name: string;
        status: string;
      },
    };

    let view = () => html``;

    const setState = (patch: Partial<typeof state>) => {
      state = { ...state, ...patch };
      render(view(), container);
    };

    const closeDialog = () => {
      setState({
        currentItemId: null,
        deleteDialogOpen: false,
        editDialogOpen: false,
        editingDraft: null,
      });
    };

    const openDelete = (itemId: number) => {
      setState({
        currentItemId: itemId,
        deleteDialogOpen: true,
        editDialogOpen: false,
        editingDraft: null,
      });
    };

    const openEdit = (itemId?: number) => {
      const item = typeof itemId === 'number'
        ? state.data.find(currentItem => currentItem.id === itemId)
        : null;

      const nextItemId = state.data.length > 0
        ? Math.max(...state.data.map(currentItem => currentItem.id)) + 1
        : 1;

      const editingDraft = item ?? {
        description: '',
        id: nextItemId,
        name: '',
        status: 'pending',
      };

      if (typeof itemId === 'number' && !item) {
        return;
      }

      setState({
        currentItemId: editingDraft.id,
        deleteDialogOpen: false,
        editDialogOpen: true,
        editingDraft,
      });
    };

    const confirmDelete = () => {
      if (!state.currentItemId) {
        return;
      }

      setState({ data: state.data.filter(item => item.id !== state.currentItemId) });
      closeDialog();
    };

    const submitEdit = (formData: FormData) => {
      const itemId = Number(formData.get('id'));
      const nameEntry = formData.get('name');
      const descriptionEntry = formData.get('description');
      const statusEntry = formData.get('status');

      const itemName = typeof nameEntry === 'string' ? nameEntry : '';
      const itemDescription = typeof descriptionEntry === 'string' ? descriptionEntry : '';
      const itemStatus = typeof statusEntry === 'string' ? statusEntry : 'pending';

      const existingItem = state.data.find(item => item.id === itemId);
      const updatedItem = {
        description: itemDescription,
        id: itemId,
        name: itemName,
        status: itemStatus,
      };

      setState({
        data: existingItem
          ? state.data.map(item => (item.id === itemId ? updatedItem : item))
          : [...state.data, updatedItem],
      });
      closeDialog();
    };

    const onRequestClose = (e: Event) => {
      const customEvent = e as CustomEvent<{ source: string }>;
      if (customEvent.detail.source === 'overlay') {
        customEvent.preventDefault();
        return;
      }

      closeDialog();
    };

    const onSubmit = (e: Event) => {
      const submitEvent = e as SubmitEvent;
      submitEvent.preventDefault();
      submitEvent.stopPropagation();

      const form = submitEvent.target as HTMLFormElement;
      if (!form.checkValidity()) {
        return;
      }

      submitEdit(new FormData(form));
    };

    const updateEditSubmitState = (form: HTMLFormElement) => {
      const submitButton = container.querySelector('#edit-submit-button');
      const submitTooltip = container.querySelector('#edit-submit-tooltip');
      if (!submitButton || !submitTooltip) {
        return;
      }

      const isValid = form.checkValidity();

      if (isValid) {
        submitButton.removeAttribute('disabled');
        submitTooltip.setAttribute('disabled', '');
        return;
      }

      submitButton.setAttribute('disabled', '');
      submitTooltip.removeAttribute('disabled');
    };

    const onEditFormValidityChange = (e: Event) => {
      const form = e.currentTarget as HTMLFormElement;
      updateEditSubmitState(form);
    };

    const getEditDialogLabel = (
      editingItem: typeof state.editingDraft,
      isEditExistingItem: boolean,
    ) => {
      if (!editingItem) {
        return 'Edit Item';
      }

      return isEditExistingItem
        ? `Edit ${editingItem.name}`
        : `Add ${editingItem.name}`;
    };

    // eslint-disable-next-line complexity
    view = () => {
      const editingItem = state.editingDraft;
      const isEditExistingItem = editingItem
        ? state.data.some(item => item.id === editingItem.id)
        : false;
      const editDialogLabel = getEditDialogLabel(editingItem, isEditExistingItem);
      const editConfirmLabel = isEditExistingItem ? 'Save changes' : 'Add Item';
      const isEditFormValid = Boolean(editingItem?.name?.trim());
      const deleteDialogLabel = state.currentItemId
        ? `Delete Item ${state.currentItemId}?`
        : 'Delete Item';

      return html`
        <table class="item-table syn-table--default">
          <thead>
            <th class="table-id">Id</th>
            <th>Item</th>
            <th>Description</th>
            <th>Status</th>
            <th class="table-action"></th>
          </thead>
          <tbody>
            ${state.data.map(item => html`
              <tr>
                <td class="table-id">${item.id}</td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>${item.status}</td>
                <td class="table-action">
                  <syn-button
                    data-id=${item.id}
                    variant="text"
                    size="small"
                    @click=${() => openEdit(item.id)}
                  >
                    <syn-icon name="edit" label="Edit"></syn-icon>
                  </syn-button>
                  <syn-button
                    data-id=${item.id}
                    variant="text"
                    size="small"
                    @click=${() => openDelete(item.id)}
                  >
                    <syn-icon name="delete" label="Delete"></syn-icon>
                  </syn-button>
                </td>
              </tr>
            `)}
          </tbody>
          <tfoot>
            <tr>
              <th colspan="5">
                <syn-button
                  variant="filled"
                  size="small"
                  @click=${() => openEdit()}
                >
                  Add Item
                </syn-button>
              </th>
            </tr>
          </tfoot>
        </table>

        <!-- Edit Dialog. Will show a form that allows to edit an item -->
        <syn-dialog
          class="edit-dialog"
          .label=${editDialogLabel}
          ?open=${state.editDialogOpen}
          @syn-request-close=${onRequestClose}
          @submit=${onSubmit}
        >
          <form
            method="post"
            id="edit-item-form"
            @change=${onEditFormValidityChange}
            @input=${onEditFormValidityChange}
            @syn-change=${onEditFormValidityChange}
            @syn-input=${onEditFormValidityChange}
          >
            <syn-fieldset legend="Item Details">
              <syn-validate variant="tooltip">
                <syn-input
                  autofocus
                  name="name"
                  label="Name"
                  placeholder="The items name, e.g. Sensor ABC"
                  .value=${editingItem?.name}
                  required
                ></syn-input>
              </syn-validate>

              <syn-validate variant="tooltip">
                <syn-select
                  name="status"
                  label="Status"
                  required
                  .value=${editingItem?.status}
                >
                  <div class="status-help-text" slot="help-text">
                    Defines the status of the item:
                    <ul>
                      <li><strong>Active:</strong> Item can be used</li>
                      <li><strong>Inactive:</strong> Item cannot be used</li>
                      <li><strong>Pending:</strong> Item awaits approval from external source</li>
                    </ul>
                  </div>
                  <syn-option value="active">Active</syn-option>
                  <syn-option value="inactive">Inactive</syn-option>
                  <syn-option value="pending">Pending</syn-option>
                </syn-select>
              </syn-validate>

              <syn-textarea
                name="description"
                label="Description"
                placeholder="A brief description of the item"
                .value=${editingItem?.description}
              ></syn-textarea>
            </syn-fieldset>
            <input type="hidden" name="id" .value=${String(editingItem?.id ?? '')} />
          </form>

          <nav slot="footer">
            <syn-button variant="text" @click=${closeDialog}>Cancel</syn-button>
            <syn-tooltip id="edit-submit-tooltip" content="Please fill out the name and status fields before submitting" ?disabled=${isEditFormValid}>
              <span class="edit-submit-tooltip-trigger">
                <syn-button id="edit-submit-button" variant="filled" form="edit-item-form" type="submit" ?disabled=${!isEditFormValid}>
                  ${editConfirmLabel}
                </syn-button>
              </span>
            </syn-tooltip>
          </nav>
        </syn-dialog>

        <!-- Confirmation Dialog. Will show a confirmation message before deleting an item -->
        <syn-dialog
          class="confirmation-dialog"
          .label=${deleteDialogLabel}
          ?open=${state.deleteDialogOpen}
          @syn-request-close=${onRequestClose}
        >
          <div>Are you sure you want to delete this item? This action cannot be undone.</div>

          <nav slot="footer">
            <syn-button variant="text" @click=${closeDialog}>Cancel</syn-button>
            <syn-button variant="filled" @click=${confirmDelete}>Confirm</syn-button>
          </nav>
        </syn-dialog>

        <style>
        .item-table {
          width: 600px;
          
          td {
            vertical-align: middle;
          }

          .table-id {
            text-align: right;
          }

          .table-action {
            text-align: right;
            white-space: nowrap;
          }

          tfoot th {
            text-align: right;
          }

          .edit-submit-tooltip-trigger {
            display: inline-flex;
          }
        }

        .status-help-text {
          ul {
            margin-bottom: 0;
            padding-inline-start: 2rem;
          }
        }
        </style>
      `;
    };

    render(view(), container);
    return container;
  },
};
