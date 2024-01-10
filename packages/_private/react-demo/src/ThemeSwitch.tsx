import type { SynButton as SynButtonElement } from '@synergy-design-system/components';
import { SynButton } from '@synergy-design-system/react';
import { MouseEventHandler } from 'react';

const switchTheme: MouseEventHandler<SynButtonElement> = (e) => {
  const bdy = document.body;
  const btn = (e.target as SynButtonElement);
  const currentTheme = bdy.classList.contains('syn-theme-dark') ? 'dark' : 'light';

  if (currentTheme === 'light') {
    // Light theme
    bdy.classList.remove('syn-theme-light');
    bdy.classList.add('syn-theme-dark');
    btn.innerText = 'Switch to light theme';
  } else {
    // Dark theme
    bdy.classList.remove('syn-theme-dark');
    bdy.classList.add('syn-theme-light');
    btn.innerText = 'Switch to dark theme';
  }

  // Will toggle between light to dark
  // with each call to switchTheme
  // eslint-disable-next-line no-console
  console.log(bdy.className);
};

export const ThemeSwitch = () => (
  <header>
    <SynButton onClick={switchTheme}>
      Switch Theme
    </SynButton>
  </header>
);
