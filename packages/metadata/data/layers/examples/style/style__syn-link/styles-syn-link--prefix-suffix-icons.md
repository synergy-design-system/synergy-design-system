## Prefix Suffix Icons

Use the prefix and suffix slots to add icons.

```html
<nav class="storybook-demo-syn-link">
  <a href="javascript:void(0)" class="syn-link syn-link--medium">
    Open link in new window
    <syn-icon name="arrow_outward"></syn-icon>
  </a>
  <a href="javascript:void(0)" class="syn-link syn-link--medium">
    <syn-icon name="picture_as_pdf"></syn-icon>
    Download PDF
  </a>
  <a href="javascript:void(0)" class="syn-link syn-link--medium">
    <syn-icon name="picture_as_pdf"></syn-icon>
    Open PDF in new window
    <syn-icon name="arrow_outward"></syn-icon>
  </a>
</nav>
<style>
  .storybook-demo-syn-link {
    display: inline-flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }
</style>
```
