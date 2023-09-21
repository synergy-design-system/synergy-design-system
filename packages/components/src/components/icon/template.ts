import { html } from '@microsoft/fast-element';
import { Icon } from './class.js';

export const iconTemplate = () => html<Icon>`
  <span class="icon" part="root">
    <slot></slot>
  </span>
`;
