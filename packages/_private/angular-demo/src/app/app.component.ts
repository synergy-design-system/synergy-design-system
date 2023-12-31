import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  myForm: FormGroup;
  myLabel: string;
  myPass: string;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      agree: false,
      name: '',
      test: '',
      pass: '',
      radio: '',
      switch: false,
    });

    this.myLabel = 'here';
    this.myPass = '';
  }

  logMessage(...args: unknown[]) {
    console.log(args);
  }

  clearDemo() {
    if (!window.confirm('Are you sure to reset this form?')) return;
    this.myForm.setValue({
      agree: false,
      name: '',
      test: '',
      pass: '',
      radio: '',
      switch: false,
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('test', form.value.test);
    console.log('pass', form.value.pass);
    console.log('agree', form.value.agree);
    console.log('radio', form.value.radio);
    console.log('switch', form.value.switch);
    this.myLabel = `Label ${form.value.test}`;
  }
}
