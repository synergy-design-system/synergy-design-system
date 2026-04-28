import {
  access,
  mkdtemp,
  readdir,
  readFile,
  writeFile,
  mkdir,
  rm,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { expect } from 'chai';
import { execa } from 'execa';

describe('metadata cleanup integration', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  it('removes orphaned layer files from previous builds', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-cleanup-test-'));

    try {
      const outputDir = path.join(tempRoot, 'data');

      // First build to establish baseline
      await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      // Verify accordion layer files exist
      const accordionFullDir = path.join(
        outputDir,
        'layers',
        'full',
        'component',
        'component:syn-accordion',
      );
      const originalAccordionFiles = await readdir(accordionFullDir, { recursive: true });
      expect(originalAccordionFiles.length).to.be.greaterThan(0);

      // Simulate orphaned file from previous build:
      // Create a fake old CSS file that doesn't exist in current source
      const orphanedFile = path.join(accordionFullDir, 'old.css');
      await mkdir(path.dirname(orphanedFile), { recursive: true });
      await writeFile(orphanedFile, '/* orphaned file */');

      // Verify the orphaned file exists
      await access(orphanedFile);

      // Run another build - cleanup should remove the orphaned file
      await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      // Orphaned file should be gone
      try {
        await access(orphanedFile);
        throw new Error('Orphaned file should have been removed by cleanup');
      } catch (error) {
        // Expected: ENOENT
        if ((error).code !== 'ENOENT') {
          throw error;
        }
      }
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  });

  it('removes orphaned entity files from data/core/', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-cleanup-test-'));

    try {
      const outputDir = path.join(tempRoot, 'data');

      // First build
      await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      // Verify initial entities exist
      const componentDir = path.join(outputDir, 'core', 'component');
      const initialFiles = await readdir(componentDir);
      expect(initialFiles.length).to.be.greaterThan(0);

      // Simulate orphaned entity file from previous build
      const orphanedEntityPath = path.join(
        outputDir,
        'core',
        'component',
        'component:orphaned-old-component.json',
      );
      await mkdir(path.dirname(orphanedEntityPath), { recursive: true });
      await writeFile(orphanedEntityPath, JSON.stringify({ id: 'orphaned' }));

      // Verify orphaned entity file exists
      await access(orphanedEntityPath);

      // Run another build - cleanup should remove the orphaned entity
      await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      // Orphaned entity file should be gone
      try {
        await access(orphanedEntityPath);
        throw new Error('Orphaned entity file should have been removed by cleanup');
      } catch (error) {
        // Expected: ENOENT
        if ((error).code !== 'ENOENT') {
          throw error;
        }
      }
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  });

  it('preserves .gitkeep files during cleanup', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-cleanup-test-'));

    try {
      const outputDir = path.join(tempRoot, 'data');

      // First build
      await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      // Create .gitkeep files in various places (as they would exist in the repo)
      const gitKeepPaths = [
        path.join(outputDir, 'core', 'template', '.gitkeep'),
        path.join(outputDir, 'layers', 'examples', '.gitkeep'),
      ];

      for (const gitKeepPath of gitKeepPaths) {
        await mkdir(path.dirname(gitKeepPath), { recursive: true });
        await writeFile(gitKeepPath, '');
      }

      // Verify .gitkeep files exist
      for (const gitKeepPath of gitKeepPaths) {
        await access(gitKeepPath);
      }

      // Run build - cleanup should not remove .gitkeep files
      await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      // .gitkeep files should still exist
      for (const gitKeepPath of gitKeepPaths) {
        await access(gitKeepPath);
      }
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  });

  it('preserves essential artifacts (index.json, manifest.json)', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-cleanup-test-'));

    try {
      const outputDir = path.join(tempRoot, 'data');

      // First build
      const firstBuild = await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      expect(firstBuild.exitCode).to.equal(0);

      // Verify essential artifacts exist
      const indexPath = path.join(outputDir, 'index.json');
      const manifestPath = path.join(outputDir, 'manifest.json');

      await access(indexPath);
      await access(manifestPath);

      // Verify schemas directory exists and is never touched by cleanup
      const schemasDir = path.join(outputDir, 'schemas');
      await access(schemasDir);

      // Run another build
      const secondBuild = await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      expect(secondBuild.exitCode).to.equal(0);

      // Essential artifacts should still exist
      await access(indexPath);
      await access(manifestPath);
      await access(schemasDir);
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  });

  it('keeps template examples and template entities on plain build when examples already exist', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-cleanup-test-'));

    try {
      const outputDir = path.join(tempRoot, 'data');
      const templateExamplesDir = path.join(outputDir, 'layers', 'examples', 'template');
      const templateExamplePath = path.join(templateExamplesDir, 'template:appshell.md');

      // Simulate artifacts created by a previous build:all run.
      await mkdir(templateExamplesDir, { recursive: true });
      await writeFile(templateExamplePath, '# appshell template example\n', 'utf8');

      // Run plain build (storybook scraper disabled).
      await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      const templateCorePath = path.join(
        outputDir,
        'core',
        'template',
        'template:appshell.json',
      );

      // Example file should not be removed by cleanup.
      await access(templateExamplePath);
      // Template entity should be regenerated from existing examples layer.
      await access(templateCorePath);

      const templateCoreJson = JSON.parse(await readFile(templateCorePath, 'utf8'));
      expect(templateCoreJson.id).to.equal('template:appshell');
      expect(templateCoreJson.layers.examples[0].path).to.equal('layers/examples/template/template:appshell.md');
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  });
});
