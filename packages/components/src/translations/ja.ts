/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ja',
  $name: '日本語',
  $dir: 'ltr',

  carousel: 'カルーセル',
  clearEntry: '入力を消去する',
  close: '終了',
  copied: 'コピーしました',
  copy: 'コピーする',
  currentValue: '現在の値',
  error: 'エラー',
  goToSlide: (slide, count) => `スライド${slide}/${count}に移動する`,
  hidePassword: 'パスワードを隠す',
  loading: '読み込み中',
  nextSlide: '次のスライド',
  numOptionsSelected: num => {
    if (num === 0) return '選択されているオプションなし';
    if (num === 1) return 'オプションが1つ選択されています';
    return `オプションが${num}つ選択されています`;
  },
  previousSlide: '前のスライド',
  progress: '進捗状況',
  remove: '削除',
  resize: 'サイズを変更する',
  scrollToEnd: '一番下にスクロール',
  scrollToStart: '一番上にスクロール',
  selectAColorFromTheScreen: '画面の色を選択する',
  showPassword: 'パスワードを表示する',
  slideNum: slide => `スライド${slide}`,
  toggleColorFormat: '色形式を切り替える',

  // Synergy custom translations start
  closeMenu: 'メニューを閉じる',
  danger: '危険',
  fileButtonText: 'ファイルの選択',
  fileButtonTextMultiple: 'ファイルの選択',
  fileDragDrop: 'ファイルの保存または選択',
  folderButtonText: 'フォルダの選択',
  folderDragDrop: 'フォルダの保存または選択',
  menu: 'メニュー',
  noResults: '検索結果なし',
  notification: '通知',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `選択されている${dir ? 'フォルダ' : 'ファイル'}なし`;
    return `${num} ${dir ? 'フォルダ' : 'ファイル'}選択済み`;
  },
  openMenu: 'メニューを開く',
  rangeMax: '最大',
  rangeMin: '最小',
  sideNav: 'ページナビゲーション',
  sideNavHide: 'ナビゲーションを非表示にする',
  sideNavShow: 'ナビゲーションを表示する',
  success: '成功',
  warning: '警告',
};

registerTranslation(translation);

export default translation;
