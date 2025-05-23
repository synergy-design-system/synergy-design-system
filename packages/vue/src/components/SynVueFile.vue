<script setup lang="ts">
// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/vue wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------

/**
 * @summary File controls allow selecting an arbitrary number of files for uploading.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-file--docs
 * @status stable
 *
 * @dependency syn-button
 * @dependency syn-icon
 *
 * @slot label - The file control's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the file control.
 *    Alternatively, you can use the `help-text` attribute.
 * @slot droparea-icon - Optional droparea icon to use instead of the default.
 *    Works best with `<syn-icon>`.
 * @slot trigger - Optional content to be used as trigger instead of the default content.
 *    Opening the file dialog on click and as well as drag and drop will work for this content.
 *    Following attributes will no longer work: *label*, *droparea*, *help-text*, *size*,
 *    *hide-value*. Also if using the disabled attribute, the disabled styling will not be
 *    applied and must be taken care of yourself.
 *
 * @event syn-blur - Emitted when the control loses focus.
 * @event syn-change - Emitted when an alteration to the control's value is committed by the user.
 * @event syn-error - Emitted when multiple files are selected via drag and drop, without
 * the `multiple` property being set.
 * @event syn-focus - Emitted when the control gains focus.
 * @event syn-input - Emitted when the control receives input.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart button-wrapper - The wrapper around the button and text value.
 * @csspart button - The syn-button acting as a file input.
 * @csspart button__base - The syn-button's exported `base` part.
 * @csspart value - The chosen files or placeholder text for the file input.
 * @csspart droparea - The element wrapping the drop zone.
 * @csspart droparea-background - The background of the drop zone.
 * @csspart droparea-icon - The container that wraps the icon for the drop zone.
 * @csspart droparea-value - The text for the drop zone.
 * @csspart trigger - The container that wraps the trigger.
 *
 * @animation file.iconDrop - The animation to use for the file icon
 * when a file is dropped
 * @animation file.text.disappear - The disappear animation to use for the file placeholder text
 * when a file is dropped
 * @animation file.text.appear - The appear animation to use for the file placeholder text
 * when a file is dropped
 */
import { computed, ref } from 'vue';
import '@synergy-design-system/components/components/file/file.js';

import type { SynBlurEvent } from '@synergy-design-system/components';
import type { SynChangeEvent } from '@synergy-design-system/components';
import type { SynErrorEvent } from '@synergy-design-system/components';
import type { SynFocusEvent } from '@synergy-design-system/components';
import type { SynInputEvent } from '@synergy-design-system/components';
import type { SynFile } from '@synergy-design-system/components';

// DOM Reference to the element
const nativeElement = ref<SynFile>();

defineExpose({
  nativeElement,
});

// Map attributes
const props = defineProps<{
  /**
* The selected files as a FileList object containing a list of File objects.
The FileList behaves like an array, so you can get the number of selected files
via its length property.
[see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files)
 */
  files?: SynFile['files'];

  /**
   * The name of the file control, submitted as a name/value pair with form data.
   */
  name?: SynFile['name'];

  /**
* The value of the file control contains a string that represents the path of the selected file.
If multiple files are selected, the value represents the first file in the list.
If no file is selected, the value is an empty string.
Beware that the only valid value when setting a file control is an empty string!
[see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#value)
 */
  value?: SynFile['value'];

  /**
   * The file control's size.
   */
  size?: SynFile['size'];

  /**
   * The file control's label.
   * If you need to display HTML, use the `label` slot instead.
   */
  label?: SynFile['label'];

  /**
* The file control's help text.
If you need to display HTML, use the `help-text` slot instead.
 */
  helpText?: SynFile['helpText'];

  /**
   * Disables the file control.
   */
  disabled?: SynFile['disabled'];

  /**
   * Draw the file control as a drop area
   */
  droparea?: SynFile['droparea'];

  /**
* Comma separated list of supported file types
[see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)
 */
  accept?: SynFile['accept'];

  /**
* Specifies the types of files that the server accepts.
Can be set either to user or environment.
Works only when not using a droparea!
[see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
 */
  capture?: SynFile['capture'];

  /**
* Indicates whether the user can select more than one file.
Has no effect if webkitdirectory is set.
[see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple)
 */
  multiple?: SynFile['multiple'];

  /**
* Indicates that the file control should let the user select directories instead of files.
When a directory is selected, the directory and its entire hierarchy of contents are included
in the set of selected items.
Note: This is a non-standard attribute but is supported in the major browsers.
[see MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)
 */
  webkitdirectory?: SynFile['webkitdirectory'];

  /**
* By default, form controls are associated with the nearest containing `<form>` element.
This attribute allows you to place the form control outside of a form and associate it
with the form that has this `id`.
* The form must be in the same document
or shadow root for this to work.
 */
  form?: SynFile['form'];

  /**
   * Makes the input a required field.
   */
  required?: SynFile['required'];

  /**
   * Suppress the value from being displayed in the file control
   */
  hideValue?: SynFile['hideValue'];

  /**
   * Support for two way data binding
   */
  modelValue?: SynFile['files'];
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
   * Emitted when multiple files are selected via drag and drop, without the `multiple` property being set.
   */
  'syn-error': [e: SynErrorEvent];

  /**
   * Emitted when the control gains focus.
   */
  'syn-focus': [e: SynFocusEvent];

  /**
   * Emitted when the control receives input.
   */
  'syn-input': [e: SynInputEvent];

  /**
   * Support for two way data binding
   */
  'update:modelValue': [newValue: SynFile['files']];
}>();
</script>

<script lang="ts">
export type { SynBlurEvent } from '@synergy-design-system/components';
export type { SynChangeEvent } from '@synergy-design-system/components';
export type { SynErrorEvent } from '@synergy-design-system/components';
export type { SynFocusEvent } from '@synergy-design-system/components';
export type { SynInputEvent } from '@synergy-design-system/components';
</script>

<template>
  <syn-file
    @syn-blur="$emit('syn-blur', $event)"
    @syn-change="$emit('syn-change', $event)"
    @syn-error="$emit('syn-error', $event)"
    @syn-focus="$emit('syn-focus', $event)"
    @syn-input="
      $emit('update:modelValue', ($event.target as SynFile).files);
      $emit('syn-input', $event);
    "
    :files="
      typeof props.modelValue !== 'undefined'
        ? props.modelValue
        : typeof props.files !== 'undefined'
          ? props.files
          : undefined
    "
    v-bind="visibleProps"
    ref="nativeElement">
    <slot></slot>
  </syn-file>
</template>
