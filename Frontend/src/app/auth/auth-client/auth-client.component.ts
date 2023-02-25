import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthCredentials} from "../models/AuthCredentials";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-auth-client',
  templateUrl: './auth-client.component.html',
  styleUrls: ['./auth-client.component.scss']
})
export class AuthClientComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  invalidCredentials = false;

  form: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit(event: any){
      const authCredentials = new AuthCredentials();
      authCredentials.email = this.form.get("email")?.value;
      authCredentials.password = this.form.get("password")?.value;
      this.authService.login(authCredentials).subscribe(value => {
        
      })
  }

  ngOnInit(): void {
    this.form.get("email")?.valueChanges.subscribe(value => {
      this.invalidCredentials = false;
    });
    this.form.get("password")?.valueChanges.subscribe(value => {
      this.invalidCredentials = false;
    });
  }
}
