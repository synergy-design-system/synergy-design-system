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
  clearEntry: string;
  close: string;
  hidePassword: string;
  loading: string;
  numOptionsSelected: (num: number) => string;
  progress: string;
  remove: string;
  scrollToEnd: string;
  scrollToStart: string;
  showPassword: string;
}

export interface DefaultTranslation extends Translation {
  [key: string]: unknown;
}

export interface ExistsOptions {
  lang: string;
  includeFallback: boolean;
}
