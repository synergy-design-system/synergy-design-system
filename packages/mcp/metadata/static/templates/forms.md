
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
          data-optional=""
          data-invalid=""
        >
          Inquiry/offer
        </syn-checkbox>

        <syn-checkbox
          name="topic[1]"
          value="Orders/invoices"
          title=""
          size="medium"
          form=""
          data-optional=""
          data-valid=""
        >
          Orders/invoices
        </syn-checkbox>

        <syn-checkbox
          name="topic[2]"
          value="Returns/complaint"
          title=""
          size="medium"
          form=""
          data-optional=""
          data-valid=""
        >
          Returns/complaint
        </syn-checkbox>

        <syn-checkbox
          name="topic[3]"
          value="Documentation/CAD"
          title=""
          size="medium"
          form=""
          data-optional=""
          data-valid=""
        >
          Documentation/CAD
        </syn-checkbox>

        <syn-checkbox
          name="topic[4]"
          value="Accessories selection"
          title=""
          size="medium"
          form=""
          data-optional=""
          data-valid=""
        >
          Accessories selection
        </syn-checkbox>

        <syn-checkbox
          name="topic[5]"
          value="Application review"
          title=""
          size="medium"
          form=""
          data-optional=""
          data-valid=""
        >
          Application review
        </syn-checkbox>

        <syn-checkbox
          name="topic[6]"
          value="Commissioning support"
          title=""
          size="medium"
          form=""
          data-optional=""
          data-valid=""
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
        data-required=""
        data-invalid=""
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
          data-optional=""
          data-valid=""
        ></syn-input>
        <syn-input
          name="companyName"
          required=""
          label="Company name"
          title=""
          type="text"
          size="medium"
          form=""
          data-required=""
          data-invalid=""
        ></syn-input>
        <syn-input
          name="address"
          required=""
          label="Address"
          title=""
          type="text"
          size="medium"
          form=""
          data-required=""
          data-invalid=""
        ></syn-input>
        <syn-input
          name="zip"
          required=""
          label="Postal Code"
          title=""
          type="text"
          size="medium"
          form=""
          data-required=""
          data-invalid=""
        ></syn-input>
        <syn-input
          name="city"
          required=""
          label="City"
          title=""
          type="text"
          size="medium"
          form=""
          data-required=""
          data-invalid=""
        ></syn-input>

        <syn-select
          name="country"
          required=""
          label="Country"
          size="medium"
          placement="bottom"
          form=""
          data-required=""
          data-invalid=""
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
          data-required=""
          data-invalid=""
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
          data-optional=""
          data-valid=""
        ></syn-input>
        <syn-input
          type="tel"
          name="fax"
          label="Fax number"
          title=""
          size="medium"
          form=""
          data-optional=""
          data-valid=""
        ></syn-input>
        <syn-input
          type="email"
          name="mail"
          required=""
          label="E-Mail address"
          title=""
          size="medium"
          form=""
          data-required=""
          data-invalid=""
        ></syn-input>
      </div>
      <syn-checkbox
        name="subscribeNewsletter"
        title=""
        size="medium"
        form=""
        data-optional=""
        data-valid=""
      >
        Yes, I would like to receive up-to-date and interesting information on
        solutions with products, systems and services from SICK by email on a
        regular basis. I can withdraw my consent at any time. To withdraw my
        consent, I can use the unsubscribe link in every newsletter / email at
        any time.
      </syn-checkbox>
    </fieldset>

    <div class="submit-actions">
      <syn-button
        type="submit"
        variant="filled"
        title=""
        size="medium"
        data-optional=""
        data-valid=""
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
