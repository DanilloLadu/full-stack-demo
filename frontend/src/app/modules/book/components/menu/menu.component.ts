import {Component, inject, OnInit} from '@angular/core';
import {NoPreloading, Router, RouterLink} from '@angular/router';
import {TokenService} from '../../../../services/token.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less'
})
export class MenuComponent implements OnInit {
  tokenService: TokenService = inject(TokenService);
  router: Router = inject(Router);
  token: TokenService = inject(TokenService);
  searchValue: string = '';

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

  logout() {
    this.tokenService.deleteToken()
    this.router.navigate(['login']).then(r => true);
  }

  search() {
    this.router.navigate(['/']).then(() => this.router.navigate(['books/search'], {
      queryParams: {q: this.searchValue}}));
  }
}
