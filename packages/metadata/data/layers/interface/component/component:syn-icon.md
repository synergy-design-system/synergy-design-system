# syn-icon

## Summary

Icons are symbols that can be used to represent various options within an application.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-icon--docs)

## Class Information

- **Module Path:** components/icon/icon.js
- **Tag Name:** syn-icon

## Available Slots

| Name | Description |
| ---- | ----------- |
| -    | -           |

## Available Attributes

| Name    | Type                | Default   | Description                                                                                                                                     | Reflects |
| ------- | ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name    | string \| undefined | -         | The name of the icon to draw. Available names depend on the icon library being used.                                                            | ✓        |
| src     | string \| undefined | -         | An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and can result in XSS attacks.  | -        |
| label   | string              | ''        | An alternate description to use for assistive devices. If omitted, the icon will be considered presentational and ignored by assistive devices. | -        |
| library | string              | 'default' | The name of a registered custom icon library.                                                                                                   | ✓        |

## Available Properties

| Name    | Type                | Default   | Description                                                                                                                                     | Access |
| ------- | ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| name    | string \| undefined | -         | The name of the icon to draw. Available names depend on the icon library being used.                                                            | public |
| src     | string \| undefined | -         | An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and can result in XSS attacks.  | public |
| label   | string              | ''        | An alternate description to use for assistive devices. If omitted, the icon will be considered presentational and ignored by assistive devices. | public |
| library | string              | 'default' | The name of a registered custom icon library.                                                                                                   | public |

## Available Methods

| Name              | Parameters | Return Type | Description |
| ----------------- | ---------- | ----------- | ----------- |
| handleLabelChange | -          | -           | -           |
| setIcon           | -          | -           | -           |

## Available CSS Parts

| Name | Description                                                |
| ---- | ---------------------------------------------------------- |
| svg  | The internal SVG element.                                  |
| use  | The <use> element generated when using `spriteSheet: true` |

## Available Events

| Name      | Event Type    | Description                                                                                             |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------- |
| syn-load  | SynLoadEvent  | Emitted when the icon has loaded. When using `spriteSheet: true` this will not emit.                    |
| syn-error | SynErrorEvent | Emitted when the icon fails to load due to an error. When using `spriteSheet: true` this will not emit. |

## Dependencies

- None

## Usage Information

- **Status:** stable
- **Since:** 2.0
