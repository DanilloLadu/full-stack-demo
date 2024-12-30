import { ErrorResponse } from './../../models/error-response';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRequest } from '../../models/registration-request';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../../services/authentication-service.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less',
})
export class RegisterComponent {
  router: Router = inject(Router);
  authService: AuthenticationServiceService = inject(
    AuthenticationServiceService
  );
  registerRequest: RegistrationRequest = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  };
  errorResponse: ErrorResponse = {};
  errorMsg: Array<string> = [];

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register(this.registerRequest).subscribe({
     //next: v => console.log(v),
      error: (e) => {
        this.errorResponse = e.error;
        console.error(this.errorResponse);

        for (const key in this.errorResponse.errors) {
          this.errorMsg.push(this.errorResponse.errors[key]);
        }

        this.errorMsg.push(this.errorResponse.businessErrorDescription!);
      },
      complete: () =>
        this.errorMsg.push('Registration complete check your email'),
    });
  }
}
