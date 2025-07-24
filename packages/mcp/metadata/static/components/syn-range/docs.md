## Default

Ranges allow the user to select values within a given range using a thumb.

```html
<syn-range
  max="100"
  step="1"
  value="50"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
```

---

## Labels

Use the label attribute to give the range an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-range
  label="Label"
  max="100"
  min="0"
  value="50"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-range
  help-text="Controls the volume of the current song"
  label="Volume"
  max="100"
  min="0"
  value="50"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
```

---

## Disabled

Use the disabled attribute to disable a range.

```html
<syn-range
  disabled=""
  max="100"
  min="0"
  value="50"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
```

---

## Invalid

The invalid status is used to warn the user that the input is invalid. As range validation is not supported by the browser, you will need to implement your own validation logic.

```html
<form class="custom-validity">
  <syn-range
    help-text="This is an error text"
    id="range-invalid"
    max="100"
    min="0"
    value="50"
    size="medium"
    form=""
    data-optional=""
    data-invalid=""
  >
  </syn-range>
  <syn-button
    type="submit"
    title=""
    variant="outline"
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

## Focus

The focus event gives the user feedback that the Range has been focused by the keyboard interaction or active click from the user.

```html
<form>
  <syn-range
    max="100"
    min="0"
    value="50"
    size="medium"
    form=""
    data-optional=""
    data-valid=""
  ></syn-range>
</form>
```

---

## Sizes

Use the size attribute to change a range’s size.

```html
<div class="size-wrapper">
  <syn-range
    label="Small"
    max="100"
    min="0"
    size="small"
    value="33"
    form=""
    data-optional=""
    data-valid=""
  ></syn-range>
  <syn-range
    label="Medium"
    max="100"
    min="0"
    size="medium"
    value="66"
    form=""
    data-optional=""
    data-valid=""
  ></syn-range>
  <syn-range
    label="Large"
    max="100"
    min="0"
    size="large"
    value="99"
    form=""
    data-optional=""
    data-valid=""
  ></syn-range>
</div>
<style>
  .size-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-medium);
  }
</style>
```

---

## Prefix Suffix Text

Add any element to the start and end of range items using the prefix and suffix slots.

```html
<syn-range
  help-text="Controls the volume of the current song"
  label="Volume"
  max="100"
  min="0"
  value="50"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
  <span slot="prefix">0</span>
  <span slot="suffix">100</span>
</syn-range>

<br />
<p>This can be used to add input fields or icons.</p>
<br />

<syn-range
  label="Estimated Time"
  class="suffix-input-field"
  min="0"
  max="60"
  value="30"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
  <span slot="prefix">0</span>
  <span slot="suffix">
    <div class="suffix-input">
      60
      <syn-input
        value="30"
        type="number"
        no-spin-buttons=""
        min="0"
        max="60"
        title=""
        size="medium"
        form=""
        data-optional=""
        data-valid=""
      >
        <span slot="suffix">sec</span>
      </syn-input>
    </div>
  </span>
</syn-range>

<style>
  .suffix-input {
    align-items: center;
    display: flex;
    gap: var(--syn-spacing-medium);

    syn-input {
      min-width: 0;
    }
  }
</style>
```

---

## Custom Track Colors

You can customize the active and inactive portions of the track using the --track-color-active and --track-color-inactive custom properties.

```html
<syn-range
  class="custom-track-color"
  max="100"
  min="0"
  value="50"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
<style>
  .custom-track-color {
    --track-color-active: var(--syn-color-success-700);
  }
</style>
```

---

## Custom Track Offset

You can customize the initial offset of the active track using the --track-active-offset custom property.

```html
<syn-range
  class="custom-track-offset"
  max="50"
  min="-50"
  value="-15"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
<style>
  .custom-track-offset {
    --track-active-offset: 50%;
  }
</style>
```

---

## Multi Thumb

You can add multiple range-thumbs to your range.

```html
<syn-range
  max="100"
  min="0"
  value="30 70"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
```

---

## Multi Thumb With Restricted Movement

Set the restrict-movement attribute to true to prevent the thumbs from overlapping.

```html
<syn-range
  value="30 70"
  label="Demo of restricting values"
  min="0"
  max="100"
  restrict-movement=""
  step="1"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
```

---

## Ticks

Use the ticks slot to insert ticks or groups with ticks to improve positioning.

```html
<div class="wrapper">
  <syn-range
    class="syn-range-with-tick"
    max="100"
    min="0"
    value="50"
    label="Volume"
    size="medium"
    form=""
    data-optional=""
    data-valid=""
  >
    <nav slot="ticks">
      <syn-range-tick>0</syn-range-tick>
      <syn-range-tick>50</syn-range-tick>
      <syn-range-tick>100</syn-range-tick>
    </nav>
  </syn-range>

  <p>
    It is possible to divide the space between major ticks for finer scale
    readings.
  </p>

  <syn-range
    class="syn-range-with-tick"
    max="100"
    min="0"
    value="50"
    label="Volume"
    size="medium"
    form=""
    data-optional=""
    data-valid=""
  >
    <nav slot="ticks">
      <syn-range-tick>0</syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick>50</syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick>100</syn-range-tick>
    </nav>
  </syn-range>
</div>
<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }

  .syn-range-with-tick nav {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
  }
</style>
```

---

## Tooltip Placement

By default, the tooltip is shown on top. Set tooltip-placement to bottom to show it below the range.

```html
<syn-range
  tooltip-placement="bottom"
  max="100"
  min="0"
  value="50"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
```

---

## Tooltip Disabled

To disable the tooltip, set tooltip-placement to none.

```html
<syn-range
  max="100"
  min="0"
  tooltip-placement="none"
  value="50"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-range>
```

---

## Tooltip Formatter

You can change the tooltip’s content by setting the tooltipFormatter property to a function that accepts the range’s value as an argument.

```html
<syn-range
  class="tooltip-formatter"
  max="100"
  min="0"
  value="50"
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
  <nav slot="ticks">
    <syn-range-tick>0%</syn-range-tick>
    <syn-range-tick>50%</syn-range-tick>
    <syn-range-tick>100%</syn-range-tick>
  </nav>
</syn-range>
<style>
  .tooltip-formatter nav {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
  }
</style>
```
