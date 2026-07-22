/* eslint-disable */
import '../../../dist/synergy.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import type SynFieldset from './fieldset.js';
import type SynInput from '../input/input.js';

describe('<syn-fieldset>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<SynFieldset>(html`
      <syn-fieldset legend="Test Fieldset">
        <syn-input label="Input 1"></syn-input>
      </syn-fieldset>
    `);
    await expect(el).to.be.accessible();
  });

  describe('when provided no parameters', () => {
    it('should have default properties', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);

      expect(el.legend).to.equal('');
      expect(el.description).to.equal('');
      expect(el.disabled).to.be.false;
      expect(el.disableAutoGroupLayout).to.be.false;
      expect(el.layout).to.equal('one-column');
    });

    it('should render without legend or description', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);
      const legend = el.shadowRoot!.querySelector('.legend');
      const description = el.shadowRoot!.querySelector('.description');

      expect(legend).to.be.null;
      expect(description).to.be.null;
    });

    it('should render the fieldset base element', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);
      const fieldset = el.shadowRoot!.querySelector('fieldset[part="base"]');

      expect(fieldset).to.exist;
      expect(fieldset).to.have.class('fieldset');
    });
  });

  describe('legend', () => {
    it('should render legend text when provided via attribute', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset legend="My Legend"></syn-fieldset>
      `);
      const legend = el.shadowRoot!.querySelector('.legend');
      const legendSlot = el.shadowRoot!.querySelector('slot[name="legend"]')!;

      expect(legend).to.exist;
      expect(legendSlot.textContent).to.include('My Legend');
    });

    it('should render legend from slot when provided', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset>
          <div slot="legend">Custom Legend Content</div>
        </syn-fieldset>
      `);
      const legend = el.shadowRoot!.querySelector('.legend');
      const slottedLegend = el.querySelector<HTMLElement>('div[slot="legend"]');

      expect(legend).to.exist;
      expect(slottedLegend?.textContent).to.equal('Custom Legend Content');
    });

    it('should display legend text when both attribute and slot are provided', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset legend="Attribute Legend">
          <div slot="legend">Slot Legend</div>
        </syn-fieldset>
      `);
      const slottedLegend = el.querySelector<HTMLElement>('div[slot="legend"]');

      expect(slottedLegend?.textContent).to.equal('Slot Legend');
    });

    it('should have the legend part', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset legend="Test"></syn-fieldset>
      `);
      const legend = el.shadowRoot!.querySelector('[part="legend"]');

      expect(legend).to.exist;
    });
  });

  describe('description', () => {
    it('should render description text when provided via attribute', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset description="My Description"></syn-fieldset>
      `);
      const description = el.shadowRoot!.querySelector('.description');
      const descriptionSlot = el.shadowRoot!.querySelector('slot[name="description"]')!;

      expect(description).to.exist;
      expect(descriptionSlot.textContent).to.include('My Description');
    });

    it('should render description from slot when provided', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset>
          <div slot="description">Custom Description Content</div>
        </syn-fieldset>
      `);
      const description = el.shadowRoot!.querySelector('.description');
      const slottedDescription = el.querySelector<HTMLElement>('div[slot="description"]');

      expect(description).to.exist;
      expect(slottedDescription?.textContent).to.equal('Custom Description Content');
    });

    it('should display description text when both attribute and slot are provided', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset description="Attribute Description">
          <div slot="description">Slot Description</div>
        </syn-fieldset>
      `);
      const slottedDescription = el.querySelector<HTMLElement>('div[slot="description"]');

      expect(slottedDescription?.textContent).to.equal('Slot Description');
    });

    it('should have the description part', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset description="Test"></syn-fieldset>
      `);
      const description = el.shadowRoot!.querySelector('[part="description"]');

      expect(description).to.exist;
    });

    describe('aria-describedby', () => {
      it('should not have aria-describedby when no description is provided', async () => {
        const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);
        const fieldset = el.shadowRoot!.querySelector('fieldset');

        expect(fieldset).to.not.have.attribute('aria-describedby');
      });

      it('should have aria-describedby when description is provided via attribute', async () => {
        const el = await fixture<SynFieldset>(html`
          <syn-fieldset description="Test Description"></syn-fieldset>
        `);
        const fieldset = el.shadowRoot!.querySelector('fieldset')!;

        expect(fieldset).to.have.attribute('aria-describedby');
      });

      it('should have aria-describedby when description is provided via slot', async () => {
        const el = await fixture<SynFieldset>(html`
          <syn-fieldset>
            <div slot="description">Slot Description</div>
          </syn-fieldset>
        `);
        const fieldset = el.shadowRoot!.querySelector('fieldset')!;

        expect(fieldset).to.have.attribute('aria-describedby');
      });

      it('should assign the description ID to the description element', async () => {
        const el = await fixture<SynFieldset>(html`
          <syn-fieldset description="Test"></syn-fieldset>
        `);
        const description = el.shadowRoot!.querySelector('.description')!;
        const fieldset = el.shadowRoot!.querySelector('fieldset')!;
        const descriptionId = fieldset.getAttribute('aria-describedby');

        expect(description).to.have.id('description');
        expect(descriptionId).to.equal('description');
      });

      it('should remove aria-describedby when description is cleared', async () => {
        const el = await fixture<SynFieldset>(html`
          <syn-fieldset description="Initial Description"></syn-fieldset>
        `);
        const fieldset = el.shadowRoot!.querySelector('fieldset')!;

        expect(fieldset).to.have.attribute('aria-describedby');

        el.description = '';
        await el.updateComplete;

        expect(fieldset).to.not.have.attribute('aria-describedby');
      });
    });
  });

  describe('layout', () => {
    it('should default to one-column layout', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);

      expect(el.layout).to.equal('one-column');
    });

    it('should apply one-column class by default', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);
      const fields = el.shadowRoot!.querySelector('.fields');

      expect(fields).to.not.have.class('fields--two-columns');
    });

    it('should apply two-columns class when layout is set to two-columns', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset layout="two-columns"></syn-fieldset>
      `);
      const fields = el.shadowRoot!.querySelector('.fields');

      expect(fields).to.have.class('fields--two-columns');
    });

    it('should update layout when property is changed', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);
      const fields = el.shadowRoot!.querySelector('.fields')!;

      expect(fields).to.not.have.class('fields--two-columns');

      el.layout = 'two-columns';
      await el.updateComplete;

      expect(fields).to.have.class('fields--two-columns');
    });

    it('should be reflected to the attribute', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);

      el.layout = 'two-columns';
      await el.updateComplete;

      expect(el).to.have.attribute('layout', 'two-columns');
    });

    it('should force direct child radio groups to horizontal in effective two-column layout', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset layout="two-columns" style="display: block; width: 900px;">
          <syn-radio-group id="rg" layout="vertical">
            <syn-radio value="1">One</syn-radio>
            <syn-radio value="2">Two</syn-radio>
          </syn-radio-group>
        </syn-fieldset>
      `);
      const radioGroup = el.querySelector<any>('#rg')!;

      await waitUntil(() => radioGroup.layout === 'horizontal');

      expect(radioGroup.layout).to.equal('horizontal');
    });

    it('should force direct child radio groups to vertical when collapsing to one-column', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset layout="two-columns" style="display: block; width: 900px;">
          <syn-radio-group id="rg">
            <syn-radio value="1">One</syn-radio>
            <syn-radio value="2">Two</syn-radio>
          </syn-radio-group>
        </syn-fieldset>
      `);
      const radioGroup = el.querySelector<any>('#rg')!;

      await waitUntil(() => radioGroup.layout === 'horizontal');

      el.style.width = '300px';

      await waitUntil(() => radioGroup.layout === 'vertical');

      expect(radioGroup.layout).to.equal('vertical');
    });

    it('should support future checkbox-group-like elements by falling back to layout attribute', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset layout="two-columns" style="display: block; width: 900px;">
          <syn-checkbox-group id="cg"></syn-checkbox-group>
        </syn-fieldset>
      `);
      const checkboxGroup = el.querySelector<HTMLElement>('#cg')!;

      await waitUntil(() => checkboxGroup.getAttribute('layout') === 'horizontal');

      expect(checkboxGroup).to.have.attribute('layout', 'horizontal');

      el.style.width = '300px';

      await waitUntil(() => checkboxGroup.getAttribute('layout') === 'vertical');

      expect(checkboxGroup).to.have.attribute('layout', 'vertical');
    });

    it('should not auto-sync grouped layout when disable-auto-group-layout is set', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset disable-auto-group-layout layout="two-columns" style="display: block; width: 900px;">
          <syn-radio-group id="rg" layout="vertical">
            <syn-radio value="1">One</syn-radio>
            <syn-radio value="2">Two</syn-radio>
          </syn-radio-group>
        </syn-fieldset>
      `);
      const radioGroup = el.querySelector<any>('#rg')!;

      await el.updateComplete;

      expect(radioGroup.layout).to.equal('vertical');
    });

    it('should reflect disableAutoGroupLayout to disable-auto-group-layout attribute', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);

      el.disableAutoGroupLayout = true;
      await el.updateComplete;

      expect(el).to.have.attribute('disable-auto-group-layout');
    });

  });

  describe('disabled state', () => {
    it('should not be disabled by default', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);

      expect(el.disabled).to.be.false;
    });

    it('should set disabled attribute on fieldset element', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset disabled></syn-fieldset>
      `);
      const fieldset = el.shadowRoot!.querySelector('fieldset');

      expect(fieldset).to.have.attribute('disabled');
    });

    it('should be reflected to the attribute', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);

      el.disabled = true;
      await el.updateComplete;

      expect(el).to.have.attribute('disabled');
    });

    it('should disable form controls when disabled is set', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset>
          <syn-input id="input1" label="Input 1"></syn-input>
          <syn-input id="input2" label="Input 2"></syn-input>
        </syn-fieldset>
      `);
      const input1 = el.querySelector<SynInput>('#input1')!;
      const input2 = el.querySelector<SynInput>('#input2')!;

      expect(input1.disabled).to.be.false;
      expect(input2.disabled).to.be.false;

      el.disabled = true;
      await el.updateComplete;

      expect(input1.disabled).to.be.true;
      expect(input2.disabled).to.be.true;
    });

    it('should re-enable form controls when disabled is removed', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset disabled>
          <syn-input id="input1" label="Input 1"></syn-input>
        </syn-fieldset>
      `);
      const input1 = el.querySelector<SynInput>('#input1')!;

      expect(input1.disabled).to.be.true;

      el.disabled = false;
      await el.updateComplete;

      expect(input1.disabled).to.be.false;
    });

    it('should not re-enable controls that were already disabled', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset disabled>
          <syn-input id="input1" label="Input 1" disabled></syn-input>
          <syn-input id="input2" label="Input 2"></syn-input>
        </syn-fieldset>
      `);
      const input1 = el.querySelector<SynInput>('#input1')!;
      const input2 = el.querySelector<SynInput>('#input2')!;

      expect(input1.disabled).to.be.true;
      expect(input2.disabled).to.be.true;

      el.disabled = false;
      await el.updateComplete;

      expect(input1.disabled).to.be.true;
      expect(input2.disabled).to.be.false;
    });

    it('should handle native form elements', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset disabled>
          <input id="native-input" type="text" />
        </syn-fieldset>
      `);
      const nativeInput = el.querySelector<HTMLInputElement>('#native-input')!;

      expect(nativeInput.disabled).to.be.true;

      el.disabled = false;
      await el.updateComplete;

      expect(nativeInput.disabled).to.be.false;
    });

    it('should sync disabled state when child elements are added via mutation', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset disabled>
          <syn-input id="input1" label="Input 1"></syn-input>
        </syn-fieldset>
      `);

      const newInput = document.createElement('syn-input');
      newInput.id = 'input2';
      newInput.label = 'Input 2';
      el.appendChild(newInput);

      await waitUntil(() => newInput.disabled);

      expect(newInput.disabled).to.be.true;
    });
  });

  describe('slots', () => {
    it('should have a default slot for fieldset content', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset>
          <syn-input label="Input"></syn-input>
        </syn-fieldset>
      `);
      const slot = el.shadowRoot!.querySelector('slot:not([name])');

      expect(slot).to.exist;
    });

    it('should have a legend slot', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset>
          <div slot="legend">Legend</div>
        </syn-fieldset>
      `);
      const slot = el.shadowRoot!.querySelector('slot[name="legend"]');

      expect(slot).to.exist;
    });

    it('should have a description slot', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset>
          <div slot="description">Description</div>
        </syn-fieldset>
      `);
      const slot = el.shadowRoot!.querySelector('slot[name="description"]');

      expect(slot).to.exist;
    });

    it('should render the field-container part', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);
      const fieldContainer = el.shadowRoot!.querySelector('[part="field-container"]');

      expect(fieldContainer).to.exist;
      expect(fieldContainer).to.have.class('fields');
    });
  });

  describe('multiple form elements', () => {
    it('should render multiple syn-input elements', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset legend="Personal Info">
          <syn-input id="first-name" label="First Name"></syn-input>
          <syn-input id="last-name" label="Last Name"></syn-input>
          <syn-input id="email" label="Email" type="email"></syn-input>
        </syn-fieldset>
      `);

      const firstName = el.querySelector<SynInput>('#first-name');
      const lastName = el.querySelector<SynInput>('#last-name');
      const email = el.querySelector<SynInput>('#email');

      expect(firstName).to.exist;
      expect(lastName).to.exist;
      expect(email).to.exist;
    });

    it('should disable multiple form elements when disabled', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset disabled>
          <syn-input id="input1" label="Input 1"></syn-input>
          <syn-checkbox id="checkbox1"></syn-checkbox>
          <syn-select id="select1"><syn-option>Option</syn-option></syn-select>
        </syn-fieldset>
      `);

      const input = el.querySelector<SynInput>('#input1')!;
      const checkbox = el.querySelector<any>('#checkbox1')!;
      const select = el.querySelector<any>('#select1')!;

      expect(input.disabled).to.be.true;
      expect(checkbox.disabled).to.be.true;
      expect(select.disabled).to.be.true;
    });
  });

  describe('legend and description together', () => {
    it('should render both legend and description', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset legend="Personal Information" description="Please fill in your details">
          <syn-input label="Name"></syn-input>
        </syn-fieldset>
      `);

      const legend = el.shadowRoot!.querySelector('.legend');
      const description = el.shadowRoot!.querySelector('.description');

      expect(legend).to.exist;
      expect(description).to.exist;
    });

    it('should render legend above description', async () => {
      const el = await fixture<SynFieldset>(html`
        <syn-fieldset legend="Legend" description="Description">
        </syn-fieldset>
      `);

      const legend = el.shadowRoot!.querySelector('.legend');
      const description = el.shadowRoot!.querySelector('.description');

      expect(legend).to.exist;
      expect(description).to.exist;
      
      // Check that legend appears before description in the DOM
      const legendNextElements = [];
      let nextEl = legend?.nextElementSibling;
      while (nextEl) {
        legendNextElements.push(nextEl);
        nextEl = nextEl.nextElementSibling;
      }
      
      expect(legendNextElements).to.include(description);
    });
  });

  describe('attributes and properties', () => {
    it('should reflect legend to attribute', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);

      el.legend = 'Test Legend';
      await el.updateComplete;

      expect(el).to.have.attribute('legend', 'Test Legend');
    });

    it('should reflect description to attribute', async () => {
      const el = await fixture<SynFieldset>(html`<syn-fieldset></syn-fieldset>`);

      el.description = 'Test Description';
      await el.updateComplete;

      expect(el).to.have.attribute('description', 'Test Description');
    });

    it('should sync property fro m attribute', async () => {
      const el = await fixture<SynFieldset>(
        html`<syn-fieldset legend="Attr Legend" description="Attr Description"></syn-fieldset>`
      );

      expect(el.legend).to.equal('Attr Legend');
      expect(el.description).to.equal('Attr Description');
    });
  });
});
