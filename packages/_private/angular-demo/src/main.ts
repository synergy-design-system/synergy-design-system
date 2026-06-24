import { enableSettingEmitEvents } from '@synergy-design-system/components';
import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app.module';

enableSettingEmitEvents();

platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.error(err));
