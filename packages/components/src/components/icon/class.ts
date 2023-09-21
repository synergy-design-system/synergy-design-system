import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

/**
 * Display an icon in the dom.
 * Uses the slotted text to display a font ligature using material design icon font.
 *
 * @slot default - The icon to display
 * @csspart root - The svg root element
 */
export class Icon extends FoundationElement {
  /**
   * An alternate description to use for assistive devices.
   * If omitted, the icon will be considered presentational and ignored by assistive devices.
   */
  @attr
  public label: string = '';

  /**
   * @see https://github.com/shoelace-style/shoelace/blob/next/src/components/icon/icon.component.ts#L115
   */
  protected labelChanged() {
    // Disallow setting attributes on mount
    if (!this.$fastController.isConnected) {
      return;
    }

    const hasLabel = typeof this.label === 'string' && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', this.label);
      this.removeAttribute('aria-hidden');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.setAttribute('aria-hidden', 'true');
    }
  }
}
