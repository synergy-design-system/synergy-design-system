## Subheadline

```html
<syn-accordion size="medium">
  <syn-details summary="First" open="" size="medium">
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
  <syn-details summary="Second" size="medium">
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
  <syn-details summary="Third" size="medium">
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
</syn-accordion>
```

---

## Default

Accordion is a group of syn-details to show a brief summary and expand to show additional content.

```html
<syn-accordion size="medium">
  <syn-details summary="First" open="" size="medium">
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
  <syn-details summary="Second" size="medium">
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
  <syn-details summary="Third" size="medium">
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
</syn-accordion>
```

---

## Contained

To give content more structure, you can use the property contained.

```html
<syn-accordion contained="" size="medium">
  <syn-details open="" size="medium" contained="">
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
  <syn-details size="medium" contained="">
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
  <syn-details size="medium" contained="">
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
</syn-accordion>
```

---

## Grouping Details

Set the close-others property to true to ensure only one detail is open at a time.

```html
<syn-accordion close-others="" size="medium">
  <syn-details summary="First" open="" size="medium">
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
  <syn-details summary="Second" size="medium">
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
  <syn-details summary="Third" size="medium">
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
</syn-accordion>
```

---

## Focus

The focus event gives the user feedback that the detail has been focused by the keyboard interaction.

```html
<div style="padding: 5px">
  <syn-accordion size="medium">
    <syn-details summary="Accordion Element" size="medium">
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
    <syn-details summary="Accordion Element" size="medium">
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
    <syn-details summary="Accordion Element" size="medium">
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
  </syn-accordion>
</div>
```

---

## Disabled

Use the disable attribute to prevent the details from expanding.

```html
<syn-accordion size="medium">
  <syn-details summary="Accordion Element" size="medium">
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
  <syn-details summary="Accordion Element" disabled="" size="medium">
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
  <syn-details summary="Accordion Element" size="medium">
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
</syn-accordion>
```

---

## Sizes

Use the size attribute to change a detail’s size. The size attribute should not be mixed within an accordion

```html
<syn-accordion class="accordion-size" size="medium">
  <syn-details size="medium">
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
  <syn-details size="medium">
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
  <syn-details size="medium">
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
</syn-accordion>

<syn-accordion class="accordion-size" size="large">
  <syn-details size="large">
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
  <syn-details size="large">
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
  <syn-details size="large">
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
</syn-accordion>

<style>
  .accordion-size:not(:first-of-type) {
    margin-top: var(--syn-spacing-2x-large);
  }
</style>
```
