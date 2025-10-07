/**
 * The reason why a changeset was created
 */
export type ChangesetReason = 'NO_FILES_CHANGED' | 'NO_PACKAGES_CHANGED' | 'PACKAGES_CHANGED';

/**
 * The type of version bump to apply
 */
export type BumpType = 'major' | 'minor' | 'patch' | 'none';

/**
 * A changeset object
 */
export interface Changeset {
  reason: ChangesetReason;
  changedPackages?: string[];
}

/**
 * Information about a changeset derived from git
 */
export type GitInformation = {
  branchName: string;
  bumpType: BumpType;
  fileName: string;
};
