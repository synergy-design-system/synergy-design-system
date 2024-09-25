import type { SynChangeEvent, SynRange } from '@synergy-design-system/components';
import { highlightOptionRenderer, serialize } from '@synergy-design-system/components';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const initialData = {
  code: '',
  comment: '',
  date: '',
  email: '',
  files: undefined,
  gender: '',
  happiness: '5',
  name: '',
  nationality: '',
  newsletterBeta: false,
  newsletterStandard: false,
  password: 'invalid',
  role: '',
};

@Component({
  selector: 'demo-form-validate',
  styleUrls: ['./demoformvalidate.component.css'],
  templateUrl: './demoformvalidate.component.html',
})
export class DemoFormValidate {

  @ViewChild('form') form!: ElementRef<HTMLFormElement>;

  formData!: FormGroup;

  nationalities: string[] = ['American', 'Australian', 'Brazilian', 'British', 'Canadian', 'Chinese', 'Dutch', 'French', 'German', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Russian', 'Spanish', 'Swedish', 'Turkish'];

  highlightOptionRenderer = highlightOptionRenderer;

  private _initFormData() {
    this.formData = this.fb.group({
      ...initialData,
    });
  }

  constructor(private fb: FormBuilder) {
    this._initFormData();
  }

  reset() {
    this._initFormData();
  }

  submit(form: FormGroup) {
    const isValid = form.valid;

    if (isValid) {
      // eslint-disable-next-line no-alert
      alert('Your data was successfully submitted');
    }
  }

  synChange(_: SynChangeEvent) {
    const form = this.form.nativeElement;

    const normalizedData = serialize(form);

    // Log the normalized data
    console.log(normalizedData);
  }
}
