/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fi',
  $name: 'Suomi',
  $dir: 'ltr',

  clearEntry: 'Tyhjennä syöte',
  close: 'Sulje',
  hidePassword: 'Piilota salasana',
  loading: 'Ladataan',
  numOptionsSelected: num => {
    if (num === 0) return 'Ei valittuja vaihtoehtoja';
    if (num === 1) return '1 vaihtoehto valittu';
    return `${num} vaihtoehtoa valittu`;
  },
  progress: 'Edistyminen',
  remove: 'Poista',
  scrollToEnd: 'Vieritä loppuun',
  scrollToStart: 'Vieritä alkuun',
  showPassword: 'Näytä salasana',

  // Synergy custom translations start
  closeMenu: 'Sulje valikko',
  danger: 'Vaara',
  fileButtonText: 'Valitse tiedosto',
  fileButtonTextMultiple: 'Valitse tiedostot',
  fileDragDrop: 'Vedä tai valitse tiedosto',
  folderButtonText: 'Valitse kansio',
  folderDragDrop: 'Vedä tai valitse kansio',
  menu: 'Valikko',
  noResults: 'Tuloksia ei löytynyt',
  notification: 'Ilmoitus',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Ei valittuja ${dir ? 'kansioita' : 'tiedostoja'}`;
    return `${num} ${dir ? 'kansiota' : 'tiedostoa'} valittu`;
  },
  openMenu: 'Avaa valikko',
  rangeMax: 'Enintään',
  rangeMin: 'Vähintään',
  sideNav: 'Sivunavigointi',
  sideNavHide: 'Piilota navigointi',
  sideNavShow: 'Näytä navigointi',
  success: 'Onnistui',
  warning: 'Varoitus',
};

registerTranslation(translation);

export default translation;
