import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-client',
  templateUrl: './auth-client.component.html',
  styleUrls: ['./auth-client.component.scss']
})
export class AuthClientComponent {

  constructor(private fb: FormBuilder) {
  }

  formInput: FormGroup = this.fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  onSubmit(event: any){

  }
}
