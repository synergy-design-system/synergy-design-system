# Known issues and limitations - Components

This file lists known issues and limitations of Synergy Web Components and useful information with working on web-components.

---

## Console errors when using spaces in `<syn-option>` values

### Meta Information

- Framework version: ALL
- Synergy version: ALL
- Issues: [#1087](https://github.com/synergy-design-system/synergy-design-system/issues/1087)

### Description

When using `<syn-option>` components with values that contain spaces inside `<syn-select>` or `<syn-combobox>` components, you may see console errors like:

> Option values cannot include " ". All occurrences of " " have been replaced with "\_".

### Cause

When using the `multiple` attribute, Synergy components create a space-separated list of selected values (e.g., `"Option_One Option_Two"`). If option values themselves contain spaces, the component cannot properly distinguish between individual values in this list. To prevent data corruption, spaces in option values are automatically replaced with underscores (`_`).

### Proposed Solution

#### Problem

```html
<syn-select multiple>
  <syn-option value="Option One">Option One</syn-option>
  <syn-option value="Option Two">Option Two</syn-option>
</syn-select>
```

#### Solution 1: Use space-free values (Recommended)

Design your option values without spaces and use the display text separately:

```html
<syn-select multiple>
  <syn-option value="option-one">Option One</syn-option>
  <syn-option value="option-two">Option Two</syn-option>
</syn-select>
```

#### Solution 2: Change the global delimiter

If you need to keep spaces in values and don't mind changing how all select and combobox components work globally, you can configure a different delimiter:

```js
import { setGlobalDefaultSettings } from "@synergy-design-system/components";

setGlobalDefaultSettings({
  delimiter: {
    SynOption: ",",
    SynSelect: ",",
    SynCombobox: ",",
  },
});
```

**Note:** This affects **all** select and combobox components in your application, which do not explicitly set the `delimiter` attribute.

## Layout issues with dynamic content in `<syn-button>`
<h2 id="syn-input-number-width">`<syn-input type="number">` is too large when no `width` is set</h2>

<h3 id="syn-input-number-width-meta">Meta Information</h3>

- Framework version: ALL
- Synergy version: ALL

<h3 id="syn-input-number-width-description">Description</h3>

Synergies `<syn-input>` may get drawn too wide if the `numeric-strategy` is using `noStepAlign`.
This is the case automatically starting with Synergy version 3.0.

<h3 id="syn-input-number-width-cause">Cause</h3>

This problem is that the `<syn-input>` needs `step="any"` to circumvent the native checks on the step property.
When setting `step="2"` for example, browser validation will flag a value of `3` as an error.
Synergy allows to circumvent this via `noStepAlign` as part of a custom strategy or per default when using the `modern` preset.

With this applied, `<syn-input>` must set `step="any"` on the rendered `<input>` component. As browsers assume the user will be able to enter an unknown amount of characters, they will draw the field with a minimal size of 10 characters, making it appear too wide. This is a feature built into the browser and cannot be changed.

<h3 id="syn-input-number-width-solution">Proposed Solution</h3>

If you encounter such errors, make sure to provide a fixed `max-width`.

<h4 id="syn-input-number-width-problem">Problem</h4>

```html
<!--
 -- The right container will be much larger with numeric-strategy="modern" applied
-->
<div class="container">
  <div class="left">Content (auto grow)</div>
  <div class="right">
    <syn-input
      type="number"
      min="5"
      max="10"
      numeric-strategy="modern"
    ></syn-input>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
  }

  .left {
    flex: 1;
    width: 100%;
  }

  .right {
    flex-grow: 0;
  }
</style>
```

<h4 id="syn-input-number-width-solution-1">Solution 1</h4>

If you do not need the `modern` behavior, use `numeric-strategy="native"` instead:

```html
<div class="container">
  <div class="left">Content (auto grow)</div>
  <div class="right">
    <syn-input
      type="number"
      min="5"
      max="10"
      numeric-strategy="native"
    ></syn-input>
  </div>
</div>
```

<h4 id="syn-input-number-width-solution-2">Solution 2</h4>

Set the width of the element directly

```html
<div class="container">
  <div class="left">Content (auto grow)</div>
  <div class="right">
    <syn-input
      type="number"
      min="5"
      max="10"
      numeric-strategy="modern"
    ></syn-input>
  </div>
</div>

<style>
  .right syn-input {
    width: 130px;
  }
</style>
```

---

<h2 id="syn-button-dynamic-content">Layout issues with dynamic content in `<syn-button>`</h2>

<h3 id="syn-button-dynamic-content-meta">Meta Information</h3>

- Framework version: ALL
- Synergy version: ALL
- Issues: [#388](https://github.com/synergy-design-system/synergy-design-system/issues/388)

<h3 id="syn-button-dynamic-content-description">Description</h3>

Synergies `<syn-button>` may get drawn without inner paddings when inserting content async.

<h3 id="syn-button-dynamic-content-cause">Cause</h3>

The `<syn-button>` element uses a [slotchange](https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/button/button.component.ts#L202C17-L202C27) listener to dynamically apply classes that effect the layout of the component.

As stated via [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event) `slotchange` events are fired when the **nodes** of a slot change. As most frameworks are reusing instances of `Text` nodes, those events will not trigger when the framework does not fully redraw the components content.

<h3 id="syn-button-dynamic-content-solution">Proposed Solution</h3>

Rendering is a crucial task of current frontend frameworks. Most frameworks will try to reuse created `Text` nodes. However, for most frameworks it is enough to wrap the slot contents with any `HTMLElement`.

<h4 id="syn-button-dynamic-content-problem">Problem</h4>

```html
<syn-button>DYNAMIC_TEXT</syn-button>
```

<h4 id="syn-button-dynamic-content-solution-example">Solution</h4>

```html
<syn-button>
  <span>DYNAMIC_TEXT</span>
</syn-button>
```

---

<h2 id="syn-dialog-closes-unexpectedly">`<syn-dialog>` closes itself when interacting with certain elements</h2>

<h3 id="syn-dialog-closes-unexpectedly-meta">Meta Information</h3>

- Framework version: ALL
- Synergy version: ALL
- Issues: [#530](https://github.com/synergy-design-system/synergy-design-system/issues/530), [#572](https://github.com/synergy-design-system/synergy-design-system/issues/572), [sl#2020](https://github.com/shoelace-style/shoelace/issues/2020), [sl#1956](https://github.com/shoelace-style/shoelace/issues/1956)

<h3 id="syn-dialog-closes-unexpectedly-description">Description</h3>

A `<syn-dialog>` element may close itself unexpectedly when interacting with elements like `<syn-select>`, `<syn-accordion>` or `<syn-details>` and having a listener attached on the `syn-hide` event.

<h3 id="syn-dialog-closes-unexpectedly-cause">Cause</h3>

Synergy uses shared `CustomEvents` for all of its components. Per default, all of those events are bubbling. When a `<syn-select>`, `<syn-accordion>` or `<syn-details>` element is closed, it fires its own `syn-hide` event. This event bubbles to `<syn-dialog>` and closes it.

<h3 id="syn-dialog-closes-unexpectedly-solution">Proposed Solution</h3>

If you want to close the dialog only, listen to its `syn-request-close` event instead of `syn-hide`.
In other cases, make sure to suppress the other elements' emitted `syn-hide` events or filter the event's target to just listen for the wanted instance of the `<syn-dialog>`.

<h4 id="syn-dialog-closes-unexpectedly-problem">Problem</h4>

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

<h4 id="syn-dialog-closes-unexpectedly-solution-1">Solution 1</h4>

```html
<syn-dialog open>
  <syn-details open summary="Example"></syn-details>
</syn-dialog>

<script type="module">
  // This listener will only work on syn-dialog!
  document
    .querySelector("syn-dialog")
    .addEventListener("syn-request-close", e => {
      const { target } = e;
      target.close();
    });
</script>
```

<h4 id="syn-dialog-closes-unexpectedly-solution-2">Solution 2</h4>

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

<h4 id="syn-dialog-closes-unexpectedly-solution-3">Solution 3</h4>

```html
<syn-dialog open>
  <syn-details open summary="Example"></syn-details>
</syn-dialog>

<script type="module">
  // Suppress the bubbling of the syn-hide event of the details element
  document.querySelector("syn-details").addEventListener("syn-hide", e => {
    e.stopPropagation();
  });

  document.querySelector("syn-dialog").addEventListener("syn-hide", e => {
    const { target } = e;
    target.close();
  });
</script>
```

---

<h2 id="syn-nav-item-click-events">Click events for `syn-nav-item` are not fired when clicking slotted items (e.g. icons)</h2>

<h3 id="syn-nav-item-click-events-meta">Meta Information</h3>

- Framework version: ALL
- Synergy version: ALL
- Issues: [#562](https://github.com/synergy-design-system/synergy-design-system/issues/530), [sl#2020](https://github.com/shoelace-style/shoelace/issues/562)

<h3 id="syn-nav-item-click-events-description">Description</h3>

When adding a `click` listener to a `<syn-nav-item>` that has content in the `prefix` or `suffix` slot, the `event.target` is the slotted element instead of the instance of the `<syn-nav-item>`.

<h3 id="syn-nav-item-click-events-cause">Cause</h3>

Synergy components make heavy use of [ShadowDOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM). When using the ShadowDOM, all internal events will get [**retargeted** to the events instance](https://lit.dev/docs/components/events/#shadowdom-retargeting). However, slotted elements are still part of the LightDOM and are not part of this retargetting. Therefore, when clicking a slotted `<syn-icon>`, the `event.target` will reference the slotted `<syn-icon>`.

<h3 id="syn-nav-item-click-events-solution">Proposed Solution</h3>

Try to match on the next `<syn-nav-item>` with the closest selector. This will also match for slotted elements.

<h4 id="syn-nav-item-click-events-problem">Problem</h4>

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

<h4 id="syn-nav-item-click-events-solution-example">Solution</h4>

```html
<script type="module">
  // This listener will work when any part of the syn-button is clicked
  document.querySelector("syn-side-nav").addEventListener("click", e => {
    const { target } = e;
    document.location = target.closest("syn-nav-item").ref;
  });
</script>
```

---

<h2 id="container-type-rendering-order">Wrong rendering order with container-type set on parent for `<syn-select>`, `<syn-combobox>`, `<syn-dropdown>`, and `<syn-tooltip>`</h2>

<h3 id="container-type-rendering-order-meta">Meta Information</h3>

- Framework version: ALL
- Synergy version: ALL
- Browsers: Safari, older Chrome and older Firefox versions
- Issues: [#612](https://github.com/synergy-design-system/synergy-design-system/issues/612)

<h3 id="container-type-rendering-order-description">Description</h3>

Parts of Synergies `<syn-select>`, `<syn-combobox>`, `<syn-dropdown>`, and `<syn-tooltip>` may get drawn behind other elements, if the `container-type` css property of a parent element is set to something different than `normal`.

<h3 id="container-type-rendering-order-cause">Cause</h3>

Older Chrome and Firefox browser versions as well as current Safari browser have a special handling for container queries, which was declared as a "design mistake". For this reason the browsers are already having or getting an updated handling for this and also the specification should be updated in the future.
The old handling was that `container-type: inline-size` or `container-type: size`:

- created a containing block
- created a new stacking context

For further information have a look at [this article](https://dev.to/michaelcharles/chrome-129s-container-query-change-2i77)

This old behavior results in e.g. open `<syn-select>` options lists not being rendered above other elements (e.g. like `<syn-checkbox>`) but behind them.

<h3 id="container-type-rendering-order-solution">Proposed Solution</h3>

To work around this problem, add a `position: relative` and a `z-index` to the element with `container-type`.

<h4 id="container-type-rendering-order-problem">Problem</h4>

```html
<div class="container">
  <syn-select>
    <syn-option value="opt1">Option 1</syn-option>
    <syn-option value="opt2">Option 2</syn-option>
    <syn-option value="opt3">Option 3</syn-option>
  </syn-select>
</div>

<syn-checkbox>This is a checkbox</syn-checkbox>

<style>
  .container {
    container-type: inline-size;
    margin-bottom: 30px;
  }
</style>
```

<h4 id="container-type-rendering-order-solution-example">Solution</h4>

```html
<div class="container">
  <syn-select>
    <syn-option value="opt1">Option 1</syn-option>
    <syn-option value="opt2">Option 2</syn-option>
    <syn-option value="opt3">Option 3</syn-option>
  </syn-select>
</div>

<syn-checkbox>This is a checkbox</syn-checkbox>

<style>
  .container {
    container-type: inline-size;
    margin-bottom: 30px;

    position: relative;
    z-index: 1;
  }
</style>
```

---
