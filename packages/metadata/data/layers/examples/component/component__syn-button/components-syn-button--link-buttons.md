## Link Buttons

It’s often helpful to have a button that works like a link. This is possible by setting the href attribute, which will make the component render an under the hood. This gives you all the default link behavior the browser provides (e.g. CMD/CTRL/SHIFT + CLICK) and exposes the target and download attributes.

```html
<div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large)">
  <syn-button href="https://example.com/">Link</syn-button>
  <syn-button href="https://example.com/" target="_blank"
    >New Window</syn-button
  >
  <syn-button href="/assets/images/wordmark.svg" download="synergy.svg"
    >Download</syn-button
  >
  <syn-button href="https://example.com/" disabled="">Disabled</syn-button>
</div>
```
