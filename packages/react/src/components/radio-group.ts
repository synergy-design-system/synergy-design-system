// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/radio-group/radio-group.component.js';

import { type EventName } from '@lit/react';
import type { SynChangeEvent } from '@synergy-design-system/components';
import type { SynInputEvent } from '@synergy-design-system/components';
import type { SynInvalidEvent } from '@synergy-design-system/components';

const tagName = 'syn-radio-group';
Component.define('syn-radio-group');

/**
 * @summary Radio groups are used to group multiple [radios](/components/radio) or [radio buttons](/components/radio-button) so they function as a single form control.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-radio-group--docs
 * @status stable
 * @since 2.0
 *
 * @dependency syn-button-group
 *
 * @slot - The default slot where `<syn-radio>` or `<syn-radio-button>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot help-text - Text that describes how to use the radio group. Alternatively, you can use the `help-text` attribute.
 *
 * @event syn-change - Emitted when the radio group's selected value changes.
 * @event syn-input - Emitted when the radio group receives user input.
 * @event syn-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
export const SynRadioGroup = createComponent({
  displayName: 'SynRadioGroup',
  elementClass: Component,
  events: {
    onSynChange: 'syn-change' as EventName<SynChangeEvent>,
    onSynInput: 'syn-input' as EventName<SynInputEvent>,
    onSynInvalid: 'syn-invalid' as EventName<SynInvalidEvent>,
  },
  react: React,
  tagName,
});

export type { SynChangeEvent } from '@synergy-design-system/components';
export type { SynInputEvent } from '@synergy-design-system/components';
export type { SynInvalidEvent } from '@synergy-design-system/components';
