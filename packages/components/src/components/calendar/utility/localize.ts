import { LocalizeController } from '../../../utilities/localize.js';
import { resolveCalendarLocale } from './date.js';

/** Uses Synergy translations with a safe, region-preserving date locale. */
export class CalendarLocalizeController extends LocalizeController {
  lang() {
    return resolveCalendarLocale(super.lang());
  }
}
