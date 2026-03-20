## Contact Form

```html
<style>
  .synergy-form-demo {
    background: var(--syn-color-neutral-0);
    margin: 0 auto;
    padding: var(--syn-spacing-x-large);
    max-width: 750px;
  }

  h1 {
    font-size: var(--syn-font-size-3x-large);
    font-weight: var(--syn-font-weight-bold);
    margin: 0 0 var(--syn-spacing-medium) 0;
  }

  .synergy-form-demo > p {
    margin: 0 0 var(--syn-spacing-2x-large) 0;
  }

  em {
    font-size: var(--syn-font-size-x-small);
    font-style: normal;
  }

  fieldset {
    border: none;
    margin: 0 0 var(--syn-spacing-2x-large) 0;
    padding: 0;
  }

  fieldset legend {
    font-size: var(--syn-font-size-large);
    font-weight: var(--syn-font-weight-bold);
    line-height: var(--syn-line-height-normal);
    margin-bottom: var(--syn-spacing-medium);
  }

  fieldset legend + p {
    font-size: var(--syn-font-size-medium);
    margin: 0 0 var(--syn-font-size-large) 0;
  }

  .fields {
    container-type: inline-size;
    display: flex;
    flex-flow: wrap;
    margin-bottom: var(--syn-spacing-2x-large);
    gap: var(--syn-spacing-large) var(--syn-spacing-large);

    /* TODO: this two css properties can be removed, when this issue is fixed https://github.com/synergy-design-system/synergy-design-system/issues/612
      * It is fixed for the newest chrome and firefox versions, but not for safari :( 
      */
    position: relative;
    z-index: 1;
  }

  .fields > * {
    flex-basis: 100%;
  }

  @container (min-width: 640px) {
    .fields > * {
      flex-basis: calc(50% - var(--syn-spacing-medium));
    }
  }

  /*
     * The form control inputs are using a css grid to be displayed.
     * We just let them flow automatically mobile and arrange them
     * in two columns when space is wide enough
     */
  #topics-wrapper {
    container-type: inline-size;
  }

  #topics {
    gap: var(--syn-spacing-x-small);
    display: grid;
  }

  @container (min-width: 640px) {
    #topics {
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
    }
  }

  .submit-actions {
    display: flex;
    justify-content: right;
    margin-bottom: var(--syn-spacing-2x-large);
  }
</style>
<div class="synergy-form-demo">
  <h1>Contact Form</h1>
  <p>
    Please fill in your personal information and let us know how we can help
    you.
  </p>

  <form method="post" id="syn-form-demo">
    <fieldset id="topics-wrapper">
      <legend>Topic</legend>
      <div id="topics">
        <syn-checkbox
          name="topic[0]"
          value="Inquiry/offer"
          title=""
          size="medium"
          form=""
        >
          Inquiry/offer
        </syn-checkbox>

        <syn-checkbox
          name="topic[1]"
          value="Orders/invoices"
          title=""
          size="medium"
          form=""
        >
          Orders/invoices
        </syn-checkbox>

        <syn-checkbox
          name="topic[2]"
          value="Returns/complaint"
          title=""
          size="medium"
          form=""
        >
          Returns/complaint
        </syn-checkbox>

        <syn-checkbox
          name="topic[3]"
          value="Documentation/CAD"
          title=""
          size="medium"
          form=""
        >
          Documentation/CAD
        </syn-checkbox>

        <syn-checkbox
          name="topic[4]"
          value="Accessories selection"
          title=""
          size="medium"
          form=""
        >
          Accessories selection
        </syn-checkbox>

        <syn-checkbox
          name="topic[5]"
          value="Application review"
          title=""
          size="medium"
          form=""
        >
          Application review
        </syn-checkbox>

        <syn-checkbox
          name="topic[6]"
          value="Commissioning support"
          title=""
          size="medium"
          form=""
        >
          Commissioning support
        </syn-checkbox>
      </div>
    </fieldset>

    <fieldset>
      <legend>Question</legend>
      <p>
        It is very helpful if the description is as precise as possible to
        enable us to process your enquiry correctly. When describing
        applications, please specify the material/dimensions/speed, if
        applicable.
      </p>

      <syn-textarea
        name="message"
        required=""
        label="Message"
        title=""
        size="medium"
        form=""
      ></syn-textarea>
    </fieldset>

    <fieldset>
      <legend>Contact Details</legend>
      <div class="fields">
        <syn-input
          name="customerNr"
          label="Customer Number"
          title=""
          type="text"
          size="medium"
          form=""
        ></syn-input>
        <syn-input
          name="companyName"
          required=""
          label="Company name"
          title=""
          type="text"
          size="medium"
          form=""
        ></syn-input>
        <syn-input
          name="address"
          required=""
          label="Address"
          title=""
          type="text"
          size="medium"
          form=""
        ></syn-input>
        <syn-input
          name="zip"
          required=""
          label="Postal Code"
          title=""
          type="text"
          size="medium"
          form=""
        ></syn-input>
        <syn-input
          name="city"
          required=""
          label="City"
          title=""
          type="text"
          size="medium"
          form=""
        ></syn-input>

        <syn-select
          name="country"
          required=""
          label="Country"
          size="medium"
          placement="bottom"
          form=""
        >
          <syn-option
            value="0"
            role="option"
            aria-selected="false"
            aria-disabled="false"
            >Deutschland</syn-option
          >

          <syn-option
            value="1"
            role="option"
            aria-selected="false"
            aria-disabled="false"
            >USA</syn-option
          >

          <syn-option
            value="2"
            role="option"
            aria-selected="false"
            aria-disabled="false"
            >China</syn-option
          >
        </syn-select>

        <syn-combobox
          name="salesPerson"
          required=""
          label="Your reference contact"
          size="medium"
          placement="bottom"
          form=""
        >
          <syn-option
            role="option"
            aria-selected="false"
            aria-disabled="false"
            value=""
            id="syn-combobox-option-0"
            >Max Mustermann</syn-option
          >
          <syn-option
            role="option"
            aria-selected="false"
            aria-disabled="false"
            value=""
            id="syn-combobox-option-1"
            >John Doe</syn-option
          >
          <syn-option
            role="option"
            aria-selected="false"
            aria-disabled="false"
            value=""
            id="syn-combobox-option-2"
            >Jane Row</syn-option
          >
          <syn-option
            role="option"
            aria-selected="false"
            aria-disabled="false"
            value=""
            id="syn-combobox-option-3"
            >Average Joe</syn-option
          >
        </syn-combobox>
        <syn-input
          type="tel"
          name="phone"
          label="Phone number"
          title=""
          size="medium"
          form=""
        ></syn-input>
        <syn-input
          type="tel"
          name="fax"
          label="Fax number"
          title=""
          size="medium"
          form=""
        ></syn-input>
        <syn-input
          type="email"
          name="mail"
          required=""
          label="E-Mail address"
          title=""
          size="medium"
          form=""
        ></syn-input>
      </div>
      <syn-checkbox name="subscribeNewsletter" title="" size="medium" form="">
        Yes, I would like to receive up-to-date and interesting information on
        solutions with products, systems and services from SICK by email on a
        regular basis. I can withdraw my consent at any time. To withdraw my
        consent, I can use the unsubscribe link in every newsletter / email at
        any time.
      </syn-checkbox>
    </fieldset>

    <div class="submit-actions">
      <syn-button type="submit" variant="filled" title="" size="medium"
        >Send</syn-button
      >
    </div>

    <em>
      Fields marked * are required. Your data will be treated accordingly to
      <a href="#">Data protection</a>
      law.
    </em>
  </form>
</div>
```

