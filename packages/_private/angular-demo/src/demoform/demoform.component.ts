import type { SynChangeEvent } from '@synergy-design-system/components';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { normalizeData } from '../shared';

const initialData = {
  code: '',
  comment: '',
  date: '',
  email: '',
  gender: '',
  name: '',
  newsletterAngular: false,
  newsletterBeta: false,
  newsletterReact: false,
  newsletterStandard: false,
  newsletterVanilla: false,
  newsletterVue: false,
  password: 'invalid',
  phone: '',
  role: '',
  topics: [],
};

@Component({
  selector: 'demo-form',
  styleUrls: ['./demoform.component.css'],
  templateUrl: './demoform.component.html',
})
export class DemoForm {

  @ViewChild('form') form!: ElementRef<HTMLFormElement>;

  formData!: FormGroup;

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

  synChange(e: SynChangeEvent) {
    const form = this.form.nativeElement;

    const normalizedData = normalizeData(new FormData(form));

    // Log the normalized data
    console.log(normalizedData);
  }
}
