# syn-details

## Summary

Details show a brief summary and expand to show additional content.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-details--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41227-232486)

## Class Information

- **Import Example:** `import SynDetails from '@synergy-design-system/components/components/details/details.js';`
- **Tag Name:** `syn-details`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name          | Description                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| (default)     | The details' main content.                                                          |
| summary       | The details' summary. Alternatively, you can use the `summary` attribute.           |
| expand-icon   | Optional expand icon to use instead of the default. Works best with `<syn-icon>`.   |
| collapse-icon | Optional collapse icon to use instead of the default. Works best with `<syn-icon>`. |

## Available Properties

| Property  | Attribute   | Reflects | Type                             | Default    | Description                                                                                                                                                                                                         |
| --------- | ----------- | :------: | -------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| contained | `contained` |    ✓     | `boolean`                        | `false`    | Draws the details as contained element.                                                                                                                                                                             |
| disabled  | `disabled`  |    ✓     | `boolean`                        | `false`    | Disables the details so it can't be toggled.                                                                                                                                                                        |
| open      | `open`      |    ✓     | `boolean`                        | `false`    | Indicates whether or not the details is open. You can toggle this attribute to show and hide the details, or you can use the `show()` and `hide()` methods and this attribute will reflect the details' open state. |
| size      | `size`      |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'` | The details's size.                                                                                                                                                                                                 |
| summary   | `summary`   |    -     | `string`                         | -          | The summary to show in the header. If you need to display HTML, use the `summary` slot instead.                                                                                                                     |

## Available Methods

| Name     | Parameters | Return Type | Description        |
| -------- | ---------- | ----------- | ------------------ |
| `hide()` | -          | -           | Hides the details  |
| `show()` | -          | -           | Shows the details. |

## Available CSS Parts

| Name         | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| base         | The component's base wrapper.                                        |
| body         | The container that wraps the details content.                        |
| content      | The details content.                                                 |
| header       | The header that wraps both the summary and the expand/collapse icon. |
| summary      | The container that wraps the summary.                                |
| summary-icon | The container that wraps the expand/collapse icons.                  |

## Available Events

| Name           | Event Type          | Description                                                       |
| -------------- | ------------------- | ----------------------------------------------------------------- |
| syn-after-hide | `SynAfterHideEvent` | Emitted after the details closes and all animations are complete. |
| syn-after-show | `SynAfterShowEvent` | Emitted after the details opens and all animations are complete.  |
| syn-hide       | `SynHideEvent`      | Emitted when the details closes.                                  |
| syn-show       | `SynShowEvent`      | Emitted when the details opens.                                   |

## Dependencies

- `syn-icon`
