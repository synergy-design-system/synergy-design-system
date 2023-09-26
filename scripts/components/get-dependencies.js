import dependencyTree from 'dependency-tree';
import path from 'path';

export async function getDependencies(globs, directory) {

  const allDeps = new Set();

  // Get dependencies for each matched file
  for (const glob of globs) {
    const list = dependencyTree.toList({
      filename: directory + '/' + glob,
      directory: directory,
      filter: path => path.indexOf('node_modules') === -1,
      noTypeDefinitions: true
    });

    list.forEach(dep => {
      // Convert the absolute path to a relative one
      const relativePath = path.relative(directory, dep).replace('../', '');
      allDeps.add(relativePath);
    });
  }

  return Array.from(allDeps);
}
