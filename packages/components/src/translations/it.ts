/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'it',
  $name: 'Italian',
  $dir: 'ltr',

  carousel: 'Carosello',
  clearEntry: 'Cancella immissione',
  close: 'Chiudi',
  copied: 'Copiato',
  copy: 'Copia',
  currentValue: 'Valore attuale',
  error: 'Errore',
  goToSlide: (slide, count) => `Vai a diapositiva ${slide} di ${count}`,
  hidePassword: 'Nascondi password',
  loading: 'Caricamento in corso',
  nextSlide: 'Diapositiva successiva',
  numOptionsSelected: num => {
    if (num === 0) return 'Nessuna opzione selezionata';
    if (num === 1) return '1 opzione selezionata';
    return `${num} opzioni selezionate`;
  },
  previousSlide: 'Diapositiva precedente',
  progress: 'Avanzamento',
  remove: 'Rimuovi',
  resize: 'Cambia dimensione',
  scrollToEnd: 'Scorri alla fine',
  scrollToStart: 'Scorri all’inizio',
  selectAColorFromTheScreen: 'Seleziona colore da schermo',
  showPassword: 'Mostra password',
  slideNum: slide => `Diapositiva ${slide}`,
  toggleColorFormat: 'Cambia formato colore',

  // Synergy custom translations start
  closeMenu: 'Chiudi menu',
  danger: 'Pericolo',
  fileButtonText: 'Seleziona file',
  fileButtonTextMultiple: 'Seleziona file',
  fileDragDrop: 'Salva o seleziona file',
  folderButtonText: 'Seleziona cartella',
  folderDragDrop: 'Salva o seleziona cartella',
  menu: 'Menu',
  noResults: 'Nessun risultato trovato',
  notification: 'Messaggio',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Nessun/a ${dir ? 'cartella' : 'file'} selezionato/a`;
    return `${num} ${dir ? 'cartelle' : 'file'} selezionati`;
  },
  openMenu: 'Apri menu',
  rangeMax: 'Massimo',
  rangeMin: 'Minimo',
  sideNav: 'Navigazione del sito',
  sideNavHide: 'Mostra navigazione',
  sideNavShow: 'Nascondi navigazione',
  success: 'Riuscito',
  warning: 'Avviso',
};

registerTranslation(translation);

export default translation;
