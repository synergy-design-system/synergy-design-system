/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'zh-cn',
  $name: '简体中文',
  $dir: 'ltr',

  carousel: '旋转',
  clearEntry: '删除输入内容',
  close: '关闭',
  copied: '已复制',
  copy: '复制',
  currentValue: '当前值',
  error: '故障',
  goToSlide: (slide, count) => `转至幻灯片 ${slide}，共 ${count} 张幻灯片`,
  hidePassword: '隐藏密码',
  loading: '正在加载',
  nextSlide: '下一张幻灯片',
  numOptionsSelected: num => {
    if (num === 0) return '未选择任何选项';
    if (num === 1) return '已选择 1 个选项';
    return `已选择 ${num} 个选项`;
  },
  previousSlide: '上一张幻灯片',
  progress: '进展',
  remove: '删除',
  resize: '修改尺寸',
  scrollToEnd: '滚动至底部',
  scrollToStart: '滚动至顶部',
  selectAColorFromTheScreen: '从屏幕中选择颜色',
  showPassword: '显示密码',
  slideNum: slide => `幻灯片 ${slide}`,
  toggleColorFormat: '切换色彩格式',

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
