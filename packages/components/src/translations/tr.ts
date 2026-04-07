/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'tr',
  $name: 'Türkçe',
  $dir: 'ltr',

  carousel: 'Döner kapı',
  clearEntry: 'Girişi sil',
  close: 'Kapat',
  copied: 'Kopyalandı',
  copy: 'Kopyala',
  currentValue: 'Güncel değer',
  error: 'Hata',
  goToSlide: (slide, count) => `${slide} / ${count}. folyoya git`,
  hidePassword: 'Şifreyi gizle',
  loading: 'Yükleniyor',
  nextSlide: 'Sonraki folyo',
  numOptionsSelected: num => {
    if (num === 0) return 'Hiçbir opsiyon seçilmedi';
    if (num === 1) return '1 opsiyon seçildi';
    return `${num} opsiyon seçildi`;
  },
  previousSlide: 'Önceki folyo',
  progress: 'İlerleme',
  remove: 'Kaldır',
  resize: 'Boyutu değiştir',
  scrollToEnd: 'Sona kaydır',
  scrollToStart: 'Başlangıca kaydır',
  selectAColorFromTheScreen: 'Ekranın rengini seç',
  showPassword: 'Şifreyi göster',
  slideNum: slide => `Folyo ${slide}`,
  toggleColorFormat: 'Renk formatını değiştir',

  // Synergy custom translations start
  closeMenu: 'Menüyü kapat',
  danger: 'Tehlike',
  fileButtonText: 'Dosya seç',
  fileButtonTextMultiple: 'Dosyalar seç',
  fileDragDrop: 'Dosyayı oluştur veya seç',
  folderButtonText: 'Klasör seç',
  folderDragDrop: 'Klasörü oluştur veya seç',
  menu: 'Menü',
  noResults: 'Hiçbir sonuç bulunamadı',
  notification: 'Bildirim',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `Hiçbir ${dir ? 'klasör' : 'dosya'} seçilmedi`;
    return `${num} ${dir ? 'klasör' : 'dosya'}`;
  },
  openMenu: 'Menüyü aç',
  rangeMax: 'Maksimum',
  rangeMin: 'Minimum',
  sideNav: 'Sayfada gezinme',
  sideNavHide: 'Gezinme menüsünü gizle',
  sideNavShow: 'Gezinme menüsünü göster',
  success: 'Başarılı',
  warning: 'Uyarı',
};

registerTranslation(translation);

export default translation;
