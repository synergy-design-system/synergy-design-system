/* eslint-disable @typescript-eslint/no-misused-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynButtonGroup from './button-group.js';

describe('<syn-button-group> (custom)', () => {
  it('should support to set a custom "size" property that propagates to its children', () => {
    ['small', 'medium', 'large'].forEach(async size => {
      const buttonGroup = await fixture<SynButtonGroup>(html`
        <syn-button-group size="${size}">
          <syn-button size="small">Button 1</syn-button>
          <syn-button size="medium">Button 2</syn-button>
          <syn-button size="large">Button 3</syn-button>
        </syn-button-group>
      `);

      const buttons = buttonGroup.querySelectorAll('syn-button');
      buttons.forEach(button => {
        expect(button.size).to.equal(size);
      });
    });
  });

  it('should support to set a custom "variant" property that propagates to its children', () => {
    ['filled', 'outline'].forEach(async variant => {
      const buttonGroup = await fixture<SynButtonGroup>(html`
        <syn-button-group variant="${variant}">
          <syn-button variant="filled">Button 1</syn-button>
          <syn-button variant="outline">Button 2</syn-button>
          <syn-button variant="text">Button 3</syn-button>
        </syn-button-group>
      `);

      const buttons = buttonGroup.querySelectorAll('syn-button');
      buttons.forEach(button => {
        expect(button.variant).to.equal(variant);
      });
    });
  });

  it('should automatically update the childrens variant and size properties when they are changed', async () => {
    const buttonGroup = await fixture<SynButtonGroup>(html`
      <syn-button-group variant="outline" size="small">
        <syn-button>Button 1</syn-button>
        <syn-button>Button 2</syn-button>
        <syn-button>Button 3</syn-button>
      </syn-button-group>
    `);

    // Pretest
    const buttons = buttonGroup.querySelectorAll('syn-button');
    buttons.forEach(button => {
      expect(button.variant).to.equal('outline');
      expect(button.size).to.equal('small');
    });

    // Change properties
    buttonGroup.variant = 'filled';
    buttonGroup.size = 'large';

    await buttonGroup.updateComplete;

    // Test again
    buttons.forEach(button => {
      expect(button.variant).to.equal('filled');
      expect(button.size).to.equal('large');
    });
  });
});
