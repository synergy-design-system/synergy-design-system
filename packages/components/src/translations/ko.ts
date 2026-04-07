/* eslint-disable sort-keys */
import { registerTranslation } from '../utilities/localize.js';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ko',
  $name: '한국어',
  $dir: 'ltr',

  clearEntry: '입력 삭제',
  close: '닫기',
  hidePassword: '비밀번호 숨기기',
  loading: '로딩 중',
  numOptionsSelected: num => {
    if (num === 0) return '옵션이 선택되지 않음';
    if (num === 1) return '1개의 옵션이 선택';
    return `${num} 옵션 선택`;
  },
  progress: '진행',
  remove: '제거',
  scrollToEnd: '맨 아래로 스크롤',
  scrollToStart: '맨 위로 스크롤',
  showPassword: '비밀번호 표시',

  // Synergy custom translations start
  closeMenu: '메뉴 닫기',
  danger: '위험',
  fileButtonText: '파일 선택',
  fileButtonTextMultiple: '파일 선택',
  fileDragDrop: '파일을 끌어다 놓거나 선택',
  folderButtonText: '폴더 선택',
  folderDragDrop: '폴더를 끌어다 놓거나 선택',
  menu: '메뉴',
  noResults: '검색 결과 없음',
  notification: '알림',
  numFilesSelected: (num, dir) => {
    if (num === 0) return `${dir ? '폴더' : '파일'} 선택되지 않음`;
    return `${num} ${dir ? '폴더' : '파일'} 선택됨`;
  },
  openMenu: '메뉴 열기',
  rangeMax: '최대',
  rangeMin: '최소',
  sideNav: '페이지 탐색',
  sideNavHide: '탐색 숨기기',
  sideNavShow: '탐색 표시',
  success: '성공',
  warning: '경고',
};

registerTranslation(translation);

export default translation;
