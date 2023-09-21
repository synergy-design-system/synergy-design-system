import { Icon } from './class.js';
import { styles } from './styles.js';
import { iconTemplate as template } from './template.js';

export const SdsIcon = Icon.compose({
  baseName: 'icon',
  styles,
  template,
});

declare global {
  interface HTMLElementTagNameMap {
    'sds-icon': Icon;
  }
}
