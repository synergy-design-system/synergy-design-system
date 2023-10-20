import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@synergy-design-system/tokens/dist/css/light.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
