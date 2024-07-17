# Known Issues and recipes - Components

---

## Layout issues with dynamic content in `<syn-button>`

### Meta Information

- Framework version: ALL
- Synergy version: ALL
- Issues: [#388](https://github.com/synergy-design-system/synergy-design-system/issues/388)

### Description

Synergies `<syn-button>` may get drawn without inner paddings when inserting content async.

### Cause

The `<syn-button>` element uses a [slotchange](https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/button/button.component.ts#L202C17-L202C27) listener to dynamically apply classes that effect the layout of the component.

As stated via [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event) `slotchange` events are fired when the **nodes** of a slot changes. As most frameworks are reusing instances of `Text` nodes, those events may not trigger when the framework does not fully redraw the components content.

### Proposed Solution

Rendering is a crucial task of current frontend frameworks. Most frameworks will try to reuse created `Text` nodes. However, for most frameworks it is enough to wrap the slot contents with an `HTMLElement`.

#### Solution:

```html
<!-- Before -->
<syn-button>DYNAMIC_TEXT</syn-button>

<!-- After -->
<syn-button>
  <span>DYNAMIC_TEXT</span>
</syn-button>
```

---

## Event listener `syn-hide` for `<syn-dialog>` gets called when closing a `<syn-details>`

### Meta Information

- Framework version: ALL
- Synergy version: ALL
- Issues: [#530](https://github.com/synergy-design-system/synergy-design-system/issues/530), [sl#2020](https://github.com/shoelace-style/shoelace/issues/2020), [sl#1956](https://github.com/shoelace-style/shoelace/issues/1956)

### Description

When trying to use the `syn-hide` event of a `<syn-dialog>`, the event is also triggered when closing a slotted `<syn-details>`.

### Cause

Synergy uses shared `CustomEvents` for all of its components. Per default, all of those events are bubbling. When the `<syn-details>` element is closed, it fires its `syn-hide` event. This event bubbles to `<syn-dialog>` and closes it.

### Proposed Solution

If the dialog should only be closed, listen to the `syn-request-close` event instead of `syn-hide`.
In other cases, make sure to suppress the other elements emitted `syn-hide` events.

#### Solution 1:

```html
<!-- Before -->
<syn-dialog open>
  <syn-details open summary="Example"></syn-details>
</syn-dialog>

<script type="module">
  // This listener is also fired when the syn-details is closed!
  document.querySelector("syn-dialog").addEventListener("syn-hide", e => {
    const { target } = e;
    target.close();
  });
</script>

<!-- After -->
<syn-dialog open>
  <syn-details open summary="Example"></syn-details>
</syn-dialog>

<script type="module">
  // This listener is only available on syn-dialog!
  document
    .querySelector("syn-dialog")
    .addEventListener("syn-request-close", e => {
      const { target } = e;
      target.close();
    });
</script>
```

#### Solution 2:

```html
<!-- Before -->
<syn-dialog open>
  <syn-details open summary="Example"></syn-details>
</syn-dialog>

<script type="module">
  // This listener is also fired when the syn-details is closed!
  document.querySelector("syn-dialog").addEventListener("syn-hide", e => {
    const { target } = e;
    console.log(target.tagName); // May be SYN-DIALOG or SYN-DETAILS!
    target.close();
  });
</script>

<!-- After -->
<syn-dialog open>
  <syn-details open summary="Example"></syn-details>
</syn-dialog>

<script type="module">
  // This listener is not fired when the syn-details is closed!
  document.querySelector("syn-dialog").addEventListener("syn-hide", e => {
    const { target } = e;
    if (target.tagName !== "SYN-DIALOG") {
      return;
    }
    target.close();
  });
</script>
```
