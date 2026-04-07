/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'zh-cn',
  $name: '简体中文',
  $dir: 'ltr',

  clearEntry: '删除输入内容',
  close: '关闭',
  hidePassword: '隐藏密码',
  loading: '正在加载',
  numOptionsSelected: num => {
    if (num === 0) return '未选择任何选项';
    if (num === 1) return '已选择 1 个选项';
    return `已选择 ${num} 个选项`;
  },
  progress: '进展',
  remove: '删除',
  scrollToEnd: '滚动至底部',
  scrollToStart: '滚动至顶部',
  showPassword: '显示密码',

  // Synergy custom translations start
  closeMenu: '关闭菜单',
  danger: '危险',
  fileButtonText: '选择文件',
  fileButtonTextMultiple: '选择文件',
  fileDragDrop: '保存或选择文件',
  folderButtonText: '选择文件夹',
  folderDragDrop: '保存或选择文件夹',
  menu: '菜单',
  noResults: '未找到结果',
  notification: '通知',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `未选择${dir ? '文件夹' : '文件'}`;
    return `${num} ${dir ? '文件夹' : '文件'} 已选择`;
  },
  openMenu: '打开菜单',
  rangeMax: '最大值',
  rangeMin: '最小值',
  sideNav: '页面导航',
  sideNavHide: '隐藏导航',
  sideNavShow: '显示导航',
  success: '成功',
  warning: '警告',
};

registerTranslation(translation);

export default translation;
