import { MouseEventHandler } from 'react';
import { SynSwitch } from '@synergy-design-system/react';
import type {
  SynChangeEvent,
  SynSwitch as SynSwitchElement,
} from '@synergy-design-system/components';
import { capitalize } from './shared';

const switchTheme: MouseEventHandler<SynSwitchElement> = (e) => {
  const { body } = document;
  const elm = e.target as SynSwitchElement;
  elm?.addEventListener('syn-change', (e: SynChangeEvent) => {
    const { checked } = e.target as SynSwitchElement;
    const theme = checked ? 'dark' : 'light';
    body.classList.remove('syn-theme-light', 'syn-theme-dark');
    body.classList.add(`syn-theme-${theme}`);
    elm.innerHTML = elm.dataset[`theme${capitalize(theme)}`] ?? '';
  });
};

export const ThemeSwitch = () => (
  <SynSwitch
    data-theme-light="☀️"
    data-theme-dark="🌙"
    onClick={switchTheme}
  >
    🌙
  </SynSwitch>
);
