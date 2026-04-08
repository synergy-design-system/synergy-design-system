/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'zh-cn',
  $name: '简体中文',
  $dir: 'ltr',

  clearEntry: '清除输入',
  close: '关闭',
  hidePassword: '隐藏密码',
  loading: '正在加载',
  numOptionsSelected: num => {
    if (num === 0) return '未选择任何选项';
    if (num === 1) return '已选择 1 个选项';
    return `已选择 ${num} 个选项`;
  },
  progress: '进度',
  remove: '删除',
  scrollToEnd: '滚动到底部',
  scrollToStart: '滚动到顶部',
  showPassword: '显示密码',

  // Synergy custom translations start
  closeMenu: '关闭菜单',
  danger: '危险',
  fileButtonText: '选择文件',
  fileButtonTextMultiple: '选择文件',
  fileDragDrop: '拖拽或选择文件',
  folderButtonText: '选择文件夹',
  folderDragDrop: '拖拽或选择文件夹',
  menu: '菜单',
  noResults: '未找到结果',
  notification: '通知',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `未选择任何${dir ? '文件夹' : '文件'}`;
    return `已选择 ${num} 个${dir ? '文件夹' : '文件'}`;
  },
  openMenu: '打开菜单',
  rangeMax: '最大',
  rangeMin: '最小',
  sideNav: '页面导航',
  sideNavHide: '隐藏导航',
  sideNavShow: '显示导航',
  success: '成功',
  warning: '警告',
};

registerTranslation(translation);

export default translation;
