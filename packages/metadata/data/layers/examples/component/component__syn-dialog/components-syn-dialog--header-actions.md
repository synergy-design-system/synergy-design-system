## Header Actions

The header shows a functional close button by default. You can use the header-actions slot to add additional icon buttons if needed.

```html
<syn-dialog open="" label="Dialog">
  <syn-icon-button
    class="new-window"
    slot="header-actions"
    name="open_in_new"
    label="Open in new Tab"
  ></syn-icon-button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.

  <syn-button class="dialog-header-actions" variant="filled" slot="footer"
    >Close</syn-button
  >
  <script>
    [...document.querySelectorAll(".dialog-header-actions")].forEach((elm) => {
      elm.addEventListener("click", (e) => {
        const dialog = e.target.closest("syn-dialog");
        dialog.label += " - Clicked";
        dialog.hide();
        dialog.modal.deactivateExternal();
      });
    });
  </script>
</syn-dialog>
<script type="module">
  document
    .querySelector(".new-window")
    .addEventListener("click", () => window.open(location.href));
</script>

<syn-button class="dialog-header-actions-story-opener">Open Dialog</syn-button>
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

  [...document.querySelectorAll(".dialog-header-actions-story-opener")].forEach(
    (i) => {
      createOpener(i);
    },
  );
</script>
```
