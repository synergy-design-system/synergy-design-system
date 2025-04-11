/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import {
  type SynChangeEvent,
  type SynIconButton,
  type SynSwitch,
  enableExperimentalSettingEmitEvents,
  registerIconLibrary,
} from '@synergy-design-system/components';
import { capitalize } from '@synergy-design-system/demo-utilities';

// Load webfonts
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/400-italic.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/600-italic.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/700-italic.css';

import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import './app.css';

import { createLayout } from './layout.js';
import { initRouting } from './routing.js';
import {
  type AvailableSizes,
  setGlobalSize,
} from './utils.js';

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

const initSizeSwitch = async () => {
  await customElements.whenDefined('syn-button-group');

  const buttons = document.querySelectorAll<SynIconButton>('.meta-navigation syn-button-group syn-icon-button');
  document
    .querySelector('.meta-navigation syn-button-group')!
    .addEventListener('click', e => {
      const target = e.target as HTMLElement;
      const clickedButton = target.closest('syn-icon-button') as SynIconButton;
      const size = clickedButton.dataset.size!;

      setGlobalSize(size as AvailableSizes);

      buttons.forEach(btn => {
        btn.color = btn.dataset.size === size ? 'primary' : 'currentColor';
      });
    });
};

const bootstrap = async () => {
  enableExperimentalSettingEmitEvents();

  registerIconLibrary('default', {
    resolver: name => `/synergy-icon-sprites.svg#${name}`,
    spriteSheet: true,
  });

  await customElements.whenDefined('syn-nav-item');

  // Finally load the page layout
  document.querySelector('#root')!.innerHTML = createLayout();

  await initRouting();
  await initThemeSwitch();
  await initSizeSwitch();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
