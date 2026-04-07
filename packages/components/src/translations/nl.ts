/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nl',
  $name: 'Nederlands',
  $dir: 'ltr',

  clearEntry: 'Invoer wissen',
  close: 'Sluiten',
  hidePassword: 'Wachtwoord verbergen',
  loading: 'Wordt geladen',
  numOptionsSelected: num => {
    if (num === 0) return 'Geen opties geselecteerd';
    if (num === 1) return '1 optie geselecteerd';
    return `${num} opties geselecteerd`;
  },
  progress: 'Vooruitgang',
  remove: 'Verwijderen',
  scrollToEnd: 'Naar het einde scrollen',
  scrollToStart: 'Naar het begin scrollen',
  showPassword: 'Wachtwoord weergeven',

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
