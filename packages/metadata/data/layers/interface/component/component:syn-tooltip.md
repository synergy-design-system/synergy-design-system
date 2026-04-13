# syn-tooltip

## Summary

Tooltips display additional information based on a specific action.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tooltip--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41337-203414)

## Class Information

- **Import Example:** `import SynTooltip from '@synergy-design-system/components/components/tooltip/tooltip.js';`
- **Tag Name:** `syn-tooltip`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| (default) | The tooltip's target element. Avoid slotting in more than one element, as subsequent ones will be ignored. |
| content   | The content to render in the tooltip. Alternatively, you can use the `content` attribute.                  |

## Available Properties

| Property  | Attribute   | Reflects | Type                                                                                                                                                                                                                | Default         | Description                                                                                                                                                                                                                                   |
| --------- | ----------- | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content   | `content`   |    -     | `string`                                                                                                                                                                                                            | `''`            | The tooltip's content. If you need to display HTML, use the `content` slot instead.                                                                                                                                                           |
| disabled  | `disabled`  |    ✓     | `boolean`                                                                                                                                                                                                           | `false`         | Disables the tooltip so it won't show when triggered.                                                                                                                                                                                         |
| distance  | `distance`  |    -     | `number`                                                                                                                                                                                                            | `13`            | The distance in pixels from which to offset the tooltip away from its target.                                                                                                                                                                 |
| open      | `open`      |    ✓     | `boolean`                                                                                                                                                                                                           | `false`         | Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods.                                                                                                                                              |
| placement | `placement` |    -     | `\| 'top'     \| 'top-start'     \| 'top-end'     \| 'right'     \| 'right-start'     \| 'right-end'     \| 'bottom'     \| 'bottom-start'     \| 'bottom-end'     \| 'left'     \| 'left-start'     \| 'left-end'` | `'top'`         | The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip inside of the viewport.                                                                                                         |
| skidding  | `skidding`  |    -     | `number`                                                                                                                                                                                                            | `0`             | The distance in pixels from which to offset the tooltip along its target.                                                                                                                                                                     |
| trigger   | `trigger`   |    -     | `string`                                                                                                                                                                                                            | `'hover focus'` | Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple options can be passed by separating them with a space. When manual is used, the tooltip must be activated programmatically. |

## Available Methods

| Name     | Parameters | Return Type | Description        |
| -------- | ---------- | ----------- | ------------------ |
| `hide()` | -          | -           | Hides the tooltip  |
| `show()` | -          | -           | Shows the tooltip. |

## Available CSS Parts

| Name          | Description                                                                          |
| ------------- | ------------------------------------------------------------------------------------ |
| base          | The component's base wrapper, an `<syn-popup>` element.                              |
| base\_\_arrow | The popup's exported `arrow` part. Use this to target the tooltip's arrow.           |
| base\_\_popup | The popup's exported `popup` part. Use this to target the tooltip's popup container. |
| body          | The tooltip's body where its content is rendered.                                    |

## Available Events

| Name           | Event Type          | Description                                                           |
| -------------- | ------------------- | --------------------------------------------------------------------- |
| syn-after-hide | `SynAfterHideEvent` | Emitted after the tooltip has hidden and all animations are complete. |
| syn-after-show | `SynAfterShowEvent` | Emitted after the tooltip has shown and all animations are complete.  |
| syn-hide       | `SynHideEvent`      | Emitted when the tooltip begins to hide.                              |
| syn-show       | `SynShowEvent`      | Emitted when the tooltip begins to show.                              |

## Dependencies

- `syn-popup`
