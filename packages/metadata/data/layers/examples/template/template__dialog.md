## Confirmation Dialogs

Use this pattern to confirm a user action. Confirmation dialogs are used to ensure that users do not accidentally perform an action that may have significant consequences, such as deleting important data or making irreversible changes. The confirmation dialog typically presents the user with a clear message about the action they are about to take, along with options to either proceed or cancel. This helps prevent mistakes and provides an opportunity for users to reconsider their decision before committing to it.

```html
<div>
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
            <syn-button variant="text" size="small" data-id="1" disabled="">
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button variant="text" size="small" data-id="1">
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
            <syn-button variant="text" size="small" data-id="2" disabled="">
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button variant="text" size="small" data-id="2">
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
            <syn-button variant="text" size="small" data-id="3" disabled="">
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button variant="text" size="small" data-id="3">
              <syn-icon name="delete" label="Delete"></syn-icon>
            </syn-button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="5">
            <syn-button variant="filled" size="small" disabled="">
              Add Item
            </syn-button>
          </th>
        </tr>
      </tfoot>
    </table>
  </main>

  <!-- Confirmation Dialog Example -->
  <syn-dialog class="confirmation-dialog" open="">
    <div>
      Are you sure you want to delete this item? This action cannot be undone.
    </div>

    <nav slot="footer">
      <syn-button variant="text">Cancel</syn-button>
      <syn-button variant="filled">Delete</syn-button>
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
</div>
```

---

## Form Dialogs

Form-focused dialog pattern for create and edit flows. Structure the dialog around required inputs and gate the primary submit action by form validity so incomplete data cannot be submitted. Keep a clear secondary Cancel action so users can always exit without saving. In this example, Add and Edit are enabled, while destructive delete is intentionally separated and disabled.

```html
<div>
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
            <syn-button variant="text" size="small" data-id="1">
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button variant="text" size="small" data-id="1" disabled="">
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
            <syn-button variant="text" size="small" data-id="2">
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button variant="text" size="small" data-id="2" disabled="">
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
            <syn-button variant="text" size="small" data-id="3">
              <syn-icon name="edit" label="Edit"></syn-icon>
            </syn-button>
            <syn-button variant="text" size="small" data-id="3" disabled="">
              <syn-icon name="delete" label="Delete"></syn-icon>
            </syn-button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="5">
            <syn-button variant="filled" size="small"> Add Item </syn-button>
          </th>
        </tr>
      </tfoot>
    </table>
  </main>

  <!-- Edit and Add Dialog Form Example -->
  <syn-dialog class="edit-dialog" open="">
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
      <input type="hidden" name="id" value="4" />
    </form>

    <nav slot="footer">
      <syn-button variant="text">Cancel</syn-button>
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
</div>
```

---

## Responsive Dialog

Example demonstrating responsive dialog behavior. The dialog is designed to adapt to different screen sizes and orientations, ensuring a consistent and user-friendly experience across devices. On smaller screens, the dialog may take up the full width of the viewport, while on larger screens, it may be centered with a fixed width. This responsiveness helps maintain usability and accessibility for all users.

