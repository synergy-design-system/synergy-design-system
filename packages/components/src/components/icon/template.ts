import { html } from '@microsoft/fast-element';
import { Icon } from './class.js';

export const iconTemplate = () => html<Icon>`
  <span part="root">
    <span class="icon">
      <slot></slot>
    </span>
  </span>
`;
