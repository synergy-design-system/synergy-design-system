## Buttons With Icons

You can omit button labels and use icons instead. Make sure to set a label attribute on each icon so screen readers will announce each option correctly.

```html
<syn-radio-group label="Select an option" name="a" value="neutral">
  <syn-radio-button value="angry">
    <syn-icon name="face_5" label="Angry"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="sad">
    <syn-icon name="face_4" label="Sad"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="neutral">
    <syn-icon name="face_3" label="Neutral"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="happy">
    <syn-icon name="face_2" label="Happy"></syn-icon>
  </syn-radio-button>

  <syn-radio-button value="laughing">
    <syn-icon name="face_6" label="Laughing"></syn-icon>
  </syn-radio-button>
</syn-radio-group>
```
