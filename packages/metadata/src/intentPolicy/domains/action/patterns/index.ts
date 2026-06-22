import type { IntentUsagePattern } from '../../../types.js';
import { actionGroupedPattern } from './grouped.js';
import { actionIconPattern } from './icon.js';
import { actionNavigationPattern } from './navigation.js';
import { actionPrimaryPattern } from './primary.js';
import { actionResetPattern } from './reset.js';
import { actionSubmitPattern } from './submit.js';

export const actionPatterns: IntentUsagePattern[] = [
  actionPrimaryPattern,
  actionSubmitPattern,
  actionResetPattern,
  actionNavigationPattern,
  actionIconPattern,
  actionGroupedPattern,
];
