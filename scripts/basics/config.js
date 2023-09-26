import fs from 'fs';

const CONFIG_FILE = 'unified-design-system.config.json';

export function saveConfig(config) {
  // read current config
  const currentConfig = fs.existsSync(CONFIG_FILE)
    ? JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'))
    : {};

  // merge current config with new config
  config = {
    ...currentConfig,
    ...config,
  };

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export function readConfig() {
  return fs.existsSync(CONFIG_FILE) ? JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) : {};
}
