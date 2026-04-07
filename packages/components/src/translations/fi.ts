/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fi',
  $name: 'Suomi',
  $dir: 'ltr',

  carousel: 'Karuselli',
  clearEntry: 'Poista syöttö',
  close: 'Sulje',
  copied: 'Kopioitu',
  copy: 'Kopio',
  currentValue: 'Ajankohtainen arvo',
  error: 'Vika',
  goToSlide: (slide, count) => `Siirry kalvosta ${slide} kalvolle ${count}`,
  hidePassword: 'Piilota salasana',
  loading: 'Ladataan',
  nextSlide: 'Seuraava kalvo',
  numOptionsSelected: num => {
    if (num === 0) return 'Ei valittu mitään optioita';
    if (num === 1) return '1 optio valittu';
    return `${num} optiota valittu`;
  },
  previousSlide: 'Edellinen kalvo',
  progress: 'Eteneminen',
  remove: 'Poista',
  resize: 'Muuta kokoa',
  scrollToEnd: 'Vieritä loppuun',
  scrollToStart: 'Vieritä alkuun',
  selectAColorFromTheScreen: 'Valitse näytön väri',
  showPassword: 'Näytä salasana',
  slideNum: slide => `Kalvo ${slide}`,
  toggleColorFormat: 'Vaihda väriformaattia',

  // Synergy custom translations start
  closeMenu: 'Sulje valikko',
  danger: 'Vaara',
  fileButtonText: 'Valitse tiedosto',
  fileButtonTextMultiple: 'Valitse tiedostot',
  fileDragDrop: 'Lisää tai valitse tiedosto',
  folderButtonText: 'Valitse kansio',
  folderDragDrop: 'Lisää tai valitse kansio',
  menu: 'Valikko',
  noResults: 'Tuloksia ei löytynyt',
  notification: 'Ilmoitus',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Ei valittu ${dir ? 'kansioita' : 'tiedostoja'}`;
    return `${num} ${dir ? 'kansioita' : 'tiedostoja'} valittu`;
  },
  openMenu: 'Avaa valikko',
  rangeMax: 'Enintään',
  rangeMin: 'Vähintään',
  sideNav: 'Sivunavigointi',
  sideNavHide: 'Piilota navigointi',
  sideNavShow: 'Näytä navigointi',
  success: 'Tulos',
  warning: 'Varoitus',
};

registerTranslation(translation);

export default translation;
