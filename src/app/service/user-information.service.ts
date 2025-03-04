import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInformationResponse } from '../response/userInformationResponse';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  constructor(private clientHttp: HttpClient) { }

  getUsername(): Observable<HttpResponse<UserInformationResponse>> {
    const token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.clientHttp.get<UserInformationResponse>("http://localhost:8080/user", { headers, observe: "response" });
  }
}
