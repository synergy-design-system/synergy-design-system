/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'tr',
  $name: 'Türkçe',
  $dir: 'ltr',

  clearEntry: 'Girişi temizle',
  close: 'Kapat',
  hidePassword: 'Şifreyi gizle',
  loading: 'Yükleniyor',
  numOptionsSelected: num => {
    if (num === 0) return 'Hiçbir seçenek seçilmedi';
    if (num === 1) return '1 seçenek seçildi';
    return `${num} seçenek seçildi`;
  },
  progress: 'İlerleme',
  remove: 'Kaldır',
  scrollToEnd: 'Sona kaydır',
  scrollToStart: 'Başa kaydır',
  showPassword: 'Şifreyi göster',

  // Synergy custom translations start
  closeMenu: 'Menüyü kapat',
  danger: 'Tehlike',
  fileButtonText: 'Dosya seç',
  fileButtonTextMultiple: 'Dosyaları seç',
  fileDragDrop: 'Dosyayı sürükle veya seç',
  folderButtonText: 'Klasör seç',
  folderDragDrop: 'Klasörü sürükle veya seç',
  menu: 'Menü',
  noResults: 'Sonuç bulunamadı',
  notification: 'Bildirim',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Hiçbir ${dir ? 'klasör' : 'dosya'} seçilmedi`;
    return `${num} ${dir ? 'klasör' : 'dosya'} seçildi`;
  },
  openMenu: 'Menüyü aç',
  rangeMax: 'Maksimum',
  rangeMin: 'Minimum',
  sideNav: 'Sayfa gezintisi',
  sideNavHide: 'Gezintiyi gizle',
  sideNavShow: 'Gezintiyi göster',
  success: 'Başarılı',
  warning: 'Uyarı',
};

registerTranslation(translation);

export default translation;
