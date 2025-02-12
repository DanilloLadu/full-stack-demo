import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRequest } from '../../services/models/authentication-request';
import { FormsModule } from '@angular/forms';
import {KeycloakService} from '../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent implements OnInit{

  constructor(
    private ss: KeycloakService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.ss.init();
    //await this.ss.login();
  }
}

