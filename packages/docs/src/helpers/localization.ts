import { type Translation } from '../../../components/src/utilities/localize.js';

const translationModules = import.meta.glob('../../../components/src/translations/*.ts', { eager: true });

/**
 * List all available translations by importing all translation modules and extracting their default exports.
 * This allows us to display or test all translations in our Storybook stories.
 */
export const getAvailableLocalizations = () => Object
  .entries(translationModules)
  .reduce((acc, [path, module]) => {
    const lang = path.split('/').pop()?.replace('.ts', '');
    if (lang) {
      acc[lang] = (module as { default: Translation }).default;
    }
    return acc;
  }, {} as Record<string, Translation>);
