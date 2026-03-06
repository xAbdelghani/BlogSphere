import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(sigunupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "auth/signup", sigunupRequest);
  };

  login(loginRequest: any): Observable<any> {
    return this.http.post<[]>(BASIC_URL + "auth/login", loginRequest);
  };

  forgotPassword(email: string): Observable<string> {
    return this.http.post(BASIC_URL + "auth/forgot-password", { email }, { responseType: 'text' });
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post(BASIC_URL + "auth/reset-password", { token, newPassword }, { responseType: 'text' });
  }

}

