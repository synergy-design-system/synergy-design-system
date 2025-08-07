## Default

Dialogs, sometimes called "modals", appear above the page and require the user's immediate attention.

```html
<syn-dialog open="" label="Dialog">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  <span slot="footer"> </span>
  <syn-button
    class="default-close-icon"
    variant="filled"
    slot="footer"
    title=""
    size="medium"
    >Close</syn-button
  >
  <span slot="footer"> </span>
  <span slot="footer"> </span>
</syn-dialog>

<syn-button
  class="dialog-default-story-opener"
  title=""
  variant="outline"
  size="medium"
  >Open Dialog</syn-button
>
```

---

## Custom Width

Use the --width custom property to set the dialog’s width.

```html
<syn-dialog open="" label="Dialog" style="--width: 50vw">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  <syn-button
    class="dialog-custom-width"
    variant="filled"
    slot="footer"
    title=""
    size="medium"
    >Close</syn-button
  >
</syn-dialog>

<syn-button
  class="dialog-custom-width-story-opener"
  title=""
  variant="outline"
  size="medium"
  >Open Dialog</syn-button
>
```

---

## Scrolling

By design, a dialog’s height will never exceed that of the viewport. As such, dialogs will not scroll with the page ensuring the header and footer are always accessible to the user.

```html
<syn-dialog open="" label="Dialog">
  <div>
    <p>Scroll down and give it a try! 👇</p>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet.
    </p>
  </div>

  <syn-button
    class="dialog-scrolling"
    variant="filled"
    slot="footer"
    title=""
    size="medium"
    >Close</syn-button
  >
</syn-dialog>

<syn-button
  class="dialog-scrolling-story-opener"
  title=""
  variant="outline"
  size="medium"
  >Open Dialog</syn-button
>
```

---

## Header Actions

The header shows a functional close button by default. You can use the header-actions slot to add additional icon buttons if needed.

```html
<syn-dialog open="" label="Dialog">
  <syn-icon-button
    class="new-window"
    slot="header-actions"
    name="open_in_new"
    label="Open in new Tab"
    size="inherit"
    color="currentColor"
  ></syn-icon-button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  <syn-button
    class="dialog-header-actions"
    variant="filled"
    slot="footer"
    title=""
    size="medium"
    >Close</syn-button
  >
</syn-dialog>

<syn-button
  class="dialog-header-actions-story-opener"
  title=""
  variant="outline"
  size="medium"
  >Open Dialog</syn-button
>
```

---

## Preventing The Dialog From Closing

By default, dialogs will close when the user clicks the close button, clicks the overlay, or presses the Escape key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.To keep the dialog open in such cases, you can cancel the syn-request-close event. When canceled, the dialog will remain open and pulse briefly to draw the user’s attention to it.You can use event.detail.source to determine what triggered the request to close. This example prevents the dialog from closing when the overlay is clicked, but allows the close button or Escape to dismiss it.

```html
<syn-dialog open="" label="Dialog" class="dialog-deny-close">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  <syn-button
    class="dialog-deny-close-actions"
    variant="filled"
    slot="footer"
    title=""
    size="medium"
    >Close</syn-button
  >
</syn-dialog>

<syn-button
  class="dialog-deny-close-story-opener"
  title=""
  variant="outline"
  size="medium"
  >Open Dialog</syn-button
>
```

---

## Customizing Initial Focus

By default, the dialog’s panel will gain focus when opened. This allows a subsequent tab press to focus on the first tabbable element in the dialog. If you want a different element to have focus, add the autofocus attribute to it as shown below.

```html
<syn-dialog label="Dialog">
  <syn-input
    autofocus=""
    placeholder="I will have focus when the dialog is opened"
    title=""
    type="text"
    size="medium"
    form=""
  ></syn-input>

  <syn-button
    class="dialog-initial-focus-actions"
    variant="filled"
    slot="footer"
    title=""
    size="medium"
    >Close</syn-button
  >
</syn-dialog>

<syn-button
  class="dialog-initial-focus-story-opener"
  title=""
  variant="outline"
  size="medium"
  >Open Dialog</syn-button
>
```
