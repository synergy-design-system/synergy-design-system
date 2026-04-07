/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize/core.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  carousel: 'Carousel',
  clearEntry: 'Clear entry',
  close: 'Close',
  copied: 'Copied',
  copy: 'Copy',
  currentValue: 'Current value',
  error: 'Error',
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: 'Hide password',
  loading: 'Loading',
  nextSlide: 'Next slide',
  numOptionsSelected: num => {
    if (num === 0) return 'No options selected';
    if (num === 1) return '1 option selected';
    return `${num} options selected`;
  },
  previousSlide: 'Previous slide',
  progress: 'Progress',
  remove: 'Remove',
  resize: 'Resize',
  scrollToEnd: 'Scroll to end',
  scrollToStart: 'Scroll to start',
  selectAColorFromTheScreen: 'Select color from screen',
  showPassword: 'Show password',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Switch color format',

  // Synergy custom translations start
  closeMenu: 'Close menu',
  danger: 'Danger',
  fileButtonText: 'Select file',
  fileButtonTextMultiple: 'Select files',
  fileDragDrop: 'Store or select file',
  folderButtonText: 'Select folder',
  folderDragDrop: 'Store or select folder',
  menu: 'Menu',
  noResults: 'No results found',
  notification: 'Notification',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `No ${dir ? 'folders' : 'files'} selected`;
    return `${num} ${dir ? 'folders' : 'files'} selected`;
  },
  openMenu: 'Open menu',
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
