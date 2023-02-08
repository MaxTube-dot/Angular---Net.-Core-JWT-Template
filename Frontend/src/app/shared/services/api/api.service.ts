import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:7021/';

  GetUrl(method: string = ''){
    return this.baseUrl + method;
  }

  post(uri:string, body:string, options: any = null ) : Observable<any> {
    return this.http.post<any>(uri, body, options);
  }

  get(uri:string, options: any = null ) : Observable<any> {
    return this.http.get<any>(uri, options);
  }
}
