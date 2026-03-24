# syn-icon-button

## Summary

Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-icon-button--docs)

## Class Information

- **Module Path:** components/icon-button/icon-button.js
- **Tag Name:** syn-icon-button

## Available Slots

| Name | Description |
| ---- | ----------- |
| -    | -           |

## Available Attributes

| Name     | Type                                                        | Default        | Description                                                                                                                                               | Reflects |
| -------- | ----------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name     | string \| undefined                                         | -              | The name of the icon to draw. Available names depend on the icon library being used.                                                                      | -        |
| library  | string \| undefined                                         | -              | The name of a registered custom icon library.                                                                                                             | -        |
| src      | string \| undefined                                         | -              | An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and can result in XSS attacks.            | -        |
| href     | string \| undefined                                         | -              | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.                                                    | -        |
| target   | '\_blank' \| '\_parent' \| '\_self' \| '\_top' \| undefined | -              | Tells the browser where to open the link. Only used when `href` is set.                                                                                   | -        |
| download | string \| undefined                                         | -              | Tells the browser to download the linked file as this filename. Only used when `href` is set.                                                             | -        |
| label    | string                                                      | ''             | A description that gets read by assistive devices. For optimal accessibility, you should always include a label that describes what the icon button does. | -        |
| size     | 'small' \| 'medium' \| 'large' \| 'inherit'                 | 'inherit'      | The icon button's size.                                                                                                                                   | ✓        |
| color    | 'currentColor' \| 'primary' \| 'neutral'                    | 'currentColor' | The color of the icon button. The default "currentColor" makes it possible to easily style the icon button from outside without any CSS variables.        | ✓        |
| disabled | boolean                                                     | false          | Disables the button.                                                                                                                                      | ✓        |

## Available Properties

| Name     | Type                                                        | Default        | Description                                                                                                                                               | Access |
| -------- | ----------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| button   | HTMLButtonElement \| HTMLLinkElement                        | -              | -                                                                                                                                                         | public |
| name     | string \| undefined                                         | -              | The name of the icon to draw. Available names depend on the icon library being used.                                                                      | public |
| library  | string \| undefined                                         | -              | The name of a registered custom icon library.                                                                                                             | public |
| src      | string \| undefined                                         | -              | An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and can result in XSS attacks.            | public |
| href     | string \| undefined                                         | -              | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.                                                    | public |
| target   | '\_blank' \| '\_parent' \| '\_self' \| '\_top' \| undefined | -              | Tells the browser where to open the link. Only used when `href` is set.                                                                                   | public |
| download | string \| undefined                                         | -              | Tells the browser to download the linked file as this filename. Only used when `href` is set.                                                             | public |
| label    | string                                                      | ''             | A description that gets read by assistive devices. For optimal accessibility, you should always include a label that describes what the icon button does. | public |
| size     | 'small' \| 'medium' \| 'large' \| 'inherit'                 | 'inherit'      | The icon button's size.                                                                                                                                   | public |
| color    | 'currentColor' \| 'primary' \| 'neutral'                    | 'currentColor' | The color of the icon button. The default "currentColor" makes it possible to easily style the icon button from outside without any CSS variables.        | public |
| disabled | boolean                                                     | false          | Disables the button.                                                                                                                                      | public |

## Available Methods

| Name  | Parameters            | Return Type | Description                           |
| ----- | --------------------- | ----------- | ------------------------------------- |
| click | -                     | -           | Simulates a click on the icon button. |
| focus | options: FocusOptions | -           | Sets focus on the icon button.        |
| blur  | -                     | -           | Removes focus from the icon button.   |

## Available CSS Parts

| Name | Description                   |
| ---- | ----------------------------- |
| base | The component's base wrapper. |

## Available Events

| Name      | Event Type    | Description                               |
| --------- | ------------- | ----------------------------------------- |
| syn-blur  | SynBlurEvent  | Emitted when the icon button loses focus. |
| syn-focus | SynFocusEvent | Emitted when the icon button gains focus. |

## Dependencies

- **syn-icon**

## Usage Information

- **Status:** stable
- **Since:** 2.0
