# syn-button-group

## Summary

Button groups can be used to group related buttons into sections.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-button-group--docs)

## Class Information

- **Import Example:** `import SynButtonGroup from '@synergy-design-system/components/components/button-group/button-group.js';`
- **Module Path:** components/button-group/button-group.js
- **Tag Name:** `syn-button-group`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                                         |
| --------- | ------------------------------------------------------------------- |
| (default) | One or more `<syn-button>` elements to display in the button group. |

## Available Properties

| Property | Attribute | Reflects | Type                             | Default     | Description                                                                                                                                                                              |
| -------- | --------- | :------: | -------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label    | `label`   |    -     | `string`                         | `''`        | A label to use for the button group. This won't be displayed on the screen, but it will be announced by assistive devices when interacting with the control and is strongly recommended. |
| size     | `size`    |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'`  | The button-groups size. This affects all buttons within the group.                                                                                                                       |
| variant  | `variant` |    ✓     | `'filled' \| 'outline'`          | `'outline'` | The button-group's theme variant. This affects all buttons within the group.                                                                                                             |

## Available CSS Parts

| Name | Description                   |
| ---- | ----------------------------- |
| base | The component's base wrapper. |
