/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynOption from '../option/option.js';
import { defaultOptionRenderer, highlightOptionRenderer } from './option-renderer.js';

describe('option-renderer', () => {
  describe('defaultOptionRenderer', () => {
    it('should just return the option as it is', () => {
      const optionValue = 'option-1';
      const optionLabel = 'Option 1';
      const option = document.createElement('syn-option');
      option.textContent = optionLabel;
      option.value = optionValue;
      const renderedOption = defaultOptionRenderer(option);

      expect(renderedOption.value).to.equal(optionValue);
      expect(renderedOption.textContent).to.equal(optionLabel);
      expect(renderedOption).to.equal(option);
    });
  });

  describe('highlightOptionRenderer', () => {
    it('should do nothing if the query string is empty', async () => {
      const option = await fixture<SynOption>(html`
        <syn-option>Option 1</syn-option>
      `);

      const renderedOption = highlightOptionRenderer(option, '');

      expect(renderedOption.children.length).to.equal(0);
      expect(renderedOption.textContent).to.equal('Option 1');
    });

    it('should use <mark> element to highlight the query string', async () => {
      const option = await fixture<SynOption>(html`
        <syn-option>Option 1</syn-option>
      `);

      const query = 'pt';
      expect(option.childNodes[0].textContent).to.equal('Option 1');

      const renderedOption = highlightOptionRenderer(option, query);
      const mark = renderedOption.childNodes[1];

      expect(renderedOption.childNodes[0].textContent).to.equal('O');
      expect(mark.nodeName).to.equal('MARK');
      expect(mark.textContent).to.equal('pt');
      expect(renderedOption.childNodes[2].textContent).to.equal('ion 1');
    });

    it('should use the correct capitalization of the option text content for the <mark> text', async () => {
      const option = await fixture<SynOption>(html`
        <syn-option>Option 1</syn-option>
      `);

      const query = 'opt';

      expect(option.childNodes[0].textContent).to.equal('Option 1');

      const renderedOption = highlightOptionRenderer(option, query);
      const mark = renderedOption.children[0];
      expect(mark.textContent).to.equal('Opt');
    });

    it('should work with options having prefix slot content', async () => {
      const option = await fixture<SynOption>(html`
        <syn-option>
          <span slot="prefix">opt prefix</span>
          Option 1
        </syn-option>
      `);

      const query = 'opt';
      const renderedOption = highlightOptionRenderer(option, query);
      const prefix = renderedOption.querySelector('[slot="prefix"]')!;
      const { children } = renderedOption;
      const mark = children[1];

      // Check that the slot was not changed with mark element
      expect(prefix.children.length).to.equal(0);
      expect(prefix.textContent).to.equal('opt prefix');

      expect(children.length).to.equal(2);
      expect(mark.tagName).to.equal('MARK');
      expect(mark.textContent).to.equal('Opt');
    });

    it('should work with options having suffix slot content', async () => {
      const option = await fixture<SynOption>(html`
        <syn-option>
          <span slot="suffix">opt suffix</span>
          Option 1
        </syn-option>
      `);

      const query = 'opt';
      const renderedOption = highlightOptionRenderer(option, query);
      const suffix = renderedOption.querySelector('[slot="suffix"]')!;
      const { children } = renderedOption;
      const mark = children[1];

      // Check that the slot was not changed with mark element
      expect(suffix.children.length).to.equal(0);
      expect(suffix.textContent).to.equal('opt suffix');

      expect(children.length).to.equal(2);
      expect(mark.tagName).to.equal('MARK');
      expect(mark.textContent).to.equal('Opt');
    });
  });
});
