import { Logo } from './class';
import { styles } from './styles';
import { logoTemplate as template } from './template';

export const SdsLogo = Logo.compose({
  baseName: 'logo',
  styles,
  template,
});
