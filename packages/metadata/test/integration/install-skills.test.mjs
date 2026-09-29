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
      assert.ok(skillContent.includes('skill-type: "component-reference"'));
      assert.ok(skillContent.includes('interface.md'));
      assert.ok(skillContent.includes('rules.md'));
      assert.ok(skillContent.includes('examples.md'));

      const packageJson = JSON.parse(await readFsFile(metadataPackageJsonPath, 'utf-8'));
      assert.ok(skillContent.includes(`version: "${packageJson.version}"`));

      // Verify templates skill root exists
      const templatesSkillPath = path.join(tempRoot, 'synergy-templates', 'SKILL.md');
      await access(templatesSkillPath);
      const templatesSkillContent = await readFile(templatesSkillPath, 'utf-8');
      assert.ok(templatesSkillContent.includes('synergy-templates'));
      assert.ok(templatesSkillContent.includes('metadata:'));
      assert.ok(templatesSkillContent.includes('source: "synergy-design-system"'));
      assert.ok(templatesSkillContent.includes('skill-type: "template-reference"'));
      assert.ok(templatesSkillContent.includes('Look in the `templates/` folder'));

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
