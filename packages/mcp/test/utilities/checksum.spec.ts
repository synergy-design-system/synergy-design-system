import {
  mkdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  createFolderChecksum,
  getFolderChecksum,
  verifyFolderChecksum,
} from '../../src/utilities/checksum.js';

describe('checksum utilities', () => {
  let testDir: string;

  beforeEach(async () => {
    // Create a temporary directory for testing
    testDir = join(tmpdir(), `checksum-test-${Date.now()}`);
    await mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    // Clean up test directory
    try {
      await rm(testDir, { recursive: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  describe('createFolderChecksum', () => {
    it('should create a checksum for folder contents', async () => {
      // Create test files
      await writeFile(join(testDir, 'file1.txt'), 'content1');
      await writeFile(join(testDir, 'file2.txt'), 'content2');

      const checksum = await createFolderChecksum(testDir);

      expect(typeof checksum).toBe('string');
      expect(checksum).toHaveLength(32); // MD5 hash length
    });

    it('should exclude specified patterns', async () => {
      // Create test files including ones that should be excluded
      await writeFile(join(testDir, 'file1.txt'), 'content1');
      await writeFile(join(testDir, '.hidden'), 'hidden');
      await writeFile(join(testDir, 'checksum.txt'), 'old-checksum');

      const checksum = await createFolderChecksum(testDir, {
        excludePatterns: ['.*', 'checksum.txt'],
      });

      expect(typeof checksum).toBe('string');
      expect(checksum).toHaveLength(32);
    });

    it('should use different algorithms', async () => {
      await writeFile(join(testDir, 'file1.txt'), 'content1');

      const md5Checksum = await createFolderChecksum(testDir, { algorithm: 'md5' });
      const sha256Checksum = await createFolderChecksum(testDir, { algorithm: 'sha256' });

      expect(md5Checksum).toHaveLength(32);
      expect(sha256Checksum).toHaveLength(64);
      expect(md5Checksum).not.toBe(sha256Checksum);
    });
  });

  describe('verifyFolderChecksum', () => {
    it('should verify matching checksums', async () => {
      await writeFile(join(testDir, 'file1.txt'), 'content1');

      // Create checksum
      await createFolderChecksum(testDir);

      // Verify it matches
      const isValid = await verifyFolderChecksum(testDir);
      expect(isValid).toBe(true);
    });

    it('should detect mismatched checksums', async () => {
      await writeFile(join(testDir, 'file1.txt'), 'content1');

      // Create checksum
      await createFolderChecksum(testDir);

      // Modify file content
      await writeFile(join(testDir, 'file1.txt'), 'modified-content');

      // Verify should fail
      const isValid = await verifyFolderChecksum(testDir);
      expect(isValid).toBe(false);
    });
  });

  describe('getFolderChecksum', () => {
    it('should return checksum without writing file', async () => {
      await writeFile(join(testDir, 'file1.txt'), 'content1');

      const checksum = await getFolderChecksum(testDir);

      expect(typeof checksum).toBe('string');
      expect(checksum).toHaveLength(32);

      // Verify no checksum file was created by checking if the file exists
      const { access } = await import('node:fs/promises');
      let checksumFileExists = false;
      try {
        await access(join(testDir, 'checksum.txt'));
        checksumFileExists = true;
      } catch {
        // File doesn't exist, which is what we expect
        checksumFileExists = false;
      }
      expect(checksumFileExists).toBe(false);
    });
  });
});
