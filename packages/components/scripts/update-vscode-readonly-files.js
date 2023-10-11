import fs from 'fs';

export async function updateVsCodeReadOnlyFiles(remove, add, settingsPath = '../../.vscode/settings.json') {
  try {
    // Default settings object
    let settings = {};

    // If settings.json exists, read and parse it
    if (fs.existsSync(settingsPath)) {
      console.log("📖 Reading existing settings.json file...");
      const rawData = fs.readFileSync(settingsPath, 'utf8');
      settings = JSON.parse(rawData);
    }
    else {
      console.log("settings.json does not exist.");
    }

    // Initialize files.readonlyInclude if it doesn't exist
    settings['files.readonlyInclude'] = settings['files.readonlyInclude'] || {};


    // Removes files from files.readonlyInclude
    for (const file of remove) {
      if (!settings['files.readonlyInclude'] || !settings['files.readonlyInclude'][`packages/components/${file}`]) continue;
      delete settings['files.readonlyInclude'][`packages/components/${file}`];
    }

    const readonlyFiles = {};
    for (const file of add) {
      readonlyFiles[`packages/components/${file}`] = true;
    }

    // Override files.readonlyInclude with the provided files object
    settings['files.readonlyInclude'] = { ...readonlyFiles, ...settings['files.readonlyInclude'] };

    // Write the updated settings back to settings.json
    console.log("🖊️ Writing to settings.json file...");
    await fs.mkdirSync(settingsPath.split('/').slice(0, -1).join('/'), { recursive: true });
    await fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4), 'utf8');
  } catch (error) {
    console.error('An error occurred while updating settings:', error);
  }
}
