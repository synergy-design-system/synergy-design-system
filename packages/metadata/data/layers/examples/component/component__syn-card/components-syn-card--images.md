## Images

Cards accept an image slot. The image is displayed atop the card and stretches to fit.

```html
<syn-card class="card-image">
  <img
    slot="image"
    src="https://synergy-design-system.github.io/card-example.jpg"
    alt="Multiple persons having lunch in SICK Academy"
  />
  These are some happy employees, but not just any employees. These are SICK
  employees.
</syn-card>

<style>
  .card-image {
    max-width: 400px;
  }
</style>
```
