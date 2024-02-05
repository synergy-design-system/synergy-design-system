// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/button/button.component.js';

import { type EventName } from '@lit/react';
import type { SynBlurEvent, SynFocusEvent, SynInvalidEvent } from '@synergy-design-system/components';

const tagName = 'syn-button';
Component.define('syn-button');

/**
 * @summary Buttons represent actions that are available to the user.
 * @documentation https://synergy.style/components/button
 * @status stable
 * @since 2.0
 *
 * @dependency syn-icon
 * @dependency syn-spinner
 *
 * @event syn-blur - Emitted when the button loses focus.
 * @event syn-focus - Emitted when the button gains focus.
 * @event syn-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @slot - The button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The button's label.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart caret - The button's caret icon, an `<syn-icon>` element.
 * @csspart spinner - The spinner that shows when the button is in the loading state.
 */
export const SynButton = createComponent({
  displayName: 'SynButton',
  elementClass: Component,
  events: {
    onSynBlur: 'syn-blur' as EventName<SynBlurEvent>,
    onSynFocus: 'syn-focus' as EventName<SynFocusEvent>,
    onSynInvalid: 'syn-invalid' as EventName<SynInvalidEvent>,
  },
  react: React,
  tagName,
});
