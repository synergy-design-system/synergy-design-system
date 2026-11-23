## Card With Shadow

Use the shadow attribute to add a shadow.

```html
<div class="shadow-card-wrapper">
  <syn-card shadow="">
    <img
      slot="image"
      src="https://synergy-design-system.github.io/card-example.jpg"
      alt="Multiple persons having lunch in SICK Academy"
    />
    These are some happy employees, but not just any employees. These are SICK
    employees.
  </syn-card>
  <syn-card shadow="" sharp="">
    <img
      slot="image"
      src="https://synergy-design-system.github.io/card-example.jpg"
      alt="Multiple persons having lunch in SICK Academy"
    />
    These are some happy employees, but not just any employees. These are SICK
    employees.
  </syn-card>
</div>

<style>
  .shadow-card-wrapper {
    display: flex;
    flex-direction: row;
    gap: var(--syn-spacing-large);
  }

  .shadow-card-wrapper syn-card {
    max-width: 400px;
  }
</style>
```
