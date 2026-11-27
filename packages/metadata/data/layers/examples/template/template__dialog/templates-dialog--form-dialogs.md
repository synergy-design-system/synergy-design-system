## Form Dialogs

Form-focused dialog pattern for create and edit flows. Structure the dialog around required inputs and gate the primary submit action by form validity so incomplete data cannot be submitted. Keep a clear secondary Cancel action so users can always exit without saving. In this example, Add and Edit are enabled, while destructive delete is intentionally separated and disabled.

```html
<div data-dialog-instance="form-dialogs">
  <syn-header>
    <span slot="label">Dialog Template</span>
  </syn-header>
  <main>
    <table class="item-table syn-table--default">
      <thead>
        <tr>
          <th class="table-id">Id</th>
          <th>Item</th>
          <th>Description</th>
          <th>Status</th>
          <th class="table-action"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="table-id">1</td>
          <td>Item 1</td>
          <td>Description for Item 1</td>
          <td>active</td>
          <td class="table-action">
            <syn-button
              data-action="edit"
              variant="text"
              size="small"
              data-id="1"
            >
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button
              data-action="delete"
              variant="text"
              size="small"
              data-id="1"
              disabled=""
            >
              <syn-icon name="delete" label="Delete"></syn-icon>
            </syn-button>
          </td>
        </tr>

        <tr>
          <td class="table-id">2</td>
          <td>Item 2</td>
          <td>Description for Item 2</td>
          <td>active</td>
          <td class="table-action">
            <syn-button
              data-action="edit"
              variant="text"
              size="small"
              data-id="2"
            >
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button
              data-action="delete"
              variant="text"
              size="small"
              data-id="2"
              disabled=""
            >
              <syn-icon name="delete" label="Delete"></syn-icon>
            </syn-button>
          </td>
        </tr>

        <tr>
          <td class="table-id">3</td>
          <td>Item 3</td>
          <td>Description for Item 3</td>
          <td>active</td>
          <td class="table-action">
            <syn-button
              data-action="edit"
              variant="text"
              size="small"
              data-id="3"
            >
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button
              data-action="delete"
              variant="text"
              size="small"
              data-id="3"
              disabled=""
            >
              <syn-icon name="delete" label="Delete"></syn-icon>
            </syn-button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="5">
            <syn-button data-action="add" variant="filled" size="small">
              Add Item
            </syn-button>
          </th>
        </tr>
      </tfoot>
    </table>
  </main>

  <!-- Edit and Add Dialog Form Example -->
  <syn-dialog class="edit-dialog">
    <form method="post" id="edit-item-form">
      <syn-fieldset legend="Item Details">
        <syn-validate variant="tooltip" on="live">
          <syn-input
            autofocus=""
            name="name"
            label="Name"
            placeholder="The items name, e.g. Sensor ABC"
            required=""
          ></syn-input>
        </syn-validate>

        <syn-select name="status" label="Status" required="">
          <div class="status-help-text" slot="help-text">
            Defines the status of the item:
            <ul>
              <li><strong>Active:</strong> Item can be used</li>
              <li><strong>Inactive:</strong> Item cannot be used</li>
              <li>
                <strong>Pending:</strong> Item awaits approval from external
                source
              </li>
            </ul>
          </div>
          <syn-option value="active">Active</syn-option>
          <syn-option value="inactive">Inactive</syn-option>
          <syn-option value="pending">Pending</syn-option>
        </syn-select>

        <syn-textarea
          name="description"
          label="Description"
          placeholder="A brief description of the item"
        ></syn-textarea>
      </syn-fieldset>
      <input type="hidden" name="id" />
    </form>

    <nav slot="footer">
      <syn-button data-action="cancel" variant="text">Cancel</syn-button>
      <syn-tooltip
        id="edit-submit-tooltip"
        content="Please fill out the name and status fields before submitting"
      >
        <span class="edit-submit-tooltip-trigger">
          <syn-button
            id="edit-submit-button"
            variant="filled"
            form="edit-item-form"
            type="submit"
            disabled=""
          >
            Add Item
          </syn-button>
        </span>
      </syn-tooltip>
    </nav>
  </syn-dialog>

  <style>
    main {
      background: var(--syn-page-background-color);
      padding: var(--syn-spacing-large);
    }

    .item-table {
      width: 100%;

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
  <script type="module">
    const root = document.querySelector(
      '[data-dialog-instance="form-dialogs"]',
    );
    const features = { allowAdd: true, allowDelete: false, allowEdit: true };
    const initialView = "add";
    const initialData = [
      {
        description: "Description for Item 1",
        id: 1,
        name: "Item 1",
        status: "active",
      },
      {
        description: "Description for Item 2",
        id: 2,
        name: "Item 2",
        status: "active",
      },
      {
        description: "Description for Item 3",
        id: 3,
        name: "Item 3",
        status: "active",
      },
    ];

    let data = initialData.map((item) => ({ ...item }));
    let currentDeleteId = null;
    let editingIsExisting = false;

    const table = root.querySelector(".item-table");
    const tbody = table.querySelector("tbody");
    const editDialog = root.querySelector(".edit-dialog");
    const confirmationDialog = root.querySelector(".confirmation-dialog");
    const editForm = root.querySelector("#edit-item-form");
    const nameInput = editForm?.querySelector('syn-input[name="name"]');
    const nameValidator = nameInput?.closest("syn-validate");
    const statusSelect = editForm?.querySelector('syn-select[name="status"]');
    const descriptionTextarea = editForm?.querySelector(
      'syn-textarea[name="description"]',
    );
    const idInput = editForm?.querySelector('input[name="id"]');
    const submitButton = root.querySelector("#edit-submit-button");
    const submitTooltip = root.querySelector("#edit-submit-tooltip");

    const nextItemId = () =>
      data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;

    const renderRow = (item) =>
      [
        "<tr>",
        '<td class="table-id">' + item.id + "</td>",
        "<td>" + item.name + "</td>",
        "<td>" + item.description + "</td>",
        "<td>" + item.status + "</td>",
        '<td class="table-action">',
        '<syn-button data-action="edit" data-id="' +
          item.id +
          '" variant="text" size="small"' +
          (features.allowEdit ? "" : " disabled") +
          ">",
        '<syn-icon name="edit" label="Edit"></syn-icon>',
        "</syn-button>",
        '<syn-button data-action="delete" data-id="' +
          item.id +
          '" variant="text" size="small"' +
          (features.allowDelete ? "" : " disabled") +
          ">",
        '<syn-icon name="delete" label="Delete"></syn-icon>',
        "</syn-button>",
        "</td>",
        "</tr>",
      ].join("");

    const renderTable = () => {
      tbody.innerHTML = data.map(renderRow).join("");
    };

    const showToast = (message) => {
      const alert = Object.assign(document.createElement("syn-alert"), {
        closable: true,
        duration: 3000,
        innerHTML:
          '<syn-icon slot="icon" name="status-success" library="system"></syn-icon>' +
          message,
        variant: "success",
      });

      document.body.append(alert);
      alert.toast();
    };

    const updateEditDialogLabel = () => {
      if (!editDialog) {
        return;
      }

      const name = nameInput ? nameInput.value.trim() : "";
      editDialog.label =
        !editingIsExisting && !name
          ? "Add Item"
          : (editingIsExisting ? "Edit " : "Add ") + name;
    };

    const updateSubmitState = () => {
      const isValid =
        Boolean(nameInput?.validity.valid) &&
        Boolean(statusSelect?.validity.valid);

      if (submitButton) {
        submitButton.disabled = !isValid;
      }

      if (submitTooltip) {
        submitTooltip.disabled = isValid;
      }

      updateEditDialogLabel();
    };

    const revalidateAfterProgrammaticFill = (control) => {
      control?.updateComplete?.then(() => {
        control.dispatchEvent(
          new Event("syn-input", { bubbles: true, composed: true }),
        );
      });
    };

    const resetEditFormState = () => {
      if (editDialog?.open) {
        return;
      }

      editForm?.reset();
      editingIsExisting = false;

      if (nameValidator) {
        nameValidator.isValid = true;
        nameValidator.validationMessage = "";
        nameValidator.hasFocus = false;
        nameValidator.requestUpdate();
      }

      updateSubmitState();
    };

    const fillForm = (item) => {
      if (nameInput) {
        nameInput.value = item.name;
      }

      if (statusSelect) {
        statusSelect.value = item.status;
      }

      if (descriptionTextarea) {
        descriptionTextarea.value = item.description;
      }

      if (idInput) {
        idInput.value = String(item.id);
      }

      updateSubmitState();

      if (item.name) {
        revalidateAfterProgrammaticFill(nameInput);
      }
    };

    const openAddDialog = () => {
      if (!features.allowAdd || !editDialog) {
        return;
      }

      editingIsExisting = false;
      fillForm({
        description: "",
        id: nextItemId(),
        name: "",
        status: "pending",
      });
      submitButton.textContent = "Add Item";
      editDialog.show();
    };

    const openEditDialog = (itemId) => {
      const item = data.find((entry) => entry.id === itemId);
      if (!features.allowEdit || !editDialog || !item) {
        return;
      }

      editingIsExisting = true;
      fillForm(item);
      submitButton.textContent = "Save changes";
      editDialog.show();
    };

    const openDeleteDialog = (itemId) => {
      if (!features.allowDelete || !confirmationDialog) {
        return;
      }

      currentDeleteId = itemId;
      confirmationDialog.label = "Delete Item " + itemId + "?";
      confirmationDialog.show();
    };

    const closeDialogs = () => {
      editDialog?.hide();
      confirmationDialog?.hide();
      currentDeleteId = null;
    };

    const confirmDeleteItem = () => {
      if (currentDeleteId === null || !features.allowDelete) {
        return;
      }

      const nextData = data.filter((item) => item.id !== currentDeleteId);
      data =
        nextData.length > 0
          ? nextData
          : initialData.map((item) => ({ ...item }));
      renderTable();
      showToast("Item successfully deleted");
      closeDialogs();
    };

    const submitEditItem = (formData) => {
      const itemId = Number(formData.get("id"));
      const existingItem = data.find((item) => item.id === itemId);

      if (!existingItem && !features.allowAdd) {
        return;
      }

      if (existingItem && !features.allowEdit) {
        return;
      }

      const updatedItem = {
        description: String(formData.get("description") || ""),
        id: itemId,
        name: String(formData.get("name") || ""),
        status: String(formData.get("status") || "pending"),
      };

      data = existingItem
        ? data.map((item) => (item.id === itemId ? updatedItem : item))
        : [...data, updatedItem];

      renderTable();
      showToast(
        existingItem ? "Item successfully updated" : "Item successfully added",
      );
      closeDialogs();
    };

    table.addEventListener("click", (event) => {
      const target = event.target.closest("syn-button[data-action]");
      if (!target) {
        return;
      }

      const { action, id } = target.dataset;
      if (action === "add") {
        openAddDialog();
      } else if (action === "edit") {
        openEditDialog(Number(id));
      } else if (action === "delete") {
        openDeleteDialog(Number(id));
      }
    });

    [editDialog, confirmationDialog].forEach((dialog) => {
      if (!dialog) {
        return;
      }

      dialog.addEventListener("syn-request-close", (event) => {
        if (event.detail.source === "overlay") {
          event.preventDefault();
          return;
        }

        closeDialogs();
      });

      dialog.addEventListener("click", (event) => {
        const target = event.target.closest("syn-button[data-action]");
        if (!target) {
          return;
        }

        if (target.dataset.action === "cancel") {
          closeDialogs();
        } else if (target.dataset.action === "confirm-delete") {
          confirmDeleteItem();
        }
      });
    });

    editDialog?.addEventListener("syn-after-hide", resetEditFormState);

    editForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!editForm.checkValidity()) {
        return;
      }

      submitEditItem(new FormData(editForm));
    });

    editForm?.addEventListener("input", updateSubmitState);
    editForm?.addEventListener("syn-input", updateSubmitState);

    if (initialView === "delete" && data[0]) {
      openDeleteDialog(data[0].id);
    } else if (initialView === "add") {
      openAddDialog();
    }
  </script>
</div>
```
