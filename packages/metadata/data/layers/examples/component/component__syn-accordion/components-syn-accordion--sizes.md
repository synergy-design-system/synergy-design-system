## Sizes

Use the size attribute to change a detail’s size. The size attribute should not be mixed within an accordion

```html
<syn-accordion class="accordion-size" size="small">
  <syn-details>
    <span slot="summary">Accordion Element</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
  <syn-details>
    <span slot="summary">Accordion Element</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
  <syn-details>
    <span slot="summary">Accordion Element</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
</syn-accordion>

<syn-accordion class="accordion-size" size="medium">
  <syn-details>
    <span slot="summary">Accordion Element</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
  <syn-details>
    <span slot="summary">Accordion Element</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
  <syn-details>
    <span slot="summary">Accordion Element</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
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
  <syn-details>
    <span slot="summary">Accordion Element</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
  <syn-details>
    <span slot="summary">Accordion Element</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
      "
    >
      Subheadline
    </h3>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
  </syn-details>
  <syn-details>
    <span slot="summary">Accordion Element</span>
    <h3
      style="
        margin: 0 0 var(--syn-spacing-x-small);
        font: var(--syn-body-small-bold);
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

<script type="module">
  document.querySelectorAll(".accordion-size form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });
</script>
```