---

## Multiple Files Upload Form

```html
<div class="synergy-upload-form-demo">
  <h1>Multiple files upload</h1>
  <form
    enctype="multipart/form-data"
    method="post"
    id="upload-multiple-form-docs"
  >
    <syn-file
      droparea=""
      name="files"
      multiple=""
      label="Select Files"
      help-text="Max file size is 500kb. Supported file types are .jgp, .png and .pdf"
      size="medium"
      form=""
    ></syn-file>

    <!-- File list: hidden until files are selected -->
    <ul class="uploaded-files">
      <li class="entry-uploading">
        <em>image.png</em
        ><span class="uploaded-files--status"><syn-spinner></syn-spinner></span
        ><syn-divider
          role="separator"
          aria-orientation="horizontal"
        ></syn-divider>
      </li>
      <li class="entry-success">
        <em>file-name</em
        ><span class="uploaded-files--status"
          ><syn-icon-button
            library="system"
            size="medium"
            name="status-success"
            label="Upload successful"
            tabindex="-1"
            color="currentColor"
          ></syn-icon-button></span
        ><syn-divider
          role="separator"
          aria-orientation="horizontal"
        ></syn-divider>
      </li>
      <li class="entry-queued">
        <em>file-name</em
        ><span class="uploaded-files--status"
          ><syn-icon-button
            library="system"
            size="medium"
            name="x-lg"
            label="Cancel upload"
            color="currentColor"
          ></syn-icon-button></span
        ><syn-divider
          role="separator"
          aria-orientation="horizontal"
        ></syn-divider>
      </li>
      <li class="entry-queued">
        <em
          >file-name-large<span class="uploaded-files--help-text"
            >File exceeds size limit.</span
          ></em
        ><span class="uploaded-files--status"
          ><syn-icon-button
            library="system"
            size="medium"
            name="x-lg"
            label="Cancel upload"
            color="currentColor"
          ></syn-icon-button></span
        ><syn-divider
          role="separator"
          aria-orientation="horizontal"
        ></syn-divider>
      </li>
    </ul>

    <div class="submit-actions">
      <syn-button type="submit" variant="filled" title="" size="medium"
        >Upload</syn-button
      >
    </div>
  </form>
</div>

<style>
  .synergy-upload-form-demo {
    background: var(--syn-color-neutral-0);
    margin: 0 auto;
    padding: var(--syn-spacing-x-large);
    max-width: 750px;

    form {
      display: flex;
      flex-direction: column;
      gap: var(--syn-spacing-medium);
    }
  }

  h1 {
    font-size: var(--syn-font-size-3x-large);
    font-weight: var(--syn-font-weight-bold);
    margin: 0 0 var(--syn-spacing-medium) 0;
  }

  .uploaded-files {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;

    li {
      --indicator-color: var(--syn-input-icon-icon-clearable-color);

      align-items: center;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: var(--syn-spacing-small) 0;
      font: var(--syn-body-medium-regular);
      gap: var(--syn-spacing-small);
      min-height: 50px;
      position: relative;

      &.entry-success {
        --indicator-color: var(--syn-namur-success-color);

        pointer-events: none;
      }

      em {
        font: var(--syn-body-medium-regular);
        font-style: normal;
        flex: 1;
      }

      .uploaded-files--status {
        color: var(--indicator-color);
        text-align: end;
        width: var(--syn-spacing-large);
        font-size: var(--syn-font-size-large);
        position: absolute;
        right: 0;
        top: var(--syn-spacing-small);

        syn-icon-button {
          &::part(base) {
            font-size: var(--syn-spacing-large);
            padding: 0;
          }
        }
      }

      .uploaded-files--help-text {
        color: var(--syn-input-border-color-focus-error);
        display: block;
        font: var(--syn-body-small-regular);
        margin: var(--syn-spacing-x-small) 0;
      }

      /* Spinner surface is slightly larger as buttons have some padding applied */
      .uploaded-files--status:has(syn-spinner) {
        right: 2px;
      }

      syn-divider {
        width: 100%;
        margin: 0;
        position: absolute;
        bottom: 0;
      }
    }
  }

  .submit-actions {
    display: flex;
    justify-content: right;
    margin-top: var(--syn-spacing-2x-large);
  }
</style>
```
