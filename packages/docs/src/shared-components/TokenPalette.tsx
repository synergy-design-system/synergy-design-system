import React, {
  type FC,
} from 'react';
import { Markdown } from '@storybook/addon-docs/blocks';
import { CopyToClipBoard } from './Clipboard.js';
import { CopyRawHexValue } from './RawColorValue.js';
import { ColorSwatch } from './TokenHelpers.js';
import {
  getCSSToken, getCssAlias, getSASSToken, hasCssAlias,
} from '../helpers/tokens.js';
import { TokensForThemes, getThemesForComponent } from './TokensForThemes.js';

interface TokenPaletteProps {
  /** Display name for the palette shown as the section heading (h2) */
  paletteTitle: string;
  /**
   * One or more palette groups to display.
   * Each entry has an optional `subtitle` rendered as a spanning table header
   * above its rows, and a `tokens` map of CSS custom property names to their
   * resolved values (e.g. as returned by `getChartColorAsPalette`).
   * Use a single entry without a subtitle for a flat palette, or multiple
   * entries with subtitles to group related palettes under one heading.
   */
  palettes: Array<{ subtitle: string; tokens: Record<string, string> }>;
  /** Optional description of the palette, shown between the heading and the table */
  description?: string;
  /** List of themes to display the palette for. Defaults to ['2025-light', '2025-dark'] */
  themes?: Array<'2018-light' | '2018-dark' | '2025-light' | '2025-dark'>;
  /** The category of the tokens, used to determine which CSS aliases to show. Defaults to 'component' */
  tokenCategory?: 'component' | 'chart';
}

/**
 * Renders one or more color palette tables with columns for Color swatch,
 * Raw Value, CSS Token, SCSS Token, and JS Token.
 *
 * @example
 * // Flat palette (no subtitle)
 * <TokenPalette
 *   paletteTitle="Categorical Palette"
 *   palettes={[{ tokens: getChartColorAsPalette('categorical', true) }]}
 *   description="Used to visually distinguish discrete data categories."
 * />
 *
 * @example
 * // Grouped palette (multiple subtitles under one heading)
 * <TokenPalette
 *   paletteTitle="Sequential Palettes"
 *   palettes={['1', '2', '3'].map(num => ({
 *     subtitle: `Sequential Palette ${num}`,
 *     tokens: getChartColorAsPalette(`sequential0${num}`, true),
 *   }))}
 *   description="Single-hue palettes progressing from light to dark."
 * />
 */
export const TokenPalette: FC<TokenPaletteProps> = ({
  palettes, paletteTitle, description, themes = ['2025-light', '2025-dark'], tokenCategory = 'component',
}) => {
  const hasPaletteReferenceVariables = Object.values(palettes)
    .some(({ tokens }) => Object.keys(tokens)
      .some((token) => hasCssAlias(token, tokenCategory)));

  return (
    <>
      <h2 id={`token-palette-${paletteTitle.toLowerCase().replace(/\s+/g, '-')}`}>{paletteTitle}</h2>
      {description ? <Markdown>{description}</Markdown> : null}
      <TokensForThemes
        themes={getThemesForComponent(themes, () => (
          <table>
            <tbody>
              {
                palettes.map(({ subtitle, tokens }) => (
                  <React.Fragment key={`${paletteTitle}-subtitle-${subtitle}`}>
                    {subtitle ? <tr>
                      <th colSpan={5} style={{ paddingTop: '1rem', textAlign: 'left' }}>
                        {subtitle}
                      </th>
                    </tr> : null}
                    <tr>
                      <th>Color</th>
                      <th>CSS Token</th>
                      <th>SCSS Token</th>
                      <th>JS Token</th>
                      <th>Raw Value</th>
                      { hasPaletteReferenceVariables ? <th>CSS Alias</th> : null}
                    </tr>
                    {Object.entries(tokens).map(([token, value]) => (
                      <tr key={`${paletteTitle}-row-${token}`}>
                        <td>
                          <ColorSwatch value={value} />
                        </td>
                        <td>
                          <CopyToClipBoard value={getCSSToken(token)}>
                            {getCSSToken(token)}
                          </CopyToClipBoard>
                        </td>
                        <td>
                          <CopyToClipBoard value={getSASSToken(token)}>
                            {getSASSToken(token)}
                          </CopyToClipBoard>
                        </td>
                        <td>
                          <CopyToClipBoard value={token}>
                            {token}
                          </CopyToClipBoard>
                        </td>
                        <td>
                          <CopyRawHexValue value={getCSSToken(token)} />
                        </td>
                        { hasPaletteReferenceVariables ? <td>
                          <CopyToClipBoard value={getCssAlias(token, tokenCategory)}>
                            {getCssAlias(token, tokenCategory)}
                          </CopyToClipBoard>
                        </td> : null}
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              }
            </tbody>
          </table>
        ))}
      />
    </>
  );
};
