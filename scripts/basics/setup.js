import {
  intro,
  outro,
  text,
  group,
  cancel,
  password,
  spinner
} from '@clack/prompts';
import { downloadShoelace } from '../components/download-shoelace.js';
import { saveConfig } from './config.js';
import { FigmaValidator } from '../assets/figma-validator.js';

const s = spinner();

export const setupBasics = async (config) => {
  if (!config.libraryName || !config.libraryPrefix || !config.figmaPersonalToken || !config.figmaFileId || !config.shoelaceVersion) {
    intro(`1/4 – 🪄 Basics`);

    const libraryOptions = {
      libraryName: () =>
        text({
          message: `Welcome to setting up a new "Essential Design System"! How do you want to name your design system?`,
          placeholder: 'essential',
          validate(value) {
            if (!/^[a-z]+$/.test(value)) return 'Only lowercase letters are allowed';
          },
        }),
      libraryPrefix: () =>
        text({
          message: 'How do you want to prefix your Design System?',
          placeholder: 'es',
          validate(value) {
            if (!/^[a-z]+$/.test(value)) return 'Only lowercase letters are allowed';
          },
        }),
      shoelaceVersion: () =>
        text({
          message: 'Which Shoelace version do you want to use? (You can change your version anytime.)',
          initialValue: 'current',
          placeholder: 'current',
        })
    };

    if (!config.libraryName || !config.libraryPrefix || !config.shoelaceVersion) {
      // Step 1: Basics
      const libraryBasics = await group(
        Object.fromEntries(
          Object.entries(libraryOptions).filter(([key]) => !config[key])
        ),
        {
          onCancel: ({ results }) => {
            cancel('Operation cancelled.');
            process.exit(0);
          },
        }
      );

      // Save config
      config = { ...config, ...libraryBasics, vendorPath: './vendor' };
      saveConfig(config);

      await downloadShoelace(config);
    }
    const getFigmaFileId = (url) => {
      const urlSegments = url.split('/');
      return urlSegments[urlSegments.findIndex(segment => segment === 'file') + 1];
    }

    const figmaOptions = {
      figmaPersonalToken: async () => {
        return await password({
          message: 'Please provide your Figma Personal Access Token.',
        })
      },
      figmaFileId: async () => {
        let figmaFileId = await text({
          message: 'Now duplicate the "Essential Design System Figma" File and provide the new URL or alphanumeric ID.',
          placeholder: '"dn8usadoiashdobib" or "https://www.figma.com/file/dn8usadoiashdobib/..."',
          validate(value) {
            try {
              // check if URL is valid with new URL constructor
              new URL(value);
              // check if URL is a Figma URL that contains "file"
              if (!value.includes('file')) {
                return 'Please provide a valid Figma URL – it has to contain the file ID';
              }

              if (!getFigmaFileId(value)) {
                return 'Please provide a valid Figma URL – it has to contain the file ID';
              }
            }
            catch (_) {
              // if not URL check if alphanumeric ID
              if (value && !/^[a-zA-Z0-9]*$/.test(value)) {
                return 'Please provide a valid URL or alphanumeric ID';
              }
            }
          },
        });
        if (figmaFileId.includes('https://')) {
          figmaFileId = getFigmaFileId(figmaFileId);
        }
        return figmaFileId;
      },
    };

    if (!config.figmaPersonalToken || !config.figmaFileId) {

      const figmaBasics = await group(
        Object.fromEntries(
          Object.entries(figmaOptions).filter(([key]) => !config[key])
        ),
        {
          onCancel: ({ results }) => {
            cancel('Operation cancelled.');
            process.exit(0);
          },
        }
      );

      config = { ...config, ...figmaBasics };

      s.start('⏳ Validating Figma file');
      const figmaValidator = new FigmaValidator({
        // This will be changed at a later point
        figmaPersonalToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN,
      })
      const missingPages = await figmaValidator.getMissingPages(config.figmaFileId);
      if (missingPages?.length === 0) {
        s.stop('Figma file validated.');
      } else {
        s.stop('Figma file validated.');
        console.error('Error validating Figma file');
      }

      config = { ...config, ...figmaBasics };
      saveConfig(config);
    }


    outro('✅ Basic setup done.')
  }
}
