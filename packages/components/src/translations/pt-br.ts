/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pt-BR',
  $name: 'Português (Brasil)',
  $dir: 'ltr',

  clearEntry: 'Limpar entrada',
  close: 'Fechar',
  hidePassword: 'Ocultar senha',
  loading: 'Carregando',
  numOptionsSelected: num => {
    if (num === 0) return 'Nenhuma opção selecionada';
    if (num === 1) return '1 opção selecionada';
    return `${num} opções selecionadas`;
  },
  progress: 'Progresso',
  remove: 'Remover',
  scrollToEnd: 'Rolar até o final',
  scrollToStart: 'Rolar até o início',
  showPassword: 'Exibir senha',

  // Synergy custom translations start
  closeMenu: 'Fechar menu',
  danger: 'Perigo',
  fileButtonText: 'Selecionar arquivo',
  fileButtonTextMultiple: 'Selecionar arquivos',
  fileDragDrop: 'Arrastar ou selecionar arquivo',
  folderButtonText: 'Selecionar pasta',
  folderDragDrop: 'Arrastar ou selecionar pasta',
  menu: 'Menu',
  noResults: 'Nenhum resultado encontrado',
  notification: 'Notificação',
  numFilesSelected: (num, dir) => {
    if (num === 0) return dir ? 'Nenhuma pasta selecionada' : 'Nenhum arquivo selecionado';
    return `${num} ${dir ? 'pastas' : 'arquivos'} selecionados`;
  },
  openMenu: 'Abrir menu',
  paginationFirstPage: 'Primeira página',
  paginationInputLabel: 'Selecionar página',
  paginationItemsPerPage: 'Itens por página',
  paginationItemSummary: (start, end, total) => `${start}-${end} de ${total} itens`,
  paginationLastPage: 'Última página',
  paginationNextPage: 'Próxima página',
  paginationOfTotalPages: totalPages => `de ${totalPages} páginas`,
  paginationPreviousPage: 'Página anterior',
  rangeMax: 'Máximo',
  rangeMin: 'Mínimo',
  sideNav: 'Navegação da página',
  sideNavHide: 'Ocultar navegação',
  sideNavShow: 'Exibir navegação',
  success: 'Sucesso',
  warning: 'Aviso',
};

registerTranslation(translation);

export default translation;
