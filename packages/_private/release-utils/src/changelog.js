import githubChangelog from '@changesets/changelog-github';

/**
 * @typedef {import('@changesets/types').ChangelogFunctions} ChangelogFunctions
 */

/**
 * @type ChangelogFunctions
 */
const synergyChangelog = {
  getDependencyReleaseLine: githubChangelog.getDependencyReleaseLine,
  getReleaseLine: async (
    changeset,
    type,
    options,
  ) => {
    // We have to alter the summary to make sure the date is included
    const copyWithDate = { ...changeset };

    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);

    const lines = changeset.summary.split('\n');
    if (lines[0].trim() !== '') {
      lines.unshift(`Released on: ${formattedDate}`, '');
    }

    copyWithDate.summary = lines.join('\n');

    const originalVersion = await githubChangelog.getReleaseLine(copyWithDate, type, options);
    return originalVersion;
  },
};

export default synergyChangelog;
