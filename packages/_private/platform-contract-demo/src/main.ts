import {
  enableSettingEmitEvents,
} from '@synergy-design-system/components';

// Load fonts
import '@synergy-design-system/fonts';
import '@synergy-design-system/demo-utilities/styles/font.css';

import '@synergy-design-system/tokens/themes/sick2025_light.css';
import '@synergy-design-system/tokens/charts/themes/sick2025_light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import '@synergy-design-system/demo-utilities/styles/app.css';
import './platform-contract-demo.css';

import { createLayout } from './layout.js';
import { initRouting } from './routing.js';

const bootstrap = async () => {
  enableSettingEmitEvents();

  await customElements.whenDefined('syn-nav-item');

  // Finally load the page layout
  document.querySelector('#root')!.innerHTML = createLayout();

  await initRouting();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
