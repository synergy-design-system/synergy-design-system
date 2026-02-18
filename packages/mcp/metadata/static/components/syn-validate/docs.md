## Default

Validate offers options for convenient error handling in form elements.

```html
<form id="components-syn-validate--default-validate-demo-form">
  <syn-validate variant="native" on="">
    <syn-input
      label="Invalid input"
      type="email"
      value="team(at)synergy.com"
      title=""
      size="medium"
      form=""
    ></syn-input>
  </syn-validate>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```

---

## Tooltip Variant

When the tooltip variant is chosen, validation errors are displayed in a <syn-tooltip> component that has its center at the invalid element. The native tooltip is suppressed.

```html
<form id="components-syn-validate--tooltip-variant-validate-demo-form">
  <syn-validate class="validation-tooltip" variant="tooltip" on="">
    <syn-input
      label="Invalid input"
      type="email"
      value="team(at)synergy.com"
      title=""
      size="medium"
      form=""
    ></syn-input>
  </syn-validate>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```

---

## Inline Variant

Set the variant attribute to inline to show the invalid message below the selected element.👨‍💻 Additional developer Information:Per default, syn-validate uses the browser’s built-in validation. This shows only one error at a time and is optimized for accessbility.When using the inline variant, you have to ensure accessibility on your side and have to have in mind it most likely will lead to layout shifts.

```html
<form id="components-syn-validate--inline-variant-validate-demo-form">
  <syn-validate class="validation-inline" variant="inline" on="">
    <syn-input
      label="Inline validation"
      type="email"
      value="team(at)synergy.com"
      title=""
      size="medium"
      form=""
    ></syn-input>
  </syn-validate>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```

---

## Hide Icon

Use hide-icon to hide the icon in inline style. This is especially useful when showing more than one error at a time.

```html
<form id="components-syn-validate--hide-icon-validate-demo-form">
  <syn-validate
    class="validation-hide-icon"
    hide-icon=""
    variant="inline"
    on=""
  >
    <syn-input
      label="Hide icon"
      type="email"
      value="team(at)synergy.com"
      title=""
      size="medium"
      form=""
    ></syn-input>
  </syn-validate>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```

---

## Sizes

In development use the size attribute of the form element e.g. syn-input to set the size of the inline syn-validate automatically.

```html
<form id="components-syn-validate--sizes-validate-demo-form">
  <div
    style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
  >
    <syn-validate eager="" variant="inline" on="">
      <syn-input
        type="email"
        value="team(at)synergy.com"
        label="Size small"
        size="small"
        title=""
        form=""
      ></syn-input>
    </syn-validate>

    <syn-validate eager="" variant="inline" on="">
      <syn-input
        type="email"
        value="team(at)synergy.com"
        label="Size medium"
        size="medium"
        title=""
        form=""
      ></syn-input>
    </syn-validate>

    <syn-validate eager="" variant="inline" on="">
      <syn-input
        type="email"
        value="team(at)synergy.com"
        label="Size large"
        size="large"
        title=""
        form=""
      ></syn-input>
    </syn-validate>
  </div>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```

---

## Live

Use the live value for the on attribute to validate on every input change (e. g. typing a character or checking a checkbox.) instead of form submit. This will automatically bind to the input and blur events.👨‍💻 Additional developer Information:Please ensure, that you really need live validation for your use case as this can have implications on accessibility.

```html
<form id="components-syn-validate--live-validate-demo-form">
  <syn-validate class="validation-live" variant="inline" on="live">
    <syn-input
      label="Invalid input"
      type="email"
      value="team(at)synergy.com"
      title=""
      size="medium"
      form=""
    ></syn-input>
  </syn-validate>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```

---

## Custom Validation Message

Use the custom-validation-message attribute to use whichever error you need as text, overriding the default browser errors.👨‍💻 Additional developer Information:By using the custom-validation-message attribute, you can override the default browser error messages with custom text. However, please note that applying this attribute disables the browser’s native validation functionality. This means the standard error messages will not be displayed until the custom-validation attribute is removed, at which point the native functionality will be restored.

```html
<form
  id="components-syn-validate--custom-validation-message-validate-demo-form"
>
  <syn-validate
    class="validation-custom-validation"
    custom-validation-message='Include an "@" in the email address, otherwise you will never get our marvelous newsletter'
    variant="inline"
    on=""
  >
    <syn-input
      label="Custom validation"
      type="email"
      value="team(at)synergy.com"
      title=""
      size="medium"
      form=""
    ></syn-input>
  </syn-validate>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```

---

## Custom Form Field

Wrap the element around any other form field, that follows browser standards to use all features.

```html
<form id="components-syn-validate--custom-form-field-validate-demo-form">
  <h3 style="margin: 0; padding: 0">Choose SICK´s brand color</h3>
  <syn-validate class="validation-custom-form-field" on="live" variant="inline">
    <validate-demo-radio name="color"></validate-demo-radio>
  </syn-validate>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```

---

## Binding To Custom Event Names

Use the on attribute to listen for one or many custom events. This may be useful if you want to validate on keypress or custom events that may be fired by third party web-components.👨‍💻 Additional developer Information:You can provide one or multiple events in the on property. Please use a whitespace separated list of DOM event names. <syn-validate> will make sure to automatically use Synergies custom events. This means <syn-validate on="change click"> will bind to the syn-change and click events for a <syn-input> or change and click events for a regular <input> element.

```html
<form
  id="components-syn-validate--binding-to-custom-event-names-validate-demo-form"
>
  <syn-validate
    class="validation-custom-validation"
    on="mouseover blur"
    variant="inline"
  >
    <syn-input
      label="Custom validation (triggered on hover and blur)"
      type="email"
      value="team(at)synergy.com"
      title=""
      size="medium"
      form=""
    ></syn-input>
  </syn-validate>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```

---

## Eager

Use the eager attribute to validate the field when the component is mounted. This may be used to prefill validation messages, e.g. during page loads. Please be aware that when mixed with a variant of native, this will display the error of the last eager element in your <form> only!

```html
<form id="components-syn-validate--eager-validate-demo-form">
  <syn-validate eager="" variant="inline" on="">
    <syn-input
      label="Eager validation (triggered on page load)"
      type="email"
      value="team(at)synergy.com"
      title=""
      size="medium"
      form=""
    ></syn-input>
  </syn-validate>

  <p>
    <syn-button type="submit" title="" variant="outline" size="medium"
      >Submit</syn-button
    >
  </p>
</form>
```
