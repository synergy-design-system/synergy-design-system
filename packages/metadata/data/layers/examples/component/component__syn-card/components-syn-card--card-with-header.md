## Card With Header

Headers can be used to display titles and more.

```html
<syn-card class="card-header">
  <div slot="header">
    Header Title
    <syn-icon-button
      color="neutral"
      name="share"
      label="Share"
    ></syn-icon-button>
  </div>

  This card has a header. You can put all sorts of things in it!
</syn-card>

<style>
  .card-header {
    max-width: 400px;
  }

  .card-header [slot="header"] {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header syn-icon-button {
    font-size: var(--syn-font-size-x-large);
  }
</style>
```
