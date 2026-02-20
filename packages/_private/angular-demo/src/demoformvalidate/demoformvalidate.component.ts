import type { SynChangeEvent } from '@synergy-design-system/components';
import { serialize } from '@synergy-design-system/components/utilities/form.js';
import { highlightOptionRenderer } from '@synergy-design-system/components/components/combobox/option-renderer.js';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  type FormStatus,
  currencyNumberFormatter,
  mockData,
  statusError,
  statusSuccess,
  statusWarning,
} from '@synergy-design-system/demo-utilities';
import { UsedSynergyComponentsModule } from '../modules/used-synergy.module';
import { DemoFieldSetModule } from '../modules/demofieldset.module';

const initialData = {
  ...mockData('initialValidateFormData'),
  // Custom test for angular validators
  email: ['', [
    Validators.required,
    Validators.email,
  ]],
};

console.log(mockData('initialValidateFormData'));

@Component({
  selector: 'demo-form-validate',
  standalone: true,
  styleUrls: ['./demoformvalidate.component.css'],
  templateUrl: './demoformvalidate.component.html',
  imports: [
    UsedSynergyComponentsModule,
    DemoFieldSetModule,
    ReactiveFormsModule,
  ],
})
export class DemoFormValidate {

  @ViewChild('form') form!: ElementRef<HTMLFormElement>;

  formData!: FormGroup;

  formStatus: FormStatus = statusWarning;

  nationalities = mockData('nationalities');

  testingFrameworks = mockData('testingFrameworks');

  highlightOptionRenderer = highlightOptionRenderer;

  formatter = currencyNumberFormatter;

  private _initFormData() {
    this.formData = this.fb.group({
      ...initialData,
    });
  }

  constructor(private fb: FormBuilder) {
    this._initFormData();
  }

  reset() {
    this.formStatus = statusWarning;
    this._initFormData();
  }

  validateEmailField() {
    const emailField = this.formData.get('email');
    const errors = emailField?.errors;

    // When the field is not changed, don´t show a message
    if (!emailField?.dirty) {
      return '';
    }

    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return 'Email is required';
    }

    if (errors['email']) {
      return 'Invalid email';
    }

    return '';
  }

  submit(form: FormGroup) {
    const isValid = form.valid;
    this.formStatus = isValid ? statusSuccess : statusError;
  }

  synChange(_: SynChangeEvent) {
    const form = this.form.nativeElement;

    const normalizedData = serialize(form);

    // Log the normalized data
    console.log(normalizedData);
  }

  currencyFormatter = (value: number) => {
    return this.formatter.format(value);
  }
}
