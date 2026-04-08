/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'zh-tw',
  $name: '正體中文',
  $dir: 'ltr',

  clearEntry: '清除輸入',
  close: '關閉',
  hidePassword: '隱藏密碼',
  loading: '載入中',
  numOptionsSelected: num => {
    if (num === 0) return '未選擇任何選項';
    if (num === 1) return '已選擇 1 個選項';
    return `已選擇 ${num} 個選項`;
  },
  progress: '進度',
  remove: '刪除',
  scrollToEnd: '捲動至底部',
  scrollToStart: '捲動至頂部',
  showPassword: '顯示密碼',

  // Synergy custom translations start
  closeMenu: '關閉選單',
  danger: '危險',
  fileButtonText: '選擇檔案',
  fileButtonTextMultiple: '選擇檔案',
  fileDragDrop: '拖曳或選擇檔案',
  folderButtonText: '選擇資料夾',
  folderDragDrop: '拖曳或選擇資料夾',
  menu: '選單',
  noResults: '找不到結果',
  notification: '通知',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `未選擇任何${dir ? '資料夾' : '檔案'}`;
    return `已選擇 ${num} 個${dir ? '資料夾' : '檔案'}`;
  },
  openMenu: '開啟選單',
  rangeMax: '最大',
  rangeMin: '最小',
  sideNav: '頁面導覽',
  sideNavHide: '隱藏導覽',
  sideNavShow: '顯示導覽',
  success: '成功',
  warning: '警告',
};

registerTranslation(translation);

export default translation;
