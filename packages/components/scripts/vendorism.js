import { eject, setTarget, setSource } from 'vendorism';

const config = {
  source: {
    url: "https://github.com/shoelace-style/shoelace/archive/refs/tags/v2.6.0.tar.gz",
    path: "./vendor",
    hooks: {
      before: "echo ⌛️ Setting up source...",
      after: "echo ✅ Source setup complete.",
    },
    downloadConfig: {extract: true, strip: 1}
  },
  target: {
    path: ".",
    includes: [
      'src/components/input/**'
    ],
    hooks: {
      before: "echo ⌛️ Setting up target...",
      after: "echo ✅ Target setup complete.",
    },
    transforms: [
      // Remove Shoelace branding
      (path, content) => {
        const libraryPrefix = 'sds';
        const libraryName = 'sick';
        const capitalizedPrefix = `${libraryPrefix.charAt(0).toUpperCase()}${libraryPrefix.slice(1)}`;
        const capitalizedLibraryName = `${libraryName.charAt(0).toUpperCase()}${libraryName.slice(1)}`;
        const lowerLibraryName = libraryName.toLowerCase();
        const libraryDesignName = `${lowerLibraryName}-design-system`;

        const regexPattern = new RegExp(`@${libraryDesignName}/(?!${lowerLibraryName}$)`, 'g');

        let modifiedContent = content
            .replace(/Sl(?=[A-Z])/g, capitalizedPrefix)
            .replace(/(?<![A-Za-z])sl-/g, `${libraryPrefix}-`)
            .replace(/shoelace-style/g, libraryDesignName)
            .replace(/Shoelace/g, capitalizedLibraryName)
            .replace(/shoelace/g, lowerLibraryName)
            .replace('__SHOELACE_VERSION__', '__PACKAGE_VERSION__')
            .replace(regexPattern, '@shoelace-style/');
        return {path, content: modifiedContent};
      }
    ]
  },
}

// await setSource(config);

await setTarget(config);

process.exit();
