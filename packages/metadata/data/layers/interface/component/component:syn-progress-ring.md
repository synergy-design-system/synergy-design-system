# syn-progress-ring

## Summary

Progress rings are used to show the progress of a determinate operation in a circular fashion.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-progress-ring--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41203-296727)

## Class Information

- **Import Example:** `import SynProgressRing from '@synergy-design-system/components/components/progress-ring/progress-ring.js';`
- **Tag Name:** `syn-progress-ring`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                      |
| --------- | -------------------------------- |
| (default) | A label to show inside the ring. |

## Available Properties

| Property | Attribute | Reflects | Type     | Default | Description                                     |
| -------- | --------- | :------: | -------- | ------- | ----------------------------------------------- |
| label    | `label`   |    -     | `string` | `''`    | A custom label for assistive devices.           |
| value    | `value`   |    ✓     | `number` | `0`     | The current progress as a percentage, 0 to 100. |

## Available CSS Parts

| Name  | Description                   |
| ----- | ----------------------------- |
| base  | The component's base wrapper. |
| label | The progress ring label.      |
