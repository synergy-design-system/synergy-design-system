## Default

File control is a component with which a user can select a local file. It shows the value of the selected file.

```html
<form method="get" class="fieldset-demo">
  <syn-fieldset item-spacing="dense" layout="two-columns" legend="Topic">
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
  </syn-fieldset>

  <syn-fieldset layout="one-column" legend="Question" item-spacing="">
    <div slot="description">
      It is very helpful if the description is as precise as possible to enable
      us to process your enquiry correctly. When describing applications, please
      specify the material/dimensions/speed, if applicable.
    </div>

    <syn-textarea name="message" required="" label="Message"></syn-textarea>
  </syn-fieldset>

  <syn-fieldset
    description="Description text for the fieldset. This is optional and can be used to provide additional information about the fieldset."
    legend="Personal Information"
  >
    <syn-input name="customerNr" label="Customer Number"></syn-input>
    <syn-input name="companyName" required="" label="Company name"></syn-input>
    <syn-input name="address" required="" label="Address"></syn-input>
    <syn-input name="zip" required="" label="Postal Code"></syn-input>
    <syn-input name="city" required="" label="City"></syn-input>

    <syn-select name="country" required="" label="Country">
      <syn-option value="0">Deutschland</syn-option>

      <syn-option value="1">USA</syn-option>

      <syn-option value="2">China</syn-option>
    </syn-select>

    <syn-combobox name="salesPerson" required="" label="Your reference contact">
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

  <syn-button type="submit">Submit</syn-button>
</form>
<style>
  .fieldset-demo {
    background: var(--syn-color-neutral-0);
    margin: 0 auto;
    padding: var(--syn-spacing-x-large);
    max-width: 750px;
  }
</style>
<script>
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
  });
</script>
```
