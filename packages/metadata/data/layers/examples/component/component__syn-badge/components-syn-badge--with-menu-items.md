## With Menu Items

When including badges in menu items, use the suffix slot to make sure they’re aligned correctly.

```html
<syn-menu style="max-width: 228px">
  <syn-menu-label>Messages</syn-menu-label>
  <syn-menu-item
    >Comments
    <syn-badge slot="suffix" variant="primary" pill=""
      >4</syn-badge
    ></syn-menu-item
  >
  <syn-menu-item
    >Replies
    <syn-badge slot="suffix" variant="primary" pill=""
      >12</syn-badge
    ></syn-menu-item
  >
</syn-menu>
```
