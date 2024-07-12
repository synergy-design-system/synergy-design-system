/* eslint-disable @typescript-eslint/no-floating-promises */
import sinon from 'sinon';
import { resetMouse, sendKeys, sendMouse } from '@web/test-runner-commands';
import {
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { serialize } from '../../../dist/synergy.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type SynRange from './range.js';

describe('<syn-range>', () => {
  it('should pass accessibility tests', async () => {
    const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
    await expect(el).to.be.accessible();
  });

  it('should have default values', async () => {
    const el = await fixture<SynRange>(html`<syn-range></syn-range>`);

    expect(el.disabled).to.equal(false);
    expect(el.helpText).to.equal('');
    expect(el.label).to.equal('');
    expect(el.max).to.equal(100);
    expect(el.min).to.equal(0);
    expect(el.name).to.equal('');
    expect(el.size).to.equal('medium');
    expect(el.step).to.equal(1);
    expect(el.tooltipDisabled).to.equal(false);
    expect(el.tooltipPlacement).to.equal('top');
    expect(el.value).to.equal('0');
    expect(el.valueAsArray).to.deep.equal([0]);
  });

  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<SynRange>(html`<syn-range disabled></syn-range>`);
    const wrapper = el.shadowRoot!.querySelector<HTMLInputElement>('[part~="form-control"]')!;

    expect(wrapper).to.have.class('form-control--is-disabled');
  });

  describe('value methods', () => {
    it('should automatically sort the value array when setting the value prop', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      el.value = '5 3 1';
      expect(el.valueAsArray).to.deep.equal([1, 3, 5]);
    });

    it('should automatically sort the value array when setting the valueAsArray prop', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      el.valueAsArray = [5, 3, 1];
      expect(el.value).to.equal('1 3 5');
    });
  });

  describe('when using constraint validation', () => {
    it('should be valid by default', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      expect(el.checkValidity()).to.be.true;
    });

    it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      el.setCustomValidity('This is a custom validation message');
      expect(el.checkValidity()).to.be.false;
    });

    it('should be valid when setCustomValidity() is called with an empty value', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      el.setCustomValidity('This is a custom validation message');
      expect(el.checkValidity()).to.be.false;

      el.setCustomValidity('');
      expect(el.checkValidity()).to.be.true;
    });

    it('should receive the correct validation attributes ("states") when invalid', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);

      expect(el.hasAttribute('data-invalid')).to.be.false;
      expect(el.hasAttribute('data-valid')).to.be.true;

      el.setCustomValidity('This is a custom validation message');

      expect(el.hasAttribute('data-invalid')).to.be.true;
      expect(el.hasAttribute('data-valid')).to.be.false;
    });
  });

  describe('when submitting a form', () => {
    it('should serialize its name and value with FormData', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-range name="a" value="1"></syn-range>
        </form>
      `);
      const formData = new FormData(form);
      expect(formData.get('a')).to.equal('1');
    });

    it('should serialize its name and value with JSON', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-range name="a" value="1"></syn-range>
        </form>
      `);
      const json = serialize(form) as { a: '1' };
      expect(json.a).to.equal('1');
    });

    it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <div>
          <form id="f">
            <syn-button type="submit">Submit</syn-button>
          </form>
          <syn-range form="f" name="a" value="1"></syn-range>
        </div>
      `);
      const form = el.querySelector('form')!;
      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('1');
    });

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
          <syn-range form="f1" name="a" value="1"></syn-range>
        </div>
      `);
      const form = el.querySelector<HTMLFormElement>('#f2')!;
      const input = document.querySelector('syn-range')!;

      input.form = 'f2';
      await input.updateComplete;

      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('1');
      expect(formData.get('b')).to.be.null;
      expect(formData.get('c')).to.equal('3');
    });
  });

  describe('when resetting a form', () => {
    it('should reset the element to its initial value', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-range name="a" value="5"></syn-range>
          <syn-button type="reset">Reset</syn-button>
        </form>
      `);
      const button = form.querySelector('syn-button')!;
      const input = form.querySelector('syn-range')!;
      input.value = '100';

      await input.updateComplete;

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await input.updateComplete;

      expect(input.value).to.equal('5');

      input.defaultValue = '10';

      setTimeout(() => button.click());
      await oneEvent(form, 'reset');
      await input.updateComplete;

      expect(input.value).to.equal('10');
    });
  });

  describe('when calling HTMLFormElement.reportValidity()', () => {
    it('should be invalid when the range is invalid and form.reportValidity() is called', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <syn-range></syn-range>
          <syn-button type="submit">Submit</syn-button>
        </form>
      `);

      const range = form.querySelector('syn-range')!;
      range.setCustomValidity('This is a custom validation message');

      expect(form.reportValidity()).to.be.false;
    });

    it('should be valid when the range is valid, reportValidity() is called, and the form has novalidate', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form novalidate>
          <syn-range required value=""></syn-range>
          <syn-button type="submit">Submit</syn-button>
        </form>
      `);

      const range = form.querySelector('syn-range')!;
      range.setCustomValidity('This is a custom validation message');

      expect(form.reportValidity()).to.be.true;
    });
  });

  describe('when the value changes', () => {
    it('should emit a syn-change event when the user has dragged a handle', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      const changeHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);

      const handle = el.shadowRoot!.querySelector('.handle')!;
      const rect = handle.getBoundingClientRect();

      expect(handle).to.not.have.class('grabbed');

      await sendMouse({
        position: [rect.left, rect.top],
        type: 'click',
      });

      await sendMouse({
        type: 'down',
      });

      expect(handle).to.have.class('grabbed');

      await sendMouse({
        position: [rect.left + 50, rect.top],
        type: 'move',
      });

      await resetMouse();
      expect(handle).to.not.have.class('grabbed');
      await el.updateComplete;

      expect(el.value).to.equal('5');
      expect(changeHandler).to.have.been.called;
    });

    it('should emit a syn-input event while the user is dragging the handle', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      const inputHandler = sinon.spy();

      el.addEventListener('syn-input', inputHandler);

      const handle = el.shadowRoot!.querySelector('.handle')!;
      const rect = handle.getBoundingClientRect();

      await sendMouse({
        position: [rect.left, rect.top],
        type: 'click',
      });

      await sendMouse({
        type: 'down',
      });

      await sendMouse({
        position: [rect.left + 10, rect.top],
        type: 'move',
      });

      await sendMouse({
        position: [rect.left + 20, rect.top],
        type: 'move',
      });

      await resetMouse();
      await el.updateComplete;

      expect(inputHandler).to.have.been.called;
    });

    it('should not emit syn-change or syn-input when the value is set programmatically', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      const changeHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);

      el.value = '50';
      await el.updateComplete;

      expect(changeHandler).to.not.have.been.called;
    });
  });

  describe('when using keyboard navigation', () => {
    const createFixture = async () => {
      const el = await fixture<SynRange>(html`
        <syn-range
          min="0"
          max="100"
          value="50"
          step="2"
        ></syn-range>
      `);

      const changeHandler = sinon.spy();
      const inputHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);
      el.addEventListener('syn-input', inputHandler);

      return {
        changeHandler,
        el,
        inputHandler,
      };
    };

    it('should increment the value by the step when pressing the ArrowUp key', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'ArrowUp',
      });

      expect(el.value).to.equal('52');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should increment the value by the step when pressing the ArrowRight key', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'ArrowRight',
      });

      expect(el.value).to.equal('52');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should increment the value by one fifth of the step when pressing the PageUp key', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'PageUp',
      });

      expect(el.value).to.equal('70');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should increment to the max value when pressing the PageUp key and the wanted value is too big', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.value = '90';
      await el.updateComplete;

      el.focus();
      expect(el.value).to.equal('90');

      await sendKeys({
        press: 'PageUp',
      });

      expect(el.value).to.equal('100');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should jump to the max value when pressing the End key', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'End',
      });

      expect(el.value).to.equal('100');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should decrement the value by the step when pressing the ArrowDown key', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'ArrowDown',
      });

      expect(el.value).to.equal('48');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should decrement the value by the step when pressing the ArrowLeft key', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'ArrowLeft',
      });

      expect(el.value).to.equal('48');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should decrement the value by one fifth of the step when pressing the PageDown key', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'PageDown',
      });

      expect(el.value).to.equal('30');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should decrement to the min value when pressing the PageDown key and the wanted value is too small', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.value = '10';
      await el.updateComplete;

      el.focus();
      expect(el.value).to.equal('10');

      await sendKeys({
        press: 'PageDown',
      });

      expect(el.value).to.equal('0');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should jump to the min value when pressing the Home key', async () => {
      const { changeHandler, el, inputHandler } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'Home',
      });

      expect(el.value).to.equal('0');

      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });
  });

  runFormControlBaseTests('syn-range');
});
