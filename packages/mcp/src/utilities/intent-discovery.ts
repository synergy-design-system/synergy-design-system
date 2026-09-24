import {
  type IntentDefinition,
  type IntentPhase,
  getIntentCategory,
  listIntentCategories,
  listIntents,
} from '@synergy-design-system/metadata';

export type IntentDiscoveryResult =
  | {
    categories: Array<{ description: string; id: string; phase?: IntentPhase }>;
    level: 'categories';
  }
  | {
    category: { description: string; id: string; phase?: IntentPhase };
    intents: IntentDefinition[];
    level: 'intents';
  };

export type IntentRecoveryResult = {
  availableCategoryIds?: string[];
  availableIntentIds?: string[];
  error: string;
  recovery: {
    arguments: { category?: string };
    tool: 'intent-discover';
  };
  submittedIntentId: string;
  validationPerformed: false;
};

const sortById = <T extends { id: string }>(values: T[]): T[] => values.toSorted(
  (left, right) => left.id.localeCompare(right.id),
);

export const getIntentCategoryPrefix = (intentId: string): string => intentId
  .trim()
  .split('.', 1)[0]
  ?.toLowerCase() ?? '';

export const discoverIntents = async (
  category: string | undefined,
  includePhases: IntentPhase[],
): Promise<IntentDiscoveryResult> => {
  if (!category) {
    const response = await listIntentCategories({}, { includePhases });
    return {
      categories: sortById(response.data),
      level: 'categories',
    };
  }

  const categoryResponse = await getIntentCategory(category, { includePhases });
  if (!categoryResponse.data) {
    const categories = await discoverIntents(undefined, includePhases);
    const availableCategoryIds = categories.level === 'categories'
      ? categories.categories.map((entry) => entry.id)
      : [];
    throw new Error(`Unknown intent category "${category}". Available categories: ${availableCategoryIds.join(', ')}.`);
  }

  const intentsResponse = await listIntents({
    category: categoryResponse.data.id,
    includePhases,
  });

  return {
    category: categoryResponse.data,
    intents: sortById(intentsResponse.data),
    level: 'intents',
  };
};

export const buildIntentRecovery = async (
  submittedIntentId: string,
  error: string,
  includePhases: IntentPhase[],
): Promise<IntentRecoveryResult> => {
  const categoryId = getIntentCategoryPrefix(submittedIntentId);
  const categories = await discoverIntents(undefined, includePhases);
  const availableCategories = categories.level === 'categories' ? categories.categories : [];
  const knownCategory = availableCategories.find((category) => category.id === categoryId);

  // Recovery stays namespace-based so the server never silently infers user intent.
  if (knownCategory) {
    const discovery = await discoverIntents(knownCategory.id, includePhases);
    return {
      availableIntentIds: discovery.level === 'intents'
        ? discovery.intents.map((intent) => intent.id)
        : [],
      error,
      recovery: {
        arguments: { category: knownCategory.id },
        tool: 'intent-discover',
      },
      submittedIntentId,
      validationPerformed: false,
    };
  }

  return {
    availableCategoryIds: availableCategories.map((category) => category.id),
    error,
    recovery: {
      arguments: {},
      tool: 'intent-discover',
    },
    submittedIntentId,
    validationPerformed: false,
  };
};
