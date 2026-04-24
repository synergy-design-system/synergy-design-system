# syn-icon

## Summary

Icons are symbols that can be used to represent various options within an application.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-icon--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=1616-1512)

## Class Information

- **Tag Name:** `syn-icon`
- **Import Example:** `import SynIcon from '@synergy-design-system/components/components/icon/icon.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Properties

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

An alternate description to use for assistive devices. If omitted, the icon will be considered presentational and ignored by assistive devices.

### library

attribute: `library`
reflects: yes
type: `string`
default: `'default'`

The name of a registered custom icon library.

### name

attribute: `name`
reflects: yes
type: `string | undefined`
default: none

The name of the icon to draw. Available names depend on the icon library being used.

### src

attribute: `src`
reflects: no
type: `string | undefined`
default: none

An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and can result in XSS attacks.

## Available CSS Parts

- `svg`: The internal SVG element.
- `use`: The <use> element generated when using `spriteSheet: true`

## Available Events

### syn-error

type: `SynErrorEvent`

Emitted when the icon fails to load due to an error. When using `spriteSheet: true` this will not emit.

### syn-load

type: `SynLoadEvent`

Emitted when the icon has loaded. When using `spriteSheet: true` this will not emit.
