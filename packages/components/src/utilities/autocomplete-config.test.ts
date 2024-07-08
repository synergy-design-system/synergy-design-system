import { expect, fixture, html } from '@open-wc/testing';
// @ts-expect-error - Import works, TS doesn't know the type
import autoComplete from '@tarekraafat/autocomplete.js/src/autoComplete.js';
/* eslint-disable import/no-duplicates */
import '../../dist/synergy.js';
import { setupAutocomplete } from '../../dist/synergy.js';
/* eslint-enable import/no-duplicates */
import type SynInput from '../components/input/input.js';
import type { SynPopup } from '../synergy.js';

const data = {
  src: [
    'Yellow',
    'Grey',
    'Green',
    'Blue',
    'Red',
    'Orange',
    'Magenta',
    'Black',
    'White',
    'Purple',
    'Pink',
    'Brown',
  ].sort(),
};

describe('syn-input', () => {
  describe('defaults ', () => {
    it('default properties', async () => {
      await fixture<SynInput>(html`
        <syn-input id="autocomplete" type="search"></syn-input>
      `);

      const { config: simpleConfig } = setupAutocomplete('#autocomplete');
      /* eslint-disable */
      const autoCompleteJS = new autoComplete({
        ...simpleConfig,
        data,
      });
      expect(autoCompleteJS.resultsList.tag).to.equal('ul');
      expect(autoCompleteJS.resultsList.maxResults).to.equal(5);
      expect(autoCompleteJS.resultItem.tag).to.equal('li');
      /* eslint-enable */
    });

    it('custom properties', async () => {
      await fixture<SynInput>(html`
        <syn-input id="autocomplete" type="search"></syn-input>
      `);

      const { config: simpleConfig } = setupAutocomplete('#autocomplete');
      /* eslint-disable */
      const autoCompleteJS = new autoComplete({
        ...simpleConfig,
        placeHolder: 'Placeholder',
        resultsList: {
          tag: 'ul',
          maxResults: 3
        },
        resultItem: {
          tag: 'syn-option'
        },
        data
      });

      expect(autoCompleteJS.resultsList.tag).to.equal('ul');
      expect(autoCompleteJS.resultsList.maxResults).to.equal(3);
      expect(autoCompleteJS.resultItem.tag).to.equal('syn-option');
      expect(autoCompleteJS.placeHolder).to.equal('Placeholder');
      /* eslint-enable */
    });

    it('should add syn-popup to input element', async () => {
      const synInput = await fixture<SynInput>(html`
        <syn-input id="autocomplete" type="search"></syn-input>
      `);

      const { config: simpleConfig } = setupAutocomplete('#autocomplete');
      /* eslint-disable */
      new autoComplete({
        ...simpleConfig,
        data
      });
      expect(synInput.shadowRoot).to.have.descendant('syn-popup');
      /* eslint-enable */
    });
  });

  describe('events', () => {
    it('should open popup on autocompletejs open event', async () => {
      const synInput = await fixture<SynInput>(html`
        <syn-input id="autocomplete" type="search"></syn-input>
      `);

      const { config: simpleConfig } = setupAutocomplete('#autocomplete');
      /* eslint-disable */
      new autoComplete({
        ...simpleConfig,
        data
      });

      const input = synInput.shadowRoot?.querySelector('input') as HTMLInputElement;
      const popup = synInput.shadowRoot?.querySelector('syn-popup') as SynPopup;

      expect(popup).to.not.have.attribute('active')

      input.dispatchEvent(new CustomEvent('open'));

      expect(popup).to.have.attribute('active')
      /* eslint-enable */
    });

    it('should close popup on autocompletejs close event', async () => {
      const synInput = await fixture<SynInput>(html`
        <syn-input id="autocomplete" type="search"></syn-input>
      `);

      const { config: simpleConfig } = setupAutocomplete('#autocomplete');
      /* eslint-disable */
      new autoComplete({
        ...simpleConfig,
        data
      });

      const input = synInput.shadowRoot?.querySelector('input') as HTMLInputElement;
      const popup = synInput.shadowRoot?.querySelector('syn-popup') as SynPopup;
      popup.active = true;
      await popup.updateComplete;

      expect(popup).to.have.attribute('active')

      input.dispatchEvent(new CustomEvent('close'));
      
      expect(popup).to.not.have.attribute('active')
      /* eslint-enable */
    });

    it('should set value of selection to syn-input if setValueOnSelection=true', async () => {
      const synInput = await fixture<SynInput>(html`
        <syn-input id="autocomplete" type="search"></syn-input>
      `);

      const testValue = 'Test value';

      const { config: simpleConfig } = setupAutocomplete('#autocomplete');
      /* eslint-disable */
      new autoComplete({
        ...simpleConfig,
        data
      });

      const input = synInput.shadowRoot?.querySelector('input') as HTMLInputElement;

      expect(synInput).to.have.value('');
      
      input.dispatchEvent(new CustomEvent('selection', { detail: { selection : { value: testValue} } }));
      
      expect(synInput).to.have.value(testValue);
      /* eslint-enable */
    });

    it('should not set value of selection to syn-input if setValueOnSelection=false', async () => {
      const synInput = await fixture<SynInput>(html`
        <syn-input id="autocomplete" type="search"></syn-input>
      `);

      const testValue = 'Test value';

      const { config: simpleConfig } = setupAutocomplete('#autocomplete', { scrollSelectionIntoView: false, setValueOnSelection: false });
      /* eslint-disable */
      new autoComplete({
        ...simpleConfig,
        data
      });

      const input = synInput.shadowRoot?.querySelector('input') as HTMLInputElement;

      expect(synInput).to.have.value('');
      
      input.dispatchEvent(new CustomEvent('selection', { detail: { selection : { value: testValue} } }));
      
      expect(synInput).to.have.value('');
      /* eslint-enable */
    });
  });
});
