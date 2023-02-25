import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import * as moment from "moment";
import {RegistrationCredentials} from "../models/RegistrationCredentials";

@Component({
  selector: 'app-auth-registration',
  templateUrl: './auth-registration.component.html',
  styleUrls: ['./auth-registration.component.scss']
})
export class AuthRegistrationComponent implements OnInit{
  constructor(private fb: FormBuilder, private authService: AuthService) {
  }


  form: FormGroup = this.fb.group({
    firstName: ['Илья',[Validators.required]],
    secondName: ['Левин', [Validators.required]],
    birthDate: ['', [Validators.required]],
    email: ['levin.114@uande.ru', [Validators.required]],
    password: ['123ewqsdd32', [Validators.minLength(8)]],
    equalPass: []
  });

  ngOnInit(): void {
  }



  onSubmit(event: any) {
    let reg = new RegistrationCredentials ();
    reg.firstName = this.form.get("firstName")?.value;
    reg.secondName = this.form.get("secondName")?.value;
    reg.birthDate = this.form.get("birthDate")?.value;
    reg.email = this.form.get("email")?.value;
    reg.password = this.form.get("password")?.value;

    this.authService.signUp(reg)
  }

}
