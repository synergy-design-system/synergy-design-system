/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  clearEntry: 'Удалить введенные данные',
  close: 'Закрыть',
  hidePassword: 'Скрыть пароль',
  loading: 'Выполняется загрузка',
  numOptionsSelected: num => {
    if (num === 0) return 'Опции не выбраны';
    if (num === 1) return 'Выбрана 1 опция';
    return `Выбрано ${num} опций`;
  },
  progress: 'Прогресс',
  remove: 'Очистить',
  scrollToEnd: 'Пролистать в конец',
  scrollToStart: 'Пролистать в начало',
  showPassword: 'Показать пароль',

  // Synergy custom translations start
  closeMenu: 'Закрыть меню',
  danger: 'Опасность',
  fileButtonText: 'Выбрать файл',
  fileButtonTextMultiple: 'Выбрать файлы',
  fileDragDrop: 'Сохранить или выбрать файл',
  folderButtonText: 'Выбрать папку',
  folderDragDrop: 'Сохранить или выбрать папку',
  menu: 'Меню',
  noResults: 'Результаты не найдены',
  notification: 'Уведомление',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `${dir ? 'Папки' : 'Файлы'} не выбраны`;
    return `${num} ${dir ? 'папок' : 'файлов'} выбрано`;
  },
  openMenu: 'Открыть меню',
  rangeMax: 'Максимум',
  rangeMin: 'Минимум',
  sideNav: 'Навигация по страницам',
  sideNavHide: 'Скрыть навигацию',
  sideNavShow: 'Показать навигацию',
  success: 'Успех',
  warning: 'Предупреждение',
};

registerTranslation(translation);

export default translation;
