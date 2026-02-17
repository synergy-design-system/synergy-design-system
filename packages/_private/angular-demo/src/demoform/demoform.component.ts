import type { SynChangeEvent } from '@synergy-design-system/components';
import { highlightOptionRenderer, serialize } from '@synergy-design-system/components';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  type FormStatus,
  currencyNumberFormatter,
  mockData,
  statusError,
  statusSuccess,
  statusWarning,
} from '@synergy-design-system/demo-utilities';

const initialData = mockData('initialFullFormData');

@Component({
  selector: 'demo-form',
  standalone: false,
  styleUrls: ['./demoform.component.css'],
  templateUrl: './demoform.component.html',
})
export class DemoForm {

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
