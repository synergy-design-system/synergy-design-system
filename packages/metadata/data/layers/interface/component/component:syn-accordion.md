# syn-accordion

## Summary

Accordions provide the ability to group a list of `<syn-details>`.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-accordion--docs)

## Class Information

- **Import Example:** `import SynAccordion from '@synergy-design-system/components/components/accordion/accordion.js';`
- **Module Path:** components/accordion/accordion.js
- **Tag Name:** `syn-accordion`

## Usage Information

- **Status:** stable
- **Since:** 1.23.0

## Available Slots

| Name      | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| (default) | The accordion's main content. Must be `<syn-details />` elements. |

## Available Properties

| Property    | Attribute      | Reflects | Type                             | Default    | Description                                                                             |
| ----------- | -------------- | :------: | -------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| closeOthers | `close-others` |    -     | `boolean`                        | `false`    | Indicates whether or not multiple `<syn-detail>` elements can be open at the same time. |
| contained   | `contained`    |    ✓     | `boolean`                        | `false`    | Draws the accordion and the slotted `<syn-details>` as contained elements.              |
| size        | `size`         |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'` | The size that should be applied to all slotted `<syn-details>` elements                 |

## Available CSS Parts

| Name | Description                   |
| ---- | ----------------------------- |
| base | The component's base wrapper. |
