## Card With Footer

Footers can be used to display actions, summaries, or other relevant content.

```html
<syn-card class="card-footer">
  This card has a footer. You can put all sorts of things in it!

  <footer slot="footer">
    <small>Optional information</small>
    <nav>
      <syn-button variant="filled" size="small">Preview</syn-button>
    </nav>
  </footer>
  <style>
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
</syn-card>

<style>
  .card-footer {
    max-width: 400px;
  }
</style>
```
