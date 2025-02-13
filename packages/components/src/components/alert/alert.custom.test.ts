import sinon from 'sinon';
import { expect, fixture, html } from '@open-wc/testing';
import { resetMouse } from '@web/test-runner-commands';
import '../../../dist/synergy.js';
import { clickOnElement } from '../../internal/test.js';
import type SynAlert from './alert.js';
import type SynIconButton from '../icon-button/icon-button.js';

const getCloseButton = (alert: SynAlert): SynIconButton | null | undefined => alert.shadowRoot?.querySelector<SynIconButton>('[part="close-button"]');

describe('<syn-alert>', () => {
  afterEach(async () => {
    await resetMouse();
  });

  describe('close button', () => {
    it('clicking above close button does not close the alert', async () => {
      const wrapper = await fixture<HTMLDivElement>(html`<div class="wrapper" style="padding: 24px; background-color:red;"><syn-alert open closable>I am an alert</syn-alert></div>`);
      const alert = wrapper.querySelector('syn-alert') as SynAlert;

      const clickTargetPromise = new Promise<HTMLElement>((resolve) => {
        const clickHandler = sinon.spy((event: MouseEvent) => {
          resolve(event.target as HTMLElement);
        });
        alert.shadowRoot!.addEventListener('click', clickHandler);
        wrapper.addEventListener('click', clickHandler);
      });

      const closeButton = getCloseButton(alert);
      await clickOnElement(closeButton!, 'top', 0, -4);
      const clickTarget = await clickTargetPromise;
      const tag = clickTarget.tagName.toLowerCase();
      await expect(tag).to.not.be.equal('syn-icon-button');
      expect(clickTarget.classList.contains('alert')).to.be.true;
      expect(clickTarget.classList.contains('wrapper'), 'The click should happen in the alert and not outside of it').to.be.false;
    });

    it('clicking under close button does not close the alert', async () => {
      const wrapper = await fixture<HTMLDivElement>(html`<div class="wrapper" style="padding: 24px; background-color:red;"><syn-alert open closable>I am an alert</syn-alert></div>`);
      const alert = wrapper.querySelector('syn-alert') as SynAlert;

      const clickTargetPromise = new Promise<HTMLElement>((resolve) => {
        const clickHandler = sinon.spy((event: MouseEvent) => {
          resolve(event.target as HTMLElement);
        });
        alert.shadowRoot!.addEventListener('click', clickHandler);
        wrapper.addEventListener('click', clickHandler);
      });

      const closeButton = getCloseButton(alert);
      await clickOnElement(closeButton!, 'bottom', 0, 4);
      const clickTarget = await clickTargetPromise;

      await expect(clickTarget.tagName.toLowerCase()).to.not.be.equal('syn-icon-button');
      expect(clickTarget.classList.contains('alert')).to.be.true;
      expect(clickTarget.classList.contains('wrapper'), 'The click should happen in the alert and not outside of it').to.be.false;
    });
  });
});
