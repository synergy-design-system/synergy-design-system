## Contact Form

```html
<style>
  .synergy-form-demo {
    background: var(--syn-color-neutral-0);
    margin: 0 auto;
    padding: var(--syn-spacing-x-large);
    max-width: 750px;

    h1 {
      margin: 0 0 var(--syn-spacing-medium) 0;
    }

    > p {
      margin: 0 0 var(--syn-spacing-2x-large) 0;
    }

    em {
      font-size: var(--syn-font-size-x-small);
      font-style: normal;
    }

    .submit-actions {
      display: flex;
      justify-content: right;
      margin: var(--syn-spacing-2x-large) 0;
    }

    /* Special responsive handling for the topics checkbox group, which is displayed in a grid on larger screens */
    #topics {
      container-type: inline-size;
    }

    #topics::part(form-control-input) {
      gap: var(--syn-spacing-x-small);
      display: grid;
    }

    @container (min-width: 640px) {
      #topics::part(form-control-input) {
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
      }
    }
  }
</style>
<div class="synergy-form-demo">
  <h1 class="syn-heading--3x-large">Contact Form</h1>
  <p>
    Please fill in your personal information and let us know how we can help
    you.
  </p>

  <form method="post" id="syn-form-demo">
    <syn-fieldset legend="Topic">
      <syn-checkbox-group id="topics">
        <syn-checkbox name="topic[0]" value="Inquiry/offer">
          Inquiry/offer
        </syn-checkbox>

        <syn-checkbox name="topic[1]" value="Orders/invoices">
          Orders/invoices
        </syn-checkbox>

        <syn-checkbox name="topic[2]" value="Returns/complaint">
          Returns/complaint
        </syn-checkbox>

        <syn-checkbox name="topic[3]" value="Documentation/CAD">
          Documentation/CAD
        </syn-checkbox>

        <syn-checkbox name="topic[4]" value="Accessories selection">
          Accessories selection
        </syn-checkbox>

        <syn-checkbox name="topic[5]" value="Application review">
          Application review
        </syn-checkbox>

        <syn-checkbox name="topic[6]" value="Commissioning support">
          Commissioning support
        </syn-checkbox>
      </syn-checkbox-group>
    </syn-fieldset>

    <syn-fieldset
      layout="one-column"
      description="It is very helpful if the description is as precise as possible to enable us to process your enquiry correctly. When describing applications, please specify the material/dimensions/speed, if applicable."
      legend="Question"
    >
      <syn-textarea name="message" required="" label="Message"></syn-textarea>
    </syn-fieldset>

    <syn-fieldset layout="two-columns" legend="Contact Details">
      <syn-input name="customerNr" label="Customer Number"></syn-input>
      <syn-input
        name="companyName"
        required=""
        label="Company name"
      ></syn-input>
      <syn-input name="address" required="" label="Address"></syn-input>
      <syn-input name="zip" required="" label="Postal Code"></syn-input>
      <syn-input name="city" required="" label="City"></syn-input>

      <syn-select name="country" required="" label="Country">
        <syn-option value="0">Deutschland</syn-option>

        <syn-option value="1">USA</syn-option>

        <syn-option value="2">China</syn-option>
      </syn-select>

      <syn-combobox
        name="salesPerson"
        required=""
        label="Your reference contact"
      >
        <syn-option>Max Mustermann</syn-option>
        <syn-option>John Doe</syn-option>
        <syn-option>Jane Row</syn-option>
        <syn-option>Average Joe</syn-option>
      </syn-combobox>
      <syn-input type="tel" name="phone" label="Phone number"></syn-input>
      <syn-input type="tel" name="fax" label="Fax number"></syn-input>
      <syn-input
        type="email"
        name="mail"
        required=""
        label="E-Mail address"
      ></syn-input>
    </syn-fieldset>

    <syn-fieldset>
      <syn-checkbox name="subscribeNewsletter">
        Yes, I would like to receive up-to-date and interesting information on
        solutions with products, systems and services from SICK by email on a
        regular basis. I can withdraw my consent at any time. To withdraw my
        consent, I can use the unsubscribe link in every newsletter / email at
        any time.
      </syn-checkbox>
    </syn-fieldset>

    <div class="submit-actions">
      <syn-button type="submit" variant="filled">Send</syn-button>
    </div>

    <em>
      Fields marked * are required. Your data will be treated accordingly to
      <a href="#">Data protection</a>
      law.
    </em>
  </form>
</div>

<script type="module">
  const firstTopic = document.querySelector("syn-checkbox:first-child");
  const firstTopicError = "Please select at least one topic";

  customElements.whenDefined("syn-select").then(() => {
    firstTopic.setCustomValidity(firstTopicError);
  });

  const setValidationForTopics = () => {
    const hasCheckedElements =
      document.querySelectorAll("#topics syn-checkbox[checked]").length > 0;
    const validationMessage = hasCheckedElements ? "" : firstTopicError;
    firstTopic.setCustomValidity(validationMessage);
  };

  document
    .querySelector("form")
    .addEventListener("input", setValidationForTopics);

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);

    const hasOneTopicChecked = Array.from(fd).some(
      ([key, value]) => key.startsWith("topic[") && value,
    );

    // Set validation message for topics dependent if a topic was checked or not
    const topicValidity = hasOneTopicChecked ? "" : firstTopicError;
    firstTopic.setCustomValidity(topicValidity);

    if (e.target.reportValidity()) {
      console.log(...fd, hasOneTopicChecked);
    }
  });
</script>
```
