/* eslint-disable */
import { defaultIcons as i2015 } from '../dist/default-icons.js';
import { outlineIcons as i2025 } from '../dist/sick2025-outline-icons.js';

/**
 * Static mapping between old icon names and new icon names when no direct or similarity can be found
 */
const STATIC_MAP = {
  access_alarm: 'alarm',
  access_alarms: 'alarm',
  access_time: 'schedule',
  access_time_filled: 'schedule',
  add_alarm: 'alarm_add',
  announcement: 'sms_failed', // todo: Find something better! SMS has hardly anything to do with this!
  camera_alt: 'camera', // todo: Find something better! Camera is heavily stylized
  catching_pokemon: 'MISSING',
  clear: 'close',
  create: 'edit', // @todo: Edit is still a pen, but create is a plus sign?
  crop_din: 'crop_square',
  discount: 'MISSING',
  email: 'mail',
  fitbit: 'MISSING', // @todo: maybe cardio_load?
  fmd_good: 'location_on',
  free_breakfast: 'local_cafe',
  games: 'gamepad',
  get_app: 'file_download', // @todo: Decide: There is also install_mobile or apk_install
  gpp_good: 'beenhere', // @todo: Same icon, but I don´t know what gpp_good means...
  gps_fixed: 'my_location', // @todo: Probably naming problem only, icons look the same
  gps_not_fixed: 'location_searching', // @todo: Probably naming problem only, icons look the same
  gps_off: 'location_disabled', // @todo: Probably naming problem only, icons look the same
  https: 'lock', // @todo: Was a lock icon, not available anymore
  local_airport: 'flight',
  message: 'chat',
  mic_none: 'mic_off',
  miscellaneous_services: 'settings', // @todo: Two cogwheels are not there anymore. Just use one
  mode_edit: 'edit',
  mode_edit_outline: 'edit',
  no_cell: 'MISSING',
  not_interested: 'hide_source', // @todo: The same icon, but different name
  ondemand_video: 'play_circle', // @todo: Very different, no play tv anymore :(
  outlined_flag: 'emoji_flags', // Renamed to emoji_flags for ...reasons?
  people: 'group',
  people_alt: 'groups',
  people_outline: 'group',
  query_builder: 'alarm', // Set to alarm because its the same as access_alarm
  queue: 'add_to_queue',
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
  time_to_leave: 'directions_car', // @todo: Same icon, different name
  thumb_down_alt: 'thumb_down',
  thumb_down_off_alt: 'thumb_down_off',
  thumb_up_alt: 'thumb_up',
  thumb_up_off_alt: 'thumb_up_off',
  try: 'reviews',
  tungsten: 'lightbulb',
  turned_in: 'bookmark',
  turned_in_not: 'bookmark_remove',
  watch_later: 'schedule',
  warning_amber: 'warning',
  wb_cloudy: 'cloud_queue',
  work_off: 'enterprise_off',
  room: 'location_on',
  restore: 'history',
  report_problem: 'warning',
  report_gmailerrorred: 'dangerous',
  replay_circle_filled: 'replay',
  remove_red_eye: 'visibility',
  remove_circle_outline: 'do_not_disturb_on_total_silence', // @todo: This still does not quite fit
  remove_circle: 'do_not_disturb_on_total_silence', // @todo: This still does not quite fit
  question_answer: 'forum',
  portrait: 'account_box',
  poll: 'ballot',
  plus_one: 'exposure_plus_1',
  play_circle_filled: 'play_circle',
  place: 'location_on',
  pix: 'MISSING', // @todo: No idea what this was
  photo_size_select_actual: 'wallpaper',
  phonelink: 'devices',
  phone: 'call',
  personal_video: 'monitor',
  person_remove_alt_1: 'person_remove',
  person_add_alt_1: 'person_add',
  person_add_alt: 'person_add',
  perm_identity: 'person',
  payment: 'credit_card',
  pause_circle_filled: 'pause_circle',
  panorama_wide_angle_select: 'panorama_wide_angle',
  panorama_vertical_select: 'panorama_vertical',
  panorama_photosphere_select: 'panorama_photosphere', // @todo: Not a good match, but there is no alternative
  panorama_horizontal_select: 'panorama_horizontal', // @todo: Not a good match, but there is no alternative
  notifications_none: 'notifications',
  no_encryption_gmailerrorred: 'no_encryption',
  nightlight_round: 'nightlight',
  movie_creation: 'movie',
  motion_photos_pause: 'motion_photos_paused',
  money_off_csred: 'money_off',
  mode: 'edit',
  markunread: 'markunread_mailbox',
  maps_home_work: 'home_work',
  loop: 'repeat', // @todo: Not quite the same, but ymmv
  local_printshop: 'print',
  local_play: 'local_activity',
  local_phone: 'call',
  local_offer: 'loyalty',
  local_movies: 'theaters',
  local_hotel: 'hotel',
  local_grocery_store: 'shopping_cart',
  launch: 'open_in_new',
  laptop: 'laptop_mac',
  iso: 'MISSING',
  insert_photo: 'wallpaper',
  insert_link: 'link',
  insert_invitation: 'event',
  insert_emoticon: 'sentiment_satisfied',
  insert_drive_file: 'note',
  insert_comment: 'comment',
  insert_chart_outlined: 'add_chart',
  import_export: 'height', // @todo: This does not match! But at least its two arrows
  highlight_off: 'cancel',
  highlight_alt: 'ink_selection',
  headset: 'headphones',
  fire_hydrant_alt: 'fire_hydrant',
  favorite_border: 'favorite',
  emoji_emotions: 'sentiment_satisfied',
  drive_eta: 'directions_car',
  do_not_disturb_alt: 'do_not_disturb_off',
  do_not_disturb: 'do_not_disturb_off',
  do_disturb_on: 'do_not_disturb_on',
  do_disturb_off: 'do_not_disturb_on',
  do_disturb_alt: 'do_not_disturb_on',
  do_disturb: 'do_not_disturb_off',
  directions_transit_filled: 'directions_subway',
  directions_transit: 'directions_subway',
  directions_subway_filled: 'directions_subway',
  directions_railway_filled: 'directions_railway',
  directions_car_filled: 'directions_car',
  directions_bus_filled: 'directions_bus',
  directions_boat_filled: 'directions_boat',
  delivery_dining: 'moped',
  data_saver_off: 'MISSING', // add icon still there, but off not?
  crop_original: 'wallpaper', // Originally, this is just the picture icon
  control_point: 'add_circle',
  color_lens: 'palette',
  collections: 'collections_bookmark',
  closed_caption_off: 'closed_caption',
  ['class']: 'MISSING', // @todo: No idea what this was, thanks for the class keyword JS
  card_giftcard: 'featured_seasonal_and_gifts',
  business: 'apartment',
  browser_not_supported: 'web_asset_off',
  bookmark_border: 'bookmark',
  bluetooth_audio: 'bluetooth',
  battery_std: 'battery_full',
  audiotrack: 'music_note',
  assistant_photo: 'flag',
  assessment: 'analytics',
  app_settings_alt: 'phonelink_setup',
  addchart: 'add_chart',
  add_ic_call: 'add_call',
};

