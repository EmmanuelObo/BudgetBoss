import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { ListDetailsComponent } from '../list/listdetails.component';
import { AuthGuard } from '../_guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'list/:id',
    component: ListDetailsComponent
  }
]