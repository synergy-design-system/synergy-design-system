## Children Closed Or Open Vertical Only

Use the children attribute to indicate that a chevron should be shown. In development this will be handled automatically as soon as an element has children.Note:Since there should be no double use of functionality, a link cannot be mixed with an accordion behavior. The accordion always has priority, which means that if the href attribute is used at the same time as children, the link functionality is ignored and only the accordion behavior is provided.

```html
<nav style="width: 320px">
  <syn-nav-item>
    Children closed
    <nav slot="children">
      <syn-nav-item>Item 1</syn-nav-item>
      <syn-nav-item>Item 2</syn-nav-item>
    </nav>
  </syn-nav-item>
  <br />
  <syn-nav-item open="">
    Children open
    <nav slot="children">
      <syn-nav-item href="javascript:void(0)">Item 1</syn-nav-item>
      <syn-nav-item>Item 2</syn-nav-item>
    </nav>
  </syn-nav-item>
</nav>
```
