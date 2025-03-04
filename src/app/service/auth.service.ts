import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../response/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private clientHttp: HttpClient) { }

  login(email: string, password: string): Observable<HttpResponse<LoginResponse>> {
    const authParameters = {
      email: email,
      password: password
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    })

    return this.clientHttp.post<LoginResponse>("http://localhost:8080/auth/signIn", authParameters, { headers, observe: "response" });
  }

  signUp(email: string, password: string, username: string): Observable<any> {
    const signupParameters = { email: email, password: password, username: username }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.clientHttp.post("http://localhost:8080/auth/signUp", signupParameters, { headers, observe: "response" });
  }
}
