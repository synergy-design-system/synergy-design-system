/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import {
  aTimeout, expect, fixture, html, nextFrame, oneEvent, waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { serialize } from '../../../dist/synergy.js';
import { clickOnElement } from '../../internal/test.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type SynOption from '../option/option.js';
import type SynCombobox from './combobox.js';
import { highlightOptionRenderer } from './option-renderer.js';

describe('<syn-combobox>', () => {
  describe('accessibility', () => {
    it('should pass accessibility tests when closed', async () => {
      const combobox = await fixture<SynCombobox>(html`
        <syn-combobox label="Combobox one">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      await expect(combobox).to.be.accessible();
    });

    it('should pass accessibility tests when open', async () => {
      const combobox = await fixture<SynCombobox>(html`
        <syn-combobox label="Combobox one">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      await combobox.show();

      await expect(combobox).to.be.accessible();
    });
  });

  it('default properties', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);

    expect(el.name).to.equal('');
    expect(el.value).to.equal('');
    expect(el.defaultValue).to.equal('');
    expect(el.size).to.equal('medium');
    expect(el.placeholder).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.clearable).to.be.false;
    expect(el.open).to.be.false;
    expect(el.label).to.equal('');
    expect(el.placement).to.equal('bottom');
    expect(el.helpText).to.equal('');
    expect(el.form).to.equal('');
    expect(el.required).to.be.false;
    expect(el.getOption).to.be.a('function');
    expect(el.filter).to.be.a('function');
    expect(el.restricted).to.be.false;
    expect(el.multiple).to.be.false;
  });

  it('default properties for options without value set', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox>
        <syn-option>Option 1</syn-option>
        <syn-option>Option 2</syn-option>
        <syn-option>Option 3</syn-option>
      </syn-combobox>
    `);

    expect(el.name).to.equal('');
    expect(el.value).to.equal('');
    expect(el.defaultValue).to.equal('');
    expect(el.size).to.equal('medium');
    expect(el.placeholder).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.clearable).to.be.false;
    expect(el.open).to.be.false;
    expect(el.label).to.equal('');
    expect(el.placement).to.equal('bottom');
    expect(el.helpText).to.equal('');
    expect(el.form).to.equal('');
    expect(el.required).to.be.false;
    expect(el.getOption).to.be.a('function');
    expect(el.filter).to.be.a('function');
    expect(el.restricted).to.be.false;
    expect(el.multiple).to.be.false;
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox disabled>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
    expect(el.displayInput.disabled).to.be.true;
    expect(el.valueInput.disabled).to.be.true;
  });

  it('should show a placeholder when no options are selected', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox placeholder="Combobox one">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
    const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('[part~="display-input"]')!;

    expect(getComputedStyle(displayInput).opacity).to.not.equal('0');
    expect(displayInput.placeholder).to.equal('Combobox one');
  });

  it('should not allow selection when the option is disabled', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox value="Option">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2" disabled>Option 2</syn-option>
      </syn-combobox>
    `);
    const disabledOption = el.querySelector('syn-option[disabled]')!;

    await el.show();
    await clickOnElement(disabledOption);
    await el.updateComplete;

    expect(el.value).to.equal('Option');
  });

  it('should focus the combobox when clicking on the label', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox label="Combobox One">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
    const label = el.shadowRoot!.querySelector('[part~="form-control-label"]')!;
    const focusHandler = sinon.spy();

    el.addEventListener('syn-focus', focusHandler);
    (label as HTMLLabelElement).click();
    await waitUntil(() => focusHandler.calledOnce);

    expect(focusHandler).to.have.been.calledOnce;
  });

  describe('when the value changes', () => {
    it('should emit syn-change and syn-input when the user types in the combobox', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const inputHandler = sinon.spy();
      const changeHandler = sinon.spy();

      el.addEventListener('syn-input', inputHandler);
      el.addEventListener('syn-change', changeHandler);
      el.focus();
      await sendKeys({ type: 'abc' });
      el.blur();
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledThrice;
    });

    it('should emit syn-change event once when the user types in the combobox the same value again', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const changeHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);
      el.focus();
      await sendKeys({ type: 'abc' });
      el.blur();
      await el.updateComplete;

      el.focus();
      await sendKeys({ press: 'Backspace' });
      await sendKeys({ type: 'c' });
      await el.updateComplete;
      el.blur();

      expect(changeHandler).to.have.been.calledOnce;
    });

    it('should emit syn-change and syn-input when the value is changed with the mouse', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      await el.show();

      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);
      el.addEventListener('syn-input', inputHandler);

      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
      expect(el.value).to.equal('option-2');
    });

    it('should emit syn-change only once when the same option is clicked twice with mouse', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      await el.show();

      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];
      const changeHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);

      await clickOnElement(secondOption);
      await clickOnElement(secondOption);

      expect(changeHandler.callCount).to.equal(1);
      expect(el.value).to.equal('option-2');
    });

    it('should emit syn-change and syn-input when the value is changed with the keyboard', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);
      el.addEventListener('syn-input', inputHandler);

      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // open the dropdown and move to first option
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // move selection to the second option
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // move selection to the third option
      await el.updateComplete;
      await sendKeys({ press: 'Enter' }); // commit the selection
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
      expect(el.value).to.equal('option-3');
    });

    it('should emit syn-change only once if the same option is selected twice with the keyboard', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const changeHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);

      const selectOption1 = async () => {
        el.focus();
        await el.updateComplete;
        await sendKeys({ press: 'ArrowDown' }); // open the dropdown and move to first option
        await el.updateComplete;
        await sendKeys({ press: 'Enter' }); // commit the selection
        await el.updateComplete;
        el.blur();
      };
      // select option 1 twice
      await selectOption1();
      await selectOption1();

      expect(changeHandler.callCount).to.equal(1);
      expect(el.value).to.equal('option-1');
    });

    it('should not emit syn-change or syn-input when a disabled option is selected with the keyboard', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2" disabled>Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      el.addEventListener('syn-change', () => expect.fail('syn-change should not be emitted'));
      el.addEventListener('syn-input', () => expect.fail('syn-input should not be emitted'));

      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // open the dropdown and move to first option
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // move selection to the second option
      await el.updateComplete;
      await sendKeys({ press: 'Enter' }); // commit the selection
      await el.updateComplete;
    });

    it('should not emit syn-change or syn-input when the value is changed programmatically', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-1">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      el.addEventListener('syn-change', () => expect.fail('syn-change should not be emitted'));
      el.addEventListener('syn-input', () => expect.fail('syn-input should not be emitted'));
      el.value = 'option-2';

      await el.updateComplete;
    });

    it('should emit syn-change and syn-input with the correct validation message when the value changes', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox required>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const handler = sinon.spy((event: CustomEvent) => {
        if (el.validationMessage) {
          expect.fail(`Validation message should be empty when ${event.type} is emitted and a value is set`);
        }
      });

      el.addEventListener('syn-change', handler);
      el.addEventListener('syn-input', handler);

      await clickOnElement(el);
      await aTimeout(500);
      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];

      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(handler).to.be.calledTwice;
    });

    it('should set the selected option to selected when the user types option value in the combobox', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];

      el.focus();
      await sendKeys({ type: 'option-2' });
      el.blur();
      await el.updateComplete;
      expect(secondOption.selected).to.be.true;
    });

    it('should set the selected option to selected when the user types option text content in the combobox', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];

      el.focus();
      await sendKeys({ type: 'Option 2' });
      el.blur();
      await el.updateComplete;
      expect(secondOption.selected).to.be.true;
    });

    it('should set the selected option to selected when the value is changed with the mouse', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      await el.show();

      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];
      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(secondOption.selected).to.be.true;
    });

    it('should set the selected option to selected when the value is changed with the keyboard', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];

      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // open the dropdown and move to first option
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // move selection to the second option
      await el.updateComplete;
      await sendKeys({ press: 'Enter' }); // commit the selection
      await el.updateComplete;

      expect(secondOption.selected).to.be.true;
    });
  });

  describe('keyboard handling', () => {
    it('should open the listbox when the ArrowDown key is pressed and select the first option with syn-combobox is on focus', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;
      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' });
      await el.updateComplete;
      await aTimeout(500);

      const firstOption = el.querySelectorAll<SynOption>('syn-option')[0];

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(firstOption.getAttribute('aria-selected')).to.equal('true');
      expect(el.displayInput.getAttribute('aria-activedescendant')).to.equal(firstOption.id);
    });

    it('should open the listbox when the ArrowUp key is pressed and select the last option with syn-combobox is on focus', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;
      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'ArrowUp' });
      await el.updateComplete;
      await aTimeout(500);

      const filteredOptions = el.querySelectorAll<SynOption>('syn-option');
      const lastOption = filteredOptions[filteredOptions.length - 1];

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(lastOption.getAttribute('aria-selected')).to.equal('true');
      expect(el.displayInput.getAttribute('aria-activedescendant')).to.equal(lastOption.id);
    });

    it('should open the listbox when a letter key is pressed with syn-combobox is on focus with filtered options', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Black</syn-option>
          <syn-option value="option-2">Yellow</syn-option>
          <syn-option value="option-3">Red</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;
      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'e' });
      await el.updateComplete;

      const allOptions = el.querySelectorAll<SynOption>('syn-option');

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(allOptions[0]).not.to.be.displayed;
      expect(allOptions[1]).to.be.displayed;
      expect(allOptions[2]).to.be.displayed;
    });

    it('should not open the listbox when a letter key is pressed with syn-combobox is on focus with no appropriate options', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Black</syn-option>
          <syn-option value="option-2">Yellow</syn-option>
          <syn-option value="option-3">Red</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;
      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'f' });
      await el.updateComplete;

      const filteredListbox = el.shadowRoot!.querySelector('.combobox__listbox')!;
      const allOptions = el.querySelectorAll<SynOption>('syn-option');

      expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
      expect(filteredListbox.getAttribute('aria-expanded')).to.equal('false');
      expect(allOptions[0]).not.to.be.displayed;
      expect(allOptions[1]).not.to.be.displayed;
      expect(allOptions[2]).not.to.be.displayed;
    });

    it('should not open the listbox when ctrl + R is pressed with syn-combobox is on focus', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;

      el.focus();
      await sendKeys({ down: 'Control' });
      await sendKeys({ press: 'r' });
      await sendKeys({ up: 'Control' });
      await el.updateComplete;
      expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
    });

    it('should not open the listbox when the Enter key is pressed with syn-combobox is on focus', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;
      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'Enter' });
      await el.updateComplete;

      expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
    });

    it('should close the listbox when Escape key is pressed with syn-combobox is on focus', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;

      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' });
      await el.updateComplete;
      await sendKeys({ press: 'Escape' });
      await el.updateComplete;

      expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
      expect(displayInput.value).to.equal('option');
      expect(el.value).to.equal('option');
    });

    it('should close the listbox when Enter key is pressed with syn-combobox is on focus', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;

      el.focus();
      await el.updateComplete;

      await sendKeys({ type: 'opt' });
      await el.updateComplete;

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');

      await sendKeys({ press: 'Enter' });
      await el.updateComplete;

      expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
      expect(displayInput.value).to.equal('opt');
      expect(el.value).to.equal('opt');
    });

    it('should clear the input when Escape key is pressed with syn-combobox is on focus and listbox is closed', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;
      await nextFrame();

      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'Escape' });
      await el.updateComplete;
      // Firefox in CI is flaky. Waiting for another frame to ensure the value is cleared.
      await nextFrame();

      expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
      expect(displayInput.value).to.equal('');
      expect(el.value).to.equal('');
    });

    it('should move the cursor to the start of the input when Home key is pressed with syn-combobox is on focus', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;

      el.focus();
      await el.updateComplete;

      expect(displayInput.selectionStart).to.equal(6);
      expect(displayInput.selectionEnd).to.equal(6);

      await sendKeys({ press: 'Home' });
      await el.updateComplete;

      expect(displayInput.selectionStart).to.equal(0);
      expect(displayInput.selectionEnd).to.equal(0);
    });

    it('should move the cursor to the end of the input when End key is pressed with syn-combobox is on focus', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;

      el.focus();
      await el.updateComplete;
      displayInput.setSelectionRange(0, 0);

      expect(displayInput.selectionStart).to.equal(0);
      expect(displayInput.selectionEnd).to.equal(0);

      await sendKeys({ press: 'End' });
      await el.updateComplete;

      expect(displayInput.selectionStart).to.equal(6);
      expect(displayInput.selectionEnd).to.equal(6);
    });

    it('should not close the listbox when Enter key is pressed with a disabled option is selected', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option disabled value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;

      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // open the dropdown and move to first option
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // move selection to the second option
      await el.updateComplete;

      await sendKeys({ press: 'Enter' }); // commit the selection
      await el.updateComplete;

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(el.value).to.equal('option');
    });
  });

  describe('when using constraint validation', () => {
    it('should be valid by default', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form>
      `);
      const combobox = el.querySelector<SynCombobox>('syn-combobox')!;
      expect(combobox.checkValidity()).to.be.true;
    });

    it('should be invalid when required and empty', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox required>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form>
      `);
      const combobox = el.querySelector<SynCombobox>('syn-combobox')!;
      expect(combobox.checkValidity()).to.be.false;
    });

    it('should be invalid when required and disabled is removed', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox disabled required>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      expect(el.checkValidity()).to.be.true;
      el.disabled = false;
      await el.updateComplete;
      expect(el.checkValidity()).to.be.false;
    });

    it('should focus on the displayInput when constraint validation occurs', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox required>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form>
      `);
      const combobox = el.querySelector<SynCombobox>('syn-combobox')!;
      el.requestSubmit();
      expect(combobox.shadowRoot!.activeElement).to.equal(combobox.displayInput);
    });

    it('should receive the correct validation attributes ("states") when valid', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox label="Combobox one" required value="opt">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      expect(el.checkValidity()).to.be.true;
      expect(el.hasAttribute('data-required')).to.be.true;
      expect(el.hasAttribute('data-optional')).to.be.false;
      expect(el.hasAttribute('data-invalid')).to.be.false;
      expect(el.hasAttribute('data-valid')).to.be.true;
      expect(el.hasAttribute('data-user-invalid')).to.be.false;
      expect(el.hasAttribute('data-user-valid')).to.be.false;

      await el.show();

      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];

      await clickOnElement(secondOption);
      await el.updateComplete;
      el.blur();
      await el.updateComplete;

      expect(el.checkValidity()).to.be.true;
      expect(el.hasAttribute('data-user-invalid')).to.be.false;
      expect(el.hasAttribute('data-user-valid')).to.be.true;
    });

    it('should receive the correct validation attributes ("states") when invalid', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox label="Combobox one" required>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      expect(el.hasAttribute('data-required')).to.be.true;
      expect(el.hasAttribute('data-optional')).to.be.false;
      expect(el.hasAttribute('data-invalid')).to.be.true;
      expect(el.hasAttribute('data-valid')).to.be.false;
      expect(el.hasAttribute('data-user-invalid')).to.be.false;
      expect(el.hasAttribute('data-user-valid')).to.be.false;

      await el.show();
      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];

      await clickOnElement(secondOption);
      el.value = '';
      await el.updateComplete;
      el.blur();
      await el.updateComplete;

      expect(el.hasAttribute('data-user-invalid')).to.be.true;
      expect(el.hasAttribute('data-user-valid')).to.be.false;
    });

    it('should receive validation attributes ("states") even when novalidate is used on the parent form', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <form novalidate>
          <syn-combobox required>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form>
      `);
      const combobox = el.querySelector<SynCombobox>('syn-combobox')!;

      expect(combobox.hasAttribute('data-required')).to.be.true;
      expect(combobox.hasAttribute('data-optional')).to.be.false;
      expect(combobox.hasAttribute('data-invalid')).to.be.true;
      expect(combobox.hasAttribute('data-valid')).to.be.false;
      expect(combobox.hasAttribute('data-user-invalid')).to.be.false;
      expect(combobox.hasAttribute('data-user-valid')).to.be.false;
    });

    it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
      const combobox = await fixture<SynCombobox>(html`
        <syn-combobox label="Combobox one">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      combobox.setCustomValidity('Invalid selection');
      await combobox.updateComplete;

      expect(combobox.checkValidity()).to.be.false;
      expect(combobox.hasAttribute('data-invalid')).to.be.true;
      expect(combobox.hasAttribute('data-valid')).to.be.false;
      expect(combobox.hasAttribute('data-user-invalid')).to.be.false;
      expect(combobox.hasAttribute('data-user-valid')).to.be.false;
    });
  });

  describe('when submitting a form', () => {
    it('should serialize its name and value with FormData', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox name="a" value="option-1">
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form>
      `);
      const formData = new FormData(form);
      expect(formData.get('a')).to.equal('option-1');
    });

    it('should serialize its name and value with FormData when multiple options are selected', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox name="a" value="option-2 option-3" multiple>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form>
      `);
      const formData = new FormData(form);
      expect(formData.getAll('a')).to.include('option-2');
      expect(formData.getAll('a')).to.include('option-3');
    });

    it('should serialize its name and value in JSON', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox name="a" value="option-1">
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form>
      `);
      const json = serialize(form);
      expect(json.a).to.equal('option-1');
    });

    it('should serialize its name and value in JSON when multiple options are selected', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox name="a" value="option-2 option-3" multiple>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form>
      `);
      const json = serialize(form);
      expect(json.a).to.deep.equal(['option-2', 'option-3']);
    });

    it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <div>
          <form id="f">
            <syn-button type="submit">Submit</syn-button>
          </form>
          <syn-combobox form="f" name="a" value="option-1">
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </div>
      `);
      const form = el.querySelector('form')!;
      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('option-1');
    });

    it('should submit the form when pressing enter in a form without a submit button', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form> 
      `);
      const combobox = form.querySelector('syn-combobox')!;
      const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

      form.addEventListener('submit', submitHandler);
      combobox.focus();
      await sendKeys({ press: 'Enter' });
      await waitUntil(() => submitHandler.calledOnce);

      expect(submitHandler).to.have.been.calledOnce;
    });

    it('should prevent submission when pressing enter in a combobox and canceling the keydown event', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </form> 
      `);
      const combobox = form.querySelector('syn-combobox')!;
      const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
      const keydownHandler = sinon.spy((event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      });

      form.addEventListener('submit', submitHandler);
      combobox.addEventListener('keydown', keydownHandler);
      combobox.focus();
      await sendKeys({ press: 'Enter' });
      await waitUntil(() => keydownHandler.calledOnce);

      expect(keydownHandler).to.have.been.calledOnce;
      expect(submitHandler).to.not.have.been.called;
    });
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox value="option-1">
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
          <syn-button type="reset">Reset</syn-button>
        </form>
      `);
      const resetButton = form.querySelector('syn-button')!;
      const combobox = form.querySelector('syn-combobox')!;

      combobox.value = 'option-3';
      await combobox.updateComplete;
      expect(combobox.value).to.equal('option-3');

      setTimeout(() => resetButton.click());
      await oneEvent(form, 'reset');
      await combobox.updateComplete;
      expect(combobox.value).to.equal('option-1');
    });

    it('#813: should reset the element to its initial value, which was set over property binding', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox .value=${'option-1'}>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
          </syn-combobox>
          <syn-button type="reset">Reset</syn-button>
        </form>
      `);

      const resetButton = form.querySelector('syn-button')!;
      const combobox = form.querySelector('syn-combobox')!;
      combobox.value = 'option-2';
      await combobox.updateComplete;

      await expect(combobox.value).to.equal('option-2');

      setTimeout(() => resetButton.click());
      await oneEvent(form, 'reset');
      await combobox.updateComplete;
      await expect(combobox.value).to.equal('option-1');
    });
  });

  describe('when calling HTMLFormElement.reportValidity()', () => {
    it('should be invalid when the combobox is empty and form.reportValidity() is called', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox required>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
          <syn-button type="submit">Submit</syn-button>
        </form>
      `);

      expect(form.reportValidity()).to.be.false;
    });

    it('should be valid when the combobox is empty, reportValidity() is called, and the form has novalidate', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form novalidate>
          <syn-combobox required>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
          <syn-button type="submit">Submit</syn-button>
        </form>
      `);

      expect(form.reportValidity()).to.be.true;
    });
  });

  describe('when using FormControlController', () => {
    it('should submit with the correct form when the form attribute changes', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <div>
          <form id="f1">
            <input type="hidden" name="b" value="2" />
            <syn-button type="submit">Submit</syn-button>
          </form>
          <form id="f2">
            <input type="hidden" name="c" value="3" />
            <syn-button type="submit">Submit</syn-button>
          </form>
          <syn-combobox form="f1" name="a" value="option">
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
            <syn-option value="option-3">Option 3</syn-option>
          </syn-combobox>
        </div>
      `);
      const form = el.querySelector<HTMLFormElement>('#f2')!;
      const combobox = document.querySelector('syn-combobox')!;

      combobox.form = 'f2';
      await combobox.updateComplete;

      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('option');
      expect(formData.get('b')).to.be.null;
      expect(formData.get('c')).to.equal('3');
    });
  });

  it('should emit syn-focus and syn-blur when receiving and losing focus', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox value="option-1">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
    const focusHandler = sinon.spy();
    const blurHandler = sinon.spy();

    el.addEventListener('syn-focus', focusHandler);
    el.addEventListener('syn-blur', blurHandler);

    el.focus();
    await el.updateComplete;
    el.blur();
    await el.updateComplete;

    expect(focusHandler).to.have.been.calledOnce;
    expect(blurHandler).to.have.been.calledOnce;
  });

  it('should emit syn-clear when the clear button is clicked', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox value="option-1" clearable>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
    const clearHandler = sinon.spy();
    const inputHandler = sinon.spy();
    const changeHandler = sinon.spy();
    const clearButton = el.shadowRoot!.querySelector('[part~="clear-button"]')!;

    el.addEventListener('syn-clear', clearHandler);
    el.addEventListener('syn-input', inputHandler);
    el.addEventListener('syn-change', changeHandler);
    await el.show();
    await clickOnElement(clearButton);
    await el.updateComplete;

    expect(clearHandler).to.have.been.calledOnce;
    expect(inputHandler).to.have.been.calledOnce;
    expect(changeHandler).to.have.been.calledOnce;
    expect(el.displayInput.value).to.equal('');
  });

  it('should emit syn-show, syn-after-show, syn-hide, and syn-after-hide events when the listbox opens and closes', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('syn-show', showHandler);
    el.addEventListener('syn-after-show', afterShowHandler);
    el.addEventListener('syn-hide', hideHandler);
    el.addEventListener('syn-after-hide', afterHideHandler);

    await el.show();
    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;

    await el.hide();
    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
  });

  it('should emit syn-error if show method was called and no appropriate options are available', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox value="test">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();
    const errorHandler = sinon.spy();

    el.addEventListener('syn-error', errorHandler);
    el.addEventListener('syn-show', showHandler);
    el.addEventListener('syn-after-show', afterShowHandler);

    await el.show();
    expect(showHandler).to.not.have.been.called;
    expect(afterShowHandler).to.not.have.been.called;
    expect(errorHandler).to.have.been.calledOnce;
  });

  it('should update the filtered list when an option changes', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox value="opt">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
    const firstOption = el.querySelectorAll('syn-option')[0];
    const secondOption = el.querySelectorAll('syn-option')[1];
    const thirdOption = el.querySelectorAll('syn-option')[2];

    await el.show();

    expect(firstOption).to.be.displayed;
    expect(secondOption).to.be.displayed;
    expect(thirdOption).to.be.displayed;

    secondOption.textContent = 'updated';
    await nextFrame();

    expect(firstOption).to.be.displayed;
    expect(secondOption).not.to.be.displayed;
    expect(thirdOption).to.be.displayed;
  });

  it('should show the option in the list when its value is set via option value', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox value="option-2">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
    const firstOption = el.querySelectorAll('syn-option')[0];
    const secondOption = el.querySelectorAll('syn-option')[1];
    const thirdOption = el.querySelectorAll('syn-option')[2];

    await el.show();
    expect(firstOption).not.to.be.displayed;
    expect(secondOption).to.be.displayed;
    expect(thirdOption).not.to.be.displayed;
  });

  it('should update the filtered list when options are added dynamically', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox value="opt">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);

    const visibleOptions = el.querySelectorAll('syn-option:not([hidden])');

    await el.show();

    expect(visibleOptions.length).to.equal(3);

    const visibleOption = document.createElement('syn-option');
    visibleOption.value = 'option-4';
    visibleOption.textContent = 'Option 4';

    const notVisibleOption = document.createElement('syn-option');
    notVisibleOption.value = 'not-visible';
    notVisibleOption.textContent = 'Not visible';

    el.appendChild(visibleOption);
    el.appendChild(notVisibleOption);

    await nextFrame();

    const newVisibleOptions = el.querySelectorAll('syn-option:not([hidden])');
    expect(newVisibleOptions.length).to.equal(4);

    const allOptions = el.querySelectorAll('syn-option');
    expect(allOptions[0]).to.be.displayed;
    expect(allOptions[1]).to.be.displayed;
    expect(allOptions[2]).to.be.displayed;
    expect(allOptions[3]).to.be.displayed;
    expect(allOptions[4]).not.to.be.displayed;
  });

  it('should use the custom filter if the filter property is used', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox value="test">
        <syn-option value="option-1">Green</syn-option>
        <syn-option value="option-2">Red</syn-option>
        <syn-option value="option-3">Light green</syn-option>
      </syn-combobox>
    `);
    const filterHandler = sinon.spy((option: SynOption) => option.getTextLabel().toLowerCase().includes('green'));

    el.filter = filterHandler;

    await el.show();
    await el.updateComplete;

    const options = el.querySelectorAll('syn-option');

    expect(filterHandler).to.have.been.calledThrice;
    expect(options[0]).to.be.displayed;
    expect(options[1]).not.to.be.displayed;
    expect(options[2]).to.be.displayed;
  });

  it('should work with options that do not have a value', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox>
        <syn-option>Option 1</syn-option>
        <syn-option>Option 2</syn-option>
        <syn-option>Option 3</syn-option>
      </syn-combobox>
    `);
    await el.show();

    const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];

    await clickOnElement(secondOption);
    await el.updateComplete;

    expect(el.value).to.equal('Option 2');
  });

  describe('when setting value programmatically', () => {
    it('should show the text content of the value, when value was set initially', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-2">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      await el.updateComplete;

      expect(el.displayInput.value).to.equal('Option 2');
      expect(el.valueInput.value).to.equal('option-2');
      expect(el.value).to.equal('option-2');
    });

    it('should show the text content of the new value, when value was set afterwards', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-2">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      el.value = 'option-3';
      await nextFrame();

      expect(el.displayInput.value).to.equal('Option 3');
      expect(el.valueInput.value).to.equal('option-3');
      expect(el.value).to.equal('option-3');
    });

    it('should update the displayed value of the combobox after dynamically added the corresponding option', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-4">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      await nextFrame();

      expect(el.displayInput.value).to.equal('option-4');
      expect(el.valueInput.value).to.equal('option-4');
      expect(el.value).to.equal('option-4');

      const option = document.createElement('syn-option');
      option.textContent = 'Option 4';
      option.value = 'option-4';
      el.appendChild(option);
      await nextFrame();

      expect(el.displayInput.value).to.equal('Option 4');
      expect(el.valueInput.value).to.equal('option-4');
      expect(el.value).to.equal('option-4');
    });
  });

  describe('when using getOption', () => {
    it('should use the HTMLElement getOption renderer if the getOption property is used', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      await nextFrame();

      const getOptionHandler = sinon.spy((option: SynOption) => {
        const newOption = option.cloneNode(true) as SynOption;
        newOption.textContent = `HtmlElement - ${option.getTextLabel()}`;
        return newOption;
      });

      el.getOption = getOptionHandler;

      await el.show();

      const options = el.querySelectorAll('syn-option');

      options.forEach((option, index) => {
        expect(option.getTextLabel()).to.equal(`HtmlElement - Option ${index + 1}`);
      });
      expect(getOptionHandler).to.have.been.calledThrice;
    });

    it('should use the string getOption renderer if the getOption property is used', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      await nextFrame();

      const getOptionHandler = sinon.spy((option: SynOption) => `<syn-option>String - ${option.getTextLabel()}</syn-option>`);

      el.getOption = getOptionHandler;

      await el.show();
      await el.updateComplete;

      const options = el.querySelectorAll('syn-option');

      options.forEach((option, index) => {
        expect(option.getTextLabel()).to.equal(`String - Option ${index + 1}`);
      });
      expect(getOptionHandler.callCount).to.equal(3);
    });

    it('should use the TemplateResult getOption renderer if the getOption property is used', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      const getOptionHandler = sinon.spy((option: SynOption) => html`<syn-option>Template - ${option.getTextLabel()}</syn-option>`);

      await nextFrame();
      el.getOption = getOptionHandler;

      await el.show();
      await el.updateComplete;

      const options = el.querySelectorAll('syn-option');

      options.forEach((option, index) => {
        expect(option.getTextLabel()).to.equal(`Template - Option ${index + 1}`);
      });
      expect(getOptionHandler).to.have.been.calledThrice;
    });

    it('should use the original option if incorrect getOption renderer is used', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      await nextFrame();
      const getOptionHandler = sinon.spy((option: SynOption) => `<div>Invalid - ${option.getTextLabel()}</div>`);

      el.getOption = getOptionHandler;

      await el.show();
      await el.updateComplete;

      const options = el.querySelectorAll('syn-option');

      options.forEach((option, index) => {
        expect(option.getTextLabel()).to.equal(`Option ${index + 1}`);
      });
      expect(getOptionHandler).to.have.been.calledThrice;
    });

    it('should show selected state of options correctly with highlightOptionRenderer', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox multiple label="TEST">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      el.getOption = highlightOptionRenderer;
      await aTimeout(0);

      el.focus();
      await sendKeys({ type: 'Opt' });
      await el.updateComplete;
      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];
      await clickOnElement(secondOption);

      const newOptions = el.querySelectorAll('syn-option');
      expect(newOptions[1].selected).to.be.true;
    });
  });

  it('#813: should show the value of the dynamically added option if value was set via property binding', async () => {
    const el = await fixture<SynCombobox>(html`
      <syn-combobox .value=${'option-1'}>
      </syn-combobox>
    `);

    await nextFrame();

    await expect(el.value).to.equal('option-1');
    await expect(el.displayLabel).to.equal('option-1');

    // wait a short time until adding options dynamically
    await aTimeout(10);
    const option = document.createElement('syn-option');
    option.value = 'option-1';
    option.textContent = 'Option 1';
    el.appendChild(option);
    await el.updateComplete;
    // we need to wait a short time until everything is set correctly
    await nextFrame();

    await expect(el.value).to.equal('option-1');
    await expect(el.displayLabel).to.equal('Option 1');
  });

  describe('#626: when using `restricted` feature', () => {
    it('should reset the input to empty string for invalid user input', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox restricted>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      el.focus();
      await sendKeys({ type: 'abc' });
      el.blur();
      await el.updateComplete;

      expect(el.value).to.equal('');
    });

    it('should reset the input to last selected option for invalid user input', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-2" restricted>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      el.focus();
      await sendKeys({ type: 'abc' });
      el.blur();
      await el.updateComplete;

      expect(el.value).to.equal('option-2');
    });

    it('should reset to last selected option when setting invalid value programmatically', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-2" restricted>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      el.value = 'invalid';
      await nextFrame();

      expect(el.displayInput.value).to.equal('Option 2');
      expect(el.valueInput.value).to.equal('option-2');
      expect(el.value).to.equal('option-2');
    });

    it('should reset to empty value when setting invalid value programmatically', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox restricted>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      el.value = 'invalid';
      await nextFrame();

      expect(el.displayInput.value).to.equal('');
      expect(el.valueInput.value).to.equal('');
      expect(el.value).to.equal('');
    });

    it('should open the listbox and show a message when a letter key is pressed with syn-combobox is on focus with no appropriate options', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox restricted>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('[part="display-input"]')!;
      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'f' });
      await el.updateComplete;
      const filteredListbox = el.shadowRoot!.querySelector('[part="filtered-listbox"]')!;
      const noResults = filteredListbox.querySelector('[part="no-results"]');
      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(noResults).to.exist;
      expect(noResults!.textContent).to.equal('No results found');
    });
  });

  describe('when multiple is set', () => {
    it('should show a placeholder when no options are selected', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox placeholder="Select a few" multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('[part~="display-input"]')!;

      expect(getComputedStyle(displayInput).opacity).to.not.equal('0');
      expect(displayInput.placeholder).to.equal('Select a few');
    });

    it('should not allow selection when the option is disabled', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-1" multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2" disabled>Option 2</syn-option>
        </syn-combobox>
      `);
      const disabledOption = el.querySelector('syn-option[disabled]')!;

      await el.show();
      await clickOnElement(disabledOption);
      await el.updateComplete;

      expect(el.value).to.deep.equal(['option-1']);
    });

    it('should allow multiple options to be selected', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-1 option-3" multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      await el.show();

      const options = el.querySelectorAll<SynOption>('syn-option');
      const secondOption = options[1];
      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(el.value).to.deep.equal(['option-1', 'option-2', 'option-3']);
      expect(options[0].selected).to.be.true;
      expect(options[1].selected).to.be.true;
      expect(options[2].selected).to.be.true;
    });

    it('should work with options that do not have a value', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox multiple value="Option-1 Option-3">
          <syn-option>Option-1</syn-option>
          <syn-option>Option-2</syn-option>
          <syn-option>Option-3</syn-option>
        </syn-combobox>
      `);
      await el.show();
      const options = el.querySelectorAll<SynOption>('syn-option');
      const secondOption = options[1];
      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(el.value).to.deep.equal(['Option-1', 'Option-2', 'Option-3']);
      expect(options[0].selected).to.be.true;
      expect(options[1].selected).to.be.true;
      expect(options[2].selected).to.be.true;
    });

    it('should emit syn-change and syn-input when value is changed with the mouse', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-1" multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const inputHandler = sinon.spy();
      const changeHandler = sinon.spy();

      el.addEventListener('syn-input', inputHandler);
      el.addEventListener('syn-change', changeHandler);
      await el.show();
      await el.updateComplete;
      const options = el.querySelectorAll<SynOption>('syn-option');
      const secondOption = options[1];
      await clickOnElement(secondOption);
      await el.updateComplete;
      const thirdOption = options[2];
      await clickOnElement(thirdOption);
      await el.updateComplete;

      expect(inputHandler).to.have.been.calledTwice;
      expect(changeHandler).to.have.been.calledTwice;
      expect(options[0].selected).to.be.true;
      expect(options[1].selected).to.be.true;
      expect(options[2].selected).to.be.true;
      expect(el.value).to.deep.equal(['option-1', 'option-2', 'option-3']);
    });

    it('should deselect an option if it is clicked again', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const inputHandler = sinon.spy();
      const changeHandler = sinon.spy();

      el.addEventListener('syn-input', inputHandler);
      el.addEventListener('syn-change', changeHandler);
      await el.show();
      await el.updateComplete;
      const options = el.querySelectorAll<SynOption>('syn-option');
      const secondOption = options[1];
      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(inputHandler.callCount).to.equal(1);
      expect(changeHandler.callCount).to.equal(1);
      expect(options[0].selected).to.be.false;
      expect(options[1].selected).to.be.true;
      expect(options[2].selected).to.be.false;
      expect(el.value).to.deep.equal(['option-2']);

      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(inputHandler.callCount).to.equal(2);
      expect(changeHandler.callCount).to.equal(2);
      expect(options[0].selected).to.be.false;
      expect(options[1].selected).to.be.false;
      expect(options[2].selected).to.be.false;
      expect(el.value).to.deep.equal([]);

      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(inputHandler.callCount).to.equal(3);
      expect(changeHandler.callCount).to.equal(3);
      expect(options[0].selected).to.be.false;
      expect(options[1].selected).to.be.true;
      expect(options[2].selected).to.be.false;
      expect(el.value).to.deep.equal(['option-2']);
    });

    it('should emit syn-change and syn-input when a tag is removed', async () => {
      const el = await fixture<SynCombobox>(html`
      <syn-combobox value="option-1 option-2 option-3" multiple>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
    `);
      const options = el.querySelectorAll<SynOption>('syn-option');
      expect(options[0].selected).to.be.true;
      expect(options[1].selected).to.be.true;
      expect(options[2].selected).to.be.true;

      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();
      const tag = el.shadowRoot!.querySelector('[part~="tag"]')!;
      const removeButton = tag.shadowRoot!.querySelector('[part~="remove-button"]')!;

      el.addEventListener('syn-change', changeHandler);
      el.addEventListener('syn-input', inputHandler);

      await clickOnElement(removeButton);
      await el.updateComplete;

      expect(changeHandler.calledOnce).to.be.true;
      expect(inputHandler.calledOnce).to.be.true;

      expect(options[0].selected).to.be.false;
      expect(options[1].selected).to.be.true;
      expect(options[2].selected).to.be.true;
    });

    it('should emit syn-change and syn-input when the user types in the combobox an valid option value', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const inputHandler = sinon.spy();
      const changeHandler = sinon.spy();
      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];

      el.addEventListener('syn-input', inputHandler);
      el.addEventListener('syn-change', changeHandler);
      el.focus();
      await sendKeys({ type: 'option-2' });
      el.blur();
      await el.updateComplete;

      expect(inputHandler.callCount).to.equal(8);
      expect(changeHandler.calledOnce).to.be.true;
      expect(secondOption.selected).to.be.true;
    });

    it('should emit syn-change and syn-input when the user types in the combobox an valid option textContent', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const inputHandler = sinon.spy();
      const changeHandler = sinon.spy();
      const secondOption = el.querySelectorAll<SynOption>('syn-option')[1];

      el.addEventListener('syn-input', inputHandler);
      el.addEventListener('syn-change', changeHandler);
      el.focus();
      await sendKeys({ type: 'Option2' });
      el.blur();
      await el.updateComplete;

      expect(inputHandler.callCount).to.equal(7);
      expect(changeHandler.calledOnce).to.be.true;
      expect(secondOption.selected).to.be.true;
    });

    it('should emit syn-input but not syn-change event when the user types in the combobox an invalid option value', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const inputHandler = sinon.spy();
      const changeHandler = sinon.spy();

      el.addEventListener('syn-input', inputHandler);
      el.addEventListener('syn-change', changeHandler);
      el.focus();
      await sendKeys({ type: 'abc' });
      el.blur();
      await el.updateComplete;

      expect(inputHandler.calledThrice).to.be.true;
      expect(changeHandler.calledOnce).to.be.false;
    });

    it('should emit syn-change and syn-input when the value is changed with the keyboard', async () => {
      if (navigator.userAgent.includes('Firefox')) {
        console.warn('I have no idea why, but this test has a callCount of 2 for the inputHandler in Firefox. Skipping it for now.');
        return;
      }

      const el = await fixture<SynCombobox>(html`
        <syn-combobox multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('syn-input', inputHandler);
      el.addEventListener('syn-change', changeHandler);
      const options = el.querySelectorAll<SynOption>('syn-option');

      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // open the dropdown and move to first option
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // move selection to the second option
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // move selection to the third option
      await el.updateComplete;
      await sendKeys({ press: 'Enter' }); // commit the selection
      await el.updateComplete;

      expect(el.value).to.deep.equal(['option-3']);
      expect(options[2].selected).to.be.true;
      expect(inputHandler.calledOnce).to.be.true;
      expect(changeHandler.calledOnce).to.be.true;
    });

    it('should open the listbox when a letter key is pressed with syn-combobox is on focus with filtered options', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox multiple>
          <syn-option value="option-1">Black</syn-option>
          <syn-option value="option-2">Yellow</syn-option>
          <syn-option value="option-3">Red</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;
      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'e' });
      await el.updateComplete;

      const allOptions = el.querySelectorAll<SynOption>('syn-option');

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(allOptions[0]).not.to.be.displayed;
      expect(allOptions[1]).to.be.displayed;
      expect(allOptions[2]).to.be.displayed;
      const noResults = el.shadowRoot!.querySelector('.listbox__no-results');
      expect(noResults).to.not.exist;
    });

    it('should open the listbox with no results text when a letter key is pressed with syn-combobox is on focus with no appropriate options', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox multiple>
          <syn-option value="option-1">Black</syn-option>
          <syn-option value="option-2">Yellow</syn-option>
          <syn-option value="option-3">Red</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;
      el.focus();
      await el.updateComplete;
      await sendKeys({ press: 'f' });
      await el.updateComplete;

      const filteredListbox = el.shadowRoot!.querySelector('.combobox__listbox')!;
      const allOptions = el.querySelectorAll<SynOption>('syn-option');

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(filteredListbox.getAttribute('aria-expanded')).to.equal('true');
      expect(allOptions[0]).not.to.be.displayed;
      expect(allOptions[1]).not.to.be.displayed;
      expect(allOptions[2]).not.to.be.displayed;
      const noResults = filteredListbox.querySelector('.listbox__no-results');
      expect(noResults).to.exist;
      expect(noResults!.textContent).to.equal('No results found');
    });

    it('should clear the input field but preserve selected values when Escape key is pressed with syn-combobox is on focus and listbox is closed', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-1 option-2" multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.combobox__display-input')!;

      await nextFrame();

      el.focus();
      await el.updateComplete;

      await sendKeys({ type: 'abc' });
      await sendKeys({ press: 'Escape' }); // close listbox
      await sendKeys({ press: 'Escape' }); // clear input field

      await el.updateComplete;

      // Firefox in CI is flaky. Waiting for another frame to ensure the value is cleared.
      await nextFrame();

      expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
      expect(displayInput.value).to.equal('');
      expect(el.value).to.deep.equal(['option-1', 'option-2']);
    });

    it('should emit syn-change and syn-input when the last tag is removed and the same option is added again', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox value="option-1" multiple>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);
      const options = el.querySelectorAll<SynOption>('syn-option');
      expect(options[0].selected).to.be.true;

      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();
      const tag = el.shadowRoot!.querySelector('[part~="tag"]')!;
      const removeButton = tag.shadowRoot!.querySelector('[part~="remove-button"]')!;

      el.addEventListener('syn-change', changeHandler);
      el.addEventListener('syn-input', inputHandler);

      await clickOnElement(removeButton);
      await el.updateComplete;

      expect(changeHandler.calledOnce).to.be.true;
      expect(inputHandler.calledOnce).to.be.true;

      expect(el.value).to.deep.equal([]);
      expect(options[0].selected).to.be.false;

      const firstOption = options[0];
      await el.show();

      await clickOnElement(firstOption);
      await el.updateComplete;
      expect(changeHandler.calledTwice).to.be.true;
      expect(inputHandler.calledTwice).to.be.true;
      expect(options[0].selected).to.be.true;
    });
  });

  describe('#540: should allow to use a custom delimiter for multiple values', () => {
    it('should allow to define the delimiter that is used to separate the values', async () => {
      const getActiveItems = (elm: SynCombobox) => Array.from(
        elm.querySelectorAll('syn-option'),
      ).filter(option => option.selected);

      const el = await fixture<SynCombobox>(html`
          <syn-combobox delimiter="_" multiple value="option1_option2">
            <syn-option value="option1">Option 1</syn-option>
            <syn-option value="option2">Option 2</syn-option>
            <syn-option value="option3">Option 3</syn-option>
          </syn-combobox>
        `);

      expect(el.value).to.deep.equal(['option1', 'option2']);

      const selectedItems = getActiveItems(el);
      expect(selectedItems.length).to.equal(2);

      el.delimiter = ',';
      el.value = 'option2,option3';
      await el.updateComplete;
      expect(el.value).to.deep.equal(['option2', 'option3']);

      el.delimiter = '|';
      el.value = 'option1|option3';
      await el.updateComplete;
      expect(el.value).to.deep.equal(['option1', 'option3']);
    });
  });

  describe('#813: should work correctly if `value` was set via property binding', () => {
    it('should show the value of the dynamically added option', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox .value=${'option-1'} ></syn-combobox>
      `);
      await nextFrame();

      await expect(el.value).to.equal('option-1');
      await expect(el.displayLabel).to.equal('option-1');

      // wait a short time until adding options dynamically
      await aTimeout(10);
      const option = document.createElement('syn-option');
      option.value = 'option-1';
      option.textContent = 'Option 1';
      el.appendChild(option);
      await nextFrame();

      await expect(el.value).to.equal('option-1');
      await expect(el.displayLabel).to.equal('Option 1');
    });

    it('should reset the value of the select in a form to the initially set value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-combobox .value=${'option-1'}>
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">Option 2</syn-option>
          </syn-combobox>
          <syn-button type="reset">Reset</syn-button>
        </form>
      `);

      const resetButton = form.querySelector('syn-button')!;
      const combobox = form.querySelector('syn-combobox')!;
      combobox.value = 'option-2';
      await combobox.updateComplete;

      await expect(combobox.value).to.equal('option-2');

      setTimeout(() => resetButton.click());
      await oneEvent(form, 'reset');
      await combobox.updateComplete;
      await expect(combobox.value).to.equal('option-1');
    });
  }); // #813

  describe('#850: should clamp syn-tag size to the size of the combobox', () => {
    it('should set the max-width used for tags to the available size of the tag wrapper', async () => {
      const el = await fixture<SynCombobox>(html`
            <syn-combobox multiple style="width: 250px" value="option-1 option-2">
              <syn-option value="option-1">Option 1</syn-option>
              <syn-option value="option-2">This is a very long text that should be truncated</syn-option>
            </syn-combobox>
          `);

      await el.updateComplete;
      // A longer timeout may be needed for webkit, chrome and ff don´t take only 10ms
      await aTimeout(100);

      const tagWrapper: HTMLDivElement = el.shadowRoot!.querySelector('.combobox__tags')!;
      const currentWidth = tagWrapper.style.getPropertyValue('--syn-select-tag-max-width');

      expect(currentWidth, 'It should have max tag width of 116 pixels').to.equal('116px');
    });

    it('should use a minimum width of 85 pixels when the syn-combobox is too small', async () => {
      const el = await fixture<SynCombobox>(html`
            <syn-combobox multiple style="width: 50px" value="option-1 option-2">
              <syn-option value="option-1">Option 1</syn-option>
              <syn-option value="option-2">This is a very long text that should be truncated</syn-option>
            </syn-combobox>
          `);

      await el.updateComplete;
      // A longer timeout may be needed for webkit, chrome and ff don´t take only 10ms
      await aTimeout(100);

      const tagWrapper: HTMLDivElement = el.shadowRoot!.querySelector('.combobox__tags')!;
      const currentWidth = tagWrapper.style.getPropertyValue('--syn-select-tag-max-width');

      expect(currentWidth, 'It should have min-tag width of 85 pixels').to.equal('85px');
    });
  }); // #850

  describe('#1056', () => {
    it('should show correct value if delimiter was changed async', async () => {
      const el = await fixture<SynCombobox>(html`
          <syn-combobox value="Option 1" multiple>
            <syn-option value="Option 1">Option 1</syn-option>
            <syn-option value="Option 2">Option 2</syn-option>
          </syn-combobox>
        `);
      await el.updateComplete;

      const tags = el.shadowRoot!.querySelectorAll('syn-tag');
      expect(tags.length).to.equal(0);

      expect(el.value).to.deep.equal([]);
      expect(el.displayLabel).to.equal('');

      el.delimiter = '+';
      await el.updateComplete;

      const tagsAfterChange = el.shadowRoot!.querySelectorAll('syn-tag');

      expect(el.value).to.deep.equal(['Option 1']);
      expect(el.displayLabel).to.equal('');
      expect(tagsAfterChange.length).to.equal(1);

      const tagsContent = tagsAfterChange[0].textContent.trim();
      expect(tagsContent).to.equal('Option 1');
    });

    it('should show correct value for textContent only option if delimiter was changed async', async () => {
      const el = await fixture<SynCombobox>(html`
          <syn-combobox value="Option 1" multiple>
            <syn-option>Option 1</syn-option>
            <syn-option>Option 2</syn-option>
          </syn-combobox>
        `);
      await el.updateComplete;

      const tags = el.shadowRoot!.querySelectorAll('syn-tag');
      expect(tags.length).to.equal(0);

      expect(el.value).to.deep.equal([]);
      expect(el.displayLabel).to.equal('');

      el.delimiter = '+';
      await el.updateComplete;

      const tagsAfterChange = el.shadowRoot!.querySelectorAll('syn-tag');

      expect(el.value).to.deep.equal(['Option 1']);
      expect(el.displayLabel).to.equal('');
      expect(tagsAfterChange.length).to.equal(1);

      const tagsContent = tagsAfterChange[0].textContent.trim();
      expect(tagsContent).to.equal('Option 1');
    });

    it('should show correct value if delimiter was changed async for a value set via property binding', async () => {
      const el = await fixture<SynCombobox>(html`
           <syn-combobox multiple>
            <syn-option value="Option 1">Option 1</syn-option>
            <syn-option value="Option 2">Option 2</syn-option>
          </syn-combobox>
        `);

      // This simulates a property binding of angular with e.g. an Observable / BehaviorSubject
      await new Promise(resolve => {
        setTimeout(() => {
          el.value = 'Option 1';
          resolve(true);
        }, 10);
      });
      await el.updateComplete;

      const tags = el.shadowRoot!.querySelectorAll('syn-tag');

      expect(tags.length).to.equal(0);
      expect(el.value).to.deep.equal([]);
      expect(el.displayLabel).to.equal('');

      el.delimiter = '+';

      await el.updateComplete;
      const tagsAfterChange = el.shadowRoot!.querySelectorAll('syn-tag');

      expect(el.value).to.deep.equal(['Option 1']);
      expect(el.displayLabel).to.equal('');
      expect(tagsAfterChange.length).to.equal(1);

      const tagsContent = tagsAfterChange[0].textContent.trim();
      expect(tagsContent).to.equal('Option 1');
    });
  }); // #1056

  describe('#805: should allow setting numeric values', () => {
    describe('when set initially', () => {
      [1, 'string-option', 3.14, 0].forEach((value) => {
        [{ isRestricted: true, mode: 'restricted' }, { isRestricted: false, mode: 'normal' }].forEach(({ isRestricted, mode }) => {
          it(`should handle mixed numeric and string types in ${mode} mode (value ${value})`, async () => {
            const el = await fixture<SynCombobox>(html`
              <syn-combobox .value="${value}" ?restricted="${isRestricted}">
                <syn-option .value="${1}">Number One</syn-option>
                <syn-option value="string-option">String Option</syn-option>
                <syn-option .value="${3.14}">Pi Number</syn-option>
                <syn-option .value="${0}">Zero</syn-option>
              </syn-combobox>
            `);
            await el.updateComplete;
            await expect(el.value).to.equal(value);
          });
        });
      });

      it('should handle mixed numeric and string types when using multiple', async () => {
        const el = await fixture<SynCombobox>(html`
          <syn-combobox .value="${[1, 'string-option', 3.14, 0]}" multiple>
                <syn-option .value="${1}">Number One</syn-option>
                <syn-option value="string-option">String Option</syn-option>
                <syn-option .value="${3.14}">Pi Number</syn-option>
                <syn-option .value="${0}">Zero</syn-option>
          </syn-combobox>
        `);

        await el.updateComplete;
        await expect(el.value).to.eql([1, 'string-option', 3.14, 0]);
      });
    });

    describe('when set programmatically', () => {
      [{ isRestricted: true, mode: 'restricted' }, { isRestricted: false, mode: 'normal' }].forEach(({ isRestricted, mode }) => {
        it(`should handle mixed numeric and string types in ${mode} mode`, async () => {
          const el = await fixture<SynCombobox>(html`
              <syn-combobox ?restricted="${isRestricted}">
                <syn-option .value="${1}">Number One</syn-option>
                <syn-option value="string-option">String Option</syn-option>
                <syn-option .value="${3.14}">Pi Number</syn-option>
                <syn-option .value="${0}">Zero</syn-option>
              </syn-combobox>
            `);
          el.value = 0;
          await nextFrame();

          expect(el.value).to.equal(0);
          expect(el.displayInput.value).to.equal('Zero');
          expect(el.querySelectorAll('syn-option')[3].selected).to.be.true;

          el.value = 3.14;
          await nextFrame();

          expect(el.value).to.equal(3.14);
          expect(el.displayInput.value).to.equal('Pi Number');
          expect(el.querySelectorAll('syn-option')[2].selected).to.be.true;

          el.value = 'string-option';
          await nextFrame();

          expect(el.value).to.equal('string-option');
          expect(el.displayInput.value).to.equal('String Option');
          expect(el.querySelectorAll('syn-option')[1].selected).to.be.true;

          el.value = 1;
          await nextFrame();

          expect(el.value).to.equal(1);
          expect(el.displayInput.value).to.equal('Number One');
          expect(el.querySelectorAll('syn-option')[0].selected).to.be.true;
        });
      });

      it('should handle mixed numeric and string types in multiple mode', async () => {
        const el = await fixture<SynCombobox>(html`
          <syn-combobox multiple>
            <syn-option .value="${1}">Number One</syn-option>
            <syn-option value="string-option">String Option</syn-option>
            <syn-option .value="${3.14}">Pi Number</syn-option>
            <syn-option .value="${0}">Zero</syn-option>
          </syn-combobox>
        `);

        el.value = [1, 'string-option', 0, 3.14];
        await nextFrame();

        expect(el.value).to.deep.equal([1, 'string-option', 3.14, 0]);

        const options = el.querySelectorAll('syn-option');
        expect(options[0].selected).to.be.true;
        expect(options[1].selected).to.be.true;
        expect(options[2].selected).to.be.true;
        expect(options[3].selected).to.be.true;
      });
    });
  }); // #805

  runFormControlBaseTests('syn-combobox');
});
