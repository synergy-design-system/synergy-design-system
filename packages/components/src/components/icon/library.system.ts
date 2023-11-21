/* eslint-disable */
import type { IconLibrary } from './library.js';

//
// System icons are a separate library to ensure they're always available, regardless of how the default icon library is
// configured or if its icons resolve properly.
//
// All Synergy components must use the system library instead of the default library. For visual consistency, system
// icons are a subset of Bootstrap Icons.
//
// **Start system icons**
const icons = {
	'caret': `
		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill='currentColor'><path d="M16.59 8.295L12 12.875L7.41 8.295L6 9.705L12 15.705L18 9.705L16.59 8.295Z"/></svg>`,
	'eye-slash': `
		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill='currentColor'><path d="M12.005 6.5C14.765 6.5 17.005 8.74 17.005 11.5C17.005 12.15 16.875 12.76 16.645 13.33L19.565 16.25C21.075 14.99 22.265 13.36 22.995 11.5C21.265 7.11 16.995 4 11.995 4C10.595 4 9.255 4.25 8.01501 4.7L10.175 6.86C10.745 6.63 11.355 6.5 12.005 6.5ZM2.005 3.77L4.745 6.51C3.085 7.8 1.785 9.52 1.005 11.5C2.735 15.89 7.005 19 12.005 19C13.555 19 15.035 18.7 16.385 18.16L16.805 18.58L19.735 21.5L21.005 20.23L3.275 2.5L2.005 3.77ZM7.53501 9.3L9.085 10.85C9.035 11.06 9.005 11.28 9.005 11.5C9.005 13.16 10.345 14.5 12.005 14.5C12.225 14.5 12.445 14.47 12.655 14.42L14.205 15.97C13.535 16.3 12.795 16.5 12.005 16.5C9.245 16.5 7.005 14.26 7.005 11.5C7.005 10.71 7.20501 9.97 7.53501 9.3ZM11.845 8.52L14.995 11.67L15.015 11.51C15.015 9.85 13.675 8.51 12.015 8.51L11.845 8.52Z"/></svg>`,
	'eye': `
		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill='currentColor'><path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"/></svg>`,
	'x-circle-fill': `
		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill='currentColor'><path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"/></svg>`
};
// **End system icons**

const systemLibrary: IconLibrary = {
  name: 'system',
  resolver: (name: keyof typeof icons) => {
    if (name in icons) {
      return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
    }
    return '';
  }
};

export default systemLibrary;
