/* eslint-disable */
import '../../../dist/synergy.js';
import { aTimeout, expect, fixture, html, waitUntil,  } from '@open-wc/testing';
import sinon from 'sinon';

import type SynInput from './input';

describe('<syn-input>', () => {
  describe('when provided no parameters', () => {
    it('vendored values are set correctly', async () => {
      const el = await fixture<SynInput>(html` <syn-input></syn-input> `);
      expect(el.pill).to.equal(undefined);
      expect(el.filled).to.equal(undefined);
    });
  });

  describe('when type="number"', () => {
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
        const decrementButton = input.shadowRoot!.querySelector<HTMLButtonElement>('[part~="decrement-number-stepper"]');
        
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
        const incrementButton = input.shadowRoot!.querySelector<HTMLButtonElement>('[part~="increment-number-stepper"]');
        
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
  });    
});
