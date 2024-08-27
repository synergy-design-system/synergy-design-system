/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import {
  aTimeout, expect, fixture, html, oneEvent, waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import { clickOnElement } from '../../internal/test.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { serialize } from '../../utilities/form.js';
import type SynOption from '../option/option.js';
import type SynCombobox from './combobox.js';

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
    const submitHandler = sinon.spy();

    el.addEventListener('syn-focus', submitHandler);
    (label as HTMLLabelElement).click();
    await waitUntil(() => submitHandler.calledOnce);

    expect(submitHandler).to.have.been.calledOnce;
  });

  describe('when the value changes', () => {
    it('should emit syn-change and syn-input when the value is changed with the mouse', async () => {
      const el = await fixture<SynCombobox>(html`
        <syn-combobox>
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
      `);

      await el.show();

      const filteredListbox = el.shadowRoot!.querySelector('.listbox__options')!;
      const secondOption = filteredListbox.querySelectorAll<SynOption>('syn-option')[1];
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
      await sendKeys({ press: 'Enter' }); // open the dropdown
      await aTimeout(500); // wait for the dropdown to open
      await sendKeys({ press: 'ArrowDown' }); // move selection to the second option
      await el.updateComplete;
      await sendKeys({ press: 'ArrowDown' }); // move selection to the third option
      await el.updateComplete;
      await sendKeys({ press: 'Enter' }); // commit the selection
      await el.updateComplete;

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
      expect(el.value).to.equal('option-2');
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
      const filteredListbox = el.shadowRoot!.querySelector('.listbox__options')!;
      const secondOption = filteredListbox.querySelectorAll<SynOption>('syn-option')[1];

      await clickOnElement(secondOption);
      await el.updateComplete;

      expect(handler).to.be.calledTwice;
    });
  });

  describe('keyboard handling', () => {
    it('should open the listbox when the Enter key is pressed with syn-combobox is on focus', async () => {
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

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
    });

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

      const filteredListbox = el.shadowRoot!.querySelector('.listbox__options')!;
      const firstOption = filteredListbox.querySelectorAll<SynOption>('syn-option')[0];

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(firstOption.getAttribute('aria-selected')).to.equal('true');
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

      const filteredListbox = el.shadowRoot!.querySelector('.listbox__options')!;
      const lastOption = filteredListbox.querySelectorAll<SynOption>('syn-option')[filteredListbox.children.length - 1];

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(lastOption.getAttribute('aria-selected')).to.equal('true');
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

      const filteredListbox = el.shadowRoot!.querySelector('.listbox__options')!;
      const filteredOptions = filteredListbox.querySelectorAll<SynOption>('syn-option');

      expect(displayInput.getAttribute('aria-expanded')).to.equal('true');
      expect(filteredOptions.length).to.equal(2);
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

      const filteredListbox = el.shadowRoot!.querySelector('.listbox__options')!;
      const filteredOptions = filteredListbox.querySelectorAll<SynOption>('syn-option');

      expect(displayInput.getAttribute('aria-expanded')).to.equal('false');
      expect(filteredOptions.length).to.equal(0);
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

    it('should close the listbox and clear the input when Escape key is pressed with syn-combobox is on focus', async () => {
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
      await sendKeys({ press: 'Enter' });
      await el.updateComplete;
      await sendKeys({ press: 'Escape' });
      await el.updateComplete;

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

      const filteredListbox = el.shadowRoot!.querySelector('.listbox__options')!;
      const secondOption = filteredListbox.querySelectorAll<SynOption>('syn-option')[1];

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
      const filteredListbox = el.shadowRoot!.querySelector('.listbox__options')!;
      const secondOption = filteredListbox.querySelectorAll<SynOption>('syn-option')[1];

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

  runFormControlBaseTests('syn-combobox');
});
