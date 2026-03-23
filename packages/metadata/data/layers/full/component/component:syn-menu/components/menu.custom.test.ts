import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynMenu from './menu.js';
import type SynMenuItem from '../menu-item/menu-item.component.js';

const getShowCheckmarks = (selector: NodeListOf<SynMenuItem>) => Array
  .from(selector)
  .some(elm => {
    const style = getComputedStyle(elm);
    const value = style.getPropertyValue('--display-checkmark');
    return value === 'flex';
  });

describe('<syn-menu> (custom)', () => {
  it('<syn-menu-item> should use a display "flex" for the checkmark if at least one of the items has a type of "checkbox"', async () => {
    const menu = await fixture<SynMenu>(html`
      <syn-menu>
        <syn-menu-item value="item-1">Item 1</syn-menu-item>
        <syn-menu-item value="item-2" type="checkbox">Item 2</syn-menu-item>
        <syn-menu-item value="item-3">Item 3</syn-menu-item>
        <syn-menu-item value="item-4">Item 4</syn-menu-item>
      </syn-menu>
    `);

    expect(getShowCheckmarks(menu.querySelectorAll('syn-menu-item'))).to.be.true;
  });

  it('<syn-menu-item> should use a display "flex" for the checkmark if at least one of the items is in loading state', async () => {
    const menu = await fixture<SynMenu>(html`
      <syn-menu>
        <syn-menu-item value="item-1">Item 1</syn-menu-item>
        <syn-menu-item value="item-2">Item 2</syn-menu-item>
        <syn-menu-item value="item-3">Item 3</syn-menu-item>
        <syn-menu-item value="item-4" loading>Item 4</syn-menu-item>
      </syn-menu>
    `);

    expect(getShowCheckmarks(menu.querySelectorAll('syn-menu-item'))).to.be.true;
  });

  it('<syn-menu-item> should use a display "none" for the checkmark if none of the items has a type of "checkmark" or is in loading state', async () => {
    const menu = await fixture<SynMenu>(html`
      <syn-menu>
        <syn-menu-item value="item-1">Item 1</syn-menu-item>
        <syn-menu-item value="item-2">Item 2</syn-menu-item>
        <syn-menu-item value="item-3">Item 3</syn-menu-item>
        <syn-menu-item value="item-4">Item 4</syn-menu-item>
      </syn-menu>
    `);

    expect(getShowCheckmarks(menu.querySelectorAll('syn-menu-item'))).to.be.false;
  });
});
