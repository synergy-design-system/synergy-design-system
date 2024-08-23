# Known issues and limitations - Components

This file lists known issues and limitations of Synergy Web Components and useful information with working on web-components.

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

As stated via [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event) `slotchange` events are fired when the **nodes** of a slot change. As most frameworks are reusing instances of `Text` nodes, those events will not trigger when the framework does not fully redraw the components content.

### Proposed Solution

Rendering is a crucial task of current frontend frameworks. Most frameworks will try to reuse created `Text` nodes. However, for most frameworks it is enough to wrap the slot contents with any `HTMLElement`.

#### Problem

```html
<syn-button>DYNAMIC_TEXT</syn-button>
```

#### Solution

```html
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

#### Problem

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
```

#### Solution 1

```html
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

## Click events for `syn-nav-item` are not fired when clicking slotted items (e.g. icons)

### Meta Information

- Framework version: ALL
- Synergy version: ALL
- Issues: [#562](https://github.com/synergy-design-system/synergy-design-system/issues/530), [sl#2020](https://github.com/shoelace-style/shoelace/issues/562)

### Description

When adding a `click` listener to a `<syn-nav-item>` that has content in the `prefix` or `suffix` slot, the `event.target` is the slotted element instead of the instance of the `<syn-nav-item>`.

### Cause

Synergy components make heavy use of [ShadowDOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM). When using the ShadowDOM, all internal events will get [**retargeted** to the events instance](https://lit.dev/docs/components/events/#shadowdom-retargeting). However, slotted elements are still part of the LightDOM and are not part of this retargetting. Therefore, when clicking a slotted `<syn-icon>`, the `event.target` will reference the slotted `<syn-icon>`.

### Proposed Solution

Try to match on the next `<syn-nav-item>` with the closest selector. This will also match for slotted elements.

#### Problem

```html
<syn-side-nav>
  <syn-nav-item href="/">
    Home
    <syn-icon name="home" slot="prefix"></syn-icon>
  </syn-nav-item>
  <syn-side-nav>
    <script type="module">
      // This listener will only work when "Home" is clicked
      // It will display a runtime error (unknown property "href") when the syn-icon is clicked
      document.querySelector("syn-nav-item").addEventListener("click", e => {
        const { target } = e;
        document.location = target.ref;
      });
    </script></syn-side-nav
  ></syn-side-nav
>
```

#### Solution

```html
<script type="module">
  // This listener will work when any part of the syn-button is clicked
  document.querySelector("syn-side-nav").addEventListener("click", e => {
    const { target } = e;
    document.location = target.closest("syn-nav-item").ref;
  });
</script>
```
