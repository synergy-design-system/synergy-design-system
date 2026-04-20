/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize/core.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  clearEntry: 'Clear entry',
  close: 'Close',
  hidePassword: 'Hide password',
  loading: 'Loading',
  numOptionsSelected: num => {
    if (num === 0) return 'No options selected';
    if (num === 1) return '1 option selected';
    return `${num} options selected`;
  },
  progress: 'Progress',
  remove: 'Remove',
  scrollToEnd: 'Scroll to end',
  scrollToStart: 'Scroll to start',
  showPassword: 'Show password',

  // Synergy custom translations start
  closeMenu: 'Close menu',
  danger: 'Danger',
  fileButtonText: 'Select file',
  fileButtonTextMultiple: 'Select files',
  fileDragDrop: 'Drop or select file',
  folderButtonText: 'Select folder',
  folderDragDrop: 'Drop or select folder',
  menu: 'Menu',
  noResults: 'No results found',
  notification: 'Notification',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `No ${dir ? 'folders' : 'files'} chosen`;
    return `${num} ${dir ? 'folders' : 'files'} chosen`;
  },
  openMenu: 'Open menu',
  paginationFirstPage: 'First page',
  paginationInputLabel: 'Switch to desired page number',
  paginationItemsPerPage: 'Items per page',
  paginationItemSummary: (start, end, total) => `${start}-${end} of ${total} items`,
  paginationLastPage: 'Last page',
  paginationNextPage: 'Next page',
  paginationOfTotalPages: totalPages => `of ${totalPages}`,
  paginationPreviousPage: 'Previous page',
  rangeMax: 'Maximum',
  rangeMin: 'Minimum',
  sideNav: 'Page navigation',
  sideNavHide: 'Hide navigation',
  sideNavShow: 'Show navigation',
  success: 'Success',
  warning: 'Warning',
};

registerTranslation(translation);

export default translation;
