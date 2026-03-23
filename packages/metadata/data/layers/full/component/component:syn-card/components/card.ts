/* eslint-disable */
import SynCard from './card.component.js';

export * from './card.component.js';
export default SynCard;

SynCard.define('syn-card');

declare global {
  interface HTMLElementTagNameMap {
    'syn-card': SynCard;
  }
}
