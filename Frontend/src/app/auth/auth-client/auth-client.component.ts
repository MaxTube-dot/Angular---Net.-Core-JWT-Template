import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthCredentials} from "../models/AuthCredentials";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-auth-client',
  templateUrl: './auth-client.component.html',
  styleUrls: ['./auth-client.component.scss']
})
export class AuthClientComponent {

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  form: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit(event: any){
      const authCredentials = new AuthCredentials();
      authCredentials.login = this.form.get("login")?.value;
      authCredentials.password = this.form.get("password")?.value;
      this.authService.signIn(authCredentials);
  }
}
