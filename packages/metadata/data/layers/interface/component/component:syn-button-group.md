# syn-button-group

## Summary

Button groups can be used to group related buttons into sections.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-button-group--docs)

## Class Information

- **Module Path:** components/button-group/button-group.js
- **Tag Name:** syn-button-group

## Available Slots

| Name      | Description                                                         |
| --------- | ------------------------------------------------------------------- |
| (default) | One or more `<syn-button>` elements to display in the button group. |

## Available Attributes

| Name    | Type                           | Default   | Description                                                                                                                                                                              | Reflects |
| ------- | ------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| label   | string                         | ''        | A label to use for the button group. This won't be displayed on the screen, but it will be announced by assistive devices when interacting with the control and is strongly recommended. | -        |
| size    | 'small' \| 'medium' \| 'large' | 'medium'  | The button-groups size. This affects all buttons within the group.                                                                                                                       | ✓        |
| variant | 'filled' \| 'outline'          | 'outline' | The button-group's theme variant. This affects all buttons within the group.                                                                                                             | ✓        |

## Available Properties

| Name        | Type                           | Default   | Description                                                                                                                                                                              | Access |
| ----------- | ------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| defaultSlot | HTMLSlotElement                | -         | -                                                                                                                                                                                        | public |
| disableRole | boolean                        | false     | -                                                                                                                                                                                        | public |
| label       | string                         | ''        | A label to use for the button group. This won't be displayed on the screen, but it will be announced by assistive devices when interacting with the control and is strongly recommended. | public |
| size        | 'small' \| 'medium' \| 'large' | 'medium'  | The button-groups size. This affects all buttons within the group.                                                                                                                       | public |
| variant     | 'filled' \| 'outline'          | 'outline' | The button-group's theme variant. This affects all buttons within the group.                                                                                                             | public |

## Available Methods

| Name | Parameters | Return Type | Description |
| ---- | ---------- | ----------- | ----------- |
| -    | -          | -           | -           |

## Available CSS Parts

| Name | Description                   |
| ---- | ----------------------------- |
| base | The component's base wrapper. |

## Available Events

| Name | Event Type | Description |
| ---- | ---------- | ----------- |
| -    | -          | -           |

## Dependencies

- None

## Usage Information

- **Status:** stable
- **Since:** 2.0
