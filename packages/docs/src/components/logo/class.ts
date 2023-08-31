import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import type { LogoType } from './options';

export class Logo extends FoundationElement {
  /**
   * @public
   * @remarks
   * The variant of the logo to show.
   */
  @attr
  public variant: LogoType = 'default';
}
