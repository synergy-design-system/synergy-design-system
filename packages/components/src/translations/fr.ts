/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  clearEntry: 'Effacer la saisie',
  close: 'Fermer',
  hidePassword: 'Masquer le mot de passe',
  loading: 'Chargement',
  numOptionsSelected: num => {
    if (num === 0) return 'Aucune option sélectionnée';
    if (num === 1) return '1 option sélectionnée';
    return `${num} options sélectionnées`;
  },
  progress: 'Progression',
  remove: 'Supprimer',
  scrollToEnd: 'Faire défiler jusqu’à la fin',
  scrollToStart: 'Faire défiler jusqu’au début',
  showPassword: 'Afficher le mot de passe',

  // Synergy custom translations start
  closeMenu: 'Fermer le menu',
  danger: 'Danger',
  fileButtonText: 'Sélectionner un fichier',
  fileButtonTextMultiple: 'Sélectionner des fichiers',
  fileDragDrop: 'Glisser ou sélectionner un fichier',
  folderButtonText: 'Sélectionner un dossier',
  folderDragDrop: 'Glisser ou sélectionner un dossier',
  menu: 'Menu',
  noResults: 'Aucun résultat trouvé',
  notification: 'Notification',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Aucun ${dir ? 'dossier' : 'fichier'} sélectionné`;
    return `${num} ${dir ? 'dossiers' : 'fichiers'} sélectionnés`;
  },
  openMenu: 'Ouvrir le menu',
  rangeMax: 'Maximal',
  rangeMin: 'Minimal',
  sideNav: 'Navigation des pages',
  sideNavHide: 'Masquer la navigation',
  sideNavShow: 'Afficher la navigation',
  success: 'Succès',
  warning: 'Avertissement',
};

registerTranslation(translation);

export default translation;
