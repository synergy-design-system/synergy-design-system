/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sv',
  $name: 'Svenska',
  $dir: 'ltr',

  clearEntry: 'Rensa inmatning',
  close: 'Stäng',
  hidePassword: 'Dölj lösenord',
  loading: 'Laddar',
  numOptionsSelected: num => {
    if (num === 0) return 'Inga alternativ valda';
    if (num === 1) return '1 alternativ valt';
    return `${num} alternativ valda`;
  },
  progress: 'Förlopp',
  remove: 'Ta bort',
  scrollToEnd: 'Rulla till slutet',
  scrollToStart: 'Rulla till början',
  showPassword: 'Visa lösenord',

  // Synergy custom translations start
  closeMenu: 'Stäng meny',
  danger: 'Fara',
  fileButtonText: 'Välj fil',
  fileButtonTextMultiple: 'Välj filer',
  fileDragDrop: 'Dra eller välj fil',
  folderButtonText: 'Välj mapp',
  folderDragDrop: 'Dra eller välj mapp',
  menu: 'Meny',
  noResults: 'Inga resultat hittades',
  notification: 'Notis',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Ingen ${dir ? 'mapp' : 'fil'} vald`;
    return `${num} ${dir ? 'mappar' : 'filer'} valda`;
  },
  openMenu: 'Öppna meny',
  rangeMax: 'Maximal',
  rangeMin: 'Minimal',
  sideNav: 'Sidonavigering',
  sideNavHide: 'Dölj navigering',
  sideNavShow: 'Visa navigering',
  success: 'Klart',
  warning: 'Varning',
};

registerTranslation(translation);

export default translation;
