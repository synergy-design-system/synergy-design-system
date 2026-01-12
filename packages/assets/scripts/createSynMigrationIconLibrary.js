import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultIcons as i2018 } from '../dist/sick2018/js/index.js';
import { outlineIcons as i2025 } from '../dist/sick2025/js/outline.js';

/**
 * Static mapping between old icon names and new icon names when no direct can be found
 * @type {Record<string, string>}
 */
const STATIC_MAP = {
  access_alarm: 'alarm',
  access_alarms: 'alarm',
  access_time: 'schedule',
  access_time_filled: 'schedule',
  add_alarm: 'alarm_add',
  add_ic_call: 'add_call',
  addchart: 'add_chart',
  announcement: 'feedback',
  app_settings_alt: 'phonelink_setup',
  assessment: 'insert_chart',
  assistant_photo: 'flag',
  audiotrack: 'music_note',

  battery_std: 'battery_full',
  bluetooth_audio: 'bluetooth_searching',
  bookmark_border: 'bookmark',
  browser_not_supported: 'web_asset_off',
  business: 'domain',

  camera_alt: 'photo_camera',
  card_giftcard: 'redeem',
  catching_pokemon: 'sports_baseball',
  class: 'book',
  clear: 'close',
  closed_caption_off: 'closed_caption',
  collections: 'filter',
  color_lens: 'palette',
  control_point: 'add_circle',
  create: 'edit',
  crop_din: 'crop_square',
  crop_original: 'image',

  data_saver_off: 'data_usage',
  delivery_dining: 'moped',
  directions_boat_filled: 'directions_boat',
  directions_bus_filled: 'directions_bus',
  directions_car_filled: 'directions_car',
  directions_railway_filled: 'directions_railway',
  directions_subway_filled: 'directions_subway',
  directions_transit: 'directions_subway',
  directions_transit_filled: 'directions_subway',
  discount: 'sell',
  do_disturb: 'block',
  do_disturb_alt: 'block',
  do_disturb_off: 'block',
  do_disturb_on: 'do_not_disturb_on',
  do_not_disturb: 'do_not_disturb_off',
  do_not_disturb_alt: 'block',
  drive_eta: 'directions_car',

  email: 'mail',
  emoji_emotions: 'mood',

  favorite_border: 'favorite',
  fire_hydrant_alt: 'fire_hydrant',
  fitbit: 'blur_on',
  fmd_good: 'location_on',
  free_breakfast: 'local_cafe',

  games: 'gamepad',
  get_app: 'file_download',
  gpp_good: 'verified_user',
  gps_fixed: 'my_location',
  gps_not_fixed: 'location_searching',
  gps_off: 'location_disabled',

  headset: 'headphones',
  highlight_alt: 'ink_selection',
  highlight_off: 'cancel',
  https: 'lock',

  import_export: 'swap_vert',
  insert_chart_outlined: 'insert_chart',
  insert_comment: 'comment',
  insert_drive_file: 'note',
  insert_emoticon: 'mood',
  insert_invitation: 'event',
  insert_link: 'link',
  insert_photo: 'image',
  iso: 'exposure',

  laptop: 'laptop_mac',
  launch: 'open_in_new',
  local_airport: 'flight',
  local_grocery_store: 'shopping_cart',
  local_hotel: 'hotel',
  local_movies: 'theaters',
  local_offer: 'sell',
  local_phone: 'call',
  local_play: 'local_activity',
  local_printshop: 'print',
  loop: 'sync',

  maps_home_work: 'home_work',
  markunread: 'mail',
  message: 'chat',
  mic_none: 'mic',
  miscellaneous_services: 'manufacturing',
  mode: 'edit',
  mode_edit: 'edit',
  mode_edit_outline: 'edit',
  money_off_csred: 'money_off',
  motion_photos_pause: 'motion_photos_paused',
  movie_creation: 'movie',

  nightlight_round: 'nightlight',
  no_cell: 'mobile_off',
  no_encryption_gmailerrorred: 'no_encryption',
  not_interested: 'block',
  notifications_none: 'notifications',

  ondemand_video: 'live_tv',
  outlined_flag: 'flag',

  panorama_horizontal_select: 'panorama_horizontal',
  panorama_photosphere_select: 'panorama_photosphere',
  panorama_vertical_select: 'panorama_vertical',
  panorama_wide_angle_select: 'panorama_wide_angle',
  payment: 'credit_card',
  people: 'group',
  people_alt: 'group',
  people_outline: 'group',
  perm_identity: 'person',
  person_add_alt: 'person_add',
  person_add_alt_1: 'person_add',
  person_remove_alt_1: 'person_remove',
  personal_video: 'monitor',
  phone: 'call',
  phonelink: 'devices',
  photo_size_select_actual: 'panorama',
  pix: 'wallpaper',
  place: 'location_on',
  play_circle_filled: 'play_circle',
  plus_one: 'exposure_plus_1',
  poll: 'insert_chart',
  portrait: 'account_box',

  query_builder: 'schedule',
  question_answer: 'forum',
  queue: 'library_add',

  remove_circle: 'do_not_disturb_on',
  remove_circle_outline: 'do_not_disturb_on',
  remove_red_eye: 'visibility',
  replay_circle_filled: 'replay',
  report_gmailerrorred: 'report',
  report_problem: 'warning',
  restore: 'history',
  room: 'location_on',

  save_alt: 'file_download',
  sd_storage: 'sd_card',
  security_update: 'system_update',
  sentiment_satisfied_alt: 'sentiment_satisfied',
  settings_input_composite: 'settings_input_component',
  shop_2: 'shop_two',
  shortcut: 'turn_right',
  signal_cellular_no_sim: 'no_sim',
  signal_wifi_4_bar_lock: 'wifi_lock',
  signal_wifi_connected_no_internet_4: 'signal_wifi_bad',
  signal_wifi_statusbar_4_bar: 'signal_wifi_4_bar',
  signal_wifi_statusbar_connected_no_internet_4: 'signal_wifi_statusbar_not_connected', // No connected now has question mark instead of exclamation
  sim_card_alert: 'sd_card_alert',
  source: 'topic', // Same icon, different name
  star_border: 'grade',
  star_border_purple500: 'star_rate',
  star_purple500: 'star_rate',
  store_mall_directory: 'store',
  system_security_update: 'system_update',
  system_security_update_good: 'security_update_good',
  system_security_update_warning: 'security_update_warning',

  tag_faces: 'mood',
  terrain: 'landscape',
  textsms: 'sms',
  thumb_down_alt: 'thumb_down',
  thumb_down_off_alt: 'thumb_down_off',
  thumb_up_alt: 'thumb_up',
  thumb_up_off_alt: 'thumb_up_off',
  time_to_leave: 'directions_car',
  try: 'reviews',
  tungsten: 'wb_incandescent',
  turned_in: 'bookmark',
  turned_in_not: 'bookmark',

  warning_amber: 'warning',
  watch_later: 'schedule',
  wb_cloudy: 'cloud_queue',
  work_off: 'enterprise_off',
};

