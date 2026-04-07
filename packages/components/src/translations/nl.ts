/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nl',
  $name: 'Nederlands',
  $dir: 'ltr',

  carousel: 'Draaideur',
  clearEntry: 'Invoer wissen',
  close: 'Sluiten',
  copied: 'Gekopieerd',
  copy: 'Kopiëren',
  currentValue: 'Actuele waarde',
  error: 'Fout',
  goToSlide: (slide, count) => `Ga naar dia ${slide} van ${count}`,
  hidePassword: 'Wachtwoord verbergen',
  loading: 'Wordt geladen',
  nextSlide: 'Volgende dia',
  numOptionsSelected: num => {
    if (num === 0) return 'Geen opties geselecteerd';
    if (num === 1) return '1 optie geselecteerd';
    return `${num} opties geselecteerd`;
  },
  previousSlide: 'Vorige dia',
  progress: 'Vooruitgang',
  remove: 'Verwijderen',
  resize: 'Grootte wijzigen',
  scrollToEnd: 'Naar het einde scrollen',
  scrollToStart: 'Naar het begin scrollen',
  selectAColorFromTheScreen: 'Kleur selecteren op het scherm',
  showPassword: 'Wachtwoord weergeven',
  slideNum: slide => `Dia ${slide}`,
  toggleColorFormat: 'Kleurformaat wijzigen',

  // Synergy custom translations start
  closeMenu: 'Menu sluiten',
  danger: 'Gevaar',
  fileButtonText: 'Bestand selecteren',
  fileButtonTextMultiple: 'Bestanden selecteren',
  fileDragDrop: 'Bestand opslaan of selecteren',
  folderButtonText: 'Map selecteren',
  folderDragDrop: 'Map opslaan of selecteren',
  menu: 'Menu',
  noResults: 'Geen resultaten gevonden',
  notification: 'Melding',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Er zijn geen ${dir ? 'mappen' : 'bestanden'} geselecteerd`;
    return `${num} ${dir ? 'mappen' : 'bestanden'} geselecteerd`;
  },
  openMenu: 'Menu openen',
  rangeMax: 'Maximum',
  rangeMin: 'Minimum',
  sideNav: 'Paginanavigatie',
  sideNavHide: 'Navigatie verbergen',
  sideNavShow: 'Navigatie weergeven',
  success: 'Succes',
  warning: 'Waarschuwing',
};

registerTranslation(translation);

export default translation;
