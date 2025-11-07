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
  .filter(status => status.status === STATUS.MAPPED_WITH_SIMILARITY)
  .reduce((acc, result) => {
    if (!acc[result.status]) {
      acc[result.status] = [];
    }
    acc[result.status].push(result);
    return acc;
  }, {});

console.log('-------');
console.log(JSON.stringify(groupedResults[STATUS.MAPPED_WITH_SIMILARITY], null, 2));
console.log('-------');

// console.log('------');
// console.log(groupedResults[STATUS.MAPPED_STATICALLY].map(e => `${e.name} -> ${e.newName}`).join('\n'));
// console.log('------');

// console.log('Summary:');
// Object.entries(groupedResults).forEach(([status, items]) => {
//   console.log(`- ${status}: ${items.length} icons`);
// });
