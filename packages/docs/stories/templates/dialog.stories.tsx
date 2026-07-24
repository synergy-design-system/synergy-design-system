import React from 'react';
import type {
  SynDialog,
  SynRequestCloseEvent,
  SynSwitch,
} from '@synergy-design-system/components';
import type { Meta, StoryObj as Story } from '@storybook/web-components-vite';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { html, render } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import '../../../components/src/components/accordion/accordion.js';
import '../../../components/src/components/alert/alert.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/details/details.js';
import '../../../components/src/components/dialog/dialog.js';
import '../../../components/src/components/header/header.js';
import '../../../components/src/components/fieldset/fieldset.js';
import '../../../components/src/components/icon/icon.js';
import '../../../components/src/components/input/input.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/switch/switch.js';
import '../../../components/src/components/textarea/textarea.js';
import '../../../components/src/components/tooltip/tooltip.js';
import '../../../components/src/components/validate/validate.js';
import { generateStoryDescription } from '../../src/helpers/component.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

type DialogFeatureFlags = {
  allowAdd: boolean;
  allowDelete: boolean;
  allowEdit: boolean;
};

type DialogInitialView = 'add' | 'delete' | 'none';

type DialogTemplateConfig = {
  features: DialogFeatureFlags;
  initialView?: DialogInitialView;
};

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
      story: {
        iframeHeight: 800,
        inline: false,
      },
    },
  },
  tags: ['Structure'],
  title: 'Templates/Dialog',
};
export default meta;

const createDialogTemplate = ({ features, initialView = 'none' }: DialogTemplateConfig) => () => {
  const initialData = Array.from({ length: 3 }, (_, index) => ({
    description: `Description for Item ${index + 1}`,
    id: index + 1,
    name: `Item ${index + 1}`,
    status: 'active',
  }));

  const container = document.createElement('div');

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

  if (initialView === 'delete' && features.allowDelete && initialData[0]) {
    state = {
      ...state,
      currentItemId: initialData[0].id,
      deleteDialogOpen: true,
    };
  }

  if (initialView === 'add' && features.allowAdd) {
    state = {
      ...state,
      currentItemId: state.data.length + 1,
      editDialogOpen: true,
      editingDraft: {
        description: '',
        id: state.data.length + 1,
        name: '',
        status: 'pending',
      },
    };
  }

  let view = () => html``;

  const setState = (patch: Partial<typeof state>) => {
    state = { ...state, ...patch };
    render(view(), container);
  };

  const notifyChange = (
    message: string,
    variant: 'success' | 'warning' = 'success',
  ) => {
    const icon = variant === 'warning' ? 'status-warning' : 'status-success';
    const alert = Object.assign(document.createElement('syn-alert'), {
      closable: true,
      duration: 3000,
      innerHTML: `
        <syn-icon slot="icon" name="${icon}" library="system"></syn-icon>
        ${message}
        ${variant === 'warning' ? '<div>Click <strong>Undo</strong> to revert this change.</div>' : ''}
      `,
      variant,
    });

    document.body.append(alert);
    return alert.toast();
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
    if (!features.allowDelete) {
      return;
    }

    setState({
      currentItemId: itemId,
      deleteDialogOpen: true,
      editDialogOpen: false,
      editingDraft: null,
    });
  };

  const openEdit = (itemId?: number) => {
    if (typeof itemId === 'number' && !features.allowEdit) {
      return;
    }

    if (typeof itemId !== 'number' && !features.allowAdd) {
      return;
    }

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
    if (!state.currentItemId || !features.allowDelete) {
      return;
    }

    const nextData = state.data.filter(item => item.id !== state.currentItemId);
    setState({ data: nextData.length > 0 ? nextData : [...initialData] });
    notifyChange('Item successfully deleted', 'success').catch(() => undefined);
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

    if (!existingItem && !features.allowAdd) {
      return;
    }

    if (existingItem && !features.allowEdit) {
      return;
    }

    setState({
      data: existingItem
        ? state.data.map(item => (item.id === itemId ? updatedItem : item))
        : [...state.data, updatedItem],
    });

    if (existingItem) {
      notifyChange('Item successfully updated').catch(() => undefined);
    } else {
      notifyChange('Item successfully added').catch(() => undefined);
    }

    closeDialog();
  };

  const onRequestClose = (e: SynRequestCloseEvent) => {
    if (e.detail.source === 'overlay') {
      e.preventDefault();
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

    if (!isEditExistingItem && !editingItem.name.trim()) {
      return 'Add Item';
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
    const isEditFormValid = Boolean(editingItem?.name?.trim()) && Boolean(editingItem?.status?.trim());
    const deleteDialogLabel = state.currentItemId
      ? `Delete Item ${state.currentItemId}?`
      : 'Delete Item';

    return html`
      <syn-header>
        <span slot="label">Dialog Template</span>
      </syn-header>
      <main>
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
                    ?disabled=${!features.allowEdit}
                    @click=${() => openEdit(item.id)}
                  >
                    <syn-icon name="edit" label="Edit"></syn-icon>
                  </syn-button>
                  <syn-button
                    data-id=${item.id}
                    variant="text"
                    size="small"
                    ?disabled=${!features.allowDelete}
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
                  ?disabled=${!features.allowAdd}
                  @click=${() => openEdit()}
                >
                  Add Item
                </syn-button>
              </th>
            </tr>
          </tfoot>
        </table>
      </main>

      ${features.allowEdit ? html`
        <!-- Edit and Add Dialog Form Example -->
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
      ` : ''}

      ${features.allowDelete ? html`
        <!-- Confirmation Dialog Example -->
        <syn-dialog
          class="confirmation-dialog"
          .label=${deleteDialogLabel}
          ?open=${state.deleteDialogOpen}
          @syn-request-close=${onRequestClose}
        >
          <div>Are you sure you want to delete this item? This action cannot be undone.</div>

          <nav slot="footer">
            <syn-button variant="text" @click=${closeDialog}>Cancel</syn-button>
            <syn-button variant="filled" @click=${confirmDelete}>Delete</syn-button>
          </nav>
        </syn-dialog>
      ` : ''}

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
    `;
  };

  render(view(), container);
  return container;
};

export const ConfirmationDialogs: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'confirmation', 'templates'),
      },
    },
  },
  render: createDialogTemplate({
    features: {
      allowAdd: false,
      allowDelete: true,
      allowEdit: false,
    },
    initialView: 'delete',
  }),
};

