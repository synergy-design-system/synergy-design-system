/* eslint-disable @typescript-eslint/no-floating-promises */
import sinon from 'sinon';
import '../../../dist/synergy.js';
import {
  expect,
  fixture,
  html,
  // waitUntil,
} from '@open-wc/testing';
import type SynFile from './file.js';

// The input__chosen text color is too light.
// We are skipping this rule for now.
const ignoredRules = ['color-contrast'];

describe('<syn-file>', () => {
  describe('when acting as a regular input type file ', () => {
    it('passes accessibility test', async () => {
      const el = await fixture<SynFile>(html`<syn-file></syn-file>`);
      await expect(el).to.be.accessible({ ignoredRules });
    });

    it('should have default values', async () => {
      const el = await fixture<SynFile>(html`<syn-file></syn-file>`);

      expect(el.files).to.be.null;
      expect(el.name).to.equal('');
      expect(el.value).to.equal('');
      expect(el.size).to.equal('medium');
      expect(el.label).to.equal('');
      expect(el.helpText).to.equal('');
      expect(el.disabled).to.be.false;
      expect(el.dropzone).to.be.false;
      expect(el.accept).to.equal('');
      expect(el.capture).to.be.undefined;
      expect(el.multiple).to.be.undefined;
      expect(el.form).to.equal('');
      expect(el.hideValue).to.be.false;
    });

    it('should be disabled with the disabled attribute', async () => {
      const el = await fixture<SynFile>(html`<syn-file disabled></syn-file>`);
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('#input')!;

      expect(input.disabled).to.be.true;
    });

    it('should emit a syn-focus event when the focus event is called', async () => {
      const el = await fixture<SynFile>(html`<syn-file label="Name"></syn-file>`);
      const focusEvent = sinon.spy();
      el.addEventListener('syn-focus', focusEvent);
      el.focus();
      expect(focusEvent).to.have.been.calledOnce;
    });

    it('should emit a syn-blur event when the blur method is called', async () => {
      const el = await fixture<SynFile>(html`<syn-file label="Name"></syn-file>`);
      const blurEvent = sinon.spy();
      el.addEventListener('syn-blur', blurEvent);
      el.focus();
      el.blur();
      expect(blurEvent).to.have.been.calledOnce;
    });
  });
});
