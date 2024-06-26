import type { CSSResultGroup } from 'lit';
// import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
// import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import styles from './range.styles.js';

/**
 * @summary TODO
 * @documentation TODO
 * @status stable
 * @since TODO
 */
export default class SynRange extends SynergyElement {
  static styles: CSSResultGroup = [
    componentStyles,
    styles,
  ];

  render() {
    console.log(this);
    return html`
      <div>here</div>
    `;
  }
}
