
## Subheadline



```html
<syn-details summary="Toggle Me" contained="" size="medium">
  <h3
    style="
      margin: 0 0 var(--syn-spacing-x-small);
      font: var(--syn-body-small-bold);
      color: var(--syn-typography-color-text);
    "
  >
    Subheadline
  </h3>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
</syn-details>

```

---

## Default

Details show a brief summary and expand to show additional content. If you want to group the details, we recommend that you use the syn-accordion component.

```html
<syn-details summary="Toggle Me" contained="" size="medium">
  <h3
    style="
      margin: 0 0 var(--syn-spacing-x-small);
      font: var(--syn-body-small-bold);
      color: var(--syn-typography-color-text);
    "
  >
    Subheadline
  </h3>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
</syn-details>

```

---

## Open

Details show a brief summary and expand to show additional content.

```html
<syn-details summary="Toggle Me" open="" size="medium">
  <h3
    style="
      margin: 0 0 var(--syn-spacing-x-small);
      font: var(--syn-body-small-bold);
      color: var(--syn-typography-color-text);
    "
  >
    Subheadline
  </h3>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
</syn-details>

```

---

## Contained

To give content more structure, you can use the property contained.

```html
<syn-details summary="Toggle Me" contained="" size="medium">
  <h3
    style="
      margin: 0 0 var(--syn-spacing-x-small);
      font: var(--syn-body-small-bold);
      color: var(--syn-typography-color-text);
    "
  >
    Subheadline
  </h3>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
</syn-details>
<br />
<syn-details summary="Toggle Me" open="" contained="" size="medium">
  <h3
    style="
      margin: 0 0 var(--syn-spacing-x-small);
      font: var(--syn-body-small-bold);
      color: var(--syn-typography-color-text);
    "
  >
    Subheadline
  </h3>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
</syn-details>

```

---

## Focus

The focus event gives the user feedback that the detail has been focused by the keyboard interaction.

```html
<div style="padding: 5px">
  <syn-details summary="Toggle Me" contained="" size="medium">
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
        color: var(--syn-typography-color-text);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
</div>

```

---

## Disabled

Use the disable attribute to prevent the details from expanding.

```html
<syn-details summary="Toggle Me" disabled="" contained="" size="medium">
  <h3
    style="
      margin: 0 0 var(--syn-spacing-x-small);
      font: var(--syn-body-small-bold);
      color: var(--syn-typography-color-text);
    "
  >
    Subheadline
  </h3>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
</syn-details>

```

---

## Sizes

Use the size attribute to change a detail’s size.

```html
<syn-details size="medium" contained="">
  <span slot="summary">Toggle Me</span>
  <h3
    style="
      margin: 0 0 var(--syn-spacing-x-small);
      font: var(--syn-body-small-bold);
      color: var(--syn-typography-color-text);
    "
  >
    Subheadline
  </h3>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
</syn-details>
<br />
<syn-details size="large" contained="">
  <span slot="summary">Toggle Me</span>
  <h3
    style="
      margin: 0 0 var(--syn-spacing-x-small);
      font: var(--syn-body-small-bold);
      color: var(--syn-typography-color-text);
    "
  >
    Subheadline
  </h3>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
</syn-details>

```

---

## Prefix Icons

Use the prefix Icon to prepend an icon to the details.

```html
<syn-details open="" size="medium">
  <syn-icon
    name="home"
    slot="summary"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <span slot="summary">Accordion Element</span>
  <h3
    style="
      margin: 0 0 var(--syn-spacing-x-small);
      font: var(--syn-body-small-bold);
      color: var(--syn-typography-color-text);
    "
  >
    Subheadline
  </h3>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
</syn-details>

```
