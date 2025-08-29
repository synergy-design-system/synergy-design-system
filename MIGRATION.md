# DEVELOPER MIGRATION DOCUMENTATION

This document outlines the complete workflow for updating components in the Synergy Design System to support the new SICK 2025 theme. This process involves migrating design tokens from Figma and updating components to work with the new theme specifications. The workflow covers three main packages: Tokens, Components, and Docs.

## Quick step-by-step guide

This is just a short overview about the different steps to make. For a more detailed version, see the next heading.

### Tokens Package

1. Replace Figma branch ID in `.figmaexportrc.js` and `/scripts/figma/fetch-variables.js`
2. Run `pnpm fetch:figma` to pull new variables
3. Optionally check for new variables by commenting out `return` in `transform-tokens.js` line 158
4. Run `pnpm build:figma` to generate theme JSONs
5. Remove new variables from exclusion regex if needed (`helpers.js` line 115)
6. Revert `transform-tokens.js` changes and run `pnpm build:figma` again
7. Review JSON changes for SICK 2025 theme alignment
8. Run `pnpm build` to generate CSS files
9. Run `pnpm compare` to review CSS changes
10. Update test files in `packages/tokens/test` to match new values

### Components Package

1. Update component styles for SICK 2025 theme compatibility
2. Add fallback values for new CSS variables (e.g., `var(--new-var, fallback-value)`)
3. Create `metadata.json` file for documentation of new component CSS variables if added

### Docs Package

1. Configure Chromatic modes with `Chromatic_Modes_Sick_2025` to component story

## More detailed step-by-step guide

### 1. Tokens Package Updates

The tokens package is responsible for synchronizing design tokens from Figma and generating the corresponding CSS files for the SICK 2025 theme.

#### Step 1: Configure Figma Branch Access

Before fetching new tokens for the SICK 2025 theme, you need to configure the system to pull from the correct Figma branch where the SICK 2025 theme updates are located.

**Files to modify:**

- `.figmaexportrc.js`
- `/scripts/figma/fetch-variables.js`

**What to do:**
Replace the Figma main branch ID (`'bZFqk9urD3NlghGUKrkKCR'`) with the current branch ID from Figma where the SICK 2025 theme component updates are being made.

> **Important**
>
> This branch ID change should NOT be committed to the repository. Always revert back to the main branch ID before pushing changes.

#### Step 2: Fetch New Variables from Figma

Run the following command to pull the latest variables and styles from the specified Figma branch:

```bash
pnpm fetch:figma
```

#### Step 3: Identify New Variables

To check if completely new variables have been added to Figma, you can temporarily disable the regex filter:

**File:** `packages/tokens/scripts/figma/transform-tokens.js`  
**Line:** 158

Comment out the `return` statement. This will build ALL Figma variables, including those we don't normally publish or newly added ones that haven't been configured yet.

#### Step 4: Build New Theme JSONs

Execute the build command to generate new theme JSON files:

```bash
pnpm build:figma
```

**Review process:**

- Check if new variables have been added that are needed for the SICK 2025 theme implementation
- If new variables are required, remove them from the exclusion regex in `packages/tokens/scripts/figma/helpers.js` at line 115 (`const OLD_BRAND_VARIABLES_REGEX`)

> **Special Note on Variable Aliases**
>
> When you encounter a new token that references another token (type=VARIABLE_ALIAS) that we previously didn't had as a primitive (e.g., the new "primitive/muted" palette representing the warm-grey palette), use the actual value instead of the variable reference.
>
> For example, instead of using `syn-color-muted-50`, use the actual value like `#E6E1DC`. This can be achieved by modifying the `shouldUseAliasValue` function in `packages/tokens/scripts/figma/transform-tokens.js`.
>
> This is done, as the "muted" palette might be renamed until the end of the brand update

#### Step 5: Finalize Token Generation

If you modified the `transform-tokens.js` file in Step 3, revert the changes and run the build command again:

```bash
pnpm build:figma
```

After this step, only the newly added variables for the SICK 2025 theme should be included, along with existing variables whose values have been modified for the theme update.

#### Step 6: Validate JSON Changes

Perform an initial review of the generated JSON files to ensure the changes align with the SICK 2025 theme specifications and design updates.

#### Step 7: Generate CSS Files

Build the new CSS files from the updated tokens:

```bash
pnpm build
```

#### Step 8: Review CSS Changes

Display the changes made to the CSS files:

