import type { SynChangeEvent, SynRange } from '@synergy-design-system/components';
import { serialize } from '@synergy-design-system/components';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const initialData = {
  code: '',
  comment: '',
  date: '',
  donations: '2000 4000',
  email: '',
  files: undefined,
  gender: '',
  happiness: '5',
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
export class DemoForm {

  @ViewChild('form') form!: ElementRef<HTMLFormElement>;

  @ViewChild('donationRef') donationRef!: ElementRef<SynRange>;

  formData!: FormGroup;

  nationalities: string[] = ['American', 'Australian', 'Brazilian', 'British', 'Canadian', 'Chinese', 'Dutch', 'French', 'German', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Russian', 'Spanish', 'Swedish', 'Turkish'];

  private _initFormData() {
    this.formData = this.fb.group({
      ...initialData,
    });
  }

  constructor(private fb: FormBuilder) {
    this._initFormData();
  }

  ngAfterViewInit() {
    const formatter = new Intl.NumberFormat('de-DE', {
      currency: 'EUR',
      maximumFractionDigits: 0,
      style: 'currency',
    });

    this.donationRef.nativeElement!.tooltipFormatter = value => formatter.format(value);
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
