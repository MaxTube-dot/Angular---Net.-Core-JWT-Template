import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {RegistrationCredentials} from "../models/RegistrationCredentials";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-registration',
  templateUrl: './auth-registration.component.html',
  styleUrls: ['./auth-registration.component.scss']
})
export class AuthRegistrationComponent implements OnInit{
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  form: FormGroup = this.fb.group({
    firstName: ['Илья',[Validators.required]],
    secondName: ['Левин', [Validators.required]],
    thirdName: ['Владимирович'],
    birthDate: [Date.now(), [Validators.required]],
    phone: ['89996061542', [Validators.required]],
    email: ['levin.114@uande.ru', [Validators.required]],
    userName: ['Qwerty123', [Validators.required]],
    password: ['123qwerty!32', [Validators.minLength(8)]],
    equalPass: []
  });

  ngOnInit(): void {
  }

  onSubmit() {
    let reg = new RegistrationCredentials ();
    reg.firstName = this.form.get("firstName")?.value;
    reg.secondName = this.form.get("secondName")?.value;
    reg.thirdName = this.form.get("thirdName")?.value;
    reg.birthDate = this.form.get("birthDate")?.value;
    reg.phone = this.form.get("phone")?.value;
    reg.email = this.form.get("email")?.value;
    reg.userName = this.form.get("userName")?.value;
    reg.password = this.form.get("password")?.value;

    this.authService.signUp(reg).subscribe({next: (date) => {
      debugger;
        this.router.navigate(["home"])
      },
    error: (err) => {
      debugger;
    }});
  }

}
