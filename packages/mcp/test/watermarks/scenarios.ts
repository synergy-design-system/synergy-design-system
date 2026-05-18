/**
 * Defines the scenarios for watermark testing
 */
export type WatermarkBudget = {
  /**
   * The maximum absolute regression in token count allowed compared to the baseline.
   * If the current token count exceeds the baseline by more than this amount, the test should be considered a failure.
   */
  maxRegressionAbs: number;

  /**
   * The maximum percentage regression in token count allowed compared to the baseline.
   * This is calculated as (currentTokens - baselineTokens) / baselineTokens * 100.
   * If the current token count exceeds the baseline by more than this percentage, the test should be considered a failure.
   */
  maxRegressionPct: number;

  /**
   * The maximum total token count allowed for the scenario.
   * If the current token count exceeds this amount, the test should be considered a failure regardless of the baseline.
   */
  maxTokens: number;
};

/**
 * Defines a single scenario for watermark testing, including the arguments to be passed to the tool and the budget constraints for token counts.
 */
export type WatermarkScenario = {
  /**
   * The arguments to be passed to the tool when executing this scenario.
   * This is a generic record that can contain any key-value pairs relevant to the specific tool being tested.
   */
  args: Record<string, unknown>;

  /**
   * The budget constraints for this scenario, defining the acceptable limits for token counts and regressions compared to a baseline.
   */
  budget: WatermarkBudget;

  /**
   * A unique identifier for this scenario, used for reporting and comparison against baseline results.
   * It should be descriptive enough to indicate the purpose of the scenario and the tool being tested.
   */
  id: string;

  /**
   * The name of the tool to be tested in this scenario.
   * This should correspond to a valid tool name that the MCP server recognizes and can execute with the provided arguments.
   */
  toolName: string;
};

export const WATERMARK_SCENARIOS: WatermarkScenario[] = [
  {
    args: {
      component: 'syn-button',
      framework: 'vanilla',
      layer: 'interface',
    },
    budget: {
      maxRegressionAbs: 400,
      maxRegressionPct: 20,
      maxTokens: 3200,
    },
    id: 'component-info:interface:syn-button',
    toolName: 'component-info',
  },
  {
    args: {
      component: 'syn-button',
      framework: 'vanilla',
      layer: 'examples',
    },
    budget: {
      maxRegressionAbs: 500,
      maxRegressionPct: 20,
      maxTokens: 4200,
    },
    id: 'component-info:examples:syn-button',
    toolName: 'component-info',
  },
  {
    args: {
      component: 'syn-button',
      framework: 'vanilla',
      layer: 'full',
    },
    budget: {
      maxRegressionAbs: 800,
      maxRegressionPct: 25,
      maxTokens: 10000,
    },
    id: 'component-info:full:syn-button',
    toolName: 'component-info',
  },
  {
    args: {
      component: 'syn-divider',
      framework: 'vanilla',
      layer: 'interface',
    },
    budget: {
      maxRegressionAbs: 250,
      maxRegressionPct: 20,
      maxTokens: 1800,
    },
    id: 'component-info:interface:syn-divider',
    toolName: 'component-info',
  },
  {
    args: {
      component: 'syn-input',
      framework: 'vanilla',
      layer: 'interface',
    },
    budget: {
      maxRegressionAbs: 450,
      maxRegressionPct: 20,
      maxTokens: 5200,
    },
    id: 'component-info:interface:syn-input',
    toolName: 'component-info',
  },
  {
    args: {
      component: 'syn-combobox',
      framework: 'vanilla',
      layer: 'interface',
    },
    budget: {
      maxRegressionAbs: 600,
      maxRegressionPct: 20,
      maxTokens: 7000,
    },
    id: 'component-info:interface:syn-combobox',
    toolName: 'component-info',
  },
  {
    args: {
      style: 'syn-body',
    },
    budget: {
      maxRegressionAbs: 250,
      maxRegressionPct: 20,
      maxTokens: 2200,
    },
    id: 'styles-info:syn-body',
    toolName: 'styles-info',
  },
  {
    args: {
      template: 'Appshell',
    },
    budget: {
      maxRegressionAbs: 500,
      maxRegressionPct: 20,
      maxTokens: 18000,
    },
    id: 'template-info:appshell',
    toolName: 'template-info',
  },
  {
    args: {
      filename: 'index.md',
      synergyPackage: 'components',
    },
    budget: {
      maxRegressionAbs: 350,
      maxRegressionPct: 20,
      maxTokens: 3000,
    },
    id: 'migration-info:components:index.md',
    toolName: 'migration-info',
  },
  {
    args: {
      filter: 'home',
      iconset: 'current',
      limit: 20,
    },
    budget: {
      maxRegressionAbs: 180,
      maxRegressionPct: 20,
      maxTokens: 1700,
    },
    id: 'asset-info:current:home',
    toolName: 'asset-info',
  },
  {
    args: {
      theme: 'sick2025-light',
      type: 'css',
    },
    budget: {
      maxRegressionAbs: 700,
      maxRegressionPct: 20,
      maxTokens: 12000,
    },
    id: 'token-info:css:sick2025-light',
    toolName: 'token-info',
  },
];
