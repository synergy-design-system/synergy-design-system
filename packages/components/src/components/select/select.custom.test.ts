import '../../../dist/synergy.js';
import {
  aTimeout, expect, fixture, html, oneEvent, waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type SynSelect from './select.js';
import { compareValues } from './utility.js';
import { clickOnElement } from '../../internal/test.js';

describe('<syn-select>', () => {
  describe('#540: should allow to use a custom delimiter for multiple values', () => {
    it('should allow to define the delimiter that is used to separate the values', async () => {
      const getActiveItems = (elm: SynSelect) => Array.from(
        elm.querySelectorAll('syn-option'),
      ).filter(option => option.selected);

      const el = await fixture<SynSelect>(html`
        <syn-select delimiter="|" multiple value="option1|option2">
          <syn-option value="option1">Option 1</syn-option>
          <syn-option value="option2">Option 2</syn-option>
          <syn-option value="option3">Option 3</syn-option>
        </syn-select>
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

  describe('#805: should allow setting numeric values', () => {
    describe('when set initially', () => {
      it('should allow to use numbers as value for syn-select and syn-option', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select .value="${1}">
            <syn-option .value="${1}">Option 1 (number)</syn-option>
            <syn-option .value="${'2'}">Option 2 (text)</syn-option>
          </syn-select>
        `);

        await el.updateComplete;
        await expect(el.value).to.equal(1);

        el.value = '2';
        await el.updateComplete;
        await expect(el.value).to.equal('2');
      });

      it('should allow to use numbers as value for syn-select and syn-option when using multiple', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select .value="${[1, '2']}" multiple>
            <syn-option .value="${1}">Option 1 (number)</syn-option>
            <syn-option .value="${'2'}">Option 2 (text)</syn-option>
          </syn-select>
        `);

        await el.updateComplete;
        await expect(el.value).to.eql([1, '2']);

        el.value = ['2'];
        await el.updateComplete;
        await expect(el.value).to.eql(['2']);
      });
    });
  });

  describe('regression tests', () => {
    describe('#780: should not break on invalid values of the "value" prop when "multiple" is set', () => {
      it('should support an empty string', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        el.value = '';
        await expect(el.value).to.eql(['']);
      });

      it('should support a string', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        el.value = 'value';
        await expect(el.value).to.eql(['value']);
      });

      it('should support none falsy values', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        el.value = 1;
        await expect(el.value).to.eql([1]);
      });

      it('should not allow falsy values', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        // @ts-expect-error Testing for invalid values
        el.value = false;
        await expect(el.value).to.eql([]);
      });

      it('should not allow undefined values', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        // @ts-expect-error Testing for invalid values
        el.value = undefined;
        await expect(el.value).to.eql([]);
      });

      it('should support an array of strings', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        el.value = ['a', 'b', 'c'];
        await expect(el.value).to.eql(['a', 'b', 'c']);
      });
    }); // #780

    // TODO: could be removed if shoelace accepts the PR and the tests are added there
    describe('#813: should work correctly if `value` was set via property binding', () => {
      it('should show the value of the dynamically added option', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select .value=${'option-1'}></syn-select>
        `);

        await el.updateComplete;

        await expect(el.value).to.equal('option-1');
        await expect(el.displayLabel).to.equal('');

        // wait a short time until adding options dynamically
        await aTimeout(10);
        const option = document.createElement('syn-option');
        option.value = 'option-1';
        option.textContent = 'Option 1';
        el.appendChild(option);
        await el.updateComplete;

        await expect(el.value).to.equal('option-1');
        await expect(el.displayLabel).to.equal('Option 1');
      });

      it('should reset the value of the select in a form to the initially set value', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form>
            <syn-select .value=${'option-1'}>
              <syn-option value="option-1">Option 1</syn-option>
              <syn-option value="option-2">Option 2</syn-option>
            </syn-select>
            <syn-button type="reset">Reset</syn-button>
          </form>
        `);

        const resetButton = form.querySelector('syn-button')!;
        const select = form.querySelector('syn-select')!;
        select.value = 'option-2';
        await select.updateComplete;

        await expect(select.value).to.equal('option-2');

        setTimeout(() => resetButton.click());
        await oneEvent(form, 'reset');
        await select.updateComplete;
        await expect(select.value).to.equal('option-1');
      });
    }); // #813

    describe('#850: should clamp syn-tag size to the size of the select', () => {
      it('should set the max-width used for tags to the available size of the tag wrapper', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select multiple style="width: 250px" value="option-1 option-2">
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">This is a very long text that should be truncated</syn-option>
          </syn-select>
        `);

        await el.updateComplete;
        // A longer timeout may be needed for webkit, chrome and ff don´t take only 10ms
        await aTimeout(100);

        const tagWrapper: HTMLDivElement = el.shadowRoot!.querySelector('.select__tags')!;
        const currentWidth = tagWrapper.style.getPropertyValue('--syn-select-tag-max-width');

        expect(currentWidth, 'It should have max tag width of 180 pixels').to.equal('180px');
      });

      it('should use a minimum width of 100 pixels when the syn-select is too small', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select multiple style="width: 50px" value="option-1 option-2">
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">This is a very long text that should be truncated</syn-option>
          </syn-select>
        `);

        await el.updateComplete;
        // A longer timeout may be needed for webkit, chrome and ff don´t take only 10ms
        await aTimeout(100);

        const tagWrapper: HTMLDivElement = el.shadowRoot!.querySelector('.select__tags')!;
        const currentWidth = tagWrapper.style.getPropertyValue('--syn-select-tag-max-width');

        expect(currentWidth, 'It should have max tag width of 100 pixels').to.equal('100px');
      });
    }); // #850
  }); // regression tests

  describe('#1036', () => {
    it('should result in correct sanitized values for subsequently changed delimiter', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select>
          <syn-option value="Option 1">Option 1</syn-option>
          <syn-option value="Option 2">Option 2</syn-option>
        </syn-select>
      `);
      const options = el.querySelectorAll('syn-option');
      const firstOption = options[0];
      const secondOption = options[1];

      await clickOnElement(el);
      await clickOnElement(firstOption);

      expect(el.value).to.equal('Option_1');

      el.delimiter = '~';

      await clickOnElement(el);
      await clickOnElement(secondOption);
      expect(el.value).to.equal('Option 2');
    });
  });

  describe('#1056', () => {
    it('should show correct value if delimiter was changed async', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select value="Option 1">
          <syn-option value="Option 1">Option 1</syn-option>
          <syn-option value="Option 2">Option 2</syn-option>
        </syn-select>
      `);
      const options = el.querySelectorAll('syn-option');
      const firstOption = options[0];

      expect(el.value).to.equal('');
      expect(el.displayLabel).to.equal('');

      el.delimiter = '~';
      await el.updateComplete;
      await firstOption.updateComplete;

      expect(el.value).to.equal('Option 1');
      expect(el.displayLabel).to.equal('Option 1');
    });

    it('should show correct value if delimiter was changed async for a value set via property binding', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select>
          <syn-option value="Option 1">Option 1</syn-option>
          <syn-option value="Option 2">Option 2</syn-option>
        </syn-select>
      `);

      // This simulates a property binding of angular with e.g. an Observable / BehaviorSubject
      await new Promise(resolve => {
        setTimeout(() => {
          el.value = 'Option 1';
          resolve(true);
        }, 10);
      });
      await el.updateComplete;
      const options = el.querySelectorAll('syn-option');
      const firstOption = options[0];

      expect(el.value).to.equal('');
      expect(el.displayLabel).to.equal('');

      el.delimiter = '~';
      await el.updateComplete;
      await firstOption.updateComplete;

      expect(el.value).to.equal('Option 1');
      expect(el.displayLabel).to.equal('Option 1');
    });
  });

  describe('utility functions', () => {
    describe('compareValues', () => {
      it('should return true for equal values', () => {
        expect(compareValues('123', '123')).to.be.true;
        expect(compareValues(123, 123)).to.be.true;
        expect(compareValues(['1', '2'], ['1', '2'])).to.be.true;
      });

      it('should return false for different values', () => {
        expect(compareValues('123', '321')).to.be.false;
        expect(compareValues(123, 321)).to.be.false;
      });

      // TODO: do we want to support ordered or unordered arrays?
      it('should return false for arrays with different order', () => {
        expect(compareValues([1, 2], [2, 1])).to.be.false;
      });

      it('should return false for arrays with different length', () => {
        expect(compareValues([1, 2], [1, 2, 3])).to.be.false;
      });

      it('should return false for array and non-array', () => {
        expect(compareValues([1], 1)).to.be.false;
        expect(compareValues(1, [1])).to.be.false;
      });

      // TODO: or should we do a string conversion of numbers in the function?
      it('should return false for different types', () => {
        expect(compareValues(1, '1')).to.be.false;
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Chrome 149 focus-policy regression suite
  // Covers:
  //   • Chromium issue #40095111 – focus-without-user-activation policy
  //   • Chromium issue #407769114 – top-layer pseudo-class boundary
  //   • Synergy issue #1297 – modal focus management incomplete
  // ─────────────────────────────────────────────────────────────────────────
  describe('Chrome 149 focus-policy compatibility', () => {

    // ── 1. Single-select: focus returns to display-input after option click ──
    it('should move focus to the display input after a single-select option is clicked', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select label="Pick one">
          <syn-option value="a">Alpha</syn-option>
          <syn-option value="b">Beta</syn-option>
        </syn-select>
      `);
      await el.show();
      const option = el.querySelector<HTMLElement>('syn-option[value="a"]')!;
      await clickOnElement(option);
      await el.updateComplete;

      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.select__display-input')!;
      expect(document.activeElement).to.equal(el, 'host should be the document active element');
      expect(el.shadowRoot!.activeElement).to.equal(displayInput, 'display input should be active inside shadow root');
    });

    // ── 2. Multi-select: focus returns to display-input after option click ──
    it('should move focus to the display input after a multi-select option is clicked', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select multiple label="Pick several">
          <syn-option value="a">Alpha</syn-option>
          <syn-option value="b">Beta</syn-option>
        </syn-select>
      `);
      await el.show();
      const option = el.querySelector<HTMLElement>('syn-option[value="a"]')!;
      await clickOnElement(option);
      // Wait for the post-update focus
      await aTimeout(50);

      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.select__display-input')!;
      expect(el.shadowRoot!.activeElement).to.equal(displayInput, 'display input should be active inside shadow root');
    });

    // ── 3. Clear button: focus returns to display-input ──
    it('should move focus to the display input when the clear button is clicked', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select clearable value="a" label="Pick one">
          <syn-option value="a">Alpha</syn-option>
          <syn-option value="b">Beta</syn-option>
        </syn-select>
      `);
      await el.updateComplete;

      const clearBtn = el.shadowRoot!.querySelector<HTMLElement>('.select__clear')!;
      await clickOnElement(clearBtn);
      await el.updateComplete;

      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.select__display-input')!;
      expect(el.shadowRoot!.activeElement).to.equal(displayInput, 'display input should regain focus after clear');
    });

    // ── 4. Keyboard: Escape hides the popup and returns focus ──
    it('should close and refocus the display input on Escape key', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select label="Keyboard test">
          <syn-option value="a">Alpha</syn-option>
          <syn-option value="b">Beta</syn-option>
        </syn-select>
      `);
      el.focus();
      await el.updateComplete;

      // Open with Space
      await sendKeys({ press: 'Space' });
      await oneEvent(el, 'syn-after-show');

      // Close with Escape
      await sendKeys({ press: 'Escape' });
      await oneEvent(el, 'syn-after-hide');

      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.select__display-input')!;
      expect(el.shadowRoot!.activeElement).to.equal(displayInput, 'display input should regain focus after Escape');
    });

    // ── 5. Keyboard: Enter selects and closes for single-select ──
    it('should select the highlighted option and close on Enter', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select label="Keyboard test">
          <syn-option value="a">Alpha</syn-option>
          <syn-option value="b">Beta</syn-option>
        </syn-select>
      `);
      el.focus();

      // Open
      await sendKeys({ press: 'Space' });
      await oneEvent(el, 'syn-after-show');

      // Move to first option
      await sendKeys({ press: 'ArrowDown' });
      await aTimeout(50);

      // Confirm selection
      await sendKeys({ press: 'Enter' });
      await oneEvent(el, 'syn-after-hide');

      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.select__display-input')!;
      expect(el.shadowRoot!.activeElement).to.equal(displayInput, 'display input should have focus after Enter selection');
      expect(el.value).to.be.ok;
    });

    // ── 6. Modal-host detection via composed-tree walk ──
    it('should find a modal host that is composed inside a shadow root', async () => {
      // Simulate a custom modal container in a shadow root that exposes the modal API
      const activateSpy = { called: false };
      const deactivateSpy = { called: false };

      // Build a container element with shadow DOM that hosts the select
      const container = document.createElement('div');
      const shadow = container.attachShadow({ mode: 'open' });

      // The shadow-root host acts as the modal container
      Object.defineProperty(container, 'modal', {
        value: {
          activateExternal: () => { activateSpy.called = true; },
          deactivateExternal: () => { deactivateSpy.called = true; },
        },
      });

      // The select lives INSIDE the shadow root (common when composing components)
      shadow.innerHTML = `
        <syn-select label="Inner select">
          <syn-option value="a">Alpha</syn-option>
        </syn-select>
      `;
      document.body.appendChild(container);

      // Wait for custom elements to upgrade
      const innerSelect = shadow.querySelector('syn-select') as SynSelect;
      await customElements.whenDefined('syn-select');
      await innerSelect.updateComplete;

      await innerSelect.show();
      await innerSelect.updateComplete;

      // activateExternal should have been called because the composed-tree walk
      // found the modal API on the shadow-host (container)
      expect(activateSpy.called).to.be.true;

      await innerSelect.hide();
      expect(deactivateSpy.called).to.be.true;

      document.body.removeChild(container);
    });

    // ── 7. Select closes when focus moves outside the component ──
    it('should close when focus moves to an element outside the select', async () => {
      const el = await fixture<SynSelect>(html`
        <div>
          <syn-select label="Blur test">
            <syn-option value="a">Alpha</syn-option>
          </syn-select>
          <button id="outside">Outside</button>
        </div>
      `);
      const select = el.querySelector('syn-select') as SynSelect;
      const outside = el.querySelector<HTMLButtonElement>('#outside')!;

      await select.show();
      await oneEvent(select, 'syn-after-show');
      expect(select.open).to.be.true;

      // Move focus to the outside button; the select should close.
      outside.focus();
      await waitUntil(() => !select.open, 'select should have closed', { timeout: 2000 });
      expect(select.open).to.be.false;
    });

    // ── 7b. composedPath() exclusion does NOT close when option is focused ──
    // This is the Chrome 149 top-layer regression: when the popup is in the
    // top-layer composedPath() no longer includes the select host, so we must
    // use this.contains() as a fallback to avoid premature close.
    it('should NOT close when an option inside the listbox receives focus', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select label="Top-layer focus test">
          <syn-option value="a">Alpha</syn-option>
          <syn-option value="b">Beta</syn-option>
        </syn-select>
      `);

      await el.show();
      await oneEvent(el, 'syn-after-show');
      expect(el.open).to.be.true;

      // Simulate what Chrome 149 does: synthesise a focusin event whose
      // composedPath() does NOT include the select (as happens when the
      // popup is in the top-layer), but whose target IS a child option.
      const option = el.querySelector<HTMLElement>('syn-option[value="a"]')!;

      // Build a FocusEvent with a path that excludes the select host
      const fakeFocusIn = new FocusEvent('focusin', { bubbles: true, composed: true });
      Object.defineProperty(fakeFocusIn, 'composedPath', { value: () => [option, document.body, window] });
      Object.defineProperty(fakeFocusIn, 'target', { value: option });

      document.dispatchEvent(fakeFocusIn);
      await aTimeout(50);

      // The select must still be open because the focus is on a contained child
      expect(el.open).to.be.true;
    });

    // ── 8. focusDisplayInput does not throw when display-input is unfocusable ──
    it('should not throw when the display input cannot receive focus', async () => {
      const el = await fixture<SynSelect>(html`
        <syn-select label="Resilience test">
          <syn-option value="a">Alpha</syn-option>
        </syn-select>
      `);
      await el.updateComplete;

      // Temporarily make the display input non-focusable
      const displayInput = el.shadowRoot!.querySelector<HTMLInputElement>('.select__display-input')!;
      const originalFocus = displayInput.focus.bind(displayInput);
      displayInput.focus = () => { throw new DOMException('Focus blocked', 'NotAllowedError'); };

      // Calling the public focus method should swallow the error
      let threw = false;
      try {
        el.focus();
      } catch {
        threw = true;
      }

      expect(threw).to.be.false;
      displayInput.focus = originalFocus;
    });
  });
});

