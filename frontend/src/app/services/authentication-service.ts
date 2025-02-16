import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { RegistrationRequest } from './models/registration-request';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from './models/authentication-request';
import { AuthenticationResponse } from './models/authentication-response';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  http: HttpClient = inject(HttpClient);
  url: string = environment.apiUrl + 'auth/';

  constructor() {}

  register(obj: RegistrationRequest): Observable<string> {
    return this.http.post<string>(this.url + 'register', obj);
  }

  login(obj: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.url + 'authenticate', obj);
  }

  activate(token: String): Observable<string> {
    return this.http.get<string>(this.url + 'activate-account?token=' + token);
  }
}
