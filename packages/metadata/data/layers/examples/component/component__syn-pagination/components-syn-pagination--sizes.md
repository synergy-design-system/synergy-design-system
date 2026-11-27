## Sizes

Use the size attribute to change the pagination size.

```html
<div
  style="
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-2x-large);
  "
>
  <syn-pagination
    current-page="1"
    page-size="25"
    total-items="500"
    size="small"
  ></syn-pagination>
  <syn-pagination
    current-page="1"
    page-size="25"
    total-items="500"
    size="medium"
  ></syn-pagination>
  <syn-pagination
    current-page="1"
    page-size="25"
    total-items="500"
    size="large"
  ></syn-pagination>
</div>
```
