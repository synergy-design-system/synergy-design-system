/* eslint-disable @typescript-eslint/no-floating-promises */
import sinon from 'sinon';
import {
  expect,
  fixture,
  html,
  // waitUntil,
} from '@open-wc/testing';
import { serialize } from '../../../dist/synergy.js';
import type SynFile from './file.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';

// The input__chosen text color is too light.
// We are skipping this rule for now.
const ignoredRules = ['color-contrast'];

describe('<syn-file>', () => {
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

  it('should emit a syn-focus event when the focus method is called', async () => {
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

  it('should look like a dropzone when the dropzone attribute is set', async () => {
    const el = await fixture<SynFile>(html`<syn-file dropzone></syn-file>`);
    const dropzone = el.shadowRoot!.querySelector('.dropzone__wrapper')!;

    expect(dropzone).to.exist;
  });

  it('should look like a default upload button when the dropzone attribute is not set', async () => {
    const el = await fixture<SynFile>(html`<syn-file></syn-file>`);
    const uploadButton = el.shadowRoot!.querySelector('.input__button')!;

    expect(uploadButton).to.exist;
  });

  describe('when using constraint validation', () => {
    it('should be valid by default', async () => {
      const el = await fixture<SynFile>(html`<syn-file></syn-file>`);
      expect(el.checkValidity()).to.be.true;
    });

    it('should be invalid when required and empty', async () => {
      const el = await fixture<SynFile>(html`<syn-file required></syn-file>`);
      expect(el.reportValidity()).to.be.false;
      expect(el.checkValidity()).to.be.false;
    });

    it('should be invalid when required and disabled is removed', async () => {
      const el = await fixture<SynFile>(html`<syn-file disabled required></syn-file>`);
      el.disabled = false;
      await el.updateComplete;
      expect(el.checkValidity()).to.be.false;
    });
  });

  describe('when submitting a form', () => {
    it('should serialize its name and value with FormData', async () => {
      const form = await fixture<HTMLFormElement>(html`<form><syn-file name="a"></syn-file></form>`);
      const formData = new FormData(form);
      expect(formData.get('a')).to.equal('');
    });

    it('should serialize its name and value with JSON', async () => {
      const form = await fixture<HTMLFormElement>(html`<form><syn-file name="a"></syn-file></form>`);
      const json = serialize(form) as { a: '' };
      expect(json.a).to.equal('');
    });

    it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
      const input = await fixture<HTMLFormElement>(html`<syn-file></syn-file>`);

      (input as unknown as SynFile).setCustomValidity('Invalid selection');
      await input.updateComplete;

      expect(input.checkValidity()).to.be.false;
      expect(input.hasAttribute('data-invalid')).to.be.true;
      expect(input.hasAttribute('data-valid')).to.be.false;
      expect(input.hasAttribute('data-user-invalid')).to.be.false;
      expect(input.hasAttribute('data-user-valid')).to.be.false;
    });

    it('should be present in form data when using the form attribute and located outside of a <form>', async () => {
      const el = await fixture<HTMLFormElement>(html`
        <div>
          <form id="f">
            <syn-button type="submit">Submit</syn-button>
          </form>
          <syn-input form="f" name="a"></syn-input>
        </div>
      `);
      const form = el.querySelector('form')!;
      const formData = new FormData(form);

      expect(formData.get('a')).to.equal('');
    });
  });

  runFormControlBaseTests('syn-file');
});
