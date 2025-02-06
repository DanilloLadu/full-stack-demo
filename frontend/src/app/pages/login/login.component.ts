import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRequest } from '../../services/models/authentication-request';
import { ErrorResponse } from '../../services/models/error-response';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication-service';
import { TokenService } from '../../services/token.service';
import { AuthenticationResponse } from '../../services/models/authentication-response';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorResponse: ErrorResponse = {};
  errorMsg: Array<string> = [];
  authService: AuthenticationService = inject(AuthenticationService);
  tokenService: TokenService = inject(TokenService);
  
  constructor(private router: Router) {}

  register() {
    this.router.navigate(['register']);
  }

  login() {
    this.authService.login(this.authRequest).subscribe({
      next: (v) => {
        this.tokenService.token = v.token!;
        console.log(v);
        this.router.navigate(['books']);
      },
      error: (e) => {
        this.errorResponse = e.error;
        console.error(this.errorResponse);

        for (const key in this.errorResponse.errors) {
          this.errorMsg.push(this.errorResponse.errors[key]);
        }

        this.errorMsg.push(this.errorResponse.businessErrorDescription!);
      },
    });
  }
}
