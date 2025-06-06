// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/range-tick/range-tick.component.js';

const tagName = 'syn-range-tick';
Component.define('syn-range-tick');

/**
 * @summary Ticks visually improve positioning on range sliders.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-range-tick--docs
 * @status stable
 *
 * @slot - The tick's label
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The component's label.
 * @csspart line - The component's tick line.
 *
 * @cssproperty --tick-height - The height of the tick marker.
 * @cssproperty --tick-label-top - The top offset of the tick label.
 */
export const SynRangeTick = createComponent({
  displayName: 'SynRangeTick',
  elementClass: Component,
  events: {},
  react: React,
  tagName,
});