export const FormDialogs: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'forms', 'templates'),
      },
    },
  },
  render: createDialogTemplate({
    features: {
      allowAdd: true,
      allowDelete: false,
      allowEdit: true,
    },
    initialView: 'add',
  }),
};

export const ResponsiveDialog: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'responsive', 'templates'),
      },
    },
  },
  render: () => {
    const cookies = [
      // Strictly necessary and functional cookies
      {
        category: 'Strictly necessary and functional cookies',
        description: 'These cookies are necessary for our website to function properly and for using basic website functions. They allow us to determine if you are registered in the online shop and to ensure that you can access secure areas of the website.',
        enabled: true,
        id: 'strictly-necessary-cookies',
        issuer: 'SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch, Germany',
        name: 'Strictly necessary cookies',
        recipient: 'SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch, Germany',
        required: true,
        values: [
          {
            description: 'This cookie stores the access token of the user after a successful login.',
            domains: ['*.sick.com'],
            duration: '1 Day',
            id: 'strictly-necessary-cookies-acceleratorGUID',
            name: 'acceleratorSecureGUID',
          },
          {
            description: 'This cookie stores the access token of the user after a successful login.',
            domains: ['*.sick.com'],
            duration: '1 Day',
            id: 'strictly-necessary-cookies-country',
            name: 'country',
          },
          {
            description: 'When the "Personalization" module is used, the following information is additionally retained from the log data on the basis of the user and/or session ID transmitted by the store in order to enable personalized search results: The user and/or session ID transmitted by the Shop for the Tracking, Analytics and Personalization modules. The interactions in the search result assigned to the user and/or session ID.',
            domains: [],
            duration: 'Session',
            id: 'strictly-necessary-cookies-ff-sessionid',
            name: 'FF_SESSION_ID',
          },
          {
            description: 'This cookie stores the language selection of the user.',
            domains: [],
            duration: '5 Years',
            id: 'strictly-necessary-cookies-language',
            name: 'language',
          },
        ],
      },
      {
        category: 'Strictly necessary and functional cookies',
        description: 'The SICK ID makes available a central user account through which you can register for various digital services offered by companies of the SICK Group and/or utilize these.',
        enabled: true,
        id: 'sick-id',
        issuer: 'SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch, Germany',
        name: 'SICK ID',
        recipient: 'SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch, Germany',
        required: true,
        values: [
          {
            description: 'This cookie stores the assignment of the user to a session of the authentication server (session ID), which bundles several related requests to the server and assigns them to a session.',
            domains: ['id.sick.com'],
            duration: 'Session',
            id: 'sick-id-auth-session-id',
            name: 'AUTH_SESSION_ID, AUTH_SESSION_ID_LEGACY',
          },
          {
            description: 'This cookie stores an encrypted token so that the authentication session can be restarted if a client timeout occurs. Is created when a new authentication session is started.',
            domains: [],
            duration: 'Session',
            id: 'sick-id-restart',
            name: 'KC_RESTART',
          },
          {
            description: 'This cookie stores the ID token of the user and is used for single sign-on between different applications. When logging in, the system first checks whether the KEYCLOAK_IDENTITY cookie is present and validates the JSON Web token.',
            domains: [],
            duration: 'Session',
            id: 'sick-id-keycloack-identity',
            name: 'KEYCLOAK_IDENTITY',
          },
        ],
      },
      {
        category: 'Strictly necessary and functional cookies',
        description: 'We use the tag management system Tealium iQ, a service of Tealium Inc., 11085 Torreyana Road, San Diego, CA 92121, USA, (Tealium), for the dynamic customization of parts of the website. This enables us to monitor the data entry of every provider tag and give our website visitors the opportunity to make decisions about third-party provider access and cookies themselves. Data transferred to Tealium is transferred to the USA and thus to a country outside the EU and the EEA under protection of Standard Contractual Clauses. The legal basis is a legitimate interest under Art. 6 (1) f) GDPR, namely pursuance of our business purposes.',
        enabled: true,
        id: 'tealium-iq',
        issuer: 'SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch, Germany',
        name: 'Tealium iQ (Tag Management System)',
        recipient: 'Tealium Inc., 11095 Torreyana Road, San Diego, CA 92121, USA',
        required: true,
        values: [
          {
            description: 'This cookie stores whether and which cookies the user agrees to by the cookie settings on our pages.',
            domains: ['*.sick.com'],
            duration: '180 Days',
            id: 'tealium-iq-consentmgr',
            name: 'CONSENTMGR',
          },
          {
            description: 'This cookie is used to manage and ensure the correct integration of website and marketing tools or targeting pixels. Anonymous action-related values are generated in the cookie, which do not allow any personal reference but make actions derivable, such as the frequent visit of a unique website within a session or the start time and the duration of stay on our websites.',
            domains: [],
            duration: '1 Year',
            id: 'tealium-iq-utag_main',
            name: 'utag_main',
          },
        ],
      },
      {
        category: 'Strictly necessary and functional cookies',
        description: 'We use Google Tag Manager, a service provided by Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland). Google Tag Manager is used solely for managing and triggering website tags via an interface. Google Tag Manager itself does not set cookies and does not process personal data. Any data processing only takes place through the individual tags implemented via the Tag Manager (e.g., Google Analytics 4, Google Ads). The activation of these tags is based on your consent via our cookie / consent management platform (Art. 6(1)(a) GDPR). If you do not provide consent for statistical or marketing tools, only technically necessary tags will be activated. Data Controller: Google Ireland Limited, Gordon House, 4 Barrow Street, Dublin, D04 E5W5, Ireland Contact of Google’s Data Protection Officer: https://support.google.com/policies/contact/general_privacy_form Additional Information: • Privacy Policy: https://business.safety.google/privacy/ • Cookie Policy: https://policies.google.com/technologies/cookies International Data Transfers: In the context of Google services, data may be transferred to third countries (e.g., the United States). Google relies on the EU Standard Contractual Clauses as legal safeguards for such transfers.',
        enabled: true,
        id: 'google-tag-manager',
        issuer: '',
        name: 'Google Tag Manager',
        recipient: '',
        required: true,
      },
      {
        category: 'Strictly necessary and functional cookies',
        description: 'We use the chat software from Lime Connect (Userlike) GmbH, Im Mediapark 8, 14. OG, 50670 Cologne, Germany. Lime Connect uses cookies to provide you with a personal real-time chat. You can find Lime Connect privacy policy here: https://www.Lime Connect.com/en/terms#privacy-policy',
        enabled: true,
        id: 'lime-connect-chat',
        issuer: 'SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch, Germany',
        name: 'Lime Connect Chat',
        recipient: 'Lime Connect (Userlike) GmbH, Im Mediapark 8, 14. OG, 50670 Köln, Germany',
        required: true,
        values: [
          {
            description: 'In addition to technical details about the Messenger status, the cookie contains IDs for existing contacts so that they can be recognized ("reauth", "uuid", "token"). Furthermore, we set a LocalStorage variable with the same name, this contains technical information about the widget and its status. Furthermore, it reflects the number of page visits and page views ("page_impressions", "visits"). Furthermore, we set an email and name variable with the email and name of your logged in user account.',
            domains: ['www.sick.com'],
            duration: '1 Year',
            id: 'lime-connect-chat-uslk_umm',
            name: 'uslk_umm_{organization-id}_s',
          },
        ],
      },
      // End: Strictly necessary and functional cookies

      // Marketing
      {
        category: 'Marketing Cookies',
        description: 'We use these cookies of the Adobe Analytics web analysis tool to collect general, non-personal information about the use of the website, such as the number and duration of visits and which browsers and screen resolutions are used to view the site. We use this information to optimize our website. If wish to opt out of the anonymous data aggregation and analysis, you can install the following Adobe Opt-Out-Cookies on your computer: http://www.112.2o7.net/optout.html?omniture=1&popup=1&locale=en_US&optout=1&second=1&second_has_cookie=1',
        enabled: false,
        id: 'adobe-analytics',
        issuer: 'SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch, Germany',
        name: 'Adobe Analytics',
        recipient: 'Adobe Systems Software Ireland Limited, 4-6 Riverwalk, City West Business Campus, Saggart, Dublin 24, Irland',
        required: false,
        values: [
          {
            description: 'This cookie stores if cookies have been enabled by the user.',
            domains: ['*.sick.com'],
            duration: 'Session',
            id: 'adobe-analytics-s_cc',
            name: 's_cc',
          },
          {
            description: 'This cookie stores a random, uniquely generated ID to recognize a user\'s return visit to the site (Unique Visitor ID, time/date stamp) when the default s_vi cookie is not available due to third-party cookie restrictions.',
            domains: [],
            duration: '5 years',
            id: 'adobe-analytics-s_fid',
            name: 's_fid',
          },
          {
            description: 'This cookie stores information about the previous link clicked by the user.',
            domains: [],
            duration: 'Session',
            id: 'adobe-analytics-s_sq',
            name: 's_sq',
          },
        ],
      },
      {
        category: 'Marketing Cookies',
        description: 'Website / App Feedback from Qualtrics (Qualtrics LLC, 333 W. River Park Drive, Provo, UT 84604, USA; “Qualtrics”) stores certain data inside cookies. This includes the Site History cookie, Prevent Repeated Display cookie, a cookie that tells us that we have a Pop Under, a cookie that stores history data if localStorage is disabled, and a cookie that tracks user events. We use these cookies to enable us to provide pop-up questionnaires to you or enable you to provide feedback using surveys.',
        enabled: false,
        id: 'qualtrics',
        issuer: 'SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch, Germany',
        name: 'Qualtrics Website-/App-Feedback',
        recipient: 'Qualtrics LLC, 333 W. River Park Drive, Provo, UT 84604, USA',
        required: false,
        values: [
          {
            description: 'Appears when the Prevent multiple submissions option is enabled. The purpose of this cookie is to record the survey taken and prevent the user from taking the survey again. This cookie allows Qualtrics to keep track of when an incomplete survey should be recorded as a response.',
            domains: ['www.sick.com'],
            duration: '1 Year',
            id: 'qualtrics-qst',
            name: 'QST',
          },
          {
            description: 'The Survey ID cookie appears when you have both Allow respondents to finish later and Prevent multiple submissions disabled in the survey options before starting a survey session.',
            domains: [],
            duration: 'Session',
            id: 'qualtrics-surveyid',
            name: 'surveyid',
          },
          {
            description: 'This cookie is placed when you start a survey session on the same browser where you are working on another one.',
            domains: [],
            duration: '1 Year',
            id: 'qualtrics-query-parameters',
            name: '{sessionid-hash}-{query-parameters}',
          },
        ],
      },
    ];

    const groupedCookies = cookies.reduce((acc, cookie) => {
      if (!acc[cookie.category]) {
        acc[cookie.category] = [];
      }
      acc[cookie.category].push(cookie);
      return acc;
    }, {} as Record<string, typeof cookies>);

    return html`
      <syn-header label="Complex Cookie Banner"></syn-header>
      <main class="cookie-banner-template">
        <syn-button
          @click=${async () => {
            await document.querySelector<SynDialog>('.cookie-banner-dialog')?.show();
          }}
          variant="filled"
        >
          Open cookie banner
        </syn-button>

        <!-- Example of a complex form dialog with accordion and details components -->
        <syn-dialog
          class="cookie-banner-dialog"
          open
          label="Settings for cookies"
          @syn-request-close=${(e: SynRequestCloseEvent) => {
            if (e.detail.source === 'overlay' || e.detail.source === 'keyboard') {
              e.preventDefault();
            }
          }}
        >
          <form method="post">
            <syn-fieldset description="Please choose which cookies you would like to enable. You can change the settings at any time.">
              <syn-accordion>
                ${Object.entries(groupedCookies).map(([group, categories]) => html`
                  <syn-details summary="${group}">
                    <table class="syn-table--default cookie-table">
                      <thead>
                        <th class="cookie-column">Cookie</th>
                        <th class="purpose-column">Purpose</th>
                        <th class="enabled-column">Enabled</th>
                      </thead>
                      <tbody>
                        ${categories.map(category => html`
                          <tr class="cookie-row">
                            <td class="cookie-name-cell">
                              ${!category.required
                                ? html`
                                  <label
                                    @click=${(e: MouseEvent) => {
                                      const target = e.currentTarget as HTMLLabelElement;
                                      const checkbox = document.querySelector<SynSwitch>(`#${target.htmlFor}`);

                                      if (!checkbox) {
                                        return;
                                      }

                                      checkbox.checked = !checkbox.checked;
                                    }}
                                    for="${`switch-${category.id}`}"
                                  >
                                    ${category.name}
                                  </label>
                                `
                                : html`${category.name}`
                              }
                            </td>
                            <td class="cookie-purpose-cell">
                              <p class="cookie-description">${category.description}</p>
                              ${(category.values?.length ?? 0) > 0
                                ? html`
                                  <syn-button
                                    class="cookie-details-toggle"
                                    @click=${(e: MouseEvent) => {
                                      const target = e.currentTarget as HTMLElement;
                                      const id = target.getAttribute('data-id');
                                      const dialog = target.closest('syn-dialog');
                                      const relatedTarget = dialog?.querySelector<HTMLTableRowElement>(`#details-${id}`);

                                      if (!relatedTarget) {
                                        return;
                                      }

                                      const currentStyle = relatedTarget.style.display;
                                      let newStyle = 'none';
                                      let buttonText = 'Show details';

                                      if (currentStyle === 'none') {
                                        newStyle = 'table-row';
                                        buttonText = 'Hide details';
                                      }

                                      target.textContent = buttonText;
                                      relatedTarget.style.display = newStyle;
                                    }}
                                    data-id="${category.id}"
                                    variant="text"
                                    size="small"
                                  >
                                    Show details
                                  </syn-button>
                                ` : ''
                              }
                            </td>
                            <td class="cookie-switch-cell">
                              <syn-tooltip
                                content=${category.required ? 'This cookie is required and cannot be disabled.' : ''}
                                ?disabled=${!category.required}
                                trigger="hover"
                              >
                                <syn-switch
                                  ?checked=${category.enabled}
                                  id="${`switch-${category.id}`}"
                                  name="${category.name}"
                                  ?readonly=${category.required}
                                ></syn-switch>
                              </syn-tooltip>
                            </td>
                          </tr>

                          <!-- Cookie details -->
                          ${(category.values?.length ?? 0) > 0
                            ? html`
                              <tr class="cookie-details-row" id="details-${category.id}" style="display: none;">
                                <td class="cookie-details" colspan="3">
                                  <div class="cookie-details-list">
                                    <table class="cookie-details-table syn-table--default">
                                      <thead>
                                        <tr>
                                          <th>Cookie name</th>
                                          <th>Purpose of processing</th>
                                          <th>Responsible party</th>
                                          <th>Recipient of data</th>
                                          <th>Duration of processing</th>
                                          <th>Applicable domains</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        ${category.values!.map((value, index) => html`
                                          <tr>
                                            <td data-column-label="Cookie name">${value.name}</td>
                                            <td data-column-label="Purpose of processing">${value.description}</td>
                                            ${index === 0
                                              ? html`
                                                <td data-column-label="Responsible party" rowspan="${category.values!.length}">${category.issuer}</td>
                                                <td data-column-label="Recipient of data" rowspan="${category.values!.length}">${category.recipient}</td>
                                              `
                                              : ''
                                            }
                                            <td data-column-label="Duration of processing">${value.duration}</td>
                                            <td data-column-label="Applicable domains">${value.domains.join(', ')}</td>
                                          </tr>
                                        `)}
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            `
                            : ''
                          }
                        `)}
                      </tbody>
                    </table>
                  </syn-details>
                `)}
              </syn-accordion>
            </syn-fieldset>
          </form>

          <nav slot="footer" class="cookie-footer">
            <a
              class="syn-link syn-link--medium"
              href="https://www.sick.com/de/de/sick-datenschutzerklaerung/w/dataprotection"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <syn-button variant="text">Save settings</syn-button>
            <syn-button variant="filled">Allow and continue</syn-button>
          </nav>
        </syn-dialog>
      </main>
      <style>
      .cookie-banner-template {
        background: var(--syn-page-background-color);
        container-type: inline-size;
        container-name: cookie-banner-template;
        padding: var(--syn-spacing-large);
      }

      .cookie-banner-dialog {
        --cookie-details-label-width: 180px;
        --cookie-row-border: var(--syn-border-width-small) solid var(--syn-table-border-color);
        --cookie-summary-label-width: 200px;
        --width: 1024px;

        /* Hide the close button for this example, since we want to force the user to make a choice */
        &::part(close-button) {
          display: none;
        }

        .cookie-table {
          > tbody > tr.cookie-row:has(~ tr.cookie-row) > td {
            border-bottom: var(--cookie-row-border);
          }

          .cookie-column,
          .cookie-name-cell {
            font: var(--syn-body-small-semibold);
            width: var(--cookie-summary-label-width);
          }

          .enabled-column {
            text-align: right;
          }

          .cookie-switch-cell {
            text-align: right;
          }

          .cookie-description {
            margin: 0;
          }

          /* Synergy Text Buttons have some spacing around them, so we need to adjust their position to match the text start */
          .cookie-details-toggle {
            position: relative;
            margin-top: var(--syn-spacing-small);
            margin-left: calc(var(--syn-spacing-small) * -1);
          }

          label {
            cursor: pointer;
          }

          /* Remove gap in switch when it does not use a label */
          syn-switch:not([label])::part(label) {
            display: none;
          }

          .cookie-details {
            padding: 0;

            .cookie-details-list {
              display: grid;
              gap: var(--syn-spacing-small);
            }

            .cookie-details-table {
              width: 100%;
              border-bottom: var(--cookie-row-border);
              border-spacing: 0;
              margin-bottom: var(--syn-spacing-medium);

              th,
              td {
                background: var(--syn-table-background-color);
                vertical-align: top;
              }

              th {
                font: var(--syn-body-small-semibold);
              }
            }
          }
        }

        .cookie-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          & > :first-child {
            margin-right: auto;
          }
        }
      }

      /* Mobile views */
      @container cookie-banner-template (max-width: 500px) {
        .cookie-banner-dialog {
          &::part(panel) {
            max-height: 95dvh;
          }

          .cookie-footer {
            align-items: center;
            column-gap: var(--syn-spacing-small);
            flex-wrap: wrap;
            row-gap: var(--syn-spacing-small);

            & > :first-child {
              flex-basis: 100%;
              margin: 0 var(--syn-spacing-medium);
              text-align: left;
            }
          }
        }
      }

      @container cookie-banner-template (max-width: 1024px) {
        .cookie-banner-dialog {
          --width: 100%;

          .cookie-table {
            display: flex;
            flex-direction: column;

            .cookie-details-table {
              width: 100%;

              thead {
                display: none;
              }

              tbody,
              tbody tr {
                display: block;
              }

              tbody tr {
                border-bottom: var(--cookie-row-border);
                display: flex;
                flex-direction: column;
                gap: var(--syn-spacing-2x-small);
                height: auto;
                padding-bottom: var(--syn-spacing-small);
                margin-bottom: var(--syn-spacing-small);
              }

              tbody tr > td {
                align-items: baseline;
                column-gap: var(--syn-spacing-small);
                display: grid;
                grid-template-columns: var(--cookie-details-label-width) minmax(0, 1fr);
                height: auto;
                min-height: 0;
                overflow: visible;
                white-space: normal;
                text-align: start;
                padding: 0;
              }

              tbody tr > td::before {
                content: attr(data-column-label);
                font: var(--syn-body-small-semibold);
              }
            }

            > thead {
              display: none;
            }

            > tbody > tr {
              border-bottom: var(--cookie-row-border);
              margin-bottom: var(--syn-spacing-medium);

              > td {
                width: 100% !important;
                border: none !important;
                padding: 0;
              }

              &.cookie-row {
                align-items: baseline;
                column-gap: var(--syn-spacing-medium);
                display: grid;
                grid-template-columns: 1fr auto;
                grid-template-areas:
                  'name switch'
                  'description description';
              }

              &.cookie-row > .cookie-name-cell {
                grid-area: name;
              }

              &.cookie-row > .cookie-purpose-cell {
                height: auto;
                grid-area: description;
                grid-column: 1 / -1;
                padding-top: var(--syn-spacing-small);
              }

              &.cookie-row > .cookie-switch-cell {
                grid-area: switch;
              }
            }
          }
        }
      }
      </style>
    `;
  },
};

export const ResponsiveDialogTablet = {
  ...ResponsiveDialog,
  globals: {
    viewport: { value: 'tablet' },
  },
  name: '↳ Tablet',
  parameters: {
    controls: {
      exclude: ['default'],
    },
    docs: {
      disable: true,
    },
  },
};

export const ResponsiveDialogSmartphone = {
  ...ResponsiveDialog,
  globals: {
    viewport: { value: 'mobile2' },
  },
  name: '↳ Smartphone',
  parameters: {
    controls: {
      exclude: ['default'],
    },
    docs: {
      disable: true,
    },
  },
};
