/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'da',
  $name: 'Dansk',
  $dir: 'ltr',

  carousel: 'Karrusel',
  clearEntry: 'Slet indtastning',
  close: 'Luk',
  copied: 'Kopieret',
  copy: 'Kopiér',
  currentValue: 'Aktuel værdi',
  error: 'Fejl',
  goToSlide: (slide, count) => `Gå til folie ${slide} ud af ${count}`,
  hidePassword: 'Skjul adgangskode',
  loading: 'Indlæses',
  nextSlide: 'Næste folie',
  numOptionsSelected: num => {
    if (num === 0) return 'Ingen muligheder valgt';
    if (num === 1) return '1 mulighed valgt';
    return `${num} muligheder valgt`;
  },
  previousSlide: 'Forrige folie',
  progress: 'Fremskridt',
  remove: 'Ryd',
  resize: 'Skift størrelse',
  scrollToEnd: 'Scroll til slutningen',
  scrollToStart: 'Scroll til starten',
  selectAColorFromTheScreen: 'Vælg farve fra skærmen',
  showPassword: 'Vis adgangskode',
  slideNum: slide => `Folie ${slide}`,
  toggleColorFormat: 'Skift farveformat',

  // Synergy custom translations start
  closeMenu: 'Luk menu',
  danger: 'Fare',
  fileButtonText: 'Vælg fil',
  fileButtonTextMultiple: 'Vælg filer',
  fileDragDrop: 'Gem eller vælg fil',
  folderButtonText: 'Vælg mappe',
  folderDragDrop: 'Gem eller vælg mappe',
  menu: 'Menu',
  noResults: 'Der blev ikke fundet nogen resultater',
  notification: 'Besked',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Ingen ${dir ? 'mapper' : 'filer'} valgt`;
    return `${num} ${dir ? 'mapper' : 'filer'} valgt`;
  },
  openMenu: 'Åbn menu',
  rangeMax: 'Maksimum',
  rangeMin: 'Minimum',
  sideNav: 'Sidenavigation',
  sideNavHide: 'Skjul navigation',
  sideNavShow: 'Vis navigation',
  success: 'Gennemført',
  warning: 'Advarsel',
};

registerTranslation(translation);

export default translation;
