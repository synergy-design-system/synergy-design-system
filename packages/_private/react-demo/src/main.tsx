import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import './layout.css';
import { App } from './App';
import { ThemeSwitch } from './ThemeSwitch';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeSwitch />
    <App />
  </StrictMode>,
);
