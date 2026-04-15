import {
  mkdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  type TiktokenEncoding,
  get_encoding as getEncoding,
} from 'tiktoken';
import { createClientSession } from '../utilities/harness.ts';
import { toToolResponse } from '../utilities/assertions.ts';
import type { WatermarkScenario } from './scenarios.ts';
import { WATERMARK_SCENARIOS } from './scenarios.ts';

type BaselineEntry = {
  id: string;
  tokens: number;
};

type BaselineFile = {
  encoding: string;
  generatedAt: string;
  source: string;
  version: 1;
  watermarks: BaselineEntry[];
};

type ScenarioResult = {
  baselineTokens?: number;
  chars: number;
  deltaPct?: number;
  id: string;
  toolName: string;
  tokens: number;
};

type CliOptions = {
  baselinePath: string;
  failOnRegression: boolean;
  writeBaseline: boolean;
};

const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);
const packageRoot = resolve(currentDir, '../..');

const DEFAULT_BASELINE_PATH = resolve(packageRoot, 'test/watermarks/baseline.latest-release.json');
const ENCODING: TiktokenEncoding = 'o200k_base';

const parseArgs = (argv: string[]): CliOptions => {
  const baselineIndex = argv.indexOf('--baseline');
  const baselinePath = baselineIndex >= 0 && argv[baselineIndex + 1]
    ? resolve(packageRoot, argv[baselineIndex + 1])
    : DEFAULT_BASELINE_PATH;

  return {
    baselinePath,
    failOnRegression: argv.includes('--fail-on-regression'),
    writeBaseline: argv.includes('--write-baseline'),
  };
};

const loadBaseline = async (baselinePath: string): Promise<Map<string, number> | undefined> => {
  try {
    const raw = await readFile(baselinePath, 'utf8');
    const parsed = JSON.parse(raw) as BaselineFile;
    if (!Array.isArray(parsed.watermarks)) {
      return undefined;
    }

    return new Map(parsed.watermarks.map((entry) => [entry.id, entry.tokens]));
  } catch {
    return undefined;
  }
};

const createRuntimeConfig = async (): Promise<string> => {
  const dir = await mkdir(join(tmpdir(), `synergy-mcp-watermark-${Date.now()}`), { recursive: true });
  const configPath = join(dir!, 'synergy-mcp.json');
  await writeFile(configPath, JSON.stringify({ includeAiRules: false }), 'utf8');
  return configPath;
};

const executeScenario = async (
  scenario: WatermarkScenario,
  encode: (value: string) => number,
  configPath: string,
): Promise<ScenarioResult> => {
  const session = await createClientSession({ configPath });

  try {
    const response = await session.client.callTool({
      arguments: scenario.args,
      name: scenario.toolName,
    });

    const typed = toToolResponse(response);
    const textPayload = typed.content
      .filter((entry) => entry.type === 'text')
      .map((entry) => entry.text)
      .join('\n\n');

    return {
      chars: textPayload.length,
      id: scenario.id,
      tokens: encode(textPayload),
      toolName: scenario.toolName,
    };
  } finally {
    await session.close();
  }
};

const exceedsBudget = (
  scenario: WatermarkScenario,
  result: ScenarioResult,
): { reason?: string } => {
  if (result.tokens > scenario.budget.maxTokens) {
    return {
      reason: `Watermark for maximum token count exceeded (Current: ${result.tokens}, Budget: ${scenario.budget.maxTokens})`,
    };
  }

  if (result.baselineTokens === undefined || result.baselineTokens <= 0) {
    return {};
  }

  const deltaAbs = result.tokens - result.baselineTokens;
  const deltaPct = ((deltaAbs / result.baselineTokens) * 100);
  if (deltaAbs > scenario.budget.maxRegressionAbs) {
    return {
      reason: `Watermark for absolute token regression exceeded (Baseline: ${result.baselineTokens}, Current: ${result.tokens}, Delta: ${deltaAbs}, Budget: ${scenario.budget.maxRegressionAbs})`,
    };
  }

  if (deltaPct > scenario.budget.maxRegressionPct) {
    return {
      reason: `Watermark for percentage token regression exceeded (Baseline: ${result.baselineTokens}, Current: ${result.tokens}, Delta: ${deltaPct.toFixed(2)}%, Budget: ${scenario.budget.maxRegressionPct}%)`,
    };
  }

  return {};
};

const writeBaseline = async (baselinePath: string, results: ScenarioResult[]) => {
  const payload: BaselineFile = {
    encoding: ENCODING,
    generatedAt: new Date().toISOString(),
    source: 'current-worktree',
    version: 1,
    watermarks: results.map((result) => ({
      id: result.id,
      tokens: result.tokens,
    })),
  };

  await mkdir(dirname(baselinePath), { recursive: true });
  await writeFile(baselinePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
};

const printReport = (results: ScenarioResult[]) => {
  process.stdout.write('Token watermark report\n');
  process.stdout.write('---------------------------------------------------------------\n');
  process.stdout.write('scenario | tokens | baseline | delta% | chars\n');
  process.stdout.write('---------------------------------------------------------------\n');

  results.forEach((result) => {
    const baseline = result.baselineTokens !== undefined ? String(result.baselineTokens) : '-';
    const delta = result.deltaPct !== undefined ? `${result.deltaPct.toFixed(2)}%` : '-';
    process.stdout.write(`${result.id} | ${result.tokens} | ${baseline} | ${delta} | ${result.chars}\n`);
  });

  process.stdout.write('---------------------------------------------------------------\n');
};

const main = async () => {
  const options = parseArgs(process.argv.slice(2));
  const baseline = await loadBaseline(options.baselinePath);
  const configPath = await createRuntimeConfig();
  const encoding = getEncoding(ENCODING);

  try {
    const encode = (value: string) => encoding.encode(value).length;
    const results: ScenarioResult[] = [];
    const failures: Array<{ id: string; reason: string }> = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const scenario of WATERMARK_SCENARIOS) {
      // eslint-disable-next-line no-await-in-loop
      const result = await executeScenario(scenario, encode, configPath);
      const baselineTokens = baseline?.get(scenario.id);
      const deltaPct = baselineTokens && baselineTokens > 0
        ? ((result.tokens - baselineTokens) / baselineTokens) * 100
        : undefined;

      const enriched: ScenarioResult = {
        ...result,
        baselineTokens,
        deltaPct,
      };

      results.push(enriched);

      if (options.failOnRegression) {
        const budgetCheck = exceedsBudget(scenario, enriched);
        if (budgetCheck.reason) {
          failures.push({
            id: scenario.id,
            reason: budgetCheck.reason,
          });
        }
      }
    }

    printReport(results);

    if (!baseline) {
      process.stdout.write(`No baseline file found at ${options.baselinePath}. Running in report-only mode.\n`);
    }

    if (options.writeBaseline) {
      await writeBaseline(options.baselinePath, results);
      process.stdout.write(`Wrote baseline file: ${options.baselinePath}\n`);
    }

    if (failures.length > 0) {
      process.stdout.write('Watermark budget failures:\n');
      failures.forEach((failure) => {
        process.stdout.write(`- ${failure.id}: ${failure.reason}\n`);
      });
      process.exit(1);
    }
  } finally {
    encoding.free();
    await rm(dirname(configPath), { force: true, recursive: true });
  }
};

main();
