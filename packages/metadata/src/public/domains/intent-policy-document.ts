import {
  getIntentCategory,
  getIntentOptions,
  listIntentCategories,
  listIntents,
  resolveIntent,
} from './intent-policy.js';
import type {
  FrameworkProfile,
  IntentCategory,
  IntentDefinition,
  IntentPhase,
  IntentResolutionResult,
  IntentTargetRef,
  IntentUsagePattern,
  MetadataStoreOptions,
} from '../types.js';

export type IntentPolicyDocumentOptions = {
  frameworks: readonly FrameworkProfile[];
  includePhases?: IntentPhase[];
};

export type IntentPolicyPreview = {
  framework: FrameworkProfile;
  code: string;
};

export type IntentPolicyVariant = {
  isDefault: boolean;
  pattern: IntentUsagePattern | null;
  previews: IntentPolicyPreview[];
  priority?: number;
  reason: string;
  target: IntentTargetRef;
  targetRole?: 'standalone' | 'container' | 'item';
};

export type IntentPolicyIntent = {
  intent: IntentDefinition;
  variants: IntentPolicyVariant[];
};

export type IntentPolicyDocument = {
  category: IntentCategory;
  intents: IntentPolicyIntent[];
};

const targetLabel = (target: IntentTargetRef): string => (
  target.id
  ?? (target.name ? `${target.kind}:${target.name}` : undefined)
  ?? (target.selector ? `${target.kind}:${target.selector}` : undefined)
  ?? (target.classes?.length ? `${target.kind}:.${target.classes.join('.')}` : undefined)
  ?? target.kind
);

const targetFromId = (targetId: string): IntentTargetRef => {
  const separator = targetId.indexOf(':');
  const kind = (separator >= 0 ? targetId.slice(0, separator) : 'component') as IntentTargetRef['kind'];
  return {
    id: targetId,
    kind,
  };
};

const targetRoleWeight = (targetRole?: IntentPolicyVariant['targetRole']): number => {
  switch (targetRole) {
    case 'item': return 1;
    case 'container': return 2;
    case 'standalone':
    default: return 3;
  }
};

const compareVariants = (left: IntentPolicyVariant, right: IntentPolicyVariant): number => {
  if (left.isDefault !== right.isDefault) {
    return left.isDefault ? -1 : 1;
  }

  const roleWeightDifference = targetRoleWeight(right.targetRole) - targetRoleWeight(left.targetRole);
  if (roleWeightDifference !== 0) {
    return roleWeightDifference;
  }

  const priorityDifference = (right.priority ?? 0) - (left.priority ?? 0);
  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return targetLabel(left.target).localeCompare(targetLabel(right.target));
};

export const getIntentPolicyDocument = async (
  categoryId: string,
  options: IntentPolicyDocumentOptions,
  storeOptions: MetadataStoreOptions = {},
): Promise<IntentPolicyDocument> => {
  const categoryResponse = await getIntentCategory(
    categoryId,
    { includePhases: options.includePhases },
    storeOptions,
  );
  if (!categoryResponse.data) {
    throw new Error(`Intent category "${categoryId}" is not registered.`);
  }

  const intentsResponse = await listIntents({
    category: categoryId,
    includePhases: options.includePhases,
  }, storeOptions);

  const intents = await Promise.all(intentsResponse.data.map(async (intent): Promise<IntentPolicyIntent> => {
    const frameworkResults = await Promise.all(options.frameworks.map(async (framework) => {
      const response = await getIntentOptions({
        framework,
        includePhases: options.includePhases,
        intentId: intent.id,
        maxAlternatives: 20,
      }, storeOptions);
      return [framework, response.data] as const;
    }));

    const defaultTargetIds = new Set(
      frameworkResults.flatMap(([, result]) => result?.bestDefaultTargetId ?? []),
    );
    const variantsByTarget = new Map<string, IntentPolicyVariant>();

    for (const [framework, result] of frameworkResults) {
      for (const target of result?.renderableTargets ?? []) {
        const targetRef: IntentTargetRef = {
          id: target.targetId,
          kind: target.targetId.startsWith('style:') ? 'style' : 'component',
          name: target.targetName,
        };
        const existing = variantsByTarget.get(target.targetId);
        if (existing) {
          existing.isDefault ||= defaultTargetIds.has(target.targetId);
          existing.priority = Math.max(existing.priority ?? 0, target.priority ?? 0);
          existing.targetRole ??= target.targetRole;
          existing.previews.push({ code: target.previewCode, framework });
          continue;
        }

        variantsByTarget.set(target.targetId, {
          isDefault: defaultTargetIds.has(target.targetId),
          pattern: null,
          previews: [{ code: target.previewCode, framework }],
          priority: target.priority,
          reason: target.reason,
          target: targetRef,
          targetRole: target.targetRole,
        });
      }
    }

    const variants = await Promise.all(Array.from(variantsByTarget.values()).map(async (variant) => {
      const resolution: { data?: IntentResolutionResult | null } = await resolveIntent({
        includePhases: options.includePhases,
        intent: intent.id,
        target: targetFromId(targetLabel(variant.target)),
      }, storeOptions);
      return {
        ...variant,
        pattern: resolution.data?.pattern ?? null,
      };
    }));

    return {
      intent,
      variants: variants.sort(compareVariants),
    };
  }));

  return {
    category: categoryResponse.data,
    intents,
  };
};

export const getIntentPolicyDocuments = async (
  options: IntentPolicyDocumentOptions,
  storeOptions: MetadataStoreOptions = {},
): Promise<IntentPolicyDocument[]> => {
  const categories = (await listIntentCategories(storeOptions, {
    includePhases: options.includePhases,
  })).data.toSorted((left, right) => left.id.localeCompare(right.id));

  return Promise.all(categories.map((category) => getIntentPolicyDocument(category.id, options, storeOptions)));
};
