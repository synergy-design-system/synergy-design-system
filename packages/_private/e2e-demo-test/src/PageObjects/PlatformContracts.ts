import { expect } from '@playwright/test';
import { PageObject } from './PageObject.js';

export class PlatformContractsPage extends PageObject {
  protected initialPage = '/overlay-contracts';

  get disabledButton() {
    return this.getLocator('platformDisabledContractButton');
  }

  get disabledSelect() {
    return this.getLocator('platformDisabledContractSelect');
  }

  get drawer() {
    return this.getLocator('platformOverlayContractsDrawer');
  }

  get drawerContent() {
    return this.getLocator('platformOverlayContractsDrawerContent');
  }

  get dropdown() {
    return this.getLocator('platformOverlayContractsDropdown');
  }

  get drawerInsideTarget() {
    return this.getLocator('platformOverlayContractsInsideTarget');
  }

  get focusButton() {
    return this.getLocator('platformFocusContractButton');
  }

  get focusInput() {
    return this.getLocator('platformFocusContractInput');
  }

  get focusSelect() {
    return this.getLocator('platformFocusContractSelect');
  }

  get focusStart() {
    return this.getLocator('platformFocusContractStart');
  }

  get pointerButton() {
    return this.getLocator('platformPointerContractButton');
  }

  get scrollContainer() {
    return this.getLocator('platformScrollContractContainer');
  }

  get scrollSelect() {
    return this.getLocator('platformScrollContractSelect');
  }

  get select() {
    return this.getLocator('platformOverlayContractsSelect');
  }

  get textEditInput() {
    return this.getLocator('platformTextEditContractInput');
  }

  async openOverlayContracts() {
    await this.getLocator('platformOverlayContractsOpenButton').click();
    await expect(this.drawer).toHaveAttribute('open');

    return {
      drawer: this.drawer,
      drawerContent: this.drawerContent,
      drawerInsideTarget: this.drawerInsideTarget,
      dropdown: this.dropdown,
      select: this.select,
    };
  }
}
