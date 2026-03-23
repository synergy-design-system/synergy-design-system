import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import type SynMenuItem from './menu-item.js';

describe('<syn-menu-item> (custom)', () => {
  it('should emit a "syn-attributes-changed" event when the loading or type properties change', async () => {
    const listener = sinon.spy();
    const el = await fixture<HTMLDivElement>(html`
      <div>
        <syn-menu-item>Test</syn-menu-item>
      </div>
    `);

    const menuItem = el.querySelector('syn-menu-item') as SynMenuItem;

    el.addEventListener('syn-attributes-changed', listener);

    // It should not have been called on load
    expect(listener).to.not.have.been.called;

    // Change the loading property
    menuItem.loading = true;
    await menuItem.updateComplete;
    expect(listener).to.have.been.calledOnce;

    // Change the type property
    menuItem.type = 'checkbox';
    await menuItem.updateComplete;
    expect(listener).to.have.been.calledTwice;

    // Toggle the type again to make sure it does work more than once
    menuItem.type = 'normal';
    await menuItem.updateComplete;
    expect(listener).to.have.been.calledThrice;

    // Add a new node and make sure it doesn't trigger the event
    const newNode = document.createElement('syn-menu-item');
    newNode.textContent = 'New Node';
    newNode.loading = true;

    el.appendChild(newNode);
    await newNode.updateComplete;
    expect(listener).to.have.been.calledThrice;
  });
});
