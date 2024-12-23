import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

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
import { setGlobalDefaultSettings } from '@synergy-design-system/components';
import './app.css';
import { App } from './App';

setGlobalDefaultSettings({
  size: {
    SynButton: 'large',
    SynInput: 'large',
    SynRadioGroup: 'large',
    SynSelect: 'large',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
