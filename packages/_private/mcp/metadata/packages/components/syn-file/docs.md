
## Default

File control is a component with which a user can select a local file. It shows the value of the selected file.

```html
<syn-file size="medium" form=""></syn-file>

```

---

## Label

Use the label attribute to give the file selector an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-file label="This is a label" size="medium" form=""></syn-file>

```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-file
  help-text="This is a help text."
  label="This is a label"
  size="medium"
  form=""
></syn-file>

```

---

## Multiple

Use the multiple attribute to allow the selection of multiple files.Figma only: Override the button/droparea and value text directly, to indicate that multiple files are selected (“file” -> “files”)

```html
<syn-file
  label="Multiple file input"
  multiple=""
  size="medium"
  form=""
></syn-file>

```

---

## Hide Value

There might be situations, where you don’t want to show the selected value (e. g. when something is automatically uploading).

```html
<syn-file
  hide-value=""
  label="This is a label"
  size="medium"
  form=""
></syn-file>

```

---

## Focus

The focus event gives the user feedback that the Dropzone has been focused by the keyboard interaction and that the syn-file component is ready for use.

```html
<div style="padding: 5px">
  <syn-file
    label="This is a label"
    help-text="This is a help text"
    droparea=""
    size="medium"
    form=""
  ></syn-file>
</div>

```

---

## Disabled

Use the disabled attribute to disable a file input.

```html
<div style="display: flex; flex-direction: column; gap: 1rem">
  <syn-file
    disabled=""
    label="This is a label"
    size="medium"
    form=""
  ></syn-file>
  <syn-file
    disabled=""
    droparea=""
    label="This is a label"
    size="medium"
    form=""
  ></syn-file>
</div>

```

---

## Sizes

Use the size attribute to change the component's size.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-file size="small" label="Small" form=""></syn-file>
  <syn-file size="medium" label="Medium" form=""></syn-file>
  <syn-file size="large" label="Large" form=""></syn-file>
</div>

```

---

## Invalid

The invalid status is used to warn the user that the syn-file is invalid. For example, if the entry of text is mandatory and nothing has been entered or if a text has been entered that does not have the correct format.

```html
<form class="custom-validity">
  <syn-file
    class="syn-file-invalid"
    droparea=""
    help-text="This is an error text."
    label="This is a label"
    size="medium"
    form=""
    data-optional=""
    data-invalid=""
  ></syn-file>
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

## Droparea

Use the droparea attribute to switch to a full-width button with a drop area.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-file
    accept="text/plain,image/*"
    droparea=""
    help-text="This is a help text"
    label="Small"
    multiple=""
    size="small"
    form=""
  ></syn-file>
  <syn-file
    accept="text/plain,image/*"
    droparea=""
    help-text="This is a help text"
    label="Medium"
    multiple=""
    size="medium"
    form=""
  ></syn-file>
  <syn-file
    accept="text/plain,image/*"
    droparea=""
    help-text="This is a help text"
    label="Large"
    multiple=""
    size="large"
    form=""
  ></syn-file>
</div>

```

---

## Directory

The webkitdirectory setting allows users to select entire directories instead of individual files. When a directory is chosen, all files inside (including those in sub-directories) are selected. Although this feature is not part of the official HTML specification, it is widely supported across major browsers.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-file label="Button" webkitdirectory="" size="medium" form=""></syn-file>
  <syn-file
    droparea=""
    label="Droparea"
    webkitdirectory=""
    size="medium"
    form=""
  ></syn-file>
</div>

```
