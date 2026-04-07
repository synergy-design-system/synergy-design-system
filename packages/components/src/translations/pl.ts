/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  clearEntry: 'Usuń wpis',
  close: 'Zamknij',
  hidePassword: 'Ukryj hasło',
  loading: 'Trwa wczytywanie',
  numOptionsSelected: num => {
    if (num === 0) return 'Nie wybrano żadnej opcji';
    if (num === 1) return 'Wybrano 1 opcję';
    return `Wybrano ${num} opcje/opcji`;
  },
  progress: 'Postęp',
  remove: 'Usuń',
  scrollToEnd: 'Przewiń do końca',
  scrollToStart: 'Przewiń do początku',
  showPassword: 'Pokaż hasło',

  // Synergy custom translations start
  closeMenu: 'Zamknij menu',
  danger: 'Niebezpieczeństwo',
  fileButtonText: 'Wybierz plik',
  fileButtonTextMultiple: 'Wybierz pliki',
  fileDragDrop: 'Upuść lub wybierz plik',
  folderButtonText: 'Wybierz folder',
  folderDragDrop: 'Upuść lub wybierz folder',
  menu: 'Menu',
  noResults: 'Nie znaleziono wyników',
  notification: 'Powiadomienie',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Nie wybrano ${dir ? 'folderu' : 'plików'}`;
    return `${num} ${dir ? 'folderów' : 'plików'} wybrano`;
  },
  openMenu: 'Otwórz menu',
  rangeMax: 'Maksimum',
  rangeMin: 'Minimum',
  sideNav: 'Nawigacja w obrębie strony',
  sideNavHide: 'Ukryj nawigację',
  sideNavShow: 'Pokaż nawigację',
  success: 'Sukces',
  warning: 'Ostrzeżenie',
};

registerTranslation(translation);

export default translation;
