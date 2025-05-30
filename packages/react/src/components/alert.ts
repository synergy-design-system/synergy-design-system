// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/alert/alert.component.js';

import { type EventName } from '@lit/react';
import type { SynShowEvent } from '@synergy-design-system/components';
import type { SynAfterShowEvent } from '@synergy-design-system/components';
import type { SynHideEvent } from '@synergy-design-system/components';
import type { SynAfterHideEvent } from '@synergy-design-system/components';

const tagName = 'syn-alert';
Component.define('syn-alert');

/**
 * @summary Alerts are used to display important messages inline or as toast notifications.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-alert--docs
 * @status stable
 * @since 2.0
 *
 * @dependency syn-icon-button
 *
 * @slot - The alert's main content.
 * @slot icon - An icon to show in the alert. Works best with `<syn-icon>`.
 *
 * @event syn-show - Emitted when the alert opens.
 * @event syn-after-show - Emitted after the alert opens and all animations are complete.
 * @event syn-hide - Emitted when the alert closes.
 * @event syn-after-hide - Emitted after the alert closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the optional icon.
 * @csspart message - The container that wraps the alert's main content.
 * @csspart close-button - The close button, an `<syn-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 *
 * @animation alert.show - The animation to use when showing the alert.
 * @animation alert.hide - The animation to use when hiding the alert.
 */
export const SynAlert = createComponent({
  displayName: 'SynAlert',
  elementClass: Component,
  events: {
    onSynShow: 'syn-show' as EventName<SynShowEvent>,
    onSynAfterShow: 'syn-after-show' as EventName<SynAfterShowEvent>,
    onSynHide: 'syn-hide' as EventName<SynHideEvent>,
    onSynAfterHide: 'syn-after-hide' as EventName<SynAfterHideEvent>,
  },
  react: React,
  tagName,
});

export type { SynShowEvent } from '@synergy-design-system/components';
export type { SynAfterShowEvent } from '@synergy-design-system/components';
export type { SynHideEvent } from '@synergy-design-system/components';
export type { SynAfterHideEvent } from '@synergy-design-system/components';
