import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRequest } from '../../models/authentication-request';
import { ErrorResponse } from '../../models/error-response';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../../services/authentication-service.service';

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
  authService: AuthenticationServiceService = inject(
    AuthenticationServiceService
  );
  constructor(private router: Router) {}

  register() {
    this.router.navigate(['register']);
  }

  login() {
    this.authService.login(this.authRequest).subscribe({
      next: v => console.log(v),
      error: (e) => {
        this.errorResponse = e.error;
        console.error(this.errorResponse);

        for (const key in this.errorResponse.errors) {
          this.errorMsg.push(this.errorResponse.errors[key]);
        }

        this.errorMsg.push(this.errorResponse.businessErrorDescription!);
      }});
  }
}
