import type { SynButton as SynButtonElement } from '@synergy-design-system/components';
import { SynButton } from '@synergy-design-system/react';
import { MouseEventHandler } from 'react';

const switchTheme: MouseEventHandler<SynButtonElement> = (e) => {
  const { body } = document;
  const btn = (e.target as SynButtonElement);
  const currentTheme = body.classList.contains('syn-theme-dark') ? 'dark' : 'light';

  if (currentTheme === 'light') {
    // Light theme
    body.classList.remove('syn-theme-light');
    body.classList.add('syn-theme-dark');
    btn.innerText = 'Switch to light theme';
  } else {
    // Dark theme
    body.classList.remove('syn-theme-dark');
    body.classList.add('syn-theme-light');
    btn.innerText = 'Switch to dark theme';
  }
};

export const ThemeSwitch = () => (
  <header>
    <SynButton onClick={switchTheme}>
      Switch Theme
    </SynButton>
  </header>
);
