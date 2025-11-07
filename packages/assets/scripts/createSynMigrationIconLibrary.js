/* eslint-disable complexity */
import { defaultIcons as i2015 } from '../dist/default-icons.js';
import { outlineIcons as i2025 } from '../dist/sick2025-outline-icons.js';

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
  announcement: 'sms_failed', // todo: Find something better! SMS has hardly anything to do with this!
  app_settings_alt: 'phonelink_setup',
  assessment: 'analytics',
  assistant_photo: 'flag',
  audiotrack: 'music_note',

  battery_std: 'battery_full',
  bluetooth_audio: 'bluetooth',
  bookmark_border: 'bookmark',
  browser_not_supported: 'web_asset_off',
  business: 'apartment',

  camera_alt: 'camera', // todo: Find something better! Camera is heavily stylized
  card_giftcard: 'featured_seasonal_and_gifts',
  catching_pokemon: 'MISSING',
  class: 'MISSING', // @todo: No idea what this was, thanks for the class keyword JS
  clear: 'close',
  closed_caption_off: 'closed_caption',
  collections: 'collections_bookmark',
  color_lens: 'palette',
  control_point: 'add_circle',
  create: 'edit', // @todo: Edit is still a pen, but create is a plus sign?
  crop_din: 'crop_square',
  crop_original: 'wallpaper', // Originally, this is just the picture icon

  data_saver_off: 'MISSING', // add icon still there, but off not?
  delivery_dining: 'moped',
  directions_boat_filled: 'directions_boat',
  directions_bus_filled: 'directions_bus',
  directions_car_filled: 'directions_car',
  directions_railway_filled: 'directions_railway',
  directions_subway_filled: 'directions_subway',
  directions_transit: 'directions_subway',
  directions_transit_filled: 'directions_subway',
  discount: 'MISSING',
  do_disturb: 'do_not_disturb_off',
  do_disturb_alt: 'do_not_disturb_on',
  do_disturb_off: 'do_not_disturb_on',
  do_disturb_on: 'do_not_disturb_on',
  do_not_disturb: 'do_not_disturb_off',
  do_not_disturb_alt: 'do_not_disturb_off',
  do_not_disturb_off: 'do_not_disturb_on',
  do_not_disturb_on: 'do_not_disturb_on',
  drive_eta: 'directions_car',

  email: 'mail',
  emoji_emotions: 'sentiment_satisfied',

  favorite_border: 'favorite',
  fire_hydrant_alt: 'fire_hydrant',
  fitbit: 'MISSING', // @todo: maybe cardio_load?
  fmd_good: 'location_on',
  free_breakfast: 'local_cafe',

  games: 'gamepad',
  get_app: 'file_download', // @todo: Decide: There is also install_mobile or apk_install
  gpp_good: 'beenhere', // @todo: Same icon, but I don´t know what gpp_good means...
  gps_fixed: 'my_location', // @todo: Probably naming problem only, icons look the same
  gps_not_fixed: 'location_searching', // @todo: Probably naming problem only, icons look the same
  gps_off: 'location_disabled', // @todo: Probably naming problem only, icons look the same

  headset: 'headphones',
  highlight_alt: 'ink_selection',
  highlight_off: 'cancel',
  https: 'lock', // @todo: Was a lock icon, not available anymore

  import_export: 'height', // @todo: This does not match! But at least its two arrows
  insert_chart_outlined: 'add_chart',
  insert_comment: 'comment',
  insert_drive_file: 'note',
  insert_emoticon: 'sentiment_satisfied',
  insert_invitation: 'event',
  insert_link: 'link',
  insert_photo: 'wallpaper',
  iso: 'MISSING',

  laptop: 'laptop_mac',
  launch: 'open_in_new',
  local_airport: 'flight',
  local_grocery_store: 'shopping_cart',
  local_hotel: 'hotel',
  local_movies: 'theaters',
  local_offer: 'loyalty',
  local_phone: 'call',
  local_play: 'local_activity',
  local_printshop: 'print',
  loop: 'repeat', // @todo: Not quite the same, but ymmv

  maps_home_work: 'home_work',
  markunread: 'markunread_mailbox',
  message: 'chat',
  mic_none: 'mic_off',
  miscellaneous_services: 'settings', // @todo: Two cogwheels are not there anymore. Just use one
  mode: 'edit',
  mode_edit: 'edit',
  mode_edit_outline: 'edit',
  money_off_csred: 'money_off',
  motion_photos_pause: 'motion_photos_paused',
  movie_creation: 'movie',

  nightlight_round: 'nightlight',
  no_cell: 'MISSING',
  no_encryption_gmailerrorred: 'no_encryption',
  not_interested: 'hide_source', // @todo: The same icon, but different name
  notifications_none: 'notifications',

  ondemand_video: 'play_circle', // @todo: Very different, no play tv anymore :(
  outlined_flag: 'emoji_flags', // Renamed to emoji_flags for ...reasons?

  panorama_horizontal_select: 'panorama_horizontal', // @todo: Not a good match, but there is no alternative
  panorama_photosphere_select: 'panorama_photosphere', // @todo: Not a good match, but there is no alternative
  panorama_vertical_select: 'panorama_vertical',
  panorama_wide_angle_select: 'panorama_wide_angle',
  payment: 'credit_card',
  people: 'group',
  people_alt: 'groups',
  people_outline: 'group',
  perm_identity: 'person',
  person_add_alt: 'person_add',
  person_add_alt_1: 'person_add',
  person_remove_alt_1: 'person_remove',
  personal_video: 'monitor',
  phone: 'call',
  phonelink: 'devices',
  photo_size_select_actual: 'wallpaper',
  pix: 'MISSING', // @todo: No idea what this was
  place: 'location_on',
  play_circle_filled: 'play_circle',
  plus_one: 'exposure_plus_1',
  poll: 'ballot',
  portrait: 'account_box',

  query_builder: 'alarm', // Set to alarm because its the same as access_alarm
  question_answer: 'forum',
  queue: 'add_to_queue',

  remove_circle: 'do_not_disturb_on_total_silence', // @todo: This still does not quite fit
  remove_circle_outline: 'do_not_disturb_on_total_silence', // @todo: This still does not quite fit
  remove_red_eye: 'visibility',
  replay_circle_filled: 'replay',
  report_gmailerrorred: 'dangerous',
  report_problem: 'warning',
  restore: 'history',
  room: 'location_on',

  save_alt: 'file_download',
  sd_storage: 'sd_card',
  security_update: 'install_mobile',
  sentiment_satisfied_alt: 'sentiment_satisfied',
  settings_input_composite: 'settings_input_component',
  shop_2: 'shop_two',
  shortcut: 'turn_right',
  signal_cellular_no_sim: 'sd_card_alert',
  signal_wifi_4_bar_lock: 'MISSING', // @todo: Maybe use signal_wifi_4_bar for this only?
  signal_wifi_connected_no_internet_4: 'signal_wifi_bad',
  signal_wifi_statusbar_4_bar: 'signal_wifi_4_bar',
  signal_wifi_statusbar_connected_no_internet_4: 'signal_wifi_statusbar_not_connected', // No connected now has question mark instead of exclamation
  sim_card_alert: 'sd_card_alert',
  source: 'topic', // Same icon, different name
  star_border: 'grade',
  star_border_purple500: 'grade',
  star_purple500: 'grade',
  store_mall_directory: 'mall',
  system_security_update: 'install_mobile',
  system_security_update_good: 'MISSING',
  system_security_update_warning: 'perm_device_information',

  tag_faces: 'sentiment_satisfied', // @todo: There are also others, search "smil"
  terrain: 'landscape',
  textsms: 'sms',
  thumb_down_alt: 'thumb_down',
  thumb_down_off_alt: 'thumb_down_off',
  thumb_up_alt: 'thumb_up',
  thumb_up_off_alt: 'thumb_up_off',
  time_to_leave: 'directions_car', // @todo: Same icon, different name
  try: 'reviews',
  tungsten: 'lightbulb',
  turned_in: 'bookmark',
  turned_in_not: 'bookmark_remove',

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

const keys2015 = Object.keys(i2015);
const keys2025 = Object.keys(i2025);

/**
 * Map old icon names to new icon names
 * @param {string} oldName The old icon name
 * @returns {IconMappingResult} An object with the new icon name and status
 */
const mapIconName = oldName => {
  // If the icon name is not in 2015, return original name
  if (!keys2015.includes(oldName)) {
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
  if (oldName.endsWith('_outline')) {
    const baseName = oldName.replace('_outline', '');
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

const results = keys2015.map(mapIconName);

// Write output as a js file
const output = `
import { getBasePath } from '../../utilities/base-path.js';
import type { IconLibrary } from './library.js';

const getIconMigrationName = (iconName: string) => {
  switch (iconName) {
    ${
      results
        .filter(result => result.status !== STATUS.MAPPED_DIRECTLY)
        .map(result => `    case '${result.name}': return '${result.newName}';`)
        .join('\n')
    }

    // Default case: We have a direct mapping
    default:
      return iconName;
  }
};

export const migrationLibrary: IconLibrary = {
  name: 'default',
  resolver: name => {
    const mappedName = getIconMigrationName(name);
    return getBasePath(\`assets/icons/\${mappedName}.svg\`);  
  },
};
`;

console.log(output);
