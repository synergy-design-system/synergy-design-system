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
  calendarClear: '清除',
  calendarNextMonth: '下个月',
  calendarNextYear: '下一年',
  calendarNextYearBlock: '后12年',
  calendarPreviousMonth: '上个月',
  calendarPreviousYear: '上一年',
  calendarPreviousYearBlock: '前12年',
  calendarThisMonth: '本月',
  calendarThisYear: '今年',
  calendarToday: '今天',
  closeMenu: '关闭菜单',
  critical: '严重',
  danger: '危险',
  error: '错误',
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
  paginationFirstPage: '第一页',
  paginationInputLabel: '选择页码',
  paginationItemsPerPage: '每页条目数',
  paginationItemSummary: (start, end, total) => `${start}-${end} / ${total} 条目`,
  paginationLastPage: '最后一页',
  paginationNextPage: '下一页',
  paginationOfTotalPages: totalPages => `共 ${totalPages} 页`,
  paginationPreviousPage: '上一页',
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
