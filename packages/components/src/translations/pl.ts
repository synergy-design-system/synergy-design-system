/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  clearEntry: 'Wyczyść pole',
  close: 'Zamknij',
  hidePassword: 'Ukryj hasło',
  loading: 'Trwa ładowanie',
  numOptionsSelected: num => {
    if (num === 0) return 'Nie wybrano żadnych opcji';
    if (num === 1) return 'Wybrano 1 opcję';
    if (num >= 2 && num <= 4) return `Wybrano ${num} opcje`;
    return `Wybrano ${num} opcji`;
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
  fileDragDrop: 'Przeciągnij lub wybierz plik',
  folderButtonText: 'Wybierz folder',
  folderDragDrop: 'Przeciągnij lub wybierz folder',
  menu: 'Menu',
  noResults: 'Nie znaleziono wyników',
  notification: 'Powiadomienie',
  numFilesSelected: (num, dir) => {
    if (num === 0) return dir ? 'Nie wybrano żadnego folderu' : 'Nie wybrano żadnego pliku';
    if (num === 1) return dir ? 'Wybrano 1 folder' : 'Wybrano 1 plik';
    if (num >= 2 && num <= 4) return dir ? `Wybrano ${num} foldery` : `Wybrano ${num} pliki`;
    return dir ? `Wybrano ${num} folderów` : `Wybrano ${num} plików`;
  },
  openMenu: 'Otwórz menu',
  paginationFirstPage: 'Pierwsza strona',
  paginationInputLabel: 'Wybierz stronę',
  paginationItemsPerPage: 'Elementy na stronę',
  paginationItemSummary: (start, end, total) => `${start}-${end} z ${total} elementów`,
  paginationLastPage: 'Ostatnia strona',
  paginationNextPage: 'Następna strona',
  paginationOfTotalPages: totalPages => `z ${totalPages} stron`,
  paginationPreviousPage: 'Poprzednia strona',
  rangeMax: 'Maksymalnie',
  rangeMin: 'Minimalnie',
  sideNav: 'Nawigacja strony',
  sideNavHide: 'Ukryj nawigację',
  sideNavShow: 'Pokaż nawigację',
  success: 'Sukces',
  warning: 'Ostrzeżenie',
};

registerTranslation(translation);

export default translation;
