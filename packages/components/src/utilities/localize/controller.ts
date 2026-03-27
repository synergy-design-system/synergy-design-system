import { LocalizeController as DefaultLocalizationController, registerTranslation } from './core.js';
import type { Translation } from './types.js';
import en from '../../translations/en.js'; // Register English as the default/fallback language

// Extend the controller and apply our own translation interface for better typings
export class LocalizeController extends DefaultLocalizationController<Translation> {
  // Technically '../translations/en.js' is supposed to work via side-effects. However, by some mystery sometimes the
  // translations don't get bundled as expected resulting in `no translation found` errors.
  // This is basically some extra assurance that our translations get registered prior to our localizer connecting in a component
  // and we don't rely on implicit import ordering.
  static {
    registerTranslation(en);
  }
}
