/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pt-BR',
  $name: 'Português (Brazil)',
  $dir: 'ltr',

  carousel: 'Carrossel',
  clearEntry: 'Excluir entrada',
  close: 'Fechar',
  copied: 'Copiado',
  copy: 'Copiar',
  currentValue: 'Valor atual',
  error: 'Erro',
  goToSlide: (slide, count) => `Ir para o slide ${slide} de ${count}`,
  hidePassword: 'Ocultar senha',
  loading: 'Carregando',
  nextSlide: 'Próximo slide',
  numOptionsSelected: num => {
    if (num === 0) return 'Nenhuma opção selecionada';
    if (num === 1) return '1 opção selecionada';
    return `${num} opções selecionadas`;
  },
  previousSlide: 'Slide anterior',
  progress: 'Progresso',
  remove: 'Remover',
  resize: 'Alterar tamanho',
  scrollToEnd: 'Deslizar até o final',
  scrollToStart: 'Deslizar até o início',
  selectAColorFromTheScreen: 'Selecione a cor da tela',
  showPassword: 'Exibir senha',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Alterar o formato de cor',

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
