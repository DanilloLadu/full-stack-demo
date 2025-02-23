import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TokenService} from '../../../../services/token.service';

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
  logout(){
    this.tokenService.deleteToken()
    this.router.navigate(['login']).then(r => true);
  }
}
