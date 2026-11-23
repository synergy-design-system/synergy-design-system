## Default

Cards can be used to group related subjects in a container.

```html
<syn-card>
  <h3>Headline</h3>
  These are some happy employees, but not just any employees. These are SICK
  employees.

  <span slot="footer"> </span>
  <footer slot="footer">
    <small>Optional information</small>
    <nav>
      <syn-button variant="filled" size="small">More info</syn-button>
    </nav>
  </footer>
  <span slot="footer"> </span>
  <style slot="footer">
    syn-card {
      max-width: 400px;
    }

    syn-card footer {
      align-items: center;
      color: var(--syn-color-neutral-800);
      display: flex;
      gap: var(--syn-spacing-x-small);
    }

    syn-card h3 {
      font: var(--syn-body-medium-bold);
      margin: 0 0 var(--syn-spacing-x-small);
    }

    syn-card small {
      font: var(--syn-body-x-small-regular);
    }

    syn-card footer nav {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      gap: var(--syn-spacing-x-small);
      justify-content: flex-end;
    }
  </style>
  <span slot="footer"> </span>
  <img
    slot="image"
    src="https://synergy-design-system.github.io/card-example.jpg"
    alt="Multiple persons having lunch in SICK Academy"
  />
</syn-card>
```
