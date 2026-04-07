/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  carousel: 'Carrousel',
  clearEntry: 'Supprimer les données saisies',
  close: 'Fermer',
  copied: 'Copié',
  copy: 'Copier',
  currentValue: 'Valeur actuelle',
  error: 'Erreur',
  goToSlide: (slide, count) => `Aller à la diapositive ${slide} de ${count}`,
  hidePassword: 'Masquer le mot de passe',
  loading: 'En cours de chargement',
  nextSlide: 'Diapositive suivante',
  numOptionsSelected: num => {
    if (num === 0) return 'Aucune option sélectionnée';
    if (num === 1) return '1 option sélectionnée';
    return `${num} options sélectionnées`;
  },
  previousSlide: 'Diapositive précédente',
  progress: 'Degré d’avancement',
  remove: 'Effacer',
  resize: 'Changer la taille',
  scrollToEnd: 'Faire défiler jusqu’à la fin',
  scrollToStart: 'Faire défiler jusqu’au début',
  selectAColorFromTheScreen: 'Sélectionner la couleur de l’écran',
  showPassword: 'Afficher le mot de passe',
  slideNum: slide => `Diapositive ${slide}`,
  toggleColorFormat: 'Commuter format de couleur',

  // Synergy custom translations start
  closeMenu: 'Quitter le menu',
  danger: 'Danger',
  fileButtonText: 'Sélectionner un fichier',
  fileButtonTextMultiple: 'Sélectionner des fichiers',
  fileDragDrop: 'Enregistrer ou sélectionner un fichier',
  folderButtonText: 'Sélectionner un dossier',
  folderDragDrop: 'Enregistrer ou sélectionner un dossier',
  menu: 'Menu',
  noResults: 'Aucun résultat trouvé',
  notification: 'Notification',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Aucun ${dir ? 'dossier' : 'fichier'} sélectionné`;
    return `${num} ${dir ? 'dossiers' : 'fichiers'} sélectionnés`;
  },
  openMenu: 'Ouvrir le menu',
  rangeMax: 'Maximum',
  rangeMin: 'Minimum',
  sideNav: 'Navigation à travers les pages',
  sideNavHide: 'Masquer la navigation',
  sideNavShow: 'Afficher la navigation',
  success: 'Succès',
  warning: 'Avertissement',
};

registerTranslation(translation);

export default translation;
