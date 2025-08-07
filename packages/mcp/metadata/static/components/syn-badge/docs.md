## Default

Badges are used to draw attention and display statuses or counts.

```html
<syn-badge variant="primary"> Badge </syn-badge>
```

---

## Variants

Set the variant attribute to change the badge’s variant.

```html
<div style="display: flex; gap: var(--syn-spacing-large)">
  <syn-badge variant="primary">primary</syn-badge>
  <syn-badge variant="success">success</syn-badge>
  <syn-badge variant="neutral">neutral</syn-badge>
  <syn-badge variant="warning">warning</syn-badge>
  <syn-badge variant="danger">danger</syn-badge>
</div>
```

---

## With Buttons

One of the most common use cases for badges is attaching them to buttons. DEV: To make this easier, badges will be automatically positioned at the top-right when they’re a child of a button.

```html
<div style="display: flex; gap: var(--syn-spacing-2x-large)">
  <syn-button title="" variant="outline" size="medium">
    Requests
    <syn-badge pill="" variant="primary">30</syn-badge>
  </syn-button>

  <syn-button
    style="margin-inline-start: 1rem"
    title=""
    variant="outline"
    size="medium"
  >
    Warnings
    <syn-badge variant="warning" pill="">8</syn-badge>
  </syn-button>

  <syn-button
    style="margin-inline-start: 1rem"
    title=""
    variant="outline"
    size="medium"
  >
    Errors
    <syn-badge variant="danger" pill="">6</syn-badge>
  </syn-button>
</div>
```

---

## With Menu Items

When including badges in menu items, use the suffix slot to make sure they’re aligned correctly.

```html
<syn-menu style="max-width: 228px" role="menu">
  <syn-menu-label>Messages</syn-menu-label>
  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="0"
    >Comments
    <syn-badge slot="suffix" variant="neutral" pill=""
      >4</syn-badge
    ></syn-menu-item
  >
  <syn-menu-item role="menuitem" aria-disabled="false" tabindex="-1"
    >Replies
    <syn-badge slot="suffix" variant="neutral" pill=""
      >12</syn-badge
    ></syn-menu-item
  >
</syn-menu>
```

---

## With Empty Content

Badges can be used without content to just show an status indicator.

```html
<div
  style="display: flex; position: relative; gap: var(--syn-spacing-3x-large)"
>
  <syn-popup
    active=""
    distance="-8"
    placement="right-start"
    skidding="-10"
    strategy="absolute"
  >
    <syn-icon
      name="wallpaper"
      style="font-size: var(--syn-font-size-x-large)"
      slot="anchor"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    <syn-badge variant="primary"></syn-badge>
  </syn-popup>

  <syn-popup
    active=""
    distance="-8"
    placement="right-start"
    skidding="-10"
    strategy="absolute"
  >
    <syn-icon
      name="wallpaper"
      style="font-size: var(--syn-font-size-x-large)"
      slot="anchor"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    <syn-badge variant="primary">12</syn-badge>
  </syn-popup>
</div>
```
