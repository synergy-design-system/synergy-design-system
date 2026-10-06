import {
  access,
  mkdtemp,
  readFile,
  readFile as readFsFile,
  rm,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { execa } from 'execa';
import { createMetadataStore } from '../../dist/public/index.js';
import { renderSkillBody } from '../../dist/public/skills/shared.js';

describe('install-skills bin integration', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');
  const metadataPackageJsonPath = path.join(metadataPackageDir, 'package.json');

  it('generates skill bundle with component facets', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'install-skills-test-'));

    try {
      // Run the install-skills command
      await execa('node', ['dist/bin/install-skills.js', '--path', tempRoot], {
        cwd: metadataPackageDir,
      });

      const packageJson = JSON.parse(await readFsFile(metadataPackageJsonPath, 'utf-8'));
      const store = createMetadataStore();
      const index = await store.getIndex();
      const componentsPackage = await store.getEntity('setup:components-package');
      const skills = [
        {
          bodyFile: 'component-skill-body.md',
          layers: 'interface,rules,examples',
          name: 'synergy-component',
          type: 'component-reference',
        },
        {
          bodyFile: 'template-skill-body.md',
          layers: 'examples',
          name: 'synergy-templates',
          type: 'template-reference',
        },
        {
          bodyFile: 'intents-skill-body.md',
          layers: 'interface,rules,examples',
          name: 'synergy-intent-policy',
          type: 'intent-reference',
        },
      ];

      for (const skill of skills) {
        const skillPath = path.join(tempRoot, skill.name, 'SKILL.md');
        const content = await readFile(skillPath, 'utf-8');
        const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n\n/);
        assert.ok(frontmatter, `${skill.name} must have frontmatter`);
        assert.match(frontmatter[1], new RegExp(`^name: ${skill.name}$`, 'm'), `${skill.name} frontmatter name must match its folder name`);
        const description = frontmatter[1].match(/^description: '(.+)'$/m)?.[1];
        assert.ok(description, `${skill.name} must have a non-empty description`);
        assert.match(frontmatter[1], /^metadata:$/m, `${skill.name} frontmatter must contain a metadata section`);
        const metadata = Object.fromEntries(
          [...frontmatter[1].matchAll(/^ {2}([a-z-]+): (".*")$/gm)]
            .map(([, key, value]) => [key, JSON.parse(value)]),
        );
        assert.equal(metadata['skill-version'], packageJson.version, `${skill.name} skill-version must match the metadata package version`);
        assert.equal(metadata['synergy-version'], componentsPackage.custom.packageVersion, `${skill.name} synergy-version must match the components setup entity`);
        assert.equal(metadata.source, 'synergy-design-system', `${skill.name} must identify the Synergy metadata source`);
        assert.equal(metadata['data-built-at'], index.builtAt, `${skill.name} data-built-at must match the metadata index`);
        assert.equal(metadata['schema-version'], index.version, `${skill.name} schema-version must match the metadata index`);
        assert.equal(metadata['skill-type'], skill.type, `${skill.name} must use the expected reference type`);
        assert.equal(metadata['content-layer'], skill.layers, `${skill.name} must declare its expected content layers`);
        assert.ok(Number.isFinite(Date.parse(metadata['generated-at'])), `${skill.name} generated-at must be a valid timestamp`);

        const sourceBody = await readFile(path.join(metadataPackageDir, 'skills-content', skill.bodyFile), 'utf-8');
        assert.ok(sourceBody.trim().length > 0, `${skill.bodyFile} must contain a non-empty skill body`);
        const body = content.slice(frontmatter[0].length);
        assert.equal(body, renderSkillBody(sourceBody.trim(), {
          CONTENT_LAYER: metadata['content-layer'],
          DATA_BUILT_AT: metadata['data-built-at'],
          DESCRIPTION: description,
          GENERATED_AT: metadata['generated-at'],
          NAME: skill.name,
          SCHEMA_VERSION: metadata['schema-version'],
          SKILL_TYPE: metadata['skill-type'],
          SKILL_VERSION: metadata['skill-version'],
          SOURCE: metadata.source,
          SYNERGY_VERSION: metadata['synergy-version'],
        }), `${skill.name} generated body must match its source Markdown with template variables resolved`);
        assert.doesNotMatch(body, /\{\{[^}]+\}\}/, `${skill.name} generated body must not contain unresolved placeholders`);

        const companionLinks = [...body.matchAll(/\]\((\.\.\/[^)]+\/SKILL\.md)\)/g)];
        assert.equal(companionLinks.length, skills.length - 1, `${skill.name} must link to each companion skill`);
        for (const [, target] of companionLinks) {
          await access(path.resolve(path.dirname(skillPath), target));
        }
      }

      const intentIndexPath = path.join(tempRoot, 'synergy-intent-policy', 'intents', 'README.md');
      await access(intentIndexPath);
      const intentIndex = await readFile(intentIndexPath, 'utf-8');
      assert.ok(intentIndex.indexOf('[action]') < intentIndex.indexOf('[assistance]'), 'The category index must list action before assistance');
      assert.ok(intentIndex.indexOf('[assistance]') < intentIndex.indexOf('[disclosure]'), 'The category index must list assistance before disclosure');
      assert.ok(intentIndex.indexOf('[disclosure]') < intentIndex.indexOf('[feedback]'), 'The category index must list disclosure before feedback');
      assert.ok(intentIndex.indexOf('[feedback]') < intentIndex.indexOf('[input]'), 'The category index must list feedback before input');
      assert.ok(intentIndex.indexOf('[input]') < intentIndex.indexOf('[navigation]'), 'The category index must list input before navigation');
      assert.ok(intentIndex.indexOf('[navigation]') < intentIndex.indexOf('[status]'), 'The category index must list navigation before status');
      assert.ok(intentIndex.indexOf('[status]') < intentIndex.indexOf('[structure]'), 'The category index must list status before structure');
      await access(path.join(tempRoot, 'synergy-intent-policy', 'intents', 'action', 'README.md'));
      const actionIndex = await readFile(path.join(tempRoot, 'synergy-intent-policy', 'intents', 'action', 'README.md'), 'utf-8');
      assert.ok(actionIndex.indexOf('[action.button.icon]') < actionIndex.indexOf('[action.grouped]'), 'The action index must list button.icon before grouped');
      assert.ok(actionIndex.indexOf('[action.grouped]') < actionIndex.indexOf('[action.navigation]'), 'The action index must list grouped before navigation');
      assert.ok(actionIndex.indexOf('[action.navigation]') < actionIndex.indexOf('[action.primary]'), 'The action index must list navigation before primary');
      assert.ok(actionIndex.indexOf('[action.primary]') < actionIndex.indexOf('[action.reset]'), 'The action index must list primary before reset');
      assert.ok(actionIndex.indexOf('[action.reset]') < actionIndex.indexOf('[action.submit]'), 'The action index must list reset before submit');

      // Verify syn-button facets exist
      const buttonInterfacePath = path.join(
        tempRoot,
        'synergy-component',
        'components',
        'syn-button',
        'interface.md',
      );
      const buttonRulesPath = path.join(
        tempRoot,
        'synergy-component',
        'components',
        'syn-button',
        'rules.md',
      );
      const buttonExamplesPath = path.join(
        tempRoot,
        'synergy-component',
        'components',
        'syn-button',
        'examples.md',
      );

      await access(buttonInterfacePath);
      await access(buttonRulesPath);
      await access(buttonExamplesPath);

      // Verify content is not empty
      const interfaceContent = await readFile(buttonInterfacePath, 'utf-8');
      const rulesContent = await readFile(buttonRulesPath, 'utf-8');
      const examplesContent = await readFile(buttonExamplesPath, 'utf-8');

      assert.ok(interfaceContent.includes('syn-button'), 'The syn-button interface facet must contain its component reference');
      assert.ok(rulesContent.includes('syn-button'), 'The syn-button rules facet must contain its component reference');
      assert.ok(examplesContent.includes('syn-button'), 'The syn-button examples facet must contain its component reference');

      // Verify other components are present (spot check)
      const inputPath = path.join(
        tempRoot,
        'synergy-component',
        'components',
        'syn-input',
      );
      await access(inputPath);

      // Verify template examples are present (spot check)
      const templateExamplePath = path.join(
        tempRoot,
        'synergy-templates',
        'templates',
        'forms',
        'examples.md',
      );
      await access(templateExamplePath);
      const templateExampleContent = await readFile(templateExamplePath, 'utf-8');
      assert.ok(templateExampleContent.includes('Contact Form'), 'The forms template must contain the contact form example');

      const intentDirectory = path.join(tempRoot, 'synergy-intent-policy', 'intents', 'action', 'submit');
      await access(path.join(intentDirectory, 'interface.md'));
      await access(path.join(intentDirectory, 'rules.md'));
      await access(path.join(intentDirectory, 'examples.md'));
      const intentRules = await readFile(path.join(intentDirectory, 'rules.md'), 'utf-8');
      assert.ok(intentRules.includes('Required') || intentRules.includes('Recommended'), 'The action.submit rules facet must contain implementation guidance');
      const intentInterface = await readFile(path.join(intentDirectory, 'interface.md'), 'utf-8');
      assert.ok(intentInterface.includes('(./rules.md#target-component:syn-button)'), 'The action.submit interface must link to the syn-button rules anchor');
      assert.ok(intentRules.includes('<a id="target-component:syn-button"></a>'), 'The action.submit rules must define the linked syn-button anchor');
    } finally {
      await rm(tempRoot, { recursive: true });
    }
  });

  it('creates directories if they do not exist', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'install-skills-test-'));
    const nestedPath = path.join(tempRoot, 'deeply', 'nested', 'path');

    try {
      await execa('node', ['dist/bin/install-skills.js', '--path', nestedPath], {
        cwd: metadataPackageDir,
      });

      const skillPath = path.join(nestedPath, 'synergy-component', 'SKILL.md');
      await access(skillPath);
    } finally {
      await rm(tempRoot, { recursive: true });
    }
  });

  it('installs only the selected skills', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'install-skills-test-'));

    try {
      await execa('node', ['dist/bin/install-skills.js', '--path', tempRoot, '--skills', 'component'], {
        cwd: metadataPackageDir,
      });

      await access(path.join(tempRoot, 'synergy-component', 'SKILL.md'));
      await assert.rejects(access(path.join(tempRoot, 'synergy-templates')), 'Selecting only component must not install the templates skill');
      await assert.rejects(access(path.join(tempRoot, 'synergy-intent-policy')), 'Selecting only component must not install the intent policy skill');
    } finally {
      await rm(tempRoot, { recursive: true });
    }
  });

  it('fails with error for an unknown skill', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'install-skills-test-'));

    try {
      await assert.rejects(
        execa('node', ['dist/bin/install-skills.js', '--path', tempRoot, '--skills', 'unknown'], {
          cwd: metadataPackageDir,
        }),
        (error) => error.exitCode === 1 && error.stderr.includes('component, templates, intents'),
        'An unknown skill must exit with code 1 and report the supported skill names',
      );
    } finally {
      await rm(tempRoot, { recursive: true });
    }
  });

  it('fails with error when --path is not provided', async () => {
    try {
      await execa('node', ['dist/bin/install-skills.js'], {
        cwd: metadataPackageDir,
      });
      assert.fail('The installer must reject a call without the required --path argument');
    } catch (error) {
      assert.strictEqual(error.exitCode, 1, 'Missing --path must make the installer exit with code 1');
      assert.ok(error.stderr.includes('--path argument is required'), 'Missing --path must produce an actionable required-argument error');
    }
  });
});
