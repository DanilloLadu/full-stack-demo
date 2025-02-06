import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'activate/:test/:demo/:param2',
        component: ActivateAccountComponent
      }, 
      {
        path: 'books',
        loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule),
        //canActivate: [authGuard]
      }
];
