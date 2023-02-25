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
          localStorage.setItem('access_token', data.access_Token);
          localStorage.setItem('refresh_Token', data.refresh_Token);
          this.startRefreshTokenTimer();
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
    debugger;
    const obs = new Observable((sub) => {
      this.http.post(url, body, {headers: this.headers}).subscribe({next: (data: any) => {
        debugger;
          localStorage.setItem('access_token', data.access_Token);
          localStorage.setItem('refresh_Token', data.refresh_Token);
          this.startRefreshTokenTimer();
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_Token');
    this.router.navigate(['auth']);
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
        msg = error.error.message;
      } else {
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }


  refreshToken() {
    debugger;

    const body = {
      access_token : localStorage.getItem('access_token'),
      refresh_token : localStorage.getItem('refresh_Token'),

    };
    return this.http.post<any>(`${this.endpoint}login/refresh/token`, body, { headers: this.headers })
      .subscribe({next: (data: any) => {
        debugger;
        localStorage.setItem('access_token', data.access_Token);
        localStorage.setItem('refresh_Token', data.refresh_Token);
        this.startRefreshTokenTimer();
      },
      error: e => {
        console.log(e)
        this.stopRefreshTokenTimer();
        this.doLogout();
      }
    });
  }

  startRefreshTokenTimer() {
    // set a timeout to refresh the token a second before it expires
    debugger;
    const timeout = 40 * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
  }

  private refreshTokenTimeout?: any;

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }




}
