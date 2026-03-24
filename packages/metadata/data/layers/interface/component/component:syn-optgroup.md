# syn-optgroup

## Summary

The <syn-optgroup> element creates a grouping for <syn-option>s within a <syn-select>.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-optgroup--docs)

## Class Information

- **Module Path:** components/optgroup/optgroup.js
- **Tag Name:** syn-optgroup

## Available Slots

| Name      | Description                                         |
| --------- | --------------------------------------------------- |
| (default) | The given options. Must be `<syn-option>` elements. |
| prefix    | A presentational prefix icon or similar element.    |
| label     | The label for the optgroup                          |
| suffix    | A presentational suffix icon or similar element.    |

## Available Attributes

| Name     | Type    | Default | Description                                                                     | Reflects |
| -------- | ------- | ------- | ------------------------------------------------------------------------------- | -------- |
| disabled | boolean | false   | Disables all options in the optgroup.                                           | ✓        |
| label    | string  | ''      | The optgroups label. If you need to display HTML, use the `label` slot instead. | -        |

## Available Properties

| Name            | Type        | Default | Description                                                                     | Access |
| --------------- | ----------- | ------- | ------------------------------------------------------------------------------- | ------ |
| assignedOptions | SynOption[] | -       | -                                                                               | public |
| disabled        | boolean     | false   | Disables all options in the optgroup.                                           | public |
| label           | string      | ''      | The optgroups label. If you need to display HTML, use the `label` slot instead. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
| ---- | ---------- | ----------- | ----------- |
| -    | -          | -           | -           |

## Available CSS Parts

| Name            | Description                                         |
| --------------- | --------------------------------------------------- |
| base            | The component's base wrapper.                       |
| label-container | The container that wraps prefix, label and base     |
| divider         | The divider that is displayed above the content     |
| prefix          | The container that wraps the prefix.                |
| suffix          | The container that wraps the suffix.                |
| options         | The container that wraps the <syn-option> elements. |

## Available Events

| Name | Event Type | Description |
| ---- | ---------- | ----------- |
| -    | -          | -           |

## Dependencies

- **syn-divider**

## Usage Information

- **Status:** stable
- **Since:** 1.3.0
