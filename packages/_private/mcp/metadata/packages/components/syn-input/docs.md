
## Default

Inputs collect data from the user.

```html
<syn-input
  spellcheck=""
  title=""
  type="text"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Labels

Use the label attribute to give the input an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-input
  label="What is your name?"
  title=""
  type="text"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-input
  label="Nickname"
  help-text="What would you like people to call you?"
  title=""
  type="text"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Placeholders

Use the placeholder attribute to add a placeholder.

```html
<syn-input
  placeholder="Type something"
  title=""
  type="text"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Clearable

Add the clearable attribute to add a clear button when the input has content.

```html
<syn-input
  value="Clearable"
  placeholder="Clearable"
  clearable=""
  title=""
  type="text"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Toggle Password

Add the password-toggle attribute to add a toggle button that will show the password when activated.

```html
<syn-input
  type="password"
  placeholder="Password Toggle"
  password-toggle=""
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Readonly Inputs

Add the read-only attribute to draw a read-only input.

```html
<syn-input
  value="Readonly content"
  readonly=""
  title=""
  type="text"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Focus

The focus attribute provides feedback to the users, informing them that the input component is ready for use.

```html
<div style="padding: 5px">
  <form>
    <syn-input
      help-text="This input is focused."
      label="Label"
      placeholder="Insert text here..."
      title=""
      type="text"
      size="medium"
      form=""
      data-optional=""
      data-valid=""
    ></syn-input>
  </form>
</div>

```

---

## Disabled

Use the disabled attribute to disable an input.

```html
<syn-input
  placeholder="Disabled"
  help-text="Help Text"
  label="Label"
  disabled=""
  title=""
  type="text"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-icon
    name="house"
    slot="prefix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon
    name="chat"
    slot="suffix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
</syn-input>

```

---

## Sizes

Use the size attribute to change an input's size.

```html
<syn-input
  placeholder="Small"
  size="small"
  title=""
  type="text"
  form=""
  data-optional=""
  data-valid=""
></syn-input
><br />
<syn-input
  placeholder="Medium"
  size="medium"
  title=""
  type="text"
  form=""
  data-optional=""
  data-valid=""
></syn-input
><br />
<syn-input
  placeholder="Large"
  size="large"
  title=""
  type="text"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Invalid

The invalid status is used to warn the user that the input is invalid. For example, if the entry of text is mandatory and nothing has been entered or if a text has been entered that does not have the correct format.

```html
<form class="custom-validity">
  <syn-input
    help-text="This input is required."
    label="Label"
    placeholder="Insert text here..."
    required=""
    title=""
    type="text"
    size="medium"
    form=""
    data-required=""
    data-invalid=""
  ></syn-input>
  <syn-button
    type="submit"
    variant="filled"
    title=""
    size="medium"
    data-optional=""
    data-valid=""
    >Submit</syn-button
  >
</form>
<style>
  .custom-validity {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  syn-button {
    align-self: flex-start;
  }
</style>

```

---

## Input Types

The type attribute controls the type of input the browser renders.

```html
<syn-input
  type="email"
  placeholder="Email"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input
><br />
<syn-input
  type="number"
  placeholder="Number"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input
><br />
<syn-input
  type="date"
  placeholder="Date"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Prefix Suffix Text And Icons

Use the prefix and suffix slots to add text and icons.

```html
<syn-input
  placeholder="Small"
  size="small"
  title=""
  type="text"
  form=""
  data-optional=""
  data-valid=""
>
  <span slot="prefix">prefix</span>
  <span slot="suffix">suffix</span>
</syn-input>
<br />
<syn-input
  placeholder="Medium"
  size="medium"
  title=""
  type="text"
  form=""
  data-optional=""
  data-valid=""
>
  <span slot="prefix">prefix</span>
  <span slot="suffix">suffix</span>
</syn-input>
<br />
<syn-input
  placeholder="Large"
  size="large"
  title=""
  type="text"
  form=""
  data-optional=""
  data-valid=""
>
  <span slot="prefix">prefix</span>
  <span slot="suffix">suffix</span>
</syn-input>
<br />
<syn-input
  placeholder="Small"
  size="small"
  title=""
  type="text"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-icon
    name="wallpaper"
    slot="prefix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon
    name="wallpaper"
    slot="suffix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
</syn-input>
<br />
<syn-input
  placeholder="Medium"
  size="medium"
  title=""
  type="text"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-icon
    name="wallpaper"
    slot="prefix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon
    name="wallpaper"
    slot="suffix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
</syn-input>
<br />
<syn-input
  placeholder="Large"
  size="large"
  title=""
  type="text"
  form=""
  data-optional=""
  data-valid=""
>
  <syn-icon
    name="wallpaper"
    slot="prefix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon
    name="wallpaper"
    slot="suffix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
</syn-input>

```

---

## Customizing Label Position

Use to customize the way form controls are drawn. This example uses CSS grid to position the label to the left of the control, but the possible orientations are nearly endless. The same technique works for inputs, textareas, radio groups, and similar form controls.

```html
<syn-input
  class="label-on-left"
  label="Name"
  help-text="Enter your name"
  title=""
  type="text"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>
<syn-input
  class="label-on-left"
  label="Email"
  type="email"
  help-text="Enter your email"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>
<syn-textarea
  class="label-on-left"
  label="Bio"
  help-text="Tell us something about yourself"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>

<style>
  .label-on-left {
    --label-width: 3.75rem;
    --gap-width: 1rem;
  }

  .label-on-left + .label-on-left {
    margin-top: var(--syn-spacing-medium);
  }

  .label-on-left::part(form-control) {
    display: grid;
    grid: auto / var(--label-width) 1fr;
    gap: var(--syn-spacing-3x-small) var(--gap-width);
    align-items: center;
  }

  .label-on-left::part(form-control-label) {
    text-align: right;
  }

  .label-on-left::part(form-control-help-text) {
    grid-column-start: 2;
  }
</style>

```

---

## Stepper

The Stepper (Input type number) attribute has additional step buttons at the right side for incrementing and decrementing values. It is ideal for situations where users need to adjust quantities or settings within a range.

```html
<syn-input
  type="number"
  min="0"
  max="10"
  value="0"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>
<br />
<syn-input
  type="number"
  min="0"
  max="10"
  value="2"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>
<br />
<syn-input
  type="number"
  min="0"
  max="10"
  value="10"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```

---

## Stepper Input Handling

The numeric-strategy property defines how numeric input is handled during user interaction. It lets you select between the browsers native control and Synergy’s enhanced number-input logic.native: Uses the browser’s built-in number control. Values are not auto-clamped, and stepping/validation can vary across browsers.modern: Provides a more intuitive and predictable behavior by automatically clamping values to the nearest min/max value, including those bounds when stepping, and ignoring the step attribute during validation.

```html
<syn-input
  label="Native (min and max)"
  max="10"
  min="0"
  numeric-strategy="native"
  step="0.3"
  type="number"
  value="0"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>
<syn-input
  label="Modern (min and max)"
  max="10"
  min="0"
  numeric-strategy="modern"
  step="0.3"
  type="number"
  value="0"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-input>

```
