import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Load webfonts
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/400-italic.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/600-italic.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/700-italic.css';

import '@synergy-design-system/tokens/themes/brand25-dark.css';
import '@synergy-design-system/tokens/themes/brand25-light.css';
import '@synergy-design-system/tokens/default-dark.css';
import '@synergy-design-system/tokens/default.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import { enableExperimentalSettingEmitEvents } from '@synergy-design-system/components';

import './app.css';
import { App } from './App';

enableExperimentalSettingEmitEvents(true);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
