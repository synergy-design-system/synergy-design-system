import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import './app.css';
import { App } from './App';
import { ThemeSwitch } from './ThemeSwitch';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <header>
      <h1>@synergy-design-system/react Form Demo</h1>
      <ThemeSwitch />
    </header>
    <main>
      <App />
    </main>
  </StrictMode>,
);
