/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'da',
  $name: 'Dansk',
  $dir: 'ltr',

  clearEntry: 'Ryd indtastning',
  close: 'Luk',
  hidePassword: 'Skjul adgangskode',
  loading: 'Indlæser',
  numOptionsSelected: num => {
    if (num === 0) return 'Ingen valgmuligheder valgt';
    if (num === 1) return '1 valgmulighed valgt';
    return `${num} valgmuligheder valgt`;
  },
  paginationFirstPage: 'Første side',
  paginationInputLabel: 'Vælg side',
  paginationItemsPerPage: 'Elementer pr. side',
  paginationItemSummary: (start, end, total) => `${start}-${end} af ${total} elementer`,
  paginationLastPage: 'Sidste side',
  paginationNextPage: 'Næste side',
  paginationOfTotalPages: totalPages => `af ${totalPages}`,
  paginationPreviousPage: 'Forrige side',
  progress: 'Fremskridt',
  remove: 'Fjern',
  scrollToEnd: 'Rul til slutningen',
  scrollToStart: 'Rul til starten',
  showPassword: 'Vis adgangskode',

  // Synergy custom translations start
  closeMenu: 'Luk menu',
  danger: 'Fare',
  fileButtonText: 'Vælg fil',
  fileButtonTextMultiple: 'Vælg filer',
  fileDragDrop: 'Træk eller vælg en fil',
  folderButtonText: 'Vælg mappe',
  folderDragDrop: 'Træk eller vælg en mappe',
  menu: 'Menu',
  noResults: 'Ingen resultater fundet',
  notification: 'Notifikation',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Ingen ${dir ? 'mapper' : 'filer'} valgt`;
    return `${num} ${dir ? 'mapper' : 'filer'} valgt`;
  },
  openMenu: 'Åbn menu',
  rangeMax: 'Maksimal',
  rangeMin: 'Minimal',
  sideNav: 'Sidenavigation',
  sideNavHide: 'Skjul navigation',
  sideNavShow: 'Vis navigation',
  success: 'Succes',
  warning: 'Advarsel',
};

registerTranslation(translation);

export default translation;