```html
<syn-header label="Complex Cookie Banner"></syn-header>
<main class="cookie-banner-template">
  <syn-button variant="filled"> Open cookie banner </syn-button>

  <!-- Example of a complex form dialog with accordion and details components -->
  <syn-dialog class="cookie-banner-dialog" open="" label="Settings for cookies">
    <form method="post">
      <syn-fieldset
        description="Please choose which cookies you would like to enable. You can change the settings at any time."
      >
        <syn-accordion>
          <syn-details summary="Strictly necessary and functional cookies">
            <table class="syn-table--default cookie-table">
              <thead>
                <tr>
                  <th class="cookie-column">Cookie</th>
                  <th class="purpose-column">Purpose</th>
                  <th class="enabled-column">Enabled</th>
                </tr>
              </thead>
              <tbody>
                <tr class="cookie-row">
                  <td class="cookie-name-cell">Strictly necessary cookies</td>
                  <td class="cookie-purpose-cell">
                    <p class="cookie-description">
                      These cookies are necessary for our website to function
                      properly and for using basic website functions. They allow
                      us to determine if you are registered in the online shop
                      and to ensure that you can access secure areas of the
                      website.
                    </p>

                    <syn-button
                      class="cookie-details-toggle"
                      variant="text"
                      size="small"
                      data-id="strictly-necessary-cookies"
                    >
                      Show details
                    </syn-button>
                  </td>
                  <td class="cookie-switch-cell">
                    <syn-tooltip
                      trigger="hover"
                      content="This cookie is required and cannot be disabled."
                    >
                      <syn-switch
                        checked=""
                        id="switch-strictly-necessary-cookies"
                        name="Strictly necessary cookies"
                        readonly=""
                      ></syn-switch>
                    </syn-tooltip>
                  </td>
                </tr>

                <!-- Cookie details -->

                <tr
                  class="cookie-details-row"
                  style="display: none"
                  id="details-strictly-necessary-cookies"
                >
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
                          <tr>
                            <td data-column-label="Cookie name">
                              acceleratorSecureGUID
                            </td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores the access token of the user
                              after a successful login.
                            </td>

                            <td
                              data-column-label="Responsible party"
                              rowspan="4"
                            >
                              SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch,
                              Germany
                            </td>
                            <td
                              data-column-label="Recipient of data"
                              rowspan="4"
                            >
                              SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch,
                              Germany
                            </td>

                            <td data-column-label="Duration of processing">
                              1 Day
                            </td>
                            <td data-column-label="Applicable domains">
                              *.sick.com
                            </td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">country</td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores the access token of the user
                              after a successful login.
                            </td>

                            <td data-column-label="Duration of processing">
                              1 Day
                            </td>
                            <td data-column-label="Applicable domains">
                              *.sick.com
                            </td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">
                              FF_SESSION_ID
                            </td>
                            <td data-column-label="Purpose of processing">
                              When the "Personalization" module is used, the
                              following information is additionally retained
                              from the log data on the basis of the user and/or
                              session ID transmitted by the store in order to
                              enable personalized search results: The user
                              and/or session ID transmitted by the Shop for the
                              Tracking, Analytics and Personalization modules.
                              The interactions in the search result assigned to
                              the user and/or session ID.
                            </td>

                            <td data-column-label="Duration of processing">
                              Session
                            </td>
                            <td data-column-label="Applicable domains"></td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">language</td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores the language selection of the
                              user.
                            </td>

                            <td data-column-label="Duration of processing">
                              5 Years
                            </td>
                            <td data-column-label="Applicable domains"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>

                <tr class="cookie-row">
                  <td class="cookie-name-cell">SICK ID</td>
                  <td class="cookie-purpose-cell">
                    <p class="cookie-description">
                      The SICK ID makes available a central user account through
                      which you can register for various digital services
                      offered by companies of the SICK Group and/or utilize
                      these.
                    </p>

                    <syn-button
                      class="cookie-details-toggle"
                      variant="text"
                      size="small"
                      data-id="sick-id"
                    >
                      Show details
                    </syn-button>
                  </td>
                  <td class="cookie-switch-cell">
                    <syn-tooltip
                      trigger="hover"
                      content="This cookie is required and cannot be disabled."
                    >
                      <syn-switch
                        checked=""
                        id="switch-sick-id"
                        name="SICK ID"
                        readonly=""
                      ></syn-switch>
                    </syn-tooltip>
                  </td>
                </tr>

                <!-- Cookie details -->

                <tr
                  class="cookie-details-row"
                  style="display: none"
                  id="details-sick-id"
                >
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
                          <tr>
                            <td data-column-label="Cookie name">
                              AUTH_SESSION_ID, AUTH_SESSION_ID_LEGACY
                            </td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores the assignment of the user to a
                              session of the authentication server (session ID),
                              which bundles several related requests to the
                              server and assigns them to a session.
                            </td>

                            <td
                              data-column-label="Responsible party"
                              rowspan="3"
                            >
                              SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch,
                              Germany
                            </td>
                            <td
                              data-column-label="Recipient of data"
                              rowspan="3"
                            >
                              SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch,
                              Germany
                            </td>

                            <td data-column-label="Duration of processing">
                              Session
                            </td>
                            <td data-column-label="Applicable domains">
                              id.sick.com
                            </td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">KC_RESTART</td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores an encrypted token so that the
                              authentication session can be restarted if a
                              client timeout occurs. Is created when a new
                              authentication session is started.
                            </td>

                            <td data-column-label="Duration of processing">
                              Session
                            </td>
                            <td data-column-label="Applicable domains"></td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">
                              KEYCLOAK_IDENTITY
                            </td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores the ID token of the user and is
                              used for single sign-on between different
                              applications. When logging in, the system first
                              checks whether the KEYCLOAK_IDENTITY cookie is
                              present and validates the JSON Web token.
                            </td>

                            <td data-column-label="Duration of processing">
                              Session
                            </td>
                            <td data-column-label="Applicable domains"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>

                <tr class="cookie-row">
                  <td class="cookie-name-cell">
                    Tealium iQ (Tag Management System)
                  </td>
                  <td class="cookie-purpose-cell">
                    <p class="cookie-description">
                      We use the tag management system Tealium iQ, a service of
                      Tealium Inc., 11085 Torreyana Road, San Diego, CA 92121,
                      USA, (Tealium), for the dynamic customization of parts of
                      the website. This enables us to monitor the data entry of
                      every provider tag and give our website visitors the
                      opportunity to make decisions about third-party provider
                      access and cookies themselves. Data transferred to Tealium
                      is transferred to the USA and thus to a country outside
                      the EU and the EEA under protection of Standard
                      Contractual Clauses. The legal basis is a legitimate
                      interest under Art. 6 (1) f) GDPR, namely pursuance of our
                      business purposes.
                    </p>

                    <syn-button
                      class="cookie-details-toggle"
                      variant="text"
                      size="small"
                      data-id="tealium-iq"
                    >
                      Show details
                    </syn-button>
                  </td>
                  <td class="cookie-switch-cell">
                    <syn-tooltip
                      trigger="hover"
                      content="This cookie is required and cannot be disabled."
                    >
                      <syn-switch
                        checked=""
                        id="switch-tealium-iq"
                        name="Tealium iQ (Tag Management System)"
                        readonly=""
                      ></syn-switch>
                    </syn-tooltip>
                  </td>
                </tr>

                <!-- Cookie details -->

                <tr
                  class="cookie-details-row"
                  style="display: none"
                  id="details-tealium-iq"
                >
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
                          <tr>
                            <td data-column-label="Cookie name">CONSENTMGR</td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores whether and which cookies the
                              user agrees to by the cookie settings on our
                              pages.
                            </td>

                            <td
                              data-column-label="Responsible party"
                              rowspan="2"
                            >
                              SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch,
                              Germany
                            </td>
                            <td
                              data-column-label="Recipient of data"
                              rowspan="2"
                            >
                              Tealium Inc., 11095 Torreyana Road, San Diego, CA
                              92121, USA
                            </td>

                            <td data-column-label="Duration of processing">
                              180 Days
                            </td>
                            <td data-column-label="Applicable domains">
                              *.sick.com
                            </td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">utag_main</td>
                            <td data-column-label="Purpose of processing">
                              This cookie is used to manage and ensure the
                              correct integration of website and marketing tools
                              or targeting pixels. Anonymous action-related
                              values are generated in the cookie, which do not
                              allow any personal reference but make actions
                              derivable, such as the frequent visit of a unique
                              website within a session or the start time and the
                              duration of stay on our websites.
                            </td>

                            <td data-column-label="Duration of processing">
                              1 Year
                            </td>
                            <td data-column-label="Applicable domains"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>

                <tr class="cookie-row">
                  <td class="cookie-name-cell">Google Tag Manager</td>
                  <td class="cookie-purpose-cell">
                    <p class="cookie-description">
                      We use Google Tag Manager, a service provided by Google
                      Ireland Limited (Gordon House, Barrow Street, Dublin 4,
                      Ireland). Google Tag Manager is used solely for managing
                      and triggering website tags via an interface. Google Tag
                      Manager itself does not set cookies and does not process
                      personal data. Any data processing only takes place
                      through the individual tags implemented via the Tag
                      Manager (e.g., Google Analytics 4, Google Ads). The
                      activation of these tags is based on your consent via our
                      cookie / consent management platform (Art. 6(1)(a) GDPR).
                      If you do not provide consent for statistical or marketing
                      tools, only technically necessary tags will be activated.
                      Data Controller: Google Ireland Limited, Gordon House, 4
                      Barrow Street, Dublin, D04 E5W5, Ireland Contact of
                      Google’s Data Protection Officer:
                      https://support.google.com/policies/contact/general_privacy_form
                      Additional Information: • Privacy Policy:
                      https://business.safety.google/privacy/ • Cookie Policy:
                      https://policies.google.com/technologies/cookies
                      International Data Transfers: In the context of Google
                      services, data may be transferred to third countries
                      (e.g., the United States). Google relies on the EU
                      Standard Contractual Clauses as legal safeguards for such
                      transfers.
                    </p>
                  </td>
                  <td class="cookie-switch-cell">
                    <syn-tooltip
                      trigger="hover"
                      content="This cookie is required and cannot be disabled."
                    >
                      <syn-switch
                        checked=""
                        id="switch-google-tag-manager"
                        name="Google Tag Manager"
                        readonly=""
                      ></syn-switch>
                    </syn-tooltip>
                  </td>
                </tr>

                <!-- Cookie details -->

                <tr class="cookie-row">
                  <td class="cookie-name-cell">Lime Connect Chat</td>
                  <td class="cookie-purpose-cell">
                    <p class="cookie-description">
                      We use the chat software from Lime Connect (Userlike)
                      GmbH, Im Mediapark 8, 14. OG, 50670 Cologne, Germany. Lime
                      Connect uses cookies to provide you with a personal
                      real-time chat. You can find Lime Connect privacy policy
                      here: https://www.Lime Connect.com/en/terms#privacy-policy
                    </p>

                    <syn-button
                      class="cookie-details-toggle"
                      variant="text"
                      size="small"
                      data-id="lime-connect-chat"
                    >
                      Show details
                    </syn-button>
                  </td>
                  <td class="cookie-switch-cell">
                    <syn-tooltip
                      trigger="hover"
                      content="This cookie is required and cannot be disabled."
                    >
                      <syn-switch
                        checked=""
                        id="switch-lime-connect-chat"
                        name="Lime Connect Chat"
                        readonly=""
                      ></syn-switch>
                    </syn-tooltip>
                  </td>
                </tr>

                <!-- Cookie details -->

                <tr
                  class="cookie-details-row"
                  style="display: none"
                  id="details-lime-connect-chat"
                >
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
                          <tr>
                            <td data-column-label="Cookie name">
                              uslk_umm_{organization-id}_s
                            </td>
                            <td data-column-label="Purpose of processing">
                              In addition to technical details about the
                              Messenger status, the cookie contains IDs for
                              existing contacts so that they can be recognized
                              ("reauth", "uuid", "token"). Furthermore, we set a
                              LocalStorage variable with the same name, this
                              contains technical information about the widget
                              and its status. Furthermore, it reflects the
                              number of page visits and page views
                              ("page_impressions", "visits"). Furthermore, we
                              set an email and name variable with the email and
                              name of your logged in user account.
                            </td>

                            <td
                              data-column-label="Responsible party"
                              rowspan="1"
                            >
                              SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch,
                              Germany
                            </td>
                            <td
                              data-column-label="Recipient of data"
                              rowspan="1"
                            >
                              Lime Connect (Userlike) GmbH, Im Mediapark 8, 14.
                              OG, 50670 Köln, Germany
                            </td>

                            <td data-column-label="Duration of processing">
                              1 Year
                            </td>
                            <td data-column-label="Applicable domains">
                              www.sick.com
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </syn-details>

          <syn-details summary="Marketing Cookies">
            <table class="syn-table--default cookie-table">
              <thead>
                <tr>
                  <th class="cookie-column">Cookie</th>
                  <th class="purpose-column">Purpose</th>
                  <th class="enabled-column">Enabled</th>
                </tr>
              </thead>
              <tbody>
                <tr class="cookie-row">
                  <td class="cookie-name-cell">
                    <label for="switch-adobe-analytics">
                      Adobe Analytics
                    </label>
                  </td>
                  <td class="cookie-purpose-cell">
                    <p class="cookie-description">
                      We use these cookies of the Adobe Analytics web analysis
                      tool to collect general, non-personal information about
                      the use of the website, such as the number and duration of
                      visits and which browsers and screen resolutions are used
                      to view the site. We use this information to optimize our
                      website. If wish to opt out of the anonymous data
                      aggregation and analysis, you can install the following
                      Adobe Opt-Out-Cookies on your computer:
                      http://www.112.2o7.net/optout.html?omniture=1&amp;popup=1&amp;locale=en_US&amp;optout=1&amp;second=1&amp;second_has_cookie=1
                    </p>

                    <syn-button
                      class="cookie-details-toggle"
                      variant="text"
                      size="small"
                      data-id="adobe-analytics"
                    >
                      Show details
                    </syn-button>
                  </td>
                  <td class="cookie-switch-cell">
                    <syn-tooltip trigger="hover" content="" disabled="">
                      <syn-switch
                        id="switch-adobe-analytics"
                        name="Adobe Analytics"
                      ></syn-switch>
                    </syn-tooltip>
                  </td>
                </tr>

                <!-- Cookie details -->

                <tr
                  class="cookie-details-row"
                  style="display: none"
                  id="details-adobe-analytics"
                >
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
                          <tr>
                            <td data-column-label="Cookie name">s_cc</td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores if cookies have been enabled by
                              the user.
                            </td>

                            <td
                              data-column-label="Responsible party"
                              rowspan="3"
                            >
                              SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch,
                              Germany
                            </td>
                            <td
                              data-column-label="Recipient of data"
                              rowspan="3"
                            >
                              Adobe Systems Software Ireland Limited, 4-6
                              Riverwalk, City West Business Campus, Saggart,
                              Dublin 24, Irland
                            </td>

                            <td data-column-label="Duration of processing">
                              Session
                            </td>
                            <td data-column-label="Applicable domains">
                              *.sick.com
                            </td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">s_fid</td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores a random, uniquely generated ID
                              to recognize a user's return visit to the site
                              (Unique Visitor ID, time/date stamp) when the
                              default s_vi cookie is not available due to
                              third-party cookie restrictions.
                            </td>

                            <td data-column-label="Duration of processing">
                              5 years
                            </td>
                            <td data-column-label="Applicable domains"></td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">s_sq</td>
                            <td data-column-label="Purpose of processing">
                              This cookie stores information about the previous
                              link clicked by the user.
                            </td>

                            <td data-column-label="Duration of processing">
                              Session
                            </td>
                            <td data-column-label="Applicable domains"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>

                <tr class="cookie-row">
                  <td class="cookie-name-cell">
                    <label for="switch-qualtrics">
                      Qualtrics Website-/App-Feedback
                    </label>
                  </td>
                  <td class="cookie-purpose-cell">
                    <p class="cookie-description">
                      Website / App Feedback from Qualtrics (Qualtrics LLC, 333
                      W. River Park Drive, Provo, UT 84604, USA; “Qualtrics”)
                      stores certain data inside cookies. This includes the Site
                      History cookie, Prevent Repeated Display cookie, a cookie
                      that tells us that we have a Pop Under, a cookie that
                      stores history data if localStorage is disabled, and a
                      cookie that tracks user events. We use these cookies to
                      enable us to provide pop-up questionnaires to you or
                      enable you to provide feedback using surveys.
                    </p>

                    <syn-button
                      class="cookie-details-toggle"
                      variant="text"
                      size="small"
                      data-id="qualtrics"
                    >
                      Show details
                    </syn-button>
                  </td>
                  <td class="cookie-switch-cell">
                    <syn-tooltip trigger="hover" content="" disabled="">
                      <syn-switch
                        id="switch-qualtrics"
                        name="Qualtrics Website-/App-Feedback"
                      ></syn-switch>
                    </syn-tooltip>
                  </td>
                </tr>

                <!-- Cookie details -->

                <tr
                  class="cookie-details-row"
                  style="display: none"
                  id="details-qualtrics"
                >
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
                          <tr>
                            <td data-column-label="Cookie name">QST</td>
                            <td data-column-label="Purpose of processing">
                              Appears when the Prevent multiple submissions
                              option is enabled. The purpose of this cookie is
                              to record the survey taken and prevent the user
                              from taking the survey again. This cookie allows
                              Qualtrics to keep track of when an incomplete
                              survey should be recorded as a response.
                            </td>

                            <td
                              data-column-label="Responsible party"
                              rowspan="3"
                            >
                              SICK AG, Erwin-Sick-Straße 1, 79183 Waldkirch,
                              Germany
                            </td>
                            <td
                              data-column-label="Recipient of data"
                              rowspan="3"
                            >
                              Qualtrics LLC, 333 W. River Park Drive, Provo, UT
                              84604, USA
                            </td>

                            <td data-column-label="Duration of processing">
                              1 Year
                            </td>
                            <td data-column-label="Applicable domains">
                              www.sick.com
                            </td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">surveyid</td>
                            <td data-column-label="Purpose of processing">
                              The Survey ID cookie appears when you have both
                              Allow respondents to finish later and Prevent
                              multiple submissions disabled in the survey
                              options before starting a survey session.
                            </td>

                            <td data-column-label="Duration of processing">
                              Session
                            </td>
                            <td data-column-label="Applicable domains"></td>
                          </tr>

                          <tr>
                            <td data-column-label="Cookie name">
                              {sessionid-hash}-{query-parameters}
                            </td>
                            <td data-column-label="Purpose of processing">
                              This cookie is placed when you start a survey
                              session on the same browser where you are working
                              on another one.
                            </td>

                            <td data-column-label="Duration of processing">
                              1 Year
                            </td>
                            <td data-column-label="Applicable domains"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </syn-details>
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
      <syn-button variant="text">
        <span class="save-settings-label-full">Save settings</span>
        <span class="save-settings-label-short">Save</span>
      </syn-button>
      <syn-button variant="filled">Allow and continue</syn-button>
    </nav>
  </syn-dialog>
</main>

<script type="module">
  const cookieBannerDialog = document.querySelector(".cookie-banner-dialog");
  const cookieBannerSave = cookieBannerDialog?.querySelectorAll(
    ".cookie-footer syn-button",
  );

  cookieBannerDialog?.addEventListener("syn-request-close", (e) => {
    if (e.detail.source === "overlay" || e.detail.source === "keyboard") {
      e.preventDefault();
    }
  });

  cookieBannerSave.forEach((button) =>
    button.addEventListener("click", () => {
      cookieBannerDialog.requestClose();

      const alert = Object.assign(document.createElement("syn-alert"), {
        closable: true,
        duration: 3000,
        innerHTML: `
          <syn-icon slot="icon" name="status-success" library="system"></syn-icon>
          <div>Cookie settings saved.</div>
        `,
        variant: "success",
      });

      document.body.append(alert);
      alert.toast();
    }),
  );
</script>

<style>
  .cookie-banner-template {
    background: var(--syn-page-background-color);
    container-type: inline-size;
    container-name: cookie-banner-template;
    padding: var(--syn-spacing-large);
  }

  .cookie-banner-dialog {
    --cookie-details-label-width: 180px;
    --cookie-row-border: var(--syn-border-width-small) solid
      var(--syn-table-border-color);
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

      .save-settings-label-short {
        display: none;
      }
    }
  }

  /* Mobile views */
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
            grid-template-columns: var(--cookie-details-label-width) minmax(
                0,
                1fr
              );
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
              "name switch"
              "description description";
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

  @container cookie-banner-template (max-width: 500px) {
    .cookie-banner-dialog {
      &::part(panel) {
        height: 100dvh;
        max-height: 100dvh;
      }

      .cookie-table {
        .cookie-details {
          .cookie-details-table {
            border-bottom: 0 !important;
            margin-bottom: var(--syn-spacing-small);

            tbody tr {
              border-bottom: 0;
            }
          }
        }

        > tbody > tr {
          border-bottom: 0;
        }
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

        /* Swap to the short label so "Save" fits next to "Allow and continue" on one row */
        .save-settings-label-full {
          display: none;
        }

        .save-settings-label-short {
          display: inline;
        }
      }
    }
  }
</style>
```
