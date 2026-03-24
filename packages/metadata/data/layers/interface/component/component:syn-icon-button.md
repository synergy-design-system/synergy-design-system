# syn-icon-button

## Summary

Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-icon-button--docs)

## Class Information

- **Import Example:** `import SynIconButton from '@synergy-design-system/components/components/icon-button/icon-button.js';`
- **Module Path:** components/icon-button/icon-button.js
- **Tag Name:** `syn-icon-button`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Properties

| Property | Attribute  | Reflects | Type                                                      | Default          | Description                                                                                                                                               |
| -------- | ---------- | :------: | --------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| color    | `color`    |    ✓     | `'currentColor' \| 'primary' \| 'neutral'`                | `'currentColor'` | The color of the icon button. The default "currentColor" makes it possible to easily style the icon button from outside without any CSS variables.        |
| disabled | `disabled` |    ✓     | `boolean`                                                 | `false`          | Disables the button.                                                                                                                                      |
| download | `download` |    -     | `string \| undefined`                                     | -                | Tells the browser to download the linked file as this filename. Only used when `href` is set.                                                             |
| href     | `href`     |    -     | `string \| undefined`                                     | -                | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.                                                    |
| label    | `label`    |    -     | `string`                                                  | `''`             | A description that gets read by assistive devices. For optimal accessibility, you should always include a label that describes what the icon button does. |
| library  | `library`  |    -     | `string \| undefined`                                     | -                | The name of a registered custom icon library.                                                                                                             |
| name     | `name`     |    -     | `string \| undefined`                                     | -                | The name of the icon to draw. Available names depend on the icon library being used.                                                                      |
| size     | `size`     |    ✓     | `'small' \| 'medium' \| 'large' \| 'inherit'`             | `'inherit'`      | The icon button's size.                                                                                                                                   |
| src      | `src`      |    -     | `string \| undefined`                                     | -                | An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and can result in XSS attacks.            |
| target   | `target`   |    -     | `'_blank' \| '_parent' \| '_self' \| '_top' \| undefined` | -                | Tells the browser where to open the link. Only used when `href` is set.                                                                                   |

## Available Methods

| Name      | Parameters              | Return Type | Description                           |
| --------- | ----------------------- | ----------- | ------------------------------------- |
| `blur()`  | -                       | -           | Removes focus from the icon button.   |
| `click()` | -                       | -           | Simulates a click on the icon button. |
| `focus()` | `options: FocusOptions` | -           | Sets focus on the icon button.        |

## Available CSS Parts

| Name | Description                   |
| ---- | ----------------------------- |
| base | The component's base wrapper. |

## Available Events

| Name      | Event Type      | Description                               |
| --------- | --------------- | ----------------------------------------- |
| syn-blur  | `SynBlurEvent`  | Emitted when the icon button loses focus. |
| syn-focus | `SynFocusEvent` | Emitted when the icon button gains focus. |

## Dependencies

- `syn-icon`
