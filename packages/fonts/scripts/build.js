import ora from 'ora';
import postcss from 'postcss';
import fs from 'fs/promises';
import headerPlugin from 'postcss-header';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';

/**
 * Create the default banner
 * @returns {String} The banner to prepend to all generated files
 */
const createBanner = async () => {
  const packageJSON = await fs.readFile('package.json', {
    encoding: 'utf-8',
  });

  const { author, name } = JSON.parse(packageJSON.toString());

  return `
/**
 * ${name}
 * ${author.name}
 */`.trim();
};

const build = async () => {
  try {
    const header = await createBanner();
    const css = await fs.readFile('src/SICKINtl/font.css', 'utf8');

    const result = await postcss([
      postcssImport(),
      postcssUrl({
        url: 'inline',
      }),
      headerPlugin({
        header,
      }),
    ]).process(css, { 
      from: 'src/SICKINtl/font.css',
      to: 'dist/sickintl-inline.css' 
    });

    // Ensure dist directory exists
    await fs.mkdir('dist', { recursive: true });

    // Write the output file
    await fs.writeFile('dist/sickintl-inline.css', result.css);
  } catch (error) {
    throw new Error(`Error during build: ${error.toString()}`);
  }
};

const spinner = ora({
  hideCursor: false,
});

spinner.start('Building SICKINtl font CSS with inlined fonts...');

build()
  .then(() => {
    spinner.succeed('Build completed successfully.');
    process.exit(0);
  })
  .catch(error => {
    spinner.fail(`Build failed: ${error}`);
    process.exit(1);
  })
  .finally(() => {
    spinner.stop();
  });
