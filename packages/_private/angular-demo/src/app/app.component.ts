import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  myForm: FormGroup;

  errorMessage: string = '';
  result: string = '';

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      comment: '',
      contactVia: '',
      givenName: '',
      // Prefilled only to demonstrate usage of v-model and settings up stuff by hand
      surName: 'Your Surname',
      email: '',
      tos: false,
      position: '',
    });
  }

  logMessage(...args: unknown[]) {
    console.log(args);
  }

  clearDemo() {
    if (!window.confirm('Are you sure to reset this form?')) return;
    this.myForm.setValue({
      comment: '',
      contactVia: '',
      givenName: '',
      // Prefilled only to demonstrate usage of binding and settings up stuff by hand
      surName: 'Your Surname',
      email: '',
      tos: false,
      position: '',
    });
  }

  onSubmit(form: FormGroup) {
    const isValid = form.valid;

    console.log(JSON.parse(JSON.stringify(form.value)));

    if (!isValid) {
      this.errorMessage = 'Please fill out all required form fields!';
      this.result = '';
      return;
    }

    this.errorMessage = '';

    console.log(form.value);

    const data = Object.entries(form.value)
      .map((v) => {
        return `${v[0]}: ${v[1]}`;
      })
      .join(',\n')
      .trim();
    this.result = data;
  }
}
