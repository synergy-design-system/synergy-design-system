## Custom Width

Use the --width custom property to set the dialog’s width.

```html
<syn-dialog open="" label="Dialog" style="--width: 50vw">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  <syn-button class="dialog-custom-width" variant="filled" slot="footer"
    >Close</syn-button
  >
  <script>
    [...document.querySelectorAll(".dialog-custom-width")].forEach((elm) => {
      elm.addEventListener("click", (e) => {
        const dialog = e.target.closest("syn-dialog");
        dialog.label += " - Clicked";
        dialog.hide();
        dialog.modal.deactivateExternal();
      });
    });
  </script>
</syn-dialog>

<syn-button class="dialog-custom-width-story-opener">Open Dialog</syn-button>
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

  [...document.querySelectorAll(".dialog-custom-width-story-opener")].forEach(
    (i) => {
      createOpener(i);
    },
  );
</script>
```