const STATUS = {
  MAPPED_BY_REVERSING: 'MAPPED_BY_REVERSING',
  MAPPED_DIRECTLY: 'MAPPED_DIRECTLY',
  MAPPED_STATICALLY: 'MAPPED_STATICALLY',
  MAPPED_WITHOUT_SUFFIX: 'MAPPED_WITHOUT_SUFFIX',
  NOT_FOUND_IN_OLD: 'NOT_FOUND_IN_OLD',
  UNKNOWN: 'UNKNOWN',
};

/**
 * @typedef {Object} IconMappingResult
 * @property {string} name The old icon name
 * @property {string} status The mapping status
 * @property {string | null} newName The new icon name, or null if not found
 */

const keys2018 = Object.keys(i2018);
const keys2025 = Object.keys(i2025);

/**
 * Map old icon names to new icon names
 * @param {string} oldName The old icon name
 * @returns {IconMappingResult} An object with the new icon name and status
 */
const mapIconName = oldName => {
  // If the icon name is not in 2018, return original name
  if (!keys2018.includes(oldName)) {
    return {
      name: oldName,
      newName: null,
      status: STATUS.NOT_FOUND_IN_OLD,
    };
  }

  // Direct match, just return the original
  if (keys2025.includes(oldName)) {
    return {
      name: oldName,
      newName: oldName,
      status: STATUS.MAPPED_DIRECTLY,
    };
  }

  // Try removing suffixes like _outline or _filled
  if (oldName.endsWith('_outline') || oldName.endsWith('_filled')) {
    const baseName = oldName.replace('_outline', '').replace('_filled', '');
    if (keys2025.includes(baseName)) {
      return {
        name: oldName,
        newName: baseName,
        status: STATUS.MAPPED_WITHOUT_SUFFIX,
      };
    }
  }

  // Check the static map
  if (typeof STATIC_MAP[oldName] !== 'undefined') {
    return {
      name: oldName,
      newName: STATIC_MAP[oldName],
      status: STATUS.MAPPED_STATICALLY,
    };
  }

  return {
    name: oldName,
    newName: null,
    status: STATUS.UNKNOWN,
  };
};

/**
 * Create the migration icon library file content as a string
 * @param {{ cases: string }}
 * @returns {string} The file content as a string
 */
