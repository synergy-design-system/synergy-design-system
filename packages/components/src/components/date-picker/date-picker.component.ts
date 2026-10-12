import {
  type CSSResultGroup,
  html,
} from 'lit';
// import { classMap } from 'lit/directives/class-map.js';
// import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
// import { LocalizeController } from '../../utilities/localize.js';
import styles from './date-picker.styles.js';

/**
 * @summary A date picker component for selecting dates.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-date-picker--docs
 * @status experimental
 * @since 0.0.0
 */
export default class SynDatePicker extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  render() {
    return html`
      <div>
        hello world
      </div>
    `;
  }
}
