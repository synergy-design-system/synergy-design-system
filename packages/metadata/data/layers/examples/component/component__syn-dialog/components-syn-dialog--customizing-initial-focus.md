## Customizing Initial Focus

By default, the dialog’s panel will gain focus when opened. This allows a subsequent tab press to focus on the first tabbable element in the dialog. If you want a different element to have focus, add the autofocus attribute to it as shown below.

```html
<syn-dialog label="Dialog">
  <syn-input
    autofocus=""
    placeholder="I will have focus when the dialog is opened"
  ></syn-input>

  <syn-button
    class="dialog-initial-focus-actions"
    variant="filled"
    slot="footer"
    >Close</syn-button
  >
  <script>
    [...document.querySelectorAll(".dialog-initial-focus-actions")].forEach(
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

<syn-button class="dialog-initial-focus-story-opener">Open Dialog</syn-button>
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

  [...document.querySelectorAll(".dialog-initial-focus-story-opener")].forEach(
    (i) => {
      createOpener(i);
    },
  );
</script>
```
