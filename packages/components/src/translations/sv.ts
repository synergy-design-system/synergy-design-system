/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sv',
  $name: 'Svenska',
  $dir: 'ltr',

  clearEntry: 'Radera inmatning',
  close: 'Stäng',
  hidePassword: 'Dölj lösenord',
  loading: 'Laddas',
  numOptionsSelected: num => {
    if (num === 0) return 'Inga alternativ har valts';
    if (num === 1) return '1 alternativ har valts';
    return `${num} alternativ har valts`;
  },
  progress: 'Framsteg',
  remove: 'Ta bort',
  scrollToEnd: 'Bläddra till slutet',
  scrollToStart: 'Bläddra till början',
  showPassword: 'Visa lösenord',

  // Synergy custom translations start
  closeMenu: 'Stäng meny',
  danger: 'Fara',
  fileButtonText: 'Välj fil',
  fileButtonTextMultiple: 'Välj filer',
  fileDragDrop: 'Släpp eller välj fil',
  folderButtonText: 'Välj mapp',
  folderDragDrop: 'Släpp eller välj mapp',
  menu: 'Meny',
  noResults: 'Inga resultat hittades',
  notification: 'Meddelande',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Ingen ${dir ? 'mapp' : 'fil'} har valts`;
    return `${num} ${dir ? 'mappar' : 'filer'} har valts`;
  },
  openMenu: 'Öppna meny',
  rangeMax: 'Max.',
  rangeMin: 'Min.',
  sideNav: 'Sidonavigering',
  sideNavHide: 'Dölj navigering',
  sideNavShow: 'Visa navigering',
  success: 'Klart',
  warning: 'Varning',
};

registerTranslation(translation);

export default translation;
