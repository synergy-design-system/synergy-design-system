## Default

Dialogs, sometimes called "modals", appear above the page and require the user's immediate attention.

```html
<syn-dialog open="true" label="Dialog">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <span slot="footer"> </span>
  <syn-button class="default-close-icon" variant="filled" slot="footer"
    >Close</syn-button
  >
  <span slot="footer"> </span>
  <script slot="footer">
    [...document.querySelectorAll(".default-close-icon")].forEach((elm) => {
      elm.addEventListener("click", (e) => {
        const dialog = e.target.closest("syn-dialog");
        dialog.label += " - Clicked";
        dialog.hide();
        dialog.modal.deactivateExternal();
      });
    });
  </script>
  <span slot="footer"> </span>
</syn-dialog>

<syn-button class="dialog-default-story-opener">Open Dialog</syn-button>
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

  [...document.querySelectorAll(".dialog-default-story-opener")].forEach(
    (i) => {
      createOpener(i);
    },
  );
</script>
```
