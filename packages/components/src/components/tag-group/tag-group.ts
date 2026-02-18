import SynTagGroup from './tag-group.component.js';

export * from './tag-group.component.js';
export default SynTagGroup;

SynTagGroup.define('syn-tag-group');

declare global {
  interface HTMLElementTagNameMap {
    'syn-tag-group': SynTagGroup;
  }
}
