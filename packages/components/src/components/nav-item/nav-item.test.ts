/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import sinon from 'sinon';
import '../../../dist/synergy.js';
import {
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import type SynNavItem from './nav-item.js';

describe('<syn-nav-item>', () => {
  describe('accessibility tests', () => {
    it('should be accessible', async () => {
      const link = await fixture<SynNavItem>(html`<syn-nav-item href="#">Link</syn-nav-item>`);
      await expect(link).to.be.accessible();

      const button = await fixture<SynNavItem>(html`<syn-nav-item>Button</syn-nav-item>`);
      await expect(button).to.be.accessible();

      const accordion = await fixture<SynNavItem>(html`
        <syn-nav-item>
          Button
          <nav slot="children">Children</nav>
        </syn-nav-item>
      `);
      await expect(accordion).to.be.accessible();
    });
  });

  describe('when provided no parameters', () => {
    it('should have default values', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item>Label</syn-nav-item>`);

      expect(el.current).to.equal(false);
      expect(el.chevron).to.equal(false);
      expect(el.disabled).to.equal(false);
      expect(el.divider).to.equal(false);
      expect(el.href).to.be.undefined;
      expect(el.open).to.equal(false);
      expect(el.horizontal).to.equal(false);
      expect(el.rel).to.equal('noreferrer noopener');
      expect(el.target).to.be.undefined;
    });

    it('should render as a button', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('button')).to.exist;
      expect(el.shadowRoot!.querySelector('a')).not.to.exist;
      expect(el.shadowRoot!.querySelector('summary')).not.to.exist;
    });

    it('should disable the button if disabled is set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item disabled>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('button')!.ariaDisabled).to.equal('true');
      expect(el.shadowRoot!.querySelector('button')!.tabIndex).to.equal(-1);
    });

    it('should not have a chevron present', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item>Label</syn-nav-item>`);
      expect(el.shadowRoot?.querySelector('[part~="chevron"]')).not.to.exist;
    });

    it('should not have children present', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item>Label</syn-nav-item>`);
      expect(el.shadowRoot?.querySelector('[part~="children"]')).not.to.exist;
    });
  });

  describe('when the href parameter is provided', () => {
    it('should render as a link', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item href="#">Label</syn-nav-item>`);
      expect(el.rel).to.equal('noreferrer noopener');
      expect(el.shadowRoot!.querySelector('a')).to.exist;
      expect(el.shadowRoot!.querySelector('a')).to.have.attribute('href', '#');
      expect(el.shadowRoot!.querySelector('button')).not.to.exist;
      expect(el.shadowRoot!.querySelector('summary')).not.to.exist;
    });

    it('should allow to set an external target for the link', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item href="#" target="_blank">Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('a')).to.have.attribute('target', '_blank');
    });

    it('should allow to set a custom rel for the link', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item href="#" rel="something">Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('a')).to.have.attribute('rel', 'something');
    });

    it('should disable the link if disabled is set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item href="#" disabled>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('a')!.ariaDisabled).to.equal('true');
      expect(el.shadowRoot!.querySelector('a')!.tabIndex).to.equal(-1);
    });

    it('should render as accordion if it has children', async () => {
      const el = await fixture<SynNavItem>(html`
        <syn-nav-item href="#">
          Label
          <syn-nav-item slot="children">Children</syn-nav-item>
        </syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('a')).not.to.exist;
      expect(el.shadowRoot!.querySelector('summary')).to.exist;
      expect(el.shadowRoot!.querySelector('summary')).not.to.have.attribute('href', '#');
      expect(el.shadowRoot!.querySelector('button')).not.to.exist;
    });
  });

  describe('when setting the divider prop', () => {
    it('should not show the <syn-divider /> if the horizontal prop is set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item divider horizontal>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('syn-divider')).not.to.exist;
    });

    it('should show the <syn-divider /> if the horizontal prop is not set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item divider>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('syn-divider')).to.exist;
    });
  });

  describe('when setting the chevron prop', () => {
    it('should not show the chevron if chevron and horizontal are set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item chevron horizontal>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('[part~="chevron"]')).not.to.exist;
    });

    it('should show the chevron if chevron is set to true and horizontal to false', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item chevron>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('[part~="chevron"]')).to.exist;
    });

    it('should not show the chevron if there are slotted children and horizontal is true', async () => {
      const el = await fixture<SynNavItem>(html`
        <syn-nav-item horizontal>
          Label
          <nav slot="children">Children</nav>
        </syn-nav-item>
      `);
      expect(el.shadowRoot!.querySelector('[part~="chevron"]')).not.to.exist;
    });

    it('should show the chevron if there are slotted children and horizontal is false', async () => {
      const el = await fixture<SynNavItem>(html`
        <syn-nav-item>
          Label
          <nav slot="children">Children</nav>
        </syn-nav-item>
      `);
      expect(el.shadowRoot!.querySelector('[part~="chevron"]')).to.exist;
    });
  });

  describe('when using methods', () => {
    it('should emit syn-focus and syn-blur when the nav-item is focused and blurred', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item></syn-nav-item>`);
      const focusHandler = sinon.spy();
      const blurHandler = sinon.spy();

      el.addEventListener('syn-focus', focusHandler);
      el.addEventListener('syn-blur', blurHandler);

      el.focus();
      await waitUntil(() => focusHandler.calledOnce);

      el.blur();
      await waitUntil(() => blurHandler.calledOnce);

      expect(focusHandler).to.have.been.calledOnce;
      expect(blurHandler).to.have.been.calledOnce;
    });

    it('should emit a blur event when calling blur()', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item></syn-nav-item>`);
      const blurHandler = sinon.spy();

      el.addEventListener('syn-blur', blurHandler);
      el.focus();
      el.blur();
      await waitUntil(() => blurHandler.calledOnce);

      expect(blurHandler).to.have.been.calledOnce;
    });

    it('should emit a click event when calling click()', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item></syn-nav-item>`);
      const clickHandler = sinon.spy();

      el.addEventListener('click', clickHandler);
      el.click();
      await waitUntil(() => clickHandler.calledOnce);

      expect(clickHandler).to.have.been.calledOnce;
    });
  });

  it('should show prefix only if there is not enough space and horizontal is not set', async () => {
    const el = await fixture<SynNavItem>(html`
      <syn-nav-item>
        Label
        <span slot="prefix">
          prefix
        </span>
      </syn-nav-item>`);

    el.style.width = '80px';
    const base = el.shadowRoot!.querySelector('.nav-item') as HTMLElement;

    // We need to wait because of the resize observer
    await waitUntil(() => base.classList.contains('nav-item--show-prefix-only'));

    expect(base).to.have.class('nav-item--show-prefix-only');
  });

  it('should show prefix only if there is not enough space and horizontal is toggled from false to true', async () => {
    const el = await fixture<SynNavItem>(html`
      <syn-nav-item horizontal>
        Label
        <span slot="prefix">
          prefix
        </span>
      </syn-nav-item>
    `);

    el.style.width = '80px';
    const base = el.shadowRoot!.querySelector('.nav-item') as HTMLElement;

    expect(base).to.not.have.class('nav-item--show-prefix-only');

    el.horizontal = false;
    await el.updateComplete;

    // We need to wait because of the resize observer
    await waitUntil(() => base.classList.contains('nav-item--show-prefix-only'));

    expect(base).to.have.class('nav-item--show-prefix-only');
  });

  it('should not show prefix only if horizontal is set', async () => {
    const el = await fixture<SynNavItem>(html`
      <syn-nav-item horizontal>
        Label
        <span slot="prefix">
          prefix
        </span>
      </syn-nav-item>`);

    el.style.width = '80px';
    const base = el.shadowRoot!.querySelector('.nav-item') as HTMLElement;

    expect(base).to.not.have.class('nav-item--show-prefix-only');
  });

  it('should display current indicator on root nav-item if it has a current marked child and is not open', async () => {
    const el = await fixture<SynNavItem>(html`
      <syn-nav-item>
        Label
        <syn-nav-item slot="children" current>
          nested
        </syn-nav-item>
      </syn-nav-item>`);

    const base = el.shadowRoot!.querySelector('.nav-item') as HTMLElement;

    expect(el).property('current').to.be.false;
    expect(base).to.have.class('nav-item--current');
  });

  describe('Nested syn-nav-items', () => {
    it('should set the correct indentation level for nested nav-items', async () => {
      const el = await fixture<SynNavItem>(html`
        <syn-nav-item>
          Parent
          <syn-nav-item slot="children">Child</syn-nav-item>
        </syn-nav-item>
      `);

      const child = el.querySelector('syn-nav-item')!;
      expect(child.style.getPropertyValue('--indentation')).to.equal('1');
    });

    it('should set the indentation level to maximum 2 of nested children', async () => {
      const el = await fixture<SynNavItem>(html`
        <syn-nav-item>
          Parent
          <syn-nav-item slot="children" id="first">
            First level
            <syn-nav-item slot="children" id="second">
              Second level
              <syn-nav-item slot="children" id="third">
                Third level
              </syn-nav-item>
            </syn-nav-item>
          </syn-nav-item>
        </syn-nav-item>
      `);

      const firstNested = el.querySelector('#first') as SynNavItem;
      const secondNested = el.querySelector('#second') as SynNavItem;
      const thirdNested = el.querySelector('#third') as SynNavItem;

      expect(getComputedStyle(firstNested).getPropertyValue('--indentation')).to.equal('1');
      expect(getComputedStyle(secondNested).getPropertyValue('--indentation')).to.equal('2');
      expect(getComputedStyle(thirdNested).getPropertyValue('--indentation')).to.equal('2');
    });
  });
});
