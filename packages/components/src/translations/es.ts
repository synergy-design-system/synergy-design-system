/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  carousel: 'Puerta giratoria',
  clearEntry: 'Borrar entrada',
  close: 'Cerrar',
  copied: 'Copiado',
  copy: 'Copiar',
  currentValue: 'Valor actual',
  error: 'Error',
  goToSlide: (slide, count) => `Ir a la lámina ${slide} de ${count}`,
  hidePassword: 'Ocultar contraseña',
  loading: 'Cargando',
  nextSlide: 'Siguiente lámina',
  numOptionsSelected: num => {
    if (num === 0) return 'Ninguna opción seleccionada';
    if (num === 1) return '1 opción seleccionada';
    return `${num} opciones seleccionadas`;
  },
  previousSlide: 'Lámina anterior',
  progress: 'Progreso',
  remove: 'Borrar',
  resize: 'Cambiar tamaño',
  scrollToEnd: 'Desplazar hasta el final',
  scrollToStart: 'Desplazar hasta el principio',
  selectAColorFromTheScreen: 'Seleccionar el color de la pantalla',
  showPassword: 'Mostrar contraseña',
  slideNum: slide => `Lámina ${slide}`,
  toggleColorFormat: 'Cambiar formato de color',

  // Synergy custom translations start
  closeMenu: 'Cerrar menú',
  danger: 'Peligro',
  fileButtonText: 'Seleccionar archivo',
  fileButtonTextMultiple: 'Seleccionar archivos',
  fileDragDrop: 'Guardar o seleccionar archivo',
  folderButtonText: 'Seleccionar carpeta',
  folderDragDrop: 'Guardar o seleccionar carpeta',
  menu: 'Menú',
  noResults: 'No se han encontrado resultados',
  notification: 'Notificación',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Ningún/ninguna ${dir ? 'carpeta' : 'archivo'} seleccionado/a`;
    return `${num} ${dir ? 'carpetas' : 'archivos'} seleccionados`;
  },
  openMenu: 'Abrir menú',
  rangeMax: 'Máximo',
  rangeMin: 'Mínimo',
  sideNav: 'Navegación por páginas',
  sideNavHide: 'Ocular navegación',
  sideNavShow: 'Mostrar navegación',
  success: 'Éxito',
  warning: 'Advertencia',
};

registerTranslation(translation);

export default translation;
