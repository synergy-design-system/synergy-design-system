import { enableSettingEmitEvents } from '@synergy-design-system/components';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

enableSettingEmitEvents();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
