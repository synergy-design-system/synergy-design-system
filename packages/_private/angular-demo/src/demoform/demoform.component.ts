import type { SynChangeEvent } from '@synergy-design-system/components';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { setupAutocomplete } from '@synergy-design-system/components';
// @ts-expect-error autoComplete.js does not have types
import autoComplete from '@tarekraafat/autocomplete.js';
import { normalizeData } from '../shared';

const initialData = {
  code: '',
  comment: '',
  date: '',
  email: '',
  gender: '',
  name: '',
  nationality: '',
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
export class DemoForm implements OnInit {

  @ViewChild('form') form!: ElementRef<HTMLFormElement>;

  formData!: FormGroup;

  private nationalities: string[] = ['American', 'Australian', 'Brazilian', 'British', 'Canadian', 'Chinese', 'Dutch', 'French', 'German', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Russian', 'Spanish', 'Swedish', 'Turkish'];

  private _initFormData() {
    this.formData = this.fb.group({
      ...initialData,
    });
  }

  constructor(private fb: FormBuilder) {
    this._initFormData();
  }

  ngOnInit(): void {
    const { config: autoCompleteConfig } = setupAutocomplete('#input-nationality');
    const nationalityAutoComplete = new autoComplete({
      ...autoCompleteConfig,
      threshold: 0,
      placeHolder: 'Please choose your nationality',
      data: {
        src: this.nationalities,
      },
      events: {
        input: {
          focus() {
            nationalityAutoComplete.start();
          }
        }
      },
      resultItem: {
        highlight: true,
      },
      resultsList: {
        maxResults: undefined,
      }
    });
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
