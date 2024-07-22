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
    expect(el.tooltipPlacement).to.equal('top');
    expect(el.value).to.equal('0');
    expect(el.valueAsArray).to.deep.equal([0]);
  });

  describe('Tooltips', () => {
    it('should allow to format the tooltips output with the tooltipFormatter attribute', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      const tooltip = el.shadowRoot!.querySelector('syn-tooltip')!;

      el.tooltipFormatter = (value: number) => `Value: ${value}`;

      el.value = '5';
      await el.updateComplete;

      expect(tooltip.content).to.equal('Value: 5');
    });

    it('should disable the tooltip if the tooltip-placement is set to "none"', async () => {
      const el = await fixture<SynRange>(html`<syn-range tooltip-placement="none"></syn-range>`);
      const tooltip = el.shadowRoot!.querySelector('syn-tooltip')!;

      expect(tooltip).to.have.attribute('disabled');
    });

    it('should disable the tooltip if the range is disabled', async () => {
      const el = await fixture<SynRange>(html`<syn-range disabled></syn-range>`);
      const tooltip = el.shadowRoot!.querySelector('syn-tooltip')!;

      expect(tooltip).to.have.attribute('disabled');
    });
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
    it('should emit a syn-change event when the user has dragged a knob', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      const changeHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);

      const knob = el.shadowRoot!.querySelector('.knob')!;
      const rect = knob.getBoundingClientRect();

      expect(knob).to.not.have.class('grabbed');

      await sendMouse({
        position: [rect.left, rect.top],
        type: 'click',
      });

      await sendMouse({
        type: 'down',
      });

      expect(knob).to.have.class('grabbed');

      await sendMouse({
        position: [rect.left + 50, rect.top],
        type: 'move',
      });

      await resetMouse();
      expect(knob).to.not.have.class('grabbed');
      await el.updateComplete;

      expect(el.value).to.equal('5');
      expect(changeHandler).to.have.been.called;
    });

    it('should allow to set more than one value', async () => {
      const el = await fixture<SynRange>(html`<syn-range value="20 80"></syn-range>`);
      const changeHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);

      const knobs = Array.from(el.shadowRoot!.querySelectorAll('.knob'));

      expect(knobs).to.have.length(2);

      const knobStart = knobs.at(0)!;
      const knobEnd = knobs.at(-1)!;

      const rectStart = knobStart.getBoundingClientRect();
      const rectEnd = knobEnd.getBoundingClientRect();

      const startLeft = Math.floor(rectStart.left);
      const endLeft = Math.floor(rectEnd.left);

      expect(knobStart).to.not.have.class('grabbed');
      expect(knobEnd).to.not.have.class('grabbed');

      await sendMouse({
        position: [startLeft, rectStart.top],
        type: 'click',
      });

      await sendMouse({
        type: 'down',
      });

      expect(knobStart).to.have.class('grabbed');
      expect(knobEnd).to.not.have.class('grabbed');

      await sendMouse({
        position: [startLeft + 50, rectStart.top],
        type: 'move',
      });

      await resetMouse();
      expect(knobStart).to.not.have.class('grabbed');
      expect(knobEnd).to.not.have.class('grabbed');
      await el.updateComplete;

      expect(el.value).to.equal('25 80');
      expect(changeHandler).to.have.been.called;

      // Second knob
      expect(knobStart).to.not.have.class('grabbed');
      expect(knobEnd).to.not.have.class('grabbed');

      await sendMouse({
        position: [endLeft, rectStart.top],
        type: 'click',
      });

      await sendMouse({
        type: 'down',
      });

      expect(knobStart).to.not.have.class('grabbed');
      expect(knobEnd).to.have.class('grabbed');

      await sendMouse({
        position: [endLeft + 50, rectStart.top],
        type: 'move',
      });

      await resetMouse();
      expect(knobStart).to.not.have.class('grabbed');
      expect(knobEnd).to.not.have.class('grabbed');
      await el.updateComplete;

      expect(el.value).to.equal('25 85');
      expect(changeHandler).to.have.been.called;
    });

    it('should emit a syn-input event while the user is dragging the knob', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      const inputHandler = sinon.spy();

      el.addEventListener('syn-input', inputHandler);

      const knob = el.shadowRoot!.querySelector('.knob')!;
      const rect = knob.getBoundingClientRect();

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

      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should emit a syn-move event when the user has dragged a knob', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      const moveHandler = sinon.spy();

      el.addEventListener('syn-move', moveHandler);

      const knob = el.shadowRoot!.querySelector('.knob')!;
      const rect = knob.getBoundingClientRect();

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

      expect(moveHandler).to.have.been.called;
    });

    it('should not move the knob when the emitted `syn-move` event is prevented', async () => {
      const el = await fixture<SynRange>(html`<syn-range></syn-range>`);
      const inputHandler = sinon.spy();
      const moveHandler = sinon.spy();

      el.addEventListener('syn-input', inputHandler);
      el.addEventListener('syn-move', e => {
        e.preventDefault();
        moveHandler();
      });

      const knob = el.shadowRoot!.querySelector('.knob')!;
      const rect = knob.getBoundingClientRect();

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

      expect(moveHandler).to.have.been.called;
      expect(inputHandler).to.not.have.been.called;
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
      const moveHandler = sinon.spy();

      el.addEventListener('syn-change', changeHandler);
      el.addEventListener('syn-input', inputHandler);
      el.addEventListener('syn-move', moveHandler);

      return {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      };
    };

    it('should increment the value by the step when pressing the ArrowUp key', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'ArrowUp',
      });

      expect(el.value).to.equal('52');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should increment the value by the step when pressing the ArrowRight key', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'ArrowRight',
      });

      expect(el.value).to.equal('52');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should increment the value by one fifth of the step when pressing the PageUp key', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'PageUp',
      });

      expect(el.value).to.equal('70');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should increment to the max value when pressing the PageUp key and the wanted value is too big', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.value = '90';
      await el.updateComplete;

      el.focus();
      expect(el.value).to.equal('90');

      await sendKeys({
        press: 'PageUp',
      });

      expect(el.value).to.equal('100');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should jump to the max value when pressing the End key', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'End',
      });

      expect(el.value).to.equal('100');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should decrement the value by the step when pressing the ArrowDown key', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'ArrowDown',
      });

      expect(el.value).to.equal('48');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should decrement the value by the step when pressing the ArrowLeft key', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'ArrowLeft',
      });

      expect(el.value).to.equal('48');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should decrement the value by one fifth of the step when pressing the PageDown key', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'PageDown',
      });

      expect(el.value).to.equal('30');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should decrement to the min value when pressing the PageDown key and the wanted value is too small', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.value = '10';
      await el.updateComplete;

      el.focus();
      expect(el.value).to.equal('10');

      await sendKeys({
        press: 'PageDown',
      });

      expect(el.value).to.equal('0');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should jump to the min value when pressing the Home key', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.focus();
      expect(el.value).to.equal('50');

      await sendKeys({
        press: 'Home',
      });

      expect(el.value).to.equal('0');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.have.been.calledOnce;
      expect(inputHandler).to.have.been.calledOnce;
    });

    it('should not emit the syn-change and syn-input event when the user has moved the knob via keyboard', async () => {
      const {
        changeHandler,
        el,
        inputHandler,
        moveHandler,
      } = await createFixture();

      el.addEventListener('syn-move', e => {
        e.preventDefault();
      });

      el.value = '10';
      await el.updateComplete;

      el.focus();
      expect(el.value).to.equal('10');

      await sendKeys({
        press: 'PageDown',
      });

      expect(el.value).to.equal('10');

      expect(moveHandler).to.have.been.calledOnce;
      expect(changeHandler).to.not.have.been.calledOnce;
      expect(inputHandler).to.not.have.been.calledOnce;
    });

    it('should move the focus to the next knob when pressing the Tab key', async () => {
      const el = await fixture<SynRange>(html`<syn-range value="20 80"></syn-range>`);
      const knobs = Array.from(el.shadowRoot!.querySelectorAll('.knob'));

      expect(knobs).to.have.length(2);

      const knobStart = knobs.at(0)! as HTMLDivElement;
      const knobEnd = knobs.at(-1)! as HTMLDivElement;

      el.focus();

      expect(document.activeElement).to.equal(el);
      expect(el.shadowRoot!.activeElement).to.equal(knobStart);

      await sendKeys({
        press: 'Tab',
      });

      expect(el.shadowRoot!.activeElement).to.equal(knobEnd);
    });
  });

  runFormControlBaseTests('syn-range');
});
