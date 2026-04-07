/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'zh-tw',
  $name: '正體中文',
  $dir: 'ltr',

  carousel: '圓盤傳送帶',
  clearEntry: '刪除輸入內容',
  close: '關閉',
  copied: '已複製',
  copy: '複製',
  currentValue: '當前值',
  error: '故障',
  goToSlide: (slide, count) => `前往第${slide}張幻燈片，共${count}張`,
  hidePassword: '隱藏密碼',
  loading: '載入中',
  nextSlide: '下一張幻燈片',
  numOptionsSelected: num => {
    if (num === 0) return '未選擇選項';
    if (num === 1) return '已選擇1個選項';
    return `已選擇${num}個選項`;
  },
  previousSlide: '上一張幻燈片',
  progress: '進度',
  remove: '移除',
  resize: '更改尺寸',
  scrollToEnd: '滾動至末尾',
  scrollToStart: '滾動至開頭',
  selectAColorFromTheScreen: '選擇屏幕顏色',
  showPassword: '顯示密碼',
  slideNum: slide => `第${slide}張幻燈片`,
  toggleColorFormat: '切換顏色格式',

  // Synergy custom translations start
  closeMenu: '關閉選單',
  danger: '危險',
  fileButtonText: '選擇檔案',
  fileButtonTextMultiple: '選擇檔案',
  fileDragDrop: '儲存或選擇檔案',
  folderButtonText: '選擇資料夾',
  folderDragDrop: '儲存或選擇資料夾',
  menu: '選單',
  noResults: '找不到結果',
  notification: '通知',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `未選擇${dir ? '資料夾' : '檔案'}`;
    return `${num} ${dir ? '資料夾' : '檔案'} 已選擇`;
  },
  openMenu: '開啟選單',
  rangeMax: '最大值',
  rangeMin: '最小值',
  sideNav: '頁面導航',
  sideNavHide: '隱藏導航',
  sideNavShow: '顯示導航',
  success: '成功',
  warning: '警告',
};

registerTranslation(translation);

export default translation;
