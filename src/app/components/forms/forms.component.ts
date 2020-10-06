import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  public profileForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      birthday: [''], // sa fie date timepicker
      // phone: [''], // validare regExp formatul moldovei daca reusiti  exemplu :+37369001122
      // email: [''],
      // address: this.fb.group({
      //   // sa fie nested form dinamica cu editare si stergere, cu buton add new address
      //   addressLine1: [''],
      //   addressLine2: [''],
      //   countryCode: [''],
      //   city: [''],
      //   zipCode: [''],
      //   isMainAddress: [''],
      // }),
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }

  ngOnInit(): void {}
}
