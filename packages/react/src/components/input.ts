// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/input/input.component.js';

import { type EventName } from '@lit/react';
import type { SynBlurEvent } from '@synergy-design-system/components';
import type { SynChangeEvent } from '@synergy-design-system/components';
import type { SynClearEvent } from '@synergy-design-system/components';
import type { SynFocusEvent } from '@synergy-design-system/components';
import type { SynInputEvent } from '@synergy-design-system/components';
import type { SynInvalidEvent } from '@synergy-design-system/components';
import type { SynClampEvent } from '@synergy-design-system/components';

const tagName = 'syn-input';
Component.define('syn-input');

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
export const SynInput = createComponent({
  displayName: 'SynInput',
  elementClass: Component,
  events: {
    onSynBlur: 'syn-blur' as EventName<SynBlurEvent>,
    onSynChange: 'syn-change' as EventName<SynChangeEvent>,
    onSynClear: 'syn-clear' as EventName<SynClearEvent>,
    onSynFocus: 'syn-focus' as EventName<SynFocusEvent>,
    onSynInput: 'syn-input' as EventName<SynInputEvent>,
    onSynInvalid: 'syn-invalid' as EventName<SynInvalidEvent>,
    onSynClamp: 'syn-clamp' as EventName<SynClampEvent>,
  },
  react: React,
  tagName,
});

export type { SynBlurEvent } from '@synergy-design-system/components';
export type { SynChangeEvent } from '@synergy-design-system/components';
export type { SynClearEvent } from '@synergy-design-system/components';
export type { SynFocusEvent } from '@synergy-design-system/components';
export type { SynInputEvent } from '@synergy-design-system/components';
export type { SynInvalidEvent } from '@synergy-design-system/components';
export type { SynClampEvent } from '@synergy-design-system/components';