const createTemplateAsString = ({
  cases,
}) => `
/* eslint-disable complexity */
/**
 * Icon library for migrating old icon names to new icon names.
 * This file is automatically generated via
 * \`@synergy-design-system/assets/scripts/createSynMigrationIconLibrary.js\`.
 */
import { getBasePath } from '../../utilities/base-path.js';
import { type IconLibrary, registerIconLibrary } from './library.js';
import defaultSystemLibrary from './library.system.js';
import { type AvailableSystemIcons, setSystemIconLibrary } from './library.system.js';

/**
 * The icon migration state:
 * - DISABLED: No migration is performed.
 * - ENABLED: Migration is performed and logs a warning when an icon is migrated.
 * - ENABLED_WITHOUT_LOGGING: Migration is performed without logging warnings.
 */
type IconMigrationState = 'DISABLED' | 'ENABLED' | 'ENABLED_WITHOUT_LOGGING';

/**
 * Get the migrated icon name for a given old icon name.
 * @param {string} iconName The old icon name
 * @param {boolean} enableLogging? Whether to enable logging for unmapped icons
 * @returns {string} The new icon name
 * @deprecated Consider moving to synergy 2025 icons directly. See https://synergy-design-system.github.io/?path=/docs/migration-to-sick-2025--docs for further details.
 */
export const migrateIconName = (
  iconName: string,
  enableLogging: boolean = false,
) => {
  let icon: string;

  switch (iconName) {
  ${cases}

  // Default case: We have a direct mapping
  default: icon = iconName;
  }

  if (enableLogging && icon !== iconName) {
    // eslint-disable-next-line no-console
    console.warn(\`[Icon Migration] Mapped icon name "\${iconName}" to "\${icon}"\`);
  }

  return icon;
};

/**
 * Get the migrated icon name for a given old icon name in its filled state.
 * @param {string} iconName The old icon name
 * @param {boolean} enableLogging? Whether to enable logging for unmapped icons
 * @returns {string} The new icon name
 * @deprecated Consider moving to synergy 2025 icons directly. See https://synergy-design-system.github.io/?path=/docs/migration-to-sick-2025--docs for further details.
 */
export const migrateIconNameFilled = (
  iconName: string,
  enableLogging: boolean = false,
) => {
  const baseIconName = migrateIconName(iconName, enableLogging);
  return \`\${baseIconName}_fill\`;
};

/**
 * Create an icon library for migrating old icon names to new icon names.
 * @param {IconMigrationState} withState The icon migration state
 * @returns {IconLibrary} The migration icon library
 * @deprecated Consider moving to synergy 2025 icons directly. See https://synergy-design-system.github.io/?path=/docs/migration-to-sick-2025--docs for further details.
 */
export const createMigrationLibrary = (withState: IconMigrationState = 'DISABLED'): IconLibrary => ({
  name: 'default',
  resolver: name => {
    const mappedName = migrateIconName(name, withState === 'ENABLED');
    return getBasePath(\`assets/icons/\${mappedName}.svg\`);
  },
});

/**
 * Default icon library for migrating old icon names to new icon names.
 * @deprecated Consider moving to synergy 2025 icons directly. See https://synergy-design-system.github.io/?path=/docs/migration-to-sick-2025--docs for further details.
 */
export const migrationLibrary = createMigrationLibrary('DISABLED');

/**
 * Setup the system icon library.
 * @param iconset The system icon set to use
 * @param enableLogging Enable logging of migrated icons?
 * @returns The icon library used
 */
export const setupIcons = (
  iconset: AvailableSystemIcons = 'sick2025',
  enableLogging: boolean = true,
): IconLibrary => {
  const iconlibraryToUse = iconset === 'sick2018'
    ? defaultSystemLibrary
    : createMigrationLibrary(enableLogging ? 'ENABLED' : 'ENABLED_WITHOUT_LOGGING');

  registerIconLibrary('default', iconlibraryToUse);
  setSystemIconLibrary(iconset);

  return iconlibraryToUse;
};
`;

try {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const outputPath = path.resolve(currentDir, '../../components/src/components/icon/library.migration.ts');

  const results = keys2018.map(mapIconName);
  const cases = results
    .filter(result => result.status !== STATUS.MAPPED_DIRECTLY)
    .map(result => `  case '${result.name}': icon = '${result.newName}'; break;`)
    .join('\n')
    .trim();

  // Write output as a js file
  const output = createTemplateAsString({
    cases,
  });

  writeFileSync(outputPath, output.trimStart());
  process.exit(0);
} catch (e) {
  console.error('Error writing migration icon library:', e);
  process.exit(1);
}
