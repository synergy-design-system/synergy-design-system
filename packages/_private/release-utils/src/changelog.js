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

    // Append date to the first line
    const lines = changeset.summary.split('\n');
    if (lines[0].trim() !== '') {
      lines[0] = `Released on: ${formattedDate} ${lines[0]}`;
    }

    copyWithDate.summary = lines.join('\n');

    const originalVersion = await githubChangelog.getReleaseLine(copyWithDate, type, options);
    return originalVersion;
  },
};

export default synergyChangelog;
