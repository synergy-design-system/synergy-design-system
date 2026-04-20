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
    if (num === 1) return 'Je vybrána 1 možnost';
    if (num >= 2 && num <= 4) return `Jsou vybrány ${num} možnosti`;
    return `Je vybráno ${num} možností`;
  },
  paginationFirstPage: 'První stránka',
  paginationInputLabel: 'Přejít na požadované číslo stránky',
  paginationItemsPerPage: 'Položky na stránku',
  paginationItemSummary: (start, end, total) => `${start}-${end} z ${total} položek`,
  paginationLastPage: 'Poslední stránka',
  paginationNextPage: 'Další stránka',
  paginationOfTotalPages: totalPages => `z ${totalPages}`,
  paginationPreviousPage: 'Předchozí stránka',
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
  fileDragDrop: 'Přetáhněte nebo vyberte soubor',
  folderButtonText: 'Vybrat složku',
  folderDragDrop: 'Přetáhněte nebo vyberte složku',
  menu: 'Nabídka',
  noResults: 'Nebyly nalezeny žádné výsledky',
  notification: 'Oznámení',
  numFilesSelected: (num, dir) => {
    if (num === 0) return dir ? 'Není vybrána žádná složka' : 'Není vybrán žádný soubor';
    if (num === 1) return dir ? 'Je vybrána 1 složka' : 'Je vybrán 1 soubor';
    if (num >= 2 && num <= 4) return dir ? `Jsou vybrány ${num} složky` : `Jsou vybrány ${num} soubory`;
    return dir ? `Je vybráno ${num} složek` : `Je vybráno ${num} souborů`;
  },
  openMenu: 'Otevřít menu',
  rangeMax: 'Maximální',
  rangeMin: 'Minimální',
  sideNav: 'Postranní navigace',
  sideNavHide: 'Skrýt navigaci',
  sideNavShow: 'Zobrazit navigaci',
  success: 'Úspěch',
  warning: 'Varování',
};

registerTranslation(translation);

export default translation;
