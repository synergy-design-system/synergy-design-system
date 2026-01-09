import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Load fonts
import '@synergy-design-system/fonts';

import '@synergy-design-system/tokens/themes/sick2025_dark.css';
import '@synergy-design-system/tokens/themes/sick2025_light.css';
import '@synergy-design-system/tokens/themes/sick2018_dark.css';
import '@synergy-design-system/tokens/themes/sick2018_light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import { enableSettingEmitEvents } from '@synergy-design-system/components';

import './app.css';
import { App } from './App.js';

enableSettingEmitEvents(true);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
