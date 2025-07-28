import { getPackageInfo, getVersion } from '../../src/utilities/version.js';

describe('when using the version utilities', () => {
  describe('getPackageInfo', () => {
    it('should return package.json information', () => {
      const packageInfo = getPackageInfo();

      expect(packageInfo).toBeDefined();
      expect(packageInfo.name).toBe('@synergy-design-system/mcp');
      expect(packageInfo.version).toBeDefined();
      expect(packageInfo.description).toBe('MCP Server for the Synergy Design System');
      expect(packageInfo.author).toBeDefined();
      expect(packageInfo.author.name).toBe('SICK Global UX Foundation');
    });

    it('should have required package.json fields', () => {
      const packageInfo = getPackageInfo();

      expect(packageInfo).toHaveProperty('name');
      expect(packageInfo).toHaveProperty('version');
      expect(packageInfo).toHaveProperty('description');
      expect(packageInfo).toHaveProperty('author');
      expect(packageInfo).toHaveProperty('repository');
      expect(packageInfo).toHaveProperty('license');
    });
  });

  describe('getVersion', () => {
    it('should return the current version string', () => {
      const version = getVersion();

      expect(version).toBeDefined();
      expect(typeof version).toBe('string');
      expect(version).toMatch(/^\d+\.\d+\.\d+$/); // Semantic versioning pattern
    });

    it('should match the version from getPackageInfo', () => {
      const packageInfo = getPackageInfo();
      const version = getVersion();

      expect(version).toBe(packageInfo.version);
    });
  });
});
