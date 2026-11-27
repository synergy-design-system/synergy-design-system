## Breadcrumb Links

By default, breadcrumb items are rendered as buttons so you can use them to navigate single-page applications. In this case, you’ll need to add event listeners to handle clicks.For websites, you’ll probably want to use links instead. You can make any breadcrumb item a link by applying an href attribute to it. Now, when the user activates it, they’ll be taken to the corresponding page — no event listeners required.

```html
<syn-breadcrumb>
  <syn-breadcrumb-item href="#" target="_blank"
    >Breadcrumb Item</syn-breadcrumb-item
  >
  <syn-breadcrumb-item href="#" target="_blank"
    >Breadcrumb Item</syn-breadcrumb-item
  >
  <syn-breadcrumb-item href="#" target="_blank"
    >Breadcrumb Item</syn-breadcrumb-item
  >
  <syn-breadcrumb-item href="#" target="_blank"
    >Breadcrumb Item</syn-breadcrumb-item
  >
</syn-breadcrumb>
```
