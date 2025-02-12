import {inject, Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserProfile} from './user-pofile';
import {Router} from '@angular/router';
import {TokenService} from '../token.service';


@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private router: Router = inject(Router);
  private token: TokenService = inject(TokenService);
  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://127.0.0.1:9090',
        realm: 'book-social-network',
        clientId: 'bsn'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required',
    });
    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token || '';
      this.token.token = this.keycloak.token || '';
      this.router.navigate(['books']);
    }
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    // this.keycloak.accountManagement();
    this.token.deleteToken();
    this.router.navigate(['login']).then(() => true)
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'});
  }
}
