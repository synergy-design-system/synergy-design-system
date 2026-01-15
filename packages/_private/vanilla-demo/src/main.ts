import {
  type SynChangeEvent,
  type SynIconButton,
  type SynSelect,
  type SynSideNav,
  enableSettingEmitEvents,
  registerIconLibrary,
} from '@synergy-design-system/components';
import {
  getAvailableThemes,
  setThemeFromOptionString,
} from '@synergy-design-system/demo-utilities';

// Load fonts
import '@synergy-design-system/fonts';

import '@synergy-design-system/tokens/themes/sick2025_dark.css';
import '@synergy-design-system/tokens/themes/sick2025_light.css';
import '@synergy-design-system/tokens/themes/sick2018_dark.css';
import '@synergy-design-system/tokens/themes/sick2018_light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import './app.css';
import {
  type AllowedSizes,
  setGlobalSize,
} from '@synergy-design-system/demo-utilities';

import { createLayout } from './layout.js';
import { initRouting } from './routing.js';

const initLayoutSwitch = async () => {
  await customElements.whenDefined('syn-button-group');

  const buttons = document.querySelectorAll<SynIconButton>('.meta-navigation syn-button-group syn-icon-button');
  document
    .querySelector('.meta-navigation syn-button-group.sidenav-switch')!
    .addEventListener('click', e => {
      const target = e.target as HTMLElement;
      const clickedButton = target.closest('syn-icon-button') as SynIconButton;
      const type = clickedButton.dataset.type!;

      const sidenav = document.querySelector<SynSideNav>('syn-side-nav');
      if (sidenav) {
        sidenav.variant = type as SynSideNav['variant'];
      }

      buttons.forEach(btn => {
        // eslint-disable-next-line no-param-reassign
        btn.color = btn.dataset.type === type ? 'primary' : 'currentColor';
      });
    });
};

const initThemeSwitch = async () => {
  await customElements.whenDefined('syn-select');

  const select = document.querySelector<SynSelect>('#theme-switch');

  if (!select) {
    return;
  }

  // Create theme contents in the DOM
  Object.values(getAvailableThemes()).forEach(theme => {
    const optgroup = document.createElement('syn-optgroup');
    optgroup.label = theme.title;

    theme.modes.forEach(mode => {
      const option = document.createElement('syn-option');
      option.value = `${theme.name}-${mode}`;
      option.innerText = `${theme.title} - ${mode}`;

      const icon = document.createElement('syn-icon');
      icon.name = mode.includes('light') ? 'light_mode' : 'dark_mode';
      icon.slot = 'prefix';
      icon.style.color = 'var(--syn-color-warning-500)';
      option.appendChild(icon);

      optgroup.appendChild(option);
    });

    select.appendChild(optgroup);
  });

  // Switch themes
  select.addEventListener('syn-change', (e: SynChangeEvent) => {
    const value = (e.target as SynSelect).value as string;
    setThemeFromOptionString(value);
  });
};

const initSizeSwitch = async () => {
  await customElements.whenDefined('syn-button-group');

  const buttons = document.querySelectorAll<SynIconButton>('.meta-navigation syn-button-group syn-icon-button');
  document
    .querySelector('.meta-navigation syn-button-group.size-switch')!
    .addEventListener('click', e => {
      const target = e.target as HTMLElement;
      const clickedButton = target.closest('syn-icon-button') as SynIconButton;
      const size = clickedButton.dataset.size!;

      setGlobalSize(size as AllowedSizes);

      buttons.forEach(btn => {
        // eslint-disable-next-line no-param-reassign
        btn.color = btn.dataset.size === size ? 'primary' : 'currentColor';
      });
    });
};

const bootstrap = async () => {
  enableSettingEmitEvents();

  registerIconLibrary('default', {
    resolver: name => `/synergy-icon-sprites-2025.svg#${name}`,
    spriteSheet: true,
  });

  await customElements.whenDefined('syn-nav-item');

  // Finally load the page layout
  document.querySelector('#root')!.innerHTML = createLayout();

  await initRouting();
  await initLayoutSwitch();
  await initThemeSwitch();
  await initSizeSwitch();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
