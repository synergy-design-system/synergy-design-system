## Link Button

It’s often helpful to have a button that works like a link. This is possible by setting the href attribute, which will make the component render an under the hood. This gives you all the default link behavior the browser provides (e.g. CMD/CTRL/SHIFT + CLICK) and exposes the target and download attributes.

```html
<syn-icon-button
  name="wallpaper"
  label="Wallpaper"
  color="neutral"
  href="https://example.com"
  target="_blank"
  size="medium"
></syn-icon-button>
```
