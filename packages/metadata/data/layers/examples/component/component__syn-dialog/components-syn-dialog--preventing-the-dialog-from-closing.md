## Preventing The Dialog From Closing

By default, dialogs will close when the user clicks the close button, clicks the overlay, or presses the Escape key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.To keep the dialog open in such cases, you can cancel the syn-request-close event. When canceled, the dialog will remain open and pulse briefly to draw the user’s attention to it.You can use event.detail.source to determine what triggered the request to close. This example prevents the dialog from closing when the overlay is clicked, but allows the close button or Escape to dismiss it.

```html
<syn-dialog open="" label="Dialog" class="dialog-deny-close">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  <syn-button class="dialog-deny-close-actions" variant="filled" slot="footer"
    >Close</syn-button
  >
  <script>
    [...document.querySelectorAll(".dialog-deny-close-actions")].forEach(
      (elm) => {
        elm.addEventListener("click", (e) => {
          const dialog = e.target.closest("syn-dialog");
          dialog.label += " - Clicked";
          dialog.hide();
          dialog.modal.deactivateExternal();
        });
      },
    );
  </script>
</syn-dialog>
<script type="module">
  const dialog = document.querySelector(".dialog-deny-close");
  dialog.addEventListener("syn-request-close", (event) => {
    if (event.detail.source === "overlay") {
      event.preventDefault();
    }
  });
</script>

<syn-button class="dialog-deny-close-story-opener">Open Dialog</syn-button>
<script type="module">
  const createOpener = (opener) => {
    // Storybook only: When loading the docs page, all dialogs are applying a focus trap.
    // Remove the initial trap and make sure to do the same when recreating the story.
    const loadedDialog = opener.parentElement.querySelector("syn-dialog");
    loadedDialog.modal.activateExternal();

    opener.addEventListener("click", (e) => {
      const currentDialog = e.target.parentElement.querySelector("syn-dialog");
      currentDialog.show();
      currentDialog.modal.activateExternal();
    });
  };

  [...document.querySelectorAll(".dialog-deny-close-story-opener")].forEach(
    (i) => {
      createOpener(i);
    },
  );
</script>
```
