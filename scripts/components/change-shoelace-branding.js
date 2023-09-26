import fs from 'fs';
import path from 'path';

function replaceContent(content, libraryName, libraryPrefix) {
  const capitalizedPrefix = `${libraryPrefix.charAt(0).toUpperCase()}${libraryPrefix.slice(1)}`;
  const capitalizedLibraryName = `${libraryName.charAt(0).toUpperCase()}${libraryName.slice(1)}`;
  const lowerLibraryName = libraryName.toLowerCase();
  const libraryDesignName = `${lowerLibraryName}-design-system`;

  content = content
    .replace(/Sl(?=[A-Z])/g, capitalizedPrefix)
    .replace(/(?<![A-Za-z])sl-/g, `${libraryPrefix}-`)
    .replace(/shoelace-style/g, libraryDesignName)
    .replace(/Shoelace/g, capitalizedLibraryName)
    .replace(/shoelace/g, lowerLibraryName)
    .replace('__SHOELACE_VERSION__', '__PACKAGE_VERSION__');

  const regexPattern = new RegExp(`@${libraryDesignName}/(?!${lowerLibraryName}$)`, 'g');
  return content.replace(regexPattern, '@shoelace-style/');
}

export function changeShoelaceBranding(directory, libraryName, libraryPrefix) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      changeShoelaceBranding(fullPath, libraryName, libraryPrefix);
      fs.renameSync(fullPath, replaceContent(fullPath, libraryName, libraryPrefix));
    } else {
      fs.writeFileSync(fullPath, replaceContent(fs.readFileSync(fullPath, 'utf-8'), libraryName, libraryPrefix));
      fs.renameSync(fullPath, replaceContent(fullPath, libraryName, libraryPrefix));
    }
  });
}
