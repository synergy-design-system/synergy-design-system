/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'cs',
  $name: 'Čeština',
  $dir: 'ltr',

  clearEntry: 'Vymazat zadání',
  close: 'Zavřít',
  hidePassword: 'Skrýt heslo',
  loading: 'Načítá se',
  numOptionsSelected: num => {
    if (num === 0) return 'Nejsou vybrány žádné možnosti';
    if (num === 1) return 'Je zvolena 1 možnost';
    return `Jsou vybrány ${num} možnosti`;
  },
  progress: 'Průběh',
  remove: 'Vymazat',
  scrollToEnd: 'Přejít na konec',
  scrollToStart: 'Přejít na začátek',
  showPassword: 'Zobrazit heslo',

  // Synergy custom translations start
  closeMenu: 'Zavřít menu',
  danger: 'Nebezpečí',
  fileButtonText: 'Vybrat soubor',
  fileButtonTextMultiple: 'Vybrat soubory',
  fileDragDrop: 'Uložit nebo vybrat soubor',
  folderButtonText: 'Vybrat složku',
  folderDragDrop: 'Uložit nebo vybrat složku',
  menu: 'Nabídka',
  noResults: 'Nebyly nalezeny žádné výsledky',
  notification: 'Oznámení',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Není vybrána žádná ${dir ? 'složka' : 'souborů'}`;
    return `${num} ${dir ? 'složky' : 'souborů'}`;
  },
  openMenu: 'Otevřít menu',
  rangeMax: 'Maximum',
  rangeMin: 'Minimum',
  sideNav: 'Navigace stránek',
  sideNavHide: 'Skrýt navigaci',
  sideNavShow: 'Zobrazit navigaci',
  success: 'Úspěch',
  warning: 'Varování',
};

registerTranslation(translation);

export default translation;
