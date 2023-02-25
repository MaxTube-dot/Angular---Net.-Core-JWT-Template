import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthCredentials} from "../../models/AuthCredentials";
import {catchError, map, observable, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {RegistrationCredentials} from "../../models/RegistrationCredentials";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public router: Router) {}
  endpoint: string = 'https://localhost:7021/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*'
  });
  currentUser = {};

  signUp(user: RegistrationCredentials): Observable<any> {
    let api = `${this.endpoint}/login/register`;
    return this.http.post(api, user,{headers: this.headers}).pipe(catchError(this.handleError));
  }

  login (authCred: AuthCredentials): Observable<any>{
    let body = authCred;
    let url = this.endpoint + 'login/auth';
    const obs = new Observable((sub) => {
      this.http.post(url, body, {headers: this.headers}).subscribe((res: any) => {
          localStorage.setItem('access_token', res.token);
          this.getUserProfile(res._id).subscribe((value) => {
            this.currentUser = value;
            this.router.navigate(['user-profile/' + res.msg._id]);
          });
        },
        error => {
          console.log(error)
          sub.next("error");
        });
    });

    return obs;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, {headers: this.headers}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
    // Error
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }



  }
