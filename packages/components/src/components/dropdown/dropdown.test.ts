/**
 * ---------------------------------------------------------------------
 * 🔒 AUTOGENERATED BY VENDORISM
 * Removing this comment will prevent it from being managed by it.
 * ---------------------------------------------------------------------
 */

/* eslint-disable */
import '../../../dist/synergy.js';
import { clickOnElement } from '../../internal/test.js';
import { customElement } from 'lit/decorators.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { LitElement } from 'lit';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import sinon from 'sinon';
import type SynDropdown from './dropdown.js';

describe('<syn-dropdown>', () => {
  it('should be visible with the open attribute', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown open>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
          <syn-menu-item>Item 3</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;

    expect(panel.hidden).to.be.false;
  });

  it('should not be visible without the open attribute', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
          <syn-menu-item>Item 3</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;

    expect(panel.hidden).to.be.true;
  });

  it('should emit syn-show and syn-after-show when calling show()', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
          <syn-menu-item>Item 3</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('syn-show', showHandler);
    el.addEventListener('syn-after-show', afterShowHandler);
    el.show();

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.false;
  });

  it('should emit syn-hide and syn-after-hide when calling hide()', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown open>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
          <syn-menu-item>Item 3</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('syn-hide', hideHandler);
    el.addEventListener('syn-after-hide', afterHideHandler);
    el.hide();

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.true;
  });

  it('should emit syn-show and syn-after-show when setting open = true', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
          <syn-menu-item>Item 3</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('syn-show', showHandler);
    el.addEventListener('syn-after-show', afterShowHandler);
    el.open = true;

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.false;
  });

  it('should emit syn-hide and syn-after-hide when setting open = false', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown open>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
          <syn-menu-item>Item 3</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('syn-hide', hideHandler);
    el.addEventListener('syn-after-hide', afterHideHandler);
    el.open = false;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.true;
  });

  it('should still open on arrow navigation when no menu items', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu> </syn-menu>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;

    trigger.focus();
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should open on arrow down navigation', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;
    const firstMenuItem = el.querySelectorAll('syn-menu-item')[0];

    trigger.focus();
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(document.activeElement).to.equal(firstMenuItem);
  });

  it('should open on arrow up navigation', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;
    const secondMenuItem = el.querySelectorAll('syn-menu-item')[1];

    trigger.focus();
    await sendKeys({ press: 'ArrowUp' });
    await el.updateComplete;

    expect(el.open).to.be.true;
    expect(document.activeElement).to.equal(secondMenuItem);
  });

  it('should navigate to first focusable item on arrow navigation', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-label>Top Label</syn-menu-label>
          <syn-menu-item>Item 1</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;
    const item = el.querySelector('syn-menu-item')!;

    await clickOnElement(trigger);
    await trigger.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(document.activeElement).to.equal(item);
  });

  it('should close on escape key', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown open>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;

    trigger.focus();
    await sendKeys({ press: 'Escape' });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should not open on arrow navigation when no menu exists', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <div>Some custom content</div>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;

    trigger.focus();
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should open on enter key', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;

    trigger.focus();
    await el.updateComplete;
    await sendKeys({ press: 'Enter' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should focus on menu items when clicking the trigger and arrowing through options', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
          <syn-menu-item>Item 2</syn-menu-item>
          <syn-menu-item>Item 3</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;
    const secondMenuItem = el.querySelectorAll('syn-menu-item')[1];

    await clickOnElement(trigger);
    await trigger.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(document.activeElement).to.equal(secondMenuItem);
  });

  it('should open on enter key when no menu exists', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <div>Some custom content</div>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;

    trigger.focus();
    await el.updateComplete;
    await sendKeys({ press: 'Enter' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should hide when clicked outside container and initially open', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown open>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);

    await sendMouse({ type: 'click', position: [0, 0] });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should hide when clicked outside container', async () => {
    const el = await fixture<SynDropdown>(html`
      <syn-dropdown>
        <syn-button slot="trigger" caret>Toggle</syn-button>
        <syn-menu>
          <syn-menu-item>Item 1</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    `);
    const trigger = el.querySelector('syn-button')!;

    trigger.click();
    await el.updateComplete;
    await sendMouse({ type: 'click', position: [0, 0] });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  describe('when a syn-menu is provided and the dropdown is opened', () => {
    before(() => {
      @customElement('custom-wrapper')
      class Wrapper extends LitElement {
        render() {
          return html`<nested-dropdown></nested-dropdown>`;
        }
      }
      // eslint-disable-next-line chai-friendly/no-unused-expressions
      Wrapper;

      @customElement('nested-dropdown')
      class NestedDropdown extends LitElement {
        render() {
          return html`
            <syn-dropdown>
              <syn-button slot="trigger" caret>Toggle</syn-button>
              <syn-menu>
                <syn-menu-item>Item 1</syn-menu-item>
              </syn-menu>
            </syn-dropdown>
          `;
        }
      }
      // eslint-disable-next-line chai-friendly/no-unused-expressions
      NestedDropdown;
    });

    it('should remain open on tab key', async () => {
      const el = await fixture<SynDropdown>(html`<custom-wrapper></custom-wrapper>`);

      const dropdown = el.shadowRoot!.querySelector('nested-dropdown')!.shadowRoot!.querySelector('syn-dropdown')!;

      const trigger = dropdown.querySelector('syn-button')!;

      trigger.focus();
      await dropdown.updateComplete;
      await sendKeys({ press: 'Enter' });
      await dropdown.updateComplete;
      await sendKeys({ press: 'Tab' });
      await dropdown.updateComplete;

      expect(dropdown.open).to.be.true;
    });
  });

  describe('when arbitrary content is provided and the dropdown is opened', () => {
    before(() => {
      @customElement('custom-wrapper-arbitrary')
      class WrapperArbitrary extends LitElement {
        render() {
          return html`<nested-dropdown-arbitrary></nested-dropdown-arbitrary>`;
        }
      }
      // eslint-disable-next-line chai-friendly/no-unused-expressions
      WrapperArbitrary;

      @customElement('nested-dropdown-arbitrary')
      class NestedDropdownArbitrary extends LitElement {
        render() {
          return html`
            <syn-dropdown>
              <syn-button slot="trigger" caret>Toggle</syn-button>
              <ul>
                <li><a href="/settings">Settings</a></li>
                <li><a href="/profile">Profile</a></li>
              </ul>
            </syn-dropdown>
          `;
        }
      }
      // eslint-disable-next-line chai-friendly/no-unused-expressions
      NestedDropdownArbitrary;
    });

    it('should remain open on tab key', async () => {
      // This test is flaky, at least on local systems.
      // Therefore, we skip it in Safari.
      if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        // eslint-disable-next-line no-console
        console.warn('Skipping dropdown focus test in Safari because of false positives');
        return;
      }
      const el = await fixture<SynDropdown>(html`<custom-wrapper-arbitrary></custom-wrapper-arbitrary>`);

      const dropdown = el
        .shadowRoot!.querySelector('nested-dropdown-arbitrary')!
        .shadowRoot!.querySelector('syn-dropdown')!;

      const trigger = dropdown.querySelector('syn-button')!;

      trigger.focus();
      await dropdown.updateComplete;
      await sendKeys({ press: 'Enter' });
      await dropdown.updateComplete;
      await sendKeys({ press: 'Tab' });
      await dropdown.updateComplete;

      expect(dropdown.open).to.be.true;
    });
  });
});
