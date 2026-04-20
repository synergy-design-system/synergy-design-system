/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  clearEntry: 'Eingabe löschen',
  close: 'Schließen',
  hidePassword: 'Passwort verbergen',
  loading: 'Wird geladen',
  numOptionsSelected: num => {
    if (num === 0) return 'Keine Optionen ausgewählt';
    if (num === 1) return '1 Option ausgewählt';
    return `${num} Optionen ausgewählt`;
  },
  progress: 'Fortschritt',
  remove: 'Entfernen',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  showPassword: 'Passwort anzeigen',

  // Synergy custom translations start
  closeMenu: 'Menü schließen',
  danger: 'Gefahr',
  fileButtonText: 'Datei auswählen',
  fileButtonTextMultiple: 'Dateien auswählen',
  fileDragDrop: 'Datei ablegen oder auswählen',
  folderButtonText: 'Ordner auswählen',
  folderDragDrop: 'Ordner ablegen oder auswählen',
  menu: 'Menü',
  noResults: 'Keine Ergebnisse gefunden',
  notification: 'Benachrichtigung',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Keine ${dir ? 'Ordner' : 'Dateien'} ausgewählt`;
    return `${num} ${dir ? 'Ordner' : 'Dateien'} ausgewählt`;
  },
  openMenu: 'Menü öffnen',
  rangeMax: 'Maximum',
  rangeMin: 'Minimum',
  sideNav: 'Seitennavigation',
  sideNavHide: 'Navigation ausblenden',
  sideNavShow: 'Navigation einblenden',
  success: 'Erfolg',
  warning: 'Warnung',
};

registerTranslation(translation);

export default translation;
