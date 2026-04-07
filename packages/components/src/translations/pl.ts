/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  carousel: 'Mechanizm karuzelowy',
  clearEntry: 'Usuń wpis',
  close: 'Zamknij',
  copied: 'Skopiowane',
  copy: 'Kopiuj',
  currentValue: 'Bieżąca wartość',
  error: 'Błąd',
  goToSlide: (slide, count) => `Przejdź do slajdu ${slide} z ${count}`,
  hidePassword: 'Ukryj hasło',
  loading: 'Trwa wczytywanie',
  nextSlide: 'Następny slajd',
  numOptionsSelected: num => {
    if (num === 0) return 'Nie wybrano żadnej opcji';
    if (num === 1) return 'Wybrano 1 opcję';
    return `Wybrano ${num} opcje/opcji`;
  },
  previousSlide: 'Następny slajd',
  progress: 'Postęp',
  remove: 'Usuń',
  resize: 'Zmień wielkość',
  scrollToEnd: 'Przewiń do końca',
  scrollToStart: 'Przewiń do początku',
  selectAColorFromTheScreen: 'Wybierz kolor ekranu',
  showPassword: 'Pokaż hasło',
  slideNum: slide => `Slajd ${slide}`,
  toggleColorFormat: 'Przełącz format koloru',

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
