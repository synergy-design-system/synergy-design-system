## Default

Tooltips display additional information based on a specific action.A tooltip’s target is its first child element, so you should only wrap one element inside of the tooltip. If you need the tooltip to show up for multiple elements, nest them inside a container first.Tooltips use display: contents so they won’t interfere with how elements are positioned in a flex or grid layout.

```html
<syn-tooltip content="This is a tooltip" distance="13" open="">
  <syn-button title="" variant="outline" size="medium">Hover me</syn-button>
</syn-tooltip>
```

---

## Placement

Use the placement attribute to set the preferred placement of the tooltip.

```html
<div class="tooltip-placement-example">
  <div class="tooltip-placement-example-row">
    <syn-tooltip content="top-start" placement="top-start" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>

    <syn-tooltip content="top" placement="top" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>

    <syn-tooltip content="top-end" placement="top-end" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <syn-tooltip content="left-start" placement="left-start" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>

    <syn-tooltip content="right-start" placement="right-start" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <syn-tooltip content="left" placement="left" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>

    <syn-tooltip content="right" placement="right" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <syn-tooltip content="left-end" placement="left-end" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>

    <syn-tooltip content="right-end" placement="right-end" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <syn-tooltip content="bottom-start" placement="bottom-start" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>

    <syn-tooltip content="bottom" placement="bottom" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>

    <syn-tooltip content="bottom-end" placement="bottom-end" open="">
      <syn-button title="" variant="outline" size="medium"></syn-button>
    </syn-tooltip>
  </div>
</div>

<style>
  .tooltip-placement-example {
    width: 500px;
    margin: 5rem 6rem;
  }

  .tooltip-placement-example-row:after {
    content: "";
    display: table;
    clear: both;
  }

  .tooltip-placement-example syn-button {
    float: left;
    width: var(--syn-spacing-2x-large);
    margin-bottom: var(--syn-spacing-medium);
  }

  .tooltip-placement-example-row:nth-child(1)
    syn-tooltip:first-child
    syn-button,
  .tooltip-placement-example-row:nth-child(5)
    syn-tooltip:first-child
    syn-button {
    margin-left: var(--syn-spacing-3x-large);
    margin-right: var(--syn-spacing-4x-large);
  }

  .tooltip-placement-example-row:nth-child(1)
    syn-tooltip:nth-child(2)
    syn-button,
  .tooltip-placement-example-row:nth-child(5)
    syn-tooltip:nth-child(2)
    syn-button {
    margin-right: var(--syn-spacing-4x-large);
  }

  .tooltip-placement-example-row:nth-child(2)
    syn-tooltip:nth-child(2)
    syn-button,
  .tooltip-placement-example-row:nth-child(3)
    syn-tooltip:nth-child(2)
    syn-button,
  .tooltip-placement-example-row:nth-child(4)
    syn-tooltip:nth-child(2)
    syn-button {
    margin-left: calc(
      (var(--syn-spacing-2x-large) * 3) + (var(--syn-spacing-4x-large) * 2) +
        (var(--syn-spacing-medium) * 2)
    );
  }
</style>
```

---

## Click Trigger

Set the trigger attribute to click to toggle the tooltip on click instead of hover.

```html
<syn-tooltip content="Click again to dismiss" trigger="click" open="">
  <syn-button title="" variant="outline" size="medium"
    >Click to Toggle</syn-button
  >
</syn-tooltip>
```

---

## Manual Trigger

Tooltips can be controlled programmatically by setting the trigger attribute to manual. Use the open attribute to control when the tooltip is shown.

```html
<syn-button style="margin-right: 4rem" title="" variant="outline" size="medium"
  >Toggle Manually</syn-button
>
<syn-tooltip
  content="This is an avatar"
  trigger="manual"
  class="manual-tooltip"
  open=""
>
  <syn-icon-button
    name="person"
    label="Person"
    size="medium"
    color="neutral"
  ></syn-icon-button>
</syn-tooltip>
```

---

## Removing Arrows

You can control the size of tooltip arrows by overriding the --syn-tooltip-arrow-size design token. To remove them, set the value to 0 as shown below.

```html
<syn-tooltip
  content="This is a tooltip"
  style="--syn-tooltip-arrow-size: 0"
  open=""
>
  <syn-button title="" variant="outline" size="medium">No Arrow</syn-button>
</syn-tooltip>
```

---

## HTML In Tooltips

Use the content slot to create tooltips with HTML content. Tooltips are designed only for text and presentational elements. Avoid placing interactive content, such as buttons, links, and form controls, in a tooltip.

```html
<syn-tooltip open="">
  <div slot="content">
    I'm not <strong>just</strong> a tooltip, I'm a <em>tooltip</em> with HTML!
  </div>

  <syn-button title="" variant="outline" size="medium">Hover me</syn-button>
</syn-tooltip>
```

---

## Setting A Maximum Width

Use the --max-width custom property to change the width the tooltip can grow to before wrapping occurs.

```html
<syn-tooltip
  style="--max-width: 80px"
  content="This tooltip will wrap after only 80 pixels."
  open=""
>
  <syn-button title="" variant="outline" size="medium">Hover me</syn-button>
</syn-tooltip>
```
