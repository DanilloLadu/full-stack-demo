import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {authGuard} from './services/auth.guard';

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/books',
      pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'activate',
        component: ActivateAccountComponent
      },
      {
        path: 'books',
        loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule),
        canActivate: [authGuard]
      }
];
