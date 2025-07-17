
## Default

Textareas collect data from the user and allow multiple lines of text.

```html
<syn-textarea
  rows="4"
  spellcheck=""
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>

```

---

## Labels

Use the label attribute to give the textarea an accessible label. For labels that contain HTML, use the label slot instead.

```html
<syn-textarea
  label="Comments"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>

```

---

## Help Text

Add descriptive help text to a switch with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.The help-text attribute should not be used to display error messages. To handle validation and error messaging, use syn-validate for proper error management.

```html
<syn-textarea
  label="Feedback"
  help-text="Please tell us what you think."
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
>
</syn-textarea>

```

---

## Rows

Use the rows attribute to change the number of text rows that get shown.

```html
<syn-textarea
  rows="1"
  placeholder="One row shown"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>
<syn-textarea
  rows="5"
  placeholder="Five rows shown"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>
<syn-textarea
  rows="3"
  placeholder="Three rows shown"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>
<style>
  syn-textarea {
    margin-bottom: 1rem;
  }
</style>

```

---

## Placeholders

Use the placeholder attribute to add a placeholder.

```html
<syn-textarea
  placeholder="Type something"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>

```

---

## Readonly Textareas

Add the read-only attribute to draw a read-only textarea.

```html
<syn-textarea
  value="Read-only content"
  readonly=""
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>

```

---

## Focus

The focus event gives the user feedback that the Textarea has been focused by the keyboard interaction and that the Textarea component is ready for use.

```html
<div style="padding: 5px">
  <form>
    <syn-textarea
      placeholder="This is in focus"
      title=""
      size="medium"
      form=""
      data-optional=""
      data-valid=""
    ></syn-textarea>
  </form>
</div>

```

---

## Disabled

Use the disabled attribute to disable a textarea.

```html
<syn-textarea
  placeholder="Textarea"
  help-text="Please tell us what you think."
  label="Label"
  disabled=""
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>

```

---

## Sizes

Use the size attribute to change a textarea’s size.

```html
<syn-textarea
  placeholder="Small"
  size="small"
  title=""
  form=""
  data-optional=""
  data-valid=""
></syn-textarea
><br />
<syn-textarea
  placeholder="Medium"
  size="medium"
  title=""
  form=""
  data-optional=""
  data-valid=""
></syn-textarea
><br />
<syn-textarea
  placeholder="Large"
  size="large"
  title=""
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>

```

---

## Invalid

The invalid status is used to warn the user that the input is invalid. For example, if the entry of text is mandatory and nothing has been entered or if a text has been entered that does not have the correct format.

```html
<form class="custom-validity">
  <syn-textarea
    placeholder="Type something"
    help-text="This textarea is required."
    required=""
    title=""
    size="medium"
    form=""
    data-required=""
    data-invalid=""
  ></syn-textarea>
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

## Prevent Resizing

By default, textareas can be resized vertically by the user. To prevent resizing, set the resize attribute to none.

```html
<syn-textarea
  resize="none"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>

```

---

## Expand With Content

Textareas will automatically resize to expand to fit their content when resize is set to auto.

```html
<syn-textarea
  resize="auto"
  placeholder="Type something"
  title=""
  size="medium"
  form=""
  data-optional=""
  data-valid=""
></syn-textarea>

```
