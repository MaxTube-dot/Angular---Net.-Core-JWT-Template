import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthCredentials} from "../models/AuthCredentials";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-client',
  templateUrl: './auth-client.component.html',
  styleUrls: ['./auth-client.component.scss']
})
export class AuthClientComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  invalidCredentials = false;

  form: FormGroup = this.fb.group({
    email: ['',[Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit(event: any){
      const authCredentials = new AuthCredentials();
      authCredentials.login = this.form.get("email")?.value;
      authCredentials.password = this.form.get("password")?.value;
      this.authService.auth(authCredentials).subscribe({next: data =>{
        debugger;
        this.router.navigate(["home"])
        },
      error: err => {
        this.invalidCredentials = true;
      }})
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
