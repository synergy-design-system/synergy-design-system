import SynFile from './file.component.js';

export * from './file.component.js';
export default SynFile;

SynFile.define('syn-file');

declare global {
  interface HTMLElementTagNameMap {
    'syn-file': SynFile;
  }
}
