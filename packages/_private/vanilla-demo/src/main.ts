/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import {
  type SynChangeEvent,
  type SynSwitch,
} from '@synergy-design-system/components';
import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import './app.css';
import { initRouting } from './routing.js';
import { capitalize } from './utils.js';

const initThemeSwitch = async () => {
  await customElements.whenDefined('syn-switch');

  const { body } = document;
  const elm = document.querySelector<SynSwitch>('#theme-switch');
  elm?.addEventListener('syn-change', (e: SynChangeEvent) => {
    const { checked } = e.target as SynSwitch;
    const theme = checked ? 'dark' : 'light';
    body.classList.remove('syn-theme-light', 'syn-theme-dark');
    body.classList.add(`syn-theme-${theme}`);
    elm.innerHTML = elm.dataset[`theme${capitalize(theme)}`] ?? '';
  });
};

const bootstrap = async () => {
  await customElements.whenDefined('syn-nav-item');
  await initRouting();
  await initThemeSwitch();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
