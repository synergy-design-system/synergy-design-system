// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/react wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------
import * as React from 'react';
import { createComponent } from '@lit/react';
import Component from '@synergy-design-system/components/components/spinner/spinner.component.js';

const tagName = 'syn-spinner';
Component.define('syn-spinner');

/**
 * @summary Spinners are used to show the progress of an indeterminate operation.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-spinner--docs
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --indicator-color - The color of the spinner's indicator.
 * @cssproperty --speed - The time it takes for the spinner to complete one animation cycle.
 */
export const SynSpinner = createComponent({
  displayName: 'SynSpinner',
  elementClass: Component,
  events: {},
  react: React,
  tagName,
});
