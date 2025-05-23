// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/icon/icon.component.js';

import { type EventName } from '@lit/react';
import type { SynLoadEvent } from '@synergy-design-system/components';
import type { SynErrorEvent } from '@synergy-design-system/components';

const tagName = 'syn-icon';
Component.define('syn-icon');

/**
 * @summary Icons are symbols that can be used to represent various options within an application.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-icon--docs
 * @status stable
 * @since 2.0
 *
 * @event syn-load - Emitted when the icon has loaded. When using `spriteSheet: true` this will not emit.
 * @event syn-error - Emitted when the icon fails to load due to an error. When using `spriteSheet: true` this will not emit.
 *
 * @csspart svg - The internal SVG element.
 * @csspart use - The <use> element generated when using `spriteSheet: true`
 */
export const SynIcon = createComponent({
  displayName: 'SynIcon',
  elementClass: Component,
  events: {
    onSynLoad: 'syn-load' as EventName<SynLoadEvent>,
    onSynError: 'syn-error' as EventName<SynErrorEvent>,
  },
  react: React,
  tagName,
});

export type { SynLoadEvent } from '@synergy-design-system/components';
export type { SynErrorEvent } from '@synergy-design-system/components';
