/* eslint-disable */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  carousel: 'Karussell',
  clearEntry: 'Eingabe löschen',
  close: 'Schließen',
  copied: 'Kopiert',
  copy: 'Kopieren',
  currentValue: 'Aktueller Wert',
  error: 'Fehler',
  goToSlide: (slide, count) => `Zu Folie ${slide} von ${count} gehen`,
  hidePassword: 'Passwort verbergen',
  loading: 'Wird geladen',
  nextSlide: 'Nächste Folie',
  numOptionsSelected: num => {
    if (num === 0) return 'Keine Optionen ausgewählt';
    if (num === 1) return '1 Option ausgewählt';
    return `${num} Optionen ausgewählt`;
  },
  previousSlide: 'Vorherige Folie',
  progress: 'Fortschritt',
  remove: 'Entfernen',
  resize: 'Größe ändern',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  selectAColorFromTheScreen: 'Farbe vom Bildschirm auswählen',
  showPassword: 'Passwort anzeigen',
  slideNum: slide => `Folie ${slide}`,
  toggleColorFormat: 'Farbformat umschalten',

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
      return `${num} Dateien`;
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
