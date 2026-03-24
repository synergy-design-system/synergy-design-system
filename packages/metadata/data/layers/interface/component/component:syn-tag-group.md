# syn-tag-group

## Summary

A tag group is used to display multiple tags that belong together, often representing selected filters, categories, or user‑generated labels.
It arranges tags in flexible rows and supports different sizes and layouts.
Tags can be removable, icon‑based, or purely textual.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tag-group--docs)

## Class Information

- **Import Example:** `import SynTagGroup from '@synergy-design-system/components/components/tag-group/tag-group.js';`
- **Module Path:** components/tag-group/tag-group.js
- **Tag Name:** `syn-tag-group`

## Usage Information

- **Status:** stable
- **Since:** unknown

## Available Slots

| Name      | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| (default) | The tag group's main content. Must be `<syn-tag />` elements.            |
| label     | The tag group's label. Alternatively, you can use the `label` attribute. |

## Available Properties

| Property      | Attribute        | Reflects | Type                             | Default    | Description                                                                                                                     |
| ------------- | ---------------- | :------: | -------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| label         | `label`          |    -     | `string`                         | `''`       | The tag group's label. If you need to display HTML, use the `label` slot instead.                                               |
| labelPosition | `label-position` |    ✓     | `'top' \| 'start'`               | `'top'`    | Controls the label position. Use 'top' to place the label above the tags, or 'start' to place it to the begin of the tag group. |
| size          | `size`           |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'` | The size that should be applied to all slotted `<syn-tag>` elements                                                             |

## Available CSS Parts

| Name      | Description                   |
| --------- | ----------------------------- |
| base      | The component's base wrapper. |
| tag-label | The tag group's label.        |
