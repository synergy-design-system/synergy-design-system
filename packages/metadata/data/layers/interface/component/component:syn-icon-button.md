# syn-icon-button

## Summary

Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-icon-button--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41137-747935)

## Class Information

- **Tag Name:** `syn-icon-button`
- **Import Example:** `import SynIconButton from '@synergy-design-system/components/components/icon-button/icon-button.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Properties

### color

attribute: `color`
reflects: yes
type: `'currentColor' | 'primary' | 'neutral'`
default: `'currentColor'`

The color of the icon button. The default "currentColor" makes it possible to easily style the icon button from outside without any CSS variables.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the button.

### download

attribute: `download`
reflects: no
type: `string | undefined`
default: none

Tells the browser to download the linked file as this filename. Only used when `href` is set.

### href

attribute: `href`
reflects: no
type: `string | undefined`
default: none

When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

A description that gets read by assistive devices. For optimal accessibility, you should always include a label that describes what the icon button does.

### library

attribute: `library`
reflects: no
type: `string | undefined`
default: none

The name of a registered custom icon library.

### name

attribute: `name`
reflects: no
type: `string | undefined`
default: none

The name of the icon to draw. Available names depend on the icon library being used.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large' | 'inherit'`
default: `'inherit'`

The icon button's size.

### src

attribute: `src`
reflects: no
type: `string | undefined`
default: none

An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and can result in XSS attacks.

### target

attribute: `target`
reflects: no
type: `'_blank' | '_parent' | '_self' | '_top' | undefined`
default: none

Tells the browser where to open the link. Only used when `href` is set.

## Available Methods

### blur()

parameters: -
returns: `void`

Removes focus from the icon button.

### click()

parameters: -
returns: `void`

Simulates a click on the icon button.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the icon button.

## Available CSS Parts

- `base`: The component's base wrapper.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when the icon button loses focus.

### syn-focus

type: `SynFocusEvent`

Emitted when the icon button gains focus.

## Dependencies

- `syn-icon`
