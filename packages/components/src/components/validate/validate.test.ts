import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../../../dist/synergy.js';
import * as utils from '../../../dist/components/validate/utility.js';
import type SynValidate from './validate.js';
import type SynInput from '../input/input.component.js';

describe('<syn-validate>', () => {
  describe('utility functions', () => {
    describe('event utils', () => {
      it('isBlurEvent should return true if the given event is a blur event', async () => {
        await expect(utils.isBlurEvent('blur')).to.equal(true);
        await expect(utils.isBlurEvent('syn-blur')).to.equal(true);
        await expect(utils.isBlurEvent('something')).to.equal(false);
      });

      it('isChangeEvent should return true if the given event is a change event', async () => {
        await expect(utils.isChangeEvent('change')).to.equal(true);
        await expect(utils.isChangeEvent('syn-change')).to.equal(true);
        await expect(utils.isChangeEvent('something')).to.equal(false);
      });

      it('isInvalidEvent should return true if the given event is a invalid event', async () => {
        await expect(utils.isInvalidEvent('invalid')).to.equal(true);
        await expect(utils.isInvalidEvent('syn-invalid')).to.equal(true);
        await expect(utils.isInvalidEvent('something')).to.equal(false);
      });

      it('should return an array of event names from a space separated string', async () => {
        await expect(utils.normalizeEventAttribute('blur change')).to.deep.equal(['blur', 'change']);
        await expect(utils.normalizeEventAttribute('blur   change  ')).to.deep.equal(['blur', 'change']);
        await expect(utils.normalizeEventAttribute('blur change invalid')).to.deep.equal(['blur', 'change', 'invalid']);
        await expect(utils.normalizeEventAttribute('')).to.deep.equal([]);
      });

      describe('getEventNameForElement', () => {
        it('should return the original event name when using a native DOM element', async () => {
          const el = document.createElement('input');
          await expect(utils.getEventNameForElement(el, 'click')).to.deep.equal('click');
          await expect(utils.getEventNameForElement(el, '  input  ')).to.deep.equal('input');
        });

        it('should return the original event name when using a synergy element and a non whitelisted event', async () => {
          const el = document.createElement('syn-input');
          await expect(utils.getEventNameForElement(el, 'click')).to.deep.equal('click');
          await expect(utils.getEventNameForElement(el, '  hover  ')).to.deep.equal('hover');
        });

        it('should return the prefixed event name when using a synergy element and a whitelisted event', async () => {
          const el = document.createElement('syn-input');
          await expect(utils.getEventNameForElement(el, 'change')).to.deep.equal('syn-change');
          await expect(utils.getEventNameForElement(el, '  focus  ')).to.deep.equal('syn-focus');
        });
      });
    });
  });

  it('should be accessible', async () => {
    const el = await fixture<SynValidate>(html`
      <syn-validate>
        <syn-input label="Email" type="email"></syn-input>
      </syn-validate>
    `);
    await expect(el).to.be.accessible();
  });

  it('defaults', async () => {
    const el = await fixture<SynValidate>(html`
      <syn-validate>
        <syn-input label="Email" type="email"></syn-input>
      </syn-validate>
    `);

    await expect(el.variant).to.equal('native');
    await expect(el.hideIcon).to.equal(false);
    await expect(el.on).to.equal('');
    await expect(el.eager).to.equal(false);
    await expect(el.customValidationMessage).to.equal('');
    await expect(el.getValidity()).to.equal(true);
  });

  describe('when using the getInput method', () => {
    it('should return the first slotted element', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate>
          <input id="found" label="Email" type="email"></input>
        </syn-validate>
      `);

      // @ts-expect-error getInput is private, but should be tested anyways
      await expect(el.getInput()?.id).to.equal('found');
    });

    it('should return undefined if no slotted elements are found', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate></syn-validate>
      `);

      // @ts-expect-error getInput is private, but should be tested anyways
      await expect(el.getInput()).to.equal(undefined);
    });
  });

  describe('when using the getValidity method', () => {
    it('should return true if the input is valid', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="blur">
          <syn-input id="found" label="Email" type="email"></syn-input>
        </syn-validate>
      `);
      const input = el.querySelector('syn-input')!;

      // Trigger another validation run to make sure it works
      input.value = 'test@test';
      await input.updateComplete;
      input.focus();
      input.blur();

      const isValid = el.getValidity();
      await expect(isValid).to.equal(true);
    });

    it('should return false if the input is invalid', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="blur">
          <syn-input id="found" label="Email" type="email"></syn-input>
        </syn-validate>
      `);
      const input = el.querySelector('syn-input')!;

      // Trigger another validation run to make sure it works
      input.value = 'test';
      input.focus();
      input.blur();
      await input.updateComplete;

      const isValid = el.getValidity();
      await expect(isValid).to.equal(false);
    });

    it('should initially be true', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="blur">
          <syn-input id="found" label="Email" type="email"></syn-input>
        </syn-validate>
      `);

      const isValid = el.getValidity();
      await expect(isValid).to.equal(true);
    });

    it('should initially be invalid if eager is set and the input is invalid', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="blur" eager>
          <syn-input id="found" label="Email" type="email" value="test"></syn-input>
        </syn-validate>
      `);

      const isValid = el.getValidity();
      await expect(isValid).to.equal(false);
    });
  });

  describe('when updating the customValidationMessage property', () => {
    it('should call the setValidationMessage method', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate>
          <input label="Email" type="email"></input>
        </syn-validate>
      `);

      const input = el.querySelector('input')!;
      const setValidationMessageSpy = sinon.spy(input, 'setCustomValidity');

      el.customValidationMessage = 'custom message';
      await el.updateComplete;

      await expect(el.validationMessage).to.equal('custom message');
      expect(setValidationMessageSpy).to.have.been.calledOnce;
    });
  });

  describe('when using native form elements', () => {
    it('should call the validate method when the input is invalid and an observed event is called', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="blur">
          <input label="Email" type="email"></input>
        </syn-validate>
      `);

      const input = el.querySelector('input')!;
      input.value = 'test';
      input.focus();
      input.blur();

      // email address is the only part that all three browsers have in common.
      // Could also check for non empty values, but it makes it more brittle.
      expect(el.validationMessage).to.include('email address');
    });

    it('should allow switching the event listeners via the "on" property', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="change">
          <input label="Email" type="email"></input>
        </syn-validate>
      `);

      const input = el.querySelector('input')!;

      // Step 1: Use the change event
      await expect(el.validationMessage).to.equal('');

      input.value = 'test';
      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(el.validationMessage).to.include('email address');

      // Step 2:
      // - Set the on property to only accept blur events
      // - Try again with onChange and see nothing happens anymore
      // - Finally, call blur and revalidate again
      el.on = 'blur';
      await el.updateComplete;

      input.value = 'test@test.de';
      input.dispatchEvent(new Event('change', { bubbles: true }));

      // The internalRevalidate resets to an empty message as the input is now valid
      await expect(el.validationMessage).to.equal('');

      input.focus();
      input.value = 'test';
      input.blur();
      expect(el.validationMessage).to.include('email address');

      input.focus();
      input.value = 'test@example';
      input.blur();
      await expect(el.validationMessage).to.equal('');
    });

    it('should validate on mount if the eager property is set to true', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate eager>
          <input label="Email" value="test" type="email"></input>
        </syn-validate>
      `);

      const input = el.querySelector('input')!;
      const scrollSpy = sinon.spy(input, 'focus');

      expect(el.validationMessage).to.include('email address');
      expect(scrollSpy, 'focus should have been skipped during mount on eager').to.not.have.been.called;

      // Trigger another validation run to make sure it works
      input.value = 'test';
      input.focus();
      input.blur();

      expect(el.validationMessage).to.include('email address');

      // Focus should have only be called once, because we surpress the first focus event on mount.
      expect(scrollSpy, 'focus should have been called for the second validation run').to.have.been.calledOnce;
    });

    it('should call the reportValidity method for `variant="native"` when the input is invalid and an observed event is called', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="input">
          <input label="Email" type="email"></input>
        </syn-validate>
      `);

      const input = el.querySelector('input')!;
      const reportValiditySpy = sinon.spy(input, 'reportValidity');

      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      await el.updateComplete;

      expect(reportValiditySpy).to.have.been.calledOnce;
    });

    it('should not call the reportValidity method for `variant="inline"` when the input is invalid and an observed event is called', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="input" variant="inline">
          <input label="Email" type="email"></input>
        </syn-validate>
      `);

      const input = el.querySelector('input')!;
      const reportValiditySpy = sinon.spy(input, 'reportValidity');

      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      await el.updateComplete;

      expect(reportValiditySpy).to.not.have.been.called;
    });
  });

  describe('when using synergy form elements', () => {
    it('should call the validate method when the input is invalid and an observed event is called', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="blur">
          <syn-input label="Email" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;
      input.value = 'test';
      input.focus();
      input.blur();
      await input.updateComplete;

      // email address is the only part that all three browsers have in common.
      // Could also check for non empty values, but it makes it more brittle.
      expect(el.validationMessage).to.include('email address');
    });

    it('should allow switching the event listeners via the "on" property', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="change">
          <syn-input label="Email" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;

      // Step 1: Use the change event
      await expect(el.validationMessage).to.equal('');

      input.value = 'test';
      input.dispatchEvent(new Event('syn-change', { bubbles: true }));
      await input.updateComplete;

      expect(el.validationMessage).to.include('email address');

      // Step 2:
      // - Set the on property to only accept blur events
      // - Try again with onChange and see nothing happens anymore
      // - Finally, call blur and revalidate again
      el.on = 'blur';
      await el.updateComplete;

      input.value = 'test@test.de';
      await input.updateComplete;
      input.dispatchEvent(new Event('syn-change', { bubbles: true }));

      // The internalRevalidate resets to an empty message as the input is now valid
      await expect(el.validationMessage).to.equal('');

      input.focus();
      input.value = 'test';
      input.blur();
      await input.updateComplete;
      expect(el.validationMessage).to.include('email address');

      input.focus();
      input.value = 'test@example';
      input.blur();
      await input.updateComplete;
      await expect(el.validationMessage).to.equal('');
    });

    it('should validate on mount if the eager property is set to true', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate eager>
          <syn-input label="Email" value="test" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;
      const scrollSpy = sinon.spy(input, 'focus');

      expect(el.validationMessage).to.include('email address');
      expect(scrollSpy, 'focus should have been skipped during mount on eager').to.not.have.been.called;

      // Trigger another validation run to make sure it works
      input.value = 'test';
      input.focus();
      input.blur();

      expect(el.validationMessage).to.include('email address');

      // Focus should have only be called once, because we surpress the first focus event on mount.
      expect(scrollSpy, 'focus should have been called for the second validation run').to.have.been.calledOnce;
    });

    it('should call the reportValidity method for `variant="native"` when the input is invalid and an observed event is called', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="input">
          <syn-input label="Email" value="test" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;
      const reportValiditySpy = sinon.spy(input, 'reportValidity');

      input.value = 'test';
      input.dispatchEvent(new Event('syn-input'));
      await input.updateComplete;
      await el.updateComplete;
      expect(reportValiditySpy).to.have.been.calledOnce;
    });

    it('should not call the reportValidity method for `variant="inline"` when the input is invalid and an observed event is called', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="input" variant="inline">
          <syn-input label="Email" value="test" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;
      const reportValiditySpy = sinon.spy(input, 'reportValidity');

      input.value = 'test';
      input.dispatchEvent(new Event('syn-input'));
      await el.updateComplete;

      expect(reportValiditySpy).to.not.have.been.called;
    });

    it('should never trigger a reportValidity on blur events', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="blur">
          <syn-input label="Email" value="test" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;
      const reportValiditySpy = sinon.spy(input, 'reportValidity');
      input.value = 'test';
      input.focus();
      input.blur();
      await el.updateComplete;

      input.focus();
      input.blur();

      await el.updateComplete;

      expect(reportValiditySpy).to.not.have.been.called;
    });

    it('should receive the correct data-user-invalid state when invalid', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="input">
          <syn-input label="Email" value="test" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;

      input.value = 'test';
      input.dispatchEvent(new Event('syn-input'));
      await input.updateComplete;
      await el.updateComplete;

      expect(input.hasAttribute('data-user-invalid')).to.be.true;

      input.value = 'test@test';
      input.dispatchEvent(new Event('syn-input'));
      await el.updateComplete;

      expect(input.hasAttribute('data-user-invalid')).to.be.false;
    });
  });

  describe('regression tests', () => {
    describe('#713: should call setCustomValidity when mounting with a customValidationMessage', () => {
      // Make sure that we test both our custom elements and native elements
      ['syn-input', 'input'].forEach((tag) => {
        it(`Should set the error to "Custom Message" on initial load when using a <${tag}> and a custom-validation-message is provided`, async () => {
          // Create the input element
          const inputElm = tag === 'syn-input'
            ? html`<syn-input name="input"></syn-input>`
            : html`<input name="input">`;

          const el = await fixture<SynValidate>(html`
            <syn-validate eager variant="inline" custom-validation-message="Custom Message">
              ${inputElm}
            </syn-validate>
          `);

          const input = el.querySelector<HTMLInputElement>(tag)!;

          await el.updateComplete;

          await expect(el.customValidationMessage).to.equal('Custom Message');
          expect(input.validity.customError).to.be.true;
          await expect(input.validationMessage).to.equal('Custom Message');
        }); // Test for both synergy and native elements

        it(`Should not set the error to "Custom Message" on initial load when using a <${tag}> and no custom-validation-message is provided`, async () => {
          // Create the input element
          const inputElm = tag === 'syn-input'
            ? html`<syn-input name="input"></syn-input>`
            : html`<input name="input">`;

          const el = await fixture<SynValidate>(html`
            <syn-validate eager variant="inline">
              ${inputElm}
            </syn-validate>
          `);

          const input = el.querySelector<HTMLInputElement>(tag)!;

          await el.updateComplete;

          await expect(el.customValidationMessage).to.equal('');
          expect(input.validity.customError).to.be.false;
          await expect(input.validationMessage).to.equal('');
        }); // Test for both synergy and native elements
      }); // Element type (SynInput or HTMLInputElement)
    }); // End test #713

    describe('#717: disabled and readonly should trigger validation when changed', () => {
      it('should be invalid on mount, but not show the error message', async () => {
        const el = await fixture<SynValidate>(html`
          <syn-validate id="something-tests" eager variant="inline">
            <syn-input name="input" readonly type="email" value="test"></syn-input>
          </syn-validate>
        `);

        const input = el.querySelector('syn-input')!;

        expect(el.validationMessage).to.be.empty;
        expect(el.isValid).to.be.false;
        expect(el.getValidity()).to.be.false;
        expect(input.validity.valid).to.be.false;
        expect(el.shadowRoot!.querySelector('syn-alert')).not.to.exist;
      });

      // Make sure that we test both our custom elements and native elements
      ['syn-input', 'input'].forEach((tag) => {
        ['disabled', 'readonly'].forEach((prop) => {
          it(`should show the error message when the ${prop} property on the input is removed ${tag}`, async () => {
            // Create the input element
            const inputElm = tag === 'syn-input'
              ? html`<syn-input name="input" ?disabled=${prop === 'disabled'} ?readonly=${prop === 'readonly'} type="email" value="test"></syn-input>`
              : html`<input name="input" ?disabled=${prop === 'disabled'} ?readonly=${prop === 'readonly'} type="email" value="test">`;

            const el = await fixture<SynValidate>(html`
              <syn-validate eager variant="inline">
                ${inputElm}
              </syn-validate>
            `);

            const input = el.querySelector(tag)!;
            input.removeAttribute(prop);

            await (input as SynInput).updateComplete;
            await el.updateComplete;

            expect(el.validationMessage).to.include('email address');
          }); // The test
        }); // property (disabled or readonly)
      }); // Element type (SynInput or HTMLInputElement)
    }); // End test #717

    describe('#915: should set correct invalid state for custom "on" event', () => {
      it('Should set the data-user-invalid attribute correctly for syn-input', async () => {
        const event = 'syn-change';

        const validate = await fixture<SynValidate>(html`
          <syn-validate on="revalidate">
            <syn-input></syn-input>
          </syn-validate>
        `);

        const input = validate.querySelector('syn-input')!;
        input.addEventListener(event, () => {
          validate.customValidationMessage = 'invalid';
          input.dispatchEvent(new CustomEvent('revalidate', { bubbles: true }));
        });

        input.value = 'test';
        input.dispatchEvent(new Event(event));
        await validate.updateComplete;

        expect(input.validationMessage).to.include('invalid');
        expect(input.hasAttribute('data-user-invalid'), 'data-user-invalid attribute should be available').to.be.true;
        expect(validate.getValidity(), 'syn-validate should be invalid').to.be.false;
      });
    }); // End test #915
  }); // End regression tests
});
