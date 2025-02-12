import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TokenService} from '../../../../services/token.service';
import {KeycloakService} from '../../../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less'
})
export class MenuComponent implements OnInit{
  tokenService: TokenService = inject(TokenService);
  router: Router = inject(Router);
  token: TokenService = inject(TokenService);
  keycloakService: KeycloakService = inject(KeycloakService);

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      // if (window.location.href.endsWith(link.getAttribute('href') || '')) {
      //   link.classList.add('active');
      // }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
  async logout() {
    await this.keycloakService.logout();
  }
  // logout(){
  //   this.tokenService.deleteToken()
  //   this.router.navigate(['login']).then(r => true);
  // }
}
