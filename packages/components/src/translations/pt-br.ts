/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pt-BR',
  $name: 'Português (Brazil)',
  $dir: 'ltr',

  clearEntry: 'Excluir entrada',
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
  scrollToEnd: 'Deslizar até o final',
  scrollToStart: 'Deslizar até o início',
  showPassword: 'Exibir senha',

  // Synergy custom translations start
  closeMenu: 'Fechar menu',
  danger: 'Perigo',
  fileButtonText: 'Selecionar aquivo',
  fileButtonTextMultiple: 'Selecionar aquivos',
  fileDragDrop: 'Salvar ou selecionar arquivo',
  folderButtonText: 'Selecionar pasta',
  folderDragDrop: 'Arquivar ou selecionar pasta',
  menu: 'Menu',
  noResults: 'Nenhum resultado encontrado',
  notification: 'Notificação',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Nenhum(a) ${dir ? 'pasta' : 'arquivo'} selecionado(a)`;
    return `${num} ${dir ? 'pastas' : 'arquivos'} selecionado(a)`;
  },
  openMenu: 'Abrir menu',
  rangeMax: 'Máximo',
  rangeMin: 'Mínimo',
  sideNav: 'Navegação na página',
  sideNavHide: 'Ocultar navegação',
  sideNavShow: 'Exibir navegação',
  success: 'Sucesso',
  warning: 'Aviso',
};

registerTranslation(translation);

export default translation;
