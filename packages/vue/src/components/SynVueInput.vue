<script setup lang="ts">
// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/vue wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------

/**
 * @summary Inputs collect data from the user.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-input--docs
 * @status stable
 * @since 2.0
 *
 * @dependency syn-icon
 * @dependency syn-divider
 *
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the input.
 * @slot suffix - Used to append a presentational icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 * @slot increment-number-stepper - An icon to use in lieu of the default increment number stepper icon.
 * @slot decrement-number-stepper - An icon to use in lieu of the default decrement number stepper icon.
 *
 * @event syn-blur - Emitted when the control loses focus.
 * @event syn-change - Emitted when an alteration to the control's value is committed by the user.
 * @event syn-clear - Emitted when the clear button is activated.
 * @event syn-focus - Emitted when the control gains focus.
 * @event syn-input - Emitted when the control receives input.
 * @event syn-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 * @event syn-clamp - Emitted if the numeric strategy allows autoClamp and the value is clamped to the min or max attribute.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` control.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart clear-button - The clear button.
 * @csspart password-toggle-button - The password toggle button.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart stepper - The container that wraps the number stepper.
 * @csspart decrement-number-stepper - The decrement number stepper button.
 * @csspart increment-number-stepper - The increment number stepper button.
 * @csspart divider - The divider between the increment and decrement number stepper buttons.
 *
 * @cssproperty --syn-input-autofill-shadow - The shadow to apply when the input is autofilled.
 * @cssproperty --syn-input-autofill-readonly-shadow - The shadow to apply when the input is readonly and autofilled.
 * @cssproperty --syn-input-autofill-text-fill-color - The text fill color to apply when the input is autofilled.
 * @cssproperty --syn-input-autofill-caret-color - The caret color to apply when the input is autofilled.
 */
import { computed, ref } from 'vue';
import '@synergy-design-system/components/components/input/input.js';

import type { SynBlurEvent } from '@synergy-design-system/components';
import type { SynChangeEvent } from '@synergy-design-system/components';
import type { SynClearEvent } from '@synergy-design-system/components';
import type { SynFocusEvent } from '@synergy-design-system/components';
import type { SynInputEvent } from '@synergy-design-system/components';
import type { SynInvalidEvent } from '@synergy-design-system/components';
import type { SynClampEvent } from '@synergy-design-system/components';
import type { SynInput } from '@synergy-design-system/components';

// DOM Reference to the element
const nativeElement = ref<SynInput>();

defineExpose({
  nativeElement,
});

// Map attributes
const props = defineProps<{
  title?: SynInput['title'];

  /**
* The type of input.
* Works the same as a native `<input>` element, but only a subset of types are supported.
* Defaults
to `text`.
 */
  type?: SynInput['type'];

  /**
   * The name of the input, submitted as a name/value pair with form data.
   */
  name?: SynInput['name'];

  /**
   * The current value of the input, submitted as a name/value pair with form data.
   */
  value?: SynInput['value'];

  /**
   * The input's size.
   */
  size?: SynInput['size'];

  /**
   * The input's label.
   * If you need to display HTML, use the `label` slot instead.
   */
  label?: SynInput['label'];

  /**
   * The input's help text.
   * If you need to display HTML, use the `help-text` slot instead.
   */
  helpText?: SynInput['helpText'];

  /**
   * Adds a clear button when the input is not empty.
   */
  clearable?: SynInput['clearable'];

  /**
   * Disables the input.
   */
  disabled?: SynInput['disabled'];

  /**
   * Placeholder text to show as a hint when the input is empty.
   */
  placeholder?: SynInput['placeholder'];

  /**
   * Makes the input readonly.
   */
  readonly?: SynInput['readonly'];

  /**
   * Adds a button to toggle the password's visibility.
   * Only applies to password types.
   */
  passwordToggle?: SynInput['passwordToggle'];

  /**
   * Determines whether or not the password is currently visible.
   * Only applies to password input types.
   */
  passwordVisible?: SynInput['passwordVisible'];

  /**
   * Hides the increment/decrement spin buttons for number inputs.
   */
  noSpinButtons?: SynInput['noSpinButtons'];

  /**
* By default, form controls are associated with the nearest containing `<form>` element.
* This attribute allows you
to place the form control outside of a form and associate it with the form that has this `id`.
* The form must be in
the same document or shadow root for this to work.
 */
  form?: SynInput['form'];

  /**
   * Makes the input a required field.
   */
  required?: SynInput['required'];

  /**
   * A regular expression pattern to validate input against.
   */
  pattern?: SynInput['pattern'];

  /**
   * The minimum length of input that will be considered valid.
   */
  minlength?: SynInput['minlength'];

  /**
   * The maximum length of input that will be considered valid.
   */
  maxlength?: SynInput['maxlength'];

  /**
   * The input's minimum value.
   * Only applies to date and number input types.
   */
  min?: SynInput['min'];

  /**
   * The input's maximum value.
   * Only applies to date and number input types.
   */
  max?: SynInput['max'];

  /**
* Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is
implied, allowing any numeric value.
* Only applies to date and number input types.
 */
  step?: SynInput['step'];

  /**
   * Controls whether and how text input is automatically capitalized as it is entered by the user.
   */
  autocapitalize?: SynInput['autocapitalize'];

  /**
   * Indicates whether the browser's autocorrect feature is on or off.
   */
  autocorrect?: SynInput['autocorrect'];

  /**
* Specifies what permission the browser has to provide assistance in filling out form field values.
* Refer to
[this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
 */
  autocomplete?: SynInput['autocomplete'];

  /**
   * Indicates that the input should receive focus on page load.
   */
  autofocus?: SynInput['autofocus'];

  /**
   * Used to customize the label or icon of the Enter key on virtual keyboards.
   */
  enterkeyhint?: SynInput['enterkeyhint'];

  /**
   * Enables spell checking on the input.
   */
  spellcheck?: SynInput['spellcheck'];

  /**
* Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
keyboard on supportive devices.
 */
  inputmode?: SynInput['inputmode'];

  /**
* The minimal amount of fraction digits to use for numeric values.
Used to format the number when the input type is `number`.
 */
  minFractionDigits?: SynInput['minFractionDigits'];

  /**
* The maximal amount of fraction digits to use for numeric values.
Used to format the number when the input type is `number`.
 */
  maxFractionDigits?: SynInput['maxFractionDigits'];

  /**
* Defines the strategy for handling numbers in the numeric input.
This is used to determine how the input behaves when the user interacts with it.

Includes the following configuration options:

- **autoClamp**: If true, the input will clamp the value to the min and max attributes.
- **noStepAlign**: If true, the input will not align the value to the step attribute.
- **noStepValidation**: If true, the input will not validate the value against the step attribute.

You may provide this as one of the following values:

- 'native': Uses the native browser implementation.
- 'modern': Uses a more intuitive implementation:
  - Values are clamped to the nearest min or max value.
  - Stepping is inclusive to the provided min and max values.
  - Provided stepping is no longer used in validation.
- An object that matches the `NumericStrategy` type.
* Note this can only be set via `property`, not as an `attribute`!
 */
  numericStrategy?: SynInput['numericStrategy'];

  /**
* Optional options that should be passed to the `NumberFormatter` when formatting the value.
This is used to format the number when the input type is `number`.
Note this can only be set via `property`, not as an `attribute`!
 */
  numberFormatterOptions?: SynInput['numberFormatterOptions'];

  /**
   * Support for two way data binding
   */
  modelValue?: SynInput['value'];
}>();

