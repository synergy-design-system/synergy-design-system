## Stepper Input Handling

The numeric-strategy property defines how numeric input is handled during user interaction. It lets you select between the browsers native control and Synergy’s enhanced number-input logic.native: Uses the browser’s built-in number control. Values are not auto-clamped, and stepping/validation can vary across browsers.modern: Provides a more intuitive and predictable behavior by automatically clamping values to the nearest min/max value, including those bounds when stepping, and ignoring the step attribute during validation.

```html
<syn-input
  label="Native (min and max)"
  max="10"
  min="0"
  numeric-strategy="native"
  step="0.3"
  type="number"
  value="0"
></syn-input>
<br />
<syn-input
  label="Modern (min and max)"
  max="10"
  min="0"
  numeric-strategy="modern"
  step="0.3"
  type="number"
  value="0"
></syn-input>
```
