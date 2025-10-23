/* eslint-disable prefer-template */
import fs from 'node:fs';

/**
 * Extract the version from the header.
 * @param {string} header The header to parse
 * @returns {string|null} The extracted version or null if not found
 */
function extractVersion(header) {
  // Matches: # [@synergy-design-system/<pkg>-v1.7.1](...)
  // or # [@synergy-design-system/<pkg>-v2.47.2](...)
  // or # [@synergy-design-system/<pkg>@1.7.1](...)
  const match = header.match(/@synergy-design-system\/[a-zA-Z0-9-]+[-@]v?([\d.]+)/i);
  return match ? match[1] : null;
}

/**
 * Extract the date from the header.
 * @param {string} header The header to parse
 * @returns {string|null} The extracted date or null if not found
 */
function extractDate(header) {
  // Matches: (...)(2025-10-08)
  const match = header.match(/\((\d{4}-\d{2}-\d{2})\)/);
  return match ? match[1] : null;
}

/**
 * Convert an entry to the new format.
 * @param {string|null} version The version number
 * @param {string|null} date The found date
 * @param {string} type The type header
 * @param {string[]} lines The entry lines
 * @returns {string}
 */
function convertEntry(version, date, type, lines) {
  let section = '';
  let changeType = '';
  if (/feature/i.test(type)) changeType = 'Minor Changes';
  else if (/bug/i.test(type)) changeType = 'Patch Changes';
  else changeType = 'Other Changes';

  // Convert each line
  const converted = lines.map(line => {
    // Example: - ✨ CD update for syn-divider, syn-tag, syn-accordion, syn-details ([#1028](...)) ([b43a81a](...))
    const issueMatch = line.match(/\[#(\d+)\]\(([^)]+)\)/);
    const commitMatch = line.match(/\((https:\/\/github\.com\/[^\s)]+)\)/g);
    const commitUrl = commitMatch ? commitMatch[commitMatch.length - 1].replace(/[()]/g, '') : null;
    const emojiDescMatch = line.match(/- ([^([#]+)(?:\(|\[)/);
    const description = emojiDescMatch ? emojiDescMatch[1].trim() : line.replace(/^- /, '').trim();

    let entry = '- ';
    if (issueMatch) entry += `[${issueMatch[0]}]`;
    if (commitUrl) entry += ` [\`${commitUrl.split('/').pop()}\`](${commitUrl})`;
    entry += ` – ${description}`;
    return entry;
  }).join('\n');

  section += `## ${version}\n\n### ${changeType}\n\n${converted}\n`;
  return section;
}

/**
 * Convert the changelog content from old to new format
 * @param {string} content The changelog content
 * @returns {string} The converted content
 */
// eslint-disable-next-line complexity
function convertChangelog(content) {
  const lines = content.split('\n');
  let output = '';
  let i = 0;

  // Copy everything before the first old entry
  while (i < lines.length && !lines[i].startsWith('# [@synergy-design-system')) {
    output += lines[i] + '\n';
    i += 1;
  }

  while (i < lines.length) {
    // Find header
    if (lines[i].startsWith('# [@synergy-design-system')) {
      const header = lines[i];
      const version = extractVersion(header);
      const date = extractDate(header);
      i += 1;

      // Find type section
      while (i < lines.length && lines[i].trim() === '') i += 1;
      let type = '';
      if (i < lines.length && lines[i].startsWith('###')) {
        type = lines[i];
        i += 1;
      }

      // Collect lines for this section
      const entryLines = [];
      while (i < lines.length && lines[i].startsWith('-')) {
        entryLines.push(lines[i]);
        i += 1;
      }

      // Convert and append
      output += convertEntry(version, date, type, entryLines) + '\n';
    } else {
      output += lines[i] + '\n';
      i += 1;
    }
  }

  return output;
}

// Main
if (process.argv.length < 3) {
  console.error('Usage: node convert-changelog.js <filename>');
  process.exit(1);
}

const filename = process.argv[2];
const content = fs.readFileSync(filename, 'utf8');
const converted = convertChangelog(content);
fs.writeFileSync(filename, converted, 'utf8');
console.log(`Converted changelog written to ${filename}`);
