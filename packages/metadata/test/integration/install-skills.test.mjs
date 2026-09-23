import {
  access,
  mkdtemp,
  readFile as readFsFile,
  readFile,
  rm,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { execa } from 'execa';

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

      // Verify root SKILL.md exists
      const skillPath = path.join(tempRoot, 'synergy-component', 'SKILL.md');
      await access(skillPath);
      const skillContent = await readFile(skillPath, 'utf-8');
      assert.ok(skillContent.includes('synergy-component'));
      assert.ok(skillContent.includes('metadata:'));
      assert.ok(skillContent.includes('source: "synergy-design-system"'));
      assert.ok(skillContent.includes('synergy-version: "3.26.1"'));
      assert.ok(skillContent.includes('generated against Synergy version `3.26.1`'));
      assert.ok(!skillContent.includes('{{'));
      assert.ok(skillContent.includes('skill-type: "component-reference"'));
      assert.ok(skillContent.includes('interface.md'));
      assert.ok(skillContent.includes('rules.md'));
      assert.ok(skillContent.includes('examples.md'));
      assert.ok(skillContent.includes('/synergy-component'));

      const packageJson = JSON.parse(await readFsFile(metadataPackageJsonPath, 'utf-8'));
      assert.ok(skillContent.includes(`version: "${packageJson.version}"`));

      // Verify templates skill root exists
      const templatesSkillPath = path.join(tempRoot, 'synergy-templates', 'SKILL.md');
      await access(templatesSkillPath);
      const templatesSkillContent = await readFile(templatesSkillPath, 'utf-8');
      assert.ok(templatesSkillContent.includes('synergy-templates'));
      assert.ok(templatesSkillContent.includes('metadata:'));
      assert.ok(templatesSkillContent.includes('source: "synergy-design-system"'));
      assert.ok(templatesSkillContent.includes('synergy-version: "3.26.1"'));
      assert.ok(templatesSkillContent.includes('generated against Synergy version `3.26.1`'));
      assert.ok(!templatesSkillContent.includes('{{'));
      assert.ok(templatesSkillContent.includes('skill-type: "template-reference"'));
      assert.ok(templatesSkillContent.includes('Look in the `templates/` folder'));
      assert.ok(templatesSkillContent.includes('/synergy-templates'));

      const intentSkillPath = path.join(tempRoot, 'synergy-intent-policy', 'SKILL.md');
      await access(intentSkillPath);
      const intentSkillContent = await readFile(intentSkillPath, 'utf-8');
      assert.ok(intentSkillContent.includes('synergy-intent-policy'));
      assert.ok(intentSkillContent.includes('choose suitable UI patterns, generate starting points'));
      assert.ok(intentSkillContent.includes('skill-type: "intent-reference"'));
      assert.ok(intentSkillContent.includes('synergy-version: "3.26.1"'));
      assert.ok(intentSkillContent.includes('generated against Synergy version `3.26.1`'));
      assert.ok(!intentSkillContent.includes('{{'));
      assert.ok(intentSkillContent.includes('You are generating a Synergy implementation for a known user goal'));
      assert.ok(intentSkillContent.includes('/synergy-intent-policy'));
      assert.ok(intentSkillContent.includes('Identify the user\'s goal.'));
      assert.ok(intentSkillContent.includes('does not guarantee complete accessibility'));
      assert.ok(intentSkillContent.includes('vanilla Web Component markup'));
      assert.ok(intentSkillContent.includes('Apply every Required and Forbidden rule as a constraint.'));
      assert.ok(intentSkillContent.includes('Evaluate Recommended and Warning entries as contextual guidance.'));
      assert.ok(intentSkillContent.includes('`action.navigation` maps to `intents/action/navigation/`'));
      assert.ok(intentSkillContent.includes('`action.button.icon` maps to `intents/action/button.icon/`'));
      const intentIndexPath = path.join(tempRoot, 'synergy-intent-policy', 'intents', 'README.md');
      await access(intentIndexPath);
      const intentIndex = await readFile(intentIndexPath, 'utf-8');
      assert.ok(intentIndex.indexOf('[action]') < intentIndex.indexOf('[assistance]'));
      assert.ok(intentIndex.indexOf('[assistance]') < intentIndex.indexOf('[disclosure]'));
      assert.ok(intentIndex.indexOf('[disclosure]') < intentIndex.indexOf('[feedback]'));
      assert.ok(intentIndex.indexOf('[feedback]') < intentIndex.indexOf('[input]'));
      assert.ok(intentIndex.indexOf('[input]') < intentIndex.indexOf('[navigation]'));
      assert.ok(intentIndex.indexOf('[navigation]') < intentIndex.indexOf('[status]'));
      assert.ok(intentIndex.indexOf('[status]') < intentIndex.indexOf('[structure]'));
      await access(path.join(tempRoot, 'synergy-intent-policy', 'intents', 'action', 'README.md'));
      const actionIndex = await readFile(path.join(tempRoot, 'synergy-intent-policy', 'intents', 'action', 'README.md'), 'utf-8');
      assert.ok(actionIndex.indexOf('[action.button.icon]') < actionIndex.indexOf('[action.grouped]'));
      assert.ok(actionIndex.indexOf('[action.grouped]') < actionIndex.indexOf('[action.navigation]'));
      assert.ok(actionIndex.indexOf('[action.navigation]') < actionIndex.indexOf('[action.primary]'));
      assert.ok(actionIndex.indexOf('[action.primary]') < actionIndex.indexOf('[action.reset]'));
      assert.ok(actionIndex.indexOf('[action.reset]') < actionIndex.indexOf('[action.submit]'));

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

      assert.ok(interfaceContent.includes('syn-button'));
      assert.ok(rulesContent.includes('syn-button'));
      assert.ok(examplesContent.includes('syn-button'));

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
      assert.ok(templateExampleContent.includes('Contact Form'));

      const intentDirectory = path.join(tempRoot, 'synergy-intent-policy', 'intents', 'action', 'submit');
      await access(path.join(intentDirectory, 'interface.md'));
      await access(path.join(intentDirectory, 'rules.md'));
      await access(path.join(intentDirectory, 'examples.md'));
      const intentRules = await readFile(path.join(intentDirectory, 'rules.md'), 'utf-8');
      assert.ok(intentRules.includes('Required') || intentRules.includes('Recommended'));
      const intentInterface = await readFile(path.join(intentDirectory, 'interface.md'), 'utf-8');
      assert.ok(intentInterface.includes('(./rules.md#target-component:syn-button)'));
      assert.ok(intentRules.includes('<a id="target-component:syn-button"></a>'));
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
      await assert.rejects(access(path.join(tempRoot, 'synergy-templates')));
      await assert.rejects(access(path.join(tempRoot, 'synergy-intent-policy')));
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
      assert.fail('Expected execa to throw');
    } catch (error) {
      assert.strictEqual(error.exitCode, 1);
      assert.ok(error.stderr.includes('--path argument is required'));
    }
  });
});
