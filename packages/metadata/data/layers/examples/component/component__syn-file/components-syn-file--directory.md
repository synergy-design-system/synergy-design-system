## Directory

The webkitdirectory setting allows users to select entire directories instead of individual files. When a directory is chosen, all files inside (including those in sub-directories) are selected. Although this feature is not part of the official HTML specification, it is widely supported across major browsers.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-large)"
>
  <syn-file label="Button" webkitdirectory=""></syn-file>
  <syn-file droparea="" label="Droparea" webkitdirectory=""></syn-file>
</div>
```
