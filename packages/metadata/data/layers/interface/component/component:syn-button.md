# syn-button

## Summary

Buttons represent actions that are available to the user.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-button--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=42076-167749)

## Class Information

- **Tag Name:** `syn-button`
- **Import Example:** `import SynButton from '@synergy-design-system/components/components/button/button.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The button's label.
- `prefix`: A presentational prefix icon or similar element.
- `suffix`: A presentational suffix icon or similar element.

## Available Properties

### caret

attribute: `caret`
reflects: yes
type: `boolean`
default: `false`

Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior.

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

Tells the browser to download the linked file as this filename. Only used when `href` is present.

### form

attribute: `form`
reflects: no
type: `string`
default: none

The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The value of this attribute must be an id of a form in the same document or shadow root as the button.

### formAction

attribute: `formaction`
reflects: no
type: `string`
default: none

Used to override the form owner's `action` attribute.

### formEnctype

attribute: `formenctype`
reflects: no
type: `'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'`
default: none

Used to override the form owner's `enctype` attribute.

### formMethod

attribute: `formmethod`
reflects: no
type: `'post' | 'get'`
default: none

Used to override the form owner's `method` attribute.

### formNoValidate

attribute: `formnovalidate`
reflects: no
type: `boolean`
default: none

Used to override the form owner's `novalidate` attribute.

### formTarget

attribute: `formtarget`
reflects: no
type: `'_self' | '_blank' | '_parent' | '_top' | string`
default: none

Used to override the form owner's `target` attribute.

### href

attribute: `href`
reflects: no
type: `string`
default: `''`

When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.

### loading

attribute: `loading`
reflects: yes
type: `boolean`
default: `false`

Draws the button in a loading state.

### name

attribute: `name`
reflects: no
type: `string`
default: `''`

The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter. This attribute is ignored when `href` is present.

### rel

attribute: `rel`
reflects: no
type: `string`
default: `'noreferrer noopener'`

When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a specific tab/window, this will prevent that from working correctly. You can remove or change the default value by setting the attribute to an empty string or a value of your choice, respectively.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The button's size.

### target

attribute: `target`
reflects: no
type: `'_blank' | '_parent' | '_self' | '_top'`
default: none

Tells the browser where to open the link. Only used when `href` is present.

### type

attribute: `type`
reflects: no
type: `'button' | 'submit' | 'reset'`
default: `'button'`

The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave. When the type is `submit`, the button will submit the surrounding form.

### value

attribute: `value`
reflects: no
type: `string`
default: `''`

The value of the button, submitted as a pair with the button's name as part of the form data, but only when this button is the submitter. This attribute is ignored when `href` is present.

### variant

attribute: `variant`
reflects: yes
type: `'filled' | 'outline' | 'text'`
default: `'outline'`

The button's theme variant.

## Attribute-only Members

These attributes are reflected but not exposed as component properties.

### title

reflects: yes
type: `string`
default: `''`

-

## Available Methods

### blur()

parameters: -
returns: `void`

Removes focus from the button.

### checkValidity()

parameters: -
returns: `void`

Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid.

### click()

parameters: -
returns: `void`

Simulates a click on the button.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the button.

### getForm()

parameters: -
returns: `void`

Gets the associated form, if one exists.

### reportValidity()

parameters: -
returns: `void`

Checks for validity and shows the browser's validation message if the control is invalid.

### setCustomValidity()

parameters: `message: string`
returns: `void`

Sets a custom validation message. Pass an empty string to restore validity.

## Available CSS Parts

- `base`: The component's base wrapper.
- `caret`: The button's caret icon, an `<syn-icon>` element.
- `label`: The button's label.
- `prefix`: The container that wraps the prefix.
- `spinner`: The spinner that shows when the button is in the loading state.
- `suffix`: The container that wraps the suffix.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when the button loses focus.

### syn-focus

type: `SynFocusEvent`

Emitted when the button gains focus.

### syn-invalid

type: `SynInvalidEvent`

Emitted when the form control has been checked for validity and its constraints aren't satisfied.

## Dependencies

- `syn-icon`
- `syn-spinner`
