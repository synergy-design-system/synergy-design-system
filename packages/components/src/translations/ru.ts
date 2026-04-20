/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  clearEntry: 'Очистить ввод',
  close: 'Закрыть',
  hidePassword: 'Скрыть пароль',
  loading: 'Загрузка',
  numOptionsSelected: num => {
    if (num === 0) return 'Ничего не выбрано';
    if (num === 1) return 'Выбрана 1 опция';
    if (num >= 2 && num <= 4) return `Выбрано ${num} опции`;
    return `Выбрано ${num} опций`;
  },
  progress: 'Прогресс',
  remove: 'Удалить',
  scrollToEnd: 'Прокрутить вниз',
  scrollToStart: 'Прокрутить вверх',
  showPassword: 'Показать пароль',

  // Synergy custom translations start
  closeMenu: 'Закрыть меню',
  danger: 'Опасность',
  fileButtonText: 'Выбрать файл',
  fileButtonTextMultiple: 'Выбрать файлы',
  fileDragDrop: 'Перетащить или выбрать файл',
  folderButtonText: 'Выбрать папку',
  folderDragDrop: 'Перетащить или выбрать папку',
  menu: 'Меню',
  noResults: 'Результаты не найдены',
  notification: 'Уведомление',
  numFilesSelected: (num, dir) => {
    if (num === 0) return dir ? 'Папки не выбраны' : 'Файлы не выбраны';
    if (num === 1) return dir ? 'Выбрана 1 папка' : 'Выбран 1 файл';
    if (num >= 2 && num <= 4) return dir ? `Выбраны ${num} папки` : `Выбраны ${num} файла`;
    return dir ? `Выбрано ${num} папок` : `Выбрано ${num} файлов`;
  },
  openMenu: 'Открыть меню',
  paginationFirstPage: 'Первая страница',
  paginationInputLabel: 'Перейти к выбранному номеру страницы',
  paginationItemsPerPage: 'Элементы на страницу',
  paginationItemSummary: (start, end, total) => `${start}-${end} из ${total} элементов`,
  paginationLastPage: 'Последняя страница',
  paginationNextPage: 'Следующая страница',
  paginationOfTotalPages: totalPages => `из ${totalPages} страниц`,
  paginationPreviousPage: 'Предыдущая страница',
  rangeMax: 'Максимум',
  rangeMin: 'Минимум',
  sideNav: 'Навигация по странице',
  sideNavHide: 'Скрыть навигацию',
  sideNavShow: 'Показать навигацию',
  success: 'Успешно',
  warning: 'Предупреждение',
};

registerTranslation(translation);

export default translation;
