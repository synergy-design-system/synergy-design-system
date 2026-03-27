export type FunctionParams<T> = T extends (...args: infer U) => string ? U : [];

export interface Translation {
  $code: string; // e.g. en, en-GB
  $name: string; // e.g. English, Español
  $dir: 'ltr' | 'rtl';

  closeMenu: string;
  danger: string;
  fileButtonText: string;
  fileButtonTextMultiple: string;
  fileDragDrop: string;
  folderButtonText: string;
  folderDragDrop: string;
  menu: string;
  noResults: string;
  notification: string;
  numFilesSelected: (num: number, dir: boolean) => string;
  openMenu: string;
  rangeMax: string;
  rangeMin: string;
  sideNav: string;
  sideNavHide: string;
  sideNavShow: string;
  success: string;
  warning: string;
  carousel: string;
  clearEntry: string;
  close: string;
  copied: string;
  copy: string;
  currentValue: string;
  error: string;
  goToSlide: (slide: number, count: number) => string;
  hidePassword: string;
  loading: string;
  nextSlide: string;
  numOptionsSelected: (num: number) => string;
  previousSlide: string;
  progress: string;
  remove: string;
  resize: string;
  scrollToEnd: string;
  scrollToStart: string;
  selectAColorFromTheScreen: string;
  showPassword: string;
  slideNum: (slide: number) => string;
  toggleColorFormat: string;
}

export interface DefaultTranslation extends Translation {
  [key: string]: unknown;
}

export interface ExistsOptions {
  lang: string;
  includeFallback: boolean;
}
