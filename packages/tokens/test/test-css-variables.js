/**
 * Test script to compare CSS variables between built and reference files
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const directory = dirname(filename);

// Paths to the files to compare
const BUILT_CSS_PATH = join(directory, '../dist/themes/light.css');
const REFERENCE_CSS_PATH = join(directory, '../test/light.css');

/**
 * Extract CSS variables from a CSS file content
 * @param {string} cssContent - The CSS file content
 * @returns {Map<string, string>} Map of variable names to their values
 */
function extractCSSVariables(cssContent) {
  /** @type {Map<string, string>} */
  const variables = new Map();
  const cssVariableRegex = /--([^:]+):\s*([^;]+);/g;

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = cssVariableRegex.exec(cssContent)) !== null) {
    const variableName = `--${match[1].trim()}`;
    const variableValue = match[2].trim().toLowerCase();
    variables.set(variableName, variableValue);
  }
  return variables;
}

/**
 * Compare CSS variables and find differences
 * @param {Map<string, string>} builtVars - Variables from built file
 * @param {Map<string, string>} refVars - Variables from reference file
 * @returns {{
 * different: Array<{name: string, built: string, reference: string | undefined}> ,
 * missing: Array<{name: string, value: string}>,
 * extra: Array<{name: string, value: string}>,
 * success: boolean
 * }} Comparison results
 */
function compareVariables(builtVars, refVars) {
  /** @type {Array<{name: string, value: string}>}} */
  const missing = [];
  /** @type {Array<{name: string, value: string}>} */
  const extra = [];
  /** @type {Array<{name: string, built: string, reference: string | undefined}>} */
  const different = [];

  // Find missing variables
  refVars.forEach((value, name) => {
    if (!builtVars.has(name)) {
      missing.push({ name, value });
    }
  });

  // Find extra and different variables
  builtVars.forEach((builtValue, name) => {
    if (!refVars.has(name)) {
      extra.push({ name, value: builtValue });
    } else {
      const refValue = refVars.get(name);
      if (builtValue !== refValue) {
        different.push({ built: builtValue, name, reference: refValue });
      }
    }
  });

  return {
    different,
    extra,
    missing,
    success: missing.length === 0 && extra.length === 0 && different.length === 0,
  };
}

/**
 * Log comparison results to console
 * @param {{
 * different: Array<{name: string, built: string, reference: string | undefined}> ,
 * missing: Array<{name: string, value: string}>,
 * extra: Array<{name: string, value: string}>,
 * success: boolean
 * }} results - Comparison results
 */
function logResults(results) {
  if (results.missing.length > 0) {
    console.log(`\n🚫 Variables missing in built file (${results.missing.length}):`);
    results.missing.forEach(({ name, value }) => {
      console.log(`   ${name}: ${value}`);
    });
  }

  if (results.extra.length > 0) {
    console.log(`\n➕ Extra variables in built file (${results.extra.length}):`);
    results.extra.forEach(({ name, value }) => {
      console.log(`   ${name}: ${value}`);
    });
  }

  if (results.different.length > 0) {
    console.log(`\n🔄 Variables with different values (${results.different.length}):`);
    results.different.forEach(({ built, name, reference }) => {
      console.log(`\n   ${name}:`);
      console.log(`     Built:     ${built}`);
      console.log(`     Reference: ${reference}`);
    });
  }
}

/**
 * Main test function
 */
function runTest() {
  console.log('🧪 Testing CSS variables consistency...\n');

  try {
    console.log(`📖 Reading built CSS: ${BUILT_CSS_PATH}`);
    const builtCSS = readFileSync(BUILT_CSS_PATH, 'utf8');
    console.log(`📖 Reading reference CSS: ${REFERENCE_CSS_PATH}`);
    const referenceCSS = readFileSync(REFERENCE_CSS_PATH, 'utf8');

    console.log('\n🔍 Extracting CSS variables...');
    const builtVars = extractCSSVariables(builtCSS);
    const refVars = extractCSSVariables(referenceCSS);

    console.log(`   Built: ${builtVars.size} variables`);
    console.log(`   Reference: ${refVars.size} variables`);

    console.log('\n⚖️  Comparing variables...');
    const results = compareVariables(builtVars, refVars);

    if (results.success) {
      console.log('✅ All CSS variables match! Test passed.');
      process.exit(0);
    } else {
      console.log('❌ CSS variables do not match! Test failed.\n');
      logResults(results);
      process.exit(1);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('💥 Test failed:', message);
    process.exit(1);
  }
}

runTest();