// Make sure prop binding only forwards the props that are actually there.
// This is needed because :param="param" also adds an empty attribute
// when using web-components, which breaks optional arguments like size in SynInput
// @see https://github.com/vuejs/core/issues/5190#issuecomment-1003112498
const visibleProps = computed(() =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => typeof value !== 'undefined'),
  ),
);

// Map events
defineEmits<{
  /**
   * Emitted when the control loses focus.
   */
  'syn-blur': [e: SynBlurEvent];

  /**
   * Emitted when an alteration to the control's value is committed by the user.
   */
  'syn-change': [e: SynChangeEvent];

  /**
   * Emitted when the clear button is activated.
   */
  'syn-clear': [e: SynClearEvent];

  /**
   * Emitted when the control gains focus.
   */
  'syn-focus': [e: SynFocusEvent];

  /**
   * Emitted when the control receives input.
   */
  'syn-input': [e: SynInputEvent];

  /**
   * Emitted when the form control has been checked for validity and its constraints aren't satisfied.
   */
  'syn-invalid': [e: SynInvalidEvent];

  /**
   * Emitted if the numeric strategy allows autoClamp and the value is clamped to the min or max attribute.
   */
  'syn-clamp': [e: SynClampEvent];

  /**
   * Support for two way data binding
   */
  'update:modelValue': [newValue: SynInput['value']];
}>();
</script>

<script lang="ts">
export type { SynBlurEvent } from '@synergy-design-system/components';
export type { SynChangeEvent } from '@synergy-design-system/components';
export type { SynClearEvent } from '@synergy-design-system/components';
export type { SynFocusEvent } from '@synergy-design-system/components';
export type { SynInputEvent } from '@synergy-design-system/components';
export type { SynInvalidEvent } from '@synergy-design-system/components';
export type { SynClampEvent } from '@synergy-design-system/components';
</script>

<template>
  <syn-input
    @syn-blur="$emit('syn-blur', $event)"
    @syn-change="$emit('syn-change', $event)"
    @syn-clear="$emit('syn-clear', $event)"
    @syn-focus="$emit('syn-focus', $event)"
    @syn-input="
      $emit('update:modelValue', ($event.target as SynInput).value);
      $emit('syn-input', $event);
    "
    @syn-invalid="$emit('syn-invalid', $event)"
    @syn-clamp="$emit('syn-clamp', $event)"
    :value="
      typeof props.modelValue !== 'undefined'
        ? props.modelValue
        : typeof props.value !== 'undefined'
          ? props.value
          : undefined
    "
    v-bind="visibleProps"
    ref="nativeElement">
    <slot></slot>
  </syn-input>
</template>
