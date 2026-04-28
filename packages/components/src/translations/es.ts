/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  clearEntry: 'Borrar entrada',
  close: 'Cerrar',
  hidePassword: 'Ocultar contraseña',
  loading: 'Cargando',
  numOptionsSelected: num => {
    if (num === 0) return 'Ninguna opción seleccionada';
    if (num === 1) return '1 opción seleccionada';
    return `${num} opciones seleccionadas`;
  },
  paginationFirstPage: 'Primera página',
  paginationInputLabel: 'Seleccionar página',
  paginationItemsPerPage: 'Elementos por página',
  paginationItemSummary: (start, end, total) => `${start}-${end} de ${total} elementos`,
  paginationLastPage: 'Última página',
  paginationNextPage: 'Página siguiente',
  paginationOfTotalPages: totalPages => `de ${totalPages}`,
  paginationPreviousPage: 'Página anterior',
  progress: 'Progreso',
  remove: 'Borrar',
  scrollToEnd: 'Desplazar hasta el final',
  scrollToStart: 'Desplazar hasta el inicio',
  showPassword: 'Mostrar contraseña',

  // Synergy custom translations start
  closeMenu: 'Cerrar menú',
  danger: 'Peligro',
  fileButtonText: 'Seleccionar archivo',
  fileButtonTextMultiple: 'Seleccionar archivos',
  fileDragDrop: 'Arrastrar o seleccionar archivo',
  folderButtonText: 'Seleccionar carpeta',
  folderDragDrop: 'Arrastrar o seleccionar carpeta',
  menu: 'Menú',
  noResults: 'No se han encontrado resultados',
  notification: 'Notificación',
  numFilesSelected: (num, dir) => {
    if (num === 0) return dir ? 'Ninguna carpeta seleccionada' : 'Ningún archivo seleccionado';
    return `${num} ${dir ? 'carpetas' : 'archivos'} seleccionados`;
  },
  openMenu: 'Abrir menú',
  rangeMax: 'Máximo',
  rangeMin: 'Mínimo',
  sideNav: 'Navegación de páginas',
  sideNavHide: 'Ocultar navegación',
  sideNavShow: 'Mostrar navegación',
  success: 'Éxito',
  warning: 'Advertencia',
};

registerTranslation(translation);

export default translation;
