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
    let api = `${this.endpoint}login/register`;
    let body = user;
    let obs = new Observable((sub) => {
    this.http.post(api, body,{headers: this.headers})
      .subscribe({next: (data: any) => {
        debugger;
          localStorage.setItem('access_token', data.token);
          sub.next("Success!");
      },
        error: e => {
        debugger;
          console.log(e)
          sub.error(e);
        }
    });
  });
    return obs;
  }

  auth (authCred: AuthCredentials): Observable<any>{
    let body = authCred;
    let url = this.endpoint + 'login/auth';
    const obs = new Observable((sub) => {
      this.http.post(url, body, {headers: this.headers}).subscribe({next: (data: any) => {
        debugger;
          localStorage.setItem('access_token', data.access_token);
          sub.next("Success!");
        },
        error: e => {
          console.log(e)
          sub.error(e);
        }
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
      this.router.navigate(['auth']);
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
