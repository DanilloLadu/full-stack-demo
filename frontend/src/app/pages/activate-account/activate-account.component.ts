import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  imports: [],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.less',
})
export class ActivateAccountComponent {
  constructor(private route: ActivatedRoute) {}

  param1!: string;
  param2!: string;
  param3!: string;
  param4!: string;
  //@Input('test') param1: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.param1 = params.get('test')!; // path: 'activate/:test',
      this.param3 = params.get('demo')!; // path: 'activate/:test/:demo',
    });

    this.param2 = this.route.snapshot.queryParamMap.get('param1')!; // url parameters ?param1=demo
    this.param4 = this.route.snapshot.paramMap.get('param2')!; // Get the route parameter /activate/test/demo/param
  }
}