```bash
pnpm compare
```

#### Step 9: Update Test Files

If the displayed changes are valid, update the test CSS files in the folder `packages/tokens/test` with the new values. The goal is to ensure that running `pnpm compare` shows no differences after the test files are updated.

### 2. Components Package Updates

After updating the tokens for the SICK 2025 theme, you need to ensure the components properly utilize the new design tokens and are compatible with the theme.

#### Step 1: Update Component Styles

Modify the styles file of the affected component as necessary to incorporate the SICK 2025 theme changes and ensure proper theme compatibility.

#### Step 2: Implement Fallback Values

When using a new CSS variable that didn't exist before, always provide the old value as a fallback. This ensures compatibility for users who might be using an older version of the tokens package.

**Example:**

```css
opacity: var(--syn-opacity-light, 0.16);
```

In this example, `0.16` serves as the fallback value if the `--syn-opacity-light` variable is not available.

#### Step 3: Document New CSS Variables

If you've added new component-specific CSS variables, they must be documented for other developers.

**Process:**
Create a new `metadata.json` file following the guidelines in `packages/components/README.md` under the section "Adding metadata to components".

### 3. Docs Package Updates

The final step involves updating the documentation and ensuring proper visual testing coverage for the SICK 2025 theme.

#### Add SICK_2025 Themes to Chromatic

Update your component stories to include the SICK_2025 themes for visual regression testing in Chromatic. This ensures that the component renders correctly in the new theme.

**Add to your story file:**

```javascript
import { Chromatic_Modes_Sick_2025 } from '../../.storybook/modes.js';

// In your story parameters
parameters: {
  chromatic: {
    modes: Chromatic_Modes_Sick_2025,
  },
  // ... other parameters
}
```

This ensures that your component changes are visually tested across all relevant SICK 2025 theme variations in the automated testing pipeline.

### 4. MCP Package Update

Run the `pnpm build:all` command from the `packages/mcp/` folder, so all changes are also updated for the mcp package and the pipeline will not fail.
Especially the `checksum.txt` file, will in most cases become an update.

> **WARNING**
>
> The mcp is scraping the storybook stories for each component (`pnpm build:storybook`). Our async story of the combobox `AsyncOptions` is a bit flaky. Depending on the performance of the machine, it is possible that the pipeline fails because of that.

## Currently from tokens package actively excluded / ignored tokens

### Shadow tokens

We get the shadow variables from the fetching of figma styles NOT from Figma variables. There are some shadow figma variables available, but they are needed for Design only, to create the correct shadow Figma styles.
Ignored tokens:

- "primitive/shadow/\*"

### Button tokens

There where already some new button tokens added on design side, but the button is not yet done and they might not be needed. Thats why they are ignored. Maybe they need to be removed on design side at some point.

Ignored tokens:

- "component/button/border/radius/\*"
- "component/button/horizontal-padding/\*"

### Color palettes

Some new color palettes were added. Currently the "real" value (hex value) is used instead of the new color tokens on dev side. This was done, so no new tokens are published, that might be renamed. This approach is open to discussion and change.

Ignored tokens:

- "primitive/info/\*"
- "primitive/muted/\*"

### New additional tokens

There are new additional tokens available from Figma that are currently being ignored. These tokens might be used for future typography updates but are not yet integrated into the current design system implementation. This approach is open to discussion and change.
Following tokens are currently ignored:

#### Font-size

- "primitive/font-size/0x-large"
- "primitive/font-size/1x-large"
- "primitive/font-size/1_5x-large"
- "primitive/font-size/2_5x-large"
- "primitive/font-size/medium-large"

#### Letter-spacing

- "primitive/letter-spacing/default"
- "primitive/letter-spacing/negative-05"
- "primitive/letter-spacing/positive-05"
- "primitive/letter-spacing/positive-2"
- "primitive/letter-spacing/positive-5"

#### Line-height

- "primitive/line-height/100"
- "primitive/line-height/110"
- "primitive/line-height/115"
- "primitive/line-height/120"
- "primitive/line-height/130"
- "primitive/line-height/140"
- "primitive/line-height/150"
- "primitive/line-height/160"
- "primitive/line-height/180"
- "primitive/line-height/220"

#### Spacing

- "primitive/spacing/1_5x-large"
- "primitive/spacing/3_5x-large"

### Text-transform

- "primitive/text-transform/default"
- "primitive/text-transform/uppercase"
