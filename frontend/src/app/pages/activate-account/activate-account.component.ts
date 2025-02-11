import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication-service';
import {ErrorResponse} from '../../services/models/error-response';

@Component({
  selector: 'app-activate-account',
  imports: [],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.less',
})
export class ActivateAccountComponent implements OnInit {
  errorMsg: Array<string> = [];
  errorResponse: ErrorResponse = {};
  token!: string;

  constructor(private activeRoute: ActivatedRoute, private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {

    this.token = this.activeRoute.snapshot.queryParamMap.get('token')!; // url parameters ?param1=demo
    this.auth.activate(this.token).subscribe({
      next: (v) => {
        this.router.navigate(['login']);
      },
      error: (e) => {
        this.errorResponse = e.error;
        this.errorMsg.push(this.errorResponse.error!);
      },
    })
  }
}
