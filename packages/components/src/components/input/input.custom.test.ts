/* eslint-disable */
import '../../../dist/synergy.js';
import { aTimeout, expect, fixture, html, waitUntil,  } from '@open-wc/testing';
import sinon from 'sinon';
import { sendKeys } from '@web/test-runner-commands'; // must come from the same module
import {
  createNumericStrategy,
  modernNumericStrategy,
  nativeNumericStrategy,
} from './strategies.js';
import { formatNumber } from './formatter.js';
import type SynInput from './input.js';

describe('<syn-input>', () => {
  describe('when provided no parameters', () => {
    it('vendored values are set correctly', async () => {
      const el = await fixture<SynInput>(html` <syn-input></syn-input> `);
      // @ts-expect-error This property is no longer there
      expect(el.pill).to.equal(undefined);

      // @ts-expect-error This property is no longer there
      expect(el.filled).to.equal(undefined);
    });
  });

  describe('when type="number"', () => {
    describe.skip('custom decrement and increment buttons', () => {
      it('should focus the input when clicking on the decrement button', async () => {
        const el = await fixture<SynInput>(html` <syn-input type="number"></syn-input> `);
        const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]');
        const focusHandler = sinon.spy();
        
        el.addEventListener('syn-focus', focusHandler);
        decrementButton?.dispatchEvent(new PointerEvent('pointerdown'));
        await waitUntil(() => focusHandler.calledOnce);
    
        expect(focusHandler).to.have.been.calledOnce;
      }); 

      it('should focus the input when clicking on the increment button', async () => {
        const el = await fixture<SynInput>(html` <syn-input type="number"></syn-input> `);
        const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]');
        const focusHandler = sinon.spy();
        
        el.addEventListener('syn-focus', focusHandler);
        incrementButton?.dispatchEvent(new PointerEvent('pointerdown'));
        await waitUntil(() => focusHandler.calledOnce);
    
        expect(focusHandler).to.have.been.calledOnce;
      });

      it('should disable the stepper buttons if element is disabled', async () => {
        const el = await fixture<SynInput>(html` <syn-input type="number" disabled></syn-input> `);
        const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]')!;
        const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]')!;
        
        expect(decrementButton.disabled).to.be.true;
        expect(incrementButton.disabled).to.be.true;
      });

      it('should disable the stepper buttons if element is readonly', async () => {
        const el = await fixture<SynInput>(html` <syn-input type="number" readonly></syn-input> `);
        const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]')!;
        const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]')!;
        
        expect(decrementButton.disabled).to.be.true;
        expect(incrementButton.disabled).to.be.true;
      });

      it('should disable decrement button if min value is reached', async () => {
        const el = await fixture<SynInput>(html` <syn-input type="number" value="1" min="0"></syn-input>`);
        const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]')!;
        
        el.stepDown();
        await el.updateComplete;
        expect(decrementButton.disabled).to.be.true;
      });

      it('should disable increment button if max value is reached', async () => {
        const el = await fixture<SynInput>(html` <syn-input type="number" value="1" max="2"></syn-input>`);
        const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]')!;
        
        el.stepUp();
        await el.updateComplete;
        expect(incrementButton.disabled).to.be.true;
      });

      it('should enable increment button if max attribute is removed after reaching it', async () => {
        const el = await fixture<SynInput>(html` <syn-input type="number" value="2" max="2"></syn-input>`);
        const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]')!;
      
        el.removeAttribute('max');
        await el.updateComplete;
        expect(incrementButton.disabled).to.be.false;
      });

      it('should enable decrement button if min attribute is removed after reaching it', async () => {
        const el = await fixture<SynInput>(html` <syn-input type="number" value="0" min="0"></syn-input>`);
        const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]')!;
      
        el.removeAttribute('min');
        await el.updateComplete;
        expect(decrementButton.disabled).to.be.false;
      });

      describe('when the value changes', () => {
        it('should increment by step when increment button is clicked', async () => {
          const el = await fixture<SynInput>(html` <syn-input type="number" step="2" value="2"></syn-input> `);
          const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]')!;
          incrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          document.dispatchEvent(new PointerEvent('pointerup'));
          await el.updateComplete;
          expect(el.value).to.equal('4');
        });
    
        it('should decrement by step when decrement button is clicked', async () => {
          const el = await fixture<SynInput>(html` <syn-input type="number" step="2" value="2"></syn-input> `);
          const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]')!;
          decrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          document.dispatchEvent(new PointerEvent('pointerup'));
          await el.updateComplete;
          expect(el.value).to.equal('0');
        });

        it('should emit syn-change and syn-input when the user clicks the increment and decrement buttons', async () => {
          const el = await fixture<SynInput>(html` <syn-input type="number"></syn-input> `);
          const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]')!;
          const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]')!;
          const inputHandler = sinon.spy();
          const changeHandler = sinon.spy();
    
          el.addEventListener('syn-input', inputHandler);
          el.addEventListener('syn-change', changeHandler);
    
          decrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          document.dispatchEvent(new PointerEvent('pointerup'));
          expect(inputHandler).to.have.been.calledOnce;
          expect(changeHandler).to.have.been.calledOnce;
          
          inputHandler.resetHistory();
          changeHandler.resetHistory();
    
          incrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          document.dispatchEvent(new PointerEvent('pointerup'));
          expect(inputHandler).to.have.been.calledOnce;
          expect(changeHandler).to.have.been.calledOnce;
        });
    
        it('should spin the syn-input event when the user presses the increment button a longer time', async () => {
          const el = await fixture<SynInput>(html` <syn-input type="number"></syn-input> `);
          const incrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]')!;
          const inputHandler = sinon.spy();
          const changeHandler = sinon.spy();
          el.addEventListener('syn-input', inputHandler);
          el.addEventListener('syn-change', changeHandler);
    
          incrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          await aTimeout(1000);
          expect(changeHandler).to.have.not.been.called;
          expect(inputHandler.callCount).to.be.greaterThan(1);
    
          document.dispatchEvent(new PointerEvent('pointerup'));
    
          // only emit change event after pointer up
          expect(changeHandler).to.have.been.calledOnce;
        });
    
        it('should spin the syn-input event when the user presses the decrement button a longer time', async () => {
          const el = await fixture<SynInput>(html` <syn-input type="number"></syn-input> `);
          const decrementButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]')!;
          const inputHandler = sinon.spy();
          const changeHandler = sinon.spy();
          el.addEventListener('syn-input', inputHandler);
          el.addEventListener('syn-change', changeHandler);
    
          decrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          await aTimeout(1000);
          expect(changeHandler).to.have.not.been.called;
          expect(inputHandler.callCount).to.be.greaterThan(1);
    
          document.dispatchEvent(new PointerEvent('pointerup'));
    
          // only emit change event after pointer up
          expect(changeHandler).to.have.been.calledOnce;
        });

        it('should decrement if decrement button is clicked after syn-input was removed and added to DOM again ', async () => {
          const el = await fixture<SynInput>(html`
            <div>
              <syn-input type="number" value="3"></syn-input>
            </div>
          `);
          const input = el.querySelector('syn-input')!;
          const decrementButton = input.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]')!;
          
          decrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          document.dispatchEvent(new PointerEvent('pointerup'));
          await input.updateComplete;
          expect(input.value).to.equal('2');

          input.remove();
          el.appendChild(input);
          decrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          document.dispatchEvent(new PointerEvent('pointerup'));
          await input.updateComplete;
          expect(input.value).to.equal('1');
        }); 

        it('should increment if increment button is clicked after syn-input was removed and added to DOM again ', async () => {
          const el = await fixture<SynInput>(html`
            <div>
              <syn-input type="number" value="3"></syn-input>
            </div>
          `);
          const input = el.querySelector('syn-input')!;
          const incrementButton = input.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]')!;
          
          incrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          document.dispatchEvent(new PointerEvent('pointerup'));
          await input.updateComplete;
          expect(input.value).to.equal('4');

          input.remove();
          el.appendChild(input);
          incrementButton.dispatchEvent(new PointerEvent('pointerdown'));
          document.dispatchEvent(new PointerEvent('pointerup'));
          await input.updateComplete;
          expect(input.value).to.equal('5');
        }); 
      });
    }); // /custom decrement and increment buttons

    describe('feat#417 - numeric strategies', () => {
      it('should use a default value of "native" if no strategy is provided', async () => {
        const el = await fixture<SynInput>(html` <syn-input type="number"></syn-input> `);
        expect(el.numericStrategy).to.deep.equal(nativeNumericStrategy);
      });

      describe('number formatter', () => {
        it('should format the number using the Intl.NumberFormat API', () => {        
          expect(formatNumber(1234, undefined), 'should not alter the original value if no step or friction is defined').to.equal('1234');
          expect(formatNumber(1234, 0), 'should be able to format integer values with an integer of 0').to.equal('1234');
          expect(formatNumber(1234, undefined, { minimumFractionDigits: undefined, maximumFractionDigits: undefined }), 'should not alter the original value if no step or friction is defined').to.equal('1234');
          expect(formatNumber(1234.123, 0), 'should be able to format float values with an integer of 0').to.equal('1234.123');

          expect(formatNumber(1234, 1), 'should be able to format integer values with integer steps').to.equal('1234');
          expect(formatNumber(1234.123, 1), 'should be able to format integer values with integer steps').to.equal('1234.123');
          expect(formatNumber(1234, 1.25), 'should be able to format integer values with float steps').to.equal('1234.00');
          expect(formatNumber(1234.123, 1.25), 'should be able to format float values with float steps').to.equal('1234.12');

          expect(formatNumber(1234, undefined, { minimumFractionDigits: 2 }), 'should be able to format integer values with only min fraction digits').to.equal('1234.00');
          expect(formatNumber(1234, undefined, { maximumFractionDigits: 2 }), 'should be able to format integer values with only max fraction digits').to.equal('1234.00');
          expect(formatNumber(1234.567, undefined), 'should not apply a format if no option is provided').to.equal('1234.567');
          expect(formatNumber(1234.567, 0.1), 'should use the step if no min or max fraction digits are given').to.equal('1234.6');
          expect(formatNumber(1234.567, undefined, { minimumFractionDigits: 2 }), 'should allow to ignore the step attribute').to.equal('1234.57');
          expect(formatNumber(1234.567, 0.1, { minimumFractionDigits: 2 }), 'should ignore the step if no min fraction digit is given').to.equal('1234.57');
          expect(formatNumber(1234.567, 0.1, { maximumFractionDigits: 3 }), 'should ignore the step if no max fraction digit is given').to.equal('1234.567');
          expect(formatNumber(1234.567, 0.1, { minimumFractionDigits: 4, maximumFractionDigits: 5 }), 'should use the min and max fraction digits').to.equal('1234.5670');
          expect(formatNumber(1234.567, 0.1, { minimumFractionDigits: 5, maximumFractionDigits: 4 }), 'should swap min and max if the min is bigger than max').to.equal('1234.5670');
          
          expect(formatNumber(1234.567, undefined, { minimumFractionDigits: 1024 }), 'should allow to use a max amount of 100 for min fraction digits').to.equal('1234.5670000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000');
          expect(formatNumber(1234.567, undefined, { maximumFractionDigits: 1024 }), 'should allow to use a max amount of 100 for max fraction digits').to.equal('1234.5670000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000');
        });
      });

      describe('numeric strategy utils', () => {
        it('should export a default native numeric strategy', () => {
          expect(nativeNumericStrategy).to.deep.equal({
            autoClamp: false,
            noStepAlign: false,
            noStepValidation: false,
          });
        });

        it('should export a default modern numeric strategy', () => {
          expect(modernNumericStrategy).to.deep.equal({
            autoClamp: true,
            noStepAlign: true,
            noStepValidation: true,
          });
        });

        it('should export a function that creates a numeric strategy', () => {
          // @ts-expect-error customItem is added to still be able to check the defaults of autoClamp
          expect(createNumericStrategy({ customItem: true })).to.deep.equal({
            autoClamp: false,
            customItem: true,
            noStepAlign: false,
            noStepValidation: false,
          });

          expect(createNumericStrategy()).to.deep.equal(nativeNumericStrategy);
        });
      });

      describe('when using the "native" strategy', () => {
        it('should allow to set the value lower than min', async () => {
          const clampSpy = sinon.spy();

          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="native" min="20"></syn-input>`);
          el.addEventListener('syn-clamp', clampSpy);
          
          el.focus();
          await sendKeys({ type: '10' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          await el.updateComplete;
          expect(el.value).to.equal('10');
          expect(el.validity.rangeUnderflow).to.be.true;
          expect(el.validity.valid).to.be.false;
          expect(clampSpy.callCount).to.equal(0);
        }); // min test

        it('should allow to set the value greater than max', async () => {
          const clampSpy = sinon.spy();

          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="native" max="20"></syn-input>`);
          el.addEventListener('syn-clamp', clampSpy);
          
          el.focus();
          await sendKeys({ type: '30' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.value).to.equal('30');
          expect(el.validity.rangeOverflow).to.be.true;
          expect(el.validity.valid).to.be.false;
          expect(clampSpy.callCount).to.equal(0);
        }); // max test

        it('should emit an invalid event when step and value are not aligned', async () => {
          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="native" step="2"></syn-input>`);

          el.focus();
          await sendKeys({ type: '1' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.validity.valid).to.be.false;
          expect(el.validity.stepMismatch).to.be.true;
        }); // invalid test

        it('should not apply the format helpers on the input value in any way if no step or fraction digits are set', async () => {
          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="native"></syn-input>`);
          el.focus();
          await sendKeys({ type: '1.000' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.value).to.equal('1.000');
        }); // Test number formatting
      }); // /native strategy

      describe('when using the "modern" strategy', () => {
        it('should not allow to set the value lower than min', async () => {
          const clampSpy = sinon.spy();

          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="modern" min="20"></syn-input>`);
          el.addEventListener('syn-clamp', clampSpy);

          el.focus();
          await sendKeys({ type: '10' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;
    
          expect(el.value).to.equal('20');
          expect(el.validity.rangeUnderflow).to.be.false;
          expect(el.validity.valid).to.be.true;
          expect(clampSpy.callCount).to.equal(1);
          expect(clampSpy.args[0][0].detail).to.deep.equal({
            clampedTo: 'min',
            lastUserValue: 10,
          });
        }); // min test

        it('should not allow to set the value greater than max', async () => {
          const clampSpy = sinon.spy();

          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="modern" max="20"></syn-input>`);
          el.addEventListener('syn-clamp', clampSpy);

          el.focus();
          await sendKeys({ type: '30' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;
    
          expect(el.value).to.equal('20');
          expect(el.validity.rangeUnderflow).to.be.false;
          expect(el.validity.valid).to.be.true;
          expect(clampSpy.callCount).to.equal(1);
          expect(clampSpy.args[0][0].detail).to.deep.equal({
            clampedTo: 'max',
            lastUserValue: 30,
          });
        }); // max test

        it('should not emit an invalid event when step and value are not aligned', async () => {
          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="modern" step="2"></syn-input>`);

          el.focus();
          await sendKeys({ type: '1' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.validity.valid).to.be.true;
          expect(el.validity.stepMismatch).to.be.false;

          // Retest again after setting the step attribute.
          // Use to test the handleStepChange() method.
          el.step = 0.3;
          await el.updateComplete;

          el.focus();
          await sendKeys({ type: '1' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.validity.valid).to.be.true;
          expect(el.validity.stepMismatch).to.be.false;
        }); // invalid test

        it('should set the value property to a valid value if a non numeric value is provided', async () => {
          const el = await fixture<SynInput>(html`<syn-input type="number" step="0.1234" numeric-strategy="modern" value="5"></syn-input>`);
          expect(el.value).to.equal('5');

          // Test setting a non numeric value without min or max
          el.focus();
          await sendKeys({ type: '+-100' });
          el.blur();
          await el.updateComplete;
          expect(el.value, 'should default to number "0" when no min or max is provided').to.equal('0.0000');

          // Test setting with min provided
          const elWithMin = await fixture<SynInput>(html`<syn-input min="10" type="number" step="0.1234" numeric-strategy="modern" value="5"></syn-input>`);
          expect(elWithMin.value).to.equal('5');

          elWithMin.focus();
          await sendKeys({ type: '+-100' });
          elWithMin.blur();
          await elWithMin.updateComplete;
          expect(elWithMin.value, 'should default to the provided min if the min property is provided').to.equal('10.0000');

          // Test setting with max provided
          const elWithMax = await fixture<SynInput>(html`<syn-input max="50" type="number" step="0.1234" numeric-strategy="modern" value="5"></syn-input>`);
          expect(elWithMax.value).to.equal('5');

          elWithMax.focus();
          await sendKeys({ type: '+-100' });
          elWithMax.blur();
          await elWithMax.updateComplete;
          expect(elWithMax.value, 'should default to the provided max if the max property is provided').to.equal('50.0000');

          // Make sure to prefer max
          const elWithBoth = await fixture<SynInput>(html`<syn-input min="10" max="50" type="number" step="0.1234" numeric-strategy="modern" value="5"></syn-input>`);
          expect(elWithBoth.value).to.equal('5');

          elWithBoth.focus();
          await sendKeys({ type: '+-100' });
          elWithBoth.blur();
          await elWithBoth.updateComplete;
          expect(elWithBoth.value, 'should default to the provided max if both min and max property are provided').to.equal('50.0000');
        });
        
        it('should format to the minimal possible decimals when the min-fraction-digits prop is provided', async () => {
          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="modern" min-fraction-digits="4"></syn-input>`);
          el.focus();
          await sendKeys({ type: '1' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.value).to.equal('1.0000');
        }); // Test number formatting with min-fraction-digits

        it('should format to the maximal amount of possible decimals when the max-fraction-digits prop is provided', async () => {
          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="modern" min-fraction-digits="2" max-fraction-digits="6"></syn-input>`);
          el.focus();
          await sendKeys({ type: '1.9999991111' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.value).to.equal('1.999999');
        }); // Test number formatting with max-fraction-digits

        it('should format with step only if no fraction is provided', async () => {
          const el = await fixture<SynInput>(html`<syn-input type="number" numeric-strategy="modern" step="0.0003"></syn-input>`);
          el.focus();
          await sendKeys({ type: '1.234567' });
          await el.updateComplete;
          el.blur();
          await el.updateComplete;

          expect(el.value).to.equal('1.2346');
        }); // Test number formatting with step only
      }); // /modern strategy
    }); // /feat#417
  }); // /number-tests
});
