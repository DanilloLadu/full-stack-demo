import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  tokenName: string = 'token';

  set token(token: string) {
    localStorage.setItem(this.tokenName, token);
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenName);
  }
}