const STATUS = {
  MAPPED_BY_REVERSING: 'MAPPED_BY_REVERSING',
  MAPPED_STATICALLY: 'MAPPED_STATICALLY',
  MAPPED_DIRECTLY: 'MAPPED_DIRECTLY',
  MAPPED_WITH_SIMILARITY: 'MAPPED_WITH_SIMILARITY',
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

/**
 * Simple Soundex implementation for US English, lowercase only.
 * @param {string} word
 * @returns {string} Soundex code
 */
function soundex(word) {
  if (!word || typeof word !== 'string') return '';

  // Only lowercase letters
  word = word.toLowerCase().replace(/[^a-z]/g, '');

  if (!word) return '';

  const codes = {
    a: '', e: '', i: '', o: '', u: '', y: '', h: '', w: '',
    b: '1', f: '1', p: '1', v: '1',
    c: '2', g: '2', j: '2', k: '2', q: '2', s: '2', x: '2', z: '2',
    d: '3', t: '3',
    l: '4',
    m: '5', n: '5',
    r: '6'
  };

  const firstLetter = word[0];
  let result = firstLetter;
  let prevCode = codes[firstLetter];

  for (let i = 1; i < word.length; i++) {
    const code = codes[word[i]];
    if (code && code !== prevCode) {
      result += code;
    }
    prevCode = code;
  }

  result = result.padEnd(4, '0').slice(0, 4);
  return result;
}

const keys2015 = Object.keys(i2015);
const keys2025 = Object.keys(i2025);
const soundexKeys2025 = keys2025.map(soundex);

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
    }
  } else {
    console.error(STATIC_MAP[oldName]);
  }

  // Before giving up, we try to create a list of icons that would be feasible alternatives
  // For this, we take the name of the original icon and compute its soundex code
  // We try to match this against the soundex of all new icons
  const oldSoundex = soundex(oldName);
  const possibleMatches = keys2025.filter((_, index) => {
    return soundexKeys2025[index] === oldSoundex;
  });
  
  // If we have possible matches, return them
  if (possibleMatches.length > 0) {
    return {
      name: oldName,
      newName: possibleMatches.join(', '),
      status: STATUS.MAPPED_WITH_SIMILARITY,
    };
  }

  if (possibleMatches.length > 0) {
    return {
      name: oldName,
      newName: possibleMatches.join(', '),
      status: STATUS.MAPPED_WITH_SIMILARITY,
    };
  }

  return {
    name: oldName,
    newName: null,
    status: STATUS.UNKNOWN,
  };
};

const results = keys2015.map(mapIconName);

const groupedResults = results
  .reduce((acc, result) => {
    if (!acc[result.status]) {
      acc[result.status] = [];
    }
    acc[result.status].push(result);
    return acc;
  }, {});

console.log('-------');
console.log(JSON.stringify(groupedResults, null, 2));
console.log('-------');
