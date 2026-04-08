/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'it',
  $name: 'Italian',
  $dir: 'ltr',

  clearEntry: 'Cancella input',
  close: 'Chiudi',
  hidePassword: 'Nascondi password',
  loading: 'Caricamento',
  numOptionsSelected: num => {
    if (num === 0) return 'Nessuna opzione selezionata';
    if (num === 1) return '1 opzione selezionata';
    return `${num} opzioni selezionate`;
  },
  progress: 'Avanzamento',
  remove: 'Rimuovi',
  scrollToEnd: 'Scorri alla fine',
  scrollToStart: 'Scorri all’inizio',
  showPassword: 'Mostra password',

  // Synergy custom translations start
  closeMenu: 'Chiudi menu',
  danger: 'Pericolo',
  fileButtonText: 'Seleziona file',
  fileButtonTextMultiple: 'Seleziona file',
  fileDragDrop: 'Trascina o seleziona file',
  folderButtonText: 'Seleziona cartella',
  folderDragDrop: 'Trascina o seleziona cartella',
  menu: 'Menu',
  noResults: 'Nessun risultato trovato',
  notification: 'Notifica',
  numFilesSelected: (num, dir) => {
    if (num === 0) return dir ? 'Nessuna cartella selezionata' : 'Nessun file selezionato';
    return `${num} ${dir ? 'cartelle' : 'file'} selezionati`;
  },
  openMenu: 'Apri menu',
  rangeMax: 'Massimo',
  rangeMin: 'Minimo',
  sideNav: 'Navigazione della pagina',
  sideNavHide: 'Nascondi navigazione',
  sideNavShow: 'Mostra navigazione',
  success: 'Operazione completata',
  warning: 'Avviso',
};

registerTranslation(translation);

export default translation;
