import React, {
  type FC,
} from 'react';
import { CopyToClipBoard } from './Clipboard.js';
import { CopyRawHexValue } from './RawColorValue.js';
import { ColorSwatch, MultiLineDescription } from './TokenHelpers.js';
import { getCSSToken, getSASSToken } from '../helpers/tokens.js';
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
  palettes, paletteTitle, description, themes = ['2025-light', '2025-dark'],
}) => (
  <>
    <h2 id={`token-palette-${paletteTitle.toLowerCase().replace(/\s+/g, '-')}`}>{paletteTitle}</h2>
    {description ? <MultiLineDescription value={description} /> : null}
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
                    <th>Raw Value</th>
                    <th>CSS Token</th>
                    <th>SCSS Token</th>
                    <th>JS Token</th>
                  </tr>
                  {Object.entries(tokens).map(([token, value]) => (
                    <tr key={`${paletteTitle}-row-${token}`}>
                      <td>
                        <ColorSwatch value={value} />
                      </td>
                      <td>
                        <CopyRawHexValue value={getCSSToken(token)} />
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
