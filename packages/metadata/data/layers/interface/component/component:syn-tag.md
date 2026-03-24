# syn-tag

## Summary

Tags are used as labels to organize things or to indicate a selection.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tag--docs)

## Class Information

- **Module Path:** components/tag/tag.js
- **Tag Name:** syn-tag

## Available Slots

| Name      | Description        |
| --------- | ------------------ |
| (default) | The tag's content. |

## Available Attributes

| Name      | Type                           | Default  | Description                                        | Reflects |
| --------- | ------------------------------ | -------- | -------------------------------------------------- | -------- |
| size      | 'small' \| 'medium' \| 'large' | 'medium' | The tag's size.                                    | ✓        |
| removable | boolean                        | false    | Makes the tag removable and shows a remove button. | -        |

## Available Properties

| Name      | Type                           | Default  | Description                                        | Access |
| --------- | ------------------------------ | -------- | -------------------------------------------------- | ------ |
| size      | 'small' \| 'medium' \| 'large' | 'medium' | The tag's size.                                    | public |
| removable | boolean                        | false    | Makes the tag removable and shows a remove button. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
| ---- | ---------- | ----------- | ----------- |
| -    | -          | -           | -           |

## Available CSS Parts

| Name                  | Description                                      |
| --------------------- | ------------------------------------------------ |
| base                  | The component's base wrapper.                    |
| content               | The tag's content.                               |
| remove-button         | The tag's remove button, an `<syn-icon-button>`. |
| remove-button\_\_base | The remove button's exported `base` part.        |

## Available Events

| Name       | Event Type     | Description                                  |
| ---------- | -------------- | -------------------------------------------- |
| syn-remove | SynRemoveEvent | Emitted when the remove button is activated. |

## Dependencies

- **syn-icon-button**

## Usage Information

- **Status:** stable
- **Since:** 2.0
