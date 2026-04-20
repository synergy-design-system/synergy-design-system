/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ja',
  $name: '日本語',
  $dir: 'ltr',

  clearEntry: '入力をクリア',
  close: '閉じる',
  hidePassword: 'パスワードを非表示',
  loading: '読み込み中',
  numOptionsSelected: num => {
    if (num === 0) return '選択されたオプションはありません';
    if (num === 1) return '1件のオプションが選択されています';
    return `${num}件のオプションが選択されています`;
  },
  progress: '進行状況',
  remove: '削除',
  scrollToEnd: '末尾へスクロール',
  scrollToStart: '先頭へスクロール',
  showPassword: 'パスワードを表示',

  // Synergy custom translations start
  closeMenu: 'メニューを閉じる',
  danger: '危険',
  fileButtonText: 'ファイルを選択',
  fileButtonTextMultiple: 'ファイルを選択',
  fileDragDrop: 'ファイルをドラッグまたは選択',
  folderButtonText: 'フォルダを選択',
  folderDragDrop: 'フォルダをドラッグまたは選択',
  menu: 'メニュー',
  noResults: '結果が見つかりません',
  notification: '通知',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `${dir ? 'フォルダ' : 'ファイル'}は選択されていません`;
    return `${num}件の${dir ? 'フォルダ' : 'ファイル'}が選択されています`;
  },
  openMenu: 'メニューを開く',
  paginationFirstPage: '最初のページ',
  paginationInputLabel: '希望のページ番号に移動',
  paginationItemsPerPage: 'ページごとの項目数',
  paginationItemSummary: (start, end, total) => `${start}-${end} / ${total} 件`,
  paginationLastPage: '最後のページ',
  paginationNextPage: '次のページ',
  paginationOfTotalPages: totalPages => ` / ${totalPages} ページ`,
  paginationPreviousPage: '前のページ',
  rangeMax: '最大',
  rangeMin: '最小',
  sideNav: 'ページナビゲーション',
  sideNavHide: 'ナビゲーションを非表示',
  sideNavShow: 'ナビゲーションを表示',
  success: '成功',
  warning: '警告',
};

registerTranslation(translation);

export default translation;
