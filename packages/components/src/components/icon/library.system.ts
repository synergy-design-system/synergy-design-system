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
  "add": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z\"/></svg>",
  "caret": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M16.59 8.295 12 12.875l-4.59-4.58L6 9.705l6 6 6-6z\"/></svg>",
  "check": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"m8.795 15.875-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z\"/></svg>",
  "chevron-down": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M16.59 8.295 12 12.875l-4.59-4.58L6 9.705l6 6 6-6z\"/></svg>",
  "chevron-right": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"m9.705 6-1.41 1.41 4.58 4.59-4.58 4.59L9.705 18l6-6z\"/></svg>",
  "error": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z\"/></svg>",
  "eye": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3\"/></svg>",
  "eye-slash": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M12.005 6.5c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16c.57-.23 1.18-.36 1.83-.36m-10-2.73 2.74 2.74a11.8 11.8 0 0 0-3.74 4.99c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42 2.93 2.92 1.27-1.27L3.275 2.5zm5.53 5.53 1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z\"/></svg>",
  "indeterminate": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M19 13H5v-2h14z\"/></svg>",
  "logo-color": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"295\" height=\"94\" viewBox=\"0 0 295 94\" fill='currentColor'><g clip-path=\"url(#a)\"><path fill-rule=\"evenodd\" d=\"M207.961 69.06c-7.829 14.83-23.348 24.923-41.157 24.923-25.708 0-46.547-21.04-46.547-46.991C120.257 21.04 141.096 0 166.804 0c17.635 0 32.971 9.893 40.87 24.489l-19.072 10.293c-4.267-7.864-12.514-13.106-21.798-13.106-13.542 0-24.872 11.138-24.872 25.316s11.33 25.315 24.872 25.315c9.475 0 17.922-5.451 22.103-13.594zM111.078 1.662H89.777v90.204h21.301zM26.082 91.867c-12.13 0-25.49-6.549-25.49-21.754 0 0 46.582 0 54.002.008 7.899-1.576 7.02-11.538 0-12.914h-27.72c-14.752 0-26.43-12.593-26.43-27.598 0-14.43 10.79-27.937 26.43-27.937h30.411c12.54 0 21.493 9.388 21.493 21.293H26.875c-6.976.992-7.42 11.695 0 12.906h27.64c15.162.409 27.258 12.48 27.258 27.763 0 14.081-11.948 28.233-27.188 28.233zm189.908 0V1.663h21.545V37.84h8.291l22.398-36.176h26.492L264.192 47.34l30.08 44.527h-26.501l-22.668-34.948h-7.568v34.948z\" clip-rule=\"evenodd\"/></g><defs><clipPath id=\"a\"><path d=\"M0 0h295v94H0z\"/></clipPath></defs></svg>",
  "menu": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z\"/></svg>",
  "more": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2\"/></svg>",
  "more-vert": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2\"/></svg>",
  "radio": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0\"/></svg>",
  "sticky_sidebar": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.587-1.412A1.93 1.93 0 0 1 5 3h14q.824 0 1.413.587Q21 4.176 21 5v14q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21zm5-2h9V5h-9z\"/></svg>",
  "upload-file": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z\"/></svg>",
  "x-circle-fill": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z\"/></svg>",
  "x-lg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill='currentColor'><path d=\"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/></svg>"
};
// **End system icons**

const systemLibrary: IconLibrary = {
  name: 'system',
  resolver: (name: keyof typeof icons) => {
    if (name in icons) {
      return icons[name];
    }
    return '';
  }
};

export default systemLibrary;
