/* eslint-disable @typescript-eslint/no-floating-promises */
import sinon from 'sinon';
import {
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import type { TemplateResult } from 'lit';
import { serialize } from '../../../dist/synergy.js';
import type SynFile from './file.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type SynButton from '../button/button.component.js';

/**
 * Serialize a form with files to a JSON object
 * @param form The form to serialize
 * @returns Serialized object with file names instead of files
 */
const serializeWithFilesStringified = (form: HTMLFormElement) => {
  const originalData = serialize(form);
  return Object.entries(originalData).reduce((acc, [key, value]) => {
    if (value instanceof FileList) {
      acc[key] = Array.from(value).map((file) => file.name).join(', ');
    } else if (value instanceof File) {
      acc[key] = value.name;
    } else {
      acc[key] = value;
    }

    return acc;
  }, originalData);
};

const getUploadedFileNames = (entry: FormDataEntryValue | null) => {
  if (entry instanceof FileList) {
    return Array.from(entry).map((file) => file.name).join(', ');
  }

  if (entry instanceof File) {
    return entry.name;
  }

  return '';
};

const createFiles = (files?: File | File[]) => {
  const list = new DataTransfer();

  if (files) {
    const data = Array.isArray(files) ? files : [files];
    data.forEach((file) => list.items.add(file));
  } else {
    const file = new File(['content'], 'demo.jpg', { type: 'image/jpeg' });
    list.items.add(file);
  }

  return list.files;
};

/**
 * Emulate the upload of a file to a <syn-file> element
 * @param el The element to upload the file to
 * @param files One or multiple files. If omitted, will use a default file
 */
const fakeFileUpload = async (el: SynFile, files?: FileList | File | File[]) => {
  const input = el.shadowRoot!.querySelector<HTMLInputElement>('#input')!;

  const fileList = files instanceof FileList ? files : createFiles(files);

  input.files = fileList;

  input.dispatchEvent(new Event('change'));

  await el.updateComplete;
};

describe('<syn-file>', () => {
  const createTests = (description: string, droparea: boolean, triggerSlot?: TemplateResult) => {
    describe(description, () => {
      // Don't run this tests for the trigger slot case
      if (!triggerSlot) {
        it('passes accessibility test', async () => {
          const el = await fixture<SynFile>(html`<syn-file ?droparea=${droparea} label="File"></syn-file>`);
          await expect(el).to.be.accessible();
        });

        it('should emit a syn-focus event when the focus method is called', async () => {
          const el = await fixture<SynFile>(html`<syn-file label="Name" ?droparea=${droparea}></syn-file>`);
          const focusEvent = sinon.spy();
          el.addEventListener('syn-focus', focusEvent);
          el.focus();
          expect(focusEvent).to.have.been.calledOnce;
        });

        it('should emit a syn-blur event when the blur method is called', async () => {
          const el = await fixture<SynFile>(html`<syn-file label="Name" ?droparea=${droparea}></syn-file>`);
          const blurEvent = sinon.spy();
          el.addEventListener('syn-blur', blurEvent);
          el.focus();
          el.blur();
          expect(blurEvent).to.have.been.calledOnce;
        });
      }

      it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<SynFile>(html`<syn-file disabled ?droparea=${droparea}>${triggerSlot}</syn-file>`);
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('#input')!;

        expect(input.disabled).to.be.true;
      });

      // TODO: When using Playwright and its dnd feature in future this test
      // should work (currently DataTransferItems are not supported)
      it.skip('should emit a syn-error event when multiple attribute is not set, but several files are dragged in ', async () => {
        const el = await fixture<SynFile>(html`<syn-file label="Name" ?droparea=${droparea}>${triggerSlot}</syn-file>`);
        const div = el.shadowRoot!.querySelector<HTMLDivElement>('.form-control')!;

        const file1 = new File(['content'], 'demo.jpg', { type: 'image/jpeg' });
        const file2 = new File(['content 2'], 'demo2.jpg', { type: 'image/jpeg' });
        const errorEvent = sinon.spy();
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file1);
        dataTransfer.items.add(file2);

        el.addEventListener('syn-error', errorEvent);
        // eslint-disable-next-line compat/compat
        div.dispatchEvent(new DragEvent('drop', { dataTransfer }));

        expect(errorEvent).to.have.been.calledOnce;
      });

      describe('when using constraint validation', () => {
        it('should be valid by default', async () => {
          const el = await fixture<SynFile>(html`<syn-file ?droparea=${droparea}>${triggerSlot}</syn-file>`);
          expect(el.checkValidity()).to.be.true;
        });

        it('should be invalid when required and empty', async () => {
          const el = await fixture<SynFile>(html`<syn-file ?droparea=${droparea} required>${triggerSlot}</syn-file>`);
          expect(el.reportValidity()).to.be.false;
          expect(el.checkValidity()).to.be.false;
        });

        it('should be invalid when required and disabled is removed', async () => {
          const el = await fixture<SynFile>(html`<syn-file ?droparea=${droparea} disabled required>${triggerSlot}</syn-file>`);
          el.disabled = false;
          await el.updateComplete;
          expect(el.checkValidity()).to.be.false;
        });

        it('should receive the correct validation attributes ("states") when valid', async () => {
          const el = await fixture<SynFile>(html`<syn-file ?droparea=${droparea} required>${triggerSlot}</syn-file>`);

          await fakeFileUpload(el);
          expect(el.checkValidity()).to.be.true;
          expect(el.hasAttribute('data-required')).to.be.true;
          expect(el.hasAttribute('data-optional')).to.be.false;
          expect(el.hasAttribute('data-invalid')).to.be.false;
          expect(el.hasAttribute('data-valid')).to.be.true;
          expect(el.hasAttribute('data-user-invalid')).to.be.false;
          expect(el.hasAttribute('data-user-valid')).to.be.true;

          await fakeFileUpload(el, []);
          await el.updateComplete;
          expect(el.checkValidity()).to.be.false;

          await fakeFileUpload(el);
          await el.updateComplete;
          expect(el.checkValidity()).to.be.true;
        });

        it('should receive the correct validation attributes ("states") when invalid', async () => {
          const el = await fixture<SynFile>(html`<syn-file ?droparea=${droparea} required>${triggerSlot}</syn-file>`);

          await fakeFileUpload(el, []);
          expect(el.checkValidity()).to.be.false;
          expect(el.hasAttribute('data-required')).to.be.true;
          expect(el.hasAttribute('data-optional')).to.be.false;
          expect(el.hasAttribute('data-invalid')).to.be.true;
          expect(el.hasAttribute('data-valid')).to.be.false;
          expect(el.hasAttribute('data-user-invalid')).to.be.true;
          expect(el.hasAttribute('data-user-valid')).to.be.false;

          await fakeFileUpload(el);
          await el.updateComplete;
          expect(el.checkValidity()).to.be.true;

          await fakeFileUpload(el, []);
          await el.updateComplete;
          expect(el.checkValidity()).to.be.false;
        });
      });

      describe('when submitting a form', () => {
        it('should serialize its name and value with FormData', async () => {
          const form = await fixture<HTMLFormElement>(html`<form><syn-file ?droparea=${droparea} name="a">${triggerSlot}</syn-file></form>`);
          const input = form.querySelector('syn-file')!;

          await fakeFileUpload(input);

          const formData = new FormData(form);
          expect(getUploadedFileNames(formData.get('a'))).to.equal('demo.jpg');
        });

        it('should serialize its name and value with JSON', async () => {
          const form = await fixture<HTMLFormElement>(html`<form><syn-file ?droparea=${droparea} name="a">${triggerSlot}</syn-file></form>`);
          const input = form.querySelector('syn-file')!;

          await fakeFileUpload(input);

          const json = serializeWithFilesStringified(form) as { a: '' };
          expect(json.a).to.equal('demo.jpg');
        });

        it('should be invalid when setCustomValidity() is called with a non-empty value', async () => {
          const input = await fixture<SynFile>(html`<syn-file ?droparea=${droparea}>${triggerSlot}</syn-file>`);

          input.setCustomValidity('Invalid selection');
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
              <syn-file ?droparea=${droparea} form="f" name="a">${triggerSlot}</syn-file>
            </div>
          `);
          const form = el.querySelector('form')!;
          const input = el.querySelector('syn-file')!;

          await fakeFileUpload(input);

          const formData = new FormData(form);

          expect(getUploadedFileNames(formData.get('a'))).to.equal('demo.jpg');
        });
      });

      describe('when resetting a form', () => {
        it('should reset the element to its initial value', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <syn-file ?droparea=${droparea} name="a">${triggerSlot}</syn-file>
              <syn-button id="reset" type="reset">Reset</syn-button>
            </form>
          `);
          const button = form.querySelector('#reset') as SynButton;
          const input = form.querySelector('syn-file')!;

          await fakeFileUpload(input);

          await input.updateComplete;

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await input.updateComplete;

          expect(input.value).to.equal('');

          input.defaultValue = '';

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await input.updateComplete;

          expect(input.value).to.equal('');
        });
      });

      describe('when calling HTMLFormElement.reportValidity()', () => {
        it('should be invalid when the input is empty and form.reportValidity() is called', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <syn-file ?droparea=${droparea} required>${triggerSlot}</syn-file>
              <syn-button type="submit">Submit</syn-button>
            </form>
          `);

          expect(form.reportValidity()).to.be.false;
        });

        it('should be valid when the input is empty, reportValidity() is called, and the form has novalidate', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form novalidate>
              <syn-file ?droparea=${droparea} required>${triggerSlot}</syn-file>
              <syn-button type="submit">Submit</syn-button>
            </form>
          `);

          expect(form.reportValidity()).to.be.true;
        });
      });

      describe('when the value changes', () => {
        it('should emit syn-change when the user has uploaded something', async () => {
          const el = await fixture<SynFile>(html`<syn-file ?droparea=${droparea}>${triggerSlot}</syn-file>`);
          const changeHandler = sinon.spy();

          el.addEventListener('syn-change', changeHandler);
          await fakeFileUpload(el);

          expect(changeHandler).to.have.been.calledOnce;
        });

        it('should emit syn-input when the user has uploaded something', async () => {
          const el = await fixture<SynFile>(html`<syn-file ?droparea=${droparea}>${triggerSlot}</syn-file>`);
          const inputHandler = sinon.spy();

          el.addEventListener('syn-input', inputHandler);
          await fakeFileUpload(el);

          expect(inputHandler).to.have.been.calledOnce;
        });
      });

      describe('when using FormControlController', () => {
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
              <syn-file ?droparea=${droparea} form="f1" name="a"> ${triggerSlot}</syn-file>
            </div>
          `);
          const form = el.querySelector<HTMLFormElement>('#f2')!;
          const input = document.querySelector('syn-file')!;
          await fakeFileUpload(input);

          input.form = 'f2';
          await input.updateComplete;

          const formData = new FormData(form);

          expect(getUploadedFileNames(formData.get('a'))).to.equal('demo.jpg');
          expect(formData.get('b')).to.be.null;
          expect(formData.get('c')).to.equal('3');
        });
      });
    });
  };

  it('should have default values', async () => {
    const el = await fixture<SynFile>(html`<syn-file></syn-file>`);

    expect(el.name).to.equal('');
    expect(el.value).to.equal('');
    expect(el.size).to.equal('medium');
    expect(el.label).to.equal('');
    expect(el.helpText).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.droparea).to.be.false;
    expect(el.accept).to.equal('');
    expect(el.capture).to.be.undefined;
    expect(el.multiple).to.be.false;
    expect(el.form).to.equal('');
    expect(el.hideValue).to.be.false;
  });

  it('should look like a droparea when the droparea attribute is set', async () => {
    const el = await fixture<SynFile>(html`<syn-file droparea></syn-file>`);
    const uploadButton = el.shadowRoot!.querySelector('.button')!;
    const droparea = el.shadowRoot!.querySelector('.droparea')!;

    expect(droparea).to.exist;
    expect(uploadButton).to.not.exist;
  });

  it('should look like a default upload button when the droparea attribute is not set', async () => {
    const el = await fixture<SynFile>(html`<syn-file></syn-file>`);
    const uploadButton = el.shadowRoot!.querySelector('.button')!;
    const droparea = el.shadowRoot!.querySelector('.droparea')!;

    expect(droparea).to.not.exist;
    expect(uploadButton).to.exist;
  });

  it('should not show default content when the trigger slot is used', async () => {
    const el = await fixture<SynFile>(html`
      <syn-file label="Label" help-text="Help text">
        <syn-button slot="trigger">Trigger</syn-button>
      </syn-file>
    `);
    const label = el.shadowRoot!.querySelector('.form-control__label')!;
    const input = el.shadowRoot!.querySelector('.form-control-input')!;
    const helpText = el.shadowRoot!.querySelector('.form-control__help-text')!;

    expect(label).to.not.exist;
    expect(input).to.not.exist;
    expect(helpText).to.not.exist;
  });

  createTests('when using <syn-file> without droparea', false);
  createTests('when using <syn-file> with droparea', true);
  createTests('when using <syn-file> with trigger slot', false, html`<syn-button slot="trigger">Trigger</syn-button>`);
  runFormControlBaseTests('syn-file');
});
