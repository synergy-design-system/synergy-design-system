import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import type { LogoVariant } from './options.js';

/**
 * The logo represents the company and forms the core of the brand identity.
 * Therefore, the logo has a very special meaning in communication:
 * It is always in a prominent position and retains its absolute independence in all applications.
 *
 * The logo is always used as original graphic. It may not be changed or translated.
 * The slogan "Sensor Intelligence." is part of the logo.
 *
 * @csspart root - The svg root element
 */
export class Logo extends FoundationElement {
  /**
   * Show or hide the claim of the logo.
   * The logo is used without a claim if no advertising message is associated with the logo or
   * if the use of the claim is not possible for reasons of space (width less than 1 cm).
   * @public
   */
  @attr({ mode: 'boolean' })
  public claim: boolean = true;

  /**
   * The variant of the logo to use
   * @public
   */
  @attr
  public variant: LogoVariant = 'color';
}
