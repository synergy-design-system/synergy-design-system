import { Logo } from './class.js';
import { styles } from './styles.js';
import { logoTemplate as template } from './template.js';

export const SdsLogo = Logo.compose({
  baseName: 'logo',
  styles,
  template,
});

declare global {
  interface HTMLElementTagNameMap {
    'sds-logo': Logo;
  }
}
